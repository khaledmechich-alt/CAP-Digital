"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { cn } from "@/lib/utils";

/**
 * Cadre d'image dont le contenu glisse un peu plus lentement que
 * la page : l'image « respire » dans son cadre pendant le défilement.
 */
export function ParallaxMedia({
  children,
  className,
  amount = 44,
}: {
  children: React.ReactNode;
  className?: string;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-amount, amount]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="h-full w-full"
        style={
          reduceMotion
            ? undefined
            : { y, scale: 1 + (amount * 2) / 400, transformOrigin: "center" }
        }
      >
        {children}
      </motion.div>
    </div>
  );
}
