import test from 'node:test';
import assert from 'node:assert/strict';
import { createTutorWorker } from '../packages/core/src/server/worker';
import type { TutorWorkerEnv } from '../packages/core/src/server/worker';
import { TutorAdminState } from '../packages/core/src/server/admin-state';
import type { DurableStorageLike } from '../packages/core/src/server/admin-state';
import { ADMIN_COOKIE, SESSION_SECONDS, digest, signSession, verifySession } from '../packages/core/src/server/admin-auth';
import { discoverProviderModels, getModelCatalog, isUnifiedModelId, normalizeModel } from '../packages/core/src/server/model-catalog';
import { parseSettings, resolveTutorSettings } from '../packages/core/src/server/tutor-settings';
import { createGatewayFetch } from '../packages/core/src/server/gateway-fetch';
import { buildTutorSystemPrompt } from '../packages/core/src/server/teaching-prompt';

class MemoryStorage implements DurableStorageLike {
  values = new Map<string, unknown>();
  alarmTime = 0;
  private queue: Promise<unknown> = Promise.resolve();
  async get<T>(key: string): Promise<T | undefined> { return structuredClone(this.values.get(key)) as T | undefined; }
  async put<T>(key: string, value: T): Promise<void> { this.values.set(key, structuredClone(value)); }
  async delete(key: string | string[]): Promise<void> { for (const value of Array.isArray(key) ? key : [key]) this.values.delete(value); }
  async list<T>(): Promise<Map<string, T>> { return new Map(this.values) as Map<string, T>; }
  transaction<T>(callback: (storage: DurableStorageLike) => Promise<T>): Promise<T> {
    const next = this.queue.then(() => callback(this));
    this.queue = next.catch(() => undefined);
    return next;
  }
  async setAlarm(time: number): Promise<void> { this.alarmTime = time; }
  async getAlarm(): Promise<number | null> { return this.alarmTime || null; }
}

function fixture() {
  const storage = new MemoryStorage();
  const state = new TutorAdminState({ storage });
  const env: TutorWorkerEnv = {
    ADMIN_USERNAME: 'test-admin', ADMIN_PASSWORD: 'test-password-for-local-integration-only',
    TUTOR_CONFIG_URL: 'disabled',
    TUTOR_ADMIN_STATE: { idFromName: (name) => name, get: () => state },
    AI_MODEL: 'google-ai-studio/gemini-2.5-flash', AI_FALLBACK_MODELS: 'openai/gpt-4o-mini',
  };
  const app = createTutorWorker({ admin: true });
  async function request(path: string, method = 'GET', body?: unknown, cookie?: string, origin = 'https://tutor.example') {
    const headers: Record<string, string> = { Origin: origin, 'CF-Connecting-IP': '192.0.2.1' };
    if (body !== undefined) headers['Content-Type'] = 'application/json';
    if (cookie) headers.Cookie = cookie;
    return app.request(new Request(`https://tutor.example${path}`, { method, headers, body: body === undefined ? undefined : JSON.stringify(body) }), undefined, env);
  }
  async function login() {
    const response = await request('/api/admin/login', 'POST', { username: env.ADMIN_USERNAME, password: env.ADMIN_PASSWORD });
    assert.equal(response.status, 200);
    return response.headers.get('Set-Cookie')!.split(';')[0];
  }
  return { storage, state, env, app, request, login };
}

test('signed sessions reject tampering, expiry, and credential rotation', async () => {
  const { env } = fixture();
  const now = Math.floor(Date.now() / 1000);
  const session = { v: 1 as const, sid: crypto.randomUUID(), iat: now, exp: now + SESSION_SECONDS };
  const token = await signSession(env, session);
  assert.equal((await verifySession(env, token))?.sid, session.sid);
  assert.equal(await verifySession(env, `${token}x`), null);
  assert.equal(await verifySession(env, token, (session.exp + 1) * 1000), null);
  assert.equal(await verifySession({ ...env, ADMIN_PASSWORD: 'rotated' }, token), null);
  assert.equal(await verifySession(env, 'invalid'), null);
});

