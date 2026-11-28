import * as React from 'react';
import { BotMessageSquare, ChevronRight, HelpCircle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Button, CollapsibleMotion, Textarea } from '@tutor/ui';
import type { EssayPracticeTask, PracticeItem } from '../types/course';
import { useLanguage } from '../i18n/language-provider';
import { useTutorStore } from '../store/tutor-store';
import { InlineAiThread } from '../ai/inline-ai-thread';
import { MathMarkdown } from './math-markdown';
import { DecisionCheck } from './decision-check';

function EssayTask({ task, itemKey, courseSlug, courseTitle, itemTitle }: {
  task: EssayPracticeTask; itemKey: string; courseSlug: string; courseTitle?: string; itemTitle: string;
}) {
  const { t } = useLanguage();
  const taskKey = `${itemKey}:essay:${task.id}`;
  const [hintsShown, setHintsShown] = React.useState(0);
  const [showOutline, setShowOutline] = React.useState(false);
  const draft = useTutorStore((state) => state.essayDrafts[taskKey]);
  const setDraft = useTutorStore((state) => state.setEssayDraft);
  const openInlineAi = useTutorStore((state) => state.openInlineAi);
  const sections = task.sections?.length ? task.sections : [t('Jawaban Anda', 'Your response')];
  const hasDraft = Object.values(draft ?? {}).some((value) => value.trim());

  return (
    <div className="space-y-5" data-ai-anchor={taskKey}>
      <MathMarkdown content={task.prompt} />
      <div className="space-y-4">
        {sections.map((section, index) => (
          <label key={index} className="block space-y-2 text-sm font-medium">
            <span>{section}</span>
            <Textarea rows={3} value={draft?.[String(index)] ?? ''} onChange={(event) => setDraft(taskKey, String(index), event.target.value)} placeholder={t('Tulis alasan dan langkah Anda.', 'Explain your reasoning and steps.')} className="font-normal" />
          </label>
        ))}
      </div>
      <p className="text-xs text-muted-foreground">{t('Jawaban tersimpan di perangkat ini.', 'Your response is saved on this device.')}</p>

      <div className="space-y-2">
        {task.hints.map((hint, index) => (
          <CollapsibleMotion key={index} open={index < hintsShown}>
            <div className="border-l-2 border-border pl-3">
              <p className="mb-1 text-xs font-medium">{t('Petunjuk', 'Hint')} {index + 1}</p>
              <MathMarkdown content={hint} className="text-sm" />
            </div>
          </CollapsibleMotion>
        ))}
        {hintsShown < task.hints.length && <Button size="sm" variant="ghost" onClick={() => setHintsShown((count) => count + 1)}><HelpCircle className="size-3.5" />{t('Buka petunjuk', 'Show hint')} {hintsShown + 1}</Button>}
      </div>

      <Accordion type="multiple" className="border-y border-border">
        <AccordionItem value="rubric" className="border-0">
          <AccordionTrigger>{t('Kriteria jawaban', 'Response criteria')}</AccordionTrigger>
          <AccordionContent>
            <ul className="space-y-4">
              {task.rubric.map((criterion) => (
                <li key={criterion.id} className="space-y-1">
                  <p className="text-sm font-medium text-foreground">{criterion.label} ({criterion.weight}%)</p>
                  <MathMarkdown content={criterion.fullCredit} className="text-sm" />
                  {criterion.commonPartialError && <MathMarkdown content={criterion.commonPartialError} className="text-sm text-muted-foreground" />}
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="flex flex-wrap items-center gap-2">
        <Button size="sm" variant="ghost" aria-expanded={showOutline} onClick={() => setShowOutline((show) => !show)}><ChevronRight className={`size-3.5 transition-transform ${showOutline ? 'rotate-90' : ''}`} />{t('Bandingkan alur jawaban', 'Compare your reasoning')}</Button>
        <Button size="sm" variant="ghost" disabled={!hasDraft} onClick={() => openInlineAi(taskKey, {
          quotedText: [task.prompt, ...task.rubric.map((criterion) => `${criterion.label} (${criterion.weight}%): ${criterion.fullCredit}`), task.verifiedOutline].join('\n\n'),
          draftPrompt: [t('Tinjau alur jawaban saya berdasarkan kriteria soal. Tunjukkan langkah benar dan satu bagian yang perlu saya perbaiki.', 'Review my reasoning against the response criteria. Point out what is correct and one part I should revise.'), ...sections.map((section, index) => `${section}: ${draft?.[String(index)] ?? ''}`)].join('\n\n'),
        })}><BotMessageSquare className="size-3.5" />{t('Tinjau bersama AI', 'Review with AI')}</Button>
      </div>
      <CollapsibleMotion open={showOutline}><div className="border-l-2 border-primary/40 pl-4"><MathMarkdown content={task.verifiedOutline} className="text-sm" /></div></CollapsibleMotion>
      <InlineAiThread anchorId={taskKey} anchorLabel={task.title} courseSlug={courseSlug} courseTitle={courseTitle} itemKey={itemKey} itemTitle={itemTitle} />
    </div>
  );
}

export function FadedPractice({ courseSlug, courseTitle, practice }: { courseSlug: string; courseTitle?: string; practice: PracticeItem }) {
  const { t } = useLanguage();
  const itemKey = `${courseSlug}:${practice.id}`;
  return (
    <div className="space-y-8">
      {!!practice.guidedTasks?.length && (
        <section className="mt-8 space-y-2" aria-label={t('Latihan dengan bantuan', 'Guided practice')}>
          <h2 className="text-base font-semibold">{t('Tinjau langkah penyelesaian', 'Review the solution steps')}</h2>
          <p className="text-sm text-muted-foreground">{t('Cari letak salah atau lengkapi alasan yang hilang.', 'Find the error or complete the missing reasoning.')}</p>
          <Accordion type="multiple">
            {practice.guidedTasks.map((task) => (
              <AccordionItem key={task.id} value={task.id}>
                <AccordionTrigger>{task.title}</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <MathMarkdown content={task.prompt} />
                  <div className="border-l-2 border-border pl-4"><MathMarkdown content={task.workSample} /></div>
                  <DecisionCheck question={task.question} answerKey={`${itemKey}:guided:${task.id}`} />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}
      {!!practice.essayTasks?.length && (
        <section className="space-y-2" aria-label={t('Latihan mandiri', 'Independent practice')}>
          <h2 className="text-base font-semibold">{t('Susun jawaban Anda', 'Build your own response')}</h2>
          <p className="text-sm text-muted-foreground">{t('Jelaskan pilihan model dan urutan langkah. Buka petunjuk saat perlu.', 'Explain your model choice and sequence of steps. Open a hint when you need one.')}</p>
          <Accordion type="multiple">
            {practice.essayTasks.map((task) => (
              <AccordionItem key={`${itemKey}:${task.id}`} value={task.id}>
                <AccordionTrigger>{task.title}</AccordionTrigger>
                <AccordionContent><EssayTask key={`${itemKey}:${task.id}`} task={task} itemKey={itemKey} courseSlug={courseSlug} courseTitle={courseTitle} itemTitle={practice.title} /></AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}
    </div>
  );
}
