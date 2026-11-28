// Keep catalog and admin pages independent from the lesson and simulation engines.
export { CatalogShell } from './catalog-shell';
export { LanguageProvider, LanguageSwitcher, useLanguage, languageHref } from '../i18n';
export type { Locale, LanguagePreference } from '../i18n';
