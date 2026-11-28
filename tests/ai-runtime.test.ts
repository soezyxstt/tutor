import test from 'node:test';
import assert from 'node:assert/strict';
import './interactive-tools.test';
import { validateAiToolCall } from '../packages/core/src/ai/ui-sdk/tools';
import { createRequire } from 'node:module';
import { resolve } from 'node:path';
import { createTutorWorker } from '../packages/core/src/server/worker';
import type { TutorWorkerEnv } from '../packages/core/src/server/worker';
import { createGatewayFetch } from '../packages/core/src/server/gateway-fetch';
import { normalizeGeminiStream, readGeminiToolSignatures } from '../packages/core/src/server/gateway-stream';

// Exercise the same client parser that useChat uses, without mounting React or
// adding a second SDK version as a test-only dependency.
const coreRequire = createRequire(resolve('packages/core/package.json'));
const { callChatApi } = createRequire(coreRequire.resolve('@ai-sdk/react'))('@ai-sdk/ui-utils');

const encoder = new TextEncoder();

function successfulCompletion() {
  const chunk = (content: string | null, finish: string | null) => `data: ${JSON.stringify({
    id: 'chatcmpl-runtime-test', object: 'chat.completion.chunk', created: 1,
    model: 'runtime-test', choices: [{ index: 0, delta: content === null ? {} : { role: 'assistant', content }, finish_reason: finish }],
  })}\n\n`;
  return new Response(chunk('Penjelasan tutor tersedia.', null) + chunk(null, 'stop') + 'data: [DONE]\n\n', {
    headers: { 'Content-Type': 'text/event-stream' },
  });
}

function splitSse(text: string) {
  const bytes = encoder.encode(text);
  let offset = 0;
  return new Response(new ReadableStream({
    pull(controller) {
      if (offset === bytes.length) { controller.close(); return; }
      // Split CRLF pairs and UTF-8 characters as a real network can.
      controller.enqueue(bytes.slice(offset, offset + 3));
      offset = Math.min(bytes.length, offset + 3);
    },
  }), { headers: { 'Content-Type': 'text/event-stream' } });
}

test('all tutor and UI SDK tools retain compatible optional schemas through the actual SDK provider payload', async (t) => {
  const captured: Record<string, any>[] = [];
  t.mock.method(globalThis, 'fetch', async (_input: RequestInfo | URL, init?: RequestInit) => {
    const payload = JSON.parse(String(init?.body));
    captured.push(payload);
    // Reproduce the production rejection, rather than accepting any tool schema.
    if (payload.tools.some((entry: any) => entry.function.strict === true)) {
      return Response.json({ error: { message: "Invalid schema: missing required optional fields.", type: 'invalid_request_error', code: 'invalid_function_parameters' } }, { status: 400 });
    }
    return successfulCompletion();
  });
  const app = createTutorWorker();
  for (const model of ['openai/gpt-5.4', 'openai/gpt-4o-mini', 'google-ai-studio/gemini-2.5-flash', 'custom-muse/gpt-5.4']) {
    const response = await app.request('/api/ai', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: [{ role: 'user', content: 'Jelaskan hubungan ini.' }], language: 'id', itemTitle: 'Sensor', simulationId: 'sensor', simulationParams: ['temperature'] }),
    }, {
      TUTOR_CONFIG_URL: 'disabled', CF_ACCOUNT_ID: 'runtime-test-account',
      CF_AI_GATEWAY_ID: 'runtime-test-gateway', CF_AIG_TOKEN: 'runtime-test-token',
      AI_GATEWAY_BYOK: 'true', AI_MODEL: model,
    });
    assert.equal(response.status, 200);
    const body = await response.text();
    assert.match(body, /Penjelasan tutor tersedia/);
    assert.doesNotMatch(body, /Tutor AI belum/);
  }
  assert.deepEqual(captured.map((payload) => payload.model), ['openai/gpt-5.4', 'openai/gpt-4o-mini', 'google-ai-studio/gemini-2.5-flash', 'custom-muse/gpt-5.4']);
  for (const payload of captured) {
    assert.equal(payload.tools.length, 13);
    for (const name of ['snapshot', 'query', 'act', 'renderInteractiveSimulation']) assert.ok(payload.tools.some((entry: any) => entry.function.name === name), name);
    assert.ok(payload.tools.every((entry: any) => entry.function.strict !== true));
    const simulation = payload.tools.find((entry: any) => entry.function.name === 'updateSimulationParams').function.parameters;
    assert.ok(!simulation.required.includes('reason'));
    assert.equal(simulation.properties.params.additionalProperties.type, 'number');
    const formula = payload.tools.find((entry: any) => entry.function.name === 'showFormulaBreakdown').function.parameters;
    assert.ok(!formula.properties.symbols.items.required.includes('unit'));
  }
});

