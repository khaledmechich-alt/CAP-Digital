import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function IntroVideoSection() {
  return (
    <section className="relative overflow-hidden border-t border-border-subtle py-24 md:py-32">
      <div
        className="glow-orb top-1/2 left-1/2 size-[560px] -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      />
      <Container className="flex flex-col items-center gap-14">
        <SectionHeading
          eyebrow="Découvrir KA Digital"
          title={
            <>
              KA Digital en <span className="text-gradient-accent">une minute</span>
            </>
          }
          description="Une courte vidéo pour comprendre qui nous sommes et comment nous transformons votre présence en ligne."
        />

        <Reveal delay={0.15} className="w-full max-w-4xl">
          <div className="overflow-hidden rounded-2xl border border-border-subtle bg-card shadow-[0_12px_48px_var(--glow)]">
            <video
              className="aspect-video w-full"
              controls
              playsInline
              preload="metadata"
              poster="/video/ka-digital-intro-poster.jpg"
            >
              <source src="/video/ka-digital-intro.mp4" type="video/mp4" />
              Votre navigateur ne prend pas en charge la lecture vidéo.
            </video>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
