"use client";

import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";

/**
 * Filet d'avancement de lecture, collé en haut de la fenêtre.
 * Se remplit au fur et à mesure du défilement de la page.
 */
export function ScrollProgress() {
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  if (reduceMotion) return null;

  return (
    <motion.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-70 h-px origin-left bg-accent"
      style={{ scaleX }}
    />
  );
}
