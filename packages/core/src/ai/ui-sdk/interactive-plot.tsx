import * as React from 'react';
import { RotateCcw } from 'lucide-react';
import { useTheme } from '@tutor/ui';
import { useLanguage } from '../../i18n/language-provider';
import { AgentButton, AgentSlider } from '../agent-controls';
import { compileMathExpression, samplePlotCurve, type PlotPoint } from './safe-math';
import { formatNumeric, InteractiveParameterControls } from './interactive-controls';
import type { RenderInteractivePlotInput } from './tools';

const COLOR_VAR: Record<string, string> = { primary: '--primary', success: '--success', warning: '--warning', destructive: '--destructive' };

export default function InteractivePlotBlock({ data }: { data: RenderInteractivePlotInput }) {
  const defaults = React.useMemo(() => Object.fromEntries((data.sliders ?? []).map((slider) => [slider.key, slider.defaultValue])), [data.sliders]);
  const [params, setParams] = React.useState<Record<string, number>>(defaults);
  const [probe, setProbe] = React.useState((data.xDomain[0] + data.xDomain[1]) / 2);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const compiled = React.useMemo(() => data.curves.map((curve) => ({ ...curve, fn: compileMathExpression(curve.expression) })), [data.curves]);
  const [xMin, xMax] = data.xDomain;
  const series = React.useMemo(() => compiled.map((curve) => ({ ...curve, points: samplePlotCurve(curve.fn, params, xMin, xMax, 320) })), [compiled, params, xMin, xMax]);
  const hasValues = series.some((curve) => curve.points.some(Boolean));

  const draw = React.useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    if (!canvas || !context) return;
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, rect.width); const height = Math.max(1, rect.height);
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    canvas.width = Math.round(width * dpr); canvas.height = Math.round(height * dpr);
    context.scale(dpr, dpr);
    const styles = getComputedStyle(document.documentElement);
    const muted = styles.getPropertyValue('--muted-foreground').trim();
    const border = styles.getPropertyValue('--border').trim();
    const foreground = styles.getPropertyValue('--foreground').trim();
    const colors = series.map((curve) => styles.getPropertyValue(COLOR_VAR[curve.color ?? 'primary']).trim());
    context.fillStyle = styles.getPropertyValue('--surface-subtle').trim();
    context.fillRect(0, 0, width, height);
    const pad = { left: width < 360 ? 43 : 50, right: 20, top: 22, bottom: 30 };
    const plotWidth = width - pad.left - pad.right; const plotHeight = height - pad.top - pad.bottom;
    const values = series.flatMap((curve) => curve.points.filter((point): point is PlotPoint => point !== null).map((point) => point.y));
    let yMin = values.length ? Math.min(...values) : -1;
    let yMax = values.length ? Math.max(...values) : 1;
    const range = yMax - yMin;
    const margin = Number.isFinite(range) && range > 0 ? range * 0.1 : Math.max(1, Math.abs(yMin) * 0.1);
    yMin -= margin; yMax += margin;
    if (!Number.isFinite(yMax - yMin)) { yMin = -1e308; yMax = 1e308; }
    const xPixel = (x: number) => pad.left + (x - xMin) / (xMax - xMin) * plotWidth;
    const yPixel = (y: number) => pad.top + ((yMax / 2 - y / 2) / (yMax / 2 - yMin / 2)) * plotHeight;
    context.font = '11px ui-monospace, monospace'; context.lineWidth = 1;
    for (let index = 0; index <= 4; index++) {
      const vertical = pad.top + plotHeight * index / 4;
      context.strokeStyle = border; context.beginPath(); context.moveTo(pad.left, vertical); context.lineTo(width - pad.right, vertical); context.stroke();
      context.fillStyle = muted; context.textAlign = 'right'; context.textBaseline = 'middle';
      context.fillText(formatNumeric((yMax / 2 - (yMax / 2 - yMin / 2) * index / 4) * 2), pad.left - 6, vertical, pad.left - 8);
      const xValue = xMin + (xMax - xMin) * index / 4;
      context.textAlign = 'center'; context.textBaseline = 'top';
      context.fillText(formatNumeric(xValue), xPixel(xValue), pad.top + plotHeight + 7);
    }
    if (yMin <= 0 && yMax >= 0) {
      context.strokeStyle = muted; context.globalAlpha = 0.5; context.beginPath(); context.moveTo(pad.left, yPixel(0)); context.lineTo(width - pad.right, yPixel(0)); context.stroke(); context.globalAlpha = 1;
    }
    context.save(); context.beginPath(); context.rect(pad.left, pad.top, plotWidth, plotHeight); context.clip();
    series.forEach((curve, index) => {
      context.strokeStyle = colors[index]; context.lineWidth = 2; context.beginPath();
      let started = false;
      for (const point of curve.points) {
        if (!point) { started = false; continue; }
        if (!started) context.moveTo(xPixel(point.x), yPixel(point.y));
        else context.lineTo(xPixel(point.x), yPixel(point.y));
        started = true;
      }
      context.stroke();
    });
    context.strokeStyle = muted; context.setLineDash([3, 3]); context.beginPath(); context.moveTo(xPixel(probe), pad.top); context.lineTo(xPixel(probe), pad.top + plotHeight); context.stroke(); context.setLineDash([]);
    compiled.forEach((curve, index) => {
      const value = curve.fn({ ...params, x: probe, t: probe });
      if (!Number.isFinite(value)) return;
      context.fillStyle = colors[index]; context.beginPath(); context.arc(xPixel(probe), yPixel(value), 3.5, 0, 2 * Math.PI); context.fill();
    });
    context.restore();
    context.fillStyle = foreground; context.font = '12px system-ui, sans-serif'; context.textAlign = 'right'; context.textBaseline = 'top';
    context.fillText(data.xLabel || 'x', width - pad.right, 4, plotWidth);
  }, [compiled, data.xLabel, params, probe, series, xMin, xMax]);
  const drawRef = React.useRef(draw); drawRef.current = draw;
  React.useEffect(() => {
    if (!canvasRef.current) return;
    const observer = new ResizeObserver(() => drawRef.current()); observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, []);
  React.useEffect(() => { const frame = requestAnimationFrame(draw); return () => cancelAnimationFrame(frame); }, [draw, resolvedTheme]);

  return <section className="my-3 min-w-0 space-y-3 border-y border-border/80 py-3" aria-label={data.title}>
    <div className="flex min-w-0 items-center justify-between gap-3">
      <h4 className="min-w-0 break-words text-sm font-semibold text-foreground">{data.title}</h4>
      <AgentButton variant="icon" size="icon-xs" className="shrink-0" aria-label={t(`Ulangi ${data.title}`, `Reset ${data.title}`)} onClick={() => { setParams(defaults); setProbe((xMin + xMax) / 2); }}><RotateCcw className="size-3.5" /></AgentButton>
    </div>
    <canvas ref={canvasRef} role="img" aria-label={data.title} className="block h-[220px] w-full cursor-crosshair rounded-sm" onPointerMove={(event) => {
      const rect = event.currentTarget.getBoundingClientRect(); const left = rect.width < 360 ? 43 : 50;
      const fraction = (event.clientX - rect.left - left) / Math.max(1, rect.width - left - 20);
      if (fraction >= 0 && fraction <= 1) setProbe(xMin + fraction * (xMax - xMin));
    }} />
    {!hasValues && <p role="status" className="text-sm text-warning">{t('Kurva tidak terdefinisi pada parameter ini. Ubah parameter atau ulangi grafik.', 'The curve is undefined with these parameters. Change a parameter or reset the plot.')}</p>}
    <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
      <output className="min-w-0 max-w-full break-words font-mono text-xs tabular-nums">{data.xLabel || 'x'} = {formatNumeric(probe)}</output>
      <AgentSlider aria-label={t(`${data.title}: posisi pembacaan`, `${data.title}: probe position`)} value={[probe]} min={xMin} max={xMax} step={(xMax - xMin) / 200} onValueChange={([value]) => { if (Number.isFinite(value)) setProbe(value); }} className="w-auto min-w-24 flex-1" />
    </div>
    <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
      {compiled.map((curve, index) => {
        const value = curve.fn({ ...params, x: probe, t: probe });
        return <span key={index} className="inline-flex min-w-0 max-w-full items-center gap-1.5"><span className="h-0.5 w-3 shrink-0" style={{ backgroundColor: `var(${COLOR_VAR[curve.color ?? 'primary']})` }} /><span className="min-w-0 break-words">{curve.label}: <output className="font-mono text-foreground">{Number.isFinite(value) ? formatNumeric(value) : t('Tidak terdefinisi', 'Undefined')}</output></span></span>;
      })}
    </div>
    <InteractiveParameterControls title={data.title} sliders={data.sliders} params={params} onChange={setParams} />
  </section>;
}
