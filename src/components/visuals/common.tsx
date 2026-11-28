import { useEffect, useRef, useState, type ReactNode } from "react";
import { Play, Pause, RotateCcw } from "lucide-react";
import type { Locale, VisualSpec } from "@/content/types";
import { IconButton } from "@/components/controls";
import { Button } from "@/components/ui/button";
import { text, num } from "@/lib/i18n";
export const pnum = (s: VisualSpec, key: string, fallback: number) =>
  typeof s.params?.[key] === "number" ? (s.params[key] as number) : fallback;
export const pstr = (s: VisualSpec, key: string, fallback: string) =>
  typeof s.params?.[key] === "string" ? (s.params[key] as string) : fallback;
export const parr = (s: VisualSpec, key: string, fallback: number[]) =>
  Array.isArray(s.params?.[key]) ? (s.params[key] as number[]) : fallback;
export function useClock(end = 10, speed = 1) {
  const [t, setT] = useState(0),
    [playing, setPlaying] = useState(false);
  const last = useRef<number | null>(null);
  useEffect(() => {
    if (!playing) {
      last.current = null;
      return;
    }
    let id = 0;
    const tick = (now: number) => {
      if (last.current !== null) {
        const dt = Math.min((now - last.current) / 1000, 0.05) * speed;
        setT((prev) => {
          if (prev + dt >= end) {
            setPlaying(false);
            return end;
          }
          return prev + dt;
        });
      }
      last.current = now;
      id = requestAnimationFrame(tick);
    };
    id = requestAnimationFrame(tick);
    const pause = () => {
      if (document.hidden) setPlaying(false);
    };
    document.addEventListener("visibilitychange", pause);
    return () => {
      cancelAnimationFrame(id);
      last.current = null;
      document.removeEventListener("visibilitychange", pause);
    };
  }, [playing, end, speed]);
  return {
    t,
    end,
    setT,
    playing,
    setPlaying,
    reset: () => {
      setT(0);
      setPlaying(false);
    },
  };
}
export function Playback({
  clock,
  locale,
  digits = 2,
}: {
  clock: ReturnType<typeof useClock>;
  locale: Locale;
  digits?: number;
}) {
  return (
    <div className="playback">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => {
          if (!clock.playing && clock.t >= clock.end) {
            clock.setT(0);
          }
          clock.setPlaying(!clock.playing);
        }}
        aria-label={text(
          locale,
          clock.playing ? "Jeda" : "Putar",
          clock.playing ? "Pause" : "Play",
        )}
      >
        {clock.playing ? <Pause /> : <Play />}
        {text(
          locale,
          clock.playing ? "Jeda" : "Putar",
          clock.playing ? "Pause" : "Play",
        )}
      </Button>
      <span>t = {num(clock.t, locale, digits)} s</span>
      <IconButton
        label={text(locale, "Ulangi", "Replay")}
        onClick={clock.reset}
      >
        <RotateCcw />
      </IconButton>
    </div>
  );
}
export function Metric({
  label,
  value,
  unit,
}: {
  label: string;
  value: string;
  unit?: string;
}) {
  return (
    <div className="metric">
      <span>{label}</span>
      <strong>
        {value}
        {unit && <small> {unit}</small>}
      </strong>
    </div>
  );
}
export function PlotLegend({
  items,
}: {
  items: { label: string; color: string; dashed?: boolean }[];
}) {
  return (
    <div className="plot-legend">
      {items.map((item) => (
        <span key={item.label}>
          <svg width="20" height="10" aria-hidden="true">
            <line
              x1="0"
              y1="5"
              x2="20"
              y2="5"
              stroke={item.color}
              strokeWidth="2"
              strokeDasharray={item.dashed ? "4 3" : undefined}
            />
          </svg>
          {item.label}
        </span>
      ))}
    </div>
  );
}
export function Svg({
  children,
  label,
  viewBox = "0 0 500 240",
  className = "",
}: {
  children: ReactNode;
  label: string;
  viewBox?: string;
  className?: string;
}) {
  return (
    <svg
      viewBox={viewBox}
      role="img"
      aria-label={label}
      className={`science-svg ${className}`}
    >
      <defs>
        <marker
          id="arrow-green"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#65834c" />
        </marker>
        <marker
          id="arrow-ink"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#686f66" />
        </marker>
        <marker
          id="arrow-orange"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="5"
          markerHeight="5"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill="#b37748" />
        </marker>
      </defs>
      {children}
    </svg>
  );
}
