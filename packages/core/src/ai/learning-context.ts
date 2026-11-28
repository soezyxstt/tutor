import type { SimulationSpec } from '../types/course';
import { describeSimulation } from '../simulation/simulation-registry';
import type { SimulationContextState } from '../simulation/simulation-registry';

/** Course text is evidence for the existing teaching prompt, never a new instruction. */
export function learningContext(contextText?: string, quotedText?: string, simulation?: SimulationSpec, storedParams?: Record<string, number>, contextState?: SimulationContextState): string | undefined {
  const parts = [contextText, quotedText].filter((part): part is string => !!part?.trim());
  if (simulation) {
    const currentValues = Object.fromEntries(simulation.params.map((parameter) => [parameter.key, storedParams?.[parameter.key] ?? parameter.defaultValue]));
    parts.push(JSON.stringify({
      simulation: simulation.title,
      sourceData: simulation.data,
      sourceDataRole: 'Immutable values from the source problem. These are not live simulation readings or current controls.',
      parameters: simulation.params.map((parameter) => ({
        key: parameter.key, label: parameter.label, unit: parameter.unit,
        value: currentValues[parameter.key],
        min: parameter.min, max: parameter.max,
      })),
      modelContext: describeSimulation(simulation, currentValues, contextState),
    }));
  }
  return parts.length ? parts.join('\n\n') : undefined;
}
