import { siteConfig } from "@/lib/site-config";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Button } from "@/components/ui/button";

type CtaSectionProps = {
  title?: React.ReactNode;
  description?: string;
};

export function CtaSection({
  title = (
    <>
      Prêt à développer{" "}
      <span className="text-gradient-accent">votre activité&nbsp;?</span>
    </>
  ),
  description = "Parlons de votre projet autour d'un premier échange gratuit et sans engagement. Devis clair sous 48h, réponse garantie sous 24h.",
}: CtaSectionProps) {
  return (
    <section className="py-24 md:py-32">
      <Container>
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-border-subtle bg-card px-6 py-16 text-center md:px-16 md:py-24">
            <div
              className="glow-orb top-[-180px] left-1/2 size-[540px] -translate-x-1/2"
              aria-hidden
            />
            <div className="relative flex flex-col items-center gap-6">
              <h2 className="font-display max-w-2xl text-4xl font-bold tracking-tight text-balance md:text-5xl">
                {title}
              </h2>
              <p className="max-w-xl text-lg leading-relaxed text-muted text-pretty">
                {description}
              </p>
              <div className="mt-2 flex flex-col items-center gap-4 sm:flex-row">
                <Button href="/contact" size="lg">
                  Demander un devis gratuit
                </Button>
                <Button
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  variant="secondary"
                  size="lg"
                >
                  {siteConfig.phone}
                </Button>
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
