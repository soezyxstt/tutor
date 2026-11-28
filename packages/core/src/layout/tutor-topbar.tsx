import {
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  Search,
  SlidersHorizontal,
} from 'lucide-react';
import {
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Separator,
  Switch,
  ThemeToggle,
  ToggleGroup,
  ToggleGroupItem,
} from '@tutor/ui';
import { useTutorStore, type ReadingFontSize } from '../store/tutor-store';

export function TutorTopbar({
  courseTitle,
  sectionLabel,
  onOpenMobileMenu,
  onOpenSearch,
}: {
  courseTitle: string;
  sectionLabel: string;
  onOpenMobileMenu: () => void;
  onOpenSearch: () => void;
}) {
  const sidebarCollapsed = useTutorStore((s) => s.sidebarCollapsed);
  const toggleSidebar = useTutorStore((s) => s.toggleSidebar);
  const fontSize = useTutorStore((s) => s.fontSize);
  const setFontSize = useTutorStore((s) => s.setFontSize);
  const focusMode = useTutorStore((s) => s.focusMode);
  const setFocusMode = useTutorStore((s) => s.setFocusMode);
  const autoShowHints = useTutorStore((s) => s.autoShowHints);
  const setAutoShowHints = useTutorStore((s) => s.setAutoShowHints);

  return (
    <header className="sticky top-0 z-30 flex h-11 shrink-0 items-center justify-between gap-2 border-b border-border bg-background/90 px-3 backdrop-blur-sm sm:h-12 sm:px-4">
      <div className="flex min-w-0 items-center gap-1.5 sm:gap-2">
        <Button
          variant="icon"
          size="icon"
          aria-label="Buka navigasi"
          onClick={onOpenMobileMenu}
          className="lg:hidden"
        >
          <Menu className="size-4" />
        </Button>

        <Button
          variant="icon"
          size="icon"
          aria-label={sidebarCollapsed ? 'Buka sidebar' : 'Tutup sidebar'}
          title={sidebarCollapsed ? 'Buka sidebar' : 'Tutup sidebar'}
          onClick={toggleSidebar}
          className="hidden lg:inline-flex"
        >
          {sidebarCollapsed ? (
            <PanelLeftOpen className="size-4" />
          ) : (
            <PanelLeftClose className="size-4" />
          )}
        </Button>

        <nav
          aria-label="Lokasi halaman"
          className="flex min-w-0 items-center gap-1.5 text-xs text-muted-foreground"
        >
          <span className="hidden truncate font-medium text-foreground sm:inline">
            {courseTitle}
          </span>
          <span className="hidden sm:inline" aria-hidden="true">
            /
          </span>
          <span className="truncate font-medium text-foreground sm:font-normal sm:text-muted-foreground">
            {sectionLabel}
          </span>
        </nav>
      </div>

      <div className="flex shrink-0 items-center gap-1 sm:gap-1.5">
        <Button
          variant="icon"
          size="icon"
          aria-label="Cari materi atau soal"
          title="Cari (Ctrl+K)"
          onClick={onOpenSearch}
        >
          <Search className="size-4" />
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="icon"
              size="icon"
              aria-label="Preferensi bacaan"
              title="Preferensi bacaan"
            >
              <SlidersHorizontal className="size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="space-y-3">
            <div className="text-[11px] font-semibold tracking-wider text-muted-foreground uppercase">
              Preferensi Belajar
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-foreground">Ukuran teks</span>
              <ToggleGroup
                type="single"
                value={fontSize}
                onValueChange={(v) => {
                  if (v) setFontSize(v as ReadingFontSize);
                }}
              >
                <ToggleGroupItem value="sm">S</ToggleGroupItem>
                <ToggleGroupItem value="md">M</ToggleGroupItem>
                <ToggleGroupItem value="lg">L</ToggleGroupItem>
              </ToggleGroup>
            </div>

            <Separator />

            <label className="flex cursor-pointer items-center justify-between gap-3">
              <span className="text-xs text-foreground">Mode fokus</span>
              <Switch checked={focusMode} onCheckedChange={setFocusMode} />
            </label>

            <label className="flex cursor-pointer items-center justify-between gap-3">
              <span className="text-xs text-foreground">Buka petunjuk otomatis</span>
              <Switch
                checked={autoShowHints}
                onCheckedChange={setAutoShowHints}
              />
            </label>
          </PopoverContent>
        </Popover>

        <ThemeToggle />
      </div>
    </header>
  );
}
