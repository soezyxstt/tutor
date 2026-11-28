import { useLanguage } from '../i18n/language-provider';
import { languageHref } from '../i18n/language';
import * as React from 'react';
import {
  ArrowLeft,
  BookOpen,
  Check,
  ChevronRight,
  Component,
  FileCheck2,
  PenLine,
  Search,
} from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import {
  CollapsibleMotion,
  Progress,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  TUTOR_EASE,
  cn,
} from '@tutor/ui';
import type {
  CourseConfig,
  LessonItem,
  LessonKind,
  ProblemItem,
} from '../types/course';
import { useTutorStore } from '../store/tutor-store';

export type SidebarFilter = 'all' | LessonKind | 'bookmarked';
export type SidebarGroupMode = 'chapter' | 'exam';

const SECTION_ORDER: {
  kind: LessonKind;
  label: string;
  icon: typeof BookOpen;
}[] = [
  { kind: 'material', label: 'Materi', icon: BookOpen },
  { kind: 'practice', label: 'Latihan', icon: PenLine },
  { kind: 'problem', label: 'Pembahasan', icon: FileCheck2 },
];

interface ExamGroup {
  key: string;
  term: string;
  year: number;
  label: string;
  entries: {
    moduleCode?: string;
    moduleTitle: string;
    item: ProblemItem;
  }[];
}

