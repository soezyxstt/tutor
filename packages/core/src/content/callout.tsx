import type { ReactNode } from 'react';
import { cn } from '@tutor/ui';

export type CalloutTone = 'note' | 'formula' | 'answer' | 'tip' | 'warning';

const toneStyles: Record<CalloutTone, { border: string; label: string }> = {
  note: {
    border: 'border-l-border',
    label: 'text-muted-foreground',
  },
  formula: {
    border: 'border-l-primary',
    label: 'text-primary',
  },
  answer: {
    border: 'border-l-success',
    label: 'text-success',
  },
  tip: {
    border: 'border-l-primary/70',
    label: 'text-primary',
  },
  warning: {
    border: 'border-l-warning',
    label: 'text-warning',
  },
};

export function Callout({
  tone = 'note',
  label,
  children,
  className,
}: {
  tone?: CalloutTone;
  label?: string;
  children: ReactNode;
  className?: string;
}) {
  const style = toneStyles[tone];
  return (
    <aside
      data-slot="callout"
      className={cn(
        'border-l-2 py-0.5 pl-4',
        style.border,
        className
      )}
    >
      {label && (
        <div className={cn('mb-1.5 text-xs font-semibold', style.label)}>
          {label}
        </div>
      )}
      <div className="min-w-0">{children}</div>
    </aside>
  );
}
