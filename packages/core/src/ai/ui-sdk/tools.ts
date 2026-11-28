import { z } from 'zod';
import { compileMathExpression } from './safe-math';

/**
 * Declarative academic outputs for the inline tutor. These are distinct from
 * the UI SDK snapshot/query/act tools that inspect and operate their controls.
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
        expression: z.string().describe('Satu ekspresi LaTeX tanpa pembungkus $ atau $$, misal \\frac{a}{b}=c. Jangan isi dengan prosa atau kode Markdown.'),
        rule: z.string().describe('Alasan langkah dalam Markdown. Bungkus rumus di dalam kalimat dengan $...$, misal gunakan $a_0=0$ sebagai acuan.'),
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
  key: z.string().regex(/^[A-Za-z][A-Za-z0-9_]{0,23}$/).describe('Nama variabel unik dalam ekspresi; jangan gunakan x, y, t, pi, atau e'),
  label: z.string().min(1).max(160).describe('Label slider untuk siswa'),
  unit: z.string().max(60).optional(),
  min: z.number().finite(),
  max: z.number().finite(),
  step: z.number().finite().positive(),
  defaultValue: z.number().finite(),
});

const domainSchema = z.array(z.number().finite()).length(2).describe('Rentang [min, max], min harus lebih kecil daripada max');
const expressionSchema = z.string().min(1).max(600).describe('Ekspresi matematika; gunakan * dan ^, bukan JavaScript atau LaTeX. Fungsi sin/cos/tan/exp/ln/log/sqrt/abs/tanh/min/max; konstanta pi/e.');
const colorSchema = z.enum(['primary', 'success', 'warning', 'destructive']);

export const renderInteractivePlotSchema = z.object({
  title: z.string().min(1).max(200).describe('Judul grafik 2D interaktif'),
  xLabel: z.string().max(100).optional().describe('Label sumbu horizontal, misal t atau x'),
  xDomain: domainSchema,
  curves: z
    .array(
      z.object({
        label: z.string().min(1).max(100).describe('Nama kurva di legenda'),
        expression: expressionSchema
          .describe('Ekspresi matematika aman dalam x/t dan parameter slider, misal exp(-z*x)*cos(w*x)'),
        color: colorSchema.optional(),
      })
    )
    .min(1)
    .max(3),
  sliders: z.array(uiSliderParamSchema).max(4).optional(),
});

export const renderInteractive3DSchema = z.object({
  title: z.string().min(1).max(200).describe('Judul visualisasi 3D interaktif'),
  mode: z.enum(['surface', 'vectors']),
  domain: domainSchema.optional()
    .describe('Rentang [min, max] sumbu x dan y, tepat 2 angka [min, max]'),
  surfaceExpression: expressionSchema.optional()
    .describe('Ekspresi z = f(x, y) untuk mode surface, misal cos(k*sqrt(x^2+y^2))*exp(-a*(x^2+y^2))'),
  vectors: z
    .array(
      z.object({
        label: z.string().min(1).max(100),
        x: z.number().finite(),
        y: z.number().finite(),
        z: z.number().finite(),
      })
    )
    .max(6).optional(),
  sliders: z.array(uiSliderParamSchema).max(3).optional(),
});

export const renderInteractiveSimulationSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(1200).describe('Jelaskan model, asumsi, satuan, dan satu hal yang perlu diamati saat parameter berubah.'),
  duration: z.number().finite().min(0.1).max(120).describe('Durasi simulasi dalam detik. Variabel t berjalan dari 0 hingga duration.'),
  xDomain: domainSchema,
  yDomain: domainSchema,
  xLabel: z.string().max(100).optional(),
  yLabel: z.string().max(100).optional(),
  particles: z.array(z.object({
    label: z.string().min(1).max(100),
    xExpression: expressionSchema.describe('Posisi horizontal sebagai fungsi t dan parameter slider.'),
    yExpression: expressionSchema.describe('Posisi vertikal sebagai fungsi t dan parameter slider.'),
    color: colorSchema.optional(),
    trail: z.boolean().optional().describe('Tampilkan lintasan dari t=0 sampai waktu saat ini.'),
  })).min(1).max(6),
  vectors: z.array(z.object({
    label: z.string().min(1).max(100),
    originX: expressionSchema,
    originY: expressionSchema,
    xExpression: expressionSchema.describe('Komponen horizontal vektor, dalam skala koordinat gambar.'),
    yExpression: expressionSchema.describe('Komponen vertikal vektor, dalam skala koordinat gambar.'),
    color: colorSchema.optional(),
  })).max(6).optional(),
  readouts: z.array(z.object({
    label: z.string().min(1).max(100),
    expression: expressionSchema,
    unit: z.string().max(60).optional(),
  })).max(6).optional(),
  sliders: z.array(uiSliderParamSchema).max(6).optional(),
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
export type RenderInteractiveSimulationInput = z.infer<typeof renderInteractiveSimulationSchema>;

export type AiUiToolInvocation =
  | { toolName: 'updateSimulationParams'; args: UpdateSimulationParamsInput }
  | { toolName: 'revealSolutionStep'; args: RevealSolutionStepInput }
  | { toolName: 'showFormulaBreakdown'; args: ShowFormulaBreakdownInput }
  | { toolName: 'showStepDerivation'; args: ShowStepDerivationInput }
  | { toolName: 'showComparisonTable'; args: ShowComparisonTableInput }
  | { toolName: 'showQuickQuiz'; args: ShowQuickQuizInput }
  | { toolName: 'showPitfallWarning'; args: ShowPitfallWarningInput }
  | { toolName: 'renderInteractivePlot'; args: RenderInteractivePlotInput }
  | { toolName: 'renderInteractive3D'; args: RenderInteractive3DInput }
  | { toolName: 'renderInteractiveSimulation'; args: RenderInteractiveSimulationInput };

const TOOL_SCHEMAS = {
  updateSimulationParams: updateSimulationParamsSchema,
  revealSolutionStep: revealSolutionStepSchema,
  showFormulaBreakdown: showFormulaBreakdownSchema,
  showStepDerivation: showStepDerivationSchema,
  showComparisonTable: showComparisonTableSchema,
  showQuickQuiz: showQuickQuizSchema,
  showPitfallWarning: showPitfallWarningSchema,
  renderInteractivePlot: renderInteractivePlotSchema,
  renderInteractive3D: renderInteractive3DSchema,
  renderInteractiveSimulation: renderInteractiveSimulationSchema,
};

function validateDomain(domain: number[]) {
  const span = domain[1] - domain[0];
  if (!(domain[0] < domain[1]) || !Number.isFinite(span) || span / 320 === 0) throw new Error('Each domain must have finite increasing bounds with a representable sampling interval.');
}

function sliderDefaults(sliders: z.infer<typeof uiSliderParamSchema>[]) {
  const defaults: Record<string, number> = {};
  for (const slider of sliders) {
    if (['x', 'y', 't', 'pi', 'e', 'constructor', 'prototype', '__proto__'].includes(slider.key.toLowerCase()) || Object.hasOwn(defaults, slider.key)) throw new Error('Use unique slider keys; x, y, t, pi, and e are reserved.');
    if (!(slider.min < slider.max) || !Number.isFinite(slider.max - slider.min) || slider.step > slider.max - slider.min || slider.min + slider.step === slider.min || slider.max - slider.step === slider.max || slider.defaultValue < slider.min || slider.defaultValue > slider.max) throw new Error(`Invalid bounds, step, or default for slider ${slider.key}.`);
    defaults[slider.key] = slider.defaultValue;
  }
  return defaults;
}

/** Validate before reporting a tool result and again before rendering history.
 * Syntax and variable errors are repairable tool feedback, never silent zeros. */
