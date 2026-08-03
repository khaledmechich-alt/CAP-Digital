import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "À propos — L'agence CAP DIGITAL",
  description:
    "CAP DIGITAL est une agence web à taille humaine qui aide PME, artisans et entrepreneurs à développer leur activité grâce à des sites web premium et un accompagnement honnête.",
};

const values = [
  {
    title: "Transparence",
    description:
      "Des devis détaillés ligne par ligne, des explications sans jargon, et jamais de frais cachés. Vous savez toujours où va votre argent.",
  },
  {
    title: "Exigence",
    description:
      "Chaque pixel, chaque milliseconde de chargement compte. Nous livrons un travail dont nous sommes fiers — ou nous ne le livrons pas.",
  },
  {
    title: "Proximité",
    description:
      "Un interlocuteur unique qui connaît votre projet par cœur, répond sous 24h et parle votre langue, pas celle des développeurs.",
  },
  {
    title: "Résultats",
    description:
      "Un beau site ne suffit pas : il doit vous rapporter des clients. Nous mesurons nos réussites aux vôtres, chiffres à l'appui.",
  },
];

const commitments = [
  "Un devis clair sous 48h, gratuit et sans engagement",
  "Un site dont vous êtes propriétaire à 100 %",
  "Des délais annoncés dès le départ, et tenus",
  "Une formation pour être autonome sur votre site",
  "Un accompagnement qui continue après la mise en ligne",
];

export default function AProposPage() {
  return (
    <>
      <PageHero
        eyebrow="À propos"
        title="Une agence à taille humaine, une exigence de grand groupe"
        em="une exigence de grand groupe"
        description="CAP DIGITAL est née d'une conviction : les PME, artisans et indépendants méritent des sites aussi soignés que ceux des grandes entreprises — sans les budgets démesurés ni le jargon."
      />

      <section className="py-16 md:py-24">
        <Container>
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal variant="up" className="flex flex-col gap-5 lg:col-span-7">
              <h2 className="font-display text-2xl tracking-[-0.02em] md:text-4xl">
                Notre histoire
              </h2>
              <p className="leading-relaxed text-muted text-pretty">
                Tout est parti d&apos;un constat simple : autour de nous, des
                artisans talentueux, des commerçants passionnés et des
                entrepreneurs ambitieux restaient invisibles sur internet — ou
                pire, étaient desservis par des sites datés qui ne leur
                ressemblaient pas.
              </p>
              <p className="leading-relaxed text-muted text-pretty">
                CAP DIGITAL a été créée pour changer cela : mettre le design
                premium, la performance technique et le référencement Google au
                service des entreprises de proximité. Pas de production à la
                chaîne, pas de modèles réutilisés : chaque site est conçu sur
                mesure, pour votre activité et vos clients.
              </p>
            </Reveal>

            <Reveal
              variant="up"
              delay={0.12}
              className="flex flex-col gap-6 lg:col-span-5"
            >
              <h2 className="label-mono">Nos engagements</h2>
              <ul className="flex flex-col divide-y divide-border-subtle border-y border-border-subtle">
                {commitments.map((commitment, index) => (
                  <li key={commitment} className="flex items-baseline gap-5 py-4">
                    <span className="label-mono shrink-0" aria-hidden>
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="leading-relaxed">{commitment}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </Container>
      </section>

      <section className="border-t border-border-subtle py-20 md:py-28">
        <Container className="flex flex-col gap-14 md:gap-20">
          <SectionHeading
            eyebrow="Nos valeurs"
            title="Ce qui nous guide, projet après projet"
            em="projet après projet"
          />
          <div className="grid border-t border-border-subtle sm:grid-cols-2">
            {values.map((value, index) => (
              <Reveal
                key={value.title}
                variant="up"
                delay={index * 0.08}
                className="flex flex-col gap-4 border-b border-border-subtle py-10 sm:odd:pr-10 sm:even:border-l sm:even:pl-10"
              >
                <span className="label-mono">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-2xl tracking-[-0.02em]">
                  {value.title}
                </h3>
                <p className="max-w-sm leading-relaxed text-muted">
                  {value.description}
                </p>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection
        title="Envie de travailler avec une équipe qui vous écoute ?"
        em="qui vous écoute ?"
      />
    </>
  );
}
