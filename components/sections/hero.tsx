"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type Transition,
} from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeScroll } from "@/components/ui/code-scroll";
import { Container } from "@/components/ui/container";
import { Magnetic } from "@/components/ui/magnetic";
import { SplitWords } from "@/components/ui/split-words";

const facts = [
  "Réponse sous 24 h",
  "Devis gratuit, sans engagement",
  "Espace client pour suivre le projet",
];

export function Hero() {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  // Lueur qui suit la souris dans le hero.
  const mx = useMotionValue(50);
  const my = useMotionValue(35);
  const glowX = useSpring(mx, { stiffness: 120, damping: 26, mass: 0.6 });
  const glowY = useSpring(my, { stiffness: 120, damping: 26, mass: 0.6 });
  const glow = useMotionTemplate`radial-gradient(420px circle at ${glowX}% ${glowY}%, var(--glow), transparent 70%)`;

  const handleMove = (event: React.PointerEvent<HTMLElement>) => {
    if (reduceMotion || event.pointerType !== "mouse" || !sectionRef.current)
      return;
    const rect = sectionRef.current.getBoundingClientRect();
    mx.set(((event.clientX - rect.left) / rect.width) * 100);
    my.set(((event.clientY - rect.top) / rect.height) * 100);
  };

  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 18 },
          animate: { opacity: 1, y: 0 },
          transition: {
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
            delay,
          } satisfies Transition,
        };

  return (
    <section
      ref={sectionRef}
      onPointerMove={handleMove}
      className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24"
    >
      {/* Fond : code qui défile, traité comme sur l'ancienne version du
          site — plein cadre, puis estompé par deux dégradés. */}
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden opacity-30 dark:opacity-40"
        aria-hidden
      >
        <CodeScroll />
      </div>
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_70%_at_50%_35%,transparent_30%,var(--background))]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background"
        aria-hidden
      />

      {/* Halos + lueur qui suit la souris */}
      <div
        className="glow-orb top-[-220px] left-[-120px] size-[560px]"
        aria-hidden
      />
      {!reduceMotion ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{ background: glow }}
        />
      ) : null}

      <Container className="relative flex flex-col gap-10">
        <motion.div {...rise(0.05)}>
          <Badge>Agence web — création de sites sur mesure</Badge>
        </motion.div>

        <SplitWords
          as="h1"
          trigger="load"
          delay={0.15}
          stagger={0.05}
          text="Des sites web qui transforment vos visiteurs en clients."
          em="en clients."
          className="font-display max-w-[15ch] text-4xl leading-[1.04] tracking-[-0.025em] sm:text-5xl md:text-6xl lg:text-7xl"
        />

        <div className="flex flex-col gap-7 md:max-w-2xl">
          <motion.p
            className="text-base leading-relaxed text-muted text-pretty md:text-lg"
            {...rise(0.7)}
          >
            Sites vitrines, boutiques e-commerce et référencement Google.
            CAP&nbsp;DIGITAL conçoit des sites rapides et élégants qui
            développent l&apos;activité des PME, artisans et entrepreneurs.
          </motion.p>

          <motion.div
            className="flex flex-col items-start gap-4 sm:flex-row sm:items-center"
            {...rise(0.85)}
          >
            <Magnetic>
              <Button href="/contact" size="lg">
                Demander un devis gratuit
              </Button>
            </Magnetic>
            <Magnetic strength={0.2}>
              <Button href="/realisations" variant="secondary" size="lg">
                Voir nos réalisations
              </Button>
            </Magnetic>
          </motion.div>
        </div>

        <motion.ul
          className="mt-4 flex flex-col divide-y divide-border-subtle border-y border-border-subtle sm:flex-row sm:divide-x sm:divide-y-0"
          {...rise(1)}
        >
          {facts.map((fact) => (
            <li
              key={fact}
              className="label-mono py-3.5 sm:flex-1 sm:px-6 sm:first:pl-0"
            >
              {fact}
            </li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
