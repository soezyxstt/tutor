import type { ReactNode } from 'react';
import { motion } from 'motion/react';
import { TUTOR_EASE } from './motion-provider';
import { cn } from '../lib/utils';

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.28, delay, ease: TUTOR_EASE }}
      className={cn('min-w-0', className)}
    >
      {children}
    </motion.div>
  );
}
