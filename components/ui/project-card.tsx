import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ParallaxMedia } from "@/components/ui/parallax-media";

export function ProjectCard({ project }: { project: Project }) {
  const mainResult = project.results[0];

  return (
    <Link
      href={`/realisations/${project.slug}`}
      className="group flex flex-col gap-6"
    >
      <ParallaxMedia className="aspect-[4/3] border border-border-subtle">
        <img
          src={project.image}
          alt={`Aperçu du site ${project.title}`}
          width={1200}
          height={750}
          loading="lazy"
          className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
        />
      </ParallaxMedia>

      <div className="flex flex-col gap-3">
        <div className="label-mono flex flex-wrap items-center gap-x-3 gap-y-1">
          <span>{project.category}</span>
          <span aria-hidden>·</span>
          <span>
            {project.client} — {project.year}
          </span>
          {project.demo ? (
            <>
              <span aria-hidden>·</span>
              <span className="text-accent">Démonstration</span>
            </>
          ) : null}
        </div>

        <h3 className="font-display text-3xl tracking-[-0.02em] md:text-4xl">
          <span className="link-line">{project.title}</span>
        </h3>

        <p className="max-w-md text-sm leading-relaxed text-muted md:text-base">
          {project.shortDescription}
        </p>

        {mainResult ? (
          <p className="font-display text-lg">
            <span className="em-serif text-accent">{mainResult.value}</span>{" "}
            <span className="text-muted">{mainResult.label}</span>
          </p>
        ) : null}
      </div>
    </Link>
  );
}
