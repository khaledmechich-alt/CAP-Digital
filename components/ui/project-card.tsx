import Link from "next/link";
import type { Project } from "@/lib/projects";

export function ProjectCard({ project }: { project: Project }) {
  const mainResult = project.results[0];

  return (
    <Link
      href={`/realisations/${project.slug}`}
      className="group flex flex-col gap-5"
    >
      <div className="relative overflow-hidden rounded-2xl border border-border-subtle">
        <img
          src={project.image}
          alt={`Aperçu du site ${project.title}`}
          width={1200}
          height={750}
          loading="lazy"
          className="h-auto w-full transition-transform duration-500 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-3 text-xs">
          <span className="rounded-full bg-accent-soft px-3 py-1 font-medium text-accent">
            {project.category}
          </span>
          <span className="text-muted">
            {project.client} · {project.year}
          </span>
        </div>
        <h3 className="font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
          {project.title}
        </h3>
        <p className="text-sm leading-relaxed text-muted">
          {project.shortDescription}
        </p>
        {mainResult ? (
          <p className="text-sm font-semibold text-accent">
            {mainResult.value} {mainResult.label}
          </p>
        ) : null}
      </div>
    </Link>
  );
}
