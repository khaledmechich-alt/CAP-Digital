import { homeFaqItems } from "@/lib/faq";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "@/components/ui/reveal";
import { SplitWords } from "@/components/ui/split-words";
import { Accordion } from "@/components/ui/accordion";
import { ArrowLink } from "@/components/ui/button";

export function HomeFaq() {
  return (
    <section className="border-t border-border-subtle py-24 md:py-36">
      <Container className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        {/* Le titre reste accroché pendant qu'on parcourt les réponses. */}
        <div className="flex flex-col gap-7 lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
          <Reveal variant="fade" duration={0.6}>
            <Badge>Questions fréquentes</Badge>
          </Reveal>
          <SplitWords
            text="Vous vous posez sûrement ces questions"
            em="ces questions"
            className="font-display text-[2.25rem] leading-[1.05] tracking-[-0.02em] text-balance md:text-5xl"
          />
          <Reveal variant="up" delay={0.15}>
            <p className="max-w-sm leading-relaxed text-muted text-pretty">
              Prix, délais, autonomie : voici des réponses honnêtes aux
              questions qu&apos;on nous pose le plus.
            </p>
          </Reveal>
          <Reveal variant="up" delay={0.2}>
            <ArrowLink href="/faq">Voir toutes les questions</ArrowLink>
          </Reveal>
        </div>

        <Reveal variant="up" delay={0.1} className="lg:col-span-7">
          <Accordion
            items={homeFaqItems.map(({ question, answer }) => ({
              question,
              answer,
            }))}
          />
        </Reveal>
      </Container>
    </section>
  );
}
