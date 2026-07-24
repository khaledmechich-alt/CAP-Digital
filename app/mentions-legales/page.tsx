import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Mentions légales",
  description: `Mentions légales du site ${siteConfig.name}.`,
  robots: { index: false },
};

/**
 * ⚠️ À COMPLÉTER : remplacez les champs entre [crochets]
 * par vos informations légales réelles avant la mise en ligne.
 */
export default function MentionsLegalesPage() {
  return (
    <>
      <PageHero eyebrow="Informations" title="Mentions légales" />
      <section className="pb-24">
        <Container className="flex max-w-3xl flex-col gap-10 leading-relaxed">
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-semibold">Éditeur du site</h2>
            <p className="text-muted">
              Le site {siteConfig.url} est édité par : [Nom / Raison sociale],
              [forme juridique — ex. micro-entreprise, SASU…], immatriculée sous
              le numéro SIRET [numéro SIRET], dont le siège social est situé au
              [adresse complète].
            </p>
            <p className="text-muted">
              Directeur de la publication : [Nom du responsable]. Contact :{" "}
              {siteConfig.email} — {siteConfig.phone}.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-semibold">Hébergement</h2>
            <p className="text-muted">
              Le site est hébergé par : [Nom de l&apos;hébergeur — ex. Vercel
              Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis —
              vercel.com].
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-semibold">
              Propriété intellectuelle
            </h2>
            <p className="text-muted">
              L&apos;ensemble des contenus de ce site (textes, images, logo,
              design) est la propriété exclusive de {siteConfig.name}, sauf
              mention contraire. Toute reproduction, même partielle, est
              interdite sans autorisation écrite préalable.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-semibold">
              Responsabilité
            </h2>
            <p className="text-muted">
              {siteConfig.name} s&apos;efforce de fournir des informations
              exactes et à jour, sans pouvoir garantir l&apos;exactitude ou
              l&apos;exhaustivité des informations diffusées. L&apos;utilisation
              des informations de ce site se fait sous la responsabilité
              exclusive du visiteur.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
