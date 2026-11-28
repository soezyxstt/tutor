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
interface CachedSettings { value: TutorSettings; expiresAt: number }
const settingsCache = new Map<string, CachedSettings>();
const serviceSettingsCache = new WeakMap<NonNullable<TutorWorkerEnv['TUTOR_CONFIG']>, Map<string, CachedSettings>>();

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

/** Course Workers use an internal service binding to reach the catalog directly.
 * Public URL reads remain available for standalone/custom/local deployments with
 * no service binding. A failed read uses the last good config or environment. */
export async function resolveTutorSettings(env: TutorWorkerEnv): Promise<TutorSettings> {
  if (env.TUTOR_ADMIN_STATE) return readLocalSettings(env);
  if (env.TUTOR_CONFIG_URL === 'disabled') return environmentSettings(env);
  const endpoint = env.TUTOR_CONFIG_URL || 'https://tutor.adihnursyam.com/api/tutor-config';
  const service = env.TUTOR_CONFIG;
  let cache = settingsCache;
  if (service) {
    const existing = serviceSettingsCache.get(service);
    cache = existing ?? new Map<string, CachedSettings>();
    if (!existing) serviceSettingsCache.set(service, cache);
  }
  // Transport and binding identity are isolated. A prior public response must
  // never substitute for a newly configured internal service binding.
  const cacheKey = `${service ? 'service' : 'url'}:${endpoint}`;
  const cached = cache.get(cacheKey);
  if (cached && cached.expiresAt > Date.now()) return cached.value;
  try {
    const url = new URL(endpoint);
    if (url.protocol !== 'https:' && url.hostname !== 'localhost' && url.hostname !== '127.0.0.1') throw new Error('HTTPS is required for central settings');
    const request = new Request(url, { signal: AbortSignal.timeout(2_000), redirect: 'error', headers: { Accept: 'application/json' } });
    const response = service ? await service.fetch(request) : await fetch(request);
    if (!response.ok) throw new Error('Central settings are not available');
    const data = await response.json() as Record<string, unknown>;
    const parsed = parseSettings(data);
    if (!parsed) throw new Error('Central settings are invalid');
    const value: TutorSettings = { ...parsed, source: data.source === 'environment' ? 'environment' : 'admin', updatedAt: typeof data.updatedAt === 'string' ? data.updatedAt : null };
    cache.set(cacheKey, { value, expiresAt: Date.now() + CACHE_MS });
    return value;
  } catch {
    const value = cached?.value ?? environmentSettings(env);
    cache.set(cacheKey, { value, expiresAt: Date.now() + 10_000 });
    return value;
  }
}
