import { useDeferredValue, useEffect, useMemo, useState } from 'react';
import { ArrowUpRight, BookOpen, CheckCheck, FileText, Search, SearchX, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CatalogShell, languageHref, useLanguage } from '@tutor/core/catalog';
import { Button, Input, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@tutor/ui';
import generatedCatalog from './generated/catalog.json';
import type { CatalogCourse, CatalogFilter, CatalogManifest } from './catalog-types';

const manifest = generatedCatalog as CatalogManifest;

function CourseRow({ course }: { course: CatalogCourse }) {
  const { locale, preference, t } = useLanguage();
  const translated = course.locales[locale];
  const sourceName = course.sourceLanguage === 'id' ? t('Bahasa Indonesia', 'Indonesian') : t('bahasa Inggris', 'English');
  const availableLanguages = Object.entries(course.locales)
    .filter(([, data]) => data.status !== 'unavailable')
    .map(([key, data]) => `${key === 'id' ? t('Bahasa Indonesia', 'Indonesian') : t('Inggris', 'English')}${data.status === 'partial' ? t(' (sebagian)', ' (partial)') : ''}`);
  const contentCounts = [
    { key: 'materials' as const, icon: BookOpen, label: t('materi', course.counts.materials === 1 ? 'material' : 'materials') },
    { key: 'practices' as const, icon: CheckCheck, label: t('latihan', course.counts.practices === 1 ? 'practice set' : 'practice sets') },
    { key: 'problems' as const, icon: FileText, label: t('pembahasan', course.counts.problems === 1 ? 'worked solution' : 'worked solutions') },
  ].filter(({ key }) => course.counts[key] > 0);

  return (
    <motion.li layout="position" initial={{ opacity: 0, y: 5 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
      <a href={languageHref(course.url, preference)} className="catalog-course group block rounded-sm py-6 transition-colors sm:py-7">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0 flex-1">
            <div className="mb-2 flex flex-wrap items-center gap-x-2.5 gap-y-1 text-xs text-muted-foreground">
              <span className="font-mono text-[11px]">{course.code}</span>
              <span aria-hidden="true">·</span>
              <span>{course.counts.modules} {t('modul', course.counts.modules === 1 ? 'module' : 'modules')}</span>
              {course.status === 'showcase' && <><span aria-hidden="true">·</span><span>{t('Contoh pembelajaran', 'Learning demo')}</span></>}
            </div>
            <h2 className="text-xl leading-snug font-semibold tracking-tight transition-colors group-hover:text-primary sm:text-[23px]">
              {translated.title}
            </h2>
            <p className="mt-2 max-w-2xl text-[13px] leading-relaxed text-muted-foreground sm:text-sm">{translated.subtitle}</p>
          </div>
          <ArrowUpRight className="mt-1 size-[19px] shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" aria-hidden="true" />
        </div>

        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2.5 text-xs text-foreground/85 sm:gap-x-6 sm:text-[13px]">
          {contentCounts.map(({ key, icon: Icon, label }) => (
            <span key={key} className="inline-flex items-center gap-1.5">
              <Icon className="size-3.5 text-muted-foreground" aria-hidden="true" />
              <span>{course.counts[key]} {label}</span>
            </span>
          ))}
        </div>

        <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
          {translated.modules.slice(0, 4).map((module) => module.title).join(' · ')}
          {translated.modules.length > 4 ? ` · +${translated.modules.length - 4} ${t('modul', 'modules')}` : ''}
        </p>
        <div className="mt-4 flex flex-wrap items-end justify-between gap-x-5 gap-y-3 border-l-2 border-border pl-3 text-xs leading-relaxed text-muted-foreground">
          <div className="space-y-1">
            {course.exams.length > 0 && <p>{t('Soal ujian', 'Exam papers')}: {course.exams.slice(0, 4).map((exam) => `${exam.term} ${exam.year}`).join(' · ')}{course.exams.length > 4 ? ` · +${course.exams.length - 4}` : ''}</p>}
            <p>{t('Bahasa materi', 'Content languages')}: {availableLanguages.join(' · ')}</p>
            {translated.status === 'unavailable' && <p>{t(`Isi materi masih dalam ${sourceName}.`, `Course content is currently in ${sourceName}.`)}</p>}
          </div>
          <span className="inline-flex items-center gap-1 font-medium text-primary">
            {t('Buka materi', 'Open course')}
            <ArrowUpRight className="size-3" aria-hidden="true" />
          </span>
        </div>
      </a>
    </motion.li>
  );
}

export function CatalogApp() {
  const { locale, t } = useLanguage();
  const [search, setSearch] = useState('');
  const deferredSearch = useDeferredValue(search);
  const [filter, setFilter] = useState<CatalogFilter>('all');
  const courses = manifest.courses;
  const filters: { value: CatalogFilter; label: string }[] = [
    { value: 'all', label: t('Semua isi', 'All content') },
    { value: 'materials', label: t('Materi', 'Materials') },
    { value: 'practices', label: t('Latihan', 'Practice') },
    { value: 'problems', label: t('Pembahasan soal', 'Worked solutions') },
  ].filter(({ value }) => value === 'all' || courses.some((course) => course.counts[value as Exclude<CatalogFilter, 'all'>] > 0)) as { value: CatalogFilter; label: string }[];

  const results = useMemo(() => {
    const query = deferredSearch.trim().toLocaleLowerCase(locale);
    return courses.filter((course) => {
      if (filter !== 'all' && course.counts[filter] === 0) return false;
      if (!query) return true;
      const text = [course.code, course.slug,
        ...Object.values(course.locales).flatMap((data) => [data.title, data.subtitle, ...data.modules.map((module) => module.title)]),
        ...course.exams.map((exam) => `${exam.term} ${exam.year}`),
      ].join(' ').toLocaleLowerCase(locale);
      return query.split(/\s+/).every((word) => text.includes(word));
    });
  }, [courses, deferredSearch, filter, locale]);

  useEffect(() => { document.title = t('Materi dan pembahasan · Tutor', 'Materials and solutions · Tutor'); }, [t]);

  return (
    <CatalogShell>
      <section aria-labelledby="catalog-heading">
        <div className="flex flex-wrap items-end justify-between gap-x-8 gap-y-4">
          <div className="max-w-xl">
            <h1 id="catalog-heading" className="text-[28px] leading-tight font-semibold tracking-[-0.035em] sm:text-[34px]">
              {t('Materi dan pembahasan', 'Materials and solutions')}
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-7 text-muted-foreground">
              {t('Pilih mata kuliah untuk membaca materi, mencoba latihan, dan mengikuti pembahasan langkah demi langkah.', 'Choose a course to read the material, try a practice set, and follow each step of a worked solution.')}
            </p>
          </div>
          <p className="pb-0.5 text-xs text-muted-foreground sm:text-right">
            <span className="font-medium text-foreground">{courses.length}</span> {t('mata kuliah tersedia', courses.length === 1 ? 'course available' : 'courses available')}
          </p>
        </div>

        <div className="mt-7 flex flex-col gap-2 border-y border-border py-3 sm:mt-8 sm:flex-row sm:items-center sm:justify-between sm:gap-5">
          <div className="relative flex min-w-0 flex-1 items-center gap-2">
            <Search className="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
            <label htmlFor="course-search" className="sr-only">{t('Cari mata kuliah, topik, atau ujian', 'Search courses, topics, or exams')}</label>
            <Input id="course-search" type="search" value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t('Cari mata kuliah, topik, atau ujian…', 'Search courses, topics, or exams…')} className="h-9 border-0 px-0 text-sm focus-visible:ring-0 [&::-webkit-search-cancel-button]:appearance-none" />
            {search && <Button variant="icon" size="icon" onClick={() => setSearch('')} aria-label={t('Hapus pencarian', 'Clear search')}><X className="size-3.5" /></Button>}
          </div>
          {filters.length > 1 && <Select value={filter} onValueChange={(value) => setFilter(value as CatalogFilter)}>
            <SelectTrigger className="h-9 w-fit min-w-36 pl-0 sm:pl-1.5" aria-label={t('Jenis isi', 'Content type')}><SelectValue /></SelectTrigger>
            <SelectContent align="end">{filters.map((item) => <SelectItem key={item.value} value={item.value}>{item.label}</SelectItem>)}</SelectContent>
          </Select>}
        </div>

        <div aria-live="polite" aria-atomic="true" className="sr-only">
          {results.length} {t('mata kuliah ditemukan', 'courses found')}
        </div>
        <ul className="divide-y divide-border" aria-label={t('Daftar mata kuliah', 'Course list')}>
          <AnimatePresence initial={false}>{results.map((course) => <CourseRow key={course.slug} course={course} />)}</AnimatePresence>
        </ul>
        {results.length === 0 && <div className="py-12 text-center">
          <SearchX className="mx-auto mb-3 size-6 text-muted-foreground" aria-hidden="true" />
          <h2 className="text-base font-medium">{courses.length === 0 ? t('Belum ada mata kuliah', 'No courses yet') : t('Belum ada yang cocok', 'No matching courses')}</h2>
          <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">{courses.length === 0 ? t('Materi baru akan muncul di sini saat tersedia.', 'New course materials will appear here when available.') : t('Coba nama mata kuliah, kode, topik, atau tahun ujian lain.', 'Try another course name, code, topic, or exam year.')}</p>
          {(search || filter !== 'all') && <Button variant="ghost" className="mt-4" onClick={() => { setSearch(''); setFilter('all'); }}>{t('Tampilkan semua', 'Show all courses')}</Button>}
        </div>}
      </section>
    </CatalogShell>
  );
}