test('Gemini tool-only fallback renders through the SDK client and preserves signatures on continuation and later questions', async (t) => {
  const captured: Record<string, any>[] = [];
  const toolCallId = 'call_7962365673455179679';
  const signature = 'opaque-provider-signature+/==';
  const args = {
    title: 'Pengaruh beda suhu terhadap tegangan µV', xLabel: 'ΔT (°C)', xDomain: [0, 100],
    curves: [{ label: 'Tegangan', expression: 's*x' }],
    sliders: [{ key: 's', label: 'Kepekaan', min: 1, max: 80, step: 1, defaultValue: 40 }],
  };
  let geminiRequests = 0;
  t.mock.method(globalThis, 'fetch', async (_input: RequestInfo | URL, init?: RequestInit) => {
    const payload = JSON.parse(String(init?.body));
    captured.push(payload);
    if (payload.model.startsWith('openai/')) {
      // Provider-specific history must never leak into an OpenAI request.
      assert.ok(payload.messages.every((message: any) => message.tool_calls?.every((call: any) => call.extra_content === undefined) ?? true));
      return Response.json({ error: { message: 'Primary temporarily unavailable' } }, { status: 429 });
    }
    geminiRequests++;
    if (geminiRequests === 1) {
      // Match the live gateway response: no tool-call index, opaque signature,
      // no assistant text, and finish_reason "stop" instead of "tool_calls".
      const chunk = { choices: [{ index: 0, delta: { role: 'assistant', tool_calls: [{
        extra_content: { google: { thought_signature: signature } },
        function: { arguments: JSON.stringify(args), name: 'renderInteractivePlot' },
        id: toolCallId, type: 'function',
      }] } }], created: 1, id: 'gemini-test', model: 'gemini-3.5-flash-lite', object: 'chat.completion.chunk' };
      const finish = { choices: [{ index: 0, delta: { role: 'assistant' }, finish_reason: 'stop' }] };
      return splitSse(`: gateway comment\r\ndata: ${JSON.stringify(chunk)}\r\n\r\ndata: ${JSON.stringify(finish)}\r\n\r\ndata: [DONE]\r\n\r\n`);
    }
    const calls = payload.messages.flatMap((message: any) => message.tool_calls ?? []);
    const call = calls.find((entry: any) => entry.id === toolCallId);
    if (call?.extra_content?.google?.thought_signature !== signature) {
      return Response.json({ error: { message: 'Function call is missing a thought_signature', code: 400 } }, { status: 400 });
    }
    assert.equal(call.function.name, 'renderInteractivePlot');
    assert.deepEqual(JSON.parse(call.function.arguments), args);
    assert.ok(payload.messages.some((message: any) => message.role === 'tool' && message.tool_call_id === toolCallId && message.content === JSON.stringify('Displayed on the page.')));
    return successfulCompletion();
  });
  const app = createTutorWorker();
  const env: TutorWorkerEnv = {
    TUTOR_CONFIG_URL: 'disabled', CF_ACCOUNT_ID: 'runtime-test-account',
    CF_AI_GATEWAY_ID: 'runtime-test-gateway', CF_AIG_TOKEN: 'runtime-test-token',
    AI_GATEWAY_BYOK: 'true', AI_MODEL: 'openai/gpt-5.4',
    AI_FALLBACK_MODELS: 'google-ai-studio/gemini-3.5-flash-lite',
  };
  const clientTools: any[] = [];
  async function chat(messages: any[], lastMessage?: any) {
    let answer: any;
    await callChatApi({
      api: '/api/ai', body: { messages, language: 'en', itemTitle: 'Thermocouple' },
      fetch: (_input: RequestInfo | URL, init: RequestInit) => app.request('/api/ai', init, env),
      restoreMessagesOnFailure: () => assert.fail('The client rejected the conversation'),
      onUpdate: ({ message }: any) => { answer = message; },
      onFinish: (message: any) => { answer = message; },
      onToolCall: ({ toolCall }: any) => { clientTools.push(toolCall); return 'Displayed on the page.'; },
      lastMessage,
    });
    return answer;
  }
  const user = { role: 'user', content: 'Help me test how one parameter changes the result' };
  const answer = await chat([user]);
  assert.equal(answer.content, '');
  assert.deepEqual(clientTools, [{ toolCallId, toolName: 'renderInteractivePlot', args }]);
  const invocation = answer.parts.find((part: any) => part.type === 'tool-invocation').toolInvocation;
  assert.equal(invocation.state, 'result');
  assert.deepEqual(invocation.args, args);
  assert.deepEqual(answer.annotations, [{ type: 'gemini-tool-signature', toolCallId, signature }]);

  const continuation = await chat([user, answer], answer);
  assert.match(continuation.content, /Penjelasan tutor tersedia/);
  assert.deepEqual(continuation.annotations, answer.annotations);
  const followup = await chat([user, continuation, { role: 'user', content: 'Why does the slope change?' }]);
  assert.match(followup.content, /Penjelasan tutor tersedia/);
  assert.equal(geminiRequests, 3);
  assert.deepEqual(captured.map((payload) => payload.model), Array.from({ length: 3 }, () => ['openai/gpt-5.4', 'google-ai-studio/gemini-3.5-flash-lite']).flat());
});

