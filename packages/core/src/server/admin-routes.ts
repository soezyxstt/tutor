import type { Hono } from 'hono';
import type { TutorWorkerEnv } from './worker';
import { constantTimeEqual, digest, isSameOriginMutation, readSessionCookie, sessionCookie, SESSION_SECONDS, signSession, verifySession } from './admin-auth';
import { stateRequest } from './admin-state';
import { getModelCatalog } from './model-catalog';
import { parseSettings, readLocalSettings } from './tutor-settings';
import type { TutorSettings } from './tutor-settings';

function isConfigured(env: TutorWorkerEnv): boolean {
  return !!env.ADMIN_USERNAME && !!env.ADMIN_PASSWORD && !!env.TUTOR_ADMIN_STATE;
}

async function authenticated(request: Request, env: TutorWorkerEnv): Promise<boolean> {
  if (!isConfigured(env)) return false;
  const cookie = readSessionCookie(request);
  if (!cookie) return false;
  const session = await verifySession(env, cookie);
  if (!session) return false;
  const state = await stateRequest<{ valid: boolean }>(env.TUTOR_ADMIN_STATE!, `/session/${session.sid}`);
  return state.valid;
}

async function smallJson(request: Request): Promise<Record<string, unknown> | null> {
  if (!request.headers.get('Content-Type')?.toLowerCase().startsWith('application/json')) return null;
  if (Number(request.headers.get('Content-Length') ?? 0) > 8192) return null;
  try {
    const reader = request.body?.getReader();
    if (!reader) return null;
    const parts: Uint8Array[] = [];
    let size = 0;
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      size += value.byteLength;
      if (size > 8192) { await reader.cancel(); return null; }
      parts.push(value);
    }
    const joined = new Uint8Array(size);
    let position = 0;
    for (const part of parts) { joined.set(part, position); position += part.length; }
    const body: unknown = JSON.parse(new TextDecoder().decode(joined));
    return body && typeof body === 'object' && !Array.isArray(body) ? body as Record<string, unknown> : null;
  } catch { return null; }
}

export function registerAdminRoutes(app: Hono<{ Bindings: TutorWorkerEnv }>): void {
  app.use('/api/admin/*', async (c, next) => {
    c.header('Cache-Control', 'no-store');
    c.header('X-Content-Type-Options', 'nosniff');
    c.header('X-Frame-Options', 'DENY');
    c.header('Referrer-Policy', 'same-origin');
    if (!['GET', 'HEAD', 'OPTIONS'].includes(c.req.method) && !isSameOriginMutation(c.req.raw)) {
      return c.json({ error: 'The request must come from this admin page.', code: 'ORIGIN_MISMATCH' }, 403);
    }
    try { await next(); }
    catch { return c.json({ error: 'Admin storage is temporarily unavailable. Please try again.', code: 'ADMIN_UNAVAILABLE' }, 503); }
  });

  app.get('/api/admin/session', async (c) => c.json({ authenticated: await authenticated(c.req.raw, c.env), configured: isConfigured(c.env) }));

  app.post('/api/admin/login', async (c) => {
    if (!isConfigured(c.env)) return c.json({ error: 'Admin credentials or storage have not been configured.', code: 'ADMIN_NOT_CONFIGURED' }, 503);
    const input = await smallJson(c.req.raw);
    if (!input || typeof input.username !== 'string' || typeof input.password !== 'string' || input.username.length > 256 || input.password.length > 4096) {
      return c.json({ error: 'Enter a username and password.', code: 'INVALID_INPUT' }, 400);
    }
    // Cloudflare overwrites CF-Connecting-IP at the edge. Do not trust forwarded
    // headers such as X-Forwarded-For, which callers can spoof.
    const ipHash = await digest(c.req.header('CF-Connecting-IP') || 'local');
    const limit = await stateRequest<{ allowed: boolean; retryAfter: number }>(c.env.TUTOR_ADMIN_STATE!, '/login-attempt', 'POST', { ipHash });
    if (!limit.allowed) {
      c.header('Retry-After', String(limit.retryAfter));
      return c.json({ error: 'Too many sign-in attempts. Please try again later.', code: 'LOGIN_RATE_LIMIT', retryAfter: limit.retryAfter }, 429);
    }
    const [usernameMatches, passwordMatches] = await Promise.all([
      constantTimeEqual(input.username, c.env.ADMIN_USERNAME!),
      constantTimeEqual(input.password, c.env.ADMIN_PASSWORD!),
    ]);
    if (!usernameMatches || !passwordMatches) return c.json({ error: 'The username or password is incorrect.', code: 'INVALID_CREDENTIALS' }, 401);
    const now = Math.floor(Date.now() / 1000);
    const session = { v: 1 as const, sid: crypto.randomUUID(), iat: now, exp: now + SESSION_SECONDS };
    await stateRequest(c.env.TUTOR_ADMIN_STATE!, `/session/${session.sid}`, 'PUT', { expiresAt: session.exp * 1000 });
    c.header('Set-Cookie', sessionCookie(await signSession(c.env, session)));
    return c.json({ authenticated: true, expiresAt: new Date(session.exp * 1000).toISOString() });
  });

  app.post('/api/admin/logout', async (c) => {
    const cookie = readSessionCookie(c.req.raw);
    const session = cookie && isConfigured(c.env) ? await verifySession(c.env, cookie) : null;
    if (session) await stateRequest(c.env.TUTOR_ADMIN_STATE!, `/session/${session.sid}`, 'DELETE');
    c.header('Set-Cookie', sessionCookie('', 0));
    return c.json({ authenticated: false });
  });

  app.use('/api/admin/*', async (c, next) => {
    if (!await authenticated(c.req.raw, c.env)) return c.json({ error: 'Please sign in to continue.', code: 'UNAUTHORIZED' }, 401);
    await next();
  });

  app.get('/api/admin/settings', async (c) => c.json(await readLocalSettings(c.env)));
  app.get('/api/admin/models', async (c) => c.json(await getModelCatalog(c.env, c.req.query('refresh') === '1')));
  app.put('/api/admin/settings', async (c) => {
    const input = await smallJson(c.req.raw);
    const settings = parseSettings(input);
    if (!settings) return c.json({ error: 'Choose one model and up to five distinct fallback models from the supported providers.', code: 'INVALID_SETTINGS' }, 400);
    const inventory = await getModelCatalog(c.env);
    const allowUnverified = input?.allowUnverifiedModels === true;
    for (const id of [settings.primaryModel, ...settings.fallbackModels]) {
      const model = inventory.models.find((entry) => entry.id === id);
      if (model && (!model.selectable || model.status === 'retired')) {
        return c.json({ error: `This model cannot be used with the current tutor: ${id}`, code: 'UNSUPPORTED_MODEL' }, 400);
      }
      if ((!model || model.status !== 'available' || model.toolCalling === null || model.capabilitySource === 'unknown') && !allowUnverified) {
        return c.json({ error: `Confirm the model's availability and tool support before using it: ${id}`, code: 'UNVERIFIED_MODEL' }, 400);
      }
    }
    const value: TutorSettings = { ...settings, updatedAt: new Date().toISOString(), source: 'admin' };
    await stateRequest(c.env.TUTOR_ADMIN_STATE!, '/settings', 'PUT', value);
    return c.json(value);
  });

  app.get('/api/tutor-config', async (c) => {
    c.header('Cache-Control', 'public, max-age=30, stale-if-error=300');
    return c.json(await readLocalSettings(c.env));
  });
}
