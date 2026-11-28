import * as React from 'react';
import type { SimulationRendererProps } from './damped-oscillator-sim';

type LazySimComponent = React.LazyExoticComponent<
  React.ComponentType<SimulationRendererProps>
>;

const registry = new Map<string, LazySimComponent>([
  [
    'damped-oscillator',
    React.lazy(() => import('./damped-oscillator-sim')),
  ],
]);

/**
 * Register a lazy-loaded visualization component (e.g. R3F, Rapier, Mafs, ECharts)
 * so heavy libraries are only downloaded when a problem actually renders it.
 */
export function registerSimulation(
  type: string,
  loader: () => Promise<{ default: React.ComponentType<SimulationRendererProps> }>
) {
  registry.set(type, React.lazy(loader));
}

export function getSimulationComponent(type: string): LazySimComponent | undefined {
  return registry.get(type);
}
