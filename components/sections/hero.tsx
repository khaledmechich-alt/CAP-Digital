"use client";

import { motion, useReducedMotion, type Transition } from "motion/react";
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
    <section className="relative overflow-hidden pt-36 pb-14 md:pt-44 md:pb-20">
      {/* Gouttière de code : une bande étroite le long du bord droit,
          reste du métier visible sans envahir la page. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[20%] overflow-hidden border-l border-border-subtle opacity-45 [mask-image:linear-gradient(to_bottom,transparent,black_18%,black_70%,transparent)] lg:block"
      >
        <div className="scale-[0.72] origin-top-left">
          <CodeScroll />
        </div>
      </div>

      <Container className="relative flex flex-col gap-12 lg:pr-[24%]">
        <motion.div {...rise(0.05)}>
          <Badge>Agence web — création de sites sur mesure</Badge>
        </motion.div>

        <SplitWords
          as="h1"
          trigger="load"
          delay={0.15}
          stagger={0.055}
          text="Des sites web qui transforment vos visiteurs en clients."
          em="en clients."
          className="font-display max-w-[16ch] text-[3rem] leading-[0.98] tracking-[-0.03em] sm:text-[4rem] md:text-[5.5rem]"
        />

        {/* Le texte et les boutons sont décalés vers la droite :
            le vide de gauche fait partie de la composition. */}
        <div className="flex flex-col gap-9 md:flex-row md:items-start md:gap-12 md:pl-[38%]">
          <div className="flex flex-col gap-8">
            <motion.p
              className="max-w-xl text-lg leading-relaxed text-muted text-pretty"
              {...rise(0.75)}
            >
              Sites vitrines, boutiques e-commerce et référencement Google.
              CAP&nbsp;DIGITAL conçoit des sites rapides et élégants qui
              développent l&apos;activité des PME, artisans et entrepreneurs.
            </motion.p>

            <motion.div
              className="flex flex-col items-start gap-4 sm:flex-row sm:items-center"
              {...rise(0.9)}
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
        </div>

        <motion.ul
          className="mt-2 flex flex-col divide-y divide-border-subtle border-y border-border-subtle sm:flex-row sm:divide-x sm:divide-y-0"
          {...rise(1.05)}
        >
          {facts.map((fact) => (
            <li key={fact} className="label-mono py-4 sm:flex-1 sm:px-6 sm:first:pl-0">
              {fact}
            </li>
          ))}
        </motion.ul>
      </Container>
    </section>
  );
}
