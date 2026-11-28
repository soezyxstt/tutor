type JsonObject = Record<string, unknown>;

function object(value: unknown): value is JsonObject {
  return !!value && typeof value === 'object' && !Array.isArray(value);
}

export type GeminiToolSignature = {
  type: 'gemini-tool-signature';
  toolCallId: string;
  signature: string;
};

const MAX_TOOL_SIGNATURES = 1_000;
const MAX_SIGNATURE_CHARACTERS = 1_048_576;
type SignatureStore = { byId: Map<string, string>; characters: number };

function rememberSignature(store: SignatureStore, id: string, signature: string): boolean {
  const previous = store.byId.get(id);
  if (previous === signature) return false;
  const characters = store.characters + signature.length - (previous?.length ?? 0) + (previous === undefined ? id.length : 0);
  if (id.length > 1_024 || characters > MAX_SIGNATURE_CHARACTERS || (previous === undefined && store.byId.size >= MAX_TOOL_SIGNATURES)) {
    // Never truncate signatures: changing their bytes breaks continuation.
    throw new Error('Provider continuation metadata exceeds the conversation limit.');
  }
  store.characters = characters;
  store.byId.set(id, signature);
  return true;
}

export function isGeminiGatewayModel(model: string): boolean {
  return model.startsWith('google-ai-studio/');
}

/** AI SDK 4 keeps message annotations through useChat, but its OpenAI adapter
 * drops provider-specific tool metadata in both directions. Keep the opaque
 * signature with its original call and restore it only for Gemini requests. */
export function readGeminiToolSignatures(messages: readonly { role: string; annotations?: unknown; parts?: unknown; toolInvocations?: unknown }[]): GeminiToolSignature[] {
  const store: SignatureStore = { byId: new Map(), characters: 0 };
  for (const message of messages) {
    if (message.role !== 'assistant' || !Array.isArray(message.annotations)) continue;
    if (message.annotations.length > MAX_TOOL_SIGNATURES) throw new Error('Too many provider annotations.');
    const invocations = Array.isArray(message.parts)
      ? message.parts.flatMap((part) => object(part) && part.type === 'tool-invocation' ? [part.toolInvocation] : [])
      : Array.isArray(message.toolInvocations) ? message.toolInvocations : [];
    const ids = new Set(invocations.flatMap((call) => object(call) && typeof call.toolCallId === 'string' ? [call.toolCallId] : []));
    for (const annotation of message.annotations) {
      if (!object(annotation) || annotation.type !== 'gemini-tool-signature' ||
        typeof annotation.toolCallId !== 'string' || !ids.has(annotation.toolCallId) ||
        typeof annotation.signature !== 'string' || !annotation.signature) continue;
      rememberSignature(store, annotation.toolCallId, annotation.signature);
    }
  }
  return Array.from(store.byId, ([toolCallId, signature]) => ({ type: 'gemini-tool-signature', toolCallId, signature }));
}

export function restoreGeminiToolSignatures(payload: JsonObject, signatures: readonly GeminiToolSignature[]): JsonObject {
  if (!Array.isArray(payload.messages) || signatures.length === 0) return payload;
  const byId = new Map(signatures.map(({ toolCallId, signature }) => [toolCallId, signature]));
  return {
    ...payload,
    messages: payload.messages.map((message: unknown) => {
      if (!object(message) || message.role !== 'assistant' || !Array.isArray(message.tool_calls)) return message;
      return {
        ...message,
        tool_calls: message.tool_calls.map((call: unknown) => {
          if (!object(call) || typeof call.id !== 'string') return call;
          const signature = byId.get(call.id);
          if (!signature) return call;
          const extra = object(call.extra_content) ? call.extra_content : {};
          const google = object(extra.google) ? extra.google : {};
          return { ...call, extra_content: { ...extra, google: { ...google, thought_signature: signature } } };
        }),
      };
    }),
  };
}

type ChoiceCalls = { byId: Map<string, number>; byIndex: Map<number, string | undefined> };

/** Normalize Gemini's OpenAI-compatible SSE before the SDK parses it. Some
 * Gemini responses omit tool-call indices, although the SDK requires them.
 * Resolve those indices by stable IDs, not the order of deltas across chunks. */
