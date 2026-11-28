import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Slot } from 'radix-ui';
import { Loader2 } from 'lucide-react';
import { cn } from '../lib/utils';

const buttonVariants = cva(
  'inline-flex shrink-0 cursor-pointer items-center justify-center rounded-md text-[13px] font-medium whitespace-nowrap transition-colors outline-none select-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background active:translate-y-px disabled:pointer-events-none disabled:opacity-45 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*="size-"])]:size-3.5',
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground hover:bg-primary-hover',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-muted',
        outline:
          'border border-input bg-transparent text-foreground hover:bg-surface-subtle',
        ghost:
          'border-0 bg-transparent text-muted-foreground hover:bg-surface-subtle hover:text-foreground',
        icon:
          'border-0 bg-transparent text-muted-foreground hover:text-foreground active:translate-y-0',
        destructive:
          'bg-destructive/10 text-destructive hover:bg-destructive/20',
        link:
          'border-0 bg-transparent p-0 text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-7 gap-1.5 px-2.5',
        xs: 'h-5.5 gap-1 px-1.5 text-xs',
        sm: 'h-6 gap-1 px-2 text-xs',
        lg: 'h-8 gap-1.5 px-3 text-sm',
        icon: 'size-7 p-0',
        'icon-sm': 'size-6 p-0',
        'icon-xs': 'size-5 p-0 [&_svg:not([class*="size-"])]:size-3',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export type ButtonProps = React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
    isLoading?: boolean;
  };

export function Button({
  className,
  variant,
  size = 'default',
  asChild = false,
  isLoading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot.Root : 'button';
  const isIconSize = size === 'icon' || size === 'icon-sm' || size === 'icon-xs';
  const resolvedVariant = variant ?? (isIconSize ? 'icon' : 'default');
  const isDisabled = disabled || isLoading;

  if (asChild) {
    return (
      <Comp
        data-slot="button"
        className={cn(buttonVariants({ variant: resolvedVariant, size }), className)}
        {...props}
      >
        {children}
      </Comp>
    );
  }

  return (
    <Comp
      data-slot="button"
      type={props.type ?? 'button'}
      disabled={isDisabled}
      className={cn(buttonVariants({ variant: resolvedVariant, size }), className)}
      {...props}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin" />
          <span>{children}</span>
        </>
      ) : (
        children
      )}
    </Comp>
  );
}

export { buttonVariants };
