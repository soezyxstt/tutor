import { useLanguage } from '../i18n/language-provider';
import { Bookmark, BotMessageSquare, CheckCircle2, Circle } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Badge,
  Button,
  Checkbox,
  Separator,
  cn,
} from '@tutor/ui';
import type { MaterialItem } from '../types/course';
import { useTutorStore } from '../store/tutor-store';
import { MathMarkdown } from './math-markdown';
import { Callout } from './callout';
import { SimulationStage } from '../simulation/simulation-stage';
import { InlineAiThread } from '../ai/inline-ai-thread';
import { DecisionCheck } from './decision-check';

export function MaterialView({
  courseSlug,
  courseTitle,
  material,
}: {
  courseSlug: string;
  courseTitle?: string;
  material: MaterialItem;
}) {
  const itemKey = `${courseSlug}:${material.id}`;
  const { t } = useLanguage();
  const materialAnchor = `${itemKey}:material`;
  const simAnchor = `${itemKey}:simulation`;

  const isCompleted = useTutorStore((s) => !!s.completedIds[itemKey]);
  const isBookmarked = useTutorStore((s) => !!s.bookmarkedIds[itemKey]);
  const checkedPoints = useTutorStore((s) => s.checkedPoints);
  const toggleComplete = useTutorStore((s) => s.toggleComplete);
  const toggleBookmark = useTutorStore((s) => s.toggleBookmark);
  const toggleCheckpoint = useTutorStore((s) => s.toggleCheckpoint);
  const openInlineAi = useTutorStore((s) => s.openInlineAi);
  const materialContext = [material.examHook?.prompt, material.body,
    ...(material.microUnits ?? []).flatMap((unit) => [unit.title, unit.intuition, unit.formal, unit.validityBounds]),
    material.keyFormula?.latex,
  ].filter(Boolean).join('\n\n');

  return (
    <article className="pb-16">
      <header className="space-y-2.5">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
            <Badge variant="primary">{t("Materi", "Lesson")}</Badge>
            {material.estimatedMinutes && (
              <>
                <span aria-hidden="true">·</span>
                <span>{material.estimatedMinutes} {t('mnt baca', 'min read')}</span>
              </>
            )}
          </div>

          <div className="flex items-center gap-1">
            <Button
              variant="icon"
              size="icon"
              aria-label={isBookmarked ? t('Hapus simpanan', 'Remove bookmark') : t('Simpan materi', 'Save lesson')}
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
              aria-label={isCompleted ? t('Tandai belum dibaca', 'Mark unread') : t('Tandai selesai', 'Mark complete')}
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
                openInlineAi(materialAnchor, {
                  draftPrompt: t(`Ringkaskan poin inti dari materi "${material.title}" dalam tabel perbandingan.`, `Summarize the key points of "${material.title}" in a comparison table.`),
                })
              }
            >
              <BotMessageSquare className="size-3.5 text-primary" />
              <span>{t("Tanya AI", "Ask AI")}</span>
            </Button>
          </div>
        </div>

        <h1 className="text-xl font-semibold tracking-tight text-foreground sm:text-[1.6rem]">
          {material.title}
        </h1>
      </header>

      <Separator className="my-5" />

      <div data-ai-anchor={materialAnchor}>
        {material.examHook && (
          <section aria-label={t('Mulai dari kasus', 'Start with a case')} className="mb-6 space-y-3 border-l-2 border-primary/40 pl-4">
            <MathMarkdown content={material.examHook.prompt} />
            <MathMarkdown content={material.examHook.targetOutcome} className="text-sm text-muted-foreground" />
          </section>
        )}

        <MathMarkdown content={material.body} />

        {!!material.microUnits?.length && (
          <Accordion type="multiple" defaultValue={[material.microUnits[0].id]} className="my-6 border-t border-border">
            {material.microUnits.map((unit) => (
              <AccordionItem key={unit.id} value={unit.id}>
                <AccordionTrigger>{unit.title}</AccordionTrigger>
                <AccordionContent className="space-y-4">
                  <MathMarkdown content={unit.intuition} />
                  <MathMarkdown content={unit.formal} />
                  {unit.validityBounds && <Callout tone="tip" label={t('Kapan cara ini berlaku?', 'When does this method apply?')}><MathMarkdown content={unit.validityBounds} className="text-sm" /></Callout>}
                  {unit.decisionCheck && <DecisionCheck question={unit.decisionCheck} answerKey={`${itemKey}:concept:${unit.id}`} />}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}

        {material.keyFormula && (
          <Callout
            tone="formula"
            label={material.keyFormula.label}
            className="mb-6"
          >
            <MathMarkdown content={`$$\n${material.keyFormula.latex}\n$$`} />
            {material.keyFormula.note && (
              <p className="mt-1 text-xs text-muted-foreground">
                {material.keyFormula.note}
              </p>
            )}
          </Callout>
        )}

        <InlineAiThread
          anchorId={materialAnchor}
          anchorLabel={t("Diskusi Materi", "Lesson discussion")}
          courseSlug={courseSlug}
          courseTitle={courseTitle}
          itemKey={itemKey}
          itemTitle={material.title}
          contextText={materialContext}
          simulation={material.simulation}
        />
      </div>

      {material.simulation && (
        <section
          aria-label={t("Simulasi Interaktif", "Interactive simulation")}
          data-ai-anchor={simAnchor}
          className="mt-8"
        >
          <SimulationStage
            courseSlug={courseSlug}
            spec={material.simulation}
            aiAnchorId={simAnchor}
          />
          <InlineAiThread
            anchorId={simAnchor}
            anchorLabel={t("Simulasi Interaktif", "Interactive simulation")}
            courseSlug={courseSlug}
            courseTitle={courseTitle}
            itemKey={itemKey}
            itemTitle={material.title}
            contextText={materialContext}
            simulation={material.simulation}
          />
        </section>
      )}

      {material.derivations && material.derivations.length > 0 && (
        <section
          aria-label={t("Penurunan Rumus", "Formula derivation")}
          data-ai-anchor={materialAnchor}
          className="mt-8"
        >
          <h2 className="mb-1 text-sm font-semibold tracking-tight text-foreground">
            {t("Penurunan dan Pendalaman", "Derivations and details")}
          </h2>
          <Accordion type="multiple" className="border-t border-border">
            {material.derivations.map((d) => (
              <AccordionItem key={d.id} value={d.id}>
                <AccordionTrigger>{d.title}</AccordionTrigger>
                <AccordionContent>
                  <MathMarkdown content={d.content} className="text-[14px]" />
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </section>
      )}

      {material.checkpoints && material.checkpoints.length > 0 && (
        <section aria-label={t("Cek Penguasaan Konsep", "Check your understanding")} className="mt-8 space-y-2.5">
          <h2 className="text-sm font-semibold tracking-tight text-foreground">
            {t("Cek Penguasaan Konsep", "Check your understanding")}
          </h2>
          <ul className="space-y-2">
            {material.checkpoints.map((cp, idx) => {
              const cpKey = `${itemKey}:cp:${idx}`;
              const checked = !!checkedPoints[cpKey];
              return (
                <li key={cpKey}>
                  <label className="flex cursor-pointer items-start gap-2.5 text-[14px] text-foreground">
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggleCheckpoint(cpKey)}
                      className="mt-0.5"
                    />
                    <span
                      className={cn(
                        'leading-snug transition-colors',
                        checked && 'text-muted-foreground line-through'
                      )}
                    >
                      {cp}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <div className="mt-10 flex items-center justify-end border-t border-border pt-4">
        <Button
          size="sm"
          variant={isCompleted ? 'secondary' : 'default'}
          onClick={() => toggleComplete(itemKey)}
        >
          <CheckCircle2 className="size-3.5" />
          <span>{isCompleted ? t('Selesai dibaca', 'Read') : t('Tandai selesai', 'Mark complete')}</span>
        </Button>
      </div>
    </article>
  );
}
