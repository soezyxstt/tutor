import test from 'node:test';
import assert from 'node:assert/strict';
import type { CourseConfig } from '@tutor/core';
import { migrateLegacyIpeUrl, readLegacyIpeProgress } from '../src/migrate-progress';

const course: CourseConfig = {
  slug: 'ipe', code: 'IPE', title: 'IPE', subtitle: '', domain: 'ipe.tutor.adihnursyam.com',
  modules: [{ id: 'systems', title: 'Systems', items: [
    { id: '2025-uts1-q1', slug: 'worked-first', kind: 'problem', title: 'First', difficulty: 'dasar', statement: 'Source', finalAnswer: 'Answer', steps: [{ id: 's1', title: 'Start', content: 'Identify.' }, { id: 's2', title: 'Model', content: 'Choose.' }, { id: 's3', title: 'Check', content: 'Compare.' }] },
    { id: '2025-uts1-q2', slug: 'worked-second', kind: 'problem', title: 'Second', difficulty: 'dasar', statement: 'Source', finalAnswer: 'Answer', steps: [{ id: 's1', title: 'Start', content: 'Identify.' }] },
    { id: 'concept-practice', slug: 'practice-systems', kind: 'practice', title: 'Practice', difficulty: 'dasar', questions: [
      { id: 'concept-p1', prompt: 'Choose.', correctOptionId: 'a', explanation: 'Reason.', options: [{ id: 'a', label: 'First' }, { id: 'b', label: 'Second' }] },
      { id: 'concept-p2', prompt: 'Choose.', correctOptionId: 'c', explanation: 'Reason.', options: [{ id: 'c', label: 'First' }, { id: 'd', label: 'Second' }] },
    ] },
  ] }],
};
const empty = () => ({ completedIds: {}, bookmarkedIds: {}, practiceAnswers: {}, revealedSteps: {} });
const storage = (values: Record<string, unknown>) => ({ getItem: (key: string) => key in values ? JSON.stringify(values[key]) : null });

test('legacy completion, bookmarks, indexed answers, and open-step progress migrate to shared IDs', () => {
  const current = empty();
  const result = readLegacyIpeProgress(storage({
    'ipe:completed:v1': ['2025-uts1-q1', 'unknown', null],
    'ipe:bookmarks:v1': ['2025-uts1-q2'],
    'ipe:practice:concepts:v2': { 'concept-p1': 1, 'concept-p2': 0, unknown: 0 },
    'ipe:steps:expanded:v2': { '2025-uts1-q1': 1, '2025-uts1-q2': 99, unknown: 9 },
  }), course, current);
  assert.deepEqual(result, {
    completedIds: { 'ipe:2025-uts1-q1': true },
    bookmarkedIds: { 'ipe:2025-uts1-q2': true },
    practiceAnswers: { 'ipe:concept-practice:concept-p1': 'b', 'ipe:concept-practice:concept-p2': 'c' },
    revealedSteps: { 'ipe:2025-uts1-q1': [0, 1], 'ipe:2025-uts1-q2': [0] },
  });
  assert.deepEqual(current, empty(), 'Reading legacy storage must not mutate existing progress');
});

test('new shared progress takes precedence, including explicit false and fully collapsed steps', () => {
  const current = {
    completedIds: { 'ipe:2025-uts1-q1': false, 'other:lesson': true },
    bookmarkedIds: { 'ipe:2025-uts1-q2': false },
    practiceAnswers: { 'ipe:concept-practice:concept-p1': 'a' },
    revealedSteps: { 'ipe:2025-uts1-q1': [] as number[] },
  };
  const result = readLegacyIpeProgress(storage({
    'ipe:completed:v1': ['2025-uts1-q1'], 'ipe:bookmarks:v1': ['2025-uts1-q2'],
    'ipe:practice:concepts:v2': { 'concept-p1': 1 }, 'ipe:steps:expanded:v2': { '2025-uts1-q1': 2 },
  }), course, current);
  assert.deepEqual(result, current);
  assert.deepEqual(readLegacyIpeProgress(storage({}), course, result), result, 'Repeated migration is idempotent');
});

test('invalid saved answers and inaccessible or corrupt storage do not create bogus progress', () => {
  for (const invalid of [-1, 99, 0.5, '0', null, {}, []]) {
    assert.deepEqual(readLegacyIpeProgress(storage({ 'ipe:practice:concepts:v2': { 'concept-p1': invalid }, 'ipe:steps:expanded:v2': { '2025-uts1-q1': invalid } }), course, empty()).practiceAnswers, {});
  }
  for (const reader of [
    { getItem: () => '{invalid JSON' },
    { getItem: () => { throw new Error('Storage disabled'); } },
    storage({ 'ipe:completed:v1': {}, 'ipe:bookmarks:v1': 42, 'ipe:practice:concepts:v2': [], 'ipe:steps:expanded:v2': [] }),
  ]) assert.deepEqual(readLegacyIpeProgress(reader, course, empty()), empty());
  assert.deepEqual(readLegacyIpeProgress(storage({ 'ipe:steps:expanded:v2': { '2025-uts1-q1': -1 } }), course, empty()).revealedSteps, {});
});

test('old question and practice links retain language preference and resolve to current lesson slugs', () => {
  const original = new URL('https://ipe.tutor.adihnursyam.com/?lang=id&from=course#soal/2025-uts1-q1');
  const next = migrateLegacyIpeUrl(original, course);
  assert.equal(next.searchParams.get('item'), 'worked-first');
  assert.equal(next.searchParams.get('lang'), 'id');
  assert.equal(next.searchParams.get('from'), 'course');
  assert.equal(next.hash, '');
  assert.equal(original.hash, '#soal/2025-uts1-q1', 'Do not mutate the caller URL');
  assert.equal(migrateLegacyIpeUrl(new URL('https://ipe.tutor.adihnursyam.com/#latihan'), course).searchParams.get('item'), 'practice-systems');
  for (const suffix of ['?item=worked-second#soal/2025-uts1-q1', '#soal/missing', '#unrelated']) {
    const url = new URL(`https://ipe.tutor.adihnursyam.com/${suffix}`);
    assert.equal(migrateLegacyIpeUrl(url, course).href, url.href);
  }
});
