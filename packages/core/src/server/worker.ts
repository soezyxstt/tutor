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

export interface TutorWorkerEnv {
  OPENAI_API_KEY?: string;
  CLOUDFLARE_AI_GATEWAY_URL?: string;
  AI_MODEL?: string;
  ASSETS?: {
    fetch: (request: Request) => Promise<Response>;
  };
}

export function createTutorWorker() {
  const app = new Hono<{ Bindings: TutorWorkerEnv }>();

  app.get('/api/health', (c) =>
    c.json({ ok: true, runtime: 'cloudflare-workers' })
  );

  app.post('/api/ai', async (c) => {
    const apiKey = c.env?.OPENAI_API_KEY;
    if (!apiKey) {
      return c.json(
        {
          error:
            'OPENAI_API_KEY belum dikonfigurasi pada Cloudflare Worker environment.',
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

    const openai = createOpenAI({
      apiKey,
      baseURL: c.env.CLOUDFLARE_AI_GATEWAY_URL || undefined,
    });

    const modelName = c.env.AI_MODEL || 'gpt-4o-mini';

    const result = streamText({
      model: openai(modelName),
      system: [
        `Kamu adalah asisten tutor akademik inline untuk mata kuliah ${body.courseTitle ?? 'ini'} (${body.courseCode ?? ''}).`,
        `Halaman saat ini: ${body.itemTitle ?? 'Umum'}.`,
        body.anchorLabel ? `Bagian yang ditanyakan: ${body.anchorLabel}.` : '',
        body.quotedText ? `Teks yang diblok siswa: "${body.quotedText}".` : '',
        'Jawab ringkas, fokus, tidak bertele-tele, dan gunakan notasi LaTeX ($...$ atau $$...$$).',
        'Pilih 1-2 UI-SDK tools yang paling membantu (showFormulaBreakdown, showStepDerivation, showComparisonTable, showQuickQuiz, showPitfallWarning) agar penjelasan terstruktur.',
        body.simulationId
          ? `Simulasi aktif: "${body.simulationId}" (parameter: ${(body.simulationParams ?? []).join(', ')}). Panggil updateSimulationParams bila siswa ingin menguji perubahan parameter.`
          : '',
      ]
        .filter(Boolean)
        .join('\n'),
      messages: body.messages ?? [],
      tools: {
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
          description:
            'Tampilkan tabel perbandingan konsep secara ringkas.',
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
      },
    });

    return result.toDataStreamResponse();
  });

  app.all('*', async (c) => {
    if (c.env?.ASSETS) {
      return c.env.ASSETS.fetch(c.req.raw);
    }
    return c.text('Not Found', 404);
  });

  return app;
}
