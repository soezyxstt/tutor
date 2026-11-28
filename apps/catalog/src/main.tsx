import { StrictMode, Suspense, lazy } from 'react';
import { createRoot } from 'react-dom/client';
import '@fontsource/plus-jakarta-sans/400.css';
import '@fontsource/plus-jakarta-sans/500.css';
import '@fontsource/plus-jakarta-sans/600.css';
import '@fontsource/jetbrains-mono/400.css';
import './styles.css';
import { LanguageProvider } from '@tutor/core/catalog';
import { MotionProvider, ThemeProvider, TooltipProvider } from '@tutor/ui';
import { CatalogApp } from './catalog-app';

const AdminPage = lazy(() => import('./admin'));
const isAdmin = /^\/admin(?:\/|$)/.test(window.location.pathname);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LanguageProvider>
      <ThemeProvider defaultTheme="system">
        <MotionProvider>
          <TooltipProvider delayDuration={200}>
            <Suspense fallback={<div className="mx-auto h-40 max-w-5xl animate-pulse bg-surface-subtle" aria-busy="true" />}>
              {isAdmin ? <AdminPage /> : <CatalogApp />}
            </Suspense>
          </TooltipProvider>
        </MotionProvider>
      </ThemeProvider>
    </LanguageProvider>
  </StrictMode>
);
