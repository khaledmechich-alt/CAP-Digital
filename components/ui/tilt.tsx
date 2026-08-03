"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Incline légèrement son contenu vers le curseur, comme une carte
 * qu'on tiendrait à la main. Souris uniquement.
 */
export function Tilt({
  children,
  className,
  max = 6,
}: {
  children: React.ReactNode;
  className?: string;
  /** Inclinaison maximale, en degrés. */
  max?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Position du pointeur dans la carte, de -0,5 à +0,5.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 200, damping: 24, mass: 0.5 });
  const sy = useSpring(py, { stiffness: 200, damping: 24, mass: 0.5 });
  const rotateX = useTransform(sy, [-0.5, 0.5], [max, -max]);
  const rotateY = useTransform(sx, [-0.5, 0.5], [-max, max]);

  if (reduceMotion) {
    return <div className={cn(className)}>{children}</div>;
  }

  const handleMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType !== "mouse" || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    px.set((event.clientX - rect.left) / rect.width - 0.5);
    py.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    px.set(0);
    py.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      style={{ rotateX, rotateY, transformPerspective: 1100 }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  );
}
