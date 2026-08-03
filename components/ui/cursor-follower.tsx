"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";

const INTERACTIVE =
  "a, button, input, textarea, select, summary, [role='button'], [data-cursor]";

/**
 * Anneau qui suit la souris avec un léger retard, et qui s'agrandit
 * quand on survole un élément cliquable. Souris uniquement : rien ne
 * s'affiche au doigt ni si l'utilisateur a demandé moins d'animations.
 */
export function CursorFollower() {
  const reduceMotion = useReducedMotion();
  const [enabled, setEnabled] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  // L'anneau traîne derrière le pointeur : c'est ce décalage qui donne
  // la sensation de matière.
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 });
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 });
  const dotX = useSpring(x, { stiffness: 900, damping: 40, mass: 0.2 });
  const dotY = useSpring(y, { stiffness: 900, damping: 40, mass: 0.2 });

  useEffect(() => {
    if (reduceMotion) return;
    if (!window.matchMedia("(pointer: fine)").matches) return;
    setEnabled(true);

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;
      x.set(event.clientX);
      y.set(event.clientY);
      setVisible(true);
      const target = event.target as Element | null;
      setActive(Boolean(target?.closest?.(INTERACTIVE)));
    };
    const onLeave = () => setVisible(false);

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [reduceMotion, x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-80">
      <motion.span
        className="absolute top-0 left-0 block rounded-full border border-accent"
        style={{ x: ringX, y: ringY }}
        animate={{
          width: active ? 46 : 28,
          height: active ? 46 : 28,
          marginLeft: active ? -23 : -14,
          marginTop: active ? -23 : -14,
          opacity: visible ? (active ? 0.9 : 0.45) : 0,
          backgroundColor: active ? "var(--accent-soft)" : "transparent",
        }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        className="absolute top-0 left-0 -mt-[2px] -ml-[2px] block size-1 rounded-full bg-accent"
        style={{ x: dotX, y: dotY }}
        animate={{ opacity: visible && !active ? 0.9 : 0 }}
        transition={{ duration: 0.2 }}
      />
    </div>
  );
}
