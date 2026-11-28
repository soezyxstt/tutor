import { z } from 'zod';

/**
 * Balanced 7-tool UI-SDK for the Inline AI Tutor:
 * - Page/Simulation Control: updateSimulationParams, revealSolutionStep
 * - Structured Explanations: showFormulaBreakdown, showStepDerivation, showComparisonTable
 * - Active Learning & Exam Prep: showQuickQuiz, showPitfallWarning
 */

export const updateSimulationParamsSchema = z.object({
  simulationId: z
    .string()
    .describe('ID simulasi yang sedang aktif pada soal atau materi'),
  params: z
    .record(z.string(), z.number())
    .describe('Pasangan key-value numerik parameter simulasi yang akan diubah'),
  reason: z
    .string()
    .optional()
    .describe('Alasan singkat mengapa parameter diubah'),
});

export const revealSolutionStepSchema = z.object({
  stepIndex: z
    .number()
    .int()
    .min(0)
    .describe('Indeks langkah pembahasan (dimulai dari 0) yang akan dibuka'),
  note: z
    .string()
    .optional()
    .describe('Penekanan singkat terkait langkah yang dibuka'),
});

export const showFormulaBreakdownSchema = z.object({
  title: z.string().describe('Judul persamaan atau hukum fisika/matematika'),
  latex: z.string().describe('Ekspresi LaTeX utama tanpa tanda $$'),
  symbols: z
    .array(
      z.object({
        symbol: z.string().describe('Simbol dalam LaTeX, misal \\zeta'),
        meaning: z.string().describe('Arti fisis/matematis simbol'),
        unit: z.string().optional().describe('Satuan SI bila ada'),
      })
    )
    .describe('Daftar definisi variabel pada persamaan'),
});

export const showStepDerivationSchema = z.object({
  title: z.string().describe('Judul penurunan aljabar atau kalkulus'),
  steps: z
    .array(
      z.object({
        expression: z.string().describe('Ekspresi matematika (LaTeX, misal $a = b$)'),
        rule: z.string().describe('Aturan atau alasan transformasi singkat'),
      })
    )
    .min(2)
    .max(6),
});

export const showComparisonTableSchema = z.object({
  title: z.string().describe('Judul tabel perbandingan'),
  columns: z.array(z.string()).min(2),
  rows: z.array(z.array(z.string())).min(1),
});

export const showQuickQuizSchema = z.object({
  question: z.string().describe('Pertanyaan cek pemahaman singkat (mendukung LaTeX)'),
  options: z
    .array(
      z.object({
        id: z.string(),
        label: z.string(),
      })
    )
    .min(2)
    .max(4),
  correctOptionId: z.string(),
  explanation: z.string().describe('Penjelasan singkat setelah siswa memilih jawaban'),
});

export const showPitfallWarningSchema = z.object({
  title: z.string().describe('Judul kesalahan umum atau jebakan ujian'),
  misconception: z.string().describe('Kesalahan yang sering dilakukan mahasiswa'),
  correction: z.string().describe('Cara atau pemahaman yang benar'),
});

const uiSliderParamSchema = z.object({
  key: z.string().describe('Nama variabel di dalam ekspresi matematika'),
  label: z.string().describe('Label slider untuk siswa'),
  unit: z.string().optional(),
  min: z.number(),
  max: z.number(),
  step: z.number(),
  defaultValue: z.number(),
});

export const renderInteractivePlotSchema = z.object({
  title: z.string().describe('Judul grafik 2D interaktif'),
  xLabel: z.string().optional().describe('Label sumbu horizontal, misal t atau x'),
  xDomain: z
    .array(z.number())
    .length(2)
    .describe('Rentang [min, max] sumbu x, tepat 2 angka [min, max]'),
  curves: z
    .array(
      z.object({
        label: z.string().describe('Nama kurva di legenda'),
        expression: z
          .string()
          .describe('Ekspresi matematika aman dalam x/t dan parameter slider, misal exp(-z*x)*cos(w*x)'),
        color: z.enum(['primary', 'success', 'warning', 'destructive']).optional(),
      })
    )
    .min(1)
    .max(3),
  sliders: z.array(uiSliderParamSchema).max(4).optional(),
});

export const renderInteractive3DSchema = z.object({
  title: z.string().describe('Judul visualisasi 3D interaktif'),
  mode: z.enum(['surface', 'vectors']),
  domain: z
    .array(z.number())
    .length(2)
    .optional()
    .describe('Rentang [min, max] sumbu x dan y, tepat 2 angka [min, max]'),
  surfaceExpression: z
    .string()
    .optional()
    .describe('Ekspresi z = f(x, y) untuk mode surface, misal cos(k*sqrt(x^2+y^2))*exp(-a*(x^2+y^2))'),
  vectors: z
    .array(
      z.object({
        label: z.string(),
        x: z.number(),
        y: z.number(),
        z: z.number(),
      })
    )
    .optional(),
  sliders: z.array(uiSliderParamSchema).max(3).optional(),
});

export type UpdateSimulationParamsInput = z.infer<typeof updateSimulationParamsSchema>;
export type RevealSolutionStepInput = z.infer<typeof revealSolutionStepSchema>;
export type ShowFormulaBreakdownInput = z.infer<typeof showFormulaBreakdownSchema>;
export type ShowStepDerivationInput = z.infer<typeof showStepDerivationSchema>;
export type ShowComparisonTableInput = z.infer<typeof showComparisonTableSchema>;
export type ShowQuickQuizInput = z.infer<typeof showQuickQuizSchema>;
export type ShowPitfallWarningInput = z.infer<typeof showPitfallWarningSchema>;
export type RenderInteractivePlotInput = z.infer<typeof renderInteractivePlotSchema>;
export type RenderInteractive3DInput = z.infer<typeof renderInteractive3DSchema>;

export type AiUiToolInvocation =
  | { toolName: 'updateSimulationParams'; args: UpdateSimulationParamsInput }
  | { toolName: 'revealSolutionStep'; args: RevealSolutionStepInput }
  | { toolName: 'showFormulaBreakdown'; args: ShowFormulaBreakdownInput }
  | { toolName: 'showStepDerivation'; args: ShowStepDerivationInput }
  | { toolName: 'showComparisonTable'; args: ShowComparisonTableInput }
  | { toolName: 'showQuickQuiz'; args: ShowQuickQuizInput }
  | { toolName: 'showPitfallWarning'; args: ShowPitfallWarningInput }
  | { toolName: 'renderInteractivePlot'; args: RenderInteractivePlotInput }
  | { toolName: 'renderInteractive3D'; args: RenderInteractive3DInput };
