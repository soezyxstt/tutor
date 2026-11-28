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
            <Badge variant="primary">Latihan</Badge>
            <span aria-hidden="true">·</span>
            <Badge variant={diff.variant}>{diff.text}</Badge>
            <span aria-hidden="true">·</span>
            <span>{practice.questions.length} soal</span>
            {practice.estimatedMinutes && (
              <>
                <span aria-hidden="true">·</span>
                <span>{practice.estimatedMinutes} mnt</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1">
            {answeredCount > 0 && (
              <Button
                variant="icon"
                size="icon"
                aria-label="Ulangi latihan"
                title="Ulangi latihan"
                onClick={() => resetPracticeAnswers(`${itemKey}:`)}
              >
                <RotateCcw className="size-4" />
              </Button>
            )}
            <Button
              variant="icon"
              size="icon"
              aria-label={isBookmarked ? 'Hapus simpanan' : 'Simpan latihan'}
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
              aria-label={isCompleted ? 'Tandai belum selesai' : 'Tandai selesai'}
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
                  draftPrompt: `Buat kuis cek pemahaman tambahan untuk latihan "${practice.title}".`,
                })
              }
            >
              <BotMessageSquare className="size-3.5 text-primary" />
              <span>Tanya AI</span>
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
        <section aria-label="Simulasi Latihan" className="mb-8">
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
                    Soal {String(index + 1).padStart(2, '0')}
                  </div>
                  <MathMarkdown content={q.prompt} />
                </div>

                <div className="flex shrink-0 items-center gap-1">
                  {q.hint && (
                    <Button
                      variant="icon"
                      size="icon-sm"
                      aria-label={`Petunjuk soal ${index + 1}`}
                      title="Petunjuk"
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
                    aria-label={`Tanya AI soal ${index + 1}`}
                    title="Tanya AI inline di soal ini"
                    onClick={() =>
                      openInlineAi(qAnchor, {
                        draftPrompt: `Bantu saya memahami Soal ${index + 1} pada latihan "${practice.title}" beserta jebakan umumnya.`,
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
                    <span className="font-medium text-foreground">Petunjuk: </span>
                    {q.hint}
                  </div>
                </CollapsibleMotion>
              )}

              <RadioGroup
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
                      {isCorrect ? 'Jawaban tepat' : 'Perlu ditinjau ulang'}
                    </div>
                    <MathMarkdown
                      content={q.explanation}
                      className="text-[13.5px] leading-relaxed text-muted-foreground"
                    />
                  </div>
                </div>
              </CollapsibleMotion>

              <InlineAiThread
                anchorId={qAnchor}
                anchorLabel={`Soal ${String(index + 1).padStart(2, '0')}`}
                courseSlug={courseSlug}
                courseTitle={courseTitle}
                itemKey={itemKey}
                itemTitle={practice.title}
                simulation={practice.simulation}
              />
            </li>
          );
        })}
      </ol>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-4">
        <span className="font-mono text-xs text-muted-foreground">
          Skor: {correctCount}/{practice.questions.length} benar ({answeredCount}{' '}
          terjawab)
        </span>
        <Button
          size="sm"
          variant={isCompleted ? 'secondary' : 'default'}
          onClick={() => toggleComplete(itemKey)}
        >
          <CheckCircle2 className="size-3.5" />
          <span>{isCompleted ? 'Latihan selesai' : 'Tandai selesai'}</span>
        </Button>
      </div>
    </article>
  );
}
