import test from 'node:test';
import assert from 'node:assert/strict';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import type { MaterialItem, PracticeItem, PracticeQuestion } from '@tutor/core';
import { LanguageProvider } from '../../../packages/core/src/i18n/language-provider';
import { MaterialView } from '../../../packages/core/src/content/material-view';
import { PracticeView } from '../../../packages/core/src/content/practice-view';
import { DecisionCheck } from '../../../packages/core/src/content/decision-check';
import { FadedPractice } from '../../../packages/core/src/content/faded-practice';
import { useTutorStore } from '../../../packages/core/src/store/tutor-store';

const question: PracticeQuestion = {
  id: 'model-choice', prompt: 'Which sensor model matches a slowly changing input?',
  options: [
    { id: 'static', label: 'Use the static sensitivity.', feedback: 'The input changes slowly compared with the sensor time constant.' },
    { id: 'instant', label: 'Assume the sensor always follows instantly.', feedback: 'A finite time constant prevents an instant response.', misconceptionTag: 'response-delay' },
  ],
  correctOptionId: 'static', explanation: 'Compare the input time scale with the sensor response time.',
  relatedProblemId: '2025-uts1-q1',
};
const material: MaterialItem = {
  id: 'response-models', slug: 'response-models', kind: 'material', title: 'Choose a response model',
  body: 'A measured value can lag behind its changing input.',
  examHook: { prompt: 'A sensor enters a hot bath.', targetOutcome: 'Choose when a static model gives a sound estimate.' },
  microUnits: [{
    id: 'time-scale', title: 'Compare time scales',
    intuition: 'The sensor output takes time to follow the bath temperature.',
    formal: 'Use the ratio between input duration and time constant.',
    validityBounds: 'A static estimate works after the transient has decayed.', decisionCheck: question,
  }],
};
const practice: PracticeItem = {
  id: 'response-practice', slug: 'response-practice', kind: 'practice', title: 'Reason about sensor response',
  difficulty: 'dasar', questions: [question],
  guidedTasks: [{
    id: 'find-delay-error', mode: 'spot-the-error', title: 'Locate the missing delay',
    prompt: 'Inspect the proposed model.', workSample: 'The output jumps immediately to the new temperature.',
    question,
  }],
  essayTasks: [{
    id: 'choose-a-sensor', title: 'Choose a sensor for a short pulse',
    prompt: 'Explain which time scale controls the choice.',
    sections: ['Model and assumptions', 'Reasoning', 'Conclusion'],
    hints: ['Consider the response time.', 'Compare both time scales.', 'State the model, then justify its limit.'],
    rubric: [{ id: 'time', label: 'Time scale', weight: 100, fullCredit: 'Explain the relative input and response durations.' }],
    verifiedOutline: 'A short time constant follows a short pulse more closely.',
  }],
};

function render(node: ReturnType<typeof createElement>, answers: Record<string, string> = {}) {
  const snapshot = useTutorStore.getInitialState();
  const originalAnswers = snapshot.practiceAnswers;
  const navigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
  try {
    Object.defineProperty(globalThis, 'navigator', { configurable: true, value: { languages: ['en-US'], language: 'en-US' } });
    // Render the same saved-answer snapshot a returning reader hydrates with.
    snapshot.practiceAnswers = answers;
    return renderToStaticMarkup(createElement(LanguageProvider, null, node));
  } finally {
    snapshot.practiceAnswers = originalAnswers;
    if (navigatorDescriptor) Object.defineProperty(globalThis, 'navigator', navigatorDescriptor);
    else Reflect.deleteProperty(globalThis, 'navigator');
  }
}

test('shared material UI renders the exam context, short theory, limits, and decision check', () => {
  const html = render(createElement(MaterialView, { courseSlug: 'ipe', material }));
  for (const value of [material.examHook!.prompt, material.examHook!.targetOutcome, material.microUnits![0].title,
    material.microUnits![0].intuition, material.microUnits![0].formal, material.microUnits![0].validityBounds!, question.prompt]) {
    assert.ok(html.includes(value), `Learning content is missing from the shared reader: ${value}`);
  }
  assert.ok(!html.includes(question.explanation), 'Do not reveal the decision explanation before a choice');
});

test('shared practice exposes both guided and independent tasks without leaking the outline', () => {
  const html = render(createElement(FadedPractice, { courseSlug: 'ipe', practice }));
  assert.ok(html.includes('Guided practice'));
  assert.ok(html.includes('Independent practice'));
  assert.ok(html.includes(practice.guidedTasks![0].title));
  assert.ok(html.includes(practice.essayTasks![0].title));
  assert.ok(!html.includes(practice.essayTasks![0].verifiedOutline), 'Keep the verified outline closed until requested');
});

test('a selected wrong practice choice shows its specific feedback and related worked solution', () => {
  const html = render(createElement(PracticeView, { courseSlug: 'ipe', practice }), { 'ipe:response-practice:model-choice': 'instant' });
  assert.ok(html.includes(question.options[1].feedback!));
  assert.ok(html.includes(question.explanation));
  assert.ok(html.includes('Review your answer'));
  assert.ok(html.includes('?item=2025-uts1-q1&amp;lang=system'));
  assert.ok(!html.includes(question.options[0].feedback!), 'Feedback must correspond to the selected option');
});

test('the same decision control serves micro-theory and guided tasks with targeted feedback', () => {
  const key = 'ipe:response-practice:guided:find-delay-error';
  const hidden = render(createElement(DecisionCheck, { question, answerKey: key }));
  assert.ok(!hidden.includes(question.explanation));
  const selected = render(createElement(DecisionCheck, { question, answerKey: key }), { [key]: 'instant' });
  assert.ok(selected.includes(question.options[1].feedback!));
  assert.ok(selected.includes(question.explanation));
  assert.ok(selected.includes('role="status"'));
});
