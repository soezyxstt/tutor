import test from 'node:test';
import assert from 'node:assert/strict';
import { createHash } from 'node:crypto';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import katex from 'katex';
import type { CourseConfig, PracticeQuestion, ProblemItem, SimulationSpec } from '@tutor/core';
import { resolveCourseLocale } from '../../../packages/core/src/i18n/course-localization';
import { MathMarkdown } from '../../../packages/core/src/content/math-markdown';
import { course } from '../src/content/course';
import baseline from './migration-baseline.json';

// These fingerprints were derived from staging 802aead before migration, not
// from the implementation being tested. Whitespace and Markdown presentation
// may change; source wording, equations, tables, answers, and ordering may not.
function normalizeText(value: string): string {
  return value
    .replace(/(?<!\\)\\\(([\s\S]*?)\\\)/g, (_, text) => `$${text}$`)
    .replace(/(?<!\\)\\\[([\s\S]*?)\\\]/g, (_, text) => `$$${text}$$`)
    .replace(/^\s*\|(?:\s*:?-+:?\s*\|)+\s*$/gm, '')
    .replace(/^\s*>\s?/gm, '')
    .replace(/\*\*/g, '')
    .replace(/\\\|/g, '|')
    .replace(/\s+/g, '');
}
const digest = (value: string) => createHash('sha256').update(value).digest('hex');
const textDigest = (value: string) => digest(normalizeText(value));
const stable = (value: unknown): unknown => Array.isArray(value) ? value.map(stable)
  : value && typeof value === 'object'
    ? Object.fromEntries(Object.keys(value).sort().map((key) => [key, stable((value as Record<string, unknown>)[key])]))
    : value;
const dataDigest = (value: unknown) => digest(JSON.stringify(stable(value)));
const itemsOf = (config: CourseConfig) => config.modules.flatMap((module) => module.items);
const problemsOf = (config: CourseConfig) => itemsOf(config).filter((item): item is ProblemItem => item.kind === 'problem');
const practicesOf = (config: CourseConfig) => itemsOf(config).flatMap((item) => item.kind === 'practice' ? item.questions : []);
const sourceProblems = new Map(problemsOf(course).map((problem) => [problem.id, problem]));
const sourcePractice = new Map(practicesOf(course).map((question) => [question.id, question]));
const locales = ['id', 'en'] as const;

function checkVisual(actual: SimulationSpec | undefined, expected: typeof baseline.questions[number]['visuals']['primary'], path: string, locale: typeof locales[number]) {
  assert.ok(actual, `${path}: missing source visual`);
  assert.equal(actual.type, `ipe-${expected.kind}`, `${path}: visual model changed`);
  assert.equal(textDigest(actual.caption ?? ''), expected.caption[locale], `${path}: visual explanation changed`);
  const { visualKind, ...sourceData } = actual.data ?? {};
  assert.equal(visualKind, expected.kind, `${path}: fixed visual kind changed`);
  assert.equal(dataDigest(sourceData), expected.data, `${path}: source geometry, mode, or sample values changed`);
}

test('IPE retains all 47 exam problems, 419 detailed steps, and nine source papers', () => {
  assert.equal(sourceProblems.size, baseline.totals.questions);
  assert.equal(problemsOf(course).reduce((count, problem) => count + problem.steps.length, 0), baseline.totals.steps);
  const expectedExams = new Map<string, number>();
  const actualExams = new Map<string, number>();
  for (const expected of baseline.questions) {
    const problem = sourceProblems.get(expected.id);
    assert.ok(problem, `Missing original question ${expected.id}`);
    assert.deepEqual(problem.exam, expected.exam, `${expected.id}: exam placement changed`);
    assert.equal(problem.steps.length, expected.steps, `${expected.id}: detailed steps were lost`);
    assert.deepEqual(problem.steps.map((step) => step.id), Array.from({ length: expected.steps }, (_, index) => `${expected.id}-step-${index + 1}`));
    const key = `${expected.exam.year}-${expected.exam.term}`;
    expectedExams.set(key, (expectedExams.get(key) ?? 0) + 1);
  }
  for (const problem of sourceProblems.values()) {
    const key = `${problem.exam?.year}-${problem.exam?.term}`;
    actualExams.set(key, (actualExams.get(key) ?? 0) + 1);
  }
  assert.equal(actualExams.size, 9);
  assert.deepEqual([...actualExams].sort(), [...expectedExams].sort());
});

