import { Hono } from 'hono';
import { streamText, tool } from 'ai';
import { createOpenAI } from '@ai-sdk/openai';
import {
  renderInteractive3DSchema,
  renderInteractivePlotSchema,
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

function parseModelList(env: TutorWorkerEnv | undefined): string[] {
  const primary = (env?.AI_MODEL || 'google-ai-studio/gemini-2.5-flash').trim();
  const fallbacks = (env?.AI_FALLBACK_MODELS || '')
    .split(',')
    .map((m) => m.trim())
    .filter(Boolean);
  return Array.from(new Set([primary, ...fallbacks]));
}

export function createTutorWorker() {
  const app = new Hono<{ Bindings: TutorWorkerEnv }>();

  app.get('/api/health', (c) => {
    const gatewayUrl = resolveGatewayCompatUrl(c.env);
    const useByok = c.env?.AI_GATEWAY_BYOK !== 'false' && !!c.env?.CF_AIG_TOKEN && !!gatewayUrl;
    const hasDirectKey = !!c.env?.OPENAI_API_KEY;
    const mode = useByok ? 'byok' : hasDirectKey ? 'direct' : 'unconfigured';

    return c.json({
      ok: true,
      runtime: 'cloudflare-workers',
      ai: {
        mode,
        gatewayConfigured: !!gatewayUrl,
        models: parseModelList(c.env),
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
      messages?: Array<{ role: 'user' | 'assistant' | 'system'; content: string }>;
      courseTitle?: string;
      courseCode?: string;
      itemTitle?: string;
      anchorLabel?: string;
      quotedText?: string;
      simulationId?: string;
      simulationParams?: string[];
    }>();

    const cacheTtl = c.env?.AI_CACHE_TTL || '3600';
    const customHeaders: Record<string, string> = {};
    if (c.env?.CF_AIG_TOKEN) {
      customHeaders['cf-aig-authorization'] = `Bearer ${c.env.CF_AIG_TOKEN}`;
    }
    if (gatewayUrl) {
      customHeaders['cf-aig-cache-ttl'] = cacheTtl;
      customHeaders['cf-aig-metadata'] = JSON.stringify({
        course: body.courseCode || body.courseTitle || 'unknown',
        item: body.itemTitle || 'general',
      });
    }

    // In BYOK mode, strip the dummy Authorization header so Cloudflare AI Gateway
    // injects the stored provider key (Gemini, OpenAI, Muse AI) automatically.
    const byokFetch: typeof fetch = async (input, init) => {
      if (useByok && init?.headers) {
        const headers = new Headers(init.headers);
        headers.delete('authorization');
        return fetch(input, { ...init, headers });
      }
      return fetch(input, init);
    };

    const provider = createOpenAI({
      apiKey: directKey || 'cf-aig-byok',
      baseURL: gatewayUrl || undefined,
      headers: customHeaders,
      fetch: useByok ? byokFetch : undefined,
      compatibility: 'compatible',
    });

    const systemPrompt = [
      `Kamu adalah asisten tutor akademik inline untuk mata kuliah ${body.courseTitle ?? 'ini'} (${body.courseCode ?? ''}).`,
      `Halaman saat ini: ${body.itemTitle ?? 'Umum'}.`,
      body.anchorLabel ? `Bagian yang ditanyakan: ${body.anchorLabel}.` : '',
      body.quotedText ? `Teks yang diblok siswa: "${body.quotedText}".` : '',
      'Aturan pedagogis:',
      '- Jawab ringkas, fokus, tidak bertele-tele, dan gunakan notasi LaTeX ($...$ atau $$...$$).',
      '- Socratic Guardrail: jika siswa meminta bocoran jawaban langsung pada latihan di giliran awal, jangan langsung memberi hasil akhir; konfirmasi apa yang sudah benar lalu beri 1 pertanyaan pancingan terarah.',
      '- Rubric-Grounded Grading: jika siswa meminta memeriksa alur berpikir / jawaban essay, susun evaluasi menjadi (1) kriteria yang sudah tepat, (2) titik divergensi pertama jika ada kesalahan asumsi/logika, (3) dampak kesalahan terhadap hasil akhir, dan (4) arahan revisi spesifik.',
      '- Pilih 1-2 UI-SDK tools yang paling membantu (showFormulaBreakdown, showStepDerivation, showComparisonTable, showQuickQuiz, showPitfallWarning, renderInteractivePlot, renderInteractive3D) agar penjelasan terstruktur.',
      body.simulationId
        ? `Simulasi aktif: "${body.simulationId}" (parameter: ${(body.simulationParams ?? []).join(', ')}). Panggil updateSimulationParams bila siswa ingin menguji perubahan parameter.`
        : '',
    ]
      .filter(Boolean)
      .join('\n');

    const tools = {
      updateSimulationParams: tool({
        description:
          'Ubah parameter simulasi interaktif di layar siswa secara langsung.',
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
    };

    const models = parseModelList(c.env);
    let lastError: unknown;

    for (const modelName of models) {
      try {
        const result = streamText({
          model: provider(modelName),
          system: systemPrompt,
          messages: body.messages ?? [],
          tools,
        });
        return result.toDataStreamResponse();
      } catch (err) {
        lastError = err;
      }
    }

    return c.json(
      {
        error: 'Semua model AI gagal merespons melalui AI Gateway.',
        detail: lastError instanceof Error ? lastError.message : String(lastError),
      },
      502
    );
  });

  app.all('*', async (c) => {
    if (c.env?.ASSETS) {
      return c.env.ASSETS.fetch(c.req.raw);
    }
    return c.text('Not Found', 404);
  });

  return app;
}
