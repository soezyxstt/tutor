import * as React from 'react';
import { useChat } from '@ai-sdk/react';
import { ArrowUp, BotMessageSquare, RotateCcw, X } from 'lucide-react';
import { Button, CollapsibleMotion, Textarea, cn } from '@tutor/ui';
import type { SimulationSpec } from '../types/course';
import { useTutorStore } from '../store/tutor-store';
import { MathMarkdown } from '../content/math-markdown';
import type { AiUiToolInvocation } from './ui-sdk/tools';
import { AiToolInvocationView } from './ui-sdk/tool-renderers';

interface RenderedMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  tools?: AiUiToolInvocation[];
}

export function InlineAiThread({
  anchorId,
  anchorLabel,
  courseSlug,
  courseTitle,
  itemKey,
  itemTitle,
  simulation,
  stepCount,
  apiEndpoint = '/api/ai',
  className,
}: {
  anchorId: string;
  anchorLabel: string;
  courseSlug: string;
  courseTitle?: string;
  itemKey: string;
  itemTitle: string;
  simulation?: SimulationSpec;
  stepCount?: number;
  apiEndpoint?: string;
  className?: string;
}) {
  const thread = useTutorStore((s) => s.inlineThreads[anchorId]);
  const closeInlineAi = useTutorStore((s) => s.closeInlineAi);
  const clearInlineDraft = useTutorStore((s) => s.clearInlineDraft);
  const updateSimParams = useTutorStore((s) => s.updateSimParams);
  const revealStep = useTutorStore((s) => s.revealStep);

  const isOpen = !!thread?.open;
  const quotedText = thread?.quotedText;
  const draftPrompt = thread?.draftPrompt;

  const [fallbackMessages, setFallbackMessages] = React.useState<RenderedMessage[]>([]);
  const [usingFallback, setUsingFallback] = React.useState(false);
  const [inputValue, setInputValue] = React.useState('');
  const lastSubmittedRef = React.useRef<string | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const runLocalFallback = React.useCallback(
    (promptText: string) => {
      const lower = promptText.toLowerCase();
      const tools: AiUiToolInvocation[] = [];
      let reply = '';

      if (
        simulation &&
        (lower.includes('redaman') ||
          lower.includes('damping') ||
          lower.includes('simulasi') ||
          lower.includes('gesek'))
      ) {
        const numMatch = promptText.match(/(?:^|\s)(\d+(?:\.\d+)?)(?:\s|[?.!,]|$)/);
        const nextDamping = numMatch
          ? Math.min(6, Math.max(0, Number(numMatch[1])))
          : 2.5;
        updateSimParams(`${courseSlug}:${simulation.id}`, {
          damping: nextDamping,
        });
        tools.push({
          toolName: 'updateSimulationParams',
          args: {
            simulationId: simulation.id,
            params: { damping: nextDamping },
          },
        });
        tools.push({
          toolName: 'showFormulaBreakdown',
          args: {
            title: 'Rasio Redaman Kanonik',
            latex: '\\zeta = \\frac{c}{2\\sqrt{km}}',
            symbols: [
              { symbol: 'c', meaning: 'Koefisien redaman viskos', unit: 'N·s/m' },
              { symbol: 'k', meaning: 'Konstanta kekakuan pegas', unit: 'N/m' },
              { symbol: 'm', meaning: 'Massa sistem', unit: 'kg' },
            ],
          },
        });
        reply = `Parameter redaman diperbarui menjadi $c = ${nextDamping}\\,\\text{N}\\cdot\\text{s/m}$. Lihat langsung perubahan kurva $x(t)$ pada simulasi di atas.`;
      } else if (
        lower.includes('turun') ||
        lower.includes('aljabar') ||
        lower.includes('detail') ||
        lower.includes('mengapa')
      ) {
        tools.push({
          toolName: 'showStepDerivation',
          args: {
            title: `Penurunan Aljabar · ${anchorLabel}`,
            steps: [
              {
                expression: '$m\\ddot{x} + c\\dot{x} + kx = 0$',
                rule: 'Hukum II Newton dengan gaya pegas & redam',
              },
              {
                expression: '$\\ddot{x} + \\frac{c}{m}\\dot{x} + \\frac{k}{m}x = 0$',
                rule: 'Bagi kedua ruas dengan massa m',
              },
              {
                expression: '$\\ddot{x} + 2\\zeta\\omega_n\\dot{x} + \\omega_n^2 x = 0$',
                rule: 'Substitusi ωₙ = √(k/m) dan 2ζωₙ = c/m',
              },
            ],
          },
        });
        tools.push({
          toolName: 'showPitfallWarning',
          args: {
            title: 'Cek Tanda & Satuan',
            misconception: 'Menulis gaya redaman bertanda positif (+cẋ) di ruas kanan.',
            correction:
              'Gaya redaman selalu melawan arah kecepatan (−cẋ), sehingga saat dipindah ke ruas kiri menjadi +cẋ.',
          },
        });
        reply = 'Berikut alur penurunan ringkas agar transformasinya mudah diikuti sambil tetap membaca bagian di atas:';
      } else if (
        lower.includes('kuis') ||
        lower.includes('cek pemahaman') ||
        lower.includes('uji')
      ) {
        tools.push({
          toolName: 'showQuickQuiz',
          args: {
            question:
              'Jika koefisien redaman $c$ dinaikkan hingga $\\zeta = 1$, bagaimana respons massa setelah dilepas?',
            options: [
              { id: 'a', label: 'Tetap berosilasi dengan periode lebih panjang' },
              {
                id: 'b',
                label: 'Kembali ke kesetimbangan paling cepat tanpa melewati $x = 0$',
              },
              { id: 'c', label: 'Amplitudo meningkat secara eksponensial' },
            ],
            correctOptionId: 'b',
            explanation:
              'Tepat! Pada $\\zeta = 1$ (*critically damped*), sistem kembali ke $x = 0$ secepat mungkin tanpa *overshoot*.',
          },
        });
        reply = 'Coba cek pemahaman singkat langsung di sini:';
      } else if (lower.includes('3d') || lower.includes('permukaan') || lower.includes('spasial')) {
        tools.push({
          toolName: 'renderInteractive3D',
          args: {
            title: 'Permukaan Gelombang Teredam 3D · z(x, y)',
            mode: 'surface',
            domain: [-1.5, 1.5],
            surfaceExpression: 'cos(k * sqrt(x^2 + y^2)) * exp(-a * (x^2 + y^2))',
            sliders: [
              { key: 'k', label: 'Bilangan gelombang (k)', min: 1.5, max: 6, step: 0.25, defaultValue: 3.5 },
              { key: 'a', label: 'Peluruhan (a)', min: 0.1, max: 1.2, step: 0.05, defaultValue: 0.45 },
            ],
          },
        });
        reply = 'Saya membuat visualisasi permukaan 3D interaktif langsung di sini. Seret kanvas untuk memutar sudut pandang dan geser slider untuk mengubah parameter:';
      } else if (lower.includes('grafik') || lower.includes('plot') || lower.includes('kurva')) {
        tools.push({
          toolName: 'renderInteractivePlot',
          args: {
            title: 'Respons Osilator x(t) & Amplop Peluruhan',
            xLabel: 't',
            xDomain: [0, 10],
            curves: [
              { label: 'x(t)', expression: 'exp(-z * w * t) * cos(w * t)', color: 'primary' },
              { label: '+amplop', expression: 'exp(-z * w * t)', color: 'warning' },
            ],
            sliders: [
              { key: 'z', label: 'Rasio redaman (ζ)', min: 0.02, max: 0.6, step: 0.02, defaultValue: 0.12 },
              { key: 'w', label: 'Frekuensi (ωₙ)', unit: 'rad/s', min: 1, max: 6, step: 0.2, defaultValue: 3.4 },
            ],
          },
        });
        reply = 'Berikut grafik 2D interaktif yang bisa Anda eksplorasi langsung (arahkan kursor untuk melihat koordinat dan geser slider):';
      } else if (lower.includes('banding') || lower.includes('tabel') || lower.includes('rezim')) {
        tools.push({
          toolName: 'showComparisonTable',
          args: {
            title: 'Perbandingan Rezim Osilasi',
            columns: ['Rezim', 'Syarat', 'Respon x(t)'],
            rows: [
              ['Underdamped', '$0 < \\zeta < 1$', 'Osilasi meluruh'],
              ['Critically damped', '$\\zeta = 1$', 'Tercepat tanpa osilasi'],
              ['Overdamped', '$\\zeta > 1$', 'Meluruh lambat'],
            ],
          },
        });
        reply = 'Berikut perbandingan ringkas ketiga rezim redaman:';
      } else if (
        lower.includes('jebakan') ||
        lower.includes('salah') ||
        lower.includes('pitfall')
      ) {
        tools.push({
          toolName: 'showPitfallWarning',
          args: {
            title: 'Kesalahan Umum pada Ujian',
            misconception: 'Menggunakan ωₙ alih-alih ωd saat menulis solusi sin/cos teredam.',
            correction:
              'Frekuensi osilasi teredam adalah $\\omega_d = \\omega_n\\sqrt{1 - \\zeta^2}$, bukan $\\omega_n$.',
          },
        });
        reply = 'Perhatikan jebakan berikut saat mengerjakan soal serupa:';
      } else if (stepCount && (lower.includes('langkah') || lower.includes('step'))) {
        const stepMatch = promptText.match(/langkah\s*(\d+)/i);
        const idx = stepMatch
          ? Math.min(stepCount - 1, Math.max(0, Number(stepMatch[1]) - 1))
          : 1;
        revealStep(itemKey, idx);
        tools.push({
          toolName: 'revealSolutionStep',
          args: { stepIndex: idx },
        });
        reply = `Saya telah membuka **Langkah ${idx + 1}** di halaman ini agar Anda bisa langsung membandingkannya.`;
      } else {
        tools.push({
          toolName: 'showFormulaBreakdown',
          args: {
            title: `Inti Konsep · ${anchorLabel}`,
            latex: 'm\\ddot{x} + c\\dot{x} + kx = 0',
            symbols: [
              { symbol: 'm\\ddot{x}', meaning: 'Gaya inersia', unit: 'N' },
              { symbol: 'c\\dot{x}', meaning: 'Gaya redaman viskos', unit: 'N' },
              { symbol: 'kx', meaning: 'Gaya pemulih pegas', unit: 'N' },
            ],
          },
        });
        reply = quotedText
          ? `Terkait kutipan yang Anda tandai, inti utamanya adalah menjaga konsistensi tanda gaya pemulih dan redaman pada persamaan gerak di bawah ini.`
          : `Untuk **${anchorLabel}** pada *${itemTitle}*, fokuslah pada relasi variabel utama berikut. Anda juga bisa meminta penurunan aljabar, cek pemahaman, atau uji simulasi langsung di sini.`;
      }

      setFallbackMessages((prev) => [
        ...prev,
        { id: `u-${Date.now()}`, role: 'user', content: promptText },
        {
          id: `a-${Date.now() + 1}`,
          role: 'assistant',
          content: reply,
          tools,
        },
      ]);
    },
    [
      anchorLabel,
      courseSlug,
      itemKey,
      itemTitle,
      quotedText,
      revealStep,
      simulation,
      stepCount,
      updateSimParams,
    ]
  );

  const { messages, append, setMessages, status } = useChat({
    id: anchorId,
    api: apiEndpoint,
    body: {
      courseTitle,
      itemTitle,
      anchorLabel,
      quotedText,
      simulationId: simulation?.id,
      simulationParams: simulation?.params.map((p) => p.key),
    },
    onToolCall: ({ toolCall }) => {
      if (toolCall.toolName === 'updateSimulationParams' && simulation) {
        const args = toolCall.args as { params?: Record<string, number> };
        if (args.params) {
          updateSimParams(`${courseSlug}:${simulation.id}`, args.params);
        }
        return 'Parameter simulasi diperbarui.';
      }
      if (toolCall.toolName === 'revealSolutionStep') {
        const args = toolCall.args as { stepIndex?: number };
        if (typeof args.stepIndex === 'number') {
          revealStep(itemKey, args.stepIndex);
        }
        return 'Langkah dibuka.';
      }
      return 'Ditampilkan inline.';
    },
    onError: () => {
      setUsingFallback(true);
      if (lastSubmittedRef.current) {
        const pending = lastSubmittedRef.current;
        lastSubmittedRef.current = null;
        runLocalFallback(pending);
      }
    },
  });

  const sendPrompt = React.useCallback(
    async (text: string) => {
      const trimmed = text.trim();
      if (!trimmed) return;
      setInputValue('');

      if (usingFallback) {
        runLocalFallback(trimmed);
        return;
      }

      lastSubmittedRef.current = trimmed;
      try {
        await append({ role: 'user', content: trimmed });
      } catch {
        setUsingFallback(true);
        if (lastSubmittedRef.current) {
          const pending = lastSubmittedRef.current;
          lastSubmittedRef.current = null;
          runLocalFallback(pending);
        }
      }
    },
    [append, runLocalFallback, usingFallback]
  );

  React.useEffect(() => {
    if (isOpen && draftPrompt) {
      const prompt = draftPrompt;
      clearInlineDraft(anchorId);
      void sendPrompt(prompt);
    }
  }, [anchorId, clearInlineDraft, draftPrompt, isOpen, sendPrompt]);

  const combinedMessages: RenderedMessage[] = React.useMemo(() => {
    if (usingFallback) return fallbackMessages;
    return messages.map((m) => {
      const tools: AiUiToolInvocation[] = [];
      for (const p of m.parts ?? []) {
        if (p.type === 'tool-invocation' && 'toolInvocation' in p) {
          const inv = p.toolInvocation;
          tools.push({
            toolName: inv.toolName as AiUiToolInvocation['toolName'],
            args: inv.args,
          } as AiUiToolInvocation);
        }
      }
      return {
        id: m.id,
        role: m.role === 'user' ? 'user' : 'assistant',
        content: m.content,
        tools,
      };
    });
  }, [fallbackMessages, messages, usingFallback]);

  const isBusy = status === 'submitted' || status === 'streaming';

  const quickPrompts = React.useMemo(() => {
    const prompts: string[] = [];
    if (simulation) {
      prompts.push('Ubah redaman jadi 2.5 di simulasi');
    }
    prompts.push('Gambarkan grafik interaktif x(t)');
    prompts.push('Visualisasikan permukaan 3D');
    prompts.push('Tunjukkan penurunan aljabarnya');
    prompts.push('Buat kuis cek pemahaman');
    return prompts;
  }, [simulation]);

  return (
    <CollapsibleMotion open={isOpen}>
      <div
        ref={containerRef}
        data-inline-ai={anchorId}
        className={cn(
          'my-4 border-l-2 border-primary bg-surface-subtle/45 py-3 pr-3 pl-4',
          className
        )}
      >
        {/* Compact inline header */}
        <div className="flex items-center justify-between gap-2 pb-2">
          <div className="flex min-w-0 items-center gap-1.5 text-xs font-semibold text-primary">
            <BotMessageSquare className="size-3.5 shrink-0" />
            <span className="truncate">Tutor AI · {anchorLabel}</span>
          </div>

          <div className="flex shrink-0 items-center gap-0.5">
            {combinedMessages.length > 0 && (
              <Button
                variant="icon"
                size="icon-xs"
                aria-label="Reset diskusi inline"
                title="Reset"
                onClick={() => {
                  setMessages([]);
                  setFallbackMessages([]);
                }}
              >
                <RotateCcw className="size-3" />
              </Button>
            )}
            <Button
              variant="icon"
              size="icon-xs"
              aria-label="Tutup Tutor AI inline"
              title="Tutup"
              onClick={() => closeInlineAi(anchorId)}
            >
              <X className="size-3.5" />
            </Button>
          </div>
        </div>

        {/* Highlighted / quoted excerpt when triggered from text selection */}
        {quotedText && (
          <blockquote className="mb-3 border-l-2 border-border pl-2.5 text-xs italic text-muted-foreground">
            &ldquo;{quotedText}&rdquo;
          </blockquote>
        )}

        {/* Messages or quick prompts */}
        {combinedMessages.length === 0 ? (
          <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1">
            {quickPrompts.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => void sendPrompt(q)}
                className="cursor-pointer py-0.5 text-left text-xs text-primary transition-colors hover:underline"
              >
                → {q}
              </button>
            ))}
          </div>
        ) : (
          <div className="mb-3 space-y-4">
            {combinedMessages.map((msg) => (
              <div key={msg.id} className="space-y-1">
                <div className="text-[10px] font-semibold tracking-wider text-muted-foreground uppercase">
                  {msg.role === 'user' ? 'Kamu' : 'Tutor AI'}
                </div>
                {msg.content && (
                  <MathMarkdown
                    content={msg.content}
                    className="text-[13.5px] leading-relaxed"
                  />
                )}
                {msg.tools && msg.tools.length > 0 && (
                  <div className="space-y-1.5">
                    {msg.tools.map((inv, idx) => (
                      <AiToolInvocationView key={idx} invocation={inv} />
                    ))}
                  </div>
                )}
              </div>
            ))}
            {isBusy && (
              <div className="text-xs text-muted-foreground">
                Menyusun penjelasan…
              </div>
            )}
          </div>
        )}

        {/* Minimal inline composer */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            void sendPrompt(inputValue);
          }}
          className="flex items-end gap-2 border-t border-border/70 pt-2"
        >
          <Textarea
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                void sendPrompt(inputValue);
              }
            }}
            placeholder="Tanyakan lanjutan langsung di bagian ini…"
            className="min-h-7 max-h-24 flex-1 border-b-0 px-0 py-0.5 text-[13px]"
          />
          <Button
            type="submit"
            size="icon-xs"
            variant="icon"
            disabled={!inputValue.trim() || isBusy}
            aria-label="Kirim pertanyaan"
            className="text-primary hover:text-primary-hover"
          >
            <ArrowUp className="size-3.5" />
          </Button>
        </form>
      </div>
    </CollapsibleMotion>
  );
}
