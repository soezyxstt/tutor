/** Distinguish clock telemetry from an external slider or AI seek. */
export function createTimePositionSync() {
  let lastPosition: number | undefined;
  return {
    forget() { lastPosition = undefined; },
    receive(position: number | undefined, end: number): number | undefined {
      if (position === undefined || !Number.isFinite(position) || position === lastPosition) return;
      lastPosition = position;
      return Math.max(0, Math.min(100, position)) / 100 * end;
    },
    publish(time: number, end: number, write: (position: number) => void) {
      const position = end > 0 ? Math.max(0, Math.min(100, time / end * 100)) : 0;
      if (position === lastPosition) return;
      // Mark before writing: the shared store may notify its consumers immediately.
      lastPosition = position;
      write(position);
    },
  };
}
