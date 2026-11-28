import * as React from 'react';
import { useChat } from '@ai-sdk/react';
import { ArrowUp, BotMessageSquare, RotateCcw, Square, X } from 'lucide-react';
import { Button, CollapsibleMotion, Textarea, cn } from '@tutor/ui';
import type { SimulationSpec } from '../types/course';
import { useTutorStore } from '../store/tutor-store';
import { MathMarkdown } from '../content/math-markdown';
import { validateAiToolCall } from './ui-sdk/tools';
import { AiToolInvocationView } from './ui-sdk/tool-renderers';
import { useLanguage } from '../i18n/language-provider';
import { learningContext } from './learning-context';
import { useSimulationContextState } from '../simulation/simulation-registry';
import { isTutorAgentTool, runTutorAgentTool, settleTutorUi, tutorUiContext } from './agent-runtime';
import { updateAuthoredSimulationParams } from './authored-simulation-tool';

export function InlineAiThread({
  anchorId,
  anchorLabel,
  courseSlug,
  courseTitle,
  itemKey,
  itemTitle,
  contextText,
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
  contextText?: string;
  simulation?: SimulationSpec;
  stepCount?: number;
  apiEndpoint?: string;
  className?: string;
}) {
  const { locale, t } = useLanguage();
  const thread = useTutorStore((s) => s.inlineThreads[anchorId]);
  const closeInlineAi = useTutorStore((s) => s.closeInlineAi);
  const clearInlineDraft = useTutorStore((s) => s.clearInlineDraft);
  const revealStep = useTutorStore((s) => s.revealStep);
  const isOpen = !!thread?.open;
  const quotedText = thread?.quotedText;
  const storedParams = useTutorStore((state) => simulation ? state.simParams[`${courseSlug}:${simulation.id}`] : undefined);
  const simulationContextState = useSimulationContextState(simulation ? `${courseSlug}:${simulation.id}` : undefined);
  const draftPrompt = thread?.draftPrompt;
  const [inputValue, setInputValue] = React.useState('');
  const [failed, setFailed] = React.useState(false);
  const turn = React.useRef(new AbortController());
  React.useEffect(() => () => turn.current.abort(), []);

  const requestContext = {
    language: locale,
    courseTitle,
    courseCode: courseSlug,
    itemTitle,
    anchorLabel,
    quotedText: learningContext(contextText, quotedText, simulation, storedParams, simulationContextState),
    simulationId: simulation?.id,
    simulationParams: simulation?.params.map((p) => p.key),
  };

  const { messages, append, setMessages, status, reload, stop } = useChat({
    id: anchorId,
    api: apiEndpoint,
    body: requestContext,
    experimental_prepareRequestBody: ({ messages }) => ({
      ...requestContext,
      messages,
      uiContext: tutorUiContext(itemKey),
    }),
    maxSteps: 5,
    onToolCall: async ({ toolCall }) => {
      if (turn.current.signal.aborted) return { ok: false, error: 'The turn was stopped.' };
      if (isTutorAgentTool(toolCall.toolName)) return runTutorAgentTool(itemKey, toolCall.toolName, toolCall.args, turn.current.signal);
      const checked = validateAiToolCall(toolCall.toolName, toolCall.args);
      if (!checked.ok) return checked;
      const invocation = checked.invocation;
      if (invocation.toolName === 'updateSimulationParams') {
        return updateAuthoredSimulationParams({ courseSlug, itemKey, simulation }, invocation.args, turn.current.signal);
      }
      if (invocation.toolName === 'revealSolutionStep') {
        if (stepCount === undefined || invocation.args.stepIndex >= stepCount) return { ok: false, error: 'That solution step is unavailable in this section.' };
        revealStep(itemKey, invocation.args.stepIndex);
        await settleTutorUi(itemKey, turn.current.signal);
        return { ok: true, stepIndex: useTutorStore.getState().stepRequests[itemKey]?.index };
      }
      return { ok: true, status: 'validated', tool: invocation.toolName, toolCallId: toolCall.toolCallId };
    },
    onError: () => setFailed(true),
  });

  const isBusy = status === 'submitted' || status === 'streaming';
  const stopTurn = React.useCallback(() => { turn.current.abort(); stop(); }, [stop]);
  const sendPrompt = React.useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isBusy) return;
    setInputValue('');
    setFailed(false);
    turn.current = new AbortController();
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
    t('Tunjukkan lewat grafik atau simulasi interaktif', 'Show this with an interactive graph or simulation'),
    t('Beri satu pertanyaan cek pemahaman', 'Give me one question to check my understanding'),
    ...(simulation ? [t('Bantu saya menguji pengaruh satu parameter', 'Help me test how one parameter changes the result')] : []),
  ];

  return (
    <CollapsibleMotion open={isOpen}>
      <div data-inline-ai={anchorId} className={cn('my-4 border-l-2 border-primary bg-surface-subtle/45 py-3 pr-3 pl-4', className)}>
        <div data-agent-hidden className="flex items-center justify-between gap-2 pb-2">
          <div className="flex min-w-0 items-center gap-1.5 text-xs font-semibold text-primary">
            <BotMessageSquare className="size-3.5 shrink-0" />
            <span className="truncate">{t('Tutor AI', 'AI tutor')} · {anchorLabel}</span>
          </div>
          <div className="flex shrink-0 items-center gap-0.5">
            {messages.length > 0 && (
              <Button variant="icon" size="icon-xs" aria-label={t('Mulai ulang diskusi', 'Reset discussion')} title={t('Mulai ulang', 'Reset')} onClick={() => { stopTurn(); setMessages([]); setFailed(false); }}>
                <RotateCcw className="size-3" />
              </Button>
            )}
            <Button variant="icon" size="icon-xs" aria-label={t('Tutup Tutor AI', 'Close AI tutor')} title={t('Tutup', 'Close')} onClick={() => { stopTurn(); closeInlineAi(anchorId); }}>
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
            {messages.map((message) => (
                <div key={message.id} className="space-y-1">
                  <div className="text-[11px] font-semibold text-muted-foreground">{message.role === 'user' ? t('Anda', 'You') : t('Tutor AI', 'AI tutor')}</div>
                  {message.parts?.length ? message.parts.map((part, index) => {
                    if (part.type === 'text') return <MathMarkdown key={`text-${index}`} content={part.text} className="text-[13.5px] leading-relaxed" />;
                    if (part.type !== 'tool-invocation' || part.toolInvocation.state === 'partial-call') return null;
                    const call = part.toolInvocation;
                    if (isTutorAgentTool(call.toolName)) return null;
                    const result = call.state === 'result' && call.result && typeof call.result === 'object' ? call.result as { ok?: boolean } : undefined;
                    const checked = validateAiToolCall(call.toolName, call.args);
                    if (!checked.ok || result?.ok === false) return <p key={call.toolCallId} role="status" className="text-xs text-muted-foreground">{t('Interaksi ini belum bisa dijalankan. Tutor dapat memperbaikinya pada langkah berikutnya.', 'This interaction could not run. The tutor can correct it in the next step.')}</p>;
                    return <AiToolInvocationView key={call.toolCallId} invocation={checked.invocation} />;
                  }) : message.content && <MathMarkdown content={message.content} className="text-[13.5px] leading-relaxed" />}
                </div>
            ))}
            {isBusy && <div role="status" className="text-xs text-muted-foreground">{t('Menyusun penjelasan…', 'Preparing an explanation…')}</div>}
          </div>
        )}
        {failed && (
          <div role="alert" className="mb-3 space-y-1 border-l-2 border-warning pl-2.5 text-xs text-muted-foreground">
            <p>{t('Tutor AI belum bisa menjawab. Coba kirim ulang pertanyaan ini.', 'The AI tutor could not answer. Try sending this question again.')}</p>
            <Button size="xs" variant="ghost" disabled={isBusy} onClick={async () => { turn.current = new AbortController(); setFailed(false); try { await reload(); } catch { setFailed(true); } }}><RotateCcw className="size-3" />{t('Coba lagi', 'Retry')}</Button>
          </div>
        )}
        <form data-agent-hidden onSubmit={(event) => { event.preventDefault(); void sendPrompt(inputValue); }} className="flex items-end gap-2 border-t border-border/70 pt-2">
          <Textarea rows={1} value={inputValue} aria-label={t('Pertanyaan untuk Tutor AI', 'Question for the AI tutor')} onChange={(event) => setInputValue(event.target.value)} onKeyDown={(event) => {
            if (event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); void sendPrompt(inputValue); }
          }} placeholder={t('Tanyakan bagian yang ingin dipahami…', 'Ask about the part you want to understand…')} className="min-h-7 max-h-24 flex-1 border-b-0 px-0 py-0.5 text-[13px]" />
          {isBusy
            ? <Button type="button" size="icon-xs" variant="icon" onClick={stopTurn} aria-label={t('Hentikan jawaban', 'Stop response')}><Square className="size-3" /></Button>
            : <Button type="submit" size="icon-xs" variant="icon" disabled={!inputValue.trim()} aria-label={t('Kirim pertanyaan', 'Send question')} className="text-primary hover:text-primary-hover"><ArrowUp className="size-3.5" /></Button>}
        </form>
      </div>
    </CollapsibleMotion>
  );
}
