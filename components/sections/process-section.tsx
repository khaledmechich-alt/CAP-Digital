import { Container } from "@/components/ui/container";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const steps = [
  {
    number: "01",
    title: "Échange & devis",
    description:
      "Un premier rendez-vous gratuit pour comprendre votre activité et vos objectifs. Vous recevez un devis clair sous 48h.",
  },
  {
    number: "02",
    title: "Design sur mesure",
    description:
      "Nous concevons une maquette à votre image. Vous validez chaque détail avant la moindre ligne de code.",
  },
  {
    number: "03",
    title: "Développement",
    description:
      "Votre site prend vie : rapide, sécurisé, parfait sur mobile et optimisé pour Google dès le premier jour.",
  },
  {
    number: "04",
    title: "Lancement & suivi",
    description:
      "Mise en ligne, formation à la prise en main, et accompagnement : nous restons à vos côtés après le lancement.",
  },
];

export function ProcessSection() {
  return (
    <section className="border-t border-border-subtle py-24 md:py-32">
      <Container className="flex flex-col gap-16">
        <SectionHeading
          eyebrow="Notre méthode"
          title={
            <>
              Un processus simple,{" "}
              <span className="text-gradient-accent">sans jargon</span>
            </>
          }
          description="Pas besoin d'être un expert du web : nous vous guidons à chaque étape, en français courant."
        />

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <Reveal
              key={step.number}
              delay={index * 0.1}
              className="relative flex flex-col gap-4"
            >
              <span
                className="font-display text-6xl font-bold text-accent/15"
                aria-hidden
              >
                {step.number}
              </span>
              <h3 className="font-display text-xl font-semibold">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {step.description}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
