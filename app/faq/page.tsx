import type { Metadata } from "next";
import { faqItems } from "@/lib/faq";
import { JsonLd } from "@/components/seo/json-ld";
import { PageHero } from "@/components/sections/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Accordion } from "@/components/ui/accordion";

export const metadata: Metadata = {
  title: "FAQ — Questions fréquentes",
  description:
    "Prix d'un site internet, délais, référencement Google, maintenance : toutes les réponses aux questions que vous vous posez avant de lancer votre projet web.",
};

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function FaqPage() {
  const categories = [...new Set(faqItems.map((item) => item.category))];

  return (
    <>
      <JsonLd data={faqSchema} />
      <PageHero
        eyebrow="FAQ"
        title={
          <>
            Toutes les réponses,{" "}
            <span className="text-gradient-accent">sans langue de bois</span>
          </>
        }
        description="Prix, délais, autonomie, référencement : nous répondons ici aux questions qu'on nous pose tous les jours. Il en manque une ? Écrivez-nous."
      />

      <section className="pb-24 md:pb-32">
        <Container className="flex max-w-4xl flex-col gap-14">
          {categories.map((category, index) => (
            <Reveal key={category} delay={index * 0.05}>
              <div className="flex flex-col gap-6">
                <h2 className="font-display text-2xl font-semibold tracking-tight">
                  {category}
                </h2>
                <Accordion
                  items={faqItems
                    .filter((item) => item.category === category)
                    .map(({ question, answer }) => ({ question, answer }))}
                />
              </div>
            </Reveal>
          ))}
        </Container>
      </section>

      <CtaSection
        title={
          <>
            Une question qui n&apos;est pas ici&nbsp;?{" "}
            <span className="text-gradient-accent">Posez-la directement.</span>
          </>
        }
        description="Nous répondons à tous les messages sous 24h, sans exception. Et promis : la réponse sera claire, honnête et sans jargon."
      />
    </>
  );
}