test('Gemini normalization keeps explicit indices and maps reordered parallel deltas by tool ID', async () => {
  const event = (tool_calls: unknown[]) => `data: ${JSON.stringify({ choices: [{ index: 0, delta: { tool_calls } }] })}\r\n\r\n`;
  const original = event([
    { id: 'call-a', index: 3, type: 'function', function: { name: 'a', arguments: '{' } },
    { id: 'call-b', type: 'function', function: { name: 'b', arguments: '{' } },
  ]) + event([
    { id: 'call-b', function: { arguments: '"value":"µ"}' } },
    { id: 'call-a', function: { arguments: '"value":2}' } },
  ]) + 'data: [DONE]\r\n\r\n';
  const response = normalizeGeminiStream(splitSse(original));
  const parsed = (await response.text()).split(/\r?\n/).filter((line) => line.startsWith('data: {')).map((line) => JSON.parse(line.slice(6)));
  assert.deepEqual(parsed.map((part) => part.choices[0].delta.tool_calls.map((call: any) => [call.id, call.index])), [
    [['call-a', 3], ['call-b', 0]], [['call-b', 0], ['call-a', 3]],
  ]);
  assert.equal(parsed[1].choices[0].delta.tool_calls[0].function.arguments, '"value":"µ"}');
});

test('signature replay accepts only matching assistant tool calls and rejects excess metadata without truncation', () => {
  const annotation = { type: 'gemini-tool-signature', toolCallId: 'call-owned', signature: 'opaque+/==' };
  const parts = [{ type: 'tool-invocation', toolInvocation: { toolCallId: 'call-owned' } }];
  assert.deepEqual(readGeminiToolSignatures([
    { role: 'user', parts, annotations: [{ ...annotation, signature: 'untrusted-user-copy' }] },
    { role: 'assistant', parts, annotations: [annotation, annotation, { ...annotation, toolCallId: 'call-unrelated' }, { ...annotation, signature: 42 }] },
  ]), [annotation]);
  assert.throws(() => readGeminiToolSignatures([
    { role: 'assistant', parts, annotations: [{ ...annotation, signature: 'a'.repeat(2 * 1_048_576) }] },
  ]), /conversation limit/);
});

