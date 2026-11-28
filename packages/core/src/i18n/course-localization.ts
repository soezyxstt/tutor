import type { CourseConfig, LessonItem, LessonTranslation } from '../types/course';
import type { Locale } from './language';

const invariantKeys = new Set([
  'id', 'key', 'slug', 'kind', 'type', 'mode', 'code', 'domain', 'difficulty',
  'correctOptionId', 'misconceptionTag', 'latex', 'unit',
]);

type MergeState = { missing: boolean; translated: boolean };

/** Only visit source keys. This cannot add/reorder lessons, change answer keys, or alter numerical data. */
function mergeText(source: unknown, overlay: unknown, state: MergeState, key = ''): unknown {
  if (invariantKeys.has(key)) return source;
  if (typeof source === 'string') {
    if (typeof overlay === 'string' && (overlay.trim() || !source.trim())) {
      state.translated = true;
      return overlay;
    }
    if (source.trim()) state.missing = true;
    return source;
  }
  if (Array.isArray(source)) {
    const translatedArray = Array.isArray(overlay) ? overlay : [];
    return source.map((entry, index) => {
      const stableKey = entry && typeof entry === 'object'
        ? 'id' in entry ? 'id' : 'key' in entry ? 'key' : null
        : null;
      const candidate = stableKey
        ? translatedArray.find((next) => next && typeof next === 'object' && next[stableKey] === entry[stableKey])
        : translatedArray[index];
      return mergeText(entry, candidate, state);
    });
  }
  if (source && typeof source === 'object') {
    const values = overlay && typeof overlay === 'object' ? overlay as Record<string, unknown> : {};
    return Object.fromEntries(Object.entries(source).map(([name, value]) => [name, mergeText(value, values[name], state, name)]));
  }
  return source;
}

export function localizeLesson(item: LessonItem, translation?: LessonTranslation) {
  const state: MergeState = { missing: false, translated: false };
  const localized = mergeText(item, translation, state) as LessonItem;
  return { item: localized, complete: !state.missing, partial: state.translated && state.missing };
}

export function resolveCourseLocale(source: CourseConfig, locale: Locale) {
  const sourceLanguage = source.sourceLanguage ?? 'id';
  const translatedItemIds: string[] = [];
  const missingItemIds: string[] = [];
  const partiallyTranslatedItemIds: string[] = [];
  if (sourceLanguage === locale) {
    return { course: source, sourceLanguage, translatedItemIds: source.modules.flatMap((module) => module.items.map((item) => item.id)), missingItemIds, partiallyTranslatedItemIds };
  }
  const translation = source.translations?.[locale];
  const course: CourseConfig = {
    ...source,
    title: translation?.title ?? source.title,
    subtitle: translation?.subtitle ?? source.subtitle,
    semester: translation?.semester ?? source.semester,
    modules: source.modules.map((module) => ({
      ...module,
      title: translation?.modules?.[module.id]?.title ?? module.title,
      items: module.items.map((item) => {
        const result = localizeLesson(item, translation?.modules?.[module.id]?.items?.[item.id]);
        if (result.complete) translatedItemIds.push(item.id);
        else missingItemIds.push(item.id);
        if (result.partial) partiallyTranslatedItemIds.push(item.id);
        return result.item;
      }),
    })),
  };
  return { course, sourceLanguage, translatedItemIds, missingItemIds, partiallyTranslatedItemIds };
}
