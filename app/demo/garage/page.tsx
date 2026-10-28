import Link from "next/link";
import {
  CarFront,
  Check,
  CircleDot,
  Clock,
  Cog,
  Disc3,
  Gauge,
  MapPin,
  Phone,
  ShieldCheck,
  Snowflake,
  Star,
  Wrench,
} from "lucide-react";
import { demoGarage, demoServices } from "@/lib/demo-garage";
import { DemandeForm } from "./demande-form";

const icons = {
  wrench: Wrench,
  disc: Disc3,
  cog: Cog,
  gauge: Gauge,
  snowflake: Snowflake,
  tyre: CircleDot,
} as const;

const engagements = [
  "Devis avant toute intervention",
  "Pièces et main-d'œuvre détaillées",
  "Véhicule rendu nettoyé",
];

export default function DemoGaragePage() {
  return (
    <main className="pb-24 lg:pb-0">
      {/* ---------------- Hero ---------------- */}
      <section className="bg-slate-900 text-white">
        <div className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
          <p className="flex items-center gap-2 text-sm font-semibold text-amber-400">
            <CarFront className="size-4" />
            {demoGarage.zone}
          </p>

          <h1 className="mt-4 text-4xl leading-[1.05] font-extrabold tracking-tight sm:text-5xl md:text-6xl">
            {demoGarage.name}
          </h1>
          <p className="mt-4 max-w-xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            {demoGarage.tagline}. Entretien, freinage, distribution,
            diagnostic : vous décrivez votre besoin, nous vous rappelons{" "}
            {demoGarage.callbackDelay}.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={`tel:${demoGarage.phoneLink}`}
              className="inline-flex items-center justify-center gap-2 rounded-full bg-amber-400 px-7 py-4 text-base font-bold text-slate-900 transition-colors hover:bg-amber-300"
            >
              <Phone className="size-5" />
              {demoGarage.phone}
            </a>
            <a
              href="#demande"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/25 px-7 py-4 text-base font-bold text-white transition-colors hover:bg-white/10"
            >
              Demander un devis
            </a>
          </div>

          <ul className="mt-10 grid gap-3 sm:grid-cols-3">
            {engagements.map((engagement) => (
              <li
                key={engagement}
                className="flex items-start gap-2 text-sm leading-relaxed text-slate-300"
              >
                <Check className="mt-0.5 size-4 shrink-0 text-amber-400" />
                {engagement}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ---------------- Prestations ---------------- */}
      <section className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
        <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          Nos prestations
        </h2>
        <p className="mt-3 max-w-xl leading-relaxed text-slate-600">
          Toutes les interventions courantes sur voitures particulières, quelle
          que soit la marque.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {demoServices.map((service) => {
            const Icon = icons[service.icon];
            return (
              <article
                key={service.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 transition-colors hover:border-slate-300"
              >
                <span className="flex size-11 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                  <Icon className="size-5" />
                </span>
                <h3 className="mt-4 text-lg font-bold">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">
                  {service.text}
                </p>
              </article>
            );
          })}
        </div>
      </section>

      {/* ---------------- Horaires, zone, adresse ---------------- */}
      <section className="border-y border-slate-200 bg-slate-50">
        <div className="mx-auto grid max-w-5xl gap-4 px-5 py-14 sm:py-20 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <span className="flex size-11 items-center justify-center rounded-xl bg-slate-900 text-white">
              <Clock className="size-5" />
            </span>
            <h3 className="mt-4 text-lg font-bold">Horaires d&apos;ouverture</h3>
            <dl className="mt-3 space-y-2 text-sm">
              {demoGarage.hours.map((slot) => (
                <div key={slot.day}>
                  <dt className="font-semibold text-slate-900">{slot.day}</dt>
                  <dd className="text-slate-600">{slot.time}</dd>
                </div>
              ))}
            </dl>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <span className="flex size-11 items-center justify-center rounded-xl bg-slate-900 text-white">
              <MapPin className="size-5" />
            </span>
            <h3 className="mt-4 text-lg font-bold">Zone d&apos;intervention</h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-600">
              {demoGarage.zone}. {demoGarage.zoneDetail}
            </p>
            <p className="mt-4 text-sm leading-relaxed font-semibold text-slate-900">
              {demoGarage.address}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <span className="flex size-11 items-center justify-center rounded-xl bg-slate-900 text-white">
              <ShieldCheck className="size-5" />
            </span>
            <h3 className="mt-4 text-lg font-bold">Comment ça se passe</h3>
            <ol className="mt-3 space-y-3 text-sm leading-relaxed text-slate-600">
              <li>
                <span className="font-semibold text-slate-900">1.</span> Vous
                décrivez votre besoin en deux minutes.
              </li>
              <li>
                <span className="font-semibold text-slate-900">2.</span> Vous
                recevez tout de suite un accusé de réception.
              </li>
              <li>
                <span className="font-semibold text-slate-900">3.</span> Nous
                vous rappelons {demoGarage.callbackDelay}.
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* ---------------- Avis : exemple d'affichage, aucun faux avis ---------------- */}
      <section className="mx-auto max-w-5xl px-5 py-14 sm:py-20">
        <div className="flex flex-wrap items-center gap-3">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Avis clients
          </h2>
          <span className="rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900">
            EXEMPLE D&apos;AFFICHAGE
          </span>
        </div>
        <p className="mt-3 max-w-2xl leading-relaxed text-slate-600">
          Sur un vrai site, les avis publiés par vos clients s&apos;afficheraient
          ici. Comme ce garage est fictif, cet emplacement reste volontairement
          vide : aucun avis n&apos;a été inventé.
        </p>

        <div className="mt-8 grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((index) => (
            <div
              key={index}
              className="rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-6"
            >
              <div className="flex gap-1 text-slate-300" aria-hidden>
                {[0, 1, 2, 3, 4].map((star) => (
                  <Star key={star} className="size-4 fill-current" />
                ))}
              </div>
              <div className="mt-4 space-y-2" aria-hidden>
                <div className="h-2.5 w-full rounded-full bg-slate-200" />
                <div className="h-2.5 w-11/12 rounded-full bg-slate-200" />
                <div className="h-2.5 w-2/3 rounded-full bg-slate-200" />
              </div>
              <p className="mt-4 text-xs font-semibold text-slate-400">
                Emplacement d&apos;un avis client
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ---------------- Formulaire ---------------- */}
      <section id="demande" className="border-t border-slate-200 bg-slate-50">
        <div className="mx-auto max-w-3xl px-5 py-14 sm:py-20">
          <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
            Devis, rendez-vous ou simple question
          </h2>
          <p className="mt-3 leading-relaxed text-slate-600">
            Remplissez ce formulaire : vous recevez un accusé de réception
            immédiat, et le garage reçoit au même moment un résumé clair de
            votre demande. Essayez avec vos vraies coordonnées, vous verrez les
            deux e-mails.
          </p>

          <div className="mt-8 rounded-3xl border border-slate-200 bg-white p-5 sm:p-8">
            <DemandeForm />
          </div>
        </div>
      </section>

      {/* ---------------- Barre d'appel collée en bas sur téléphone ---------------- */}
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 p-3 backdrop-blur lg:hidden">
        <div className="flex gap-2">
          <a
            href={`tel:${demoGarage.phoneLink}`}
            className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-slate-900 px-5 py-3.5 text-base font-bold text-white"
          >
            <Phone className="size-5" />
            Appeler
          </a>
          <a
            href="#demande"
            className="inline-flex flex-1 items-center justify-center rounded-full bg-blue-600 px-5 py-3.5 text-base font-bold text-white"
          >
            Demander un devis
          </a>
        </div>
      </div>

      {/* ---------------- Rappel : c'est une démonstration ---------------- */}
      <section className="mx-auto max-w-3xl px-5 py-14 text-center">
        <p className="text-sm leading-relaxed text-slate-600">
          Vous êtes garagiste et vous voulez ce site à votre nom, avec vos
          prestations et votre adresse e-mail ?{" "}
          <Link
            href="/contact"
            className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:decoration-blue-700"
          >
            Parlons-en
          </Link>
          .
        </p>
      </section>
    </main>
  );
}