test('the startup timeout does not abort an accepted streaming answer', async (t) => {
  // Compress the former AbortSignal.timeout path too, so this catches the
  // original defect without waiting 25 seconds per regression test.
  const originalTimeout = AbortSignal.timeout;
  t.mock.method(AbortSignal, 'timeout', () => originalTimeout(20));
  let requestSignal: AbortSignal | null | undefined;
  const fetcher: typeof fetch = async (_input, init) => {
    requestSignal = init?.signal;
    return new Response(new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode('first chunk\n'));
        const finish = setTimeout(() => {
          requestSignal?.removeEventListener('abort', abort);
          controller.enqueue(encoder.encode('final chunk\n'));
          controller.close();
        }, 60);
        function abort() { clearTimeout(finish); controller.error(requestSignal?.reason); }
        requestSignal?.addEventListener('abort', abort, { once: true });
      },
    }));
  };
  const gateway = createGatewayFetch({ models: ['openai/test'], byok: false, direct: false, startupTimeoutMs: 20, fetcher });
  const response = await gateway('https://gateway.example/chat/completions', { method: 'POST', body: JSON.stringify({ model: 'openai/test' }) });
  assert.equal(await response.text(), 'first chunk\nfinal chunk\n');
  assert.equal(requestSignal?.aborted, false);
});

test('a model that never sends headers still times out and falls back', { timeout: 2_000 }, async () => {
  const tried: string[] = [];
  const fetcher: typeof fetch = async (_input, init) => {
    tried.push(JSON.parse(String(init?.body)).model);
    if (tried.length === 1) return new Promise((_resolve, reject) => {
      init?.signal?.addEventListener('abort', () => reject(init.signal?.reason), { once: true });
    });
    return new Response('fallback answer');
  };
  const gateway = createGatewayFetch({ models: ['openai/slow', 'openai/ready'], byok: false, direct: false, startupTimeoutMs: 20, fetcher });
  const response = await gateway('https://gateway.example/chat/completions', { method: 'POST', body: JSON.stringify({ model: 'openai/slow' }) });
  assert.equal(await response.text(), 'fallback answer');
  assert.deepEqual(tried, ['openai/slow', 'openai/ready']);
});

test('caller cancellation still aborts a body after its headers arrive', async () => {
  for (const model of ['openai/test', 'google-ai-studio/test']) {
    const caller = new AbortController();
    const fetcher: typeof fetch = async (_input, init) => new Response(new ReadableStream({
      start(controller) {
        controller.enqueue(encoder.encode('data: first chunk\n\n'));
        init?.signal?.addEventListener('abort', () => controller.error(init.signal?.reason), { once: true });
      },
    }), { headers: { 'Content-Type': 'text/event-stream' } });
    const gateway = createGatewayFetch({ models: [model], byok: false, direct: false, startupTimeoutMs: 20, fetcher });
    const response = await gateway('https://gateway.example/chat/completions', { method: 'POST', signal: caller.signal, body: JSON.stringify({ model }) });
    const reader = response.body!.getReader();
    assert.equal(new TextDecoder().decode((await reader.read()).value), 'data: first chunk\n\n');
    caller.abort();
    await assert.rejects(reader.read(), { name: 'AbortError' });
  }
});

