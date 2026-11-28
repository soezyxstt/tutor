export type CatalogLocale = 'id' | 'en';
export type CatalogFilter = 'all' | 'materials' | 'practices' | 'problems';

export interface CatalogCourse {
  slug: string;
  code: string;
  url: string;
  sourceLanguage: CatalogLocale;
  status: 'published' | 'showcase';
  order: number;
  counts: { modules: number; materials: number; practices: number; problems: number };
  locales: Record<CatalogLocale, {
    title: string;
    subtitle: string;
    modules: { id: string; code?: string; title: string }[];
    status: 'source' | 'complete' | 'partial' | 'unavailable';
    translatedItems: number;
    totalItems: number;
  }>;
  exams: { term: string; year: number; problems: number }[];
}

export interface CatalogManifest {
  schemaVersion: number;
  courses: CatalogCourse[];
}
