import type { Metadata } from "next";
import { services } from "@/lib/services";
import { PageHero } from "@/components/sections/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Nos services — Création de sites, e-commerce, SEO",
  description:
    "Création de sites vitrines, boutiques e-commerce, refonte, référencement Google, maintenance et accompagnement digital. Des solutions clé en main pour PME et artisans.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="Nos services"
        title="Des solutions complètes pour votre présence en ligne"
        em="votre présence en ligne"
        description="De la création de votre premier site à l'optimisation de votre visibilité sur Google, chaque prestation est pensée pour un seul objectif : développer votre activité."
      />

      {services.map((service, index) => {
        const reversed = index % 2 === 1;
        return (
          <section
            key={service.slug}
            id={service.slug}
            className="scroll-mt-24 border-t border-border-subtle py-20 md:py-28"
          >
            <Container>
              <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
                <Reveal
                  variant="up"
                  className={cn(
                    "lg:col-span-6",
                    reversed && "lg:order-2 lg:col-start-7"
                  )}
                >
                  <div className="flex flex-col gap-6">
                    <span className="label-mono">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-display text-4xl leading-[1.05] tracking-[-0.025em] md:text-6xl">
                      {service.title}
                    </h2>
                    <p className="font-display em-serif text-2xl text-accent">
                      {service.tagline}
                    </p>
                    <p className="max-w-xl leading-relaxed text-muted text-pretty">
                      {service.description}
                    </p>
                  </div>
                </Reveal>

                <Reveal
                  variant="up"
                  delay={0.12}
                  className={cn(
                    "lg:col-span-5 lg:col-start-8 lg:pt-14",
                    reversed && "lg:order-1 lg:col-start-1"
                  )}
                >
                  <ul className="flex flex-col divide-y divide-border-subtle border-y border-border-subtle">
                    {service.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-baseline gap-4 py-4 leading-relaxed"
                      >
                        <span className="label-mono shrink-0 text-accent" aria-hidden>
                          —
                        </span>
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </Container>
          </section>
        );
      })}

      <CtaSection
        title="Un projet en tête ? Parlons-en."
        em="Parlons-en."
        description="Chaque projet commence par un échange gratuit et sans engagement. Expliquez-nous votre besoin, nous vous conseillons honnêtement — même si la meilleure solution n'est pas chez nous."
      />
    </>
  );
}
