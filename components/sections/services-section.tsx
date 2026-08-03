import Link from "next/link";
import { services } from "@/lib/services";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function ServicesSection() {
  return (
    <section className="py-24 md:py-36">
      <Container className="flex flex-col gap-16 md:gap-24">
        <SectionHeading
          eyebrow="Nos services"
          title="Tout ce qu'il faut pour réussir en ligne"
          em="réussir en ligne"
          description="De la création de votre site à son référencement sur Google, nous nous occupons de tout — vous restez concentré sur votre métier."
        />

        {/* Liste-index plutôt qu'une grille de cartes :
            on lit les services comme un sommaire. */}
        <ul className="border-t border-border-subtle">
          {services.map((service, index) => (
            <Reveal
              as="li"
              key={service.slug}
              variant="fade"
              delay={index * 0.06}
              duration={0.6}
              className="border-b border-border-subtle"
            >
              <Link
                href={`/services#${service.slug}`}
                className="group relative flex flex-col gap-3 py-7 transition-colors duration-500 md:grid md:grid-cols-12 md:items-baseline md:gap-8 md:py-9"
              >
                {/* Filet d'accent qui se déploie sous la ligne survolée */}
                <span
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                />

                <span className="label-mono md:col-span-1">
                  {String(index + 1).padStart(2, "0")}
                </span>

                <h3 className="font-display text-2xl tracking-[-0.02em] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 md:col-span-5 md:text-4xl">
                  {service.title}
                </h3>

                <p className="text-sm leading-relaxed text-muted md:col-span-5 md:text-base">
                  {service.tagline}
                </p>

                <span
                  className="text-xl text-muted transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 group-hover:text-accent md:col-span-1 md:justify-self-end"
                  aria-hidden
                >
                  →
                </span>
              </Link>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
