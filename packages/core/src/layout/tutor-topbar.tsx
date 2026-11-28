import { LanguageSwitcher } from '../i18n/language-switcher';
import { useLanguage } from '../i18n/language-provider';
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
  const { t } = useLanguage();
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
          aria-label={t("Buka navigasi", "Open navigation")}
          onClick={onOpenMobileMenu}
          className="lg:hidden"
        >
          <Menu className="size-4" />
        </Button>

        <Button
          variant="icon"
          size="icon"
          aria-label={sidebarCollapsed ? t('Buka sidebar', 'Open sidebar') : t('Tutup sidebar', 'Close sidebar')}
          title={sidebarCollapsed ? t('Buka sidebar', 'Open sidebar') : t('Tutup sidebar', 'Close sidebar')}
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
          aria-label={t("Lokasi halaman", "Page location")}
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
          aria-label={t("Cari materi atau soal", "Search lessons or problems")}
          title={t("Cari (Ctrl+K)", "Search (Ctrl+K)")}
          onClick={onOpenSearch}
        >
          <Search className="size-4" />
        </Button>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="icon"
              size="icon"
              aria-label={t("Preferensi bacaan", "Reading preferences")}
              title={t("Preferensi bacaan", "Reading preferences")}
            >
              <SlidersHorizontal className="size-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent align="end" className="space-y-3">
            <div className="text-[11px] font-semibold text-muted-foreground">
              {t("Preferensi Belajar", "Reading preferences")}
            </div>

            <div className="flex items-center justify-between gap-2">
              <span className="text-xs text-foreground">{t("Ukuran teks", "Text size")}</span>
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
              <span className="text-xs text-foreground">{t("Mode fokus", "Focus mode")}</span>
              <Switch checked={focusMode} onCheckedChange={setFocusMode} />
            </label>

            <label className="flex cursor-pointer items-center justify-between gap-3">
              <span className="text-xs text-foreground">{t("Buka petunjuk otomatis", "Show hints automatically")}</span>
              <Switch
                checked={autoShowHints}
                onCheckedChange={setAutoShowHints}
              />
            </label>
          </PopoverContent>
        </Popover>

        <LanguageSwitcher compact />
        <ThemeToggle labels={{ toggle: t('Ubah tema', 'Change theme'), light: t('Terang', 'Light'), dark: t('Gelap', 'Dark'), system: t('Sistem', 'System') }} />
      </div>
    </header>
  );
}