export function TutorSidebarContent({
  course,
  activeItemId,
  activeView,
  onSelectItem,
  onSelectShowcase,
  onOpenSearch,
}: {
  course: CourseConfig;
  activeItemId: string | null;
  activeView: 'lesson' | 'showcase';
  onSelectItem: (item: LessonItem) => void;
  onSelectShowcase?: () => void;
  onOpenSearch?: () => void;
}) {
  const completedIds = useTutorStore((s) => s.completedIds);
  const { t, preference } = useLanguage();
  const bookmarkedIds = useTutorStore((s) => s.bookmarkedIds);

  const [groupMode, setGroupMode] = React.useState<SidebarGroupMode>('chapter');
  const [filter, setFilter] = React.useState<SidebarFilter>('all');
  const [selectedYear, setSelectedYear] = React.useState<string>('all');
  const [openGroups, setOpenGroups] = React.useState<Record<string, boolean>>(
    () => Object.fromEntries(course.modules.map((m) => [m.id, true]))
  );

  const allItems = React.useMemo(
    () => course.modules.flatMap((m) => m.items),
    [course.modules]
  );

  const counts = React.useMemo(() => {
    const map = { material: 0, practice: 0, problem: 0, bookmarked: 0 };
    for (const item of allItems) {
      map[item.kind] += 1;
      if (bookmarkedIds[`${course.slug}:${item.id}`]) map.bookmarked += 1;
    }
    return map;
  }, [allItems, bookmarkedIds, course.slug]);

  const examGroups = React.useMemo<ExamGroup[]>(() => {
    const map = new Map<string, ExamGroup>();
    for (const mod of course.modules) {
      for (const item of mod.items) {
        if (item.kind !== 'problem' || !item.exam) continue;
        const { term, year } = item.exam;
        const key = `${year}-${term}`;
        let group = map.get(key);
        if (!group) {
          group = {
            key,
            term,
            year,
            label: `${term} ${year}`,
            entries: [],
          };
          map.set(key, group);
        }
        group.entries.push({
          moduleCode: mod.code,
          moduleTitle: mod.title,
          item,
        });
      }
    }
    const list = Array.from(map.values()).sort((a, b) => {
      if (b.year !== a.year) return b.year - a.year;
      return a.term.localeCompare(b.term);
    });
    for (const g of list) {
      g.entries.sort(
        (a, b) => (a.item.exam?.number ?? 99) - (b.item.exam?.number ?? 99)
      );
    }
    return list;
  }, [course.modules]);

  const examYears = React.useMemo(
    () =>
      Array.from(new Set(examGroups.map((g) => g.year))).sort((a, b) => b - a),
    [examGroups]
  );

  const hasExams = examGroups.length > 0;

  const completedCount = React.useMemo(
    () =>
      allItems.filter((item) => !!completedIds[`${course.slug}:${item.id}`])
        .length,
    [allItems, completedIds, course.slug]
  );

  const progressPct =
    allItems.length > 0 ? Math.round((completedCount / allItems.length) * 100) : 0;

  const toggleGroup = (key: string) => {
    setOpenGroups((prev) => ({
      ...prev,
      [key]: !(prev[key] ?? true),
    }));
  };

  return (
    <div className="flex h-full flex-col bg-surface-subtle/55 text-foreground">
      {/* Course identity + hairline progress */}
      <div className="space-y-2.5 border-b border-border px-4 py-3.5">
        <div>
          <div className="font-mono text-[11px] font-medium tracking-wider text-primary uppercase">
            {course.code}
            {course.semester ? ` · ${course.semester}` : ''}
          </div>
          <div className="mt-0.5 text-[14.5px] font-semibold tracking-tight text-foreground">
            {course.title}
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-between text-[11px] text-muted-foreground">
            <span>{t("Progres belajar", "Study progress")}</span>
            <span className="font-mono">
              {completedCount}/{allItems.length}
            </span>
          </div>
          <Progress value={progressPct} />
        </div>
      </div>

      {/* Mode Switcher: Per Bab vs Per Ujian (smooth sliding underline) */}
      {hasExams && (
        <div
          role="tablist"
          aria-label={t("Mode pengelompokan", "Group lessons")}
          className="grid grid-cols-2 border-b border-border px-4"
        >
          {(
            [
              { id: 'chapter', label: t('Per Bab', 'By chapter') },
              { id: 'exam', label: t('Per Ujian', 'By exam') },
            ] as const
          ).map((tab) => {
            const active = groupMode === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => setGroupMode(tab.id)}
                className={cn(
                  'relative cursor-pointer py-2 text-center text-xs font-medium transition-colors outline-none',
                  active
                    ? 'text-foreground'
                    : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {tab.label}
                {active && (
                  <motion.span
                    layoutId="sidebar-group-underline"
                    transition={{ duration: 0.22, ease: TUTOR_EASE }}
                    className="absolute right-1 -bottom-px left-1 h-0.5 bg-primary"
                  />
                )}
              </button>
            );
          })}
        </div>
      )}

      {/* Quick Search + Context-aware Borderless Filter */}
      <div className="space-y-2 border-b border-border px-4 py-2.5">
        {onOpenSearch && (
          <button
            type="button"
            onClick={onOpenSearch}
            className="flex w-full cursor-pointer items-center justify-between gap-2 border-b border-border/80 pb-1.5 text-xs text-muted-foreground transition-colors hover:border-primary hover:text-foreground"
          >
            <span className="inline-flex items-center gap-2">
              <Search className="size-3.5" />
              <span>{t("Cari cepat…", "Quick search…")}</span>
            </span>
            <kbd className="font-mono text-[10px] opacity-70">⌘K</kbd>
          </button>
        )}

        {groupMode === 'chapter' ? (
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">{t("Tampilkan", "Show")}</span>
            <Select
              value={filter}
              onValueChange={(v) => setFilter(v as SidebarFilter)}
            >
              <SelectTrigger aria-label={t("Filter kategori", "Filter by type")} className="h-6 px-1 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="all">{t('Semua', 'All')} ({allItems.length})</SelectItem>
                <SelectItem value="material">{t('Materi', 'Lessons')} ({counts.material})</SelectItem>
                <SelectItem value="practice">{t('Latihan', 'Practice')} ({counts.practice})</SelectItem>
                <SelectItem value="problem">{t('Pembahasan', 'Solutions')} ({counts.problem})</SelectItem>
                <SelectItem value="bookmarked">{t('Tersimpan', 'Saved')} ({counts.bookmarked})</SelectItem>
              </SelectContent>
            </Select>
          </div>
        ) : (
          <div className="flex items-center justify-between">
            <span className="text-[11px] text-muted-foreground">{t("Tahun ujian", "Exam year")}</span>
            <Select value={selectedYear} onValueChange={setSelectedYear}>
              <SelectTrigger aria-label={t("Filter tahun ujian", "Filter by exam year")} className="h-6 px-1 text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent align="end">
                <SelectItem value="all">{t("Semua tahun", "All years")}</SelectItem>
                {examYears.map((y) => (
                  <SelectItem key={y} value={String(y)}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>

      {/* Animated Navigation Tree */}
      <ScrollArea className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          {groupMode === 'chapter' ? (
            <motion.nav
              key="mode-chapter"
              aria-label={t("Daftar per bab", "Lessons by chapter")}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: TUTOR_EASE }}
              className="space-y-5 px-3 py-3.5"
            >
              {course.modules.map((mod) => {
                const visibleItems = mod.items.filter((item) => {
                  const key = `${course.slug}:${item.id}`;
                  if (filter === 'bookmarked') return !!bookmarkedIds[key];
                  if (filter !== 'all' && item.kind !== filter) return false;
                  return true;
                });

                if (visibleItems.length === 0) return null;
                const isOpen = openGroups[mod.id] ?? true;

                return (
                  <div key={mod.id} className="space-y-2">
                    <button
                      type="button"
                      onClick={() => toggleGroup(mod.id)}
                      aria-expanded={isOpen}
                      className="flex w-full cursor-pointer items-center gap-1.5 px-1 py-0.5 text-left text-xs font-semibold text-foreground/90 transition-colors hover:text-primary"
                    >
                      <ChevronRight
                        className={cn(
                          'size-3 shrink-0 text-muted-foreground transition-transform duration-200',
                          isOpen && 'rotate-90'
                        )}
                      />
                      <span className="truncate">
                        {mod.code ? `${mod.code} · ` : ''}
                        {mod.title}
                      </span>
                    </button>

                    <CollapsibleMotion open={isOpen}>
                      <div className="space-y-3 pl-2">
                        {SECTION_ORDER.map(({ kind, label, icon: SectionIcon }) => {
                          const groupItems = visibleItems.filter(
                            (i) => i.kind === kind
                          );
                          if (groupItems.length === 0) return null;

                          return (
                            <div key={kind} className="space-y-1">
                              <div className="flex items-center gap-1.5 px-2 text-[11px] font-medium text-muted-foreground">
                                <SectionIcon className="size-3 opacity-75" />
                                <span>{t(label, kind === 'material' ? 'Lessons' : kind === 'practice' ? 'Practice' : 'Solutions')}</span>
                              </div>

                              <ul className="space-y-0.5">
                                {groupItems.map((item) => {
                                  const key = `${course.slug}:${item.id}`;
                                  const isActive =
                                    activeView === 'lesson' &&
                                    activeItemId === item.id;
                                  const isDone = !!completedIds[key];

                                  return (
                                    <li key={item.id}>
                                      <button
                                        type="button"
                                        onClick={() => onSelectItem(item)}
                                        className={cn(
                                          'group flex w-full cursor-pointer items-start justify-between gap-2 border-l-2 py-1.5 pr-2 pl-2.5 text-left text-[13px] leading-snug transition-colors outline-none',
                                          isActive
                                            ? 'border-primary font-medium text-foreground'
                                            : 'border-border/50 text-muted-foreground hover:border-border hover:text-foreground'
                                        )}
                                      >
                                        <span className="min-w-0 flex-1 break-words">
                                          {item.title}
                                        </span>
                                        {isDone && (
                                          <Check className="mt-0.5 size-3.5 shrink-0 text-success" />
                                        )}
                                      </button>
                                    </li>
                                  );
                                })}
                              </ul>
                            </div>
                          );
                        })}
                      </div>
                    </CollapsibleMotion>
                  </div>
                );
              })}
            </motion.nav>
          ) : (
            <motion.nav
              key={`mode-exam-${selectedYear}`}
              aria-label={t("Daftar per ujian", "Problems by exam")}
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.18, ease: TUTOR_EASE }}
              className="space-y-4 px-3 py-3.5"
            >
              {examGroups
                .filter(
                  (g) => selectedYear === 'all' || String(g.year) === selectedYear
                )
                .map((group) => {
                  const isOpen = openGroups[group.key] ?? true;
                  return (
                    <div key={group.key} className="space-y-1.5">
                      <button
                        type="button"
                        onClick={() => toggleGroup(group.key)}
                        aria-expanded={isOpen}
                        className="flex w-full cursor-pointer items-center justify-between gap-2 px-1 py-0.5 text-left text-xs font-semibold text-foreground/90 transition-colors hover:text-primary"
                      >
                        <span className="flex min-w-0 items-center gap-1.5">
                          <ChevronRight
                            className={cn(
                              'size-3 shrink-0 text-muted-foreground transition-transform duration-200',
                              isOpen && 'rotate-90'
                            )}
                          />
                          <span className="truncate">{group.label}</span>
                        </span>
                        <span className="font-mono text-[11px] font-normal text-muted-foreground">
                          {group.entries.length} {t('soal', 'problems')}
                        </span>
                      </button>

                      <CollapsibleMotion open={isOpen}>
                        <ul className="space-y-0.5 pl-2">
                          {group.entries.map(({ moduleCode, moduleTitle, item }) => {
                            const key = `${course.slug}:${item.id}`;
                            const isActive =
                              activeView === 'lesson' && activeItemId === item.id;
                            const isDone = !!completedIds[key];

                            return (
                              <li key={item.id}>
                                <button
                                  type="button"
                                  onClick={() => onSelectItem(item)}
                                  className={cn(
                                    'group flex w-full cursor-pointer items-start gap-2 border-l-2 py-1.5 pr-2 pl-2.5 text-left transition-colors outline-none',
                                    isActive
                                      ? 'border-primary text-foreground'
                                      : 'border-border/50 text-muted-foreground hover:border-border hover:text-foreground'
                                  )}
                                >
                                  {item.exam?.number !== undefined && (
                                    <span className="mt-0.5 shrink-0 font-mono text-[11px] text-primary">
                                      {String(item.exam.number).padStart(2, '0')}
                                    </span>
                                  )}
                                  <span className="min-w-0 flex-1">
                                    <span
                                      className={cn(
                                        'block text-[13px] leading-snug break-words',
                                        isActive && 'font-medium'
                                      )}
                                    >
                                      {item.title}
                                    </span>
                                    <span className="mt-0.5 block truncate text-[11px] text-muted-foreground/80">
                                      {moduleCode
                                        ? `${moduleCode} · ${moduleTitle}`
                                        : moduleTitle}
                                    </span>
                                  </span>
                                  {isDone && (
                                    <Check className="mt-0.5 size-3.5 shrink-0 text-success" />
                                  )}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      </CollapsibleMotion>
                    </div>
                  );
                })}
            </motion.nav>
          )}
        </AnimatePresence>
      </ScrollArea>

      <div className="border-t border-border px-4 py-2.5">
        <a href={languageHref('https://tutor.adihnursyam.com', preference)} className="inline-flex items-center gap-2 text-xs text-muted-foreground transition-colors hover:text-foreground">
          <ArrowLeft className="size-3.5" />
          {t('Semua mata kuliah', 'All courses')}
        </a>
      </div>

      {/* Optional Core UI Showcase footer link */}
      {course.enableShowcase && onSelectShowcase && (
        <div className="border-t border-border px-3 py-2.5">
          <button
            type="button"
            onClick={onSelectShowcase}
            className={cn(
              'flex w-full cursor-pointer items-center gap-2 border-l-2 py-1 pl-2.5 text-left text-xs transition-colors',
              activeView === 'showcase'
                ? 'border-primary font-medium text-foreground'
                : 'border-transparent text-muted-foreground hover:text-foreground'
            )}
          >
            <Component className="size-3.5" />
            <span>{t("Komponen Core UI", "Core UI components")}</span>
          </button>
        </div>
      )}
    </div>
  );
}