test('IPE retains verbatim source evidence, links, page locators, and reference pages', () => {
  for (const expected of baseline.questions) {
    const problem = sourceProblems.get(expected.id)!;
    const evidence = problem.sourceDetails;
    assert.ok(evidence, `${expected.id}: missing source evidence`);
    assert.equal(evidence.url, expected.source.url, expected.id);
    assert.equal(evidence.file, expected.source.file, expected.id);
    assert.deepEqual(evidence.pages, expected.source.pages, expected.id);
    assert.equal(evidence.originalLanguage, expected.source.originalLanguage, expected.id);
    assert.equal(digest(evidence.original), expected.source.originalSha256, `${expected.id}: original transcription changed`);
    assert.ok(evidence.references?.length, `${expected.id}: missing audited course references`);
    for (const reference of evidence.references!) {
      assert.ok(reference.pages.length > 0 && reference.pages.every((page) => Number.isInteger(page) && page > 0), `${expected.id}: missing physical PDF page locator`);
    }
    // Explicit legacy Bag3 locators remain evidence. Other questions originally
    // linked Bag3 without pages even when the supporting theory lives in Bag1/2.
    if (expected.source.referencePages.length) {
      const bag3 = evidence.references!.find((reference) => reference.url === baseline.provenance.reference.url);
      assert.ok(bag3, `${expected.id}: missing original Bag3 reference`);
      for (const page of expected.source.referencePages) assert.ok(bag3.pages.includes(page), `${expected.id}: lost original reference page ${page}`);
    }
  }
});

test('both IPE languages preserve every original explanation, assumption, table, and final answer', () => {
  for (const locale of locales) {
    const localized = new Map(problemsOf(resolveCourseLocale(course, locale).course).map((problem) => [problem.id, problem]));
    for (const expected of baseline.questions) {
      const problem = localized.get(expected.id)!;
      const text = expected.locales[locale];
      const label = `${expected.id}.${locale}`;
      assert.equal(textDigest(problem.title), text.title, `${label}: title`);
      assert.equal(textDigest(problem.statement), text.statement, `${label}: statement`);
      assert.deepEqual((problem.given ?? []).map(textDigest), text.given, `${label}: givens`);
      assert.deepEqual((problem.assumptions ?? []).map(textDigest), text.assumptions, `${label}: assumptions`);
      assert.equal(textDigest(problem.finalAnswer), text.finalAnswer, `${label}: final answer`);
      const steps = problem.steps.map((step) => ({ title: textDigest(step.title), content: textDigest(step.content) }));
      assert.equal(digest(JSON.stringify(steps)), text.stepsSha256, `${label}: one or more detailed steps, equations, tables, or notes changed`);
    }
  }
});

test('all 30 conceptual practice questions keep their choices, answer keys, and targeted feedback', () => {
  assert.equal(sourcePractice.size, baseline.totals.practice);
  for (const locale of locales) {
    const translated = new Map(practicesOf(resolveCourseLocale(course, locale).course).map((question) => [question.id, question]));
    for (const expected of baseline.practice) {
      const question = translated.get(expected.id);
      assert.ok(question, `${expected.id}: original conceptual practice missing`);
      const text = expected.locales[locale];
      const path = `${expected.id}.${locale}`;
      assert.equal(question.options.length, 4, path);
      assert.equal(question.correctOptionId, `${expected.id}-option-${expected.correctIndex + 1}`, `${path}: correct answer changed`);
      assert.equal(question.relatedProblemId, expected.sourceQuestionId, `${path}: related worked example changed`);
      assert.ok(sourceProblems.has(question.relatedProblemId!), `${path}: related worked example does not exist`);
      assert.equal(textDigest(question.prompt), text.prompt, `${path}: prompt`);
      assert.equal(textDigest(question.explanation), text.explanation, `${path}: reasoning`);
      question.options.forEach((option, index) => {
        assert.equal(option.id, `${expected.id}-option-${index + 1}`, `${path}: option identity`);
        assert.equal(textDigest(option.label), text.options[index].label, `${path}: option ${index + 1}`);
        assert.equal(textDigest(option.feedback ?? ''), text.options[index].feedback, `${path}: option ${index + 1} feedback`);
      });
    }
  }
});

