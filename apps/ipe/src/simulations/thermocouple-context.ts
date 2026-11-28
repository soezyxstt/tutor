import type { SimulationSpec } from '@tutor/core';
import { thermocoupleEMF } from '../lib/models';

/** The visual and AI context use this same forward calculation. */
export function thermocoupleState(temperature: number, referenceTemperature: number, selectedType = 'J', rangeMax?: number) {
  const type = ['J', 'K', 'T'].includes(selectedType) ? selectedType : 'J';
  const maximum = Math.min(type === 'T' ? 400 : 500, rangeMax ?? (type === 'T' ? 400 : 500));
  const hot = Math.min(maximum, Math.max(0, temperature));
  const cold = Math.min(maximum, Math.max(0, referenceTemperature));
  const eHot = thermocoupleEMF(hot, type);
  const eCold = thermocoupleEMF(cold, type);
  return { type, maximum, hot, cold, eHot, eCold, measured: eHot - eCold };
}

function inferHotTemperature(measuredMv: number, referenceTemperature: number, type: string, maximum: number): number | null {
  const target = measuredMv + thermocoupleEMF(referenceTemperature, type);
  if (!Number.isFinite(target) || target < thermocoupleEMF(0, type) || target > thermocoupleEMF(maximum, type)) return null;
  let lower = 0;
  let upper = maximum;
  for (let i = 0; i < 55; i++) {
    const middle = (lower + upper) / 2;
    if (thermocoupleEMF(middle, type) < target) lower = middle;
    else upper = middle;
  }
  return (lower + upper) / 2;
}

export function thermocoupleContext(spec: SimulationSpec, params: Readonly<Record<string, number>>, state: Readonly<Record<string, string | number | boolean>> = {}) {
  const source = spec.data ?? {};
  const sourceNumber = (key: string, fallback: number) => typeof source[key] === 'number' ? source[key] as number : fallback;
  const selectedType = typeof state.thermocoupleType === 'string' ? state.thermocoupleType : typeof source.type === 'string' ? source.type : 'J';
  const current = thermocoupleState(
    params.temperature ?? sourceNumber('T', 200),
    params.referenceTemperature ?? sourceNumber('Tref', 20),
    selectedType,
    typeof source.rangeMax === 'number' ? source.rangeMax : undefined,
  );
  const sourceReading = typeof source.measuredMv === 'number' ? source.measuredMv : undefined;
  return {
    model: 'ITS-90 thermocouple reference function',
    mode: 'forward: controlled junction temperatures determine voltage',
    selectedThermocoupleType: current.type,
    controlledInputs: {
      temperature: { meaning: 'measuring junction temperature; independent input, not a solved result', value: current.hot, unit: '°C' },
      referenceTemperature: { meaning: 'reference junction temperature; independent input', value: current.cold, unit: '°C' },
    },
    computedOutputs: {
      measuringJunctionEmfAtZeroReference: { value: current.eHot, unit: 'mV' },
      referenceCorrection: { value: current.eCold, unit: 'mV' },
      measuredVoltage: { value: current.measured, unit: 'mV', role: 'live model output; changes when either input changes' },
    },
    equation: 'E_measured = E_0(temperature) - E_0(referenceTemperature)',
    changingReferenceWithTemperatureFixed: 'Raising referenceTemperature while temperature stays fixed increases E_0(referenceTemperature), lowers the live measured voltage, and leaves the temperature control unchanged.',
    fixedVoltageInverseProblem: {
      role: 'A separate inverse calculation with measured voltage held fixed; this is not the current simulation control mode.',
      equation: 'E_0(T_inferred) = E_measured_fixed + E_0(referenceTemperature)',
      direction: 'Within the supported increasing reference curve, raising referenceTemperature while measured voltage stays fixed raises the inferred measuring-junction temperature.',
      ...(sourceReading === undefined ? {} : {
        fixedVoltageFromSourceMv: sourceReading,
        sourceReferenceTemperatureC: sourceNumber('Tref', 20),
        usingCurrentReferenceTemperatureC: current.cold,
        inferredTemperatureC: inferHotTemperature(sourceReading, current.cold, current.type, current.maximum),
        rangeNote: 'A null inferred temperature means the fixed-voltage case lies outside the visible supported range.',
      }),
    },
    sourceValueRole: 'sourceData.measuredMv, T, Tref, and type are original problem values. Live controls, selected type, and computed outputs above describe the current visual.',
    numericalNote: 'The visual uses the continuous reference function; rounded printed tables can give slightly different temperatures and voltages.',
  };
}
