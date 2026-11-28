import * as React from 'react';
import { BotMessageSquare, Pause, Play, RotateCcw } from 'lucide-react';
import { Button, Skeleton, Slider } from '@tutor/ui';
import type { SimulationSpec } from '../types/course';
import { useTutorStore } from '../store/tutor-store';
import { getSimulationComponent } from './simulation-registry';

export function SimulationStage({
  courseSlug,
  spec,
  aiAnchorId,
}: {
  courseSlug: string;
  spec: SimulationSpec;
  aiAnchorId?: string;
}) {
  const simKey = `${courseSlug}:${spec.id}`;
  const storedParams = useTutorStore((s) => s.simParams[simKey]);
  const setSimParam = useTutorStore((s) => s.setSimParam);
  const resetSimParams = useTutorStore((s) => s.resetSimParams);
  const openInlineAi = useTutorStore((s) => s.openInlineAi);

  const [playing, setPlaying] = React.useState(true);
  const [resetSignal, setResetSignal] = React.useState(0);

  const defaults = React.useMemo(() => {
    const map: Record<string, number> = {};
    for (const p of spec.params) {
      map[p.key] = p.defaultValue;
    }
    return map;
  }, [spec.params]);

  const activeParams = React.useMemo(
    () => ({ ...defaults, ...(storedParams ?? {}) }),
    [defaults, storedParams]
  );

  const SimComponent = getSimulationComponent(spec.type);

  return (
    <figure className="space-y-3 border-y border-border py-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <figcaption className="min-w-0 text-sm font-medium text-foreground">
          {spec.title}
        </figcaption>

        <div className="flex shrink-0 items-center gap-1">
          <Button
            variant="icon"
            size="icon-sm"
            aria-label={playing ? 'Jeda simulasi' : 'Jalankan simulasi'}
            title={playing ? 'Jeda' : 'Jalankan'}
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          </Button>
          <Button
            variant="icon"
            size="icon-sm"
            aria-label="Reset parameter simulasi"
            title="Reset parameter"
            onClick={() => {
              resetSimParams(simKey, defaults);
              setResetSignal((n) => n + 1);
            }}
          >
            <RotateCcw className="size-3.5" />
          </Button>
          {aiAnchorId && (
            <Button
              variant="ghost"
              size="xs"
              onClick={() =>
                openInlineAi(aiAnchorId, {
                  draftPrompt: `Apa yang terjadi pada simulasi "${spec.title}" jika redaman dinaikkan menjadi 2.5? Ubah parameternya langsung di simulasi dan jelaskan pengaruhnya.`,
                })
              }
            >
              <BotMessageSquare className="size-3 text-primary" />
              <span>Uji via AI</span>
            </Button>
          )}
        </div>
      </div>

      {/* Lazy-loaded canvas/3D viewport */}
      <div className="overflow-hidden rounded-md">
        {SimComponent ? (
          <React.Suspense
            fallback={
              <div className="space-y-2 bg-surface-subtle p-4">
                <Skeleton className="h-3 w-48" />
                <Skeleton className="h-[180px] w-full" />
              </div>
            }
          >
            <SimComponent
              params={activeParams}
              playing={playing}
              resetSignal={resetSignal}
            />
          </React.Suspense>
        ) : (
          <div className="flex h-[180px] items-center justify-center bg-surface-subtle text-xs text-muted-foreground">
            Simulasi &ldquo;{spec.type}&rdquo; belum terdaftar di registry.
          </div>
        )}
      </div>

      {/* Responsive parameter sliders */}
      <div className="grid grid-cols-1 gap-x-6 gap-y-3 pt-1 sm:grid-cols-3">
        {spec.params.map((p) => {
          const val = activeParams[p.key] ?? p.defaultValue;
          return (
            <div key={p.key} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground">{p.label}</span>
                <span className="font-mono font-medium text-foreground">
                  {val.toFixed(p.step < 1 ? 2 : 0)}
                  {p.unit ? ` ${p.unit}` : ''}
                </span>
              </div>
              <Slider
                value={[val]}
                min={p.min}
                max={p.max}
                step={p.step}
                onValueChange={([next]) => {
                  if (typeof next === 'number') {
                    setSimParam(simKey, p.key, next);
                  }
                }}
              />
            </div>
          );
        })}
      </div>

      {spec.caption && (
        <p className="text-xs leading-relaxed text-muted-foreground">
          {spec.caption}
        </p>
      )}
    </figure>
  );
}
