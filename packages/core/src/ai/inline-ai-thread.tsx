import * as React from 'react';
import { useChat } from '@ai-sdk/react';
import { ArrowUp, BotMessageSquare, RotateCcw, X } from 'lucide-react';
import { Button, CollapsibleMotion, Textarea, cn } from '@tutor/ui';
import type { SimulationSpec } from '../types/course';
import { useTutorStore } from '../store/tutor-store';
import { MathMarkdown } from '../content/math-markdown';
import type { AiUiToolInvocation } from './ui-sdk/tools';
import { AiToolInvocationView } from './ui-sdk/tool-renderers';
import { useLanguage } from '../i18n/language-provider';

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
  const { locale, t } = useLanguage();
  const thread = useTutorStore((s) => s.inlineThreads[anchorId]);
  const closeInlineAi = useTutorStore((s) => s.closeInlineAi);
  const clearInlineDraft = useTutorStore((s) => s.clearInlineDraft);
  const updateSimParams = useTutorStore((s) => s.updateSimParams);
  const revealStep = useTutorStore((s) => s.revealStep);
  const isOpen = !!thread?.open;
  const quotedText = thread?.quotedText;
  const draftPrompt = thread?.draftPrompt;
  const [inputValue, setInputValue] = React.useState('');
  const [failed, setFailed] = React.useState(false);

  const { messages, append, setMessages, status, reload, stop } = useChat({
    id: anchorId,
    api: apiEndpoint,
    body: {
      language: locale,
      courseTitle,
      courseCode: courseSlug,
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
          const validParams: Record<string, number> = {};
          for (const definition of simulation.params) {
            const value = args.params[definition.key];
            if (typeof value === 'number' && Number.isFinite(value)) {
              validParams[definition.key] = Math.min(definition.max, Math.max(definition.min, value));
            }
          }
          updateSimParams(`${courseSlug}:${simulation.id}`, validParams);
        }
        return t('Parameter simulasi diperbarui.', 'Simulation parameters updated.');
      }
      if (toolCall.toolName === 'revealSolutionStep') {
        const args = toolCall.args as { stepIndex?: number };
        if (typeof args.stepIndex === 'number' && Number.isInteger(args.stepIndex) && args.stepIndex >= 0 && (stepCount === undefined || args.stepIndex < stepCount)) {
          revealStep(itemKey, args.stepIndex);
        }
        return t('Langkah dibuka.', 'Step opened.');
      }
      return t('Ditampilkan pada halaman.', 'Displayed on the page.');
    },
    onError: () => setFailed(true),
  });

  const isBusy = status === 'submitted' || status === 'streaming';
  const sendPrompt = React.useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isBusy) return;
    setInputValue('');
    setFailed(false);
    try { await append({ role: 'user', content: trimmed }); }
    catch { setFailed(true); }
  }, [append, isBusy]);

  React.useEffect(() => {
    if (isOpen && draftPrompt && !isBusy) {
      clearInlineDraft(anchorId);
      void sendPrompt(draftPrompt);
    }
  }, [anchorId, clearInlineDraft, draftPrompt, isOpen, isBusy, sendPrompt]);

  const quickPrompts = [
    t('Jelaskan arti simbol pada persamaannya', 'Explain the symbols in the equation'),
    t('Mengapa cara ini sesuai untuk soal ini?', 'Why does this method apply here?'),
    t('Beri satu pertanyaan cek pemahaman', 'Give me one question to check my understanding'),
    ...(simulation ? [t('Bantu saya menguji pengaruh satu parameter', 'Help me test how one parameter changes the result')] : []),
  ];

  return (
    <CollapsibleMotion open={isOpen}>
      <div data-inline-ai={anchorId} className={cn('my-4 border-l-2 border-primary bg-surface-subtle/45 py-3 pr-3 pl-4', className)}>
        <div className="flex items-center justify-between gap-2 pb-2">
          <div className="flex min-w-0 items-center gap-1.5 text-xs font-semibold text-primary">
            <BotMessageSquare className="size-3.5 shrink-0" />
            <span className="truncate">{t('Tutor AI', 'AI tutor')} · {anchorLabel}</span>
          </div>
          <div className="flex shrink-0 items-center gap-0.5">
            {messages.length > 0 && (
              <Button variant="icon" size="icon-xs" aria-label={t('Mulai ulang diskusi', 'Reset discussion')} title={t('Mulai ulang', 'Reset')} onClick={() => { stop(); setMessages([]); setFailed(false); }}>
                <RotateCcw className="size-3" />
              </Button>
            )}
            <Button variant="icon" size="icon-xs" aria-label={t('Tutup Tutor AI', 'Close AI tutor')} title={t('Tutup', 'Close')} onClick={() => closeInlineAi(anchorId)}>
              <X className="size-3.5" />
            </Button>
          </div>
        </div>
        {quotedText && (
          <blockquote className="mb-3 border-l-2 border-border pl-2.5 text-xs italic text-muted-foreground">&ldquo;{quotedText}&rdquo;</blockquote>
        )}
        {messages.length === 0 ? (
          <div className="mb-3 flex flex-wrap gap-x-4 gap-y-1">
            {quickPrompts.map((prompt) => (
              <button key={prompt} type="button" onClick={() => void sendPrompt(prompt)} className="cursor-pointer py-0.5 text-left text-xs text-primary transition-colors hover:underline">{prompt}</button>
            ))}
          </div>
        ) : (
          <div className="mb-3 space-y-4" aria-live="polite">
            {messages.map((message) => {
              const invocations: AiUiToolInvocation[] = [];
              for (const part of message.parts ?? []) {
                if (part.type === 'tool-invocation' && 'toolInvocation' in part && part.toolInvocation.state !== 'partial-call') {
                  invocations.push({ toolName: part.toolInvocation.toolName, args: part.toolInvocation.args } as AiUiToolInvocation);
                }
              }
              return (
                <div key={message.id} className="space-y-1">
                  <div className="text-[11px] font-semibold text-muted-foreground">{message.role === 'user' ? t('Anda', 'You') : t('Tutor AI', 'AI tutor')}</div>
                  {message.content && <MathMarkdown content={message.content} className="text-[13.5px] leading-relaxed" />}
                  {invocations.length > 0 && <div className="space-y-1.5">{invocations.map((invocation, index) => <AiToolInvocationView key={index} invocation={invocation} />)}</div>}
                </div>
              );
            })}
            {isBusy && <div role="status" className="text-xs text-muted-foreground">{t('Menyusun penjelasan…', 'Preparing an explanation…')}</div>}
          </div>
        )}
        {failed && (
          <div role="alert" className="mb-3 space-y-1 border-l-2 border-warning pl-2.5 text-xs text-muted-foreground">
            <p>{t('Tutor AI belum bisa menjawab. Coba kirim ulang pertanyaan ini.', 'The AI tutor could not answer. Try sending this question again.')}</p>
            <Button size="xs" variant="ghost" disabled={isBusy} onClick={async () => { setFailed(false); try { await reload(); } catch { setFailed(true); } }}><RotateCcw className="size-3" />{t('Coba lagi', 'Retry')}</Button>
          </div>
        )}
        <form onSubmit={(event) => { event.preventDefault(); void sendPrompt(inputValue); }} className="flex items-end gap-2 border-t border-border/70 pt-2">
          <Textarea rows={1} value={inputValue} aria-label={t('Pertanyaan untuk Tutor AI', 'Question for the AI tutor')} onChange={(event) => setInputValue(event.target.value)} onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); void sendPrompt(inputValue); }
          }} placeholder={t('Tanyakan bagian yang ingin dipahami…', 'Ask about the part you want to understand…')} className="min-h-7 max-h-24 flex-1 border-b-0 px-0 py-0.5 text-[13px]" />
          <Button type="submit" size="icon-xs" variant="icon" disabled={!inputValue.trim() || isBusy} aria-label={t('Kirim pertanyaan', 'Send question')} className="text-primary hover:text-primary-hover"><ArrowUp className="size-3.5" /></Button>
        </form>
      </div>
    </CollapsibleMotion>
  );
}
