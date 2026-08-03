import { beforeAfterProject } from "@/lib/projects";
import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import { ArrowLink } from "@/components/ui/button";

export function BeforeAfterSection() {
  const project = beforeAfterProject;
  if (!project || !project.beforeImage || !project.afterImage) return null;

  return (
    <section className="border-t border-border-subtle py-24 md:py-36">
      <Container>
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="flex flex-col gap-9 lg:col-span-5">
            <SectionHeading
              eyebrow="Avant / Après"
              title="La différence, en une image"
              em="en une image"
            />
            <Reveal variant="up" delay={0.1}>
              <p className="max-w-md leading-relaxed text-muted text-pretty">
                {project.title} — {project.challenge}
              </p>
            </Reveal>
            {project.results.length > 0 ? (
              <Reveal variant="up" delay={0.15}>
                <dl className="flex flex-col divide-y divide-border-subtle border-y border-border-subtle">
                  {project.results.map((result) => (
                    <div
                      key={result.label}
                      className="flex items-baseline justify-between gap-6 py-3"
                    >
                      <dt className="label-mono">{result.label}</dt>
                      <dd className="font-display em-serif text-2xl text-accent">
                        {result.value}
                      </dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ) : null}
            <Reveal variant="up" delay={0.2}>
              <ArrowLink href={`/realisations/${project.slug}`}>
                Découvrir cette refonte
              </ArrowLink>
            </Reveal>
          </div>

          <Reveal variant="blur" delay={0.15} className="lg:col-span-7">
            <BeforeAfterSlider
              beforeSrc={project.beforeImage}
              afterSrc={project.afterImage}
              alt={`Refonte du site ${project.title}`}
            />
            <p className="label-mono mt-4">
              Faites glisser le curseur pour comparer
            </p>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
