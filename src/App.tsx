import { useEffect, useState } from "react";
import {
  BookOpen,
  Check,
  Search,
  Bookmark,
  Library,
  ExternalLink,
  X,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { MotionConfig } from "motion/react";
import { questions, reference, archiveUrl } from "@/content";
import type { Locale } from "@/content/types";
import { usePersisted } from "@/hooks/use-persisted";
import { text, examName } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Progress } from "@/components/ui/progress";
import { Input } from "@/components/ui/input";
import { IconButton, TextSelect } from "@/components/controls";
import { Study } from "@/components/study";
import { Practice } from "@/components/practice";
function Logo() {
  return (
    <svg viewBox="0 0 32 32" className="brand-symbol" aria-hidden="true">
      <path
        d="M8 25V16M16 25V9M24 25V13"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <circle cx="24" cy="6" r="1.7" fill="#9bb581" />
    </svg>
  );
}
export default function App() {
  const [locale, setLocale] = usePersisted<Locale>("ipe:locale", "id");
  const [completed, setCompleted] = usePersisted<string[]>(
    "ipe:completed:v1",
    [],
  );
  const [bookmarks, setBookmarks] = usePersisted<string[]>(
    "ipe:bookmarks:v1",
    [],
  );
  const [progress, setProgress] = usePersisted<Record<string, number>>(
    "ipe:steps:v1",
    {},
  );
  const initialId = window.location.hash.startsWith("#soal/")
    ? window.location.hash.slice(6)
    : questions[0].id;
  const [selected, setSelected] = useState(
    questions.find((q) => q.id === initialId)?.id ?? questions[0].id,
  );
  const q = questions.find((q) => q.id === selected) ?? questions[0];
  const [year, setYear] = useState(String(q.year)),
    [exam, setExam] = useState(q.exam),
    [view, setView] = useState(
      window.location.hash === "#latihan" ? "practice" : "study",
    );
  const [search, setSearch] = useState(""),
    [onlySaved, setOnlySaved] = useState(false),
    [menuOpen, setMenuOpen] = useState(false),
    [sourcesOpen, setSourcesOpen] = useState(false),
    [searchOpen, setSearchOpen] = useState(false),
    [railHidden, setRailHidden] = useState(false);
  const filtered = questions.filter(
    (item) =>
      String(item.year) === year &&
      item.exam === exam &&
      (!onlySaved || bookmarks.includes(item.id)),
  );
  const searchResults = questions.filter((item) =>
    `${item.title.id} ${item.title.en} ${item.year} ${item.topic}`
      .toLowerCase()
      .includes(search.toLowerCase()),
  );
  function select(id: string, closeMenu = true) {
    const next = questions.find((item) => item.id === id);
    if (!next) return;
    setSelected(id);
    setYear(String(next.year));
    setExam(next.exam);
    setView("study");
    if (closeMenu) setMenuOpen(false);
    setSearchOpen(false);
    setSearch("");
    window.history.replaceState(null, "", `#soal/${id}`);
    window.scrollTo({ top: 0, behavior: "instant" });
  }
  function filter(nextYear: string, nextExam: "uts2" | "uas") {
    setYear(nextYear);
    setExam(nextExam);
    setSearch("");
    const first = questions.find(
      (item) => String(item.year) === nextYear && item.exam === nextExam,
    );
    if (first) select(first.id, false);
  }
  useEffect(() => {
    document.documentElement.lang = locale;
    document.title =
      view === "study"
        ? `${q.title[locale]} · IPE Study`
        : text(locale, "Latihan · IPE Study", "Practice · IPE Study");
  }, [locale, q, view]);
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setSearchOpen((s) => !s);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);
  useEffect(() => {
    const handler = () => {
      if (window.location.hash === "#latihan") setView("practice");
      else if (window.location.hash.startsWith("#soal/")) {
        const id = window.location.hash.slice(6);
        const next = questions.find((item) => item.id === id);
        if (next) {
          setSelected(id);
          setYear(String(next.year));
          setExam(next.exam);
          setView("study");
        }
      }
    };
    window.addEventListener("hashchange", handler);
    return () => window.removeEventListener("hashchange", handler);
  }, []);
  const count = questions.filter((item) => completed.includes(item.id)).length;
  const sidebar = (
    <div className="sidebar-inner">
      <div className="sidebar-filter">
        <TextSelect
          label={text(locale, "Tahun arsip", "Archive year")}
          value={year}
          onChange={(v) => filter(v, exam)}
          options={["2025", "2024", "2023"].map((y) => ({
            value: y,
            label: y,
          }))}
        />
        <IconButton
          label={text(
            locale,
            onlySaved ? "Tampilkan semua soal" : "Hanya soal bertanda",
            onlySaved ? "Show all questions" : "Only bookmarked questions",
          )}
          pressed={onlySaved}
          onClick={() => setOnlySaved(!onlySaved)}
        >
          <Bookmark fill={onlySaved ? "currentColor" : "none"} />
        </IconButton>
      </div>
      <Tabs
        value={exam}
        onValueChange={(v) => filter(year, v as "uts2" | "uas")}
        className="exam-tabs"
      >
        <TabsList variant="line">
          <TabsTrigger value="uts2">{examName("uts2", locale)}</TabsTrigger>
          <TabsTrigger value="uas">{examName("uas", locale)}</TabsTrigger>
        </TabsList>
      </Tabs>
      <div className="question-list">
        <div className="list-count">
          {filtered.length} {text(locale, "soal", "questions")}
        </div>
        {filtered.length === 0 ? (
          <p className="list-empty">
            {text(
              locale,
              "Belum ada soal bertanda pada ujian ini.",
              "No bookmarked questions in this exam.",
            )}
          </p>
        ) : (
          filtered.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => select(item.id)}
              className={`question-link ${selected === item.id ? "active" : ""}`}
              aria-current={selected === item.id ? "page" : undefined}
            >
              <span className="list-number">
                {completed.includes(item.id) ? (
                  <Check size={15} />
                ) : (
                  String(item.number).padStart(2, "0")
                )}
              </span>
              <span>{item.title[locale]}</span>
              {bookmarks.includes(item.id) && (
                <Bookmark className="list-bookmark" size={12} />
              )}
            </button>
          ))
        )}
      </div>
      <div className="sidebar-bottom">
        <div>
          <span>{text(locale, "Kemajuan belajar", "Study progress")}</span>
          <strong>
            {count}/{questions.length}
          </strong>
        </div>
        <Progress
          value={(count / questions.length) * 100}
          aria-label={text(locale, "Kemajuan pembahasan", "Solution progress")}
        />
        <p>
          {text(locale, "Tersimpan di perangkat ini", "Saved on this device")}
        </p>
      </div>
    </div>
  );
  return (
    <MotionConfig reducedMotion="user">
      <TooltipProvider delayDuration={250}>
        <Tabs
          value={view}
          onValueChange={(v) => {
            setView(v);
            window.history.replaceState(
              null,
              "",
              v === "practice" ? "#latihan" : `#soal/${q.id}`,
            );
          }}
          className="app-root"
        >
          <a
            href="#main-content"
            className="skip-link"
            onClick={(e) => {
              const main = document.getElementById("main-content");
              if (main) {
                e.preventDefault();
                main.focus();
                main.scrollIntoView({ block: "start" });
              }
            }}
          >
            {text(locale, "Langsung ke isi", "Skip to content")}
          </a>
          <header className="site-header">
            <a
              href="#"
              className="brand"
              onClick={(e) => {
                e.preventDefault();
                select(questions[0].id);
              }}
              aria-label="IPE Study"
            >
              <Logo />
              <span>
                ipe<span className="brand-dot">.</span>
                <small>study</small>
              </span>
            </a>
            <TabsList variant="line" className="main-nav">
              <TabsTrigger value="study">
                <BookOpen />
                {text(locale, "Pembahasan", "Solutions")}
              </TabsTrigger>
              <TabsTrigger value="practice">
                <Check />
                {text(locale, "Latihan", "Practice")}
                <span className="nav-count">30</span>
              </TabsTrigger>
            </TabsList>
            <div className="header-tools">
              <IconButton
                label={text(
                  locale,
                  "Cari soal (Ctrl K)",
                  "Search questions (Ctrl K)",
                )}
                onClick={() => {
                  setSearch("");
                  setSearchOpen(true);
                }}
              >
                <Search />
              </IconButton>
              <IconButton
                label={text(locale, "Sumber belajar", "Learning sources")}
                onClick={() => setSourcesOpen(true)}
              >
                <Library />
              </IconButton>
              <TextSelect
                value={locale}
                onChange={(v) => setLocale(v as Locale)}
                label={text(locale, "Bahasa", "Language")}
                options={[
                  { value: "id", label: "ID" },
                  { value: "en", label: "EN" },
                ]}
              />
            </div>
          </header>
          <TabsContent value="study" className="study-page">
            <div className="course-intro">
              <div>
                <h2>
                  {text(
                    locale,
                    "Belajar dari setiap pengukuran.",
                    "Understand every measurement.",
                  )}
                </h2>
                <p>
                  {text(
                    locale,
                    "Instrumentasi, Pengukuran & Eksperimen",
                    "Instrumentation, Measurement & Experiment",
                  )}
                  <span>MS3105</span>
                </p>
              </div>
              <div className="archive-summary">
                <strong>
                  2023<span>–</span>2025
                </strong>
                <p>
                  {questions.length} {text(locale, "soal", "questions")} · 6{" "}
                  {text(locale, "ujian", "exams")}
                </p>
              </div>
            </div>
            <div className={`study-layout ${railHidden ? "rail-hidden" : ""}`}>
              <aside className="desktop-sidebar">{sidebar}</aside>
              <main id="main-content" tabIndex={-1} className="main-content">
                <div className="rail-toggle">
                  <IconButton
                    label={text(
                      locale,
                      railHidden ? "Tampilkan daftar" : "Sembunyikan daftar",
                      railHidden ? "Show question list" : "Hide question list",
                    )}
                    onClick={() => setRailHidden(!railHidden)}
                  >
                    {railHidden ? <PanelLeftOpen /> : <PanelLeftClose />}
                  </IconButton>
                </div>
                <Study
                  q={q}
                  locale={locale}
                  completed={completed.includes(q.id)}
                  bookmarked={bookmarks.includes(q.id)}
                  maxStep={progress[q.id] ?? 0}
                  onOpenList={() => setMenuOpen(true)}
                  onBookmark={() =>
                    setBookmarks((prev) =>
                      prev.includes(q.id)
                        ? prev.filter((id) => id !== q.id)
                        : [...prev, q.id],
                    )
                  }
                  onComplete={() =>
                    setCompleted((prev) =>
                      prev.includes(q.id) ? prev : [...prev, q.id],
                    )
                  }
                  onStep={(s) =>
                    setProgress((prev) => ({
                      ...prev,
                      [q.id]: Math.max(prev[q.id] ?? 0, s),
                    }))
                  }
                  onNext={() => {
                    const i = questions.findIndex((item) => item.id === q.id);
                    select(questions[(i + 1) % questions.length].id);
                  }}
                />
              </main>
            </div>
          </TabsContent>
          <TabsContent value="practice">
            <Practice locale={locale} onOpenQuestion={select} />
          </TabsContent>
          <footer className="site-footer">
            <span>ipe.study</span>
            <span>
              {text(
                locale,
                "Dibuat untuk belajar, bukan kunci jawaban resmi.",
                "Made for learning. Not an official answer key.",
              )}
            </span>
            <button onClick={() => setSourcesOpen(true)}>
              {text(locale, "Sumber & catatan", "Sources & notes")}
            </button>
          </footer>
          <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
            <SheetContent side="left" className="mobile-sidebar">
              <SheetHeader>
                <SheetTitle>
                  {text(locale, "Pilih soal", "Choose a question")}
                </SheetTitle>
                <SheetDescription>UTS 2 & UAS · 2023–2025</SheetDescription>
              </SheetHeader>
              {sidebar}
            </SheetContent>
          </Sheet>
          <Dialog open={searchOpen} onOpenChange={setSearchOpen}>
            <DialogContent className="search-dialog">
              <DialogHeader>
                <DialogTitle>
                  {text(locale, "Cari soal", "Search questions")}
                </DialogTitle>
                <DialogDescription>
                  {text(
                    locale,
                    "Cari topik, tahun, atau nama sensor.",
                    "Find a topic, year, or sensor.",
                  )}
                </DialogDescription>
              </DialogHeader>
              <div className="search-input">
                <Search size={18} />
                <Input
                  autoFocus
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder={text(
                    locale,
                    "Contoh: termokopel, 2024…",
                    "Try thermocouple, 2024…",
                  )}
                  aria-label={text(locale, "Kata pencarian", "Search terms")}
                />
                {search && (
                  <IconButton
                    label={text(locale, "Hapus pencarian", "Clear search")}
                    onClick={() => setSearch("")}
                  >
                    <X />
                  </IconButton>
                )}
              </div>
              <div className="search-results">
                {searchResults.length === 0 ? (
                  <p>
                    {text(
                      locale,
                      "Tidak ada soal yang cocok. Coba kata lain.",
                      "No matching questions. Try another term.",
                    )}
                  </p>
                ) : (
                  searchResults.map((item) => (
                    <button key={item.id} onClick={() => select(item.id)}>
                      <span>{item.title[locale]}</span>
                      <small>
                        {examName(item.exam, locale)} {item.year} ·{" "}
                        {item.number}
                      </small>
                    </button>
                  ))
                )}
              </div>
            </DialogContent>
          </Dialog>
          <Dialog open={sourcesOpen} onOpenChange={setSourcesOpen}>
            <DialogContent className="sources-panel">
              <DialogHeader>
                <DialogTitle>
                  {text(locale, "Sumber belajar", "Learning sources")}
                </DialogTitle>
                <DialogDescription>
                  {text(
                    locale,
                    "Naskah asli, materi utama, dan batas pembahasan.",
                    "Original papers, core notes, and solution scope.",
                  )}
                </DialogDescription>
              </DialogHeader>
              <div className="source-scroll">
                <div className="source-links">
                  <a href={archiveUrl} target="_blank" rel="noreferrer">
                    {text(
                      locale,
                      "Arsip enam ujian 2023–2025",
                      "Six exam papers, 2023–2025",
                    )}
                    <ExternalLink size={15} />
                  </a>
                  <a href={reference.url} target="_blank" rel="noreferrer">
                    {reference.name}
                    <ExternalLink size={15} />
                  </a>
                  <a
                    href="https://its90.nist.gov/"
                    target="_blank"
                    rel="noreferrer"
                  >
                    NIST · ITS-90 {text(locale, "termokopel", "thermocouples")}
                    <ExternalLink size={15} />
                  </a>
                  <a
                    href="https://www.ni.com/en/shop/data-acquisition/sensor-fundamentals/measuring-strain-with-strain-gages.html"
                    target="_blank"
                    rel="noreferrer"
                  >
                    NI ·{" "}
                    {text(
                      locale,
                      "Strain gauge & jembatan ukur",
                      "Strain gauges & measurement bridges",
                    )}
                    <ExternalLink size={15} />
                  </a>
                </div>
                <div className="source-notes">
                  <p>
                    {text(
                      locale,
                      "Tahun mengikuti nama folder arsip. Tanggal ujian pada naskah bisa masuk tahun berikutnya.",
                      "Years follow archive folders. A paper’s printed examination date may fall in the following year.",
                    )}
                  </p>
                  <p>
                    {text(
                      locale,
                      "Teks Indonesia menerjemahkan soal. Tombol “Soal asli” memuat teks sumber dan tautan gambar. Semua subsoal masuk dalam pembahasan.",
                      "Indonesian text translates the questions. “Original” includes the source text and a link to the figures. Solutions cover every subpart.",
                    )}
                  </p>
                  <p>
                    {text(
                      locale,
                      "Asumsi, salah tulis, dan data yang kurang dijelaskan pada tiap soal. Visual memakai model yang dinyatakan; bentuk alat bersifat skematis. Perubahan kontrol membantu menguji hubungan dan tidak mengubah jawaban soal asli.",
                      "Each question states assumptions, misprints, and missing data. Visuals use the stated models; instrument geometry is schematic. Controls explore relationships without changing the original solution.",
                    )}
                  </p>
                  <p>
                    {text(
                      locale,
                      "30 soal latihan merupakan soal baru untuk belajar mandiri, bukan salinan soal ujian. Kemajuan hanya tersimpan di peramban ini.",
                      "The 30 practice questions are original study exercises, not copied examination questions. Progress is stored only in this browser.",
                    )}
                  </p>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </Tabs>
      </TooltipProvider>
    </MotionConfig>
  );
}
