import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  Bookmark,
  BookmarkCheck,
  Check,
  CheckCheck,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ExternalLink,
  FileText,
  List,
  Lightbulb,
} from "lucide-react";
import type { ExamQuestion, Locale, ContentTable } from "@/content/types";
import { text, topics, examName } from "@/lib/i18n";
import { RichText, Formula } from "@/components/math";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IconButton } from "@/components/controls";
import { Visual } from "@/components/visuals";
import { reference } from "@/content";
function stepTitle(value: string) {
  return value.replace(/^\d+\.\s*/, "");
}
export function DataTable({
  data,
  locale,
}: {
  data: ContentTable;
  locale: Locale;
}) {
  return (
    <div className="data-table">
      <Table>
        <TableHeader>
          <TableRow>
            {data.headers.map((h, i) => (
              <TableHead key={i}>
                <RichText>{h[locale]}</RichText>
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.rows.map((row, i) => (
            <TableRow key={i}>
              {row.map((cell, j) => (
                <TableCell key={j}>
                  <RichText>{cell}</RichText>
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
export function SourceDialog({
  q,
  locale,
}: {
  q: ExamQuestion;
  locale: Locale;
}) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="source-button">
          <FileText />
          {text(locale, "Soal asli", "Original")}
        </Button>
      </DialogTrigger>
      <DialogContent className="source-dialog">
        <DialogHeader>
          <DialogTitle>
            {text(locale, "Sumber soal", "Question source")}
          </DialogTitle>
          <DialogDescription>
            {examName(q.exam, locale)} {q.year} ·{" "}
            {text(locale, "Soal", "Question")} {q.number} ·{" "}
            {text(locale, "Halaman", "Pages")} {q.source.pages.join(", ")}
          </DialogDescription>
        </DialogHeader>
        <div className="source-scroll">
          <RichText>{q.original}</RichText>
          <div className="source-links">
            <a href={q.source.url} target="_blank" rel="noreferrer">
              {text(
                locale,
                "Buka naskah ujian dan gambar asli",
                "Open exam paper and original figures",
              )}{" "}
              <ExternalLink size={14} />
            </a>
            <a href={reference.url} target="_blank" rel="noreferrer">
              {reference.name} <ExternalLink size={14} />
            </a>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
export function Study({
  q,
  locale,
  completed,
  bookmarked,
  onBookmark,
  onComplete,
  onNext,
  onStep,
  maxStep = 0,
  onOpenList,
}: {
  q: ExamQuestion;
  locale: Locale;
  completed: boolean;
  bookmarked: boolean;
  onBookmark: () => void;
  onComplete: () => void;
  onNext: () => void;
  onStep: (s: number) => void;
  maxStep?: number;
  onOpenList: () => void;
}) {
  const [step, setStep] = useState(0),
    [expanded, setExpanded] = useState(false),
    [showAll, setShowAll] = useState(false);
  const reduced = useReducedMotion();
  useEffect(() => {
    setStep(0);
    setExpanded(false);
    setShowAll(false);
  }, [q.id]);
  const promptRef = useRef<HTMLDivElement>(null);
  const [canCollapse, setCanCollapse] = useState(false);
  useEffect(() => {
    const element = promptRef.current;
    if (!element) return;
    const measure = () =>
      setCanCollapse((element.firstElementChild?.scrollHeight ?? 0) > 160);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(element);
    return () => observer.disconnect();
  }, [q.id, locale]);
  const active = q.steps[Math.min(step, q.steps.length - 1)];
  const visual = active?.visual ?? q.visual;
  function go(n: number) {
    setStep(n);
    onStep(n);
  }
  return (
    <article className="study-reader" aria-label={q.title[locale]}>
      <div className="question-meta">
        <Button
          variant="ghost"
          size="sm"
          className="mobile-list-button"
          onClick={onOpenList}
        >
          <List />
          {text(locale, "Daftar soal", "Questions")}
        </Button>
        <span>
          {examName(q.exam, locale)} {q.year}
        </span>
        <span className="meta-dot">·</span>
        <span>{topics[q.topic][locale]}</span>
        <div className="question-tools">
          <SourceDialog q={q} locale={locale} />
          <IconButton
            label={text(
              locale,
              bookmarked ? "Hapus penanda" : "Tandai soal",
              bookmarked ? "Remove bookmark" : "Bookmark question",
            )}
            pressed={bookmarked}
            onClick={onBookmark}
          >
            {bookmarked ? <BookmarkCheck /> : <Bookmark />}
          </IconButton>
        </div>
      </div>
      <div className="question-title">
        <span className="question-number">
          {String(q.number).padStart(2, "0")}
        </span>
        <h1>{q.title[locale]}</h1>
      </div>
      <div
        ref={promptRef}
        className={`question-prompt ${expanded || !canCollapse ? "is-expanded" : ""}`}
      >
        <RichText>{q.prompt[locale]}</RichText>
      </div>
      {canCollapse && (
        <Button
          variant="ghost"
          size="sm"
          className="expand-prompt"
          onClick={() => setExpanded(!expanded)}
          aria-expanded={expanded}
        >
          {text(
            locale,
            expanded ? "Ringkas soal" : "Baca soal lengkap",
            expanded ? "Collapse question" : "Read full question",
          )}
          <ChevronDown className={expanded ? "rotate-180" : ""} />
        </Button>
      )}
      {q.givens && q.givens.length > 0 && (
        <dl className="givens">
          {q.givens.map((v, i) => (
            <div key={i}>
              <dt>{v.label[locale]}</dt>
              <dd>
                <RichText>{v.value}</RichText>
              </dd>
            </div>
          ))}
        </dl>
      )}
      <div className="solution-bar">
        <h2>{text(locale, "Pembahasan", "Solution")}</h2>
        <span>
          {text(locale, "Langkah", "Step")} {step + 1} / {q.steps.length}
        </span>
        <Button
          variant="ghost"
          size="sm"
          className="all-steps-button"
          onClick={() => setShowAll(!showAll)}
        >
          {text(
            locale,
            showAll ? "Mode bertahap" : "Lihat semua langkah",
            showAll ? "Step mode" : "See all steps",
          )}
        </Button>
      </div>
      <div
        className="step-track"
        role="group"
        aria-label={text(locale, "Langkah pembahasan", "Solution steps")}
      >
        {q.steps.map((s, i) => (
          <button
            key={i}
            type="button"
            className={`step-dot ${i === step ? "active" : ""} ${i < maxStep || completed ? "visited" : ""}`}
            aria-label={`${i + 1}. ${stepTitle(s.title[locale])}`}
            aria-current={i === step ? "step" : undefined}
            onClick={() => {
              go(i);
              setShowAll(false);
            }}
          >
            {i < step ? <Check size={14} /> : i + 1}
          </button>
        ))}
        <span>{active && stepTitle(active.title[locale])}</span>
      </div>
      <div className="explanation-grid">
        <div className="steps-column">
          {showAll ? (
            <div className="all-steps">
              {q.steps.map((s, i) => (
                <section key={i}>
                  <div className="all-step-heading">
                    <span>{i + 1}</span>
                    <h3>{stepTitle(s.title[locale])}</h3>
                  </div>
                  {s.body.map((b, j) => (
                    <RichText key={j}>{b[locale]}</RichText>
                  ))}
                  {s.math && <Formula>{s.math}</Formula>}
                  {s.table && <DataTable data={s.table} locale={locale} />}{" "}
                  {s.note && (
                    <div className="step-note">
                      <Lightbulb size={16} />
                      <RichText>{s.note[locale]}</RichText>
                    </div>
                  )}
                  {s.visual && (
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        go(i);
                        setShowAll(false);
                      }}
                    >
                      {text(
                        locale,
                        "Lihat visual langkah ini",
                        "View this step’s visual",
                      )}
                    </Button>
                  )}
                </section>
              ))}
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.section
                key={`${q.id}-${step}-${locale}`}
                initial={{ opacity: 0, y: reduced ? 0 : 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -4 }}
                transition={{ duration: 0.16 }}
                className="step-content"
              >
                <h3>
                  {step + 1}. {active && stepTitle(active.title[locale])}
                </h3>
                {active?.body.map((b, i) => (
                  <RichText key={i}>{b[locale]}</RichText>
                ))}
                {active?.math && <Formula>{active.math}</Formula>}
                {active?.table && (
                  <DataTable data={active.table} locale={locale} />
                )}{" "}
                {active?.note && (
                  <div className="step-note">
                    <Lightbulb size={16} />
                    <RichText>{active.note[locale]}</RichText>
                  </div>
                )}
              </motion.section>
            </AnimatePresence>
          )}
          <div className="step-navigation">
            <Button
              variant="ghost"
              size="sm"
              disabled={step === 0}
              onClick={() => go(step - 1)}
            >
              <ChevronLeft />
              {text(locale, "Sebelumnya", "Previous")}
            </Button>
            <span>
              {step + 1} / {q.steps.length}
            </span>
            {step < q.steps.length - 1 ? (
              <Button size="sm" onClick={() => go(step + 1)}>
                {text(locale, "Lanjut", "Continue")}
                <ChevronRight />
              </Button>
            ) : (
              <Button size="sm" onClick={onComplete}>
                <Check />
                {text(
                  locale,
                  completed ? "Selesai" : "Tandai selesai",
                  completed ? "Completed" : "Mark complete",
                )}
              </Button>
            )}
          </div>
          {(step === q.steps.length - 1 || showAll) && (
            <div className="answer-section">
              <h3>{text(locale, "Hasil & maknanya", "Result & meaning")}</h3>
              {q.answerMath && <Formula>{q.answerMath}</Formula>}
              <RichText>{q.answer[locale]}</RichText>
              {completed && (
                <Button
                  variant="ghost"
                  className="next-question"
                  onClick={onNext}
                >
                  <CheckCheck />
                  {text(locale, "Buka soal berikutnya", "Open next question")}
                </Button>
              )}
            </div>
          )}
          {q.assumptions && q.assumptions.length > 0 && (
            <Accordion type="single" collapsible className="assumptions">
              <AccordionItem value="notes">
                <AccordionTrigger>
                  {text(
                    locale,
                    "Catatan data & asumsi",
                    "Data notes & assumptions",
                  )}
                  <span className="notes-count">{q.assumptions.length}</span>
                </AccordionTrigger>
                <AccordionContent>
                  {q.assumptions.map((a, i) => (
                    <RichText key={i}>{a[locale]}</RichText>
                  ))}
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          )}
        </div>
        <aside
          className="visual-column"
          aria-label={text(locale, "Visual interaktif", "Interactive visual")}
        >
          <Visual
            key={`${q.id}-${visual.kind}-${JSON.stringify(visual.params)}`}
            spec={visual}
            locale={locale}
          />
          {q.visuals && q.visuals.length > 0 && (
            <Accordion type="single" collapsible className="extra-visuals">
              {q.visuals.map((v, i) => (
                <AccordionItem key={i} value={`visual-${i}`}>
                  <AccordionTrigger>
                    <span>
                      {text(locale, "Visual tambahan", "Additional visual")}{" "}
                      {i + 1}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent>
                    <Visual spec={v} locale={locale} />
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          )}
        </aside>
      </div>
      <footer className="question-footer">
        <span>
          {text(locale, "Acuan", "Reference")}: {q.source.file},{" "}
          {text(locale, "hlm.", "pp.")} {q.source.pages.join(", ")}
        </span>
        <a href={reference.url} target="_blank" rel="noreferrer">
          {text(locale, "Materi kuliah", "Course notes")}
          {q.referencePages?.length
            ? ` · ${text(locale, "hlm.", "pp.")} ${q.referencePages.join(", ")}`
            : ""}
          <ExternalLink size={12} />
        </a>
      </footer>
    </article>
  );
}
