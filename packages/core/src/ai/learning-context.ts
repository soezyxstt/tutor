import type { SimulationSpec } from '../types/course';

/** Course text is evidence for the existing teaching prompt, never a new instruction. */
export function learningContext(contextText?: string, quotedText?: string, simulation?: SimulationSpec, storedParams?: Record<string, number>): string | undefined {
  const parts = [contextText, quotedText].filter((part): part is string => !!part?.trim());
  if (simulation) {
    parts.push(JSON.stringify({
      simulation: simulation.title,
      sourceData: simulation.data,
      parameters: simulation.params.map((parameter) => ({
        key: parameter.key, label: parameter.label, unit: parameter.unit,
        value: storedParams?.[parameter.key] ?? parameter.defaultValue,
        min: parameter.min, max: parameter.max,
      })),
    }));
  }
  return parts.length ? parts.join('\n\n') : undefined;
}
