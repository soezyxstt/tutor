import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { TUTOR_EASE } from './motion-provider';
import { cn } from '../lib/utils';

export function PageTransition({
  transitionKey,
  children,
  className,
}: {
  transitionKey: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      key={transitionKey}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.22, ease: TUTOR_EASE }}
      className={cn('min-w-0', className)}
    >
      {children}
    </motion.div>
  );
}
