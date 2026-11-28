import type { Locale } from '../simulations/types';
export const text = (locale: Locale, id: string, en: string) => locale === 'id' ? id : en;
export const num = (value: number, locale: Locale, digits = 3) => new Intl.NumberFormat(locale === 'id' ? 'id-ID' : 'en-US', { maximumFractionDigits: digits }).format(value);
