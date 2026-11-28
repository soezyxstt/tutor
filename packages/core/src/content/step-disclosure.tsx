import { useLanguage } from '../i18n/language-provider';
import * as React from 'react';
import {
  BotMessageSquare,
  ChevronLeft,
  ChevronRight,
  HelpCircle,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { Button, CollapsibleMotion, TUTOR_EASE, cn } from '@tutor/ui';
import type { SimulationSpec, SolutionStep } from '../types/course';
import { useTutorStore } from '../store/tutor-store';
import { MathMarkdown } from './math-markdown';
import { InlineAiThread } from '../ai/inline-ai-thread';
import { SimulationStage } from '../simulation/simulation-stage';

export function StepDisclosure({
  courseSlug,
  courseTitle,
  itemKey,
  steps,
  problemTitle,
  problemContext,
  simulation,
}: {
  courseSlug: string;
  courseTitle?: string;
  itemKey: string;
  steps: SolutionStep[];
  problemTitle: string;
  problemContext?: string;
  simulation?: SimulationSpec;
}) {
  const autoShowHints = useTutorStore((s) => s.autoShowHints);
  const { t } = useLanguage();
  const openInlineAi = useTutorStore((s) => s.openInlineAi);
  const revealStep = useTutorStore((s) => s.revealStep);
  const stepRequest = useTutorStore((s) => s.stepRequests[itemKey]);

  const [activeIndex, setActiveIndex] = React.useState(0);
  const [showAll, setShowAll] = React.useState(false);
  const [openHints, setOpenHints] = React.useState<Record<string, boolean>>({});

  const [openRationales, setOpenRationales] = React.useState<Record<string, boolean>>({});
  const [checkpointPicks, setCheckpointPicks] = React.useState<Record<string, string>>({});

  // Reset to step 0 when switching problems
  React.useEffect(() => {
    const visited = useTutorStore.getState().revealedSteps[itemKey] ?? [0];
    setActiveIndex(Math.max(0, ...visited));
    setShowAll(false);
    setOpenHints({});
    setOpenRationales({});
    setCheckpointPicks({});
  }, [itemKey]);

  React.useEffect(() => {
    if (!stepRequest || stepRequest.index < 0 || stepRequest.index >= steps.length) return;
    setActiveIndex(stepRequest.index);
    setShowAll(false);
  }, [stepRequest, steps.length]);

  const safeIndex = Math.min(activeIndex, Math.max(0, steps.length - 1));
  const activeStep = steps[safeIndex];

  if (!activeStep) return null;

  const selectStep = (index: number) => {
    setActiveIndex(index);
    revealStep(itemKey, index);
  };

  const renderStepBody = (step: SolutionStep, index: number) => {
    const hintOpen = autoShowHints || !!openHints[step.id];
    const rationaleOpen = !!openRationales[step.id];
    const pickedOpt = checkpointPicks[step.id];
    const stepAnchor = `${itemKey}:step:${step.id}`;

    return (
      <div key={step.id} data-ai-anchor={stepAnchor} className="space-y-3">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-[16px] font-semibold tracking-tight text-foreground">
            {index + 1}. {step.title}
          </h3>

          <div className="flex shrink-0 items-center gap-1">
            {step.hint && (
              <Button
                variant="icon"
                size="icon-sm"
                aria-label={t(`Petunjuk langkah ${index + 1}`, `Hint for step ${index + 1}`)}
                title={t("Petunjuk", "Hint")}
                onClick={() =>
                  setOpenHints((prev) => ({
                    ...prev,
                    [step.id]: !prev[step.id],
                  }))
                }
                className={cn(hintOpen && 'text-primary')}
              >
                <HelpCircle className="size-3.5" />
              </Button>
            )}
            <Button
              variant="icon"
              size="icon-sm"
              aria-label={t(`Tanya AI tentang langkah ${index + 1}`, `Ask AI about step ${index + 1}`)}
              title={t("Tanya AI inline di langkah ini", "Ask AI about this step")}
              onClick={() =>
                openInlineAi(stepAnchor, {
                  draftPrompt: t(`Jelaskan detail penurunan aljabar pada Langkah ${index + 1} (${step.title}) dan mengapa pendekatan ini dipakai.`, `Explain the algebra in step ${index + 1} (${step.title}) and why this method applies.`),
                })
              }
            >
              <BotMessageSquare className="size-3.5" />
            </Button>
          </div>
        </div>

        {/* Optional 1-click self-explanation checkpoint */}
        {step.checkpoint && (
          <div className="space-y-2 border-l-2 border-border pl-3.5 text-[13.5px]">
            <div className="text-xs font-medium text-muted-foreground">
              <MathMarkdown content={step.checkpoint.prompt} className="text-xs" />
            </div>
            <div className="flex flex-wrap gap-1.5">
              {step.checkpoint.options.map((opt) => {
                const selected = pickedOpt === opt.id;
                const isRight = opt.id === step.checkpoint?.correctOptionId;
                return (
                  <Button
                    key={opt.id}
                    size="xs"
                    variant={selected ? 'default' : 'outline'}
                    onClick={() =>
                      setCheckpointPicks((prev) => ({ ...prev, [step.id]: opt.id }))
                    }
                    className={cn(
                      'h-auto max-w-full whitespace-normal text-left',
                      selected && !isRight && 'bg-destructive text-primary-foreground hover:bg-destructive/90'
                    )}
                  >
                    <MathMarkdown content={opt.label} className="text-xs" />
                  </Button>
                );
              })}
            </div>
            <CollapsibleMotion open={!!pickedOpt}>
              {pickedOpt && (
                <div className="pt-1 text-xs text-muted-foreground">
                  <MathMarkdown content={step.checkpoint.options.find((o) => o.id === pickedOpt)?.feedback ??
                    (pickedOpt === step.checkpoint.correctOptionId
                      ? t('Keputusan tepat. Lanjut amati penurunan di bawah.', 'Correct. Continue with the derivation below.')
                      : t('Coba bandingkan asumsi ini dengan penurunan di bawah.', 'Compare this assumption with the derivation below.'))} className="text-xs" />
                </div>
              )}
            </CollapsibleMotion>
          </div>
        )}

        {step.hint && (
          <CollapsibleMotion open={hintOpen}>
            <div className="border-l-2 border-primary/40 pl-3 text-[13px] text-muted-foreground">
              <span className="font-medium text-foreground">{t("Petunjuk: ", "Hint: ")}</span>
              {step.hint}
            </div>
          </CollapsibleMotion>
        )}

        <MathMarkdown content={step.content} />

        {step.simulation && (
          <SimulationStage courseSlug={courseSlug} spec={step.simulation} aiAnchorId={stepAnchor} />
        )}

        {/* Optional collapsible Rationale drawer ("Kenapa cara ini?") */}
        {step.rationale && (
          <div className="pt-1">
            <button
              type="button"
              onClick={() =>
                setOpenRationales((prev) => ({
                  ...prev,
                  [step.id]: !prev[step.id],
                }))
              }
              aria-expanded={rationaleOpen}
              className="inline-flex cursor-pointer items-center gap-1 text-xs font-medium text-primary transition-colors hover:underline"
            >
              <ChevronRight
                className={cn(
                  'size-3.5 transition-transform duration-200',
                  rationaleOpen && 'rotate-90'
                )}
              />
              <span>{t("Kenapa pakai cara ini?", "Why this method?")}</span>
            </button>
            <CollapsibleMotion open={rationaleOpen}>
              <div className="mt-2 space-y-2 border-l-2 border-primary/40 pl-3.5 text-[13px] text-muted-foreground">
                <div>
                  <span className="font-medium text-foreground">{t("Alasan metode: ", "Why it works: ")}</span>
                  <MathMarkdown
                    content={step.rationale.whyThisMethod}
                    className="inline text-[13px] text-muted-foreground"
                  />
                </div>
                {step.rationale.whyNotAlternative && (
                  <div>
                    <span className="font-medium text-foreground">{t("Kenapa bukan alternatif: ", "Why not the alternative: ")}</span>
                    <MathMarkdown
                      content={step.rationale.whyNotAlternative}
                      className="inline text-[13px] text-muted-foreground"
                    />
                  </div>
                )}
                {step.rationale.commonPitfall && (
                  <div>
                    <span className="font-medium text-warning">{t('Jebakan umum: ', 'Common mistake: ')}</span>
                    <MathMarkdown
                      content={step.rationale.commonPitfall}
                      className="inline text-[13px] text-muted-foreground"
                    />
                  </div>
                )}
              </div>
            </CollapsibleMotion>
          </div>
        )}

        <InlineAiThread
          anchorId={stepAnchor}
          anchorLabel={`${t('Langkah', 'Step')} ${index + 1} · ${step.title}`}
          courseSlug={courseSlug}
          courseTitle={courseTitle}
          itemKey={itemKey}
          itemTitle={problemTitle}
          contextText={[problemContext, step.title, step.content, step.rationale?.whyThisMethod, step.rationale?.commonPitfall].filter(Boolean).join('\n\n')}
          simulation={step.simulation ?? simulation}
          stepCount={steps.length}
        />
      </div>
    );
  };

  return (
    <section aria-label={t("Pembahasan", "Solution")} className="mt-8 space-y-5">
      {/* Header row: Pembahasan · Langkah 1 / N  |  Lihat semua langkah */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-baseline gap-2.5">
            <h2 className="text-sm font-semibold tracking-tight text-foreground">
              {t("Pembahasan", "Solution")}
            </h2>
            <span className="text-xs text-muted-foreground">
              {showAll
                ? `${steps.length} ${t('langkah', 'steps')}`
                : `${t('Langkah', 'Step')} ${safeIndex + 1} / ${steps.length}`}
            </span>
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? t('Mode bertahap', 'One step at a time') : t('Lihat semua langkah', 'Show all steps')}
          </Button>
        </div>

        {/* Numbered step selector row — smoothly collapses when Lihat semua langkah is active */}
        <CollapsibleMotion open={!showAll}>
          <div className="flex flex-wrap items-center gap-2 border-b border-border pb-3.5">
            <div
              className="flex flex-wrap items-center gap-1.5"
              role="tablist"
              aria-label={t("Pilih langkah", "Choose a step")}
            >
              {steps.map((step, idx) => {
                const isActive = idx === safeIndex;
                return (
                  <button
                    key={step.id}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    aria-label={`${t('Langkah', 'Step')} ${idx + 1}: ${step.title}`}
                    onClick={() => selectStep(idx)}
                    className={cn(
                      'relative inline-flex size-6 cursor-pointer items-center justify-center rounded-full font-mono text-xs font-medium transition-colors outline-none focus-visible:ring-2 focus-visible:ring-ring/50',
                      isActive
                        ? 'text-primary-foreground'
                        : 'bg-surface-subtle text-muted-foreground hover:bg-muted hover:text-foreground'
                    )}
                  >
                    {isActive && (
                      <motion.span
                        layoutId={`active-step-circle-${itemKey}`}
                        transition={{ duration: 0.22, ease: TUTOR_EASE }}
                        className="absolute inset-0 rounded-full bg-primary"
                      />
                    )}
                    <span className="relative z-10">{idx + 1}</span>
                  </button>
                );
              })}
            </div>
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={activeStep.id}
                initial={{ opacity: 0, x: 4 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -4 }}
                transition={{ duration: 0.16, ease: TUTOR_EASE }}
                className="min-w-0 truncate text-xs text-muted-foreground sm:pl-1"
              >
                {activeStep.title}
              </motion.span>
            </AnimatePresence>
          </div>
        </CollapsibleMotion>
      </div>

      {/* Smooth mode transition between Lihat semua langkah and Mode bertahap */}
      <AnimatePresence mode="wait" initial={false}>
        {showAll ? (
          <motion.div
            key="steps-all"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: TUTOR_EASE }}
            className="divide-y divide-border/80"
          >
            {steps.map((step, idx) => (
              <div key={step.id} className="py-5 first:pt-0">
                {renderStepBody(step, idx)}
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="steps-paged"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: TUTOR_EASE }}
            className="space-y-6"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeStep.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: TUTOR_EASE }}
              >
                {renderStepBody(activeStep, safeIndex)}
              </motion.div>
            </AnimatePresence>

            {/* Bottom step navigation: < Sebelumnya  |  1 / N  |  Lanjut > */}
            <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
              <Button
                size="sm"
                variant="ghost"
                disabled={safeIndex === 0}
                onClick={() => selectStep(Math.max(0, safeIndex - 1))}
              >
                <ChevronLeft className="size-3.5" />
                <span>{t("Sebelumnya", "Previous")}</span>
              </Button>

              <span className="font-mono text-xs text-muted-foreground">
                {safeIndex + 1} / {steps.length}
              </span>

              <Button
                size="sm"
                variant={safeIndex >= steps.length - 1 ? 'secondary' : 'default'}
                disabled={safeIndex >= steps.length - 1}
                onClick={() =>
                  selectStep(Math.min(steps.length - 1, safeIndex + 1))
                }
              >
                <span>{t("Lanjut", "Next")}</span>
                <ChevronRight className="size-3.5" />
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
