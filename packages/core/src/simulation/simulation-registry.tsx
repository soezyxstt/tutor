import * as React from 'react';
import type { SimulationRendererProps } from './damped-oscillator-sim';
import type { SimulationSpec } from '../types/course';

export type SimulationContextState = Readonly<Record<string, string | number | boolean>>;
type ContextResolver = (spec: SimulationSpec, params: Readonly<Record<string, number>>, state: SimulationContextState) => Record<string, unknown>;

type LazySimComponent = React.LazyExoticComponent<
  React.ComponentType<SimulationRendererProps>
>;

const registry = new Map<string, { component: LazySimComponent; context?: ContextResolver }>([
  [
    'damped-oscillator',
    { component: React.lazy(() => import('./damped-oscillator-sim')) },
  ],
]);

/**
 * Register a lazy-loaded visualization component (e.g. R3F, Rapier, Mafs, ECharts)
 * so heavy libraries are only downloaded when a problem actually renders it.
 */
export function registerSimulation(
  type: string,
  loader: () => Promise<{ default: React.ComponentType<SimulationRendererProps> }>,
  context?: ContextResolver,
) {
  registry.set(type, { component: React.lazy(loader), context });
}

export function getSimulationComponent(type: string): LazySimComponent | undefined {
  return registry.get(type)?.component;
}

const emptyState: SimulationContextState = Object.freeze({});
const contextStates = new Map<string, SimulationContextState>();
const listeners = new Set<() => void>();
const subscribe = (listener: () => void) => { listeners.add(listener); return () => { listeners.delete(listener); }; };

/** Transient choices such as sensor type, shared by the visual and its tutor.
 * Derived values are calculated from current controls, never cached here. */
export function useSimulationContextState(key?: string): SimulationContextState {
  const snapshot = React.useCallback(() => key ? contextStates.get(key) ?? emptyState : emptyState, [key]);
  return React.useSyncExternalStore(subscribe, snapshot, () => emptyState);
}

export function updateSimulationContextState(key: string, patch: SimulationContextState) {
  const current = contextStates.get(key) ?? emptyState;
  if (Object.entries(patch).every(([name, value]) => current[name] === value)) return;
  contextStates.set(key, { ...current, ...patch });
  listeners.forEach((listener) => listener());
}

export function clearSimulationContextState(key: string) {
  if (contextStates.delete(key)) listeners.forEach((listener) => listener());
}

export function describeSimulation(spec: SimulationSpec, params: Readonly<Record<string, number>>, state: SimulationContextState = emptyState) {
  return registry.get(spec.type)?.context?.(spec, params, state);
}
