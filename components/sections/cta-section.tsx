import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { SplitWords } from "@/components/ui/split-words";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";

type CtaSectionProps = {
  /** Titre en texte simple (animé mot à mot). */
  title?: string;
  /** Portion du titre mise en italique. */
  em?: string;
  description?: string;
};

/**
 * Bloc de fin de page : grande phrase, coordonnées lisibles,
 * pas d'encadré ni de halo.
 */
export function CtaSection({
  title = "Prêt à développer votre activité ?",
  em = "votre activité ?",
  description = "Parlons de votre projet autour d'un premier échange gratuit et sans engagement. Devis clair sous 48h, réponse garantie sous 24h.",
}: CtaSectionProps) {
  return (
    <section className="border-t border-border-subtle bg-background-alt py-24 md:py-40">
      <Container className="flex flex-col gap-14">
        <SplitWords
          text={title}
          em={em}
          className="font-display max-w-[14ch] text-[2.75rem] leading-[0.98] tracking-[-0.03em] md:text-8xl"
        />

        <div className="flex flex-col gap-10 md:flex-row md:items-end md:justify-between md:gap-16">
          <Reveal variant="up" delay={0.1}>
            <p className="max-w-md leading-relaxed text-muted text-pretty">
              {description}
            </p>
          </Reveal>

          <Reveal variant="up" delay={0.2}>
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:gap-8">
              <Magnetic>
                <Button href="/contact" size="lg">
                  Demander un devis gratuit
                </Button>
              </Magnetic>
              <a
                href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                className="label-mono link-line text-foreground"
              >
                {siteConfig.phone}
              </a>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
