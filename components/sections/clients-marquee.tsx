import { projects } from "@/lib/projects";
import { Marquee } from "@/components/ui/marquee";
import { Container } from "@/components/ui/container";

export function ClientsMarquee() {
  return (
    <section className="border-y border-border-subtle py-10">
      <Container>
        <p className="mb-8 text-center text-xs font-medium uppercase tracking-widest text-muted">
          Ils nous font confiance
        </p>
      </Container>
      <Marquee>
        {projects.map((project) => (
          <span
            key={project.slug}
            className="font-display text-2xl font-semibold whitespace-nowrap text-muted/70"
          >
            {project.title}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
