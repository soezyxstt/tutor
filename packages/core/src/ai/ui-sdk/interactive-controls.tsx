import * as React from 'react';
import { AgentSlider } from '../agent-controls';
import type { RenderInteractivePlotInput } from './tools';

export function formatNumeric(value: number): string {
  if (!Number.isFinite(value)) return '?';
  if (value === 0) return '0';
  if (Math.abs(value) >= 1e5 || Math.abs(value) < 0.001) return value.toExponential(2);
  return Number(value.toPrecision(4)).toString();
}

export function InteractiveParameterControls({ sliders = [], params, onChange, title }: {
  sliders?: RenderInteractivePlotInput['sliders'];
  params: Record<string, number>;
  onChange: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  title: string;
}) {
  return sliders.length ? (
    <div className="grid min-w-0 grid-cols-1 gap-x-5 gap-y-3 pt-1 sm:grid-cols-2">
      {sliders.map((slider) => {
        const value = params[slider.key] ?? slider.defaultValue;
        return <div key={slider.key} className="min-w-0 space-y-1.5">
          <div className="flex min-w-0 flex-wrap items-baseline justify-between gap-x-3 gap-y-1 text-[13px]">
            <span className="min-w-0 break-words text-muted-foreground">{slider.label}</span>
            <output className="min-w-0 max-w-full break-words font-mono tabular-nums text-foreground">{formatNumeric(value)}{slider.unit ? ` ${slider.unit}` : ''}</output>
          </div>
          <AgentSlider aria-label={`${title}: ${slider.label}`} value={[value]} min={slider.min} max={slider.max} step={slider.step} onValueChange={([next]) => {
            if (typeof next === 'number' && Number.isFinite(next)) onChange((previous) => ({ ...previous, [slider.key]: next }));
          }} />
        </div>;
      })}
    </div>
  ) : null;
}
