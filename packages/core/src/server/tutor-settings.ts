import type { TutorWorkerEnv } from './worker';
import { stateRequest } from './admin-state';
import { isUnifiedModelId } from './model-catalog';

export interface TutorSettings {
  primaryModel: string;
  fallbackModels: string[];
  updatedAt: string | null;
  source: 'admin' | 'environment';
}

const CACHE_MS = 30_000;
const settingsCache = new Map<string, { value: TutorSettings; expiresAt: number }>();

export function environmentSettings(env: TutorWorkerEnv): TutorSettings {
  const primaryModel = env.AI_MODEL?.trim() || 'google-ai-studio/gemini-2.5-flash';
  return {
    primaryModel,
    fallbackModels: [...new Set((env.AI_FALLBACK_MODELS || '').split(',').map((model) => model.trim()).filter((model) => model && model !== primaryModel))],
    updatedAt: null,
    source: 'environment',
  };
}

export function parseSettings(value: unknown): Pick<TutorSettings, 'primaryModel' | 'fallbackModels'> | null {
  if (!value || typeof value !== 'object') return null;
  const data = value as Record<string, unknown>;
  if (!isUnifiedModelId(data.primaryModel) || !Array.isArray(data.fallbackModels) || data.fallbackModels.length > 5) return null;
  if (!data.fallbackModels.every(isUnifiedModelId)) return null;
  const all = [data.primaryModel, ...data.fallbackModels];
  if (new Set(all).size !== all.length) return null;
  return { primaryModel: data.primaryModel, fallbackModels: data.fallbackModels };
}

export async function readLocalSettings(env: TutorWorkerEnv): Promise<TutorSettings> {
  if (!env.TUTOR_ADMIN_STATE) return environmentSettings(env);
  const saved = await stateRequest<TutorSettings | null>(env.TUTOR_ADMIN_STATE, '/settings');
  return saved && parseSettings(saved) ? { ...saved, source: 'admin' } : environmentSettings(env);
}

/** All course Workers read the same public, non-secret configuration. A failed
 * central read never disables the tutor; the last good config or env is used. */
export async function resolveTutorSettings(env: TutorWorkerEnv): Promise<TutorSettings> {
  if (env.TUTOR_ADMIN_STATE) return readLocalSettings(env);
  if (env.TUTOR_CONFIG_URL === 'disabled') return environmentSettings(env);
  const endpoint = env.TUTOR_CONFIG_URL || 'https://tutor.adihnursyam.com/api/tutor-config';
  const cached = settingsCache.get(endpoint);
  if (cached && cached.expiresAt > Date.now()) return cached.value;
  try {
    const url = new URL(endpoint);
    if (url.protocol !== 'https:' && url.hostname !== 'localhost' && url.hostname !== '127.0.0.1') throw new Error('HTTPS is required for central settings');
    const response = await fetch(url, { signal: AbortSignal.timeout(2_000), redirect: 'error', headers: { Accept: 'application/json' } });
    if (!response.ok) throw new Error('Central settings are not available');
    const data = await response.json() as Record<string, unknown>;
    const parsed = parseSettings(data);
    if (!parsed) throw new Error('Central settings are invalid');
    const value: TutorSettings = { ...parsed, source: data.source === 'environment' ? 'environment' : 'admin', updatedAt: typeof data.updatedAt === 'string' ? data.updatedAt : null };
    settingsCache.set(endpoint, { value, expiresAt: Date.now() + CACHE_MS });
    return value;
  } catch {
    const value = cached?.value ?? environmentSettings(env);
    settingsCache.set(endpoint, { value, expiresAt: Date.now() + 10_000 });
    return value;
  }
}
