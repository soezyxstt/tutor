import { Monitor, Moon, Sun } from 'lucide-react';
import { Button } from '../primitives/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../primitives/dropdown-menu';
import { useTheme, type ThemeMode } from './theme-provider';
import { cn } from '../lib/utils';

const options: { value: ThemeMode; label: string; icon: typeof Sun }[] = [
  { value: 'light', label: 'Terang', icon: Sun },
  { value: 'dark', label: 'Gelap', icon: Moon },
  { value: 'system', label: 'Sistem', icon: Monitor },
];

export function ThemeToggle({ className, labels }: { className?: string; labels?: { toggle: string; light: string; dark: string; system: string } }) {
  const { theme, resolvedTheme, setTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="icon"
          size="icon"
          aria-label={labels?.toggle ?? 'Ubah tema'}
          className={cn('relative', className)}
        >
          <Sun
            className={cn(
              'size-4 transition-all duration-300',
              isDark ? 'scale-0 rotate-90 opacity-0' : 'scale-100 rotate-0 opacity-100'
            )}
            style={{ position: isDark ? 'absolute' : 'relative' }}
          />
          <Moon
            className={cn(
              'size-4 transition-all duration-300',
              isDark ? 'scale-100 rotate-0 opacity-100' : 'scale-0 -rotate-90 opacity-0'
            )}
            style={{ position: isDark ? 'relative' : 'absolute' }}
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {options.map(({ value, label, icon: Icon }) => (
          <DropdownMenuItem
            key={value}
            onClick={() => setTheme(value)}
            className={cn(
              theme === value ? 'font-medium text-foreground' : 'text-muted-foreground'
            )}
          >
            <Icon className="size-3.5" />
            <span className="flex-1">{labels?.[value] ?? label}</span>
            {theme === value && (
              <span className="size-1.5 rounded-full bg-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
