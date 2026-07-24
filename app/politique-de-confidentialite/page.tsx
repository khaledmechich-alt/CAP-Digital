import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { PageHero } from "@/components/sections/page-hero";
import { Container } from "@/components/ui/container";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
  description: `Politique de confidentialité et de protection des données du site ${siteConfig.name}.`,
  robots: { index: false },
};

export default function PolitiqueConfidentialitePage() {
  return (
    <>
      <PageHero eyebrow="Informations" title="Politique de confidentialité" />
      <section className="pb-24">
        <Container className="flex max-w-3xl flex-col gap-10 leading-relaxed">
          <div className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-semibold">
              Données collectées
            </h2>
            <p className="text-muted">
              Ce site collecte uniquement les données que vous nous transmettez
              volontairement via le formulaire de contact : nom, adresse
              e-mail, numéro de téléphone, nom d&apos;entreprise et contenu de
              votre message. Aucune donnée n&apos;est collectée à votre insu.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-semibold">
              Utilisation des données
            </h2>
            <p className="text-muted">
              Les informations transmises sont utilisées exclusivement pour
              répondre à votre demande et assurer le suivi de la relation
              commerciale. Elles ne sont jamais vendues, louées ou transmises à
              des tiers à des fins commerciales.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-semibold">Cookies</h2>
            <p className="text-muted">
              Ce site n&apos;utilise pas de cookies publicitaires ni de
              traceurs tiers. Seuls des cookies techniques strictement
              nécessaires au fonctionnement du site (comme la mémorisation du
              thème clair ou sombre) peuvent être déposés.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-semibold">Vos droits</h2>
            <p className="text-muted">
              Conformément au Règlement Général sur la Protection des Données
              (RGPD), vous disposez d&apos;un droit d&apos;accès, de
              rectification, de suppression et d&apos;opposition concernant vos
              données personnelles. Pour l&apos;exercer, contactez-nous à{" "}
              {siteConfig.email}. Nous répondons sous 30 jours maximum.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="font-display text-2xl font-semibold">
              Durée de conservation
            </h2>
            <p className="text-muted">
              Les données issues du formulaire de contact sont conservées le
              temps nécessaire au traitement de votre demande, puis au maximum
              3 ans après le dernier contact, conformément aux recommandations
              de la CNIL.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
