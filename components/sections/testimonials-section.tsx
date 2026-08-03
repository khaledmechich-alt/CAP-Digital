import { testimonials } from "@/lib/testimonials";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";
import { TestimonialCard } from "@/components/ui/testimonial-card";

export function TestimonialsSection() {
  return (
    <section className="border-t border-border-subtle py-24 md:py-32">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="Témoignages"
          title={
            <>
              Ils ont fait le pari du web.{" "}
              <span className="text-gradient-accent">Ils ont gagné.</span>
            </>
          }
          description="La plus belle preuve de notre travail, ce sont les mots — et les résultats — de nos clients."
        />

        <div className="mx-auto grid w-full max-w-2xl gap-6">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.1}>
              <TestimonialCard testimonial={testimonial} />
            </Reveal>
          ))}
        </div>

        <Reveal className="flex justify-center">
          <Button href="/temoignages" variant="ghost">
            Lire tous les témoignages →
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
