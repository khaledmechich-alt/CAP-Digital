"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { cn } from "@/lib/utils";

const container: Variants = {
  hidden: {},
  visible: {},
};

const word: Variants = {
  hidden: { y: "110%" },
  visible: {
    y: "0%",
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] },
  },
};

type SplitWordsProps = {
  /** Le titre, en texte simple. */
  text: string;
  /** Portion du titre à mettre en italique (doit apparaître telle quelle dans `text`). */
  em?: string;
  className?: string;
  /** `load` : joue au chargement. `view` : joue quand le titre entre dans l'écran. */
  trigger?: "load" | "view";
  delay?: number;
  stagger?: number;
  as?: "h1" | "h2" | "h3" | "p";
};

/**
 * Titre qui se dévoile mot à mot : chaque mot remonte depuis
 * une ligne masquée, comme un rideau qui se lève.
 */
export function SplitWords({
  text,
  em,
  className,
  trigger = "view",
  delay = 0,
  stagger = 0.045,
  as = "h2",
}: SplitWordsProps) {
  const reduceMotion = useReducedMotion();

  // Découpe le titre en trois morceaux autour de la portion en italique.
  const segments: { text: string; em: boolean }[] = [];
  if (em && text.includes(em)) {
    const start = text.indexOf(em);
    if (start > 0) segments.push({ text: text.slice(0, start), em: false });
    segments.push({ text: em, em: true });
    const rest = text.slice(start + em.length);
    if (rest) segments.push({ text: rest, em: false });
  } else {
    segments.push({ text, em: false });
  }

  const words = segments.flatMap((segment) =>
    segment.text
      .split(" ")
      .filter(Boolean)
      .map((value) => ({ value, em: segment.em }))
  );

  const Tag = motion[as];

  if (reduceMotion) {
    const Static = as;
    return (
      <Static className={cn(className)}>
        {words.map((item, index) => (
          <span key={index} className={item.em ? "em-serif" : undefined}>
            {item.value}
            {index < words.length - 1 ? " " : ""}
          </span>
        ))}
      </Static>
    );
  }

  return (
    <Tag
      className={cn(className)}
      variants={container}
      initial="hidden"
      {...(trigger === "load"
        ? { animate: "visible" }
        : {
            whileInView: "visible",
            viewport: { once: true, margin: "-90px" },
          })}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
    >
      {words.map((item, index) => (
        <span key={`${item.value}-${index}`}>
          {/* pb + mb négative : laisse la place aux jambages (g, p, y)
              sans changer la hauteur de ligne. */}
          <span className="inline-flex overflow-hidden pb-[0.16em] -mb-[0.16em] align-bottom">
            <motion.span
              variants={word}
              className={cn("inline-block", item.em && "em-serif")}
            >
              {item.value}
            </motion.span>
          </span>
          {index < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  );
}
