import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '../lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 text-[11px] font-medium tracking-wide whitespace-nowrap',
  {
    variants: {
      variant: {
        subtle: 'text-muted-foreground',
        primary: 'text-primary',
        success: 'text-success',
        warning: 'text-warning',
        destructive: 'text-destructive',
        tag: 'rounded-sm bg-surface-subtle px-1.5 py-0.5 text-muted-foreground',
      },
    },
    defaultVariants: {
      variant: 'subtle',
    },
  }
);

export function Badge({
  className,
  variant,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants>) {
  return (
    <span
      data-slot="badge"
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}
