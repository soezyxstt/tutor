import { Component, useMemo, useState, type ComponentType, type ReactNode } from 'react';
import { useLanguage, type SimulationRendererProps } from '@tutor/core';
import { Button } from '@tutor/ui';
import { SimulationContext } from './context';
import type { Locale, VisualSpec } from './types';

class VisualBoundary extends Component<{ children: ReactNode; message: string }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <p role="status" className="py-4 text-sm text-muted-foreground">{this.props.message}</p> : this.props.children; }
}
type VisualProps = { spec: VisualSpec; locale: Locale; dimension: string };
export function bindVisual(Visual: ComponentType<VisualProps>): ComponentType<SimulationRendererProps> {
  return function IpeSimulation(props) {
    const { locale, t } = useLanguage();
    const [dimension, setDimension] = useState('2d');
    const spec = useMemo<VisualSpec>(() => ({
      kind: String(props.spec?.data?.visualKind ?? props.spec?.type.replace(/^ipe-/, '') ?? ''),
      params: props.spec?.data,
      caption: { id: '', en: '' },
    }), [props.spec?.data, props.spec?.type]);
    const supports3d = ['orifice', 'venturi', 'encoder', 'resolver', 'lvdt'].includes(spec.kind);
    return <SimulationContext.Provider value={props}><div className="ipe-simulation" data-ipe-model={spec.kind}>
      {supports3d && <div role="group" aria-label={t('Dimensi visual', 'Visual dimension')} className="mb-2 flex justify-end gap-1">
        <Button size="xs" variant="ghost" aria-pressed={dimension === '2d'} onClick={() => setDimension('2d')}>2D</Button>
        <Button size="xs" variant="ghost" aria-pressed={dimension === '3d'} onClick={() => setDimension('3d')}>3D</Button>
      </div>}
      <VisualBoundary key={`${props.resetSignal}:${dimension}`} message={t('Visual belum dapat dimuat. Pilih 2D atau atur ulang simulasi.', 'The visual could not load. Select 2D or reset the simulation.')}>
        <Visual key={props.resetSignal} spec={spec} locale={locale} dimension={dimension} />
      </VisualBoundary>
    </div></SimulationContext.Provider>;
  };
}