export function normalizeGeminiStream(response: Response, onSignature?: (signature: GeminiToolSignature) => void): Response {
  if (!response.body || !response.headers.get('Content-Type')?.includes('text/event-stream')) return response;
  const choices = new Map<number, ChoiceCalls>();
  const sentSignatures: SignatureStore = { byId: new Map(), characters: 0 };
  let annotationCount = 0;
  const decoder = new TextDecoder();
  const encoder = new TextEncoder();
  let pending = '';

  function normalizeEvent(event: string): string {
    const lines = event.split(/\r\n|\r|\n/);
    const dataLines = lines.flatMap((line, index) => line === 'data' || line.startsWith('data:') ? [index] : []);
    if (!dataLines.length) return event;
    const data = dataLines.map((index) => lines[index].slice(5).replace(/^ /, '')).join('\n');
    if (data === '[DONE]') return event;
    let value: unknown;
    try { value = JSON.parse(data); } catch { return event; }
    if (!object(value) || !Array.isArray(value.choices)) return event;
    let changed = false;
    for (const choice of value.choices) {
      if (!object(choice) || typeof choice.index !== 'number' || !object(choice.delta) || !Array.isArray(choice.delta.tool_calls)) continue;
      let calls = choices.get(choice.index);
      if (!calls) {
        calls = { byId: new Map(), byIndex: new Map() };
        choices.set(choice.index, calls);
      }
      // Reserve explicit indices before assigning absent ones in this event.
      for (const call of choice.delta.tool_calls) {
        if (!object(call) || !Number.isInteger(call.index) || (call.index as number) < 0) continue;
        const index = call.index as number;
        const id = typeof call.id === 'string' ? call.id : calls.byIndex.get(index);
        calls.byIndex.set(index, id);
        if (id) calls.byId.set(id, index);
      }
      for (const call of choice.delta.tool_calls) {
        if (!object(call)) continue;
        if (call.index === undefined || call.index === null) {
          let index: number | undefined;
          if (typeof call.id === 'string') {
            index = calls.byId.get(call.id);
            if (index === undefined) {
              index = 0;
              while (calls.byIndex.has(index)) index++;
              calls.byId.set(call.id, index);
              calls.byIndex.set(index, call.id);
            }
          } else if (choice.delta.tool_calls.length === 1 && calls.byIndex.size === 1) {
            // An ID-free continuation is safe only for one known tool call.
            index = calls.byIndex.keys().next().value;
          }
          if (index !== undefined) { call.index = index; changed = true; }
        }
        const id = typeof call.id === 'string' ? call.id : calls.byIndex.get(call.index as number);
        const google = object(call.extra_content) && object(call.extra_content.google) ? call.extra_content.google : undefined;
        const signature = google?.thought_signature;
        // The SDK consumes only the first choice. Do not attach other choices'
        // signatures to the assistant message it creates.
        if (choice.index === 0 && id && typeof signature === 'string' && signature && rememberSignature(sentSignatures, id, signature)) {
          if (++annotationCount > MAX_TOOL_SIGNATURES) throw new Error('Too many provider annotations.');
          onSignature?.({ type: 'gemini-tool-signature', toolCallId: id, signature });
        }
      }
    }
    if (!changed) return event;
    const first = dataLines[0];
    const remaining = new Set(dataLines.slice(1));
    return lines.flatMap((line, index) => index === first ? [`data: ${JSON.stringify(value)}`] : remaining.has(index) ? [] : [line]).join('\n');
  }

  const stream = response.body.pipeThrough(new TransformStream<Uint8Array, Uint8Array>({
    transform(chunk, controller) {
      pending += decoder.decode(chunk, { stream: true });
      // Keep partial UTF-8, lines, and events across network chunks.
      let boundary: RegExpExecArray | null;
      while ((boundary = /\r\n\r\n|\n\n|\r\r/.exec(pending))) {
        const event = pending.slice(0, boundary.index);
        pending = pending.slice(boundary.index + boundary[0].length);
        controller.enqueue(encoder.encode(normalizeEvent(event) + boundary[0]));
      }
    },
    flush(controller) {
      pending += decoder.decode();
      if (pending) controller.enqueue(encoder.encode(normalizeEvent(pending)));
    },
  }));
  const headers = new Headers(response.headers);
  headers.delete('Content-Length');
  return new Response(stream, { status: response.status, statusText: response.statusText, headers });
}