test('a generated animation crosses the provider and client stream and reports invalid expressions for repair', async (t) => {
  const valid = {
    title: 'Step response', description: 'A unit step applied to a first-order system.', duration: 5,
    xDomain: [0, 5], yDomain: [0, 1.1],
    particles: [{ label: 'Response', xExpression: 't', yExpression: '1-exp(-t/tau)', trail: true }],
    readouts: [{ label: 'Response', expression: '1-exp(-t/tau)' }],
    sliders: [{ key: 'tau', label: 'Time constant', unit: 's', min: 0.1, max: 4, step: 0.1, defaultValue: 1 }],
  };
  const results: any[] = [];
  let requestCount = 0;
  t.mock.method(globalThis, 'fetch', async (_input: RequestInfo | URL, init?: RequestInit) => {
    const payload = JSON.parse(String(init?.body));
    requestCount++;
    assert.ok(payload.tools.some((entry: any) => entry.function.name === 'renderInteractiveSimulation'));
    if (requestCount > 1) {
      const toolResult = payload.messages.find((message: any) => message.role === 'tool' && message.tool_call_id === 'simulation-1');
      assert.ok(toolResult, 'The model receives the failed render result');
      assert.equal(JSON.parse(toolResult.content).ok, false);
      assert.match(JSON.parse(toolResult.content).error, /defined at t=0/);
    }
    const args = requestCount === 1 ? { ...valid, particles: [{ ...valid.particles[0], yExpression: '1/t' }] } : valid;
    const chunk = { id: 'simulation-stream', object: 'chat.completion.chunk', created: 1, model: 'test', choices: [{ index: 0, delta: { role: 'assistant', tool_calls: [{ index: 0, id: `simulation-${requestCount}`, type: 'function', function: { name: 'renderInteractiveSimulation', arguments: JSON.stringify(args) } }] }, finish_reason: null }] };
    const finish = { id: 'simulation-stream', object: 'chat.completion.chunk', created: 1, model: 'test', choices: [{ index: 0, delta: {}, finish_reason: 'tool_calls' }] };
    return splitSse(`data: ${JSON.stringify(chunk)}\n\ndata: ${JSON.stringify(finish)}\n\ndata: [DONE]\n\n`);
  });
  const app = createTutorWorker();
  const env: TutorWorkerEnv = { TUTOR_CONFIG_URL: 'disabled', OPENAI_API_KEY: 'test-only-key', AI_MODEL: 'openai/gpt-4o-mini', AI_FALLBACK_MODELS: '' };
  async function chat(messages: any[], lastMessage?: any) {
    let answer: any;
    await callChatApi({
      api: '/api/ai', body: { messages, language: 'en', uiContext: 'No generated controls yet.' },
      fetch: (_input: RequestInfo | URL, init: RequestInit) => app.request('/api/ai', init, env),
      restoreMessagesOnFailure: () => assert.fail('Client stream failed'),
      onUpdate: ({ message }: any) => { answer = message; },
      onFinish: (message: any) => { answer = message; },
      onToolCall: ({ toolCall }: any) => {
        const result = validateAiToolCall(toolCall.toolName, toolCall.args);
        results.push(result);
        return result.ok ? { ok: true, rendered: toolCall.toolName } : result;
      },
      lastMessage,
    });
    return answer;
  }
  const user = { role: 'user', content: 'Create an animated step response with a time-constant slider.' };
  const failed = await chat([user]);
  assert.equal(results[0].ok, false);
  const repaired = await chat([user, failed], failed);
  assert.equal(results[1].ok, true);
  const invocation = repaired.parts.find((part: any) => part.type === 'tool-invocation' && part.toolInvocation.toolCallId === 'simulation-2').toolInvocation;
  assert.equal(invocation.state, 'result');
  assert.deepEqual(invocation.args, valid);
  assert.deepEqual(invocation.result, { ok: true, rendered: 'renderInteractiveSimulation' });
  assert.equal(requestCount, 2);
});
