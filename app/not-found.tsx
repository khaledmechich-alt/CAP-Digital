import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";

export default function NotFound() {
  return (
    <section className="flex flex-1 items-center py-40">
      <Container className="flex flex-col items-start gap-8">
        <p className="label-mono">Erreur 404</p>
        <h1 className="font-display max-w-[14ch] text-4xl leading-[1.04] tracking-[-0.025em] md:text-6xl">
          Cette page <span className="em-serif">n&apos;existe pas</span>
        </h1>
        <p className="max-w-md leading-relaxed text-muted text-pretty">
          La page que vous cherchez a peut-être été déplacée ou n&apos;existe
          plus. Pas de panique : tout le reste est bien là.
        </p>
        <div className="flex flex-col gap-4 sm:flex-row">
          <Button href="/" size="lg">
            Retour à l&apos;accueil
          </Button>
          <Button href="/contact" variant="secondary" size="lg">
            Nous contacter
          </Button>
        </div>
      </Container>
    </section>
  );
}
