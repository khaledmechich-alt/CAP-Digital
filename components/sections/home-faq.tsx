import { homeFaqItems } from "@/lib/faq";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { Accordion } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export function HomeFaq() {
  return (
    <section className="border-t border-border-subtle py-24 md:py-32">
      <Container className="flex flex-col items-center gap-12">
        <SectionHeading
          eyebrow="Questions fréquentes"
          title="Vous vous posez sûrement ces questions"
          description="Prix, délais, autonomie : voici des réponses honnêtes aux questions qu'on nous pose le plus."
        />

        <Reveal className="w-full max-w-3xl">
          <Accordion
            items={homeFaqItems.map(({ question, answer }) => ({
              question,
              answer,
            }))}
          />
        </Reveal>

        <Reveal>
          <Button href="/faq" variant="ghost">
            Voir toutes les questions →
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
