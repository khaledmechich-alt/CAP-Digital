import { featuredProjects } from "@/lib/projects";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/ui/project-card";
import { Button } from "@/components/ui/button";

export function FeaturedProjects() {
  return (
    <section className="border-t border-border-subtle py-24 md:py-32">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="Nos réalisations"
          title={
            <>
              Des projets qui parlent{" "}
              <span className="text-gradient-accent">d&apos;eux-mêmes</span>
            </>
          }
          description="Chaque site que nous livrons a un objectif : apporter des résultats concrets et mesurables à nos clients."
        />

        <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
          {featuredProjects.slice(0, 4).map((project, index) => (
            <Reveal key={project.slug} delay={(index % 2) * 0.12}>
              <ProjectCard project={project} />
            </Reveal>
          ))}
        </div>

        <Reveal className="flex justify-center">
          <Button href="/realisations" variant="secondary" size="lg">
            Voir toutes nos réalisations
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
