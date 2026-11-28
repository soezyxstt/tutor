import type { TutorWorkerEnv } from './worker';

export const ADMIN_COOKIE = '__Host-tutor_admin';
export const SESSION_SECONDS = 8 * 60 * 60;
const encoder = new TextEncoder();

export interface AdminSession {
  v: 1;
  sid: string;
  iat: number;
  exp: number;
}

function encode(bytes: Uint8Array): string {
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}

function decode(value: string): Uint8Array<ArrayBuffer> {
  if (!/^[A-Za-z0-9_-]+$/.test(value)) throw new Error('Invalid token');
  const base = value.replace(/-/g, '+').replace(/_/g, '/');
  return Uint8Array.from(atob(base.padEnd(Math.ceil(base.length / 4) * 4, '=')), (c) => c.charCodeAt(0));
}

export async function digest(value: string): Promise<string> {
  return encode(new Uint8Array(await crypto.subtle.digest('SHA-256', encoder.encode(value))));
}

/** Hash first so the comparison always handles two fixed-length values. */
export async function constantTimeEqual(left: string, right: string): Promise<boolean> {
  const [a, b] = await Promise.all([
    crypto.subtle.digest('SHA-256', encoder.encode(left)),
    crypto.subtle.digest('SHA-256', encoder.encode(right)),
  ]);
  const aa = new Uint8Array(a);
  const bb = new Uint8Array(b);
  let difference = 0;
  for (let i = 0; i < aa.length; i++) difference |= aa[i] ^ bb[i];
  return difference === 0;
}

async function signingKey(env: TutorWorkerEnv): Promise<CryptoKey> {
  // Include both credentials even with an explicit secret so a credential rotation
  // immediately invalidates previous sessions.
  const material = JSON.stringify(['tutor-admin-v1', env.ADMIN_SESSION_SECRET ?? '', env.ADMIN_USERNAME, env.ADMIN_PASSWORD]);
  return crypto.subtle.importKey('raw', encoder.encode(material), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign', 'verify']);
}

export async function signSession(env: TutorWorkerEnv, session: AdminSession): Promise<string> {
  const payload = encode(encoder.encode(JSON.stringify(session)));
  const signature = await crypto.subtle.sign('HMAC', await signingKey(env), encoder.encode(payload));
  return `${payload}.${encode(new Uint8Array(signature))}`;
}

export async function verifySession(env: TutorWorkerEnv, value: string, now = Date.now()): Promise<AdminSession | null> {
  try {
    if (value.length > 1024) return null;
    const parts = value.split('.');
    if (parts.length !== 2) return null;
    if (!await crypto.subtle.verify('HMAC', await signingKey(env), decode(parts[1]), encoder.encode(parts[0]))) return null;
    const session: unknown = JSON.parse(new TextDecoder().decode(decode(parts[0])));
    if (!session || typeof session !== 'object') return null;
    const valueObject = session as AdminSession;
    const seconds = Math.floor(now / 1000);
    if (valueObject.v !== 1 || typeof valueObject.sid !== 'string' || !/^[a-f0-9-]{36}$/.test(valueObject.sid)) return null;
    if (!Number.isInteger(valueObject.iat) || !Number.isInteger(valueObject.exp)) return null;
    if (valueObject.iat > seconds + 30 || valueObject.exp <= seconds || valueObject.exp - valueObject.iat !== SESSION_SECONDS) return null;
    return valueObject;
  } catch {
    return null;
  }
}

export function readSessionCookie(request: Request): string | null {
  const cookies = request.headers.get('Cookie')?.split(';') ?? [];
  const entry = cookies.map((cookie) => cookie.trim()).find((cookie) => cookie.startsWith(`${ADMIN_COOKIE}=`));
  return entry?.slice(ADMIN_COOKIE.length + 1) ?? null;
}

export function sessionCookie(value: string, maxAge = SESSION_SECONDS): string {
  return `${ADMIN_COOKIE}=${value}; Path=/; Max-Age=${maxAge}; HttpOnly; Secure; SameSite=Strict`;
}

/** SameSite is not enough: a sibling course subdomain is a different origin. */
export function isSameOriginMutation(request: Request): boolean {
  return request.headers.get('Origin') === new URL(request.url).origin &&
    request.headers.get('Sec-Fetch-Site') !== 'cross-site';
}
