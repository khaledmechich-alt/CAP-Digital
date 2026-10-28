import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Nos réalisations — Portfolio de sites web",
  description:
    "Les projets de CAP DIGITAL en détail : le besoin de départ de chacun, ce que nous avons construit et les technologies utilisées.",
};

export default function RealisationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Nos réalisations, dans le détail."
        em="dans le détail."
        description="Pour chaque projet : le besoin de départ, ce que nous avons construit et avec quoi. Quand un projet est un produit de l'agence et non une commande d'un client, c'est écrit noir sur blanc."
      />

      <section className="pt-8 pb-24 md:pb-32">
        <Container>
          <Reveal variant="fade">
            <ProjectsGrid />
          </Reveal>
        </Container>
      </section>

      <CtaSection
        title="Votre projet mérite sa place sur cette page."
        em="sur cette page."
      />
    </>
  );
}
