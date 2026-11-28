import { Hono } from 'hono';
import { convertToCoreMessages, createDataStreamResponse, streamText, tool } from 'ai';
import type { Message } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import { registerAdminRoutes } from './admin-routes';
import type { DurableNamespaceLike } from './admin-state';
import { resolveTutorSettings } from './tutor-settings';
import { createGatewayFetch } from './gateway-fetch';
import { readGeminiToolSignatures } from './gateway-stream';
import { buildTutorSystemPrompt } from './teaching-prompt';
import { tutorAgentTools } from '../ai/agent-tools';
export { TutorAdminState } from './admin-state';
import {
  renderInteractive3DSchema,
  renderInteractivePlotSchema,
  renderInteractiveSimulationSchema,
  revealSolutionStepSchema,
  showComparisonTableSchema,
  showFormulaBreakdownSchema,
  showPitfallWarningSchema,
  showQuickQuizSchema,
  showStepDerivationSchema,
  updateSimulationParamsSchema,
} from '../ai/ui-sdk/tools';

export interface R2ObjectLike {
  body: ReadableStream | null;
  httpMetadata?: { contentType?: string; cacheControl?: string };
  writeHttpMetadata?: (headers: Headers) => void;
}

export interface R2BucketLike {
  get: (key: string) => Promise<R2ObjectLike | null>;
}

export interface TutorWorkerEnv {
  /** Catalog admin credentials. Set only on the catalog Worker using secrets. */
  ADMIN_USERNAME?: string;
  ADMIN_PASSWORD?: string;
  ADMIN_SESSION_SECRET?: string;
  /** SQLite Durable Object binding on the catalog Worker only. */
  TUTOR_ADMIN_STATE?: DurableNamespaceLike;
  /** Internal service binding from course Workers to the catalog Worker. */
  TUTOR_CONFIG?: { fetch(request: Request): Promise<Response> };
  /** Trusted central config URL; set to "disabled" for isolated local tests. */
  TUTOR_CONFIG_URL?: string;
  /** Cloudflare Account ID (injected at deploy time via --var or env) */
  CF_ACCOUNT_ID?: string;
  /** Cloudflare AI Gateway ID, e.g. "tutor-ai-gateway" */
  CF_AI_GATEWAY_ID?: string;
  /** Optional explicit full AI Gateway /compat URL (overrides CF_ACCOUNT_ID + CF_AI_GATEWAY_ID) */
  CLOUDFLARE_AI_GATEWAY_URL?: string;
  /** Cloudflare AI Gateway Authentication Token (required for Authenticated Gateway & BYOK) */
  CF_AIG_TOKEN?: string;
  /** Set "true" to rely on Cloudflare AI Gateway Stored Keys (BYOK) for Gemini/OpenAI/Muse AI */
  AI_GATEWAY_BYOK?: string;
  /** Primary unified model ID, e.g. "google-ai-studio/gemini-2.5-flash" or "openai/gpt-4o-mini" */
  AI_MODEL?: string;
  /** Comma-separated fallback models, e.g. "openai/gpt-4o-mini,custom-muse/muse-chat" */
  AI_FALLBACK_MODELS?: string;
  /** Response cache TTL in seconds for Cloudflare AI Gateway (default "3600") */
  AI_CACHE_TTL?: string;
  /** Optional direct provider key for local dev without BYOK */
  OPENAI_API_KEY?: string;
  /** Optional Cloudflare R2 bucket binding for heavy 3D (.glb) & figure assets */
  MEDIA_BUCKET?: R2BucketLike;
  /** Static Assets binding (Vite dist/) */
  ASSETS?: {
    fetch: (request: Request) => Promise<Response>;
  };
}

function resolveGatewayCompatUrl(env: TutorWorkerEnv | undefined): string | undefined {
  if (!env) return undefined;
  if (env.CLOUDFLARE_AI_GATEWAY_URL) {
    return env.CLOUDFLARE_AI_GATEWAY_URL.replace(/\/+$/, '');
  }
  if (env.CF_ACCOUNT_ID && env.CF_AI_GATEWAY_ID) {
    return `https://gateway.ai.cloudflare.com/v1/${env.CF_ACCOUNT_ID}/${env.CF_AI_GATEWAY_ID}/compat`;
  }
  return undefined;
}

