import type { CourseConfig } from '@tutor/core';

type SavedProgress = {
  completedIds: Record<string, boolean>;
  bookmarkedIds: Record<string, boolean>;
  practiceAnswers: Record<string, string>;
  revealedSteps: Record<string, number[]>;
};

type StorageReader = Pick<Storage, 'getItem'>;

function read(storage: StorageReader, key: string): unknown {
  try { return JSON.parse(storage.getItem(key) ?? 'null'); } catch { return null; }
}

/** Import only recognized IDs; existing shared progress always wins. */
export function readLegacyIpeProgress(storage: StorageReader, course: CourseConfig, current: SavedProgress): SavedProgress {
  const items = course.modules.flatMap((module) => module.items);
  const problems = new Map(items.filter((item) => item.kind === 'problem').map((item) => [item.id, item]));
  const completedIds = { ...current.completedIds };
  const bookmarkedIds = { ...current.bookmarkedIds };
  for (const [key, target] of [['ipe:completed:v1', completedIds], ['ipe:bookmarks:v1', bookmarkedIds]] as const) {
    const value = read(storage, key);
    if (Array.isArray(value)) for (const id of value) {
      const itemKey = `ipe:${id}`;
      if (typeof id === 'string' && problems.has(id) && !Object.hasOwn(target, itemKey)) target[itemKey] = true;
    }
  }
  const practiceAnswers = { ...current.practiceAnswers };
  const oldAnswers = read(storage, 'ipe:practice:concepts:v2');
  if (oldAnswers && typeof oldAnswers === 'object' && !Array.isArray(oldAnswers)) {
    for (const item of items) {
      if (item.kind !== 'practice') continue;
      for (const question of item.questions) {
        const selected = (oldAnswers as Record<string, unknown>)[question.id];
        const option = typeof selected === 'number' && Number.isInteger(selected) ? question.options[selected] : undefined;
        const key = `ipe:${item.id}:${question.id}`;
        if (option && !Object.hasOwn(practiceAnswers, key)) practiceAnswers[key] = option.id;
      }
    }
  }
  const revealedSteps = { ...current.revealedSteps };
  const oldSteps = read(storage, 'ipe:steps:expanded:v2');
  if (oldSteps && typeof oldSteps === 'object' && !Array.isArray(oldSteps)) {
    for (const [id, count] of Object.entries(oldSteps)) {
      const problem = problems.get(id);
      const key = `ipe:${id}`;
      if (problem && typeof count === 'number' && Number.isInteger(count) && count >= 0 && !Object.hasOwn(revealedSteps, key)) {
        revealedSteps[key] = Array.from({ length: Math.min(count + 1, problem.steps.length) }, (_, index) => index);
      }
    }
  }
  return { completedIds, bookmarkedIds, practiceAnswers, revealedSteps };
}

export function migrateLegacyIpeUrl(url: URL, course: CourseConfig): URL {
  const next = new URL(url);
  if (next.searchParams.has('item')) return next;
  const items = course.modules.flatMap((module) => module.items);
  const legacyId = next.hash.startsWith('#soal/') ? next.hash.slice(6) : '';
  const item = legacyId ? items.find((candidate) => candidate.id === legacyId)
    : next.hash === '#latihan' ? items.find((candidate) => candidate.kind === 'practice') : undefined;
  if (item) { next.searchParams.set('item', item.slug); next.hash = ''; }
  return next;
}

export function migrateIpeBrowserState(course: CourseConfig, store: { getState: () => SavedProgress; setState: (state: Partial<SavedProgress>) => void }) {
  if (typeof window === 'undefined') return;
  const url = migrateLegacyIpeUrl(new URL(window.location.href), course);
  if (url.href !== window.location.href) window.history.replaceState(window.history.state, '', url);
  try {
    const marker = 'ipe:migrated-to-tutor:v1';
    if (localStorage.getItem(marker) === 'true') return;
    store.setState(readLegacyIpeProgress(localStorage, course, store.getState()));
    const oldLocale = read(localStorage, 'ipe:locale');
    if ((oldLocale === 'id' || oldLocale === 'en') && !localStorage.getItem('tutor-language') && !document.cookie.split(';').some((part) => part.trim().startsWith('tutor_language=')) && !url.searchParams.has('lang')) {
      localStorage.setItem('tutor-language', oldLocale);
    }
    localStorage.setItem(marker, 'true');
  } catch { /* Reading and studying still work if the browser blocks storage. */ }
}
