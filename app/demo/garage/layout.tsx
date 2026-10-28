import type { Metadata } from "next";
import Link from "next/link";
import { demoGarage } from "@/lib/demo-garage";

export const metadata: Metadata = {
  // `absolute` : sinon le gabarit du site ajouterait un second « CAP DIGITAL ».
  title: { absolute: `${demoGarage.name} — démonstration CAP DIGITAL` },
  description:
    "Site de démonstration réalisé par CAP DIGITAL pour les garages automobiles indépendants. Le garage présenté est fictif.",
  // Une démonstration n'a rien à faire dans les résultats de recherche :
  // elle ne doit pas concurrencer le site de l'agence ni être prise au sérieux.
  robots: { index: false, follow: false, nocache: true },
};

export default function DemoGarageLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Couleurs fixées en dur : la démo garde la même apparence que le
    // visiteur soit en thème clair ou sombre sur le site de l'agence.
    <div className="min-h-screen bg-white text-slate-900">
      {/* Bandeau de démonstration, visible en haut de chaque page */}
      <div className="sticky top-0 z-50 bg-amber-400 text-slate-900">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-x-2 gap-y-0.5 px-4 py-2 text-center text-xs font-semibold sm:text-sm">
          <span>Démonstration – garage fictif créé par</span>
          <Link
            href="/"
            className="underline underline-offset-2"
          >
            CAP DIGITAL
          </Link>
        </div>
      </div>

      {children}

      <footer className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-5xl px-5 py-12">
          <p className="text-lg font-bold">{demoGarage.name}</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            {demoGarage.address}
            <br />
            {demoGarage.phone}
          </p>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-sm">
            <Link
              href="/demo/garage/donnees"
              className="font-semibold text-slate-700 underline decoration-slate-300 underline-offset-2 hover:decoration-slate-700"
            >
              Utilisation des données
            </Link>
            <Link
              href="/contact"
              className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:decoration-blue-700"
            >
              Je veux ce site pour mon garage
            </Link>
          </div>

          <p className="mt-8 border-t border-slate-200 pt-6 text-xs leading-relaxed text-slate-500">
            Ce site est une <strong>démonstration</strong> réalisée par CAP
            DIGITAL, agence web. Le {demoGarage.name} n&apos;existe pas : son
            nom, son adresse et son numéro de téléphone sont fictifs, aucun
            rendez-vous ne peut y être pris et aucune marque, aucun réseau et
            aucun équipementier réel n&apos;y est représenté.
          </p>
        </div>
      </footer>
    </div>
  );
}
