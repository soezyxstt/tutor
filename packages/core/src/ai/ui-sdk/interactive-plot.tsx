import { useLanguage } from '../../i18n/language-provider';
import * as React from 'react';
import { RotateCcw } from 'lucide-react';
import { Button, Slider } from '@tutor/ui';
import { compileMathExpression } from './safe-math';
import type { RenderInteractivePlotInput } from './tools';

const COLOR_VAR: Record<string, string> = {
  primary: '--primary',
  success: '--success',
  warning: '--warning',
  destructive: '--destructive',
};

export default function InteractivePlotBlock({
  data,
}: {
  data: RenderInteractivePlotInput;
}) {
  const defaults = React.useMemo(() => {
    const map: Record<string, number> = {};
    for (const s of data.sliders ?? []) {
      map[s.key] = s.defaultValue;
    }
    return map;
  }, [data.sliders]);

  const [params, setParams] = React.useState<Record<string, number>>(defaults);
  const [hoverX, setHoverX] = React.useState<number | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const { t } = useLanguage();

  const compiledCurves = React.useMemo(
    () =>
      data.curves.map((c) => ({
        ...c,
        fn: compileMathExpression(c.expression),
      })),
    [data.curves]
  );

  const [xMin, xMax] = data.xDomain;

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(rect.width, 280);
    const height = Math.max(rect.height, 190);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    ctx.save();
    ctx.scale(dpr, dpr);

    const styles = getComputedStyle(document.documentElement);
    const fg = styles.getPropertyValue('--foreground').trim() || '#18181b';
    const mutedFg =
      styles.getPropertyValue('--muted-foreground').trim() || '#57534e';
    const border = styles.getPropertyValue('--border').trim() || '#e5e2da';
    const bgSubtle =
      styles.getPropertyValue('--surface-subtle').trim() || '#f3f1ec';

    ctx.fillStyle = bgSubtle;
    ctx.fillRect(0, 0, width, height);

    const padL = 38;
    const padR = 14;
    const padT = 18;
    const padB = 26;
    const plotW = width - padL - padR;
    const plotH = height - padT - padB;

    const samples = 220;
    const series: { color: string; label: string; pts: { x: number; y: number }[] }[] = [];
    let yMin = Infinity;
    let yMax = -Infinity;

    for (const c of compiledCurves) {
      const pts: { x: number; y: number }[] = [];
      for (let i = 0; i <= samples; i++) {
        const x = xMin + ((xMax - xMin) * i) / samples;
        const y = c.fn({ ...params, x, t: x });
        if (Number.isFinite(y) && Math.abs(y) < 1e5) {
          pts.push({ x, y });
          if (y < yMin) yMin = y;
          if (y > yMax) yMax = y;
        }
      }
      const varName = COLOR_VAR[c.color ?? 'primary'] ?? '--primary';
      const resolvedColor =
        styles.getPropertyValue(varName).trim() || '#1e5269';
      series.push({ color: resolvedColor, label: c.label, pts });
    }

    if (!Number.isFinite(yMin) || !Number.isFinite(yMax) || yMin === yMax) {
      yMin = -1;
      yMax = 1;
    } else {
      const span = yMax - yMin;
      yMin -= span * 0.12;
      yMax += span * 0.12;
    }

    const toPx = (x: number) => padL + ((x - xMin) / (xMax - xMin)) * plotW;
    const toPy = (y: number) => padT + ((yMax - y) / (yMax - yMin)) * plotH;

    // Subtle horizontal gridlines
    ctx.strokeStyle = border;
    ctx.lineWidth = 1;
    for (let g = 0; g <= 4; g++) {
      const gy = padT + (plotH * g) / 4;
      ctx.beginPath();
      ctx.moveTo(padL, gy);
      ctx.lineTo(width - padR, gy);
      ctx.stroke();

      const yVal = yMax - ((yMax - yMin) * g) / 4;
      ctx.fillStyle = mutedFg;
      ctx.font = '500 9.5px ui-monospace, monospace';
      ctx.textAlign = 'right';
      ctx.textBaseline = 'middle';
      ctx.fillText(yVal.toFixed(1), padL - 6, gy);
    }

    // Zero axis if inside range
    if (yMin < 0 && yMax > 0) {
      const y0 = toPy(0);
      ctx.strokeStyle = mutedFg;
      ctx.globalAlpha = 0.45;
      ctx.beginPath();
      ctx.moveTo(padL, y0);
      ctx.lineTo(width - padR, y0);
      ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // Draw curves
    for (const s of series) {
      if (s.pts.length < 2) continue;
      ctx.strokeStyle = s.color;
      ctx.lineWidth = 1.9;
      ctx.beginPath();
      s.pts.forEach((pt, idx) => {
        const px = toPx(pt.x);
        const py = toPy(pt.y);
        if (idx === 0) ctx.moveTo(px, py);
        else ctx.lineTo(px, py);
      });
      ctx.stroke();
    }

    // Hover crosshair
    if (hoverX !== null && hoverX >= xMin && hoverX <= xMax) {
      const hx = toPx(hoverX);
      ctx.save();
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = mutedFg;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(hx, padT);
      ctx.lineTo(hx, padT + plotH);
      ctx.stroke();
      ctx.restore();

      const readout: string[] = [`${data.xLabel || 'x'}=${hoverX.toFixed(2)}`];
      compiledCurves.forEach((c, idx) => {
        const y = c.fn({ ...params, x: hoverX, t: hoverX });
        if (Number.isFinite(y)) {
          const py = toPy(y);
          ctx.fillStyle = series[idx].color;
          ctx.beginPath();
          ctx.arc(hx, py, 3.2, 0, Math.PI * 2);
          ctx.fill();
          readout.push(`${c.label}=${y.toFixed(2)}`);
        }
      });

      ctx.fillStyle = fg;
      ctx.font = '500 10px ui-monospace, monospace';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(readout.join('  ·  '), padL + 4, 4);
    }

    // X-axis ticks
    ctx.fillStyle = mutedFg;
    ctx.font = '500 9.5px ui-monospace, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    for (let t = 0; t <= 4; t++) {
      const xv = xMin + ((xMax - xMin) * t) / 4;
      ctx.fillText(xv.toFixed(1), toPx(xv), padT + plotH + 6);
    }

    ctx.restore();
  }, [compiledCurves, data.xLabel, hoverX, params, xMax, xMin]);

  const handlePointerMove = (e: React.PointerEvent<HTMLCanvasElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const padL = 38;
    const padR = 14;
    const rel = (e.clientX - rect.left - padL) / Math.max(rect.width - padL - padR, 1);
    if (rel >= 0 && rel <= 1) {
      setHoverX(xMin + rel * (xMax - xMin));
    } else {
      setHoverX(null);
    }
  };

  return (
    <div className="my-2.5 space-y-2.5 border-y border-border/80 py-3">
      <div className="flex items-center justify-between gap-2">
        <div className="text-xs font-semibold text-foreground">{data.title}</div>
        {(data.sliders?.length ?? 0) > 0 && (
          <Button
            variant="icon"
            size="icon-xs"
            aria-label={t('Reset parameter grafik', 'Reset plot parameters')}
            onClick={() => setParams(defaults)}
          >
            <RotateCcw className="size-3" />
          </Button>
        )}
      </div>

      <canvas
        ref={canvasRef}
        onPointerMove={handlePointerMove}
        onPointerLeave={() => setHoverX(null)}
        aria-label={data.title}
        className="block h-[200px] w-full cursor-crosshair rounded-md"
      />

      {/* Curve Legend */}
      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] text-muted-foreground">
        {data.curves.map((c, idx) => (
          <span key={idx} className="inline-flex items-center gap-1.5">
            <span
              className="size-2 rounded-full"
              style={{
                backgroundColor: `var(${COLOR_VAR[c.color ?? 'primary'] ?? '--primary'})`,
              }}
            />
            <span className="font-mono text-foreground">{c.label}</span>
          </span>
        ))}
      </div>

      {/* Live Parameter Sliders */}
      {data.sliders && data.sliders.length > 0 && (
        <div className="grid grid-cols-1 gap-x-5 gap-y-2.5 pt-1 sm:grid-cols-2">
          {data.sliders.map((s) => {
            const val = params[s.key] ?? s.defaultValue;
            return (
              <div key={s.key} className="space-y-1">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">{s.label}</span>
                  <span className="font-mono font-medium text-foreground">
                    {val.toFixed(s.step < 1 ? 2 : 0)}
                    {s.unit ? ` ${s.unit}` : ''}
                  </span>
                </div>
                <Slider
                  value={[val]}
                  min={s.min}
                  max={s.max}
                  step={s.step}
                  onValueChange={([next]) => {
                    if (typeof next === 'number') {
                      setParams((prev) => ({ ...prev, [s.key]: next }));
                    }
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
