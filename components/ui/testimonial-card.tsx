import type { Testimonial } from "@/lib/testimonials";

export function TestimonialCard({
  testimonial,
}: {
  testimonial: Testimonial;
}) {
  return (
    <figure className="flex h-full flex-col gap-5 rounded-2xl border border-border-subtle bg-card p-8">
      <p className="text-sm font-semibold text-accent">
        Note : {testimonial.rating}/5
      </p>
      <blockquote className="flex-1 leading-relaxed text-pretty">
        « {testimonial.quote} »
      </blockquote>
      <figcaption className="flex items-center justify-between gap-4 border-t border-border-subtle pt-5">
        <div>
          <p className="font-semibold">{testimonial.name}</p>
          <p className="text-sm text-muted">{testimonial.role}</p>
        </div>
        {testimonial.highlight ? (
          <span className="rounded-full bg-accent-soft px-3 py-1 text-xs font-semibold whitespace-nowrap text-accent">
            {testimonial.highlight}
          </span>
        ) : null}
      </figcaption>
    </figure>
  );
}
