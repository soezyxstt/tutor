import test from 'node:test';
import assert from 'node:assert/strict';
import { compileMathExpression, samplePlotCurve } from '../packages/core/src/ai/ui-sdk/safe-math';
import { validateAiToolCall } from '../packages/core/src/ai/ui-sdk/tools';
import { buildTutorSystemPrompt } from '../packages/core/src/server/teaching-prompt';

const plot = {
  title: 'First-order response', xDomain: [0, 5], curves: [{ label: 'Response', expression: '1-exp(-x/tau)' }],
  sliders: [{ key: 'tau', label: 'Time constant', unit: 's', min: 0.1, max: 4, step: 0.1, defaultValue: 1 }],
};
const simulation = {
  title: 'First-order response', description: 'Unit step input with a time constant of 1 s.', duration: 5,
  xDomain: [0, 5], yDomain: [0, 1.1], xLabel: 'Time (s)', yLabel: 'Response',
  particles: [{ label: 'Response', xExpression: 't', yExpression: '1-exp(-t/tau)', trail: true }],
  readouts: [{ label: 'Response', expression: '1-exp(-t/tau)' }], sliders: plot.sliders,
};

test('math expressions follow standard powers, signs, and scientific notation', () => {
  for (const [expression, expected] of [['-x^2', -9], ['(-x)^2', 9], ['2^-2', 0.25], ['2^3^2', 512], ['-2^-2', -0.25], ['1e-3+2E-3', 0.003], ['sin(pi/2)', 1], ['max(1,3,2)', 3], ['atan2(1,1)', Math.PI / 4]] as const) {
    assert.ok(Math.abs(compileMathExpression(expression)({ x: 3 }) - expected) < 1e-12, expression);
  }
  assert.ok(Number.isNaN(compileMathExpression('missing+1')({})));
  assert.ok(Number.isNaN(compileMathExpression('1/x')({ x: 0 })));
});

test('math parser rejects malformed syntax and executable input instead of silently changing it', () => {
  for (const expression of ['', '2x', '1.2.3', 'x)', '(x', 'sin()', 'sin(1,2)', 'unknown(x)', 'constructor(x)', 'x;alert(1)', 'Math.sin(x)', 'x[0]', '2**3', '\\frac{1}{x}', '1e999', '2 +', ')', '('.repeat(50) + '1' + ')'.repeat(50)]) assert.throws(() => compileMathExpression(expression), undefined, expression);
  assert.throws(() => compileMathExpression('x+unknown', ['x']), /Unknown variable/);
  assert.throws(() => compileMathExpression('1+'.repeat(200) + '1'), /complex/);
});

test('curve samples preserve undefined gaps and do not connect across off-grid poles', () => {
  const centered = samplePlotCurve(compileMathExpression('1/x'), {}, -1, 1, 20);
  assert.ok(centered.includes(null));
  const shifted = samplePlotCurve(compileMathExpression('1/(x-0.025)'), {}, -1, 1, 20);
  const positive = shifted.findIndex((point) => point !== null && point.x > 0.025);
  assert.equal(shifted[positive - 1], null);
  assert.ok(samplePlotCurve(compileMathExpression('sqrt(x)'), {}, -1, 1, 20).slice(0, 10).every((point) => point === null));
  assert.ok(samplePlotCurve(compileMathExpression('x'), {}, -1, 1, 20).every((point) => point !== null));
});

test('valid graph and time-based simulation specifications keep physical values', () => {
  assert.equal(validateAiToolCall('renderInteractivePlot', plot).ok, true);
  assert.equal(validateAiToolCall('renderInteractiveSimulation', simulation).ok, true);
  const response = compileMathExpression(simulation.particles[0].yExpression, ['t', 'tau']);
  assert.equal(response({ t: 0, tau: 1 }), 0);
  assert.ok(Math.abs(response({ t: 1, tau: 1 }) - 0.6321205588285577) < 1e-12);
  assert.ok(Math.abs(response({ t: 2, tau: 2 }) - response({ t: 1, tau: 1 })) < 1e-12);
});

test('invalid generated controls and curves produce repairable feedback', () => {
  const invalid = [
    { ...plot, xDomain: [1, 1] }, { ...plot, xDomain: [5, 0] },
    { ...plot, xDomain: [0, Number.MIN_VALUE] },
    { ...plot, curves: [{ label: 'Missing parameter', expression: 'a*x' }] },
    { ...plot, curves: [{ label: 'Undefined domain', expression: 'sqrt(-x-1)' }] },
    { ...plot, sliders: [{ ...plot.sliders[0], step: 0 }] },
    { ...plot, sliders: [{ ...plot.sliders[0], step: Number.MIN_VALUE }] },
    { ...plot, sliders: [{ ...plot.sliders[0], defaultValue: 8 }] },
    { ...plot, sliders: [{ ...plot.sliders[0], max: 0 }] },
    { ...plot, sliders: [{ ...plot.sliders[0], key: 't' }] },
    { ...plot, sliders: [plot.sliders[0], plot.sliders[0]] },
    { title: 'No data' }, null,
  ];
  for (const args of invalid) {
    const result = validateAiToolCall('renderInteractivePlot', args);
    assert.equal(result.ok, false, JSON.stringify(args));
    if (!result.ok) assert.ok(result.error.length > 0);
  }
  assert.equal(validateAiToolCall('notARealTool', {}).ok, false);
  assert.equal(validateAiToolCall('renderInteractiveSimulation', { ...simulation, duration: 0 }).ok, false);
  assert.equal(validateAiToolCall('renderInteractiveSimulation', { ...simulation, particles: [{ ...simulation.particles[0], yExpression: '1/t' }] }).ok, false);
  assert.equal(validateAiToolCall('renderInteractiveSimulation', { ...simulation, particles: [{ ...simulation.particles[0], yExpression: 'window.fetch(1)' }] }).ok, false);
});

test('surfaces, vectors, quiz keys, and table dimensions require valid content', () => {
  assert.equal(validateAiToolCall('renderInteractive3D', { title: 'Surface', mode: 'surface', surfaceExpression: 'x^2+y^2' }).ok, true);
  assert.equal(validateAiToolCall('renderInteractive3D', { title: 'Empty', mode: 'surface' }).ok, false);
  assert.equal(validateAiToolCall('renderInteractive3D', { title: 'Empty', mode: 'vectors', vectors: [] }).ok, false);
  assert.equal(validateAiToolCall('renderInteractive3D', { title: 'Misleading slider', mode: 'vectors', vectors: [{ label: 'a', x: 1, y: 0, z: 0 }], sliders: plot.sliders }).ok, false);
  assert.equal(validateAiToolCall('showQuickQuiz', { question: 'Which?', options: [{ id: 'a', label: 'A' }, { id: 'b', label: 'B' }], correctOptionId: 'c', explanation: 'Because' }).ok, false);
  assert.equal(validateAiToolCall('showComparisonTable', { title: 'Table', columns: ['A', 'B'], rows: [['one']] }).ok, false);
});

test('both tutor languages require render calls and honest UI action results', () => {
  for (const language of ['id', 'en'] as const) {
    const prompt = buildTutorSystemPrompt({ language, uiContext: '{"snapshot":"visible controls"}' });
    assert.match(prompt, /renderInteractiveSimulation/);
    assert.match(prompt, /snapshot/);
    assert.match(prompt, /visible controls/);
    assert.match(prompt, language === 'id' ? /panggil alat yang sesuai pada giliran ini/ : /call the matching render or quiz tool in this turn/);
    assert.doesNotMatch(prompt, /[\u2013\u2014]/);
  }
});
