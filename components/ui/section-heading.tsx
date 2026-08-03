import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { SplitWords } from "@/components/ui/split-words";

type SectionHeadingProps = {
  /** Libellé monospace au-dessus du titre. */
  eyebrow?: string;
  /** Titre en texte simple (il est animé mot à mot). */
  title: string;
  /** Portion du titre mise en italique. */
  em?: string;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

/**
 * Titre de section : étiquette + titre serif animé mot à mot,
 * texte d'accompagnement décalé dans une seconde colonne.
 */
export function SectionHeading({
  eyebrow,
  title,
  em,
  description,
  align = "left",
  className,
}: SectionHeadingProps) {
  const centered = align === "center";

  return (
    <div
      className={cn(
        "flex flex-col gap-8",
        centered ? "items-center text-center" : "items-start",
        className
      )}
    >
      {eyebrow ? (
        <Reveal variant="fade" duration={0.6}>
          <Badge>{eyebrow}</Badge>
        </Reveal>
      ) : null}

      <div
        className={cn(
          "flex w-full flex-col gap-8",
          !centered && description && "md:flex-row md:items-end md:gap-16"
        )}
      >
        <SplitWords
          text={title}
          em={em}
          className={cn(
            "font-display text-[2.5rem] leading-[1.03] tracking-[-0.02em] text-balance md:text-6xl",
            centered ? "max-w-3xl" : "md:flex-1"
          )}
        />

        {description ? (
          <Reveal
            variant="up"
            delay={0.15}
            className={cn(
              centered ? "max-w-2xl" : "md:max-w-sm md:flex-1 md:pb-2"
            )}
          >
            <p className="text-base leading-relaxed text-muted text-pretty md:text-lg">
              {description}
            </p>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
