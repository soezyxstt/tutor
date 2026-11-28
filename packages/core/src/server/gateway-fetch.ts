import { isGeminiGatewayModel, normalizeGeminiStream, restoreGeminiToolSignatures } from './gateway-stream';
import type { GeminiToolSignature } from './gateway-stream';

/** Retry a rejected request before streaming any output to the client. The AI
 * SDK starts network work asynchronously, so a try/catch around streamText alone
 * cannot implement provider fallback. Network and HTTP startup failures belong
 * here; a stream that has already emitted content must never be replayed. */
export function createGatewayFetch(options: {
  models: string[];
  byok: boolean;
  direct: boolean;
  fetcher?: typeof fetch;
  /** Deadline for response headers, not for consuming an accepted answer. */
  startupTimeoutMs?: number;
  toolSignatures?: readonly GeminiToolSignature[];
  onToolSignature?: (signature: GeminiToolSignature) => void;
}): typeof fetch {
  const fetcher = options.fetcher ?? fetch;
  return async (input, init) => {
    const headers = new Headers(init?.headers);
    if (options.byok) headers.delete('Authorization');
    let original: Record<string, unknown>;
    try { original = JSON.parse(String(init?.body ?? '{}')) as Record<string, unknown>; }
    catch { return fetcher(input, { ...init, headers }); }
    if (typeof original.model !== 'string') return fetcher(input, { ...init, headers });
    const models = options.direct ? options.models.filter((model) => model.startsWith('openai/')).map((model) => model.slice('openai/'.length)) : options.models;
    if (!models.length) throw new Error('No model is configured for this connection.');
    let lastStatus = 502;
    for (const model of models) {
      if (init?.signal?.aborted) throw new DOMException('Request aborted', 'AbortError');
      const startup = new AbortController();
      const deadline = setTimeout(
        () => startup.abort(new DOMException('The model did not start in time.', 'TimeoutError')),
        options.startupTimeoutMs ?? 25_000
      );
      try {
        const signals = [startup.signal, ...(init?.signal ? [init.signal] : [])];
        const payload = { ...original, model };
        const request = isGeminiGatewayModel(model) ? restoreGeminiToolSignatures(payload, options.toolSignatures ?? []) : payload;
        const response = await fetcher(input, { ...init, headers, body: JSON.stringify(request), signal: AbortSignal.any(signals) });
        // A fetch abort signal also controls its response body. Stop this
        // startup timer once headers arrive, while retaining the caller's
        // cancellation signal for the full stream.
        clearTimeout(deadline);
        if (response.ok) return isGeminiGatewayModel(model) ? normalizeGeminiStream(response, options.onToolSignature) : response;
        lastStatus = response.status;
        await response.body?.cancel();
      } catch {
        if (init?.signal?.aborted) throw new DOMException('Request aborted', 'AbortError');
      } finally {
        clearTimeout(deadline);
      }
    }
    // Preserve a proper provider-shaped failure while keeping upstream details,
    // credentials, and internal URLs out of the student-visible error stream.
    return Response.json({ error: { message: 'The tutor models are temporarily unavailable. Please try again.', type: 'provider_unavailable', code: String(lastStatus) } }, { status: 502 });
  };
}