test('admin auth fails closed, protects mutations from sibling origins, and revokes logout sessions', async () => {
  const { request, login } = fixture();
  assert.equal((await request('/api/admin/settings')).status, 401);
  assert.equal((await request('/api/admin/models')).status, 401);
  assert.equal((await request('/api/admin/session')).status, 200);
  const cookie = await login();
  assert.ok(cookie.startsWith(`${ADMIN_COOKIE}=`));
  assert.deepEqual(await (await request('/api/admin/session', 'GET', undefined, cookie)).json(), { authenticated: true, configured: true });
  assert.equal((await request('/api/admin/logout', 'POST', {}, cookie, 'https://course.tutor.example')).status, 403);
  assert.equal((await request('/api/admin/logout', 'POST', {}, cookie)).status, 200);
  assert.equal((await request('/api/admin/settings', 'GET', undefined, cookie)).status, 401);
});

test('cookie uses secure host scope and fixed expiry; admin responses do not cache', async () => {
  const { request, env } = fixture();
  const response = await request('/api/admin/login', 'POST', { username: env.ADMIN_USERNAME, password: env.ADMIN_PASSWORD });
  const value = response.headers.get('Set-Cookie')!;
  assert.match(value, /; HttpOnly; Secure; SameSite=Strict$/);
  assert.match(value, /Path=\//);
  assert.match(value, /Max-Age=28800/);
  assert.ok(!value.includes('Domain='));
  assert.equal(response.headers.get('Cache-Control'), 'no-store');
});

test('login attempts share an atomic durable limit, including across object instances', async () => {
  const { storage, state } = fixture();
  const ipHash = await digest('192.0.2.55');
  const input = () => new Request('https://internal/login-attempt', { method: 'POST', body: JSON.stringify({ ipHash }) });
  const responses = await Promise.all(Array.from({ length: 9 }, () => state.fetch(input()).then((response) => response.json() as Promise<{ allowed: boolean } >)));
  assert.equal(responses.filter((response) => response.allowed).length, 8);
  const restarted = new TutorAdminState({ storage });
  assert.equal((await (await restarted.fetch(input())).json() as { allowed: boolean }).allowed, false);
});

test('ongoing sign-ins never postpone an earlier cleanup alarm', async () => {
  const { storage, state } = fixture();
  const early = Date.now() + 1000;
  storage.alarmTime = early;
  await state.fetch(new Request('https://internal/login-attempt', { method: 'POST', body: JSON.stringify({ ipHash: await digest('192.0.2.99') }) }));
  assert.equal(storage.alarmTime, early);
  await state.fetch(new Request(`https://internal/session/${crypto.randomUUID()}`, { method: 'PUT', body: JSON.stringify({ expiresAt: Date.now() + 3600_000 }) }));
  assert.equal(storage.alarmTime, early);
});

test('settings persist to the durable store and public config exposes no credentials', async () => {
  const { request, login, storage, env } = fixture();
  const cookie = await login();
  const settings = { primaryModel: 'openai/gpt-4o-mini', fallbackModels: ['google-ai-studio/gemini-2.5-flash'], allowUnverifiedModels: true };
  const response = await request('/api/admin/settings', 'PUT', settings, cookie);
  assert.equal(response.status, 200);
  assert.equal((await response.json() as { primaryModel: string }).primaryModel, settings.primaryModel);
  assert.ok(storage.values.has('settings'));
  const publicResponse = await request('/api/tutor-config');
  assert.equal(publicResponse.status, 200);
  const text = await publicResponse.text();
  assert.ok(text.includes(settings.primaryModel));
  assert.ok(!text.includes(env.ADMIN_PASSWORD!));
  assert.ok(!text.includes(env.ADMIN_USERNAME!));
  assert.equal((await request('/api/admin/settings', 'PUT', { ...settings, fallbackModels: [settings.primaryModel] }, cookie)).status, 400);
  assert.equal((await request('/api/admin/settings', 'PUT', { ...settings, primaryModel: 'untrusted/model' }, cookie)).status, 400);
});

test('unverified manual models require an explicit acknowledgment; known incompatible models cannot be selected', async () => {
  const { request, login, storage } = fixture();
  const cookie = await login();
  const unknown = { primaryModel: 'custom-muse/private-tutor', fallbackModels: [] };
  assert.equal((await request('/api/admin/settings', 'PUT', unknown, cookie)).status, 400);
  assert.equal((await request('/api/admin/settings', 'PUT', { ...unknown, allowUnverifiedModels: true }, cookie)).status, 200);
  await storage.put('model-catalog', { updatedAt: new Date().toISOString(), providers: [], models: [normalizeModel('openai', { id: 'text-embedding-3-small' })] });
  assert.equal((await request('/api/admin/settings', 'PUT', { primaryModel: 'openai/text-embedding-3-small', fallbackModels: [], allowUnverifiedModels: true }, cookie)).status, 400);
});

test('model ID and settings validation rejects query injection, duplicate models, and excess fallbacks', () => {
  assert.equal(isUnifiedModelId('openai/gpt-4.1-mini'), true);
  assert.equal(isUnifiedModelId('custom-muse/openai/gpt-4o'), true);
  for (const id of ['openai/model?token=x', 'openai/../../key', 'evil/model', 'openai/']) assert.equal(isUnifiedModelId(id), false);
  assert.equal(parseSettings({ primaryModel: 'openai/gpt-4o', fallbackModels: ['openai/gpt-4o'] }), null);
  assert.equal(parseSettings({ primaryModel: 'openai/gpt-4o', fallbackModels: Array.from({ length: 6 }, (_, i) => `custom-muse/model-${i}`) }), null);
});

test('course settings prefer the internal service binding and cache its result', async (t) => {
  let serviceCalls = 0;
  const publicFetch = t.mock.method(globalThis, 'fetch', async () => { throw new Error('Public fetch must not run'); });
  const env: TutorWorkerEnv = { TUTOR_CONFIG: { fetch: async (request) => {
    serviceCalls++;
    assert.equal(new URL(request.url).pathname, '/api/tutor-config');
    assert.equal(request.method, 'GET');
    assert.equal(request.headers.has('Cookie'), false);
    return Response.json({ primaryModel: 'openai/gpt-4.1-mini', fallbackModels: [], source: 'admin', updatedAt: '2026-11-28T00:00:00Z' });
  } } };
  assert.equal((await resolveTutorSettings(env)).primaryModel, 'openai/gpt-4.1-mini');
  assert.equal((await resolveTutorSettings(env)).primaryModel, 'openai/gpt-4.1-mini');
  assert.equal(serviceCalls, 1);
  assert.equal(publicFetch.mock.callCount(), 0);
});

test('a service failure keeps its last good settings and recovers after the failure cache expires', async (t) => {
  let now = 5_000_000;
  let calls = 0;
  let fails = false;
  let model = 'openai/gpt-4.1-mini';
  t.mock.method(Date, 'now', () => now);
  const publicFetch = t.mock.method(globalThis, 'fetch', async () => { throw new Error('Public fetch must not run'); });
  const env: TutorWorkerEnv = { AI_MODEL: 'openai/gpt-4o-mini', TUTOR_CONFIG: { fetch: async () => {
    calls++;
    if (fails) return new Response('Unavailable', { status: 503 });
    return Response.json({ primaryModel: model, fallbackModels: [], source: 'admin', updatedAt: '2026-11-28T00:00:00Z' });
  } } };
  assert.equal((await resolveTutorSettings(env)).primaryModel, model);
  now += 31_000;
  fails = true;
  assert.equal((await resolveTutorSettings(env)).primaryModel, model);
  assert.equal(calls, 2);
  now += 1000;
  assert.equal((await resolveTutorSettings(env)).primaryModel, model);
  assert.equal(calls, 2);
  now += 10_000;
  fails = false;
  model = 'google-ai-studio/gemini-3.8-flash';
  assert.equal((await resolveTutorSettings(env)).primaryModel, model);
  assert.equal(calls, 3);
  assert.equal(publicFetch.mock.callCount(), 0);
});

test('URL fallback still works without a binding and never supplies a service cache entry', async (t) => {
  const endpoint = `https://catalog.example/${crypto.randomUUID()}/api/tutor-config`;
  const publicFetch = t.mock.method(globalThis, 'fetch', async (request: Request) => {
    assert.equal(request.url, endpoint);
    return Response.json({ primaryModel: 'openai/gpt-4o-mini', fallbackModels: [], source: 'admin' });
  });
  assert.equal((await resolveTutorSettings({ TUTOR_CONFIG_URL: endpoint })).primaryModel, 'openai/gpt-4o-mini');
  let serviceCalls = 0;
  const env: TutorWorkerEnv = {
    TUTOR_CONFIG_URL: endpoint,
    AI_MODEL: 'google-ai-studio/gemini-2.5-flash',
    TUTOR_CONFIG: { fetch: async () => { serviceCalls++; return new Response('Unavailable', { status: 503 }); } },
  };
  const settings = await resolveTutorSettings(env);
  assert.equal(settings.primaryModel, env.AI_MODEL);
  assert.equal(settings.source, 'environment');
  assert.equal(serviceCalls, 1);
  assert.equal(publicFetch.mock.callCount(), 1);
});

test('disabling central settings prevents both service and URL reads', async (t) => {
  const publicFetch = t.mock.method(globalThis, 'fetch', async () => { throw new Error('Must not fetch'); });
  let serviceCalls = 0;
  const result = await resolveTutorSettings({ TUTOR_CONFIG_URL: 'disabled', AI_MODEL: 'openai/gpt-4o-mini', TUTOR_CONFIG: { fetch: async () => { serviceCalls++; throw new Error('Must not call service'); } } });
  assert.equal(result.primaryModel, 'openai/gpt-4o-mini');
  assert.equal(result.source, 'environment');
  assert.equal(serviceCalls, 0);
  assert.equal(publicFetch.mock.callCount(), 0);
});

test('Gemini discovery follows every page, preserves older live IDs, and never forwards provider credentials', async () => {
  const seen: string[] = [];
  const fetcher: typeof fetch = async (input, init) => {
    const url = String(input);
    seen.push(url);
    const headers = new Headers(init?.headers);
    assert.equal(headers.has('Authorization'), false);
    assert.equal(headers.get('cf-aig-authorization'), 'Bearer gateway-test-token');
    assert.equal(headers.get('cf-aig-byok-alias'), 'default');
    return Response.json(url.includes('pageToken=next') ? { models: [{ name: 'models/gemini-2.5-pro', supportedGenerationMethods: ['generateContent'] }] } : { models: [{ name: 'models/gemini-4-carbon', supportedGenerationMethods: ['generateContent'] }], nextPageToken: 'next' });
  };
  const rows = await discoverProviderModels({ CF_ACCOUNT_ID: 'account', CF_AI_GATEWAY_ID: 'gateway', CF_AIG_TOKEN: 'gateway-test-token' }, 'google-ai-studio', fetcher);
  assert.equal(seen.length, 2);
  assert.deepEqual(rows.map((row) => row.id), ['google-ai-studio/gemini-4-carbon', 'google-ai-studio/gemini-2.5-pro']);
  assert.equal(rows[1].status, 'available');
});

test('live provider inventory replaces references; unknown custom capabilities stay unknown', async () => {
  const { env } = fixture();
  const fetcher: typeof fetch = async (input) => String(input).includes('google-ai-studio') ? Response.json({ models: [] }) : Response.json({ data: [{ id: 'private-vision-1' }] });
  const catalog = await getModelCatalog({ ...env, CF_ACCOUNT_ID: 'account', CF_AI_GATEWAY_ID: 'gateway', CF_AIG_TOKEN: 'token' }, true, fetcher);
  assert.ok(catalog.providers.every((provider) => provider.status === 'live'));
  assert.equal(catalog.models.filter((model) => model.provider === 'google-ai-studio').length, 0);
  const model = catalog.models.find((model) => model.provider === 'custom-muse')!;
  assert.deepEqual(model.inputModalities, []);
  assert.equal(model.toolCalling, null);
  assert.equal(model.capabilitySource, 'unknown');
});

test('Responses-only models stay listed but cannot be selected on the native Chat Completions provider', () => {
  for (const id of ['o1-pro', 'o3-pro-2025-06-10', 'gpt-5-pro', 'gpt-5.2-pro-2025-12-11', 'gpt-5.4-pro', 'gpt-5.5-pro']) {
    const model = normalizeModel('openai', { id })!;
    assert.ok(model);
    assert.equal(model.selectable, false, id);
    assert.match(model.note!, /Responses API/);
  }
  for (const id of ['o1', 'o3', 'o4-mini', 'gpt-5', 'gpt-5.2', 'gpt-5.4', 'gpt-6.2-sol']) assert.equal(normalizeModel('openai', { id })?.selectable, true, id);
  const custom = normalizeModel('custom-muse', { id: 'gpt-5.2-pro', supported_endpoints: ['chat/completions'] })!;
  assert.equal(custom.selectable, true);
  assert.equal(custom.toolCalling, true);
  const unknownAdapter = normalizeModel('custom-muse', { id: 'gpt-5.2-pro' })!;
  assert.equal(unknownAdapter.capabilitySource, 'unknown');
  assert.equal(unknownAdapter.toolCalling, null);
});

test('experimental Gemini thinking variants never inherit assumed tool support', () => {
  const model = normalizeModel('google-ai-studio', { name: 'models/gemini-2.0-flash-thinking-exp-01-21', supportedGenerationMethods: ['generateContent'] })!;
  assert.equal(model.toolCalling, null);
  assert.deepEqual(model.inputModalities, ['text', 'image', 'audio', 'video', 'pdf']);
});

test('provider pagination has an overall time budget, not 25 independent timeouts', async (t) => {
  let now = 1_000_000;
  t.mock.method(Date, 'now', () => now);
  let requests = 0;
  const fetcher: typeof fetch = async () => {
    requests++;
    now += 36_000;
    return Response.json({ models: [{ name: 'models/gemini-2.5-flash' }], nextPageToken: 'more' });
  };
  await assert.rejects(discoverProviderModels({ CF_ACCOUNT_ID: 'account', CF_AI_GATEWAY_ID: 'gateway', CF_AIG_TOKEN: 'token' }, 'google-ai-studio', fetcher), /35-second/);
  assert.equal(requests, 1);
});

test('both tutor languages keep teaching style rules and Socratic/rubric behavior', () => {
  for (const language of ['id', 'en'] as const) {
    const prompt = buildTutorSystemPrompt({ language, courseTitle: 'Mechanics', itemTitle: 'Work' });
    assert.doesNotMatch(prompt, /[\u2013\u2014]/);
    assert.match(prompt, /Socratic Guardrail/);
    assert.match(prompt, /Rubric-Grounded Grading/);
    assert.match(prompt, language === 'id' ? /Sapa pembaca dengan Anda/ : /Address the reader as you/);
    assert.match(prompt, language === 'id' ? /Gunakan kita/ : /Use we/);
    assert.match(prompt, language === 'id' ? /kalimat aktif/ : /active voice/);
  }
});

test('failed discovery uses last good catalog with an explicit stale status', async () => {
  const { env, storage } = fixture();
  await storage.put('model-catalog', { updatedAt: new Date(0).toISOString(), providers: [{ id: 'custom-muse', status: 'live', checkedAt: new Date().toISOString(), count: 1 }], models: [normalizeModel('custom-muse', { id: 'gpt-4o' })] });
  const catalog = await getModelCatalog({ ...env, CF_ACCOUNT_ID: 'account', CF_AI_GATEWAY_ID: 'gateway', CF_AIG_TOKEN: 'token' }, true, async () => new Response('Internal secret detail', { status: 503 }));
  assert.equal(catalog.providers.find((provider) => provider.id === 'custom-muse')?.status, 'cached');
  assert.equal(catalog.models.find((model) => model.provider === 'custom-muse')?.source, 'cached');
  assert.ok(!JSON.stringify(catalog).includes('Internal secret detail'));
});

test('gateway fallback retries asynchronous HTTP errors before returning the first good stream', async () => {
  const tried: string[] = [];
  const fetcher: typeof fetch = async (_input, init) => {
    const body = JSON.parse(String(init?.body)) as { model: string };
    tried.push(body.model);
    assert.equal(new Headers(init?.headers).has('Authorization'), false);
    if (tried.length === 1) return Response.json({ error: 'quota' }, { status: 429 });
    return new Response('data: good\n\n', { headers: { 'Content-Type': 'text/event-stream' } });
  };
  const gateway = createGatewayFetch({ models: ['google-ai-studio/gemini-2.5-flash', 'openai/gpt-4o-mini'], byok: true, direct: false, fetcher });
  const response = await gateway('https://gateway.example/chat/completions', { method: 'POST', headers: { Authorization: 'Bearer placeholder' }, body: JSON.stringify({ model: 'google-ai-studio/gemini-2.5-flash', messages: [] }) });
  assert.deepEqual(tried, ['google-ai-studio/gemini-2.5-flash', 'openai/gpt-4o-mini']);
  assert.equal(await response.text(), 'data: good\n\n');
});

test('course-only worker never exposes admin endpoints; unknown APIs do not return HTML', async () => {
  const app = createTutorWorker();
  const env: TutorWorkerEnv = { TUTOR_CONFIG_URL: 'disabled', ASSETS: { fetch: async () => new Response('<html>SPA</html>') } };
  const response = await app.request('/api/admin/settings', undefined, env);
  assert.equal(response.status, 404);
  assert.match(response.headers.get('Content-Type')!, /application\/json/);
});
