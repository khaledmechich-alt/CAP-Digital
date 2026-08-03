import { testimonials } from "@/lib/testimonials";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { ArrowLink } from "@/components/ui/button";

/**
 * Nous n'avons pour l'instant qu'un seul avis client réel : il est
 * traité en grande citation plutôt qu'en grille de cartes, pour ne pas
 * faire croire qu'il y en a beaucoup.
 */
export function TestimonialsSection() {
  const testimonial = testimonials[0];
  if (!testimonial) return null;

  return (
    <section className="border-t border-border-subtle py-20 md:py-28">
      <Container className="flex flex-col gap-10">
        <Reveal variant="fade" duration={0.6}>
          <Badge>Ce qu&apos;on nous dit</Badge>
        </Reveal>

        <Reveal variant="mask" duration={1}>
          <blockquote className="font-display max-w-4xl text-2xl leading-[1.2] tracking-[-0.02em] text-balance md:text-4xl">
            <span className="text-muted">«&nbsp;</span>
            {testimonial.quote}
            <span className="text-muted">&nbsp;»</span>
          </blockquote>
        </Reveal>

        <Reveal variant="up" delay={0.1}>
          <div className="label-mono flex flex-wrap items-baseline gap-x-4 gap-y-1">
            <span className="text-foreground">{testimonial.name}</span>
            <span aria-hidden>·</span>
            <span>{testimonial.role}</span>
            <span aria-hidden>·</span>
            <span className="text-accent">{testimonial.rating}/5</span>
          </div>
        </Reveal>

        <Reveal variant="up" delay={0.15}>
          <ArrowLink href="/temoignages">Voir la page témoignages</ArrowLink>
        </Reveal>
      </Container>
    </section>
  );
}
