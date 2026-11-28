import * as React from 'react';
import { BookOpen, FileCheck2, PenLine, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  ScrollArea,
} from '@tutor/ui';
import type { CourseConfig, LessonItem, LessonKind } from '../types/course';

const kindMeta: Record<LessonKind, { label: string; icon: typeof BookOpen }> = {
  material: { label: 'Materi', icon: BookOpen },
  practice: { label: 'Latihan', icon: PenLine },
  problem: { label: 'Pembahasan', icon: FileCheck2 },
};

export function QuickSearchDialog({
  open,
  onOpenChange,
  course,
  onSelectItem,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  course: CourseConfig;
  onSelectItem: (item: LessonItem) => void;
}) {
  const [query, setQuery] = React.useState('');

  React.useEffect(() => {
    if (!open) setQuery('');
  }, [open]);

  const entries = React.useMemo(
    () =>
      course.modules.flatMap((mod) =>
        mod.items.map((item) => ({
          moduleLabel: mod.code ? `${mod.code} · ${mod.title}` : mod.title,
          item,
        }))
      ),
    [course.modules]
  );

  const normalized = query.trim().toLowerCase();
  const results = React.useMemo(() => {
    if (!normalized) return entries;
    return entries.filter(
      ({ moduleLabel, item }) =>
        item.title.toLowerCase().includes(normalized) ||
        moduleLabel.toLowerCase().includes(normalized) ||
        item.tags?.some((t) => t.toLowerCase().includes(normalized))
    );
  }, [entries, normalized]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="p-0">
        <DialogTitle className="sr-only">Cari Materi, Latihan, atau Pembahasan</DialogTitle>
        <DialogDescription className="sr-only">
          Ketik kata kunci untuk berpindah cepat antar halaman di {course.title}.
        </DialogDescription>

        <div className="flex items-center gap-2.5 border-b border-border px-4 py-3 pr-10">
          <Search className="size-4 shrink-0 text-muted-foreground" />
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Cari materi, latihan, atau pembahasan soal…"
            className="min-w-0 flex-1 border-0 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground/70"
          />
        </div>

        <ScrollArea className="max-h-72">
          <div className="divide-y divide-border/60 p-2">
            {results.length === 0 ? (
              <div className="py-8 text-center text-xs text-muted-foreground">
                Tidak ada hasil untuk &ldquo;{query}&rdquo;.
              </div>
            ) : (
              results.map(({ moduleLabel, item }) => {
                const meta = kindMeta[item.kind];
                const Icon = meta.icon;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      onSelectItem(item);
                      onOpenChange(false);
                    }}
                    className="flex w-full cursor-pointer items-center justify-between gap-3 rounded-sm px-2.5 py-2 text-left transition-colors hover:bg-surface-subtle"
                  >
                    <div className="flex min-w-0 items-center gap-2.5">
                      <Icon className="size-3.5 shrink-0 text-muted-foreground" />
                      <div className="min-w-0">
                        <div className="truncate text-[13px] font-medium text-foreground">
                          {item.title}
                        </div>
                        <div className="truncate text-[11px] text-muted-foreground">
                          {moduleLabel}
                        </div>
                      </div>
                    </div>
                    <span className="shrink-0 text-[11px] text-muted-foreground">
                      {meta.label}
                    </span>
                  </button>
                );
              })
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
