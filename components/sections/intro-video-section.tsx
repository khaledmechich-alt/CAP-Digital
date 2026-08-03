import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function IntroVideoSection() {
  return (
    <section className="border-t border-border-subtle py-20 md:py-28">
      <Container className="flex flex-col gap-12 md:gap-16">
        <SectionHeading
          eyebrow="Découvrir CAP Digital"
          title="CAP Digital en une minute"
          em="une minute"
          description="Une courte vidéo pour comprendre qui nous sommes et comment nous transformons votre présence en ligne."
        />

        <Reveal variant="scale" duration={1} className="w-full">
          <div className="overflow-hidden rounded-2xl border border-border-subtle bg-card shadow-[0_12px_48px_var(--glow)]">
            <video
              className="aspect-video w-full"
              controls
              playsInline
              preload="metadata"
              poster="/video/cap-digital-intro-poster.jpg"
            >
              <source src="/video/cap-digital-intro.mp4" type="video/mp4" />
              Votre navigateur ne prend pas en charge la lecture vidéo.
            </video>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
