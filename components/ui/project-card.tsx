import Link from "next/link";
import type { Project } from "@/lib/projects";
import { ParallaxMedia } from "@/components/ui/parallax-media";
import { Tilt } from "@/components/ui/tilt";

export function ProjectCard({ project }: { project: Project }) {
  const mainResult = project.results[0];

  return (
    <Link
      href={`/realisations/${project.slug}`}
      className="group flex flex-col gap-6"
    >
      <Tilt>
        <ParallaxMedia className="aspect-[4/3] rounded-2xl border border-border-subtle transition-shadow duration-500 group-hover:shadow-[0_20px_60px_var(--glow)]">
          <img
            src={project.image}
            alt={`Aperçu du site ${project.title}`}
            width={1200}
            height={750}
            loading="lazy"
            className="h-full w-full object-cover object-top transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
          />
        </ParallaxMedia>
      </Tilt>

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

        <h3 className="font-display text-2xl tracking-[-0.02em] md:text-3xl">
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
