import test from 'node:test';
import assert from 'node:assert/strict';
import type { SimulationSpec } from '@tutor/core';
import { learningContext } from '../../../packages/core/src/ai/learning-context';
import { registerSimulation } from '../../../packages/core/src/simulation/simulation-registry';
import { thermocoupleContext, thermocoupleState } from '../src/simulations/thermocouple-context';

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

const thermocouple: SimulationSpec = {
  id: 'thermocouple-context-test', type: 'ipe-thermocouple', title: 'Thermocouple',
  data: { visualKind: 'thermocouple', type: 'J', T: 252.946, Tref: 20, measuredMv: 12.7, rangeMax: 400 },
  params: [
    { key: 'temperature', label: 'Temperature', unit: '°C', min: 0, max: 400, step: 1, defaultValue: 252.946 },
    { key: 'referenceTemperature', label: 'Reference temperature', unit: '°C', min: 0, max: 400, step: 1, defaultValue: 20 },
  ],
};
registerSimulation('ipe-thermocouple', async () => ({ default: () => null }), thermocoupleContext);

function thermocoupleEvidence(referenceTemperature: number, type = 'J') {
  return JSON.parse(learningContext(undefined, undefined, thermocouple, {
    temperature: 252.946, referenceTemperature,
  }, { thermocoupleType: type })!);
}

test('thermocouple AI evidence distinguishes live forward voltage from the fixed source-voltage inverse problem', () => {
  const before = thermocoupleEvidence(20);
  const after = thermocoupleEvidence(25);
  assert.equal(after.parameters.find((p: { key: string }) => p.key === 'temperature').value, 252.946);
  assert.equal(after.sourceData.measuredMv, 12.7, 'Original exam reading stays intact');
  assert.match(after.sourceDataRole, /Immutable.*not live/);
  const initial = before.modelContext;
  const changed = after.modelContext;
  assert.ok(Math.abs(initial.computedOutputs.measuredVoltage.value - 12.699571160380092) < 1e-10);
  assert.ok(Math.abs(changed.computedOutputs.measuredVoltage.value - 12.441432051096637) < 1e-10);
  assert.ok(changed.computedOutputs.measuredVoltage.value < initial.computedOutputs.measuredVoltage.value, 'At fixed hot temperature, a warmer reference lowers live voltage');
  assert.ok(changed.fixedVoltageInverseProblem.inferredTemperatureC > initial.fixedVoltageInverseProblem.inferredTemperatureC, 'At fixed measured voltage, a warmer reference raises inferred hot temperature');
  assert.ok(Math.abs(changed.fixedVoltageInverseProblem.inferredTemperatureC - 257.6048800777181) < 1e-8);
  assert.match(changed.mode, /forward/);
  assert.match(changed.fixedVoltageInverseProblem.role, /separate inverse/);
  assert.deepEqual(thermocouple.data, { visualKind: 'thermocouple', type: 'J', T: 252.946, Tref: 20, measuredMv: 12.7, rangeMax: 400 });
});

test('thermocouple evidence follows current type and controls without retaining prior computed values', () => {
  for (const type of ['K', 'T', 'J']) {
    for (const reference of [25, 0, 35, 20]) {
      const evidence = thermocoupleEvidence(reference, type).modelContext;
      const rendered = thermocoupleState(252.946, reference, type, 400);
      assert.equal(evidence.selectedThermocoupleType, type);
      assert.equal(evidence.controlledInputs.referenceTemperature.value, reference);
      assert.equal(evidence.computedOutputs.measuredVoltage.value, rendered.measured);
      assert.equal(evidence.computedOutputs.referenceCorrection.value, rendered.eCold);
    }
  }
  assert.equal(thermocoupleEvidence(400).modelContext.fixedVoltageInverseProblem.inferredTemperatureC, null, 'Out-of-range inverse cases do not invent a temperature');
});
