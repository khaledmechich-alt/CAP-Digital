"use client";

import { motion, type Variants } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CodeScroll } from "@/components/ui/code-scroll";
import { Container } from "@/components/ui/container";

const headlineWords = [
  "Des",
  "sites",
  "web",
  "qui",
  "transforment",
  "vos",
  "visiteurs",
  "en",
  "clients.",
];

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.07, delayChildren: 0.15 },
  },
};

const wordVariants: Variants = {
  hidden: { opacity: 0, y: 26 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden pt-40 pb-20 md:pt-52 md:pb-28">
      {/* Fond : code qui défile */}
      <div
        className="absolute inset-0 overflow-hidden opacity-30 dark:opacity-40"
        aria-hidden
      >
        <CodeScroll />
      </div>
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_75%_70%_at_50%_35%,transparent_30%,var(--background))]"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background"
        aria-hidden
      />

      {/* Fond : trame + halos lumineux */}
      <div
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]"
        aria-hidden
      />
      <div
        className="glow-orb top-[-240px] left-1/2 size-[640px] -translate-x-1/2"
        aria-hidden
      />
      <div
        className="glow-orb top-[160px] left-[-200px] size-[420px] opacity-60"
        aria-hidden
      />

      <Container className="relative flex flex-col items-center gap-8 text-center">
        <motion.div variants={fadeUp} initial="hidden" animate="visible">
          <Badge>Agence web premium</Badge>
        </motion.div>

        <motion.h1
          className="font-display max-w-4xl text-5xl leading-[1.08] font-bold tracking-tight text-balance md:text-7xl"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {headlineWords.map((word, index) => (
            <motion.span
              key={`${word}-${index}`}
              variants={wordVariants}
              className={
                word === "clients."
                  ? "text-gradient-accent inline-block"
                  : "inline-block"
              }
            >
              {word}
              {index < headlineWords.length - 1 ? " " : ""}
            </motion.span>
          ))}
        </motion.h1>

        <motion.p
          className="max-w-2xl text-lg leading-relaxed text-muted text-pretty md:text-xl"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.7 }}
        >
          Sites vitrines, boutiques e-commerce et référencement Google.
          CAP&nbsp;DIGITAL conçoit des sites rapides et élégants qui développent
          l&apos;activité des PME, artisans et entrepreneurs.
        </motion.p>

        <motion.div
          className="flex flex-col items-center gap-4 sm:flex-row"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.85 }}
        >
          <Button href="/contact" size="lg">
            Demander un devis gratuit
          </Button>
          <Button href="/realisations" variant="secondary" size="lg">
            Voir nos réalisations
          </Button>
        </motion.div>

        <motion.div
          className="mt-4 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-muted"
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          transition={{ delay: 1 }}
        >
          <span>Réponse sous 24h</span>
          <span>Devis gratuit, sans engagement</span>
        </motion.div>
      </Container>
    </section>
  );
}
