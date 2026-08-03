import Link from "next/link";
import { services } from "@/lib/services";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function ServicesSection() {
  return (
    <section className="py-24 md:py-32">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="Nos services"
          title={
            <>
              Tout ce qu&apos;il faut pour{" "}
              <span className="text-gradient-accent">réussir en ligne</span>
            </>
          }
          description="De la création de votre site à son référencement sur Google, nous nous occupons de tout — vous restez concentré sur votre métier."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <Reveal key={service.slug} delay={index * 0.08}>
              <Link
                href={`/services#${service.slug}`}
                className="group relative flex h-full flex-col gap-4 rounded-2xl border border-border-subtle bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-card-hover hover:shadow-[0_12px_48px_var(--glow)]"
              >
                <div className="flex flex-col gap-2">
                  <h3 className="font-display text-xl font-semibold">
                    {service.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">
                    {service.tagline}
                  </p>
                </div>
                <span className="mt-auto flex items-center gap-1.5 text-sm font-medium text-accent">
                  En savoir plus
                  <span
                    className="transition-transform group-hover:translate-x-0.5"
                    aria-hidden
                  >
                    →
                  </span>
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
