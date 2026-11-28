/** Retry a rejected request before streaming any output to the client. The AI
 * SDK starts network work asynchronously, so a try/catch around streamText alone
 * cannot implement provider fallback. Network and HTTP startup failures belong
 * here; a stream that has already emitted content must never be replayed. */
export function createGatewayFetch(options: {
  models: string[];
  byok: boolean;
  direct: boolean;
  fetcher?: typeof fetch;
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
      try {
        const signals = [AbortSignal.timeout(25_000), ...(init?.signal ? [init.signal] : [])];
        const response = await fetcher(input, { ...init, headers, body: JSON.stringify({ ...original, model }), signal: AbortSignal.any(signals) });
        if (response.ok) return response;
        lastStatus = response.status;
        await response.body?.cancel();
      } catch {
        if (init?.signal?.aborted) throw new DOMException('Request aborted', 'AbortError');
      }
    }
    // Preserve a proper provider-shaped failure while keeping upstream details,
    // credentials, and internal URLs out of the student-visible error stream.
    return Response.json({ error: { message: 'The tutor models are temporarily unavailable. Please try again.', type: 'provider_unavailable', code: String(lastStatus) } }, { status: 502 });
  };
}
