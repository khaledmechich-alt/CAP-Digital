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
        title={
          <>
            Des solutions complètes pour{" "}
            <span className="text-gradient-accent">votre présence en ligne</span>
          </>
        }
        description="De la création de votre premier site à l'optimisation de votre visibilité sur Google, chaque prestation est pensée pour un seul objectif : développer votre activité."
      />

      {services.map((service, index) => {
        const reversed = index % 2 === 1;
        return (
          <section
            key={service.slug}
            id={service.slug}
            className="scroll-mt-24 border-t border-border-subtle py-16 md:py-24"
          >
            <Container>
              <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
                <Reveal className={cn(reversed && "lg:order-2")}>
                  <div className="flex flex-col gap-5">
                    <h2 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
                      {service.title}
                    </h2>
                    <p className="text-lg font-medium text-accent">
                      {service.tagline}
                    </p>
                    <p className="leading-relaxed text-muted text-pretty">
                      {service.description}
                    </p>
                  </div>
                </Reveal>

                <Reveal
                  delay={0.12}
                  className={cn(reversed && "lg:order-1")}
                >
                  <ul className="flex flex-col gap-4 rounded-2xl border border-border-subtle bg-card p-8">
                    {service.benefits.map((benefit) => (
                      <li key={benefit} className="flex items-start gap-3">
                        <span
                          className="mt-2.5 size-1.5 shrink-0 rounded-full bg-accent"
                          aria-hidden
                        />
                        <span className="leading-relaxed">{benefit}</span>
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
        title={
          <>
            Un projet en tête&nbsp;?{" "}
            <span className="text-gradient-accent">Parlons-en.</span>
          </>
        }
        description="Chaque projet commence par un échange gratuit et sans engagement. Expliquez-nous votre besoin, nous vous conseillons honnêtement — même si la meilleure solution n'est pas chez nous."
      />
    </>
  );
}