test('all 90 source visual instances retain their placement, fixed parameters, and both captions', () => {
  let visualCount = 0;
  for (const locale of locales) {
    const translated = new Map(problemsOf(resolveCourseLocale(course, locale).course).map((problem) => [problem.id, problem]));
    for (const expected of baseline.questions) {
      const problem = translated.get(expected.id)!;
      checkVisual(problem.simulation, expected.visuals.primary, `${expected.id}.simulation`, locale);
      assert.equal(problem.simulations?.length ?? 0, expected.visuals.extra.length, `${expected.id}: supplementary visual count`);
      expected.visuals.extra.forEach((visual, index) => checkVisual(problem.simulations?.[index], visual, `${expected.id}.simulations[${index}]`, locale));
      assert.equal(problem.steps.filter((step) => step.simulation).length, expected.visuals.steps.length, `${expected.id}: step visual count`);
      expected.visuals.steps.forEach((visual) => checkVisual(problem.steps[visual.index].simulation, visual, `${expected.id}.steps[${visual.index}].simulation`, locale));
      if (locale === 'id') visualCount += 1 + expected.visuals.extra.length + expected.visuals.steps.length;
    }
  }
  assert.equal(visualCount, baseline.totals.visuals);
});

test('English covers the actual lessons while navigation, source evidence, and answer keys stay stable', () => {
  const english = resolveCourseLocale(course, 'en');
  assert.deepEqual(english.missingItemIds, []);
  assert.deepEqual(english.partiallyTranslatedItemIds, []);
  assert.equal(english.translatedItemIds.length, itemsOf(course).length);
  assert.deepEqual(english.course.modules.map((module) => module.id), course.modules.map((module) => module.id));
  const identity = (config: CourseConfig) => itemsOf(config).map((item) => ({
    id: item.id, slug: item.slug, kind: item.kind,
    ...(item.kind === 'problem' ? { source: item.sourceDetails, steps: item.steps.map((step) => step.id) } : {}),
    ...(item.kind === 'practice' ? { questions: item.questions.map((question) => ({ id: question.id, correct: question.correctOptionId, options: question.options.map((option) => option.id) })) } : {}),
  }));
  assert.deepEqual(identity(english.course), identity(course));
});

function checkDecision(question: PracticeQuestion, path: string) {
  assert.ok(question.prompt.trim(), `${path}: empty decision prompt`);
  assert.equal(new Set(question.options.map((option) => option.id)).size, question.options.length, `${path}: duplicate option IDs`);
  assert.ok(question.options.some((option) => option.id === question.correctOptionId), `${path}: answer does not exist`);
  for (const option of question.options) {
    assert.ok(option.feedback?.trim(), `${path}.${option.id}: missing specific feedback`);
    if (option.id !== question.correctOptionId) assert.ok(option.misconceptionTag, `${path}.${option.id}: missing misconception tag`);
  }
}

test('every IPE module has theory, a worked example, and three levels of reasoning practice', () => {
  const itemIds = new Set<string>();
  const slugs = new Set<string>();
  for (const module of course.modules) {
    const material = module.items.find((item) => item.kind === 'material');
    const practice = module.items.find((item) => item.kind === 'practice');
    assert.ok(material?.kind === 'material', `${module.id}: missing concept material`);
    assert.ok(module.items.some((item) => item.kind === 'problem'), `${module.id}: missing worked example`);
    assert.ok(practice?.kind === 'practice', `${module.id}: missing practice`);
    assert.ok(material.examHook?.prompt && material.examHook.targetOutcome, `${module.id}: missing exam context or learning goal`);
    assert.ok(material.microUnits?.length, `${module.id}: missing short theory units`);
    for (const unit of material.microUnits!) {
      assert.ok(unit.intuition && unit.formal && unit.validityBounds, `${unit.id}: theory omits its limits`);
      assert.ok(unit.decisionCheck, `${unit.id}: missing concept decision`);
      checkDecision(unit.decisionCheck!, unit.id);
      for (const content of [unit.intuition, unit.formal, unit.validityBounds!]) {
        for (const paragraph of content.split(/\n\s*\n/)) assert.ok(paragraph.split(/\s+/).filter(Boolean).length <= 180, `${unit.id}: passive block exceeds 180 words`);
      }
    }
    assert.ok(practice.questions.length, `${module.id}: missing concept choices`);
    practice.questions.forEach((question) => checkDecision(question, question.id));
    assert.ok(practice.guidedTasks?.length, `${module.id}: missing partial-solution practice`);
    practice.guidedTasks!.forEach((task) => checkDecision(task.question, task.id));
    assert.ok(practice.essayTasks?.length, `${module.id}: missing independent reasoning task`);
    for (const task of practice.essayTasks!) {
      assert.equal(task.hints.length, 3, `${task.id}: expected three staged hints`);
      assert.ok(task.hints.every((hint) => hint.trim()), `${task.id}: empty hint`);
      assert.equal(task.rubric.reduce((sum, criterion) => sum + criterion.weight, 0), 100, `${task.id}: rubric weights`);
      assert.ok(task.verifiedOutline.trim(), `${task.id}: missing verified reasoning outline`);
      assert.ok(task.rubric.every((criterion) => criterion.fullCredit.trim()), `${task.id}: missing success criteria`);
    }
    for (const item of module.items) {
      assert.ok(!itemIds.has(item.id), `Duplicate lesson ID ${item.id}`);
      assert.ok(!slugs.has(item.slug), `Duplicate lesson slug ${item.slug}`);
      itemIds.add(item.id); slugs.add(item.slug);
    }
  }
});

