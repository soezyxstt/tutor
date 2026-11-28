import type { TutorWorkerEnv } from './worker';
import { stateRequest } from './admin-state';

export const PROVIDERS = ['custom-muse', 'google-ai-studio', 'openai'] as const;
export type ModelProvider = typeof PROVIDERS[number];
export type ModelModality = 'text' | 'image' | 'audio' | 'video' | 'pdf';
export interface ModelEntry {
  id: string;
  provider: ModelProvider;
  label: string;
  inputModalities: ModelModality[];
  toolCalling: boolean | null;
  selectable: boolean;
  status: 'available' | 'unverified' | 'retired';
  source: 'provider-api' | 'cached' | 'reference' | 'manual';
  capabilitySource: 'provider' | 'documented-family' | 'unknown';
  note?: string;
  shutdownDate?: string;
}
export interface ProviderInventoryStatus {
  id: ModelProvider;
  status: 'live' | 'cached' | 'reference' | 'unavailable';
  checkedAt: string;
  error?: string;
  count: number;
}
export interface ModelCatalog {
  models: ModelEntry[];
  providers: ProviderInventoryStatus[];
  updatedAt: string;
}

type JsonRecord = Record<string, unknown>;
const CATALOG_TTL_MS = 60 * 60 * 1000;
const CACHED_CATALOG_MAX_AGE_MS = 7 * 24 * 60 * 60 * 1000;
const FETCH_TIMEOUT_MS = 9_000;
const DISCOVERY_BUDGET_MS = 35_000;
const MAX_PAGES = 25;
// Verified in the official model pages on 2026-11-28. Match exact aliases and
// dated snapshots, not every model containing "pro" or every reasoning model.
// https://developers.openai.com/api/docs/models/{o1-pro,o3-pro,gpt-5-pro,gpt-5.2-pro,gpt-5.4-pro,gpt-5.5-pro}
const RESPONSES_ONLY = /^(?:o1-pro|o3-pro|gpt-5-pro|gpt-5\.2-pro|gpt-5\.4-pro|gpt-5\.5-pro)(?:-\d{4}-\d{2}-\d{2})?$/;

// Outage references are explicitly unverified, never presented as live support.
// Their source is the providers' official model catalog, checked 2026-11-28:
// https://developers.openai.com/api/docs/models
// https://developers.openai.com/api/docs/models/all
// https://aistudio.google.com/docs/models
// Older IDs come from the existing course defaults and provider model references.
// Successful discovery REPLACES these references for that provider, so removed
// models never survive merely because they are in this outage reference list.
const REFERENCE_MODELS: Record<ModelProvider, string[]> = {
  'custom-muse': [],
  'google-ai-studio': [
    'gemini-4-carbon', 'gemini-4-neon', 'gemini-4-hydrogen', 'gemini-4-argon',
    'gemini-3.8-flash', 'gemini-3.6-flash', 'gemini-3.5-flash-lite', 'gemini-3.1-flash-lite',
    'gemini-3.1-pro-preview', 'gemini-3-flash-preview',
    'gemini-2.5-pro', 'gemini-2.5-flash', 'gemini-2.5-flash-lite',
  ],
  openai: [
    'gpt-6.2-astra', 'gpt-6.2-sol', 'gpt-6.1-terra', 'gpt-6-luna',
    'gpt-6.1-sol', 'gpt-6-astra', 'gpt-6-sol',
    'gpt-5.6-sol', 'gpt-5.6-terra', 'gpt-5.6-luna', 'gpt-5.5',
    'gpt-5.4', 'gpt-5.2', 'gpt-5.1', 'gpt-5', 'gpt-5-mini', 'gpt-5-nano',
    'gpt-4.1', 'gpt-4.1-mini', 'gpt-4.1-nano', 'gpt-4o', 'gpt-4o-mini',
    'o3', 'o3-mini', 'o4-mini', 'o1', 'o1-mini', 'gpt-4-turbo',
  ],
};

export function isUnifiedModelId(value: unknown): value is string {
  if (typeof value !== 'string' || value.length > 240) return false;
  return /^(custom-muse|google-ai-studio|openai)\/[A-Za-z0-9][A-Za-z0-9._:/-]*$/.test(value) && !value.includes('..') && !value.endsWith('/');
}

