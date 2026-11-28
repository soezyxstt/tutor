import type { ReactNode } from 'react';
import { BookOpen, ChevronRight } from 'lucide-react';
import { ThemeToggle } from '@tutor/ui';
import { LanguageSwitcher, languageHref, useLanguage } from '../i18n';

export function CatalogShell({
  children,
  section = 'catalog',
  actions,
}: {
  children: ReactNode;
  section?: 'catalog' | 'admin';
  actions?: ReactNode;
}) {
  const { t, preference } = useLanguage();
  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#main-content" className="sr-only z-50 rounded bg-background p-3 text-sm focus:not-sr-only focus:fixed focus:top-2 focus:left-2">
        {t('Ke isi halaman', 'Skip to content')}
      </a>
      <header className="border-b border-border bg-background/90 backdrop-blur-sm">
        <div className="mx-auto flex h-14 w-full max-w-5xl items-center justify-between gap-3 px-5 sm:px-8">
          <nav aria-label={t('Lokasi halaman', 'Page location')} className="flex min-w-0 items-center gap-2.5">
            <a href={languageHref('/', preference)} className="inline-flex items-center gap-2 rounded text-sm font-semibold tracking-tight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
              <BookOpen className="size-[18px] text-primary" aria-hidden="true" />
              Tutor
            </a>
            <ChevronRight className="size-3 text-muted-foreground/60" aria-hidden="true" />
            <span className="truncate text-xs text-muted-foreground" aria-current="page">
              {section === 'admin' ? 'Admin' : t('Katalog', 'Catalog')}
            </span>
          </nav>
          <div className="flex shrink-0 items-center gap-1 sm:gap-2">
            {actions}
            <LanguageSwitcher compact />
            <ThemeToggle labels={{ toggle: t('Ubah tema', 'Change theme'), light: t('Terang', 'Light'), dark: t('Gelap', 'Dark'), system: t('Sistem', 'System') }} />
          </div>
        </div>
      </header>
      <main id="main-content" className="mx-auto w-full max-w-5xl flex-1 px-5 pt-8 pb-12 sm:px-8 sm:pt-11">
        {children}
      </main>
      <footer className="border-t border-border">
        <div className="mx-auto flex w-full max-w-5xl flex-wrap items-center justify-between gap-3 px-5 py-5 text-xs text-muted-foreground sm:px-8">
          <span>{t('Tutor · Belajar satu langkah demi satu langkah.', 'Tutor · Learn one step at a time.')}</span>
          <a href={languageHref(section === 'admin' ? '/' : '/admin', preference)} className="rounded underline-offset-4 hover:text-foreground hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring">
            {section === 'admin' ? t('Kembali ke katalog', 'Back to catalog') : 'Admin'}
          </a>
        </div>
      </footer>
    </div>
  );
}
