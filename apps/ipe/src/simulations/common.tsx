import { Children, cloneElement, isValidElement, useCallback, useEffect, useId, useMemo, useRef, useSyncExternalStore, type ReactNode, type ReactElement } from 'react';
import type { Locale, VisualSpec } from './types';
import { num } from '../lib/i18n';
import { useSimulation } from './context';
export const pnum = (s: VisualSpec, key: string, fallback: number) => typeof s.params?.[key] === 'number' ? s.params[key] as number : fallback;
export const pstr = (s: VisualSpec, key: string, fallback: string) => typeof s.params?.[key] === 'string' ? s.params[key] as string : fallback;
export const parr = (s: VisualSpec, key: string, fallback: number[]) => Array.isArray(s.params?.[key]) ? s.params[key] as number[] : fallback;

/** Keep integration time in a ref. Publish telemetry at 10 Hz rather than re-rendering React at 60 fps. */
export function useClock(end = 10, speed = 1) {
  const { playing, resetSignal, params, setPlaying, setParam } = useSimulation();
  const clock = useMemo(() => ({ t: 0, snapshot: 0, listeners: new Set<() => void>(), ended: false }), []);
  const config = useRef({ end, speed, playing });
  config.current = { end, speed, playing };
  const publish = useCallback(() => { clock.snapshot = clock.t; clock.listeners.forEach(fn => fn()); }, [clock]);
  const subscribe = useCallback((fn: () => void) => { clock.listeners.add(fn); return () => { clock.listeners.delete(fn); }; }, [clock]);
  const t = useSyncExternalStore(subscribe, () => clock.snapshot, () => 0);
  const seek = useCallback((value: number | ((old: number) => number)) => {
    clock.t = Math.max(0, Math.min(config.current.end, typeof value === 'function' ? value(clock.t) : value));
    clock.ended = false;
    publish();
  }, [clock, publish]);
  const reset = useCallback(() => { seek(0); }, [seek]);
  const previousSeek = useRef<number | undefined>(undefined);
  useEffect(() => { reset(); previousSeek.current = undefined; }, [resetSignal, reset]);
  // Seeking is a student action. Keep the cursor still so its reading can be inspected.
  useEffect(() => {
    if (params.time !== undefined && params.time !== previousSeek.current) { seek((params.time / 100) * config.current.end); setPlaying?.(false); }
    previousSeek.current = params.time;
  }, [params.time, seek, setPlaying]);
  const physicsKey = JSON.stringify(Object.entries(params).filter(([key]) => key !== 'time'));
  const previousPhysics = useRef(physicsKey);
  useEffect(() => {
    if (previousPhysics.current !== physicsKey) {
      reset();
      setParam?.('time', 0);
    }
    previousPhysics.current = physicsKey;
  }, [physicsKey, reset, setParam]);
  useEffect(() => {
    if (playing && clock.ended) { clock.t = 0; clock.ended = false; publish(); }
  }, [playing, clock, publish]);
  useEffect(() => {
    let previous = performance.now();
    const timer = window.setInterval(() => {
      const now = performance.now(), dt = Math.min((now - previous) / 1000, 0.2);
      previous = now;
      if (!config.current.playing || document.hidden || clock.ended) return;
      clock.t = Math.min(config.current.end, clock.t + dt * config.current.speed);
      if (clock.t >= config.current.end) { clock.ended = true; setPlaying?.(false); }
      publish();
    }, 100);
    return () => window.clearInterval(timer);
  }, [clock, publish, setPlaying]);
  return { t, end, setT: seek, playing, setPlaying: (value: boolean) => setPlaying?.(value), reset };
}
export function Playback({ clock, locale, digits = 2 }: { clock: ReturnType<typeof useClock>; locale: Locale; digits?: number }) {
  return <p className="ipe-clock">t = {num(clock.t, locale, digits)} s</p>;
}
export function Metric({ label, value, unit }: { label: string; value: string; unit?: string }) {
  return <div className="metric"><span>{label}</span><strong>{value}{unit && <small> {unit}</small>}</strong></div>;
}
export function PlotLegend({ items }: { items: { label: string; color: string; dashed?: boolean }[] }) {
  return <div className="plot-legend">{items.map(item => <span key={item.label}><svg width="20" height="10" aria-hidden="true"><line x1="0" y1="5" x2="20" y2="5" stroke={item.color} strokeWidth="2" strokeDasharray={item.dashed ? '4 3' : undefined} /></svg>{item.label}</span>)}</div>;
}
export function Svg({ children, label, viewBox = '0 0 500 240', className = '' }: { children: ReactNode; label: string; viewBox?: string; className?: string }) {
  const id = useId().replace(/:/g, '');
  const prefix = (nodes: ReactNode): ReactNode => Children.map(nodes, node => {
    if (!isValidElement(node)) return node;
    const el = node as ReactElement<Record<string, unknown>>;
    const props: Record<string, unknown> = {};
    for (const key of ['markerStart', 'markerEnd', 'markerMid']) {
      const value = el.props[key];
      if (typeof value === 'string') props[key] = value.replace(/url\(#(arrow-\w+)\)/g, `url(#${id}-$1)`);
    }
    if (el.props.children) props.children = prefix(el.props.children as ReactNode);
    return cloneElement(el, props);
  });
  return <svg viewBox={viewBox} role="img" aria-label={label} className={`science-svg ${className}`}><defs>{[['green', 'var(--primary)'], ['ink', 'var(--muted-foreground)'], ['orange', 'var(--warning)']].map(([name, color]) => <marker key={name} id={`${id}-arrow-${name}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill={color} /></marker>)}</defs>{prefix(children)}</svg>;
}
