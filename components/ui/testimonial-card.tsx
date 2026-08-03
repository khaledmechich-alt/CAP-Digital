import type { Testimonial } from "@/lib/testimonials";

export function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <figure className="flex h-full flex-col gap-6 border-t border-border-subtle pt-8">
      <blockquote className="font-display flex-1 text-xl leading-[1.4] tracking-[-0.015em] text-pretty md:text-2xl">
        « {testimonial.quote} »
      </blockquote>
      <figcaption className="flex flex-wrap items-baseline justify-between gap-4">
        <div className="label-mono flex flex-wrap items-baseline gap-x-3">
          <span className="text-foreground">{testimonial.name}</span>
          <span aria-hidden>·</span>
          <span>{testimonial.role}</span>
        </div>
        <span className="label-mono text-accent">
          {testimonial.rating}/5
          {testimonial.highlight ? ` · ${testimonial.highlight}` : ""}
        </span>
      </figcaption>
    </figure>
  );
}
