import * as React from 'react';
import { useLanguage } from '../i18n/language-provider';
import { Bookmark, BotMessageSquare, CheckCircle2, Circle } from 'lucide-react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger, Button, cn } from '@tutor/ui';
import type { ProblemItem } from '../types/course';
import { useTutorStore } from '../store/tutor-store';
import { MathMarkdown } from './math-markdown';
import { Callout } from './callout';
import { StepDisclosure } from './step-disclosure';
import { SimulationStage } from '../simulation/simulation-stage';
import { InlineAiThread } from '../ai/inline-ai-thread';

export function ProblemView({ courseSlug, courseTitle, problem }: {
  courseSlug: string;
  courseTitle?: string;
  problem: ProblemItem;
}) {
  const itemKey = `${courseSlug}:${problem.id}`;
  const { t } = useLanguage();
  const statementAnchor = `${itemKey}:statement`;
  const setupAnchor = `${itemKey}:setup`;
  const resultAnchor = `${itemKey}:result`;
  const articleRef = React.useRef<HTMLElement>(null);
  const [activeSection, setActiveSection] = React.useState('question');
  const simulations = [
    ...(problem.simulation ? [problem.simulation] : []),
    ...(problem.simulations ?? []),
  ];
  const references = problem.sourceDetails?.references
    ?? (problem.sourceDetails?.reference ? [problem.sourceDetails.reference] : []);
  const hasSetup = !!(problem.given?.length || problem.asked || problem.assumptions?.length || simulations.length);
  const sectionId = (section: string) => `${itemKey}:${section}`;
  const sections = [
    { id: 'question', label: t('Soal', 'Problem') },
    ...(hasSetup ? [{ id: 'setup', label: t('Data dan model', 'Data and model') }] : []),
    { id: 'analysis', label: t('Pembahasan', 'Solution') },
    { id: 'result', label: t('Hasil', 'Result') },
  ];

  React.useEffect(() => {
    setActiveSection('question');
    const article = articleRef.current;
    if (!article || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver((entries) => {
      const current = entries.filter((entry) => entry.isIntersecting)
        .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
      const section = current?.target.getAttribute('data-reading-section');
      if (section) setActiveSection(section);
    }, { rootMargin: '-100px 0px -55% 0px', threshold: 0 });
    article.querySelectorAll('[data-reading-section]').forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, [itemKey]);

  const isCompleted = useTutorStore((s) => !!s.completedIds[itemKey]);
  const isBookmarked = useTutorStore((s) => !!s.bookmarkedIds[itemKey]);
  const toggleComplete = useTutorStore((s) => s.toggleComplete);
  const toggleBookmark = useTutorStore((s) => s.toggleBookmark);
  const openInlineAi = useTutorStore((s) => s.openInlineAi);
  const problemContext = [
    problem.statement, ...(problem.given ?? []), problem.asked,
    ...(problem.assumptions ?? []), ...(problem.sourceNotes ?? []),
    ...references.map((reference) => `${reference.title}; ${t('halaman PDF', 'PDF pages')} ${reference.pages?.join(', ') ?? ''}; ${reference.url}`),
  ].filter(Boolean).join('\n\n');

  return (
    <article ref={articleRef} className="min-w-0 pb-6">
      <header className="space-y-2 pb-4">
        <h1 className="text-xl leading-snug font-semibold tracking-tight text-foreground sm:text-[1.6rem]">
          {problem.title}
        </h1>
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
          <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-muted-foreground">
            {problem.source && <span>{problem.source}</span>}
            {problem.source && <span aria-hidden="true">·</span>}
            <span>{problem.difficulty === 'dasar' ? t('Dasar', 'Basic') : problem.difficulty === 'menengah' ? t('Menengah', 'Intermediate') : t('Lanjut', 'Advanced')}</span>
            {!!problem.estimatedMinutes && <><span aria-hidden="true">·</span><span>{problem.estimatedMinutes} {t('mnt', 'min')}</span></>}
          </p>
          <div className="flex items-center gap-1">
            <Button variant="icon" size="icon" className={cn('min-h-9 min-w-9', isBookmarked && 'text-primary')}
              aria-label={isBookmarked ? t('Hapus simpanan', 'Remove bookmark') : t('Simpan soal', 'Save problem')}
              title={isBookmarked ? t('Tersimpan', 'Saved') : t('Simpan soal', 'Save problem')}
              onClick={() => toggleBookmark(itemKey)}>
              <Bookmark className="size-4" fill={isBookmarked ? 'currentColor' : 'none'} />
            </Button>
            <Button variant="icon" size="icon" className={cn('min-h-9 min-w-9', isCompleted && 'text-success')}
              aria-label={isCompleted ? t('Tandai belum selesai', 'Mark incomplete') : t('Tandai selesai', 'Mark complete')}
              title={isCompleted ? t('Selesai dipelajari', 'Completed') : t('Tandai selesai', 'Mark complete')}
              onClick={() => toggleComplete(itemKey)}>
              {isCompleted ? <CheckCircle2 className="size-4" /> : <Circle className="size-4" />}
            </Button>
            <Button variant="ghost" size="sm" className="min-h-9" onClick={() => openInlineAi(statementAnchor, {
              draftPrompt: t(`Bantu saya memahami soal "${problem.title}" beserta simbol persamaannya.`, `Help me understand "${problem.title}" and the symbols in its equations.`),
            })}>
              <BotMessageSquare className="size-3.5 text-primary" /><span>{t('Tanya AI', 'Ask AI')}</span>
            </Button>
          </div>
        </div>
      </header>

      <nav aria-label={t('Bagian pembahasan', 'Solution sections')}
        className="sticky top-11 z-20 -mx-1 flex gap-1 border-y border-border bg-background/95 px-1 backdrop-blur-sm sm:top-12 sm:gap-4">
        {sections.map((section) => (
          <a key={section.id} href={`#${sectionId(section.id)}`}
            aria-current={activeSection === section.id ? 'location' : undefined}
            onClick={() => setActiveSection(section.id)}
            className={cn('min-w-0 border-b-2 border-transparent px-2 py-2.5 text-[13px] font-medium transition-colors outline-none hover:text-primary focus-visible:ring-2 focus-visible:ring-ring',
              activeSection === section.id ? 'border-primary text-primary' : 'text-muted-foreground')}>
            {section.label}
          </a>
        ))}
      </nav>

      <section id={sectionId('question')} data-reading-section="question" aria-labelledby={sectionId('question-heading')}
        data-ai-anchor={statementAnchor} className="scroll-mt-28 space-y-3 pt-5">
        <h2 id={sectionId('question-heading')} className="text-base font-semibold">{t('Soal', 'Problem')}</h2>
        <MathMarkdown content={problem.statement} />

        {(problem.sourceDetails || !!problem.sourceNotes?.length) && (
          <Accordion key={itemKey} type="multiple" className="border-y border-border/70">
            {problem.sourceDetails && (
              <AccordionItem value="original-source" className="last:border-0">
                <AccordionTrigger className="py-2.5 text-sm">{t('Naskah dan sumber soal', 'Original problem and sources')}</AccordionTrigger>
                <AccordionContent className="space-y-3">
                  <p className="break-words text-xs text-muted-foreground">
                    <a href={problem.sourceDetails.url} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">{problem.sourceDetails.file}</a>
                    {!!problem.sourceDetails.pages.length && ` · ${t('halaman', 'pages')} ${problem.sourceDetails.pages.join(', ')}`}
                    {` · ${problem.sourceDetails.originalLanguage === 'id' ? t('Bahasa Indonesia', 'Indonesian') : 'English'}`}
                  </p>
                  <div lang={problem.sourceDetails.originalLanguage} className="whitespace-pre-wrap break-words text-sm leading-relaxed">{problem.sourceDetails.original}</div>
                  {references.length > 0 && (
                    <ul className="space-y-2 text-xs text-muted-foreground">
                      {references.map((reference) => <li key={reference.url}>
                        <a href={reference.url} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-4">{reference.title}</a>
                        {!!reference.pages?.length && ` · ${t('halaman PDF', 'PDF pages')} ${reference.pages.join(', ')}`}
                      </li>)}
                    </ul>
                  )}
                </AccordionContent>
              </AccordionItem>
            )}
            {!!problem.sourceNotes?.length && (
              <AccordionItem value="course-notes" className="border-0">
                <AccordionTrigger className="py-2.5 text-sm">{t('Dasar dari materi kuliah', 'Basis in the course material')}</AccordionTrigger>
                <AccordionContent className="space-y-3 text-foreground">
                  {problem.sourceNotes.map((note, index) => <MathMarkdown key={index} content={note} className="text-sm" />)}
                </AccordionContent>
              </AccordionItem>
            )}
          </Accordion>
        )}
        <InlineAiThread anchorId={statementAnchor} anchorLabel={t('Soal', 'Problem')}
          courseSlug={courseSlug} courseTitle={courseTitle} itemKey={itemKey} itemTitle={problem.title}
          contextText={problemContext} simulation={simulations[0]} stepCount={problem.steps.length} />
      </section>

      {hasSetup && (
        <section id={sectionId('setup')} data-reading-section="setup" aria-labelledby={sectionId('setup-heading')}
          data-ai-anchor={setupAnchor} className="mt-6 scroll-mt-28 space-y-4 border-t border-border pt-5">
          <h2 id={sectionId('setup-heading')} className="text-base font-semibold">{t('Data dan model', 'Data and model')}</h2>
          {(!!problem.given?.length || problem.asked) && (
            <dl className="grid min-w-0 gap-4 sm:grid-cols-2 sm:gap-6">
              {!!problem.given?.length && <div className="min-w-0">
                <dt className="mb-2 text-sm font-semibold">{t('Diketahui', 'Known')}</dt>
                <dd><ul className="space-y-1.5">
                  {problem.given.map((given, index) => <li key={index} className="flex min-w-0 items-start gap-2">
                    <span aria-hidden="true" className="mt-2.5 size-1 shrink-0 rounded-full bg-muted-foreground" />
                    <MathMarkdown content={given} className="min-w-0 text-sm" />
                  </li>)}
                </ul></dd>
              </div>}
              {problem.asked && <div className="min-w-0 sm:border-l sm:border-border sm:pl-6">
                <dt className="mb-2 text-sm font-semibold">{t('Ditanyakan', 'Find')}</dt>
                <dd><MathMarkdown content={problem.asked} className="text-sm" /></dd>
              </div>}
            </dl>
          )}
          {!!problem.assumptions?.length && <div className="space-y-2 border-l-2 border-primary/50 pl-3.5">
            <h3 className="text-sm font-semibold">{t('Model, asumsi, dan batas', 'Model, assumptions, and limits')}</h3>
            {problem.assumptions.map((assumption, index) => <MathMarkdown key={index} content={assumption} className="text-sm" />)}
          </div>}
          <InlineAiThread anchorId={setupAnchor} anchorLabel={t('Data dan model', 'Data and model')}
            courseSlug={courseSlug} courseTitle={courseTitle} itemKey={itemKey} itemTitle={problem.title}
            contextText={problemContext} simulation={simulations[0]} stepCount={problem.steps.length} />
          {simulations.length > 0 && <Accordion key={itemKey} type="multiple" defaultValue={[simulations[0].id]}>
            {simulations.map((simulation) => {
              const simAnchor = `${itemKey}:simulation:${simulation.id}`;
              return <AccordionItem key={simulation.id} value={simulation.id} className="last:border-0">
                <AccordionTrigger className="py-2.5 text-sm">{t('Skema dan simulasi', 'Diagram and simulation')}{simulations.length > 1 ? `: ${simulation.title}` : ''}</AccordionTrigger>
                <AccordionContent>
                  <div data-ai-anchor={simAnchor}>
                    <SimulationStage courseSlug={courseSlug} spec={simulation} aiAnchorId={simAnchor} />
                    <InlineAiThread anchorId={simAnchor} anchorLabel={simulation.title}
                      courseSlug={courseSlug} courseTitle={courseTitle} itemKey={itemKey} itemTitle={problem.title}
                      contextText={problemContext} simulation={simulation} stepCount={problem.steps.length} />
                  </div>
                </AccordionContent>
              </AccordionItem>;
            })}
          </Accordion>}
        </section>
      )}

      <div id={sectionId('analysis')} data-reading-section="analysis" className="scroll-mt-28">
        <StepDisclosure courseSlug={courseSlug} courseTitle={courseTitle} itemKey={itemKey} steps={problem.steps}
          problemTitle={problem.title} problemContext={problemContext} simulation={simulations[0]} />
      </div>

      <section id={sectionId('result')} data-reading-section="result" aria-labelledby={sectionId('result-heading')}
        data-ai-anchor={resultAnchor} className="mt-6 scroll-mt-28 space-y-4 border-t border-border pt-5">
        <h2 id={sectionId('result-heading')} className="text-base font-semibold">{t('Hasil dan pemeriksaan', 'Result and review')}</h2>
        <Callout tone="answer" label={t('Jawaban akhir', 'Final answer')}><MathMarkdown content={problem.finalAnswer} /></Callout>
        {problem.takeaway && <Callout tone="tip" label={t('Yang perlu diingat', 'What to remember')}>
          <MathMarkdown content={problem.takeaway} className="text-sm" />
        </Callout>}
        <InlineAiThread anchorId={resultAnchor} anchorLabel={t('Hasil dan pemeriksaan', 'Result and review')}
          courseSlug={courseSlug} courseTitle={courseTitle} itemKey={itemKey} itemTitle={problem.title}
          contextText={[problemContext, problem.finalAnswer, problem.takeaway].filter(Boolean).join('\n\n')}
          simulation={simulations[0]} stepCount={problem.steps.length} />
        <div className="flex items-center justify-end border-t border-border pt-3">
          <Button size="sm" variant={isCompleted ? 'secondary' : 'default'} className="min-h-9" onClick={() => toggleComplete(itemKey)}>
            <CheckCircle2 className="size-3.5" /><span>{isCompleted ? t('Sudah dipahami', 'Understood') : t('Tandai selesai', 'Mark complete')}</span>
          </Button>
        </div>
      </section>
    </article>
  );
}
