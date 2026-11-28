import { useLanguage } from '../../i18n/language-provider';
import * as React from 'react';
import { RotateCcw } from 'lucide-react';
import { useTheme } from '@tutor/ui';
import { AgentButton } from '../agent-controls';
import { InteractiveParameterControls } from './interactive-controls';
import { compileMathExpression } from './safe-math';
import type { RenderInteractive3DInput } from './tools';

/**
 * Lightweight, lazy-loaded interactive 3D orbit visualizer for AI UI-SDK.
 * Supports drag-to-orbit on 3D surfaces z = f(x, y) and 3D vector scenes
 * with live parameter sliders and zero WebGL context failures.
 */
export default function Interactive3DBlock({
  data,
}: {
  data: RenderInteractive3DInput;
}) {
  const defaults = React.useMemo(() => {
    const map: Record<string, number> = {};
    for (const s of data.sliders ?? []) {
      map[s.key] = s.defaultValue;
    }
    return map;
  }, [data.sliders]);

  const [params, setParams] = React.useState<Record<string, number>>(defaults);
  const [angles, setAngles] = React.useState({ yaw: 0.68, pitch: 0.48 });
  const dragRef = React.useRef<{ x: number; y: number } | null>(null);
  const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
  const { t } = useLanguage();
  const { resolvedTheme } = useTheme();

  const surfaceFn = React.useMemo(
    () =>
      data.surfaceExpression
        ? compileMathExpression(data.surfaceExpression)
        : null,
    [data.surfaceExpression]
  );

  const redraw = React.useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    const width = Math.max(rect.width, 1);
    const height = Math.max(rect.height, 210);
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);

    ctx.save();
    ctx.scale(dpr, dpr);

    const styles = getComputedStyle(document.documentElement);
    const fg = styles.getPropertyValue('--foreground').trim() || '#18181b';
    const mutedFg =
      styles.getPropertyValue('--muted-foreground').trim() || '#57534e';
    const primary = styles.getPropertyValue('--primary').trim() || '#1e5269';
    const success = styles.getPropertyValue('--success').trim() || '#236b4b';
    const warning = styles.getPropertyValue('--warning').trim() || '#9a5b13';
    const border = styles.getPropertyValue('--border').trim() || '#e5e2da';
    const bgSubtle =
      styles.getPropertyValue('--surface-subtle').trim() || '#f3f1ec';

    ctx.fillStyle = bgSubtle;
    ctx.fillRect(0, 0, width, height);

    const cx = width * 0.5;
    const cy = height * 0.54;
    const [minDomain, maxDomain] = data.domain ?? [-1.5, 1.5];
    const surfaceValues: number[][] = [];
    let extent = Math.max(Math.abs(minDomain), Math.abs(maxDomain), 1);
    if (data.mode === 'surface' && surfaceFn) {
      for (let i = 0; i <= 16; i++) {
        const row: number[] = [];
        for (let j = 0; j <= 16; j++) {
          const value = surfaceFn({ ...params, x: minDomain + (maxDomain - minDomain) * i / 16, y: minDomain + (maxDomain - minDomain) * j / 16 });
          row.push(value);
          if (Number.isFinite(value)) extent = Math.max(extent, Math.abs(value));
        }
        surfaceValues.push(row);
      }
    } else if (data.vectors?.length) {
      extent = Math.max(1, ...data.vectors.flatMap((vector) => [Math.abs(vector.x), Math.abs(vector.y), Math.abs(vector.z)]));
    }
    const scale = Math.min(width, height) * 0.25;

    const cosY = Math.cos(angles.yaw);
    const sinY = Math.sin(angles.yaw);
    const cosP = Math.cos(angles.pitch);
    const sinP = Math.sin(angles.pitch);

    const project = (x: number, y: number, z: number) => {
      // Rotate around vertical z-axis (yaw), then tilt (pitch)
      const rx = (x / extent) * cosY - (y / extent) * sinY;
      const ry = (x / extent) * sinY + (y / extent) * cosY;
      const rz = z / extent;
      const py = ry * cosP - rz * sinP;
      const pz = ry * sinP + rz * cosP;
      const persp = 4.6 / (4.6 + py * 0.35);
      return {
        sx: cx + rx * scale * persp,
        sy: cy - pz * scale * persp,
        depth: py,
      };
    };

    // Draw 3D Cartesian axes
    const axisLen = Math.min(Number.MAX_VALUE, extent * 1.35);
    const origin = project(0, 0, 0);
    const axes: { end: [number, number, number]; label: string }[] = [
      { end: [axisLen, 0, 0], label: 'x' },
      { end: [0, axisLen, 0], label: 'y' },
      { end: [0, 0, axisLen], label: 'z' },
    ];
    ctx.strokeStyle = border;
    ctx.lineWidth = 1;
    for (const a of axes) {
      const p = project(...a.end);
      ctx.beginPath();
      ctx.moveTo(origin.sx, origin.sy);
      ctx.lineTo(p.sx, p.sy);
      ctx.stroke();
      ctx.fillStyle = mutedFg;
      ctx.font = '600 10px ui-monospace, monospace';
      ctx.fillText(a.label, p.sx + 4, p.sy);
    }

    // Mode 1: 3D Mathematical Surface z = f(x, y)
    if (data.mode === 'surface' && surfaceFn) {
      const N = 16;
      const [minD, maxD] = data.domain ?? [-1.5, 1.5];
      const grid: ({ sx: number; sy: number; z: number; depth: number } | null)[][] = [];

      for (let i = 0; i <= N; i++) {
        const row: ({ sx: number; sy: number; z: number; depth: number } | null)[] = [];
        const x = minD + ((maxD - minD) * i) / N;
        for (let j = 0; j <= N; j++) {
          const y = minD + ((maxD - minD) * j) / N;
          const z = surfaceValues[i][j];
          // Undefined points are holes, never fabricated zeros or clamped peaks.
          if (!Number.isFinite(z)) { row.push(null); continue; }
          const p = project(x, y, z);
          row.push({ ...p, z });
        }
        grid.push(row);
      }

      // Depth-sorted quads (painter's algorithm)
      const quads: {
        pts: { sx: number; sy: number }[];
        depth: number;
        zAvg: number;
      }[] = [];

      for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
          const p00 = grid[i][j];
          const p10 = grid[i + 1][j];
          const p11 = grid[i + 1][j + 1];
          const p01 = grid[i][j + 1];
          if (!p00 || !p10 || !p11 || !p01) continue;
          quads.push({
            pts: [p00, p10, p11, p01],
            depth: (p00.depth + p10.depth + p11.depth + p01.depth) / 4,
            zAvg: p00.z / 4 + p10.z / 4 + p11.z / 4 + p01.z / 4,
          });
        }
      }

      quads.sort((a, b) => b.depth - a.depth);

      for (const q of quads) {
        const normZ = Math.max(0, Math.min(1, (q.zAvg / extent + 1) / 2));
        ctx.beginPath();
        ctx.moveTo(q.pts[0].sx, q.pts[0].sy);
        ctx.lineTo(q.pts[1].sx, q.pts[1].sy);
        ctx.lineTo(q.pts[2].sx, q.pts[2].sy);
        ctx.lineTo(q.pts[3].sx, q.pts[3].sy);
        ctx.closePath();

        ctx.fillStyle = primary;
        ctx.globalAlpha = 0.08 + normZ * 0.22;
        ctx.fill();

        ctx.strokeStyle = primary;
        ctx.globalAlpha = 0.45 + normZ * 0.35;
        ctx.lineWidth = 0.85;
        ctx.stroke();
      }
      ctx.globalAlpha = 1;
    }

    // Mode 2: 3D Vectors
    if (data.mode === 'vectors' && data.vectors) {
      const palette = [primary, success, warning, fg];
      data.vectors.forEach((v, idx) => {
        const end = project(v.x, v.y, v.z);
        const col = palette[idx % palette.length];
        ctx.strokeStyle = col;
        ctx.fillStyle = col;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.moveTo(origin.sx, origin.sy);
        ctx.lineTo(end.sx, end.sy);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(end.sx, end.sy, 3.5, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = '600 11px ui-monospace, monospace';
        ctx.fillText(
          `${v.label} (${v.x}, ${v.y}, ${v.z})`,
          end.sx + 6,
          end.sy - 4
        );
      });
    }

    // Subtle interaction hint
    ctx.fillStyle = mutedFg;
    ctx.font = '500 10px ui-monospace, monospace';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'top';
    ctx.fillText(t('Seret untuk memutar 3D', 'Drag to rotate in 3D'), 10, 10);

    ctx.restore();
  }, [angles, data.domain, data.mode, data.vectors, params, surfaceFn, t]);

  const redrawRef = React.useRef(redraw);
  redrawRef.current = redraw;
  React.useEffect(() => {
    if (!canvasRef.current) return;
    const observer = new ResizeObserver(() => redrawRef.current());
    observer.observe(canvasRef.current);
    return () => observer.disconnect();
  }, []);

  React.useEffect(() => {
    // Read colors after ThemeProvider has applied the root class, including
    // when the model stays still while the user switches theme.
    const frame = window.requestAnimationFrame(redraw);
    return () => window.cancelAnimationFrame(frame);
  }, [redraw, resolvedTheme]);

  return (
    <div className="my-2.5 min-w-0 space-y-2.5 border-y border-border/80 py-3">
      <div className="flex min-w-0 items-center justify-between gap-2">
        <h4 className="min-w-0 break-words text-sm font-semibold text-foreground">{data.title}</h4>
        <AgentButton
          variant="icon"
          size="icon-xs"
          className="shrink-0"
          aria-label={t(`Ulangi ${data.title}`, `Reset ${data.title}`)}
          onClick={() => {
            setAngles({ yaw: 0.68, pitch: 0.48 });
            setParams(defaults);
          }}
        >
          <RotateCcw className="size-3" />
        </AgentButton>
      </div>

      <canvas
        ref={canvasRef}
        aria-label={data.title}
        onPointerDown={(e) => {
          dragRef.current = { x: e.clientX, y: e.clientY };
          e.currentTarget.setPointerCapture(e.pointerId);
        }}
        onPointerMove={(e) => {
          if (!dragRef.current) return;
          const dx = e.clientX - dragRef.current.x;
          const dy = e.clientY - dragRef.current.y;
          dragRef.current = { x: e.clientX, y: e.clientY };
          setAngles((prev) => ({
            yaw: prev.yaw + dx * 0.01,
            pitch: Math.max(-1.2, Math.min(1.2, prev.pitch + dy * 0.01)),
          }));
        }}
        onPointerUp={() => {
          dragRef.current = null;
        }}
        onPointerCancel={() => { dragRef.current = null; }}
        onLostPointerCapture={() => { dragRef.current = null; }}
        className="block h-[220px] w-full cursor-grab rounded-md active:cursor-grabbing touch-none"
      />

      <InteractiveParameterControls title={data.title} sliders={data.sliders} params={params} onChange={setParams} />
    </div>
  );
}
