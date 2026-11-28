import * as React from 'react';
import { cn } from '../lib/utils';

export function Input({
  className,
  type = 'text',
  ...props
}: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'flex h-8 w-full border-0 border-b border-border bg-transparent px-1 text-[13px] text-foreground transition-colors outline-none placeholder:text-muted-foreground/70 focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-45',
        className
      )}
      {...props}
    />
  );
}
