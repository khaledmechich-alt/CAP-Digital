import type { Metadata } from "next";
import { PageHero } from "@/components/sections/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { ArrowLink, Button } from "@/components/ui/button";

/**
 * Le portfolio est vide pour le moment (voir lib/projects.ts). Plutôt que
 * d'afficher une grille sans rien dedans, la page le dit franchement et
 * renvoie vers la démonstration, qui est aujourd'hui ce que nous avons de
 * plus parlant à montrer.
 *
 * Pour revenir à la grille : remettre un projet dans le tableau `projects`,
 * puis restaurer <ProjectsGrid /> à la place du bloc ci-dessous (le composant
 * est conservé dans components/sections/projects-grid.tsx).
 */

export const metadata: Metadata = {
  title: "Réalisations",
  description:
    "Nos premières réalisations clients arrivent bientôt. En attendant, la démonstration de site de garage CAP DIGITAL est en ligne et se teste en deux minutes.",
};

const aVoir = [
  {
    titre: "Le formulaire du client",
    texte:
      "Type de demande, véhicule, plaque, description du problème et créneau souhaité. Il accepte l'ancien format de plaque comme le nouveau.",
  },
  {
    titre: "L'accusé de réception",
    texte:
      "Ce que reçoit le client dans la minute : sa demande est arrivée, on le rappellera. Aucun tarif ni délai n'est annoncé à la place du garage.",
  },
  {
    titre: "Le résumé reçu par le garage",
    texte:
      "Affiché à l'écran juste après l'envoi : le client, le véhicule, le problème décrit avec ses mots, le créneau et l'urgence.",
  },
];

export default function RealisationsPage() {
  return (
    <>
      <PageHero
        eyebrow="Réalisations"
        title="Nos premières réalisations clients arrivent bientôt."
        em="arrivent bientôt."
        description="En attendant, testez notre démonstration."
      />

      <section className="py-10">
        <Container>
          <Reveal variant="up">
            <div className="flex flex-col items-start gap-6 border-y border-border-subtle py-10 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="label-mono mb-3">À tester en 2 minutes</p>
                <p className="font-display max-w-xl text-2xl leading-[1.15] tracking-[-0.02em] md:text-3xl">
                  Un site de garage complet, avec{" "}
                  <span className="em-serif">son formulaire de demande</span>{" "}
                  et les deux e-mails qu&apos;il déclenche.
                </p>
              </div>
              <Button href="/demo/garage" size="lg" className="shrink-0">
                Voir la démonstration
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="pb-20 md:pb-28">
        <Container className="flex flex-col gap-10">
          <Reveal variant="up">
            <p className="max-w-2xl leading-relaxed text-muted text-pretty">
              Le garage de la démonstration est fictif, et c&apos;est écrit sur
              chacune de ses pages : nous préférons montrer un exemple assumé
              plutôt qu&apos;un projet présenté comme une commande qui n&apos;en
              serait pas une. Vous pouvez remplir le formulaire avec vos propres
              informations, rien n&apos;est enregistré.
            </p>
          </Reveal>

          <div className="grid gap-px border-y border-border-subtle bg-border-subtle md:grid-cols-3">
            {aVoir.map((item, index) => (
              <Reveal key={item.titre} variant="up" delay={index * 0.08}>
                <article className="flex h-full flex-col gap-3 bg-background p-8">
                  <h2 className="font-display text-xl tracking-[-0.02em]">
                    {item.titre}
                  </h2>
                  <p className="leading-relaxed text-muted">{item.texte}</p>
                </article>
              </Reveal>
            ))}
          </div>

          <Reveal variant="up">
            <ArrowLink href="/garages">
              Ce que nous proposons aux garages
            </ArrowLink>
          </Reveal>
        </Container>
      </section>

      <CtaSection
        title="Votre projet mérite sa place sur cette page."
        em="sur cette page."
      />
    </>
  );
}
