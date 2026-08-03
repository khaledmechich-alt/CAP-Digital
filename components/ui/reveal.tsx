"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

type RevealVariant = "up" | "fade" | "mask" | "blur" | "scale";

const variantMap: Record<RevealVariant, Variants> = {
  // Glissement discret vers le haut
  up: {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0 },
  },
  // Simple fondu, pour les blocs déjà en mouvement
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  // Le contenu se dévoile derrière un cache qui remonte
  mask: {
    hidden: { opacity: 0, y: 40, clipPath: "inset(0 0 100% 0)" },
    visible: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" },
  },
  // Mise au point progressive — donne du relief aux images
  blur: {
    hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)" },
  },
  // Léger zoom arrière, pour les visuels
  scale: {
    hidden: { opacity: 0, scale: 1.04 },
    visible: { opacity: 1, scale: 1 },
  },
};

/**
 * Fait apparaître son contenu lorsqu'il entre dans l'écran (une seule fois).
 * `variant` choisit la façon dont l'apparition se joue.
 */
export function Reveal({
  children,
  delay = 0,
  duration = 0.8,
  variant = "up",
  className,
  as = "div",
}: {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  variant?: RevealVariant;
  className?: string;
  as?: "div" | "li" | "section" | "span";
}) {
  const reduceMotion = useReducedMotion();
  const Component = motion[as];

  if (reduceMotion) {
    const Static = as;
    return <Static className={cn(className)}>{children}</Static>;
  }

  return (
    <Component
      className={cn(className)}
      variants={variantMap[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration, ease: [0.16, 1, 0.3, 1], delay }}
    >
      {children}
    </Component>
  );
}

/**
 * Filet horizontal qui se trace de gauche à droite à l'entrée dans l'écran.
 * Sert de séparateur entre les sections, à la place d'une simple bordure.
 */
export function RuleDraw({
  className,
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      aria-hidden
      className={cn("h-px w-full origin-left bg-border-subtle", className)}
      initial={reduceMotion ? undefined : { scaleX: 0 }}
      whileInView={reduceMotion ? undefined : { scaleX: 1 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay }}
    />
  );
}
