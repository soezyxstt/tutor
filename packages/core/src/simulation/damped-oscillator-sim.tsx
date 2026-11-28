import { useLanguage } from '../i18n/language-provider';
import * as React from 'react';

export interface SimulationRendererProps {
  params: Record<string, number>;
  playing: boolean;
  resetSignal: number;
}

/**
 * 4th-order Runge-Kutta (RK4) solver for a damped harmonic oscillator:
 *   m * x'' + c * x' + k * x = 0
 * Mutates refs inside requestAnimationFrame for smooth 60fps without React re-renders.
 */
export default function DampedOscillatorSim({
  params,
  playing,
  resetSignal,
}: SimulationRendererProps) {
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const { t } = useLanguage();
  const stateRef = React.useRef({
    t: 0,
    x: params.x0 ?? 1.0,
    v: 0,
    history: [] as { t: number; x: number }[],
  });

  const paramsRef = React.useRef(params);
  paramsRef.current = params;

  const playingRef = React.useRef(playing);
  playingRef.current = playing;

  React.useEffect(() => {
    stateRef.current = {
      t: 0,
      x: paramsRef.current.x0 ?? 1.0,
      v: 0,
      history: [{ t: 0, x: paramsRef.current.x0 ?? 1.0 }],
    };
  }, [resetSignal, params.x0]);

  React.useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let rafId = 0;
    let lastTime = performance.now();

    const accel = (x: number, v: number, m: number, c: number, k: number) =>
      (-c * v - k * x) / Math.max(m, 0.1);

    const stepRK4 = (dt: number, m: number, c: number, k: number) => {
      const s = stateRef.current;
      const k1x = s.v;
      const k1v = accel(s.x, s.v, m, c, k);

      const k2x = s.v + 0.5 * dt * k1v;
      const k2v = accel(s.x + 0.5 * dt * k1x, s.v + 0.5 * dt * k1v, m, c, k);

      const k3x = s.v + 0.5 * dt * k2v;
      const k3v = accel(s.x + 0.5 * dt * k2x, s.v + 0.5 * dt * k2v, m, c, k);

      const k4x = s.v + dt * k3v;
      const k4v = accel(s.x + dt * k3x, s.v + dt * k3v, m, c, k);

      s.x += (dt / 6) * (k1x + 2 * k2x + 2 * k3x + k4x);
      s.v += (dt / 6) * (k1v + 2 * k2v + 2 * k3v + k4v);
      s.t += dt;

      s.history.push({ t: s.t, x: s.x });
      if (s.history.length > 360) {
        s.history.shift();
      }
    };

    const draw = (now: number) => {
      const dt = Math.min((now - lastTime) / 1000, 0.04);
      lastTime = now;

      const m = paramsRef.current.mass ?? 1.0;
      const c = paramsRef.current.damping ?? 0.35;
      const k = paramsRef.current.stiffness ?? 12.0;

      if (playingRef.current) {
        const substeps = 4;
        for (let i = 0; i < substeps; i++) {
          stepRK4(dt / substeps, m, c, k);
        }
      }

      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      const width = Math.max(rect.width, 320);
      const height = Math.max(rect.height, 210);
      if (
        canvas.width !== Math.round(width * dpr) ||
        canvas.height !== Math.round(height * dpr)
      ) {
        canvas.width = Math.round(width * dpr);
        canvas.height = Math.round(height * dpr);
      }

      ctx.save();
      ctx.scale(dpr, dpr);

      const styles = getComputedStyle(document.documentElement);
      const fg = styles.getPropertyValue('--foreground').trim() || '#18181b';
      const mutedFg =
        styles.getPropertyValue('--muted-foreground').trim() || '#57534e';
      const primary = styles.getPropertyValue('--primary').trim() || '#1e5269';
      const border = styles.getPropertyValue('--border').trim() || '#e5e2da';
      const bgSubtle =
        styles.getPropertyValue('--surface-subtle').trim() || '#f3f1ec';

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = bgSubtle;
      ctx.fillRect(0, 0, width, height);

      const isCompact = width < 460;
      const splitX = isCompact ? Math.round(width * 0.28) : Math.min(width * 0.34, 210);
      const midY = height * 0.54;
      const ampScale = height * 0.28;

      // Vertical divider between apparatus and waveform
      ctx.strokeStyle = border;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(splitX, 16);
      ctx.lineTo(splitX, height - 16);
      ctx.stroke();

      // --- Left: Spring-Mass Apparatus ---
      const anchorX = splitX * 0.5;
      const anchorY = 26;
      const massY = Math.max(
        64,
        Math.min(height - 34, midY - stateRef.current.x * (ampScale * 0.7))
      );

      // Ceiling bar
      ctx.strokeStyle = mutedFg;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(anchorX - 28, anchorY);
      ctx.lineTo(anchorX + 28, anchorY);
      ctx.stroke();

      // Equilibrium reference line
      ctx.save();
      ctx.setLineDash([3, 3]);
      ctx.strokeStyle = border;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(20, midY);
      ctx.lineTo(splitX - 18, midY);
      ctx.stroke();
      ctx.restore();

      // Coiled spring
      const coils = 10;
      const springTop = anchorY + 4;
      const springBottom = massY - 14;
      const span = Math.max(20, springBottom - springTop);
      ctx.strokeStyle = mutedFg;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(anchorX, anchorY);
      ctx.lineTo(anchorX, springTop);
      for (let i = 0; i <= coils; i++) {
        const py = springTop + (span * i) / coils;
        const px = anchorX + (i === 0 || i === coils ? 0 : i % 2 === 0 ? -9 : 9);
        ctx.lineTo(px, py);
      }
      ctx.lineTo(anchorX, massY - 12);
      ctx.stroke();

      // Mass block
      const massSize = 24 + Math.min(m * 3.5, 10);
      ctx.fillStyle = primary;
      ctx.beginPath();
      ctx.roundRect(
        anchorX - massSize / 2,
        massY - massSize / 2,
        massSize,
        massSize,
        4
      );
      ctx.fill();

      ctx.fillStyle = bgSubtle;
      ctx.font = '600 11px ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.fillText('m', anchorX, massY);

      // --- Right: Displacement x(t) Graph ---
      const plotLeft = splitX + 22;
      const plotRight = width - 18;
      const plotW = Math.max(80, plotRight - plotLeft);

      // Axis x = 0
      ctx.strokeStyle = border;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(plotLeft, midY);
      ctx.lineTo(plotRight, midY);
      ctx.stroke();

      // Waveform
      const history = stateRef.current.history;
      if (history.length > 1) {
        const tMax = history[history.length - 1].t;
        const windowSec = 8;
        const tStart = Math.max(0, tMax - windowSec);

        ctx.strokeStyle = primary;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        let started = false;
        for (const pt of history) {
          if (pt.t < tStart) continue;
          const px = plotLeft + ((pt.t - tStart) / windowSec) * plotW;
          const py = midY - pt.x * ampScale;
          if (!started) {
            ctx.moveTo(px, py);
            started = true;
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.stroke();

        // Live head dot
        const lastPt = history[history.length - 1];
        const headX = plotLeft + ((lastPt.t - tStart) / windowSec) * plotW;
        const headY = midY - lastPt.x * ampScale;
        ctx.fillStyle = primary;
        ctx.beginPath();
        ctx.arc(headX, headY, 3.2, 0, Math.PI * 2);
        ctx.fill();
      }

      // Telemetry header inside plot
      const wn = Math.sqrt(k / Math.max(m, 0.1));
      const zeta = c / (2 * Math.sqrt(Math.max(k * m, 0.01)));
      const regime =
        zeta < 0.98
          ? 'Underdamped'
          : zeta <= 1.04
            ? 'Critically damped'
            : 'Overdamped';

      ctx.fillStyle = mutedFg;
      ctx.font = isCompact
        ? '500 10px ui-monospace, monospace'
        : '500 11px ui-monospace, monospace';
      ctx.textAlign = 'left';
      ctx.textBaseline = 'top';
      ctx.fillText(
        isCompact
          ? `x=${stateRef.current.x.toFixed(2)}  ωₙ=${wn.toFixed(1)}  ζ=${zeta.toFixed(2)}`
          : `x(t) = ${stateRef.current.x.toFixed(2)} m   ·   ωₙ = ${wn.toFixed(2)} rad/s   ·   ζ = ${zeta.toFixed(2)} (${regime})`,
        plotLeft,
        12
      );

      ctx.fillStyle = fg;
      ctx.font = '500 10px ui-monospace, monospace';
      ctx.fillText('x(t)', plotLeft, midY - ampScale - 6);

      ctx.restore();
      rafId = requestAnimationFrame(draw);
    };

    rafId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(rafId);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-label={t('Simulasi osilator harmonik teredam', 'Damped harmonic oscillator simulation')}
      className="block h-[220px] w-full rounded-md"
    />
  );
}
