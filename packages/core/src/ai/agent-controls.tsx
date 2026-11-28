import * as React from 'react';
import { Button as UiSdkButton } from '@ui-sdk/react/button';
import {
  Slider as UiSdkSlider,
  SliderControl,
  SliderIndicator,
  SliderThumb,
  SliderTrack,
} from '@ui-sdk/react/slider';
import { Loader2 } from 'lucide-react';
import { buttonVariants, cn, type ButtonProps } from '@tutor/ui';

export function AgentButton({
  className, variant, size = 'default', isLoading, disabled, asChild,
  children, onClick, ...props
}: ButtonProps) {
  const icon = size === 'icon' || size === 'icon-sm' || size === 'icon-xs';
  return (
    <UiSdkButton
      {...props}
      data-tutor-agent-control=""
      disabled={disabled || isLoading}
      className={cn(buttonVariants({ variant: variant ?? (icon ? 'icon' : 'default'), size }), className)}
      onClick={onClick ? (event) => onClick(event as React.MouseEvent<HTMLButtonElement>) : undefined}
      render={asChild && React.isValidElement(children) ? children : undefined}
    >
      {asChild ? undefined : isLoading ? <><Loader2 aria-hidden="true" className="animate-spin" /><span>{children}</span></> : children}
    </UiSdkButton>
  );
}

type AgentSliderProps = Omit<React.ComponentProps<typeof UiSdkSlider>, 'value' | 'defaultValue' | 'onValueChange' | 'onValueCommit' | 'children'> & {
  value?: number[];
  defaultValue?: number[];
  onValueChange?: (value: number[]) => void;
  onValueCommit?: (value: number[]) => void;
};

export function AgentSlider({
  className, value, defaultValue, onValueChange, onValueCommit,
  'aria-label': label, 'aria-labelledby': labelledBy, ...props
}: AgentSliderProps) {
  const count = Math.max(1, (value ?? defaultValue)?.length ?? 1);
  return (
    <UiSdkSlider
      {...props}
      data-tutor-agent-control=""
      aria-label={label}
      aria-labelledby={labelledBy}
      value={value}
      defaultValue={defaultValue}
      onValueChange={(next) => onValueChange?.(Array.isArray(next) ? next : [next])}
      onValueCommit={(next) => onValueCommit?.(Array.isArray(next) ? next : [next])}
      className={cn('relative w-full select-none', typeof className === 'string' ? className : undefined)}
    >
      <SliderControl className="flex min-h-6 w-full touch-none items-center data-disabled:pointer-events-none data-disabled:opacity-50">
        <SliderTrack className="relative h-1 w-full rounded-full bg-input">
          <SliderIndicator className="absolute h-full rounded-full bg-primary" />
          {Array.from({ length: count }, (_, index) => (
            <SliderThumb
              key={index}
              index={index}
              aria-label={count === 1 ? label : `${label ?? 'Value'} ${index + 1}`}
              aria-labelledby={count === 1 ? labelledBy : undefined}
              className="absolute top-1/2 block size-3.5 -translate-y-1/2 cursor-pointer rounded-full border border-primary bg-background has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring"
            />
          ))}
        </SliderTrack>
      </SliderControl>
    </UiSdkSlider>
  );
}
