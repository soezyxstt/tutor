import { useLanguage } from '../i18n/language-provider';
import * as React from 'react';
import { BotMessageSquare, Pause, Play, RotateCcw } from 'lucide-react';
import { Button, Skeleton } from '@tutor/ui';
import { AgentButton, AgentSlider } from '../ai/agent-controls';
import type { SimulationSpec } from '../types/course';
import { useTutorStore } from '../store/tutor-store';
import { clearSimulationContextState, getSimulationComponent, updateSimulationContextState, useSimulationContextState } from './simulation-registry';
import type { SimulationContextState } from './simulation-registry';

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
  const contextState = useSimulationContextState(simKey);
  const setContextState = React.useCallback((patch: SimulationContextState) => updateSimulationContextState(simKey, patch), [simKey]);
  React.useEffect(() => () => clearSimulationContextState(simKey), [simKey]);
  const { t } = useLanguage();
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
  const setParam = React.useCallback((key: string, value: number) => {
    const definition = spec.params.find((param) => param.key === key);
    if (!definition || !Number.isFinite(value)) return;
    setSimParam(simKey, key, Math.min(definition.max, Math.max(definition.min, value)));
  }, [spec.params, simKey, setSimParam]);

  return (
    <figure className="space-y-3 border-y border-border py-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <figcaption className="min-w-0 text-sm font-medium text-foreground">
          {spec.title}
        </figcaption>

        <div className="flex shrink-0 items-center gap-1">
          <AgentButton
            variant="icon"
            size="icon-sm"
            aria-label={`${spec.title}: ${playing ? t('Jeda simulasi', 'Pause simulation') : t('Jalankan simulasi', 'Play simulation')}`}
            title={playing ? t('Jeda', 'Pause') : t('Jalankan', 'Play')}
            onClick={() => setPlaying((p) => !p)}
          >
            {playing ? <Pause className="size-3.5" /> : <Play className="size-3.5" />}
          </AgentButton>
          <AgentButton
            variant="icon"
            size="icon-sm"
            aria-label={`${spec.title}: ${t('Reset parameter simulasi', 'Reset simulation parameters')}`}
            title={t("Reset parameter", "Reset parameters")}
            onClick={() => {
              clearSimulationContextState(simKey);
              resetSimParams(simKey, defaults);
              setResetSignal((n) => n + 1);
            }}
          >
            <RotateCcw className="size-3.5" />
          </AgentButton>
          {aiAnchorId && (
            <Button
              variant="ghost"
              size="xs"
              onClick={() =>
                openInlineAi(aiAnchorId, {
                  draftPrompt: t(`Bantu saya memahami pengaruh parameter pada simulasi "${spec.title}".`, `Help me understand how the parameters affect "${spec.title}".`),
                })
              }
            >
              <BotMessageSquare className="size-3 text-primary" />
              <span>{t("Uji via AI", "Ask AI")}</span>
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
              key={spec.id}
              spec={spec}
              params={activeParams}
              playing={playing}
              resetSignal={resetSignal}
              setParam={setParam}
              setPlaying={setPlaying}
              contextState={contextState}
              setContextState={setContextState}
            />
          </React.Suspense>
        ) : (
          <div className="flex h-[180px] items-center justify-center bg-surface-subtle text-xs text-muted-foreground">
            {t('Simulasi ini belum tersedia.', 'This simulation is not available yet.')}
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
                  {new Intl.NumberFormat(undefined, { maximumFractionDigits: 8 }).format(val)}
                  {p.unit ? ` ${p.unit}` : ''}
                </span>
              </div>
              <AgentSlider
                aria-label={`${spec.title}: ${p.label}`}
                value={[val]}
                min={p.min}
                max={p.max}
                step={p.step}
                onValueChange={([next]) => {
                  if (typeof next === 'number') {
                    setParam(p.key, next);
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
