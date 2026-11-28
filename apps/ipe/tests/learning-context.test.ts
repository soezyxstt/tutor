import test from 'node:test';
import assert from 'node:assert/strict';
import type { SimulationSpec } from '@tutor/core';
import { learningContext } from '../../../packages/core/src/ai/learning-context';

test('inline AI receives the visible source, highlighted quote, current values, units, and fixed model data', () => {
  const simulation: SimulationSpec = {
    id: 'ipe-flow', type: 'ipe-orifice', title: 'Flow through an orifice',
    data: { visualKind: 'orifice', convention: 'vena', rho: 1000, sampleHeights: [0, 0.1, 0.2] },
    params: [
      { key: 'pressure', label: 'Pressure difference', unit: 'kPa', min: 0, max: 100, step: 0.1, defaultValue: 30 },
      { key: 'Cd', label: 'Discharge coefficient', min: 0, max: 1, step: 0.01, defaultValue: 0.65 },
    ],
  };
  const snapshot = structuredClone(simulation);
  const source = 'The pipe diameter is 0.09 m. Use the vena-contracta convention.';
  const quote = 'Why does the area ratio appear in this equation?';
  const output = learningContext(source, quote, simulation, { pressure: 0, unknown: 999 });
  assert.ok(output?.startsWith(`${source}\n\n${quote}\n\n`), 'A highlighted quote must not replace the actual problem context');
  const data = JSON.parse(output!.split('\n\n').at(-1)!);
  assert.deepEqual(data.sourceData, simulation.data, 'Fixed geometry and coefficient conventions are evidence for the tutor');
  assert.deepEqual(data.parameters, [
    { key: 'pressure', label: 'Pressure difference', unit: 'kPa', value: 0, min: 0, max: 100 },
    { key: 'Cd', label: 'Discharge coefficient', value: 0.65, min: 0, max: 1 },
  ], 'Use current values, including zero, with defaults only for untouched controls');
  assert.deepEqual(simulation, snapshot, 'Assembling AI context does not change the source model');
  assert.equal(learningContext(undefined, '  '), undefined);
  assert.equal(learningContext(source), source);
  assert.equal(learningContext(undefined, quote), quote);
});
