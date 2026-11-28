import { readdir, mkdir, readFile, writeFile, mkdtemp, rm } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { resolve, dirname, join } from 'node:path';
import { pathToFileURL, fileURLToPath } from 'node:url';

const repositoryRoot = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const supportedLocales = ['id', 'en'];

/** Course links are destinations, never scripts, credential URLs, or arbitrary paths. */
export function courseUrl(domain) {
  if (typeof domain !== 'string' || !domain.trim()) throw new Error('Course domain is missing.');
  const value = domain.trim();
  const url = new URL(value.includes('://') ? value : `https://${value}`);
  if (
    url.protocol !== 'https:' || url.username || url.password || url.port ||
    url.search || url.hash || (url.pathname !== '/' && url.pathname !== '') ||
    !url.hostname.includes('.')
  ) {
    throw new Error(`Course domain must be an HTTPS hostname: ${domain}`);
  }
  return url.origin;
}

export function summarizeCourse(course, localize) {
  if (course.catalog?.listed === false || course.catalog?.status === 'draft') return null;
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(course.slug ?? '')) throw new Error('Invalid course slug.');
  const items = (course.modules ?? []).flatMap((module) => module.items ?? []);
  if (items.length === 0) return null;
  for (const field of ['title', 'subtitle', 'code']) {
    if (typeof course[field] !== 'string') throw new Error(`${course.slug}: invalid ${field}.`);
  }
  const counts = { modules: course.modules.length, materials: 0, practices: 0, problems: 0 };
  const exams = new Map();
  for (const item of items) {
    const countKey = { material: 'materials', practice: 'practices', problem: 'problems' }[item.kind];
    if (!countKey) throw new Error(`${course.slug}: unsupported lesson kind ${item.kind}.`);
    counts[countKey]++;
    if (item.kind === 'problem' && item.exam) {
      const { term, year } = item.exam;
      const key = `${term}\u0000${year}`;
      const entry = exams.get(key) ?? { term, year, problems: 0 };
      entry.problems++;
      exams.set(key, entry);
    }
  }

  const locales = Object.fromEntries(supportedLocales.map((locale) => {
    const result = localize(course, locale);
    const isSource = locale === result.sourceLanguage;
    const translated = isSource ? items.length : result.translatedItemIds.length;
    const partial = result.partiallyTranslatedItemIds?.length ?? 0;
    const status = isSource ? 'source'
      : result.missingItemIds.length === 0 && partial === 0 ? 'complete'
      : translated > 0 || partial > 0 ? 'partial' : 'unavailable';
    return [locale, {
      title: result.course.title,
      subtitle: result.course.subtitle,
      modules: result.course.modules.map(({ id, code, title }) => ({ id, ...(code ? { code } : {}), title })),
      status,
      translatedItems: translated,
      totalItems: items.length,
    }];
  }));

  return {
    slug: course.slug,
    code: course.code,
    url: courseUrl(course.domain),
    sourceLanguage: course.sourceLanguage ?? 'id',
    status: course.catalog?.status ?? (course.enableShowcase ? 'showcase' : 'published'),
    order: Number.isFinite(course.catalog?.order) ? course.catalog.order : 0,
    counts,
    locales,
    exams: [...exams.values()].sort((a, b) => b.year - a.year || a.term.localeCompare(b.term)),
  };
}

async function loadCourse(file, tempDirectory, folderSlug, localizerPath) {
  const { build } = await import('esbuild');
  const outputFile = join(tempDirectory, `${folderSlug}.mjs`);
  // Bundle actual exports and their imports. Do not infer course metadata with regex.
  await build({
    stdin: {
      contents: `import * as courseExports from ${JSON.stringify(file)};\nimport {resolveCourseLocale} from ${JSON.stringify(localizerPath)};\nexport {courseExports,resolveCourseLocale};`,
      resolveDir: dirname(file),
      sourcefile: 'catalog-entry.mjs',
      loader: 'js',
    },
    outfile: outputFile,
    bundle: true,
    platform: 'node',
    format: 'esm',
    packages: 'external',
    logLevel: 'silent',
  });
  const { courseExports, resolveCourseLocale } = await import(pathToFileURL(outputFile).href);
  const candidates = [...new Set(Object.values(courseExports).filter((value) =>
    value && typeof value === 'object' && typeof value.slug === 'string' && Array.isArray(value.modules)
  ))];
  const matches = candidates.filter((course) => course.slug === folderSlug);
  if (matches.length !== 1) {
    throw new Error(`${file}: export exactly one course with slug '${folderSlug}'.`);
  }
  return summarizeCourse(matches[0], resolveCourseLocale);
}

export async function generateCatalog({
  rootDir = repositoryRoot,
  outputPath = resolve(rootDir, 'apps/catalog/src/generated/catalog.json'),
  localizerPath = resolve(repositoryRoot, 'packages/core/src/i18n/course-localization.ts'),
} = {}) {
  const appDirectory = resolve(rootDir, 'apps');
  const directories = await readdir(appDirectory, { withFileTypes: true });
  // Keep the ephemeral bundle inside the repo so package imports resolve correctly.
  const temporaryRoot = resolve(repositoryRoot, 'node_modules/.cache');
  await mkdir(temporaryRoot, { recursive: true });
  const tempDirectory = await mkdtemp(join(temporaryRoot, 'tutor-catalog-'));
  const courses = [];
  try {
    for (const directory of directories.sort((a, b) => a.name.localeCompare(b.name))) {
      if (!directory.isDirectory() || directory.name.startsWith('.') || ['starter', 'catalog', 'demo'].includes(directory.name)) continue;
      const file = resolve(appDirectory, directory.name, 'src/content/course.ts');
      if (!existsSync(file)) continue;
      const course = await loadCourse(file, tempDirectory, directory.name, localizerPath);
      if (course) courses.push(course);
    }
  } finally {
    await rm(tempDirectory, { recursive: true, force: true });
  }
  const seenUrls = new Set();
  for (const course of courses) {
    if (seenUrls.has(course.url)) throw new Error(`More than one course uses ${course.url}.`);
    seenUrls.add(course.url);
  }
  courses.sort((a, b) => a.order - b.order || a.code.localeCompare(b.code) || a.slug.localeCompare(b.slug));
  const manifest = { schemaVersion: 1, courses };
  const serialized = `${JSON.stringify(manifest, null, 2)}\n`;
  await mkdir(dirname(outputPath), { recursive: true });
  const previous = await readFile(outputPath, 'utf8').catch(() => '');
  if (previous !== serialized) await writeFile(outputPath, serialized);
  return manifest;
}

if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  generateCatalog().then(({ courses }) => {
    console.log(`Catalog generated from ${courses.length} course app${courses.length === 1 ? '' : 's'}.`);
  }).catch((error) => {
    console.error(error instanceof Error ? error.message : error);
    process.exitCode = 1;
  });
}
