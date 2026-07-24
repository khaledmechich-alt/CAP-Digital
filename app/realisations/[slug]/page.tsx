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
        <section className="relative overflow-hidden pt-36 pb-12 md:pt-44">
          <div
            className="glow-orb top-[-260px] left-1/2 size-[560px] -translate-x-1/2"
            aria-hidden
          />
          <Container className="relative flex flex-col gap-8">
            <Reveal>
              <Link
                href="/realisations"
                className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
              >
                <span aria-hidden>←</span>
                Toutes les réalisations
              </Link>
            </Reveal>

            <Reveal delay={0.05} className="flex flex-col gap-5">
              <div className="flex flex-wrap items-center gap-3 text-sm">
                <span className="rounded-full bg-accent-soft px-3 py-1 font-medium text-accent">
                  {project.category}
                </span>
                <span className="text-muted">
                  {project.client} · {project.year}
                </span>
              </div>
              <h1 className="font-display max-w-3xl text-4xl font-bold tracking-tight text-balance md:text-6xl">
                {project.title}
              </h1>
              <p className="max-w-2xl text-lg leading-relaxed text-muted">
                {project.shortDescription}
              </p>
            </Reveal>

            <Reveal delay={0.1}>
              <div className="grid gap-4 sm:grid-cols-3">
                {project.results.map((result) => (
                  <div
                    key={result.label}
                    className="flex flex-col gap-1 rounded-2xl border border-border-subtle bg-card p-6"
                  >
                    <span className="font-display text-3xl font-bold text-gradient-accent md:text-4xl">
                      {result.value}
                    </span>
                    <span className="text-sm text-muted">{result.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.15}>
              {project.beforeImage && project.afterImage ? (
                <div>
                  <BeforeAfterSlider
                    beforeSrc={project.beforeImage}
                    afterSrc={project.afterImage}
                    alt={`Refonte du site ${project.title}`}
                  />
                  <p className="mt-4 text-center text-xs text-muted">
                    Faites glisser le curseur pour comparer l&apos;avant et
                    l&apos;après
                  </p>
                </div>
              ) : (
                <div className="overflow-hidden rounded-2xl border border-border-subtle">
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
              <Reveal className="flex flex-col gap-4">
                <h2 className="font-display text-2xl font-semibold">
                  Le défi
                </h2>
                <p className="leading-relaxed text-muted text-pretty">
                  {project.challenge}
                </p>
              </Reveal>
              <Reveal delay={0.1} className="flex flex-col gap-4">
                <h2 className="font-display text-2xl font-semibold">
                  Notre solution
                </h2>
                <p className="leading-relaxed text-muted text-pretty">
                  {project.solution}
                </p>
              </Reveal>
            </div>

            <Reveal className="mt-12 flex flex-wrap items-center gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="rounded-full border border-border-subtle bg-card px-4 py-1.5 text-sm text-muted"
                >
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
            <Reveal>
              <h2 className="font-display text-3xl font-bold tracking-tight">
                D&apos;autres projets à découvrir
              </h2>
            </Reveal>
            <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
              {otherProjects.map((other, index) => (
                <Reveal key={other.slug} delay={index * 0.1}>
                  <ProjectCard project={other} />
                </Reveal>
              ))}
            </div>
          </Container>
        </section>
      </article>

      <CtaSection
        title={
          <>
            Et si le prochain projet,{" "}
            <span className="text-gradient-accent">c&apos;était le vôtre&nbsp;?</span>
          </>
        }
      />
    </>
  );
}
