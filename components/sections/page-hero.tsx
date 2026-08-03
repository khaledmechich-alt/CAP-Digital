import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

type PageHeroProps = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
};

export function PageHero({ eyebrow, title, description }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden pt-36 pb-14 md:pt-48 md:pb-20">
      <div
        className="bg-grid absolute inset-0 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_30%,black,transparent)]"
        aria-hidden
      />
      <div
        className="glow-orb top-[-260px] left-1/2 size-[560px] -translate-x-1/2"
        aria-hidden
      />
      <Container className="relative">
        <Reveal className="flex flex-col items-center gap-6 text-center">
          <Badge>{eyebrow}</Badge>
          <h1 className="font-display max-w-3xl text-4xl leading-[1.1] font-bold tracking-tight text-balance md:text-6xl">
            {title}
          </h1>
          {description ? (
            <p className="max-w-2xl text-lg leading-relaxed text-muted text-pretty">
              {description}
            </p>
          ) : null}
        </Reveal>
      </Container>
    </section>
  );
}
