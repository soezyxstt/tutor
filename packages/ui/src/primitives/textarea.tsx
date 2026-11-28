import * as React from 'react';
import { cn } from '../lib/utils';

export function Textarea({
  className,
  ...props
}: React.ComponentProps<'textarea'>) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        'flex min-h-16 w-full resize-none border-0 border-b border-input bg-transparent px-1 py-1.5 text-[13px] leading-relaxed text-foreground transition-colors outline-none placeholder:text-muted-foreground focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-45',
        className
      )}
      {...props}
    />
  );
}
