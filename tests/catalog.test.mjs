import test from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, writeFile, readFile, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { courseUrl, generateCatalog } from '../scripts/generate-catalog.mjs';

test('course URLs only allow HTTPS hostnames without credentials or executable paths', () => {
  assert.equal(courseUrl('perpan.tutor.adihnursyam.com'), 'https://perpan.tutor.adihnursyam.com');
  assert.equal(courseUrl('https://perpan.tutor.adihnursyam.com/'), 'https://perpan.tutor.adihnursyam.com');
  for (const value of ['http://example.com', 'https://user:password@example.com', 'javascript:alert(1)', 'https://example.com/a', 'https://example.com/?x=1', 'https://example.com:123']) {
    assert.throws(() => courseUrl(value), undefined, value);
  }
});

test('catalog discovers imported content and new apps, skips drafts/templates, and reports partial translation honestly', async () => {
  const rootDir = await mkdtemp(join(tmpdir(), 'tutor-catalog-test-'));
  const outputPath = join(rootDir, 'catalog.json');
  const writeCourse = async (slug, extra = '') => {
    const directory = join(rootDir, 'apps', slug, 'src', 'content');
    await mkdir(directory, { recursive: true });
    await writeFile(join(directory, 'lessons.ts'), `export const lessons = [
      { id: 'intro', kind: 'material', slug: 'intro', title: 'Dasar', body: 'Isi dasar.' },
      { id: 'exam', kind: 'problem', slug: 'exam', title: 'Soal', statement: 'Hitung.', difficulty: 'dasar', exam: {term:'UTS',year:2025}, steps: [], finalAnswer: '2' }
    ];`);
    await writeFile(join(directory, 'course.ts'), `import {lessons} from './lessons';
      export const course = {
        slug: '${slug}', code: 'MS3103', title: 'Pindah Panas', subtitle: 'Materi dan soal',
        domain: '${slug}.tutor.adihnursyam.com',
        modules: [{id:'m1',title:'Konduksi',items:lessons}],
        translations: {en:{title:'Heat Transfer',subtitle:'Materials and solutions',modules:{m1:{title:'Conduction',items:{intro:{title:'Basics',body:'Core content.'}}}}}},
        ${extra}
      };`);
  };
  try {
    await writeCourse('starter');
    await writeCourse('hidden', 'catalog:{listed:false}');
    await writeCourse('draft', "catalog:{status:'draft'}");
    await writeCourse('perpan');
    const first = await generateCatalog({ rootDir, outputPath });
    assert.equal(first.courses.length, 1);
    assert.equal(first.courses[0].slug, 'perpan');
    assert.deepEqual(first.courses[0].counts, { modules: 1, materials: 1, practices: 0, problems: 1 });
    assert.deepEqual(first.courses[0].exams, [{ term: 'UTS', year: 2025, problems: 1 }]);
    assert.equal(first.courses[0].locales.id.status, 'source');
    assert.equal(first.courses[0].locales.en.title, 'Heat Transfer');
    assert.equal(first.courses[0].locales.en.status, 'partial');
    assert.equal(first.courses[0].locales.en.translatedItems, 1);
    assert.equal(first.courses[0].locales.en.totalItems, 2);

    await writeCourse('fluida');
    const next = await generateCatalog({ rootDir, outputPath });
    assert.deepEqual(next.courses.map((course) => course.slug), ['fluida', 'perpan']);
    assert.deepEqual(JSON.parse(await readFile(outputPath, 'utf8')), next);
    const serialized = await readFile(outputPath, 'utf8');
    await generateCatalog({ rootDir, outputPath });
    assert.equal(await readFile(outputPath, 'utf8'), serialized, 'unchanged metadata has stable build output');
  } finally {
    await rm(rootDir, { recursive: true, force: true });
  }
});

test('catalog fails build for duplicate destinations instead of publishing ambiguous links', async () => {
  const rootDir = await mkdtemp(join(tmpdir(), 'tutor-catalog-duplicate-'));
  try {
    for (const slug of ['first', 'second']) {
      const directory = join(rootDir, 'apps', slug, 'src/content');
      await mkdir(directory, { recursive: true });
      await writeFile(join(directory, 'course.ts'), `export default {
        slug: '${slug}', code:'FI1101', title:'Course',subtitle:'Lessons',domain:'same.tutor.adihnursyam.com',
        modules:[{id:'m1',title:'Module',items:[{id:'a',slug:'a',kind:'material',title:'Lesson',body:'Text'}]}]
      };`);
    }
    await assert.rejects(generateCatalog({ rootDir, outputPath: join(rootDir, 'catalog.json') }), /More than one course/);
  } finally {
    await rm(rootDir, { recursive: true, force: true });
  }
});
