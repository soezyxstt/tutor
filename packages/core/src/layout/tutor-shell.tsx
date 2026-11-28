import { useLanguage } from '../i18n/language-provider';
import * as React from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import {
  PageTransition,
  Sheet,
  SheetContent,
  SheetTitle,
  TUTOR_EASE,
  cn,
} from '@tutor/ui';
import type { CourseConfig, LessonItem } from '../types/course';
import { useTutorStore, type ReadingFontSize } from '../store/tutor-store';
import { TutorSidebarContent } from './tutor-sidebar';
import { TutorTopbar } from './tutor-topbar';
import { QuickSearchDialog } from './quick-search-dialog';
import { SelectionAiPopover } from '../ai/selection-ai-popover';

const fontSizeScale: Record<ReadingFontSize, string> = {
  sm: '[&_.tutor-prose]:text-[14.5px] [&_.tutor-math]:text-[14.5px]',
  md: '[&_.tutor-prose]:text-[15.5px] [&_.tutor-math]:text-[15.5px]',
  lg: '[&_.tutor-prose]:text-[17px] [&_.tutor-math]:text-[17px]',
};

function getPrimaryAnchorId(
  courseSlug: string,
  item: LessonItem | null
): string | null {
  if (!item) return null;
  const itemKey = `${courseSlug}:${item.id}`;
  if (item.kind === 'problem') return `${itemKey}:statement`;
  if (item.kind === 'material') return `${itemKey}:material`;
  return `${itemKey}:q:${item.questions[0]?.id ?? 'main'}`;
}

export function TutorShell({
  course,
  activeItem,
  activeView,
  sectionLabel,
  prevItem,
  nextItem,
  onSelectItem,
  onSelectShowcase,
  children,
}: {
  course: CourseConfig;
  activeItem: LessonItem | null;
  activeView: 'lesson' | 'showcase';
  sectionLabel: string;
  prevItem: LessonItem | null;
  nextItem: LessonItem | null;
  onSelectItem: (item: LessonItem) => void;
  onSelectShowcase?: () => void;
  children: React.ReactNode;
}) {
  const sidebarCollapsed = useTutorStore((s) => s.sidebarCollapsed);
  const { t } = useLanguage();
  const fontSize = useTutorStore((s) => s.fontSize);

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [searchOpen, setSearchOpen] = React.useState(false);
  const mainRef = React.useRef<HTMLElement | null>(null);

  const primaryAnchorId =
    activeView === 'lesson' ? getPrimaryAnchorId(course.slug, activeItem) : null;

  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const handleSelectItem = (item: LessonItem) => {
    onSelectItem(item);
    setMobileOpen(false);
    window.scrollTo({ top: 0 });
  };

  const handleSelectShowcase = () => {
    onSelectShowcase?.();
    setMobileOpen(false);
    window.scrollTo({ top: 0 });
  };

  return (
    <div className="flex min-h-dvh w-full bg-background text-foreground">
      {/* Desktop Collapsible Sidebar — smooth motion width/opacity without text reflow */}
      <motion.aside
        aria-label={t("Navigasi mata kuliah", "Course navigation")}
        initial={false}
        animate={{
          width: sidebarCollapsed ? 0 : 256,
          opacity: sidebarCollapsed ? 0 : 1,
        }}
        transition={{ duration: 0.24, ease: TUTOR_EASE }}
        className={cn(
          'hidden shrink-0 overflow-hidden lg:sticky lg:top-0 lg:block lg:h-dvh',
          !sidebarCollapsed && 'border-r border-border'
        )}
      >
        <div className="h-full w-64">
          <TutorSidebarContent
            course={course}
            activeItemId={activeItem?.id ?? null}
            activeView={activeView}
            onSelectItem={handleSelectItem}
            onSelectShowcase={handleSelectShowcase}
            onOpenSearch={() => setSearchOpen(true)}
          />
        </div>
      </motion.aside>

      {/* Mobile Sidebar Sheet */}
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetContent side="left" className="p-0" showClose={false} closeLabel={t('Tutup panel', 'Close panel')}>
          <SheetTitle className="sr-only">{course.title}</SheetTitle>
          <TutorSidebarContent
            course={course}
            activeItemId={activeItem?.id ?? null}
            activeView={activeView}
            onSelectItem={handleSelectItem}
            onSelectShowcase={handleSelectShowcase}
            onOpenSearch={() => {
              setMobileOpen(false);
              setSearchOpen(true);
            }}
          />
        </SheetContent>
      </Sheet>

      {/* Main reading surface */}
      <div className="flex min-w-0 flex-1 flex-col">
        <TutorTopbar
          courseTitle={course.title}
          sectionLabel={sectionLabel}
          onOpenMobileMenu={() => setMobileOpen(true)}
          onOpenSearch={() => setSearchOpen(true)}
        />

        <main
          ref={mainRef}
          className={cn(
            'mx-auto w-full max-w-[74ch] flex-1 px-4 pt-6 pb-12 sm:px-8 sm:pt-8',
            fontSizeScale[fontSize]
          )}
        >
          <PageTransition
            transitionKey={
              activeView === 'showcase'
                ? 'showcase'
                : activeItem?.id ?? 'empty'
            }
          >
            {children}
          </PageTransition>

          {/* Minimal prev / next navigation for lessons */}
          {activeView === 'lesson' && (prevItem || nextItem) && (
            <nav
              aria-label={t("Navigasi halaman", "Page navigation")}
              className="mt-4 flex items-center justify-between gap-4 border-t border-border pt-5 text-[13px]"
            >
              {prevItem ? (
                <button
                  type="button"
                  onClick={() => handleSelectItem(prevItem)}
                  className="group flex min-w-0 cursor-pointer items-center gap-2 text-left text-muted-foreground transition-colors hover:text-foreground"
                >
                  <ArrowLeft className="size-3.5 shrink-0 transition-transform group-hover:-translate-x-0.5" />
                  <span className="truncate">{prevItem.title}</span>
                </button>
              ) : (
                <span />
              )}

              {nextItem ? (
                <button
                  type="button"
                  onClick={() => handleSelectItem(nextItem)}
                  className="group flex min-w-0 cursor-pointer items-center gap-2 text-right text-muted-foreground transition-colors hover:text-foreground"
                >
                  <span className="truncate">{nextItem.title}</span>
                  <ArrowRight className="size-3.5 shrink-0 transition-transform group-hover:translate-x-0.5" />
                </button>
              ) : (
                <span />
              )}
            </nav>
          )}
        </main>
      </div>

      {/* Highlight-to-Ask Inline AI Popover */}
      <SelectionAiPopover
        containerRef={mainRef}
        fallbackAnchorId={primaryAnchorId}
      />

      {/* Quick Search Dialog (Ctrl+K) */}
      <QuickSearchDialog
        open={searchOpen}
        onOpenChange={setSearchOpen}
        course={course}
        onSelectItem={handleSelectItem}
      />
    </div>
  );
}
