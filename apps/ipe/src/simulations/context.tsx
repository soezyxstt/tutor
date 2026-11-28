import { createContext, useCallback, useContext, useMemo, type Dispatch, type SetStateAction } from 'react';
import type { SimulationRendererProps } from '@tutor/core';

export const SimulationContext = createContext<SimulationRendererProps | null>(null);
export function useSimulation() {
  const value = useContext(SimulationContext);
  if (!value) throw new Error('IPE simulations require the shared simulation stage');
  return value;
}
/** Numeric inputs use the same store as the shared sliders and AI tools. */
export function useParamState(key: string, fallback: number): [number, Dispatch<SetStateAction<number>>] {
  const { params, setParam } = useSimulation();
  const value = params[key] ?? fallback;
  const setter = useCallback<Dispatch<SetStateAction<number>>>((next) => {
    const resolved = typeof next === 'function' ? next(value) : next;
    if (Number.isFinite(resolved)) setParam?.(key, resolved);
  }, [key, value, setParam]);
  return [value, setter];
}
export function useParamArray(source: number[]): [number[], Dispatch<SetStateAction<number[]>>] {
  const { params, setParam } = useSimulation();
  const values = useMemo(() => source.map((v, i) => params[`value${i}`] ?? v), [source, params]);
  const setter = useCallback<Dispatch<SetStateAction<number[]>>>((next) => {
    const resolved = typeof next === 'function' ? next(values) : next;
    resolved.forEach((value, i) => { if (value !== values[i]) setParam?.(`value${i}`, value); });
  }, [values, setParam]);
  return [values, setter];
}
