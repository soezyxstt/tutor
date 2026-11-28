export interface DurableStorageLike {
  get<T>(key: string): Promise<T | undefined>;
  put<T>(key: string, value: T): Promise<void>;
  delete(key: string | string[]): Promise<unknown>;
  list<T>(options?: { prefix?: string; limit?: number }): Promise<Map<string, T>>;
  transaction<T>(callback: (storage: DurableStorageLike) => Promise<T>): Promise<T>;
  getAlarm(): Promise<number | null>;
  setAlarm(time: number): Promise<void>;
}

export interface DurableStateLike {
  storage: DurableStorageLike;
}

export interface DurableNamespaceLike {
  idFromName(name: string): unknown;
  get(id: unknown): { fetch(request: Request): Promise<Response> };
}

const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const LOGIN_IP_LIMIT = 8;
const LOGIN_GLOBAL_LIMIT = 120;
interface ExpiringRecord { expiresAt: number; count?: number }

/** One SQLite-backed Durable Object owns settings, sessions, and login limits.
 * Internal routes are reachable only through the binding, never via public URL.
 */
export class TutorAdminState {
  constructor(private readonly state: DurableStateLike) {}

  private async scheduleCleanup(time: number): Promise<void> {
    await this.state.storage.transaction(async (storage) => {
      const scheduled = await storage.getAlarm();
      if (scheduled === null || scheduled > time) await storage.setAlarm(time);
    });
  }

  async fetch(request: Request): Promise<Response> {
    const path = new URL(request.url).pathname;
    const storage = this.state.storage;
    if (request.method === 'POST' && path === '/login-attempt') {
      const { ipHash } = await request.json() as { ipHash: string };
      if (!/^[A-Za-z0-9_-]{43}$/.test(ipHash)) return Response.json({ error: 'Invalid key' }, { status: 400 });
      const now = Date.now();
      const result = await storage.transaction(async (tx) => {
        const keys = [`limit:ip:${ipHash}`, 'limit:global'];
        const limits = [LOGIN_IP_LIMIT, LOGIN_GLOBAL_LIMIT];
        const records = await Promise.all(keys.map((key) => tx.get<ExpiringRecord>(key)));
        const fresh = records.map((record) => record && record.expiresAt > now ? record : { count: 0, expiresAt: now + LOGIN_WINDOW_MS });
        const blocked = fresh.findIndex((record, index) => (record.count ?? 0) >= limits[index]);
        if (blocked >= 0) return { allowed: false, retryAfter: Math.ceil((fresh[blocked].expiresAt - now) / 1000) };
        await Promise.all(keys.map((key, index) => tx.put(key, { ...fresh[index], count: (fresh[index].count ?? 0) + 1 })));
        return { allowed: true, retryAfter: 0 };
      });
      await this.scheduleCleanup(now + LOGIN_WINDOW_MS);
      return Response.json(result);
    }
    if (path === '/settings' || path === '/model-catalog') {
      const key = path.slice(1);
      if (request.method === 'GET') return Response.json(await storage.get(key) ?? null);
      if (request.method === 'PUT') {
        const value = await request.json();
        await storage.put(key, value);
        return Response.json(value);
      }
    }
    if (path.startsWith('/session/')) {
      const id = path.slice('/session/'.length);
      if (!/^[a-f0-9-]{36}$/.test(id)) return Response.json({ error: 'Invalid session' }, { status: 400 });
      const key = `session:${id}`;
      if (request.method === 'PUT') {
        const value = await request.json() as ExpiringRecord;
        await storage.put(key, { expiresAt: value.expiresAt });
        await this.scheduleCleanup(Date.now() + LOGIN_WINDOW_MS);
        return Response.json({ ok: true });
      }
      if (request.method === 'GET') {
        const session = await storage.get<ExpiringRecord>(key);
        return Response.json({ valid: !!session && session.expiresAt > Date.now() });
      }
      if (request.method === 'DELETE') {
        await storage.delete(key);
        return Response.json({ ok: true });
      }
    }
    return new Response('Not found', { status: 404 });
  }

  async alarm(): Promise<void> {
    const records = await this.state.storage.list<ExpiringRecord>();
    const now = Date.now();
    const expired: string[] = [];
    let nextExpiry = Infinity;
    for (const [key, record] of records) {
      if (!key.startsWith('limit:') && !key.startsWith('session:')) continue;
      if (record.expiresAt <= now) expired.push(key);
      else nextExpiry = Math.min(nextExpiry, record.expiresAt);
    }
    for (let i = 0; i < expired.length; i += 128) await this.state.storage.delete(expired.slice(i, i + 128));
    if (Number.isFinite(nextExpiry)) await this.state.storage.setAlarm(nextExpiry);
  }
}

export async function stateRequest<T>(namespace: DurableNamespaceLike, path: string, method = 'GET', body?: unknown): Promise<T> {
  const stub = namespace.get(namespace.idFromName('tutor-admin-v1'));
  const response = await stub.fetch(new Request(`https://tutor-admin.internal${path}`, {
    method,
    headers: body === undefined ? undefined : { 'Content-Type': 'application/json' },
    body: body === undefined ? undefined : JSON.stringify(body),
  }));
  if (!response.ok) throw new Error('Admin storage unavailable');
  return response.json() as Promise<T>;
}
