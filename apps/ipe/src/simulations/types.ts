export type Locale = 'id' | 'en';
export type Localized = { id: string; en: string };
export interface VisualSpec {
  kind: string;
  params?: Record<string, number | string | number[]>;
  caption: Localized;
}
