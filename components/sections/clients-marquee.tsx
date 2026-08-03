import { services } from "@/lib/services";
import { Marquee } from "@/components/ui/marquee";

/**
 * Bandeau défilant listant ce que nous fabriquons.
 * (Volontairement pas une liste de logos clients : nous n'en affichons
 * que si ce sont de vrais clients.)
 */
export function ClientsMarquee() {
  return (
    <section
      aria-label="Ce que nous réalisons"
      className="overflow-hidden border-y border-border-subtle bg-background-alt py-7"
    >
      <Marquee>
        {services.map((service) => (
          <span
            key={service.slug}
            className="font-display flex items-center gap-16 text-2xl whitespace-nowrap text-muted md:text-3xl"
          >
            {service.title}
            <span className="size-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
          </span>
        ))}
      </Marquee>
    </section>
  );
}
