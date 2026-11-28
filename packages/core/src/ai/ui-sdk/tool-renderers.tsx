import { useLanguage } from '../../i18n/language-provider';
import * as React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  ListChecks,
  SlidersHorizontal,
  XCircle,
} from 'lucide-react';
import { RadioGroup, RadioGroupItem, Skeleton, cn } from '@tutor/ui';
import { MathMarkdown } from '../../content/math-markdown';
import { MathExpression } from '../../content/math-expression';
import type { AiUiToolInvocation, ShowQuickQuizInput } from './tools';
import { validateAiToolCall } from './tools';

const LazyInteractivePlot = React.lazy(() => import('./interactive-plot'));
const LazyInteractive3D = React.lazy(() => import('./interactive-3d'));
const LazyInteractiveSimulation = React.lazy(() => import('./interactive-simulation'));

class InteractiveOutputBoundary extends React.Component<{ children: React.ReactNode; fallback: React.ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? this.props.fallback : this.props.children; }
}

function QuickQuizBlock({ data }: { data: ShowQuickQuizInput }) {
  const { t } = useLanguage();
  const [selected, setSelected] = React.useState<string>('');
  const answered = selected !== '';
  const isCorrect = selected === data.correctOptionId;

  return (
    <div className="my-2.5 space-y-2.5 border-y border-border/80 py-3">
      <div className="text-xs font-semibold text-primary">
        {t('Cek Pemahaman', 'Check your understanding')}
      </div>
      <MathMarkdown
        content={data.question}
        className="text-[13.5px] leading-relaxed"
      />
      <RadioGroup value={selected} onValueChange={setSelected} className="gap-1.5">
        {data.options.map((opt) => {
          const isThisCorrect = opt.id === data.correctOptionId;
          const isThisSelected = opt.id === selected;
          return (
            <label
              key={opt.id}
              className={cn(
                'flex cursor-pointer items-start gap-2 rounded-sm py-1 text-[13px] transition-colors',
                answered && isThisCorrect && 'font-medium text-success',
                answered && isThisSelected && !isThisCorrect && 'text-destructive'
              )}
            >
              <RadioGroupItem value={opt.id} className="mt-0.5" />
              <span className="min-w-0 flex-1">
                <MathMarkdown
                  content={opt.label}
                  className="text-[13px] leading-snug"
                />
              </span>
            </label>
          );
        })}
      </RadioGroup>

      {answered && (
        <div
          className={cn(
            'flex items-start gap-2 border-l-2 pl-2.5 text-xs leading-relaxed',
            isCorrect
              ? 'border-l-success text-foreground'
              : 'border-l-destructive text-foreground'
          )}
        >
          {isCorrect ? (
            <CheckCircle2 className="mt-0.5 size-3.5 shrink-0 text-success" />
          ) : (
            <XCircle className="mt-0.5 size-3.5 shrink-0 text-destructive" />
          )}
          <MathMarkdown
            content={data.explanation}
            className="text-xs leading-relaxed text-muted-foreground"
          />
        </div>
      )}
    </div>
  );
}

export function AiToolInvocationView({
  invocation,
}: {
  invocation: AiUiToolInvocation;
}) {
  const { t } = useLanguage();
  const result = React.useMemo(() => validateAiToolCall(invocation.toolName, invocation.args), [invocation.toolName, invocation.args]);
  const fallback = <p role="alert" className="my-3 border-l-2 border-warning pl-3 text-sm text-muted-foreground">{t('Tutor AI belum dapat menampilkan interaksi ini. Minta tutor memperbaikinya.', 'The AI tutor could not display this interaction. Ask the tutor to fix it.')}</p>;
  if (!result.ok) return fallback;
  return <InteractiveOutputBoundary fallback={fallback}><ValidatedToolInvocationView invocation={result.invocation} /></InteractiveOutputBoundary>;
}

