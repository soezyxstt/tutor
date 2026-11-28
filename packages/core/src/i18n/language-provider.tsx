import * as React from 'react';
import {
  detectLocale,
  isLanguagePreference,
  languageCookie,
  LANGUAGE_STORAGE_KEY,
  readLanguageCookie,
  resolveLanguagePreference,
  type LanguagePreference,
  type Locale,
} from './language';

type LanguageContextValue = {
  locale: Locale;
  preference: LanguagePreference;
  setPreference: (preference: LanguagePreference) => void;
  t: (id: string, en: string) => string;
};

const LanguageContext = React.createContext<LanguageContextValue | null>(null);

function systemLocale(): Locale {
  return typeof navigator === 'undefined' ? 'en' : detectLocale(navigator.languages.length ? navigator.languages : [navigator.language]);
}

function storedPreference(): string | null {
  try { return localStorage.getItem(LANGUAGE_STORAGE_KEY); } catch { return null; }
}

function initialPreference(): LanguagePreference {
  if (typeof window === 'undefined') return 'system';
  return resolveLanguagePreference({ search: window.location.search, cookie: document.cookie, stored: storedPreference() });
}

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [preference, updatePreference] = React.useState<LanguagePreference>(initialPreference);
  const [clientLocale, setClientLocale] = React.useState<Locale>(systemLocale);
  const locale = preference === 'system' ? clientLocale : preference;

  const setPreference = React.useCallback((next: LanguagePreference) => {
    if (!isLanguagePreference(next)) return;
    updatePreference(next);
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      if (next === 'system') url.searchParams.delete('lang');
      else url.searchParams.set('lang', next);
      window.history.replaceState(window.history.state, '', url);
    }
  }, []);

  React.useEffect(() => {
    document.documentElement.lang = locale;
    try { localStorage.setItem(LANGUAGE_STORAGE_KEY, preference); } catch { /* Private browsing may deny storage. */ }
    try { document.cookie = languageCookie(preference, window.location.hostname, window.location.protocol === 'https:'); } catch { /* Language still works without cookies. */ }
  }, [locale, preference]);

  React.useEffect(() => {
    const updateSystem = () => setClientLocale(systemLocale());
    const syncPreference = () => {
      updateSystem();
      const shared = readLanguageCookie(document.cookie) ?? storedPreference();
      if (isLanguagePreference(shared)) setPreference(shared);
    };
    const onStorage = (event: StorageEvent) => {
      if (event.key === LANGUAGE_STORAGE_KEY && isLanguagePreference(event.newValue)) setPreference(event.newValue);
    };
    const onVisibility = () => { if (document.visibilityState === 'visible') syncPreference(); };
    window.addEventListener('languagechange', updateSystem);
    window.addEventListener('focus', syncPreference);
    window.addEventListener('storage', onStorage);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.removeEventListener('languagechange', updateSystem);
      window.removeEventListener('focus', syncPreference);
      window.removeEventListener('storage', onStorage);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [setPreference]);

  const t = React.useCallback((id: string, en: string) => locale === 'id' ? id : en, [locale]);
  const value = React.useMemo(() => ({ locale, preference, setPreference, t }), [locale, preference, setPreference, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage(): LanguageContextValue {
  const context = React.useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within LanguageProvider');
  return context;
}
