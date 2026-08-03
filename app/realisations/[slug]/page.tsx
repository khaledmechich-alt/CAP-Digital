import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/lib/projects";
import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ProjectCard } from "@/components/ui/project-card";
import { BeforeAfterSlider } from "@/components/ui/before-after-slider";
import { Button } from "@/components/ui/button";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) return {};
  return {
    title: `${project.title} — ${project.category}`,
    description: project.shortDescription,
  };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) notFound();

  const otherProjects = projects
    .filter((p) => p.slug !== project.slug)
    .slice(0, 2);

  return (
    <>
      <article>
        <section className="pt-36 pb-12 md:pt-44">
          <Container className="flex flex-col gap-10">
            <Reveal variant="fade">
              <Link
                href="/realisations"
                className="label-mono link-line inline-flex w-fit items-center gap-2 hover:text-foreground"
              >
                <span aria-hidden>←</span>
                Toutes les réalisations
              </Link>
            </Reveal>

            <Reveal variant="up" delay={0.05} className="flex flex-col gap-6">
              <div className="label-mono flex flex-wrap items-center gap-x-3 gap-y-1">
                <span className="text-accent">{project.category}</span>
                <span aria-hidden>·</span>
                <span>
                  {project.client} — {project.year}
                </span>
                {project.demo ? (
                  <>
                    <span aria-hidden>·</span>
                    <span>Démonstration</span>
                  </>
                ) : null}
              </div>
              <h1 className="font-display max-w-4xl text-[2.75rem] leading-[1.0] tracking-[-0.025em] text-balance md:text-7xl">
                {project.title}
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-muted">
                {project.shortDescription}
              </p>
              {project.demo ? (
                <p className="max-w-2xl border-l-2 border-accent py-1 pl-5 text-sm leading-relaxed text-muted">
                  <strong className="font-medium text-foreground">
                    Projet de démonstration.
                  </strong>{" "}
                  Ce cabinet est fictif. Cette fiche illustre notre méthode de
                  refonte et le rendu que nous produisons — ce n&apos;est pas une
                  réalisation client, et nous ne lui associons aucun résultat
                  chiffré.
                </p>
              ) : null}
            </Reveal>

            {project.results.length > 0 ? (
              <Reveal variant="up" delay={0.1}>
                <dl className="grid border-y border-border-subtle sm:grid-cols-3">
                  {project.results.map((result) => (
                    <div
                      key={result.label}
                      className="flex flex-col gap-1 border-b border-border-subtle py-6 last:border-b-0 sm:border-b-0 sm:not-first:border-l sm:not-first:pl-8"
                    >
                      <dd className="font-display em-serif text-4xl text-accent md:text-5xl">
                        {result.value}
                      </dd>
                      <dt className="label-mono">{result.label}</dt>
                    </div>
                  ))}
                </dl>
              </Reveal>
            ) : null}

            <Reveal variant="blur" delay={0.15}>
              {project.beforeImage && project.afterImage ? (
                <div>
                  <BeforeAfterSlider
                    beforeSrc={project.beforeImage}
                    afterSrc={project.afterImage}
                    alt={`Refonte du site ${project.title}`}
                  />
                  <p className="label-mono mt-4">
                    Faites glisser le curseur pour comparer l&apos;avant et
                    l&apos;après
                  </p>
                </div>
              ) : (
                <div className="overflow-hidden border border-border-subtle">
                  <img
                    src={project.image}
                    alt={`Aperçu du site ${project.title}`}
                    width={1200}
                    height={750}
                    className="h-auto w-full"
                  />
                </div>
              )}
            </Reveal>
          </Container>
        </section>

        <section className="py-16 md:py-24">
          <Container>
            <div className="grid gap-12 lg:grid-cols-2 lg:gap-20">
              <Reveal variant="up" className="flex flex-col gap-4">
                <h2 className="font-display text-3xl tracking-[-0.02em] md:text-4xl">
                  Le défi
                </h2>
                <p className="leading-relaxed text-muted text-pretty">
                  {project.challenge}
                </p>
              </Reveal>
              <Reveal variant="up" delay={0.1} className="flex flex-col gap-4">
                <h2 className="font-display text-3xl tracking-[-0.02em] md:text-4xl">
                  Notre solution
                </h2>
                <p className="leading-relaxed text-muted text-pretty">
                  {project.solution}
                </p>
              </Reveal>
            </div>

            <Reveal
              variant="up"
              className="mt-14 flex flex-wrap items-center gap-x-6 gap-y-4 border-t border-border-subtle pt-8"
            >
              {project.technologies.map((tech) => (
                <span key={tech} className="label-mono">
                  {tech}
                </span>
              ))}
              {project.url ? (
                <Button
                  href={project.url}
                  variant="secondary"
                  className="ml-auto"
                >
                  Voir le site en ligne
                  <span aria-hidden>→</span>
                </Button>
              ) : null}
            </Reveal>
          </Container>
        </section>

        <section className="border-t border-border-subtle py-16 md:py-24">
          <Container className="flex flex-col gap-10">
            <Reveal variant="up">
              <h2 className="font-display text-3xl tracking-[-0.02em] md:text-5xl">
                D&apos;autres projets à découvrir
              </h2>
            </Reveal>
            <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2">
              {otherProjects.map((other, index) => (
                <Reveal key={other.slug} variant="blur" delay={index * 0.1}>
                  <ProjectCard project={other} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      </article>

      <CtaSection
        title="Et si le prochain projet, c'était le vôtre ?"
        em="c'était le vôtre ?"
      />
    </>
  );
}