function ValidatedToolInvocationView({ invocation }: { invocation: AiUiToolInvocation }) {
  const { t } = useLanguage();
  switch (invocation.toolName) {
    case 'updateSimulationParams': {
      const entries = Object.entries(invocation.args.params ?? {});
      return (
        <div className="my-2 flex flex-wrap items-center gap-x-3 gap-y-1 border-y border-border/70 py-2 font-mono text-[11px] text-primary">
          <span className="inline-flex items-center gap-1.5 font-semibold">
            <SlidersHorizontal className="size-3" />
            {t('Simulasi diperbarui', 'Simulation updated')}
          </span>
          {entries.map(([k, v]) => (
            <span key={k} className="text-foreground">
              {k} = {v}
            </span>
          ))}
        </div>
      );
    }

    case 'revealSolutionStep': {
      return (
        <div className="my-2 flex items-center gap-2 border-y border-border/70 py-2 text-xs text-primary">
          <ListChecks className="size-3.5 shrink-0" />
          <span>
            {t(`Langkah ${invocation.args.stepIndex + 1} dibuka di halaman`, `Step ${invocation.args.stepIndex + 1} opened on the page`)}
            {invocation.args.note ? `: ${invocation.args.note}` : ''}
          </span>
        </div>
      );
    }

    case 'showFormulaBreakdown': {
      return (
        <div className="my-2.5 space-y-2 border-y border-border/80 py-3">
          <div className="text-xs font-semibold text-primary">
            {invocation.args.title}
          </div>
          <MathExpression
            latex={invocation.args.latex}
            display
            className="text-[13.5px]"
          />
          {invocation.args.symbols.length > 0 && (
            <dl className="divide-y divide-border/60 text-xs">
              {invocation.args.symbols.map((sym, idx) => (
                <div
                  key={idx}
                  className="grid grid-cols-[auto_minmax(0,1fr)] items-baseline gap-x-3 gap-y-2 py-2.5 sm:grid-cols-[auto_minmax(0,1fr)_auto]"
                >
                  <dt className="font-medium text-foreground">
                    <MathExpression
                      latex={sym.symbol}
                      className="text-xs"
                    />
                  </dt>
                  <dd className="text-muted-foreground">
                    <MathMarkdown content={sym.meaning} className="text-xs leading-relaxed" />
                  </dd>
                  {sym.unit && (
                    <dd className="col-start-2 font-mono text-[11px] text-muted-foreground sm:col-start-auto">
                      <MathMarkdown content={sym.unit} className="text-[11px]" />
                    </dd>
                  )}
                </div>
              ))}
            </dl>
          )}
        </div>
      );
    }

    case 'showStepDerivation': {
      return (
        <div className="my-2.5 space-y-2 border-y border-border/80 py-3">
          <div className="text-xs font-semibold text-primary">
            {invocation.args.title}
          </div>
          <ol className="divide-y divide-border/60">
            {invocation.args.steps.map((s, idx) => (
              <li
                key={idx}
                className="grid min-w-0 grid-cols-[1.25rem_minmax(0,1fr)] gap-x-2 py-3"
              >
                <span className="pt-2 font-mono text-[11px] text-primary" aria-hidden="true">
                  {idx + 1}.
                </span>
                <div className="min-w-0 space-y-2">
                  <MathExpression
                    latex={s.expression}
                    display
                    className="tutor-derivation-expression text-[14px]"
                  />
                  <MathMarkdown
                    content={s.rule}
                    className="text-[13px] text-muted-foreground"
                  />
                </div>
              </li>
            ))}
          </ol>
        </div>
      );
    }

    case 'showComparisonTable': {
      return (
        <div className="my-2.5 space-y-1.5 border-y border-border/80 py-3">
          <div className="text-xs font-semibold text-primary">
            {invocation.args.title}
          </div>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-border text-[11px] text-muted-foreground uppercase">
                  {invocation.args.columns.map((col, idx) => (
                    <th key={idx} className="min-w-[10rem] py-2.5 pr-4 font-semibold">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border/60">
                {invocation.args.rows.map((row, rIdx) => (
                  <tr key={rIdx}>
                    {row.map((cell, cIdx) => (
                      <td
                        key={cIdx}
                        className="min-w-[10rem] py-2.5 pr-4 align-top text-foreground"
                      >
                        <MathMarkdown
                          content={cell}
                          className="text-xs leading-snug"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    }

    case 'showQuickQuiz': {
      return <QuickQuizBlock data={invocation.args} />;
    }

    case 'showPitfallWarning': {
      return (
        <div className="my-2.5 space-y-2 border-l-2 border-warning py-1 pl-3.5 text-xs">
          <div className="flex items-center gap-1.5 text-[11px] font-semibold tracking-wider text-warning uppercase">
            <AlertTriangle className="size-3.5 shrink-0" />
            <span>{invocation.args.title}</span>
          </div>
          <div className="space-y-1 text-muted-foreground">
            <div>
              <span className="font-medium text-foreground">{t('Sering keliru: ', 'Common mistake: ')}</span>
              <MathMarkdown
                content={invocation.args.misconception}
                className="inline text-xs text-muted-foreground"
              />
            </div>
            <div>
              <span className="font-medium text-success">{t('Seharusnya: ', 'Correction: ')}</span>
              <MathMarkdown
                content={invocation.args.correction}
                className="inline text-xs text-foreground"
              />
            </div>
          </div>
        </div>
      );
    }

    case 'renderInteractivePlot': {
      return (
        <React.Suspense
          fallback={<Skeleton className="my-2.5 h-[220px] w-full" />}
        >
          <LazyInteractivePlot data={invocation.args} />
        </React.Suspense>
      );
    }

    case 'renderInteractive3D': {
      return (
        <React.Suspense
          fallback={<Skeleton className="my-2.5 h-[240px] w-full" />}
        >
          <LazyInteractive3D data={invocation.args} />
        </React.Suspense>
      );
    }

    case 'renderInteractiveSimulation': {
      return <React.Suspense fallback={<Skeleton className="my-3 h-[280px] w-full" />}><LazyInteractiveSimulation data={invocation.args} /></React.Suspense>;
    }

    default:
      return null;
  }
}
