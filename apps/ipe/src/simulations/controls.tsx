import type { ComponentProps, ReactNode } from 'react';
import { Button, Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@tutor/ui';

export function IconButton({ label, children, ...props }: Omit<ComponentProps<typeof Button>, 'variant' | 'size'> & { label: string; children: ReactNode }) {
  return <Button {...props} variant="icon" size="icon-sm" aria-label={label} title={label}>{children}</Button>;
}
export function TextSelect({ value, onChange, options, label, className }: { value: string; onChange: (value: string) => void; options: { value: string; label: string }[]; label: string; className?: string }) {
  return <Select value={value} onValueChange={onChange}><SelectTrigger aria-label={label} className={className}><SelectValue /></SelectTrigger><SelectContent>{options.map(option => <SelectItem key={option.value} value={option.value}>{option.label}</SelectItem>)}</SelectContent></Select>;
}
