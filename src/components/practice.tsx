import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { Check, X, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import type { Locale, Topic } from "@/content/types";
import { practice } from "@/content";
import { usePersisted } from "@/hooks/use-persisted";
import { text, topics } from "@/lib/i18n";
import { RichText, Formula } from "@/components/math";
import { TextSelect } from "@/components/controls";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
export function Practice({
  locale,
  onOpenQuestion,
}: {
  locale: Locale;
  onOpenQuestion: (id: string) => void;
}) {
  const [answers, setAnswers] = usePersisted<Record<string, number>>(
    "ipe:practice:v1",
    {},
  );
  const [index, setIndex] = useState(0);
  const [topic, setTopic] = useState("all");
  const [selected, setSelected] = useState<string>("");
  const [resetOpen, setResetOpen] = useState(false);
  const [reviewErrors, setReviewErrors] = useState(false);
  const reduced = useReducedMotion();
  const filtered = practice.filter(
    (q) =>
      (topic === "all" || q.topic === topic) &&
      (!reviewErrors ||
        (answers[q.id] !== undefined && answers[q.id] !== q.correctIndex)),
  );
  const q = filtered[Math.min(index, Math.max(0, filtered.length - 1))];
  const totalAnswered = Object.keys(answers).filter((id) =>
      practice.some((q) => q.id === id),
    ).length,
    correct = practice.filter((q) => answers[q.id] === q.correctIndex).length;
  const checked = q && answers[q.id] !== undefined;
  const isCorrect = q && answers[q.id] === q.correctIndex;
  function move(next: number) {
    setIndex(next);
    setSelected("");
  }
  function check() {
    if (q && selected !== "")
      setAnswers({ ...answers, [q.id]: Number(selected) });
  }
  return (
    <main id="main-content" tabIndex={-1} className="practice-page">
      <div className="practice-intro">
        <div>
          <h1>{text(locale, "Uji pemahamanmu", "Check your understanding")}</h1>
          <p>
            {text(
              locale,
              "30 soal baru, satu konsep setiap kali. Pembahasan terbuka setelah kamu menjawab.",
              "30 original questions, one concept at a time. Each answer comes with an explanation.",
            )}
          </p>
        </div>
        <Button variant="ghost" size="sm" onClick={() => setResetOpen(true)}>
          <RotateCcw />
          {text(locale, "Ulangi latihan", "Restart practice")}
        </Button>
      </div>
      <div className="practice-progress">
        <div>
          <strong>
            {totalAnswered}
            <span> / 30</span>
          </strong>
          <span>{text(locale, "sudah dijawab", "answered")}</span>
        </div>
        <Progress
          value={(totalAnswered / 30) * 100}
          aria-label={text(locale, "Kemajuan latihan", "Practice progress")}
        />
        <span>
          {correct} {text(locale, "benar", "correct")}
        </span>
      </div>
      <div className="practice-filter">
        <TextSelect
          value={topic}
          onChange={(v) => {
            setTopic(v);
            move(0);
          }}
          label={text(locale, "Topik latihan", "Practice topic")}
          options={[
            { value: "all", label: text(locale, "Semua topik", "All topics") },
            ...Array.from(new Set(practice.map((q) => q.topic))).map((t) => ({
              value: t,
              label: topics[t as Topic][locale],
            })),
          ]}
        />
        <Button
          variant="ghost"
          size="sm"
          className={reviewErrors ? "selected-filter" : ""}
          onClick={() => {
            setReviewErrors(!reviewErrors);
            move(0);
          }}
        >
          {text(
            locale,
            reviewErrors ? "Tampilkan semua" : "Tinjau yang keliru",
            reviewErrors ? "Show all" : "Review mistakes",
          )}
        </Button>
      </div>
      {!q ? (
        <div className="empty-state">
          <Check size={30} />
          <h2>
            {text(
              locale,
              "Belum ada jawaban keliru",
              "No incorrect answers yet",
            )}
          </h2>
          <p>
            {text(
              locale,
              "Jawab soal untuk melihat bagian yang perlu kamu ulang.",
              "Answer a question to see what to review.",
            )}
          </p>
          <Button
            variant="ghost"
            onClick={() => {
              setReviewErrors(false);
              setTopic("all");
            }}
          >
            {text(locale, "Buka latihan", "Open practice")}
          </Button>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.article
            key={`${q.id}-${locale}`}
            initial={{ opacity: 0, y: reduced ? 0 : 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.16 }}
            className="practice-question"
          >
            <div className="question-meta">
              <span>
                {text(locale, "Soal", "Question")}{" "}
                {Math.min(index + 1, filtered.length)} / {filtered.length}
              </span>
              <span>·</span>
              <span>{topics[q.topic][locale]}</span>
              <span className="practice-level">
                {q.difficulty === "foundation"
                  ? text(locale, "Dasar", "Foundation")
                  : q.difficulty === "applied"
                    ? text(locale, "Penerapan", "Application")
                    : text(locale, "Penalaran", "Reasoning")}
              </span>
            </div>
            <h2>
              <RichText>{q.prompt[locale]}</RichText>
            </h2>
            <RadioGroup
              value={checked ? String(answers[q.id]) : selected}
              onValueChange={setSelected}
              disabled={checked}
              aria-label={text(locale, "Pilihan jawaban", "Answer choices")}
              className="answer-options"
            >
              {q.options.map((option, i) => (
                <label
                  key={i}
                  htmlFor={`${q.id}-${i}`}
                  className={`answer-option ${checked && i === q.correctIndex ? "is-correct" : ""} ${checked && i === answers[q.id] && !isCorrect ? "is-incorrect" : ""}`}
                >
                  <RadioGroupItem value={String(i)} id={`${q.id}-${i}`} />
                  <span className="option-letter">
                    {String.fromCharCode(65 + i)}
                  </span>
                  <RichText>{option[locale]}</RichText>
                  {checked && i === q.correctIndex ? (
                    <Check className="answer-status" />
                  ) : checked && i === answers[q.id] && !isCorrect ? (
                    <X className="answer-status" />
                  ) : null}
                </label>
              ))}
            </RadioGroup>
            {!checked ? (
              <div className="check-row">
                <Button onClick={check} disabled={selected === ""}>
                  {text(locale, "Periksa jawaban", "Check answer")}
                </Button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="practice-explanation"
              >
                <div
                  className={`feedback-heading ${isCorrect ? "correct" : "incorrect"}`}
                >
                  {isCorrect ? <Check size={18} /> : <X size={18} />}
                  <h3>
                    {isCorrect
                      ? text(
                          locale,
                          "Jawabanmu tepat",
                          "Your answer is correct",
                        )
                      : text(
                          locale,
                          `Jawaban yang tepat: ${String.fromCharCode(65 + q.correctIndex)}`,
                          `Correct answer: ${String.fromCharCode(65 + q.correctIndex)}`,
                        )}
                  </h3>
                </div>
                <RichText>{q.explanation[locale]}</RichText>
                {q.math && <Formula>{q.math}</Formula>}
                {q.sourceQuestionId && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onOpenQuestion(q.sourceQuestionId!)}
                  >
                    {text(
                      locale,
                      "Pelajari soal terkait",
                      "Study the related question",
                    )}
                  </Button>
                )}
              </motion.div>
            )}
            <div className="practice-navigation">
              <Button
                variant="ghost"
                size="sm"
                disabled={index === 0}
                onClick={() => move(index - 1)}
              >
                <ChevronLeft />
                {text(locale, "Sebelumnya", "Previous")}
              </Button>
              <div className="question-dots">
                {filtered.map((item, i) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => move(i)}
                    aria-label={`${text(locale, "Soal", "Question")} ${i + 1}`}
                    aria-current={i === index ? "step" : undefined}
                    className={`${i === index ? "active" : ""} ${answers[item.id] !== undefined ? "answered" : ""}`}
                  />
                ))}
              </div>
              <Button
                variant="ghost"
                size="sm"
                disabled={index >= filtered.length - 1}
                onClick={() => move(index + 1)}
              >
                {text(locale, "Berikutnya", "Next")}
                <ChevronRight />
              </Button>
            </div>
          </motion.article>
        </AnimatePresence>
      )}
      {totalAnswered === practice.length && (
        <div className="practice-summary">
          <h2>{text(locale, "Latihan selesai", "Practice complete")}</h2>
          <p>
            {text(
              locale,
              `${correct} dari 30 jawaban tepat. Tinjau penjelasan pada soal yang ingin kamu pelajari lagi.`,
              `${correct} of 30 answers correct. Revisit any explanation you want to study again.`,
            )}
          </p>
        </div>
      )}
      <Dialog open={resetOpen} onOpenChange={setResetOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {text(locale, "Mulai latihan dari awal?", "Restart practice?")}
            </DialogTitle>
            <DialogDescription>
              {text(
                locale,
                "Ini menghapus jawaban latihan yang tersimpan di perangkat ini. Penanda dan kemajuan pembahasan tetap ada.",
                "This clears practice answers on this device. Bookmarks and solution progress stay saved.",
              )}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setResetOpen(false)}>
              {text(locale, "Batal", "Cancel")}
            </Button>
            <Button
              onClick={() => {
                setAnswers({});
                move(0);
                setReviewErrors(false);
                setResetOpen(false);
              }}
            >
              {text(locale, "Mulai lagi", "Start again")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
