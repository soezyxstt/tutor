import * as React from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import { useTheme } from '@tutor/ui';
import { AgentButton, AgentSlider } from '../agent-controls';
import { useLanguage } from '../../i18n/language-provider';
import { MathMarkdown } from '../../content/math-markdown';
import { compileMathExpression } from './safe-math';
import { formatNumeric, InteractiveParameterControls } from './interactive-controls';
import type { RenderInteractiveSimulationInput } from './tools';

const COLOR_VARIABLES = { primary: '--primary', success: '--success', warning: '--warning', destructive: '--destructive' };

/** Expression-based 2D simulation. Only the declared math language runs here.
 * Canvas and clock refs animate at frame rate; React publishes time at 4 Hz. */
export default function InteractiveSimulationBlock({ data }: { data: RenderInteractiveSimulationInput }) {
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();
  const defaults = React.useMemo(() => Object.fromEntries((data.sliders ?? []).map((slider) => [slider.key, slider.defaultValue])), [data.sliders]);
  const [params, setParams] = React.useState<Record<string, number>>(defaults);
  const [playing, setPlaying] = React.useState(false);
  const playingRef = React.useRef(false);
  const [displayTime, setDisplayTime] = React.useState(0);
  const clock = React.useRef(0);
  const canvasRef = React.useRef<HTMLCanvasElement>(null);
  const readoutRefs = React.useRef<(HTMLOutputElement | null)[]>([]);
  const [unavailable, setUnavailable] = React.useState(false);
  const compiled = React.useMemo(() => ({
    particles: data.particles.map((particle) => ({ ...particle, x: compileMathExpression(particle.xExpression), y: compileMathExpression(particle.yExpression) })),
    vectors: (data.vectors ?? []).map((vector) => ({ ...vector, ox: compileMathExpression(vector.originX), oy: compileMathExpression(vector.originY), x: compileMathExpression(vector.xExpression), y: compileMathExpression(vector.yExpression) })),
    readouts: (data.readouts ?? []).map((readout) => ({ ...readout, fn: compileMathExpression(readout.expression) })),
  }), [data.particles, data.vectors, data.readouts]);
  const paths = React.useMemo(() => compiled.particles.map((particle) => particle.trail ? Array.from({ length: 241 }, (_, index) => {
    const time = data.duration * index / 240;
    const variables = { ...params, t: time };
    return { time, x: particle.x(variables), y: particle.y(variables) };
  }) : []), [compiled.particles, params, data.duration]);

  const draw = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext('2d');
    if (!context) return;
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(1, rect.width);
    const height = Math.max(1, rect.height);
    const dpr = Math.min(window.devicePixelRatio || 1, 3);
    const nextWidth = Math.round(width * dpr);
    const nextHeight = Math.round(height * dpr);
    if (canvas.width !== nextWidth || canvas.height !== nextHeight) { canvas.width = nextWidth; canvas.height = nextHeight; }
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    const styles = getComputedStyle(document.documentElement);
    const color = (name: keyof typeof COLOR_VARIABLES = 'primary') => styles.getPropertyValue(COLOR_VARIABLES[name]).trim();
    const foreground = styles.getPropertyValue('--foreground').trim();
    const muted = styles.getPropertyValue('--muted-foreground').trim();
    const border = styles.getPropertyValue('--border').trim();
    context.fillStyle = styles.getPropertyValue('--surface-subtle').trim();
    context.fillRect(0, 0, width, height);
    const pad = { left: width < 360 ? 40 : 48, right: 18, top: 20, bottom: 35 };
    const plotWidth = width - pad.left - pad.right;
    const plotHeight = height - pad.top - pad.bottom;
    const x = (value: number) => pad.left + (value - data.xDomain[0]) * plotWidth / (data.xDomain[1] - data.xDomain[0]);
    const y = (value: number) => pad.top + (data.yDomain[1] - value) * plotHeight / (data.yDomain[1] - data.yDomain[0]);
    context.font = '11px ui-monospace, monospace';
    context.lineWidth = 1;
    for (let index = 0; index <= 4; index++) {
      const horizontal = pad.left + plotWidth * index / 4;
      const vertical = pad.top + plotHeight * index / 4;
      context.strokeStyle = border;
      context.beginPath();
      context.moveTo(horizontal, pad.top); context.lineTo(horizontal, pad.top + plotHeight);
      context.moveTo(pad.left, vertical); context.lineTo(pad.left + plotWidth, vertical); context.stroke();
      context.fillStyle = muted;
      context.textAlign = 'center'; context.textBaseline = 'top';
      context.fillText(formatNumeric(data.xDomain[0] + (data.xDomain[1] - data.xDomain[0]) * index / 4), horizontal, pad.top + plotHeight + 6);
      context.textAlign = 'right'; context.textBaseline = 'middle';
      context.fillText(formatNumeric(data.yDomain[1] - (data.yDomain[1] - data.yDomain[0]) * index / 4), pad.left - 6, vertical, pad.left - 8);
    }
    context.fillStyle = foreground; context.font = '12px system-ui, sans-serif';
    context.textAlign = 'left'; context.textBaseline = 'top';
    context.fillText(data.yLabel ?? 'y', pad.left, 3, plotWidth);
    context.textAlign = 'right';
    context.fillText(data.xLabel ?? 'x', width - pad.right, height - 14, plotWidth);

    context.save();
    context.beginPath(); context.rect(pad.left, pad.top, plotWidth, plotHeight); context.clip();
    const variables = { ...params, t: clock.current };
    compiled.particles.forEach((particle, index) => {
      const trail = paths[index];
      context.strokeStyle = color(particle.color); context.lineWidth = 1.5; context.globalAlpha = 0.6;
      context.beginPath();
      let started = false;
      for (const point of trail) {
        if (point.time > clock.current) break;
        if (!Number.isFinite(point.x) || !Number.isFinite(point.y)) { started = false; continue; }
        if (!started) context.moveTo(x(point.x), y(point.y));
        else context.lineTo(x(point.x), y(point.y));
        started = true;
      }
      context.stroke(); context.globalAlpha = 1;
      const px = particle.x(variables); const py = particle.y(variables);
      if (!Number.isFinite(px) || !Number.isFinite(py)) return;
      context.fillStyle = color(particle.color);
      context.beginPath(); context.arc(x(px), y(py), 6, 0, 2 * Math.PI); context.fill();
      context.fillStyle = foreground; context.textAlign = 'left'; context.textBaseline = 'bottom';
      context.fillText(particle.label, Math.max(pad.left + 3, Math.min(x(px) + 9, width - pad.right - 90)), Math.max(pad.top + 14, y(py) - 7), 120);
    });
    for (const vector of compiled.vectors) {
      const ox = vector.ox(variables); const oy = vector.oy(variables);
      const vx = vector.x(variables); const vy = vector.y(variables);
      if (![ox, oy, vx, vy].every(Number.isFinite)) continue;
      const sx = x(ox); const sy = y(oy); const ex = x(ox + vx); const ey = y(oy + vy);
      const angle = Math.atan2(ey - sy, ex - sx);
      context.strokeStyle = color(vector.color); context.fillStyle = color(vector.color); context.lineWidth = 2;
      context.beginPath(); context.moveTo(sx, sy); context.lineTo(ex, ey); context.stroke();
      if (Math.hypot(ex - sx, ey - sy) > 1) {
        context.beginPath(); context.moveTo(ex, ey);
        context.lineTo(ex - 8 * Math.cos(angle - 0.4), ey - 8 * Math.sin(angle - 0.4));
        context.lineTo(ex - 8 * Math.cos(angle + 0.4), ey - 8 * Math.sin(angle + 0.4)); context.closePath(); context.fill();
      }
      context.fillText(vector.label, Math.max(pad.left + 3, Math.min(ex + 5, width - pad.right - 90)), Math.max(pad.top + 14, ey - 6), 120);
    }
    context.restore();
    compiled.readouts.forEach((readout, index) => {
      const output = readoutRefs.current[index];
      if (output) {
        const value = readout.fn(variables);
        output.textContent = Number.isFinite(value) ? `${formatNumeric(value)}${readout.unit ? ` ${readout.unit}` : ''}` : t('Tidak terdefinisi', 'Undefined');
      }
    });
  }, [compiled, data.duration, data.xDomain, data.yDomain, data.xLabel, data.yLabel, params, paths, t]);
  const drawRef = React.useRef(draw);
  drawRef.current = draw;

  React.useEffect(() => {
    if (!canvasRef.current?.getContext('2d')) { setUnavailable(true); return; }
    const observer = new ResizeObserver(() => drawRef.current());
    observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, []);
  React.useEffect(() => {
    const frame = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(frame);
  }, [draw, resolvedTheme]);
  React.useEffect(() => {
    if (!playing) return;
    playingRef.current = true;
    let previous: number | null = null;
    let frame = 0;
    const tick = (now: number) => {
      if (!playingRef.current) return;
      if (previous !== null) clock.current = Math.min(data.duration, clock.current + Math.min((now - previous) / 1000, 0.1));
      previous = now;
      drawRef.current();
      if (clock.current >= data.duration) { playingRef.current = false; setPlaying(false); setDisplayTime(data.duration); return; }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    const timer = window.setInterval(() => setDisplayTime(clock.current), 250);
    return () => { cancelAnimationFrame(frame); window.clearInterval(timer); };
  }, [playing, data.duration]);

  return <section className="my-3 min-w-0 space-y-3 border-y border-border/80 py-3" aria-label={data.title}>
    <div className="flex min-w-0 items-center justify-between gap-3">
      <h4 className="min-w-0 break-words text-sm font-semibold text-foreground">{data.title}</h4>
      <div className="flex shrink-0 gap-1">
        <AgentButton variant="ghost" size="xs" aria-label={playing ? t(`Jeda ${data.title}`, `Pause ${data.title}`) : t(`Putar ${data.title}`, `Play ${data.title}`)} disabled={unavailable} onClick={() => {
          if (clock.current >= data.duration) { clock.current = 0; setDisplayTime(0); }
          if (playing) setDisplayTime(clock.current);
          playingRef.current = !playing;
          setPlaying(!playing);
        }}>{playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}{playing ? t('Jeda', 'Pause') : t('Putar', 'Play')}</AgentButton>
        <AgentButton variant="icon" size="icon-xs" aria-label={t(`Ulangi ${data.title}`, `Reset ${data.title}`)} onClick={() => { playingRef.current = false; setPlaying(false); clock.current = 0; setDisplayTime(0); setParams(defaults); drawRef.current(); }}><RotateCcw className="size-3.5" /></AgentButton>
      </div>
    </div>
    <MathMarkdown content={data.description} className="text-[13px] text-muted-foreground" />
    {unavailable ? <p role="status" className="text-sm text-destructive">{t('Peramban ini belum dapat menggambar simulasi.', 'This browser could not draw the simulation.')}</p> : <canvas ref={canvasRef} role="img" aria-label={`${data.title}. ${t('Kontrol waktu dan parameter berada di bawah gambar.', 'Time and parameter controls follow the image.')}`} className="block h-[230px] w-full rounded-sm sm:h-[260px]" />}
    <div className="flex min-w-0 items-center gap-3">
      <span className="shrink-0 font-mono text-xs tabular-nums">t = {displayTime.toFixed(2)} s</span>
      <AgentSlider aria-label={t(`${data.title}: waktu`, `${data.title}: time`)} min={0} max={data.duration} step={Math.min(0.05, data.duration / 100)} value={[displayTime]} onValueChange={([next]) => { if (Number.isFinite(next)) { playingRef.current = false; setPlaying(false); clock.current = next; setDisplayTime(next); drawRef.current(); } }} className="min-w-0 flex-1" />
    </div>
    {compiled.readouts.length > 0 && <dl className="flex flex-wrap gap-x-5 gap-y-2 text-[13px]">{compiled.readouts.map((readout, index) => {
      const value = readout.fn({ ...params, t: displayTime });
      return <div key={index} className="flex min-w-0 max-w-full flex-wrap gap-x-2"><dt className="min-w-0 break-words text-muted-foreground">{readout.label}</dt><dd className="min-w-0 break-words"><output aria-label={readout.label} ref={(element) => { readoutRefs.current[index] = element; }} className="font-mono text-foreground">{Number.isFinite(value) ? `${formatNumeric(value)}${readout.unit ? ` ${readout.unit}` : ''}` : t('Tidak terdefinisi', 'Undefined')}</output></dd></div>;
    })}</dl>}
    <InteractiveParameterControls title={data.title} sliders={data.sliders} params={params} onChange={setParams} />
  </section>;
}
