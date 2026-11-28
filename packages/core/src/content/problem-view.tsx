import { useLanguage } from '../i18n/language-provider';
import { Bookmark, BotMessageSquare, CheckCircle2, Circle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Badge, Button, Separator, cn } from '@tutor/ui';
import type { ProblemItem } from '../types/course';
import { useTutorStore } from '../store/tutor-store';
import { MathMarkdown } from './math-markdown';
import { Callout } from './callout';
import { StepDisclosure } from './step-disclosure';
import { SimulationStage } from '../simulation/simulation-stage';
import { InlineAiThread } from '../ai/inline-ai-thread';

const difficultyLabel: Record<
  ProblemItem['difficulty'],
  { text: string; variant: 'success' | 'warning' | 'destructive' }
> = {
  dasar: { text: 'Dasar', variant: 'success' },
  menengah: { text: 'Menengah', variant: 'warning' },
  lanjut: { text: 'Lanjut', variant: 'destructive' },
};

export function ProblemView({
  courseSlug,
  courseTitle,
  problem,
}: {
  courseSlug: string;
  courseTitle?: string;
  problem: ProblemItem;
}) {
  const itemKey = `${courseSlug}:${problem.id}`;
  const { t } = useLanguage();
  const statementAnchor = `${itemKey}:statement`;
  const simulations = [
    ...(problem.simulation ? [problem.simulation] : []),
    ...(problem.simulations ?? []),
  ];

  const isCompleted = useTutorStore((s) => !!s.completedIds[itemKey]);
  const isBookmarked = useTutorStore((s) => !!s.bookmarkedIds[itemKey]);
  const toggleComplete = useTutorStore((s) => s.toggleComplete);
  const toggleBookmark = useTutorStore((s) => s.toggleBookmark);
  const openInlineAi = useTutorStore((s) => s.openInlineAi);

  const diff = difficultyLabel[problem.difficulty];
  const problemContext = [problem.statement, ...(problem.given ?? []), problem.asked, ...(problem.assumptions ?? [])].filter(Boolean).join('\n\n');

  return (
    <article className="pb-16">
      {/* Single clean metadata header */}
      <header className="space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="subtle">{t("Pembahasan", "Solution")}</Badge>
            <span aria-hidden="true">·</span>
            <Badge variant={diff.variant}>{t(diff.text, problem.difficulty === 'dasar' ? 'Basic' : problem.difficulty === 'menengah' ? 'Intermediate' : 'Advanced')}</Badge>
            {problem.source && (
              <>
                <span aria-hidden="true">·</span>
                <span>{problem.source}</span>
              </>
            )}
            {problem.estimatedMinutes && (
              <>
                <span aria-hidden="true">·</span>
                <span>{problem.estimatedMinutes} {t('mnt', 'min')}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="icon"
              size="icon"
              aria-label={isBookmarked ? t('Hapus simpanan', 'Remove bookmark') : t('Simpan soal', 'Save problem')}
              title={isBookmarked ? t('Tersimpan', 'Saved') : t('Simpan soal', 'Save problem')}
              onClick={() => toggleBookmark(itemKey)}
              className={cn(isBookmarked && 'text-primary')}
            >
              <Bookmark
                className="size-4"
                fill={isBookmarked ? 'currentColor' : 'none'}
              />
            </Button>

            <Button
              variant="icon"
              size="icon"
              aria-label={isCompleted ? t('Tandai belum selesai', 'Mark incomplete') : t('Tandai selesai', 'Mark complete')}
              title={isCompleted ? t('Selesai dipelajari', 'Completed') : t('Tandai selesai', 'Mark complete')}
              onClick={() => toggleComplete(itemKey)}
              className={cn(isCompleted && 'text-success')}
            >
              {isCompleted ? (
                <CheckCircle2 className="size-4" />
              ) : (
                <Circle className="size-4" />
              )}
            </Button>

            <Button
              variant="ghost"
              size="sm"
              onClick={() =>
                openInlineAi(statementAnchor, {
                  draftPrompt: t(`Bantu saya memahami soal "${problem.title}" beserta simbol persamaannya.`, `Help me understand "${problem.title}" and the symbols in its equations.`),
                })
              }
            >
              <BotMessageSquare className="size-3.5 text-primary" />
              <span>{t("Tanya AI", "Ask AI")}</span>
            </Button>
          </div>
        </div>

        <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-[1.6rem]">
          {problem.title}
        </h1>
      </header>

      <Separator className="my-5" />

      {/* Problem statement — anchored for highlight & inline AI */}
      <section
        aria-label={t("Pernyataan Soal", "Problem statement")}
        data-ai-anchor={statementAnchor}
        className="space-y-4"
      >
        <MathMarkdown content={problem.statement} />

        {problem.sourceDetails && (
          <Accordion type="single" collapsible className="border-y border-border/70">
            <AccordionItem value="original-source" className="border-0">
              <AccordionTrigger className="text-sm">
                {t('Lihat naskah dan sumber soal', 'Read the original problem and sources')}
              </AccordionTrigger>
              <AccordionContent className="space-y-4">
                <p className="text-xs text-muted-foreground">
                  <a href={problem.sourceDetails.url} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">
                    {problem.sourceDetails.file}
                  </a>
                  {problem.sourceDetails.pages.length > 0 && ` · ${t('halaman', 'pages')} ${problem.sourceDetails.pages.join(', ')}`}
                  {` · ${problem.sourceDetails.originalLanguage === 'id' ? t('Bahasa Indonesia', 'Indonesian') : 'English'}`}
                </p>
                <div lang={problem.sourceDetails.originalLanguage} className="whitespace-pre-wrap break-words text-sm leading-relaxed">
                  {problem.sourceDetails.original}
                </div>
                {problem.sourceDetails.reference && (
                  <p className="text-xs text-muted-foreground">
                    {t('Rujukan materi: ', 'Course reference: ')}
                    <a href={problem.sourceDetails.reference.url} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">
                      {problem.sourceDetails.reference.title}
                    </a>
                    {!!problem.sourceDetails.reference.pages?.length && ` · ${t('halaman', 'pages')} ${problem.sourceDetails.reference.pages.join(', ')}`}
                  </p>
                )}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        )}

        {!!problem.assumptions?.length && (
          <Callout tone="tip" label={t('Catatan sumber dan asumsi', 'Source notes and assumptions')}>
            <ul className="space-y-2">
              {problem.assumptions.map((assumption, index) => (
                <li key={index}><MathMarkdown content={assumption} className="text-sm" /></li>
              ))}
            </ul>
          </Callout>
        )}

        {(problem.given?.length || problem.asked) && (
          <div className="grid gap-4 border-y border-border/80 py-3.5 sm:grid-cols-2">
            {problem.given && problem.given.length > 0 && (
              <div>
                <div className="mb-1.5 text-xs font-semibold text-muted-foreground">
                  {t("Diketahui", "Known")}
                </div>
                <ul className="space-y-1 text-[14px]">
                  {problem.given.map((g, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="mt-2 size-1 shrink-0 rounded-full bg-primary/70" />
                      <MathMarkdown
                        content={g}
                        className="text-[14px] leading-relaxed"
                      />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {problem.asked && (
              <div>
                <div className="mb-1.5 text-xs font-semibold text-muted-foreground">
                  {t("Ditanyakan", "Find")}
                </div>
                <MathMarkdown
                  content={problem.asked}
                  className="text-[14px] leading-relaxed"
                />
              </div>
            )}
          </div>
        )}

        <InlineAiThread
          anchorId={statementAnchor}
          anchorLabel={t("Pernyataan Soal", "Problem statement")}
          courseSlug={courseSlug}
          courseTitle={courseTitle}
          itemKey={itemKey}
          itemTitle={problem.title}
          contextText={problemContext}
          simulation={simulations[0]}
          stepCount={problem.steps.length}
        />
      </section>

      {/* Optional Interactive Simulation + inline AI thread right below it */}
      {simulations.map((simulation) => {
        const simAnchor = `${itemKey}:simulation:${simulation.id}`;
        return (
        <section
          key={simulation.id}
          aria-label={t("Simulasi Interaktif", "Interactive simulation")}
          data-ai-anchor={simAnchor}
          className="mt-8"
        >
          <SimulationStage
            courseSlug={courseSlug}
            spec={simulation}
            aiAnchorId={simAnchor}
          />
          <InlineAiThread
            anchorId={simAnchor}
            anchorLabel={t("Simulasi Interaktif", "Interactive simulation")}
            courseSlug={courseSlug}
            courseTitle={courseTitle}
            itemKey={itemKey}
            itemTitle={problem.title}
            contextText={problemContext}
            simulation={simulation}
            stepCount={problem.steps.length}
          />
        </section>
        );
      })}

      {/* Progressive Step-by-Step Solution (each step has its own inline AI anchor) */}
      <StepDisclosure
        courseSlug={courseSlug}
        courseTitle={courseTitle}
        itemKey={itemKey}
        steps={problem.steps}
        problemTitle={problem.title}
        problemContext={problemContext}
        simulation={simulations[0]}
      />

      {/* Final Answer */}
      <div className="mt-8 space-y-5" data-ai-anchor={statementAnchor}>
        <Callout tone="answer" label={t("Jawaban Akhir", "Final answer")}>
          <MathMarkdown content={problem.finalAnswer} />
        </Callout>

        {problem.takeaway && (
          <Callout tone="tip" label={t("Catatan Penting", "Key note")}>
            <MathMarkdown
              content={problem.takeaway}
              className="text-[14.5px] text-muted-foreground"
            />
          </Callout>
        )}
      </div>

      {/* Completion footer */}
      <div className="mt-10 flex items-center justify-end border-t border-border pt-4">
        <Button
          size="sm"
          variant={isCompleted ? 'secondary' : 'default'}
          onClick={() => toggleComplete(itemKey)}
        >
          <CheckCircle2 className="size-3.5" />
          <span>{isCompleted ? t('Sudah dipahami', 'Understood') : t('Tandai selesai', 'Mark complete')}</span>
        </Button>
      </div>
    </article>
  );
}
