import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Utilisation de vos données — démonstration garage",
  robots: { index: false, follow: false, nocache: true },
};

const sections = [
  {
    title: "Qui est responsable de vos données",
    body: (
      <>
        <strong>CAP DIGITAL</strong>, agence web, est responsable du traitement
        des informations saisies dans ce formulaire. Le garage présenté est
        fictif : c&apos;est bien l&apos;agence, et elle seule, qui reçoit vos
        informations. Pour toute question, écrivez à{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:decoration-blue-700"
        >
          {siteConfig.email}
        </a>
        .
      </>
    ),
  },
  {
    title: "Ce que nous collectons et pourquoi",
    body: (
      <>
        Les informations que vous saisissez : type de demande, nom, téléphone,
        e-mail, véhicule (plaque, marque, modèle, année, kilométrage),
        description de votre besoin, créneau souhaité et niveau d&apos;urgence.
        Elles servent <strong>uniquement</strong> à faire fonctionner cette
        démonstration, c&apos;est-à-dire à vous envoyer un accusé de réception
        et à montrer le résumé reçu par un garage. Elles ne servent jamais à de
        la prospection et ne sont transmises à aucun tiers à des fins
        commerciales.
      </>
    ),
  },
  {
    title: "Nous ne les enregistrons pas",
    body: (
      <>
        Cette démonstration n&apos;utilise{" "}
        <strong>aucune base de données</strong> : vos informations ne sont pas
        enregistrées sur le site, et les journaux techniques du serveur ne
        contiennent aucune donnée personnelle. En revanche, les deux e-mails
        envoyés existent bel et bien : ils restent dans les boîtes de réception
        (la vôtre et celle de l&apos;agence) jusqu&apos;à leur suppression, et
        dans l&apos;historique de notre prestataire d&apos;envoi. Nous
        supprimons ces e-mails sur simple demande.
      </>
    ),
  },
  {
    title: "Un service d'intelligence artificielle peut être utilisé",
    body: (
      <>
        Pour résumer votre demande en une phrase à l&apos;intention du garage,
        la description de votre besoin peut être transmise à{" "}
        <strong>Anthropic</strong> (service d&apos;intelligence artificielle
        Claude). Seule cette description est envoyée :{" "}
        <strong>
          jamais votre nom, votre téléphone, votre e-mail ni votre plaque
        </strong>
        . Le résumé se limite à reformuler ce que vous avez écrit, sans
        diagnostic et sans prix. Si ce service est indisponible, la demande part
        sans résumé.
      </>
    ),
  },
  {
    title: "Nos prestataires",
    body: (
      <>
        Trois prestataires techniques interviennent dans cette démonstration :
        <strong> Vercel</strong> (hébergement du site),{" "}
        <strong>Resend</strong> (envoi des e-mails) et{" "}
        <strong>Anthropic</strong> (résumé de la description, voir ci-dessus).
      </>
    ),
  },
  {
    title: "Vos droits",
    body: (
      <>
        Vous pouvez demander à consulter, corriger ou supprimer vos
        informations, et vous opposer à leur utilisation. Une demande envoyée à{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:decoration-blue-700"
        >
          {siteConfig.email}
        </a>{" "}
        suffit, et nous y répondons sous un mois. Vous pouvez également saisir
        la CNIL.
      </>
    ),
  },
];

export default function DonneesPage() {
  return (
    <main className="mx-auto max-w-2xl px-5 py-14 sm:py-20">
      <Link
        href="/demo/garage"
        className="inline-flex items-center gap-2 text-sm font-semibold text-slate-600 transition-colors hover:text-slate-900"
      >
        <ArrowLeft className="size-4" />
        Retour à la démonstration
      </Link>

      <h1 className="mt-8 text-3xl font-extrabold tracking-tight sm:text-4xl">
        Utilisation de vos données
      </h1>
      <p className="mt-4 leading-relaxed text-slate-600">
        Ce formulaire fait partie d&apos;une démonstration, mais les personnes
        qui le remplissent sont bien réelles. Voici donc, en clair, ce qui est
        fait de leurs informations.
      </p>

      <div className="mt-10 space-y-8">
        {sections.map((section) => (
          <section key={section.title}>
            <h2 className="text-lg font-bold">{section.title}</h2>
            <p className="mt-2 leading-relaxed text-slate-700">
              {section.body}
            </p>
          </section>
        ))}
      </div>

      <p className="mt-12 border-t border-slate-200 pt-6 text-sm leading-relaxed text-slate-500">
        Pour le site de l&apos;agence, voir la{" "}
        <Link
          href="/politique-de-confidentialite"
          className="font-semibold text-slate-700 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-700"
        >
          politique de confidentialité de CAP DIGITAL
        </Link>
        .
      </p>
    </main>
  );
}
