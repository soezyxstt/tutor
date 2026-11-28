import { useEffect, useState } from 'react';
export function resolveColor(value: string) {
  const match = value.match(/^var\((--[\w-]+)\)$/);
  return match ? getComputedStyle(document.documentElement).getPropertyValue(match[1]).trim() : value;
}
export function useThemeRevision() {
  const [revision, update] = useState(0);
  useEffect(() => {
    const observer = new MutationObserver(() => update(value => value + 1));
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class', 'data-theme'] });
    return () => observer.disconnect();
  }, []);
  return revision;
}
