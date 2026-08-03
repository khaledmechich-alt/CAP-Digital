import { featuredProjects } from "@/lib/projects";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/ui/project-card";
import { ArrowLink } from "@/components/ui/button";

export function FeaturedProjects() {
  return (
    <section className="border-t border-border-subtle py-20 md:py-28">
      <Container className="flex flex-col gap-14 md:gap-20">
        <SectionHeading
          eyebrow="Nos réalisations"
          title="Des projets qui parlent d'eux-mêmes"
          em="d'eux-mêmes"
          description="Chaque site que nous livrons a un objectif : apporter des résultats concrets et mesurables à nos clients."
        />

        {/* Une colonne décalée sur deux : la grille respire au lieu
            d'aligner des cartes au cordeau. */}
        <div className="grid gap-x-10 gap-y-16 md:grid-cols-2">
          {featuredProjects.slice(0, 4).map((project, index) => (
            <Reveal
              key={project.slug}
              variant="blur"
              delay={(index % 2) * 0.1}
              className={index % 2 === 1 ? "md:mt-16" : undefined}
            >
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal variant="up">
          <ArrowLink href="/realisations">
            Voir toutes nos réalisations
          </ArrowLink>
        </Reveal>
      </Container>
    </section>
  );
}
