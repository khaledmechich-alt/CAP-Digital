import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="relative flex flex-1 items-center overflow-hidden py-40">
      <div
        className="glow-orb top-1/2 left-1/2 size-[540px] -translate-x-1/2 -translate-y-1/2"
        aria-hidden
      />
      <Container className="relative flex flex-col items-center gap-6 text-center">
        <p className="font-display text-8xl font-bold text-gradient-accent">
          404
        </p>
        <h1 className="font-display text-3xl font-bold tracking-tight md:text-4xl">
          Cette page n&apos;existe pas
        </h1>
        <p className="max-w-md leading-relaxed text-muted">
          La page que vous cherchez a peut-être été déplacée ou n&apos;existe
          plus. Pas de panique : tout le reste est bien là.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href="/">Retour à l&apos;accueil</Button>
          <Button href="/contact" variant="secondary">
            Nous contacter
          </Button>
        </div>
      </Container>
    </section>
  );
}
