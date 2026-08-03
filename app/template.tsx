"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * Transition jouée à chaque changement de page : le contenu
 * arrive en fondu et se pose légèrement, au lieu d'apparaître d'un bloc.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) return <>{children}</>;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      {children}
    </motion.div>
  );
}