export function createTutorWorker(options: { admin?: boolean } = {}) {
  const app = new Hono<{ Bindings: TutorWorkerEnv }>();
  if (options.admin) registerAdminRoutes(app);

  app.get('/api/health', async (c) => {
    const gatewayUrl = resolveGatewayCompatUrl(c.env);
    const useByok = c.env?.AI_GATEWAY_BYOK !== 'false' && !!c.env?.CF_AIG_TOKEN && !!gatewayUrl;
    const hasDirectKey = !!c.env?.OPENAI_API_KEY;
    const mode = useByok ? 'byok' : hasDirectKey ? 'direct' : 'unconfigured';
    const settings = await resolveTutorSettings(c.env);

    return c.json({
      ok: true,
      runtime: 'cloudflare-workers',
      ai: {
        mode,
        gatewayConfigured: !!gatewayUrl,
        models: [settings.primaryModel, ...settings.fallbackModels],
        settingsSource: settings.source,
        cacheTtlSeconds: Number(c.env?.AI_CACHE_TTL || 3600),
      },
      r2MediaConfigured: !!c.env?.MEDIA_BUCKET,
    });
  });

  // Optional R2 asset proxy for heavy .glb 3D models & high-res figures
  app.get('/media/*', async (c) => {
    const bucket = c.env?.MEDIA_BUCKET;
    if (!bucket) {
      return c.text('R2 MEDIA_BUCKET not configured', 404);
    }
    const key = c.req.path.replace(/^\/media\//, '');
    if (!key) return c.text('Missing asset key', 400);

    const obj = await bucket.get(key);
    if (!obj || !obj.body) {
      return c.text('Asset not found', 404);
    }

    const headers = new Headers();
    obj.writeHttpMetadata?.(headers);
    if (!headers.has('Content-Type') && obj.httpMetadata?.contentType) {
      headers.set('Content-Type', obj.httpMetadata.contentType);
    }
    headers.set('Cache-Control', 'public, max-age=31536000, immutable');
    return new Response(obj.body, { headers });
  });

  app.post('/api/ai', async (c) => {
    const gatewayUrl = resolveGatewayCompatUrl(c.env);
    const useByok =
      c.env?.AI_GATEWAY_BYOK !== 'false' &&
      !!c.env?.CF_AIG_TOKEN &&
      !!gatewayUrl;
    const directKey = c.env?.OPENAI_API_KEY;

    if (!useByok && !directKey) {
      return c.json(
        {
          error:
            'AI Gateway BYOK (CF_ACCOUNT_ID + CF_AI_GATEWAY_ID + CF_AIG_TOKEN) atau OPENAI_API_KEY belum dikonfigurasi.',
        },
        503
      );
    }

    const body = await c.req.json<{
      messages?: Message[];
      language?: 'id' | 'en';
      courseTitle?: string;
      courseCode?: string;
      itemTitle?: string;
      anchorLabel?: string;
      quotedText?: string;
      simulationId?: string;
      simulationParams?: string[];
      uiContext?: string;
    }>().catch(() => null);
    if (!body || (body.uiContext !== undefined && typeof body.uiContext !== 'string') || !Array.isArray(body.messages) || body.messages.length > 100 || body.messages.some((message) => !message || !['user', 'assistant'].includes(message.role))) {
      return c.json({ error: 'Invalid conversation.' }, 400);
    }
    const settings = await resolveTutorSettings(c.env);
    const models = [settings.primaryModel, ...settings.fallbackModels];

    const cacheTtl = c.env?.AI_CACHE_TTL || '3600';
    const customHeaders: Record<string, string> = {};
    if (c.env?.CF_AIG_TOKEN) {
      customHeaders['cf-aig-authorization'] = `Bearer ${c.env.CF_AIG_TOKEN}`;
      customHeaders['cf-aig-byok-alias'] = 'default';
    }
    if (gatewayUrl) {
      customHeaders['cf-aig-cache-ttl'] = cacheTtl;
      customHeaders['cf-aig-metadata'] = JSON.stringify({
        course: body.courseCode || body.courseTitle || 'unknown',
        item: body.itemTitle || 'general',
      });
    }

    const systemPrompt = buildTutorSystemPrompt(body);

    const tools = {
      ...tutorAgentTools,
      updateSimulationParams: tool({
        description:
          'Ubah hanya parameter yang terdaftar pada simulasi bawaan materi, memakai ID simulasi dari konteks halaman. Untuk grafik atau animasi yang dibuat tutor, gunakan snapshot/query/act pada kontrolnya.',
        parameters: updateSimulationParamsSchema,
      }),
      revealSolutionStep: tool({
        description:
          'Buka langkah pembahasan tertentu pada soal yang sedang dibaca siswa.',
        parameters: revealSolutionStepSchema,
      }),
      showFormulaBreakdown: tool({
        description:
          'Tampilkan persamaan LaTeX utama beserta daftar definisi simbol dan satuannya.',
        parameters: showFormulaBreakdownSchema,
      }),
      showStepDerivation: tool({
        description:
          'Tampilkan penurunan aljabar/kalkulus bertahap (ekspresi dan aturan transformasinya).',
        parameters: showStepDerivationSchema,
      }),
      showComparisonTable: tool({
        description: 'Tampilkan tabel perbandingan konsep secara ringkas.',
        parameters: showComparisonTableSchema,
      }),
      showQuickQuiz: tool({
        description:
          'Tampilkan 1 pertanyaan cek pemahaman interaktif (pilihan ganda) inline.',
        parameters: showQuickQuizSchema,
      }),
      showPitfallWarning: tool({
        description:
          'Tampilkan peringatan kesalahan umum / jebakan ujian beserta koreksinya.',
        parameters: showPitfallWarningSchema,
      }),
      renderInteractivePlot: tool({
        description:
          'Buat grafik 2D interaktif dengan ekspresi matematika dan slider parameter yang bisa digeser siswa langsung.',
        parameters: renderInteractivePlotSchema,
      }),
      renderInteractive3D: tool({
        description:
          'Buat visualisasi 3D interaktif (permukaan z=f(x,y) atau vektor 3D) yang bisa diputar siswa langsung.',
        parameters: renderInteractive3DSchema,
      }),
      renderInteractiveSimulation: tool({
        description: 'Create a live 2D simulation on the page, with time, play/pause/reset, parameter sliders, trajectories, vectors, and numeric readouts. Use for animation, motion, time response, or parameter experiments. Supply explicit math expressions, units, and assumptions; no HTML or JavaScript.',
        parameters: renderInteractiveSimulationSchema,
      }),
    };

    try {
      const messages = convertToCoreMessages(body.messages);
      const toolSignatures = readGeminiToolSignatures(body.messages);
      return createDataStreamResponse({
        onError: () => body.language === 'en' ? 'The AI tutor could not answer. Please try again.' : 'Tutor AI belum bisa menjawab. Coba lagi.',
        execute(dataStream) {
          const provider = createOpenAI({
            apiKey: directKey || 'cf-aig-byok',
            baseURL: gatewayUrl || undefined,
            headers: customHeaders,
            fetch: createGatewayFetch({
              models, byok: useByok, direct: !gatewayUrl, toolSignatures,
              onToolSignature: (signature) => dataStream.writeMessageAnnotation(signature),
            }),
            compatibility: 'compatible',
          });
          const result = streamText({
            // These tools support optional fields and arbitrary numeric parameter
            // names, with Zod validation on every returned call. The SDK otherwise
            // treats unified IDs starting with "openai/" as reasoning models and
            // silently enables incompatible strict JSON schemas for every tool.
            model: provider.chat(models[0], { structuredOutputs: false }),
            system: systemPrompt,
            messages,
            tools,
            maxRetries: 0,
            abortSignal: c.req.raw.signal,
          });
          result.mergeIntoDataStream(dataStream);
        },
      });
    } catch {
      return c.json({ error: body.language === 'en' ? 'The AI tutor could not process this conversation.' : 'Tutor AI belum dapat memproses percakapan ini.' }, 400);
    }
  });

  // Unknown API routes must not return the SPA document with a misleading 200.
  app.all('/api/*', (c) => c.json({ error: 'Not found' }, 404));

  app.all('*', async (c) => {
    if (c.env?.ASSETS) {
      return c.env.ASSETS.fetch(c.req.raw);
    }
    return c.text('Not Found', 404);
  });

  return app;
}
