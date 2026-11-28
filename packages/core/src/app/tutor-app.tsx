import * as React from 'react';
import { MotionProvider, ThemeProvider, TooltipProvider } from '@tutor/ui';
import type { CourseConfig, LessonItem } from '../types/course';
import { TutorShell } from '../layout/tutor-shell';
import { ProblemView } from '../content/problem-view';
import { MaterialView } from '../content/material-view';
import { PracticeView } from '../content/practice-view';
import { CoreShowcaseView } from '../showcase/core-showcase-view';

interface FlatEntry {
  moduleLabel: string;
  item: LessonItem;
}

function getInitialRoute(
  entries: FlatEntry[],
  enableShowcase?: boolean
): { view: 'lesson' | 'showcase'; itemId: string | null } {
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const viewParam = params.get('view');
    if (viewParam === 'components' && enableShowcase) {
      return { view: 'showcase', itemId: entries[0]?.item.id ?? null };
    }
    const itemSlug = params.get('item');
    if (itemSlug) {
      const found = entries.find(
        (e) => e.item.slug === itemSlug || e.item.id === itemSlug
      );
      if (found) {
        return { view: 'lesson', itemId: found.item.id };
      }
    }
  }
  return { view: 'lesson', itemId: entries[0]?.item.id ?? null };
}

export function TutorApp({ course }: { course: CourseConfig }) {
  const entries = React.useMemo<FlatEntry[]>(
    () =>
      course.modules.flatMap((mod) =>
        mod.items.map((item) => ({
          moduleLabel: mod.code ? `${mod.code} · ${mod.title}` : mod.title,
          item,
        }))
      ),
    [course.modules]
  );

  const initial = React.useMemo(
    () => getInitialRoute(entries, course.enableShowcase),
    [entries, course.enableShowcase]
  );

  const [activeView, setActiveView] = React.useState<'lesson' | 'showcase'>(
    initial.view
  );
  const [activeItemId, setActiveItemId] = React.useState<string | null>(
    initial.itemId
  );

  const activeIndex = entries.findIndex((e) => e.item.id === activeItemId);
  const activeEntry =
    activeIndex >= 0 ? entries[activeIndex] : entries[0] ?? null;

  const prevItem = activeIndex > 0 ? entries[activeIndex - 1].item : null;
  const nextItem =
    activeIndex >= 0 && activeIndex < entries.length - 1
      ? entries[activeIndex + 1].item
      : null;

  const syncUrl = React.useCallback(
    (nextView: 'lesson' | 'showcase', item?: LessonItem) => {
      if (typeof window === 'undefined') return;
      const url = new URL(window.location.href);
      if (nextView === 'showcase') {
        url.searchParams.set('view', 'components');
        url.searchParams.delete('item');
      } else if (item) {
        url.searchParams.delete('view');
        url.searchParams.set('item', item.slug);
      }
      window.history.replaceState({}, '', url.toString());
    },
    []
  );

  const handleSelectItem = React.useCallback(
    (item: LessonItem) => {
      setActiveView('lesson');
      setActiveItemId(item.id);
      syncUrl('lesson', item);
    },
    [syncUrl]
  );

  const handleSelectShowcase = React.useCallback(() => {
    setActiveView('showcase');
    syncUrl('showcase');
  }, [syncUrl]);

  React.useEffect(() => {
    if (typeof document === 'undefined') return;
    if (activeView === 'showcase') {
      document.title = `Komponen Core UI · ${course.title}`;
    } else if (activeEntry) {
      document.title = `${activeEntry.item.title} · ${course.title}`;
    } else {
      document.title = course.title;
    }
  }, [activeEntry, activeView, course.title]);

  const sectionLabel =
    activeView === 'showcase'
      ? 'Komponen Core UI'
      : activeEntry?.moduleLabel ?? course.subtitle;

  return (
    <ThemeProvider defaultTheme="light">
      <MotionProvider>
        <TooltipProvider delayDuration={200}>
          <TutorShell
            course={course}
            activeItem={activeEntry?.item ?? null}
            activeView={activeView}
            sectionLabel={sectionLabel}
            prevItem={prevItem}
            nextItem={nextItem}
            onSelectItem={handleSelectItem}
            onSelectShowcase={
              course.enableShowcase ? handleSelectShowcase : undefined
            }
          >
            {activeView === 'showcase' ? (
              <CoreShowcaseView />
            ) : activeEntry ? (
              activeEntry.item.kind === 'problem' ? (
                <ProblemView
                  courseSlug={course.slug}
                  courseTitle={course.title}
                  problem={activeEntry.item}
                />
              ) : activeEntry.item.kind === 'practice' ? (
                <PracticeView
                  courseSlug={course.slug}
                  courseTitle={course.title}
                  practice={activeEntry.item}
                />
              ) : (
                <MaterialView
                  courseSlug={course.slug}
                  courseTitle={course.title}
                  material={activeEntry.item}
                />
              )
            ) : (
              <div className="py-12 text-sm text-muted-foreground">
                Belum ada materi atau soal pada mata kuliah ini.
              </div>
            )}
          </TutorShell>
        </TooltipProvider>
      </MotionProvider>
    </ThemeProvider>
  );
}
