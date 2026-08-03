import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Reveal, RuleDraw } from "@/components/ui/reveal";
import { SplitWords } from "@/components/ui/split-words";

type PageHeroProps = {
  eyebrow: string;
  /** Titre en texte simple (animé mot à mot). */
  title: string;
  /** Portion du titre mise en italique. */
  em?: string;
  description?: string;
};

/**
 * En-tête commun aux pages internes : cadré à gauche, gros titre serif,
 * texte d'accompagnement en seconde colonne, filet qui se trace en bas.
 */
export function PageHero({ eyebrow, title, em, description }: PageHeroProps) {
  return (
    <section className="pt-36 pb-12 md:pt-44 md:pb-16">
      <Container className="flex flex-col gap-10">
        <Reveal variant="fade" duration={0.6}>
          <Badge>{eyebrow}</Badge>
        </Reveal>

        <div className="flex flex-col gap-8 md:flex-row md:items-end md:gap-16">
          <SplitWords
            as="h1"
            trigger="load"
            text={title}
            em={em}
            className="font-display flex-1 text-[2.75rem] leading-[1.0] tracking-[-0.025em] text-balance md:text-7xl"
          />
          {description ? (
            <Reveal
              variant="up"
              delay={0.25}
              className="md:max-w-sm md:flex-1 md:pb-3"
            >
              <p className="text-base leading-relaxed text-muted text-pretty md:text-lg">
                {description}
              </p>
            </Reveal>
          ) : null}
        </div>

        <RuleDraw delay={0.35} />
      </Container>
    </section>
  );
}