export function validateAiToolCall(toolName: string, args: unknown): { ok: true; invocation: AiUiToolInvocation } | { ok: false; error: string } {
  if (!Object.hasOwn(TOOL_SCHEMAS, toolName)) return { ok: false, error: 'Unknown tutor tool.' };
  const parsed = TOOL_SCHEMAS[toolName as keyof typeof TOOL_SCHEMAS].safeParse(args);
  if (!parsed.success) return { ok: false, error: parsed.error.issues.slice(0, 3).map((issue) => `${issue.path.join('.')}: ${issue.message}`).join('; ') };
  const invocation = { toolName, args: parsed.data } as AiUiToolInvocation;
  try {
    if (invocation.toolName === 'showQuickQuiz') {
      const ids = invocation.args.options.map((option) => option.id);
      if (new Set(ids).size !== ids.length || !ids.includes(invocation.args.correctOptionId)) throw new Error('Quiz option IDs must be unique and include the correctOptionId.');
    }
    if (invocation.toolName === 'showComparisonTable' && invocation.args.rows.some((row) => row.length !== invocation.args.columns.length)) throw new Error('Each table row must match the number of columns.');
    if (invocation.toolName === 'renderInteractivePlot') {
      const data = invocation.args;
      validateDomain(data.xDomain);
      const defaults = sliderDefaults(data.sliders ?? []);
      for (const curve of data.curves) {
        const fn = compileMathExpression(curve.expression, ['x', 't', ...Object.keys(defaults)]);
        if (!Array.from({ length: 17 }, (_, index) => data.xDomain[0] + (data.xDomain[1] - data.xDomain[0]) * index / 16).some((x) => Number.isFinite(fn({ ...defaults, x, t: x })))) throw new Error('The curve has no defined values in the supplied domain.');
      }
    }
    if (invocation.toolName === 'renderInteractive3D') {
      const data = invocation.args;
      validateDomain(data.domain ?? [-1.5, 1.5]);
      const defaults = sliderDefaults(data.sliders ?? []);
      if (data.mode === 'surface') {
        if (!data.surfaceExpression) throw new Error('Surface mode needs surfaceExpression.');
        const fn = compileMathExpression(data.surfaceExpression, ['x', 'y', ...Object.keys(defaults)]);
        const [min, max] = data.domain ?? [-1.5, 1.5];
        const values = Array.from({ length: 5 }, (_, i) => min + (max - min) * i / 4);
        if (!values.some((x) => values.some((y) => Number.isFinite(fn({ ...defaults, x, y }))))) throw new Error('The surface has no defined values in the supplied domain.');
      } else {
        if (!data.vectors?.length) throw new Error('Vector mode needs at least one vector.');
        if (data.sliders?.length) throw new Error('Fixed 3D vectors do not use sliders. Use renderInteractiveSimulation for parameter-dependent vectors.');
      }
    }
    if (invocation.toolName === 'renderInteractiveSimulation') {
      const data = invocation.args;
      validateDomain(data.xDomain);
      validateDomain(data.yDomain);
      const defaults = sliderDefaults(data.sliders ?? []);
      const expressions = [
        ...data.particles.flatMap((particle) => [particle.xExpression, particle.yExpression]),
        ...(data.vectors ?? []).flatMap((vector) => [vector.originX, vector.originY, vector.xExpression, vector.yExpression]),
        ...(data.readouts ?? []).map((readout) => readout.expression),
      ];
      for (const expression of expressions) {
        const fn = compileMathExpression(expression, ['t', ...Object.keys(defaults)]);
        if (!Number.isFinite(fn({ ...defaults, t: 0 }))) throw new Error('Every simulation expression must be defined at t=0 with the default parameters.');
      }
    }
    return { ok: true, invocation };
  } catch (error) {
    return { ok: false, error: error instanceof Error ? error.message : 'Invalid interactive specification.' };
  }
}