export function gatewayRoot(env: TutorWorkerEnv): string | undefined {
  if (env.CLOUDFLARE_AI_GATEWAY_URL) return env.CLOUDFLARE_AI_GATEWAY_URL.replace(/\/+$/, '').replace(/\/compat$/, '');
  if (env.CF_ACCOUNT_ID && env.CF_AI_GATEWAY_ID) return `https://gateway.ai.cloudflare.com/v1/${env.CF_ACCOUNT_ID}/${env.CF_AI_GATEWAY_ID}`;
  return undefined;
}

function record(value: unknown): JsonRecord {
  return value && typeof value === 'object' && !Array.isArray(value) ? value as JsonRecord : {};
}

function modalities(value: unknown): ModelModality[] {
  if (!Array.isArray(value)) return [];
  const supported: ModelModality[] = ['text', 'image', 'audio', 'video', 'pdf'];
  return [...new Set(value.map((item) => String(item).toLowerCase().replace('images', 'image')).filter((item): item is ModelModality => supported.includes(item as ModelModality)))];
}

export function normalizeModel(provider: ModelProvider, raw: unknown, source: ModelEntry['source'] = 'provider-api'): ModelEntry | null {
  const data = typeof raw === 'string' ? { id: raw } : record(raw);
  const name = String(data.id ?? data.name ?? '').replace(/^models\//, '').replace(new RegExp(`^${provider}/`), '');
  const id = `${provider}/${name}`;
  if (!isUnifiedModelId(id)) return null;
  const family = name.toLowerCase().replace(/^(openai|google|anthropic)\//, '');
  const architecture = record(data.architecture);
  const capability = record(data.capabilities);
  const modalityData = record(data.modalities);
  let inputModalities = modalities(data.input_modalities ?? data.inputModalities ?? architecture.input_modalities ?? modalityData.input ?? capability.input_modalities);
  if (!inputModalities.length && (capability.vision === true || data.supports_vision === true)) inputModalities = ['text', 'image'];
  let capabilitySource: ModelEntry['capabilitySource'] = inputModalities.length ? 'provider' : 'unknown';
  const explicitTools = data.tool_calling ?? data.toolCalling ?? data.supports_tools ?? data.supports_function_calling ?? capability.tool_calling ?? capability.function_calling;
  let toolCalling = typeof explicitTools === 'boolean' ? explicitTools : null;
  const methods = Array.isArray(data.supportedGenerationMethods) ? data.supportedGenerationMethods.map(String) : [];
  let selectable = true;
  let note: string | undefined;
  const endpoints = data.supported_endpoints ?? data.supportedEndpoints ?? data.endpoints;
  const explicitChat = data.chat_completions ?? capability.chat_completions;
  const supportsChat = typeof explicitChat === 'boolean' ? explicitChat : Array.isArray(endpoints)
    ? endpoints.some((endpoint) => /^(?:\/)?(?:v1\/)?chat[\/_-]completions$/.test(String(endpoint)))
    : undefined;
  const notChat = /(embedding|moderation|transcrib|whisper|tts|realtime|(?:^|-)live(?:-|$)|native-audio|deep-research|(?:^|-)image(?:-|$)|dall-e|sora|veo|lyria|nano-banana|omni|computer-use|codex)/.test(family);
  if (notChat || (provider === 'google-ai-studio' && methods.length > 0 && !methods.includes('generateContent'))) {
    selectable = false;
    note = 'Requires a different API or output mode than the current text tutor.';
  }
  if (!inputModalities.length) {
    if (/^gemini-(?:1\.5|2|3|4)(?:[.-]|$)/.test(family) && !notChat) {
      inputModalities = ['text', 'image', 'audio', 'video', 'pdf'];
      toolCalling ??= true;
      capabilitySource = 'documented-family';
    } else if (/^(?:gpt-(?:4o|4\.1|5|6)(?:[.-]|$)|o[134](?:-|$))/.test(family) && !notChat && !/^o(?:1|3)-(?:mini|preview)/.test(family)) {
      inputModalities = ['text', 'image'];
      toolCalling ??= true;
      capabilitySource = 'documented-family';
    } else if (/^gpt-4-turbo(?:-|$)/.test(family)) {
      inputModalities = ['text', 'image'];
      toolCalling ??= true;
      capabilitySource = 'documented-family';
    } else if (/^(?:gpt-(?:3\.5|4)(?:-|$)|o(?:1|3)-mini|o1-preview)/.test(family)) {
      inputModalities = ['text'];
      toolCalling ??= !/^o1-(?:mini|preview)/.test(family);
      capabilitySource = 'documented-family';
    }
  }
  if (RESPONSES_ONLY.test(family)) {
    if (provider === 'openai' || supportsChat === false) {
      selectable = false;
      note = 'This model requires the Responses API. The current tutor uses streaming Chat Completions.';
    } else if (supportsChat !== true) {
      // A custom provider may translate endpoints. Do not disable that adapter,
      // but do not claim its compatibility from the upstream model name alone.
      capabilitySource = 'unknown';
      toolCalling = typeof explicitTools === 'boolean' ? explicitTools : null;
      note = 'The upstream model needs Responses API. Verify that this custom provider offers compatible streaming Chat Completions.';
    }
  }
  if (supportsChat === false) {
    selectable = false;
    note = 'The provider does not list Chat Completions support for this model.';
  }
  if (/^gemini-.*thinking-(?:exp|experimental)(?:-|$)/.test(family) && typeof explicitTools !== 'boolean') {
    toolCalling = null;
    note = 'Tool support is unverified for this experimental thinking model.';
  }
  if (toolCalling === false) {
    selectable = false;
    note ??= 'This model does not support the tutor’s interactive tools.';
  }
  if (capabilitySource === 'unknown') note ??= 'The provider did not publish input or tool capabilities. Verify them before selecting this model.';
  const shutdownDate = typeof data.shutdown_date === 'string' ? data.shutdown_date : undefined;
  const retired = !!shutdownDate && /^\d{4}-\d{2}-\d{2}/.test(shutdownDate) && Date.parse(`${shutdownDate.slice(0, 10)}T23:59:59Z`) < Date.now();
  if (retired) { selectable = false; note = 'The provider reports that this model has shut down.'; }
  return {
    id, provider, label: String(data.displayName ?? data.name ?? name).replace(/^models\//, ''),
    inputModalities, toolCalling, selectable,
    status: retired ? 'retired' : source === 'provider-api' ? 'available' : 'unverified',
    source, capabilitySource, ...(note ? { note } : {}), ...(shutdownDate ? { shutdownDate } : {}),
  };
}

export function referenceModels(provider: ModelProvider): ModelEntry[] {
  return REFERENCE_MODELS[provider].map((id) => normalizeModel(provider, { id }, 'reference')).filter((item): item is ModelEntry => !!item);
}

async function fetchJson(url: URL, token: string, fetcher: typeof fetch, deadline: number): Promise<JsonRecord> {
  const remaining = deadline - Date.now();
  if (remaining <= 0) throw new Error('Model discovery exceeded its 35-second time limit.');
  const response = await fetcher(url, {
    headers: { 'cf-aig-authorization': `Bearer ${token}`, 'cf-aig-byok-alias': 'default', 'cf-aig-cache-ttl': '300', Accept: 'application/json' },
    signal: AbortSignal.timeout(Math.min(FETCH_TIMEOUT_MS, remaining)),
    // Workers support manual/follow only. Reject redirects below without
    // forwarding gateway credentials to another URL.
    redirect: 'manual',
  });
  // Never relay an upstream error body: gateways may include sensitive request details.
  if (!response.ok) throw new Error(`Provider model list returned HTTP ${response.status}.`);
  const contentLength = Number(response.headers.get('Content-Length') ?? 0);
  if (contentLength > 4_000_000) throw new Error('Provider model list exceeds the response limit.');
  const text = await response.text();
  if (text.length > 4_000_000) throw new Error('Provider model list exceeds the response limit.');
  try { return record(JSON.parse(text)); }
  catch { throw new Error('Provider returned invalid model-list JSON.'); }
}

export async function discoverProviderModels(env: TutorWorkerEnv, provider: ModelProvider, fetcher: typeof fetch = fetch): Promise<ModelEntry[]> {
  const deadline = Date.now() + DISCOVERY_BUDGET_MS;
  const root = gatewayRoot(env);
  if (!root || !env.CF_AIG_TOKEN) throw new Error('AI Gateway credentials are not configured.');
  // Muse is configured with a /v1/ base URL. Try models first; the second path
  // supports providers configured with a root-domain base URL instead.
  const paths = provider === 'google-ai-studio' ? ['google-ai-studio/v1beta/models'] : provider === 'openai' ? ['openai/models'] : ['custom-muse/models', 'custom-muse/v1/models'];
  let lastError: unknown;
  for (const path of paths) {
    try {
      const found = new Map<string, ModelEntry>();
      let cursor = '';
      const seenCursors = new Set<string>();
      for (let page = 0; page < MAX_PAGES; page++) {
        const url = new URL(`${root}/${path}`);
        if (provider === 'google-ai-studio') {
          url.searchParams.set('pageSize', '1000');
          if (cursor) url.searchParams.set('pageToken', cursor);
        } else if (cursor) url.searchParams.set('after', cursor);
        const payload = await fetchJson(url, env.CF_AIG_TOKEN, fetcher, deadline);
        const rows = payload.models ?? payload.data;
        if (!Array.isArray(rows)) throw new Error('Provider returned an unexpected model-list format.');
        for (const raw of rows) {
          const entry = normalizeModel(provider, raw);
          if (entry) found.set(entry.id, entry);
        }
        const next = provider === 'google-ai-studio' ? payload.nextPageToken : payload.has_more ? payload.last_id ?? record(rows.at(-1)).id : undefined;
        if (!next) return [...found.values()];
        cursor = String(next);
        if (seenCursors.has(cursor)) throw new Error('Provider repeated a model-list page.');
        seenCursors.add(cursor);
      }
      throw new Error('Provider model-list pagination exceeded the safety limit.');
    } catch (error) { lastError = error; }
  }
  throw lastError ?? new Error('Model discovery failed.');
}

export async function getModelCatalog(env: TutorWorkerEnv, refresh = false, fetcher: typeof fetch = fetch): Promise<ModelCatalog> {
  const namespace = env.TUTOR_ADMIN_STATE;
  const previous = namespace ? await stateRequest<ModelCatalog | null>(namespace, '/model-catalog') : null;
  const allProvidersLive = previous?.providers.length === PROVIDERS.length && previous.providers.every((provider) => provider.status === 'live');
  // A provider outage must not suppress recovery for an hour after it ends.
  const refreshAfter = allProvidersLive ? CATALOG_TTL_MS : 60_000;
  if (!refresh && previous && Date.now() - Date.parse(previous.updatedAt) < refreshAfter) return previous;
  const now = new Date().toISOString();
  const results = await Promise.allSettled(PROVIDERS.map((provider) => discoverProviderModels(env, provider, fetcher)));
  const models: ModelEntry[] = [];
  const providers: ProviderInventoryStatus[] = [];
  results.forEach((result, index) => {
    const id = PROVIDERS[index];
    if (result.status === 'fulfilled') {
      models.push(...result.value);
      providers.push({ id, status: 'live', checkedAt: now, count: result.value.length });
    } else {
      const oldProvider = previous?.providers.find((item) => item.id === id);
      const usablePrevious = oldProvider && Date.now() - Date.parse(oldProvider.checkedAt) < CACHED_CATALOG_MAX_AGE_MS;
      const cached = usablePrevious ? previous?.models.filter((model) => model.provider === id && (model.source === 'provider-api' || model.source === 'cached')).map((model) => ({ ...model, source: 'cached' as const, status: model.status === 'retired' ? 'retired' as const : 'unverified' as const })) ?? [] : [];
      const entries = cached.length ? cached : referenceModels(id);
      models.push(...entries);
      providers.push({ id, status: cached.length ? 'cached' : entries.length ? 'reference' : 'unavailable', checkedAt: cached.length ? oldProvider!.checkedAt : now, count: entries.length, error: result.reason instanceof Error ? result.reason.message : 'Could not fetch the provider model list.' });
    }
  });
  const catalog: ModelCatalog = { models: models.sort((a, b) => a.provider.localeCompare(b.provider) || a.label.localeCompare(b.label, undefined, { numeric: true })), providers, updatedAt: now };
  if (namespace) await stateRequest(namespace, '/model-catalog', 'PUT', catalog);
  return catalog;
}
