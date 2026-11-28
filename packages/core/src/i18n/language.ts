export type Locale = 'id' | 'en';
export type LanguagePreference = Locale | 'system';

export const LANGUAGE_STORAGE_KEY = 'tutor-language';
export const LANGUAGE_COOKIE_NAME = 'tutor_language';

export function isLanguagePreference(value: unknown): value is LanguagePreference {
  return value === 'id' || value === 'en' || value === 'system';
}

export function detectLocale(languages: readonly string[] = []): Locale {
  // Match the client's first preferred language, not its geographic location.
  const primary = languages[0]?.toLowerCase() ?? '';
  return primary === 'id' || primary.startsWith('id-') ? 'id' : 'en';
}

export function readLanguageCookie(cookie: string): LanguagePreference | undefined {
  const value = cookie.split(';').map((part) => part.trim())
    .find((part) => part.startsWith(`${LANGUAGE_COOKIE_NAME}=`))
    ?.slice(LANGUAGE_COOKIE_NAME.length + 1);
  return isLanguagePreference(value) ? value : undefined;
}

export function resolveLanguagePreference({ search = '', cookie = '', stored }: {
  search?: string;
  cookie?: string;
  stored?: string | null;
}): LanguagePreference {
  const query = new URLSearchParams(search).get('lang');
  if (isLanguagePreference(query)) return query;
  const shared = readLanguageCookie(cookie);
  if (shared) return shared;
  return isLanguagePreference(stored) ? stored : 'system';
}

export function languageCookie(preference: LanguagePreference, hostname: string, secure: boolean): string {
  const sharedDomain = hostname === 'tutor.adihnursyam.com' || hostname.endsWith('.tutor.adihnursyam.com');
  return `${LANGUAGE_COOKIE_NAME}=${preference}; Path=/; Max-Age=31536000; SameSite=Lax${sharedDomain ? '; Domain=tutor.adihnursyam.com' : ''}${secure ? '; Secure' : ''}`;
}

/** Carry the selected preference across course subdomains and shared links. */
export function languageHref(href: string, preference: LanguagePreference): string {
  const url = new URL(href, 'https://tutor.adihnursyam.com');
  url.searchParams.set('lang', preference);
  return /^https?:\/\//.test(href) ? url.href : `${url.pathname}${url.search}${url.hash}`;
}
