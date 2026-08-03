import { beforeAfterProject } from "@/lib/projects";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import { Button } from "@/components/ui/button";

export function BeforeAfterSection() {
  const project = beforeAfterProject;
  if (!project || !project.beforeImage || !project.afterImage) return null;

  return (
    <section className="relative overflow-hidden border-t border-border-subtle py-24 md:py-32">
      <div
        className="glow-orb top-1/2 right-[-260px] size-[520px] -translate-y-1/2"
        aria-hidden
      />
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-2">
          <div className="flex flex-col gap-8">
            <SectionHeading
              align="left"
              eyebrow="Avant / Après"
              title={
                <>
                  La différence,{" "}
                  <span className="text-gradient-accent">en une image</span>
                </>
              }
              description={`${project.title} — ${project.challenge}`}
            />
            <Reveal delay={0.1}>
              <div className="flex flex-wrap gap-3">
                {project.results.map((result) => (
                  <span
                    key={result.label}
                    className="rounded-full border border-border-subtle bg-card px-4 py-2 text-sm"
                  >
                    <span className="font-semibold text-accent">
                      {result.value}
                    </span>{" "}
                    <span className="text-muted">{result.label}</span>
                  </span>
                ))}
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <Button href={`/realisations/${project.slug}`} variant="secondary">
                Découvrir cette refonte
              </Button>
            </Reveal>
          </div>

          <Reveal delay={0.15}>
            <BeforeAfterSlider
              beforeSrc={project.beforeImage}
              afterSrc={project.afterImage}
              alt={`Refonte du site ${project.title}`}
            />
            <p className="mt-4 text-center text-xs text-muted">
              Faites glisser le curseur pour comparer
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
