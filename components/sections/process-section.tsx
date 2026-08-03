"use client";

import { motion, useReducedMotion } from "motion/react";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";

const steps = [
  {
    number: "01",
    title: "Échange & devis",
    description:
      "Un premier rendez-vous gratuit pour comprendre votre activité et vos objectifs. Vous recevez un devis clair sous 48h.",
  },
  {
    number: "02",
    title: "Design sur mesure",
    description:
      "Nous concevons une maquette à votre image. Vous validez chaque détail avant la moindre ligne de code.",
  },
  {
    number: "03",
    title: "Développement",
    description:
      "Votre site prend vie : rapide, sécurisé, parfait sur mobile et optimisé pour Google dès le premier jour.",
  },
  {
    number: "04",
    title: "Lancement & suivi",
    description:
      "Mise en ligne, formation à la prise en main, et accompagnement : nous restons à vos côtés après le lancement.",
  },
];

export function ProcessSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="border-t border-border-subtle py-20 md:py-28">
      <Container className="flex flex-col gap-14 md:gap-20">
        <SectionHeading
          eyebrow="Notre méthode"
          title="Un processus simple, sans jargon"
          em="sans jargon"
          description="Pas besoin d'être un expert du web : nous vous guidons à chaque étape, en français courant."
        />

        {/* Les étapes s'éclairent une à une au fil du défilement :
            celle qu'on est en train de lire est la seule pleinement lisible. */}
        <ol className="flex flex-col border-t border-border-subtle">
          {steps.map((step) => (
            <motion.li
              key={step.number}
              className="grid gap-4 border-b border-border-subtle py-10 md:grid-cols-12 md:gap-10 md:py-14"
              initial={reduceMotion ? undefined : { opacity: 0.28 }}
              whileInView={reduceMotion ? undefined : { opacity: 1 }}
              viewport={{ margin: "-35% 0px -35% 0px" }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            >
              <span
                className="font-display text-4xl leading-none tracking-[-0.02em] text-accent/45 md:col-span-2 md:text-6xl"
                aria-hidden
              >
                {step.number}
              </span>
              <h3 className="font-display text-2xl tracking-[-0.02em] md:col-span-5 md:text-3xl">
                {step.title}
              </h3>
              <p className="text-base leading-relaxed text-muted md:col-span-5">
                {step.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
