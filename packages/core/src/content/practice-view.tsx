import { useLanguage } from '../i18n/language-provider';
import * as React from 'react';
import {
  Bookmark,
  BotMessageSquare,
  CheckCircle2,
  Circle,
  HelpCircle,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import {
  Badge,
  Button,
  CollapsibleMotion,
  RadioGroup,
  RadioGroupItem,
  Separator,
  cn,
} from '@tutor/ui';
import type { PracticeItem } from '../types/course';
import { useTutorStore } from '../store/tutor-store';
import { MathMarkdown } from './math-markdown';
import { SimulationStage } from '../simulation/simulation-stage';
import { InlineAiThread } from '../ai/inline-ai-thread';
import { FadedPractice } from './faded-practice';
import { languageHref } from '../i18n/language';

const difficultyLabel: Record<
  PracticeItem['difficulty'],
  { text: string; variant: 'success' | 'warning' | 'destructive' }
> = {
  dasar: { text: 'Dasar', variant: 'success' },
  menengah: { text: 'Menengah', variant: 'warning' },
  lanjut: { text: 'Lanjut', variant: 'destructive' },
};

export function PracticeView({
  courseSlug,
  courseTitle,
  practice,
}: {
  courseSlug: string;
  courseTitle?: string;
  practice: PracticeItem;
}) {
  const itemKey = `${courseSlug}:${practice.id}`;
  const { t, preference } = useLanguage();
  const firstAnchor = `${itemKey}:q:${practice.questions[0]?.id ?? 'main'}`;

  const isCompleted = useTutorStore((s) => !!s.completedIds[itemKey]);
  const isBookmarked = useTutorStore((s) => !!s.bookmarkedIds[itemKey]);
  const practiceAnswers = useTutorStore((s) => s.practiceAnswers);
  const autoShowHints = useTutorStore((s) => s.autoShowHints);
  const toggleComplete = useTutorStore((s) => s.toggleComplete);
  const toggleBookmark = useTutorStore((s) => s.toggleBookmark);
  const setPracticeAnswer = useTutorStore((s) => s.setPracticeAnswer);
  const resetPracticeAnswers = useTutorStore((s) => s.resetPracticeAnswers);
  const openInlineAi = useTutorStore((s) => s.openInlineAi);

  const [openHints, setOpenHints] = React.useState<Record<string, boolean>>({});
  const diff = difficultyLabel[practice.difficulty];

  const answeredCount = practice.questions.filter(
    (q) => !!practiceAnswers[`${itemKey}:${q.id}`]
  ).length;
  const correctCount = practice.questions.filter(
    (q) => practiceAnswers[`${itemKey}:${q.id}`] === q.correctOptionId
  ).length;

  return (
    <article className="pb-16">
      <header className="space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="primary">{t("Latihan", "Practice")}</Badge>
            <span aria-hidden="true">·</span>
            <Badge variant={diff.variant}>{t(diff.text, practice.difficulty === 'dasar' ? 'Basic' : practice.difficulty === 'menengah' ? 'Intermediate' : 'Advanced')}</Badge>
            <span aria-hidden="true">·</span>
            <span>{practice.questions.length} {t('soal', 'questions')}</span>
            {practice.estimatedMinutes && (
              <>
                <span aria-hidden="true">·</span>
                <span>{practice.estimatedMinutes} {t('mnt', 'min')}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1">
            {answeredCount > 0 && (
              <Button
                variant="icon"
                size="icon"
                aria-label={t("Ulangi latihan", "Reset practice")}
                title={t("Ulangi latihan", "Reset practice")}
                onClick={() => resetPracticeAnswers(`${itemKey}:`)}
              >
                <RotateCcw className="size-4" />
              </Button>
            )}
            <Button
              variant="icon"
              size="icon"
              aria-label={isBookmarked ? t('Hapus simpanan', 'Remove bookmark') : t('Simpan latihan', 'Save practice')}
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
                openInlineAi(firstAnchor, {
                  draftPrompt: t(`Buat kuis cek pemahaman tambahan untuk latihan "${practice.title}".`, `Create a short concept check for "${practice.title}".`),
                })
              }
            >
              <BotMessageSquare className="size-3.5 text-primary" />
              <span>{t("Tanya AI", "Ask AI")}</span>
            </Button>
          </div>
        </div>

        <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-[1.6rem]">
          {practice.title}
        </h1>
      </header>

      <Separator className="my-5" />

      {practice.intro && (
        <div className="mb-6">
          <MathMarkdown content={practice.intro} />
        </div>
      )}

      {practice.simulation && (
        <section aria-label={t("Simulasi Latihan", "Practice simulation")} className="mb-8">
          <SimulationStage
            courseSlug={courseSlug}
            spec={practice.simulation}
            aiAnchorId={firstAnchor}
          />
        </section>
      )}

      <ol className="divide-y divide-border">
        {practice.questions.map((q, index) => {
          const qKey = `${itemKey}:${q.id}`;
          const qAnchor = `${itemKey}:q:${q.id}`;
          const selected = practiceAnswers[qKey] ?? '';
          const answered = selected !== '';
          const isCorrect = selected === q.correctOptionId;
          const hintVisible = autoShowHints || !!openHints[q.id];

          return (
            <li
              key={q.id}
              data-ai-anchor={qAnchor}
              className="space-y-4 py-6 first:pt-0"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1 space-y-1">
                  <div className="font-mono text-xs font-medium text-primary">
                    {t('Soal', 'Question')} {String(index + 1).padStart(2, '0')}
                  </div>
                  <MathMarkdown content={q.prompt} />
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  {q.hint && (
                    <Button
                      variant="icon"
                      size="icon-sm"
                      aria-label={t(`Petunjuk soal ${index + 1}`, `Hint for question ${index + 1}`)}
                      title={t("Petunjuk", "Hint")}
                      onClick={() =>
                        setOpenHints((prev) => ({
                          ...prev,
                          [q.id]: !prev[q.id],
                        }))
                      }
                      className={cn(hintVisible && 'text-primary')}
                    >
                      <HelpCircle className="size-3.5" />
                    </Button>
                  )}
                  <Button
                    variant="icon"
                    size="icon-sm"
                    aria-label={t(`Tanya AI soal ${index + 1}`, `Ask AI about question ${index + 1}`)}
                    title={t("Tanya AI inline di soal ini", "Ask AI about this question")}
                    onClick={() =>
                      openInlineAi(qAnchor, {
                        draftPrompt: t(`Bantu saya memahami Soal ${index + 1} pada latihan "${practice.title}" beserta jebakan umumnya.`, `Help me understand question ${index + 1} in "${practice.title}" and common mistakes.`),
                      })
                    }
                  >
                    <BotMessageSquare className="size-3.5" />
                  </Button>
                </div>
              </div>

              {q.hint && (
                <CollapsibleMotion open={hintVisible}>
                  <div className="border-l-2 border-primary/40 pl-3 text-[13px] text-muted-foreground">
                    <span className="font-medium text-foreground">{t("Petunjuk: ", "Hint: ")}</span>
                    {q.hint}
                  </div>
                </CollapsibleMotion>
              )}

              <RadioGroup
                aria-label={`${t('Soal', 'Question')} ${index + 1}`}
                value={selected}
                onValueChange={(val) => setPracticeAnswer(qKey, val)}
                className="gap-2"
              >
                {q.options.map((opt) => {
                  const isThisSelected = selected === opt.id;
                  const isThisCorrect = opt.id === q.correctOptionId;

                  return (
                    <label
                      key={opt.id}
                      className={cn(
                        'flex cursor-pointer items-start gap-2.5 border-l-2 py-1.5 pl-3 text-[14.5px] transition-colors',
                        !answered && 'border-transparent hover:border-border',
                        answered &&
                          isThisCorrect &&
                          'border-success font-medium text-foreground',
                        answered &&
                          isThisSelected &&
                          !isThisCorrect &&
                          'border-destructive text-destructive',
                        answered &&
                          !isThisCorrect &&
                          !isThisSelected &&
                          'border-transparent text-muted-foreground'
                      )}
                    >
                      <RadioGroupItem value={opt.id} className="mt-1" />
                      <span className="min-w-0 flex-1">
                        <MathMarkdown
                          content={opt.label}
                          className="text-[14.5px] leading-relaxed"
                        />
                      </span>
                    </label>
                  );
                })}
              </RadioGroup>

              <CollapsibleMotion open={answered}>
                <div
                  className={cn(
                    'flex items-start gap-2.5 border-l-2 py-1 pl-3.5 text-[13.5px]',
                    isCorrect ? 'border-success' : 'border-destructive'
                  )}
                >
                  {isCorrect ? (
                    <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-success" />
                  ) : (
                    <XCircle className="mt-0.5 size-4 shrink-0 text-destructive" />
                  )}
                  <div className="min-w-0 flex-1 space-y-1">
                    <div
                      className={cn(
                        'text-xs font-semibold',
                        isCorrect ? 'text-success' : 'text-destructive'
                      )}
                    >
                      {isCorrect ? t('Jawaban tepat', 'Correct') : t('Perlu ditinjau ulang', 'Review your answer')}
                    </div>
                    <MathMarkdown
                      content={q.options.find((option) => option.id === selected)?.feedback ?? ''}
                      className="text-[13.5px] leading-relaxed"
                    />
                    <MathMarkdown
                      content={q.explanation}
                      className="text-[13.5px] leading-relaxed text-muted-foreground"
                    />
                    {q.relatedProblemId && <a href={languageHref(`?item=${encodeURIComponent(q.relatedProblemId)}`, preference)} className="inline-block pt-2 text-sm text-primary underline underline-offset-4">{t('Lihat pembahasan terkait', 'Read the related worked solution')}</a>}
                  </div>
                </div>
              </CollapsibleMotion>

              <InlineAiThread
                anchorId={qAnchor}
                anchorLabel={`${t('Soal', 'Question')} ${String(index + 1).padStart(2, '0')}`}
                courseSlug={courseSlug}
                courseTitle={courseTitle}
                itemKey={itemKey}
                itemTitle={practice.title}
                contextText={[q.prompt, ...q.options.map((option) => option.label)].join('\n\n')}
                simulation={practice.simulation}
              />
            </li>
          );
        })}
      </ol>

      <FadedPractice courseSlug={courseSlug} courseTitle={courseTitle} practice={practice} />

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <span className="font-mono text-xs text-muted-foreground">
          {t('Skor', 'Score')}: {correctCount}/{practice.questions.length} {t('benar', 'correct')} ({answeredCount} {t('terjawab', 'answered')})
        </span>
        <Button
          size="sm"
          variant={isCompleted ? 'secondary' : 'default'}
          onClick={() => toggleComplete(itemKey)}
        >
          <CheckCircle2 className="size-3.5" />
          <span>{isCompleted ? t('Latihan selesai', 'Practice complete') : t('Tandai selesai', 'Mark complete')}</span>
        </Button>
      </div>
    </article>
  );
}
