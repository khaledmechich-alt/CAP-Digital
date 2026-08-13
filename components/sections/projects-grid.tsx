"use client";

import { useState } from "react";
import { projects, type ProjectCategory } from "@/lib/projects";
import { ProjectCard } from "@/components/ui/project-card";
import { cn } from "@/lib/utils";

// Les filtres se déduisent des projets réellement présents : pas d'onglet
// qui ne renvoie aucun résultat.
const allCategories: ("Tous" | ProjectCategory)[] = [
  "Tous",
  ...(["Application web", "Site vitrine", "E-commerce", "Refonte"] as const
  ).filter((category) => projects.some((p) => p.category === category)),
];

export function ProjectsGrid() {
  const [activeCategory, setActiveCategory] = useState<
    "Tous" | ProjectCategory
  >("Tous");

  const filtered =
    activeCategory === "Tous"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <div className="flex flex-col gap-12">
      <div
        className="flex flex-wrap justify-center gap-3"
        role="group"
        aria-label="Filtrer les projets par catégorie"
      >
        {allCategories.map((category) => (
          <button
            key={category}
            type="button"
            aria-pressed={activeCategory === category}
            onClick={() => setActiveCategory(category)}
            className={cn(
              "rounded-full border px-5 py-2.5 text-sm font-medium transition-all duration-300",
              activeCategory === category
                ? "border-accent bg-accent text-white"
                : "border-border-subtle bg-card text-muted hover:bg-card-hover hover:text-foreground"
            )}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-x-8 gap-y-14 sm:grid-cols-2">
        {filtered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-center text-muted">
          Aucun projet dans cette catégorie pour le moment.
        </p>
      ) : null}
    </div>
  );
}
