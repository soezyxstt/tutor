import type { ReactNode } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { TUTOR_EASE } from './motion-provider';
import { cn } from '../lib/utils';

export function CollapsibleMotion({
  open,
  children,
  className,
}: {
  open: boolean;
  children: ReactNode;
  className?: string;
}) {
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.24, ease: TUTOR_EASE }}
          className={cn('overflow-hidden', className)}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