test('simulation controls are finite, have valid bounds, and retain their state across languages', () => {
  const collect = (config: CourseConfig) => itemsOf(config).flatMap((item) => [
    ...(item.simulation ? [item.simulation] : []),
    ...(item.kind === 'problem' ? [...(item.simulations ?? []), ...item.steps.flatMap((step) => step.simulation ? [step.simulation] : [])] : []),
  ]);
  const ids = new Set<string>();
  const stripLabels = (spec: SimulationSpec) => ({ id: spec.id, type: spec.type, data: spec.data, params: spec.params.map(({ label, ...param }) => param) });
  const sourceSpecs = collect(course);
  assert.deepEqual(collect(resolveCourseLocale(course, 'en').course).map(stripLabels), sourceSpecs.map(stripLabels));
  for (const spec of sourceSpecs) {
    assert.ok(!ids.has(spec.id), `Duplicate persisted simulation key ${spec.id}`); ids.add(spec.id);
    assert.equal(new Set(spec.params.map((param) => param.key)).size, spec.params.length, `${spec.id}: duplicate slider key`);
    for (const param of spec.params) {
      assert.ok([param.min, param.max, param.defaultValue, param.step].every(Number.isFinite), `${spec.id}.${param.key}: non-finite control`);
      assert.ok(param.min < param.max && param.step > 0 && param.defaultValue >= param.min && param.defaultValue <= param.max, `${spec.id}.${param.key}: invalid control range`);
    }
  }
});

test('actual runtime text parses in KaTeX and the shared Markdown renderer in both languages', (context) => {
  let expressions = 0;
  const inspect = (value: unknown, path: string, key = '') => {
    // Verbatim exam evidence is displayed as source text, not rewritten lesson prose.
    if (key === 'sourceDetails' || key === 'data' || key === 'translations') return;
    if (typeof value === 'string') {
      assert.doesNotMatch(value, /[\u0000-\u0008\u000B\u000C\u000E-\u001F]/u, `${path}: malformed escape/control character`);
      if (key === 'latex') {
        katex.renderToString(value, { throwOnError: true, trust: false, strict: 'ignore', displayMode: true });
        expressions++;
        return;
      }
      assert.doesNotMatch(value, /(?<!\\)\\[()[\]]/, `${path}: old math delimiters cannot render in the shared Markdown reader`);
      if (!value.includes('$')) return;
      let count = 0;
      const remainder = value.replace(/\$\$([\s\S]*?)\$\$|(?<!\\)\$(?!\$)([^\n$]*?)(?<!\\)\$(?!\$)/g, (match, display: string | undefined, inline: string | undefined) => {
        const expression = display ?? inline ?? '';
        assert.ok(expression.trim(), `${path}: empty math`);
        assert.doesNotThrow(() => katex.renderToString(expression, { throwOnError: true, trust: false, strict: 'ignore', displayMode: display !== undefined }), path);
        count++;
        return '';
      });
      assert.doesNotMatch(remainder, /(?<!\\)\$/, `${path}: unmatched math delimiter`);
      if (count) {
        const html = renderToStaticMarkup(createElement(MathMarkdown, { content: value }));
        assert.ok(!html.includes('katex-error'), `${path}: shared renderer reports math error`);
        assert.equal((html.match(/class="katex"/g) ?? []).length, count, `${path}: renderer lost a formula`);
        expressions += count;
      }
    } else if (Array.isArray(value)) value.forEach((entry, index) => inspect(entry, `${path}[${index}]`, key));
    else if (value && typeof value === 'object') for (const [field, child] of Object.entries(value)) inspect(child, `${path}.${field}`, field);
  };
  for (const locale of locales) inspect(resolveCourseLocale(course, locale).course, locale);
  assert.ok(expressions > 1000, `Unexpectedly little retained mathematics: ${expressions} expressions`);
  context.diagnostic(`Rendered ${expressions} runtime mathematical expressions across Indonesian and English.`);
});
