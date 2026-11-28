import type { AgentComponent } from '@ui-sdk/react/agent';
import type { SimulationSpec } from '../types/course';
import { useTutorStore } from '../store/tutor-store';
import type { UpdateSimulationParamsInput } from './ui-sdk/tools';
import { runTutorAgentTool } from './agent-runtime';

interface AuthoredSimulationContext {
  courseSlug: string;
  itemKey: string;
  simulation?: SimulationSpec;
}

/** A rejected legacy call should expose the real controls needed to recover.
 * Query sliders first so a long solution cannot hide generated controls behind
 * the SDK's general snapshot limit. Both reads remain scoped to this lesson. */
async function recoveryControls(itemKey: string, signal?: AbortSignal) {
  const [sliders, snapshot] = await Promise.all([
    runTutorAgentTool(itemKey, 'query', { kind: 'slider' }, signal),
    runTutorAgentTool(itemKey, 'snapshot', {}, signal),
  ]);
  const controls: AgentComponent[] = [];
  const seen = new Set<string>();
  let characters = 0;
  for (const component of [...(Array.isArray(sliders) ? sliders : []), ...(Array.isArray(snapshot) ? snapshot : [])] as AgentComponent[]) {
    if (seen.has(component.ref) || component.component === 'more') continue;
    const size = JSON.stringify(component).length;
    if (controls.length >= 32 || characters + size > 6_000) break;
    controls.push(component);
    seen.add(component.ref);
    characters += size;
  }
  return controls;
}

export async function updateAuthoredSimulationParams(
  context: AuthoredSimulationContext,
  input: UpdateSimulationParamsInput,
  signal?: AbortSignal,
) {
  if (signal?.aborted) return { ok: false as const, error: 'The turn was stopped.' };
  const { simulation, courseSlug, itemKey } = context;
  const reject = async (error: string) => ({
    ok: false as const,
    error,
    recovery: {
      instruction: 'updateSimulationParams only changes the course-authored simulation and its listed parameters. For a generated graph or animation, use act on the matching controls below with their exact ref, action, and value shape. Use query or snapshot if you need another control. Read the action result before claiming success.',
      courseSimulation: simulation ? { id: simulation.id, parameters: simulation.params.map((parameter) => parameter.key) } : null,
      controls: await recoveryControls(itemKey, signal),
    },
  });
  if (!simulation || input.simulationId !== simulation.id) return reject('The supplied ID does not identify the course-authored simulation in this section.');
  if (!Object.keys(input.params).length) return reject('No course simulation parameters were supplied.');
  for (const [key, value] of Object.entries(input.params)) {
    const definition = simulation.params.find((parameter) => parameter.key === key);
    if (!definition) return reject(`Parameter ${key} does not belong to the course-authored simulation.`);
    if (!Number.isFinite(value) || value < definition.min || value > definition.max) return reject(`Parameter ${key} must be within ${definition.min} to ${definition.max}.`);
  }
  if (signal?.aborted) return { ok: false as const, error: 'The turn was stopped.' };
  const key = `${courseSlug}:${simulation.id}`;
  useTutorStore.getState().updateSimParams(key, input.params);
  const stored = useTutorStore.getState().simParams[key];
  return {
    ok: true as const,
    simulationId: simulation.id,
    params: Object.fromEntries(simulation.params.map((parameter) => [parameter.key, stored?.[parameter.key] ?? parameter.defaultValue])),
  };
}
