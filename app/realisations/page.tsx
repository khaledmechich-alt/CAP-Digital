import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { ProjectsGrid } from "@/components/sections/projects-grid";
import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Nos réalisations — Portfolio de sites web",
  description:
    "Découvrez les sites vitrines, boutiques e-commerce et refontes réalisés par CAP DIGITAL, avec les résultats concrets obtenus pour chaque client.",
};

export default function RealisationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title={
          <>
            Nos réalisations,{" "}
            <span className="text-gradient-accent">vos futurs résultats</span>
          </>
        }
        description="Derrière chaque projet, il y a une entreprise qui voulait grandir. Voici comment nous l'avons aidée — chiffres à l'appui."
      />

      <section className="pb-24 md:pb-32">
        <Container>
          <Reveal>
            <ProjectsGrid />
          </Reveal>
        </Container>
      </section>

      <CtaSection
        title={
          <>
            Votre projet mérite sa place{" "}
            <span className="text-gradient-accent">sur cette page.</span>
          </>
        }
      />
    </>
  );
}
