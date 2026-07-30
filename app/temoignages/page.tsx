import type { Metadata } from "next";
import { testimonials } from "@/lib/testimonials";
import { PageHero } from "@/components/sections/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { TestimonialCard } from "@/components/ui/testimonial-card";

export const metadata: Metadata = {
  title: "Témoignages clients",
  description:
    "Découvrez ce que nos clients disent de CAP DIGITAL : des sites livrés dans les temps, des résultats concrets et un accompagnement humain.",
};

export default function TemoignagesPage() {
  return (
    <>
      <PageHero
        eyebrow="Témoignages"
        title={
          <>
            Nos clients parlent{" "}
            <span className="text-gradient-accent">mieux que nous</span>
          </>
        }
        description="Voici ce que nos clients retiennent de leur collaboration avec CAP DIGITAL."
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="mx-auto grid w-full max-w-2xl gap-6">
            {testimonials.map((testimonial, index) => (
              <Reveal key={testimonial.name} delay={(index % 3) * 0.08}>
                <TestimonialCard testimonial={testimonial} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection
        title={
          <>
            Le prochain témoignage,{" "}
            <span className="text-gradient-accent">
              ce sera peut-être le vôtre.
            </span>
          </>
        }
      />
    </>
  );
}
