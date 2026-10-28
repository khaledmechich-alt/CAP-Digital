"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  Check,
  LoaderCircle,
  Mail,
  Send,
  Sparkles,
  TriangleAlert,
} from "lucide-react";
import { demoGarage, demoRequestTypes } from "@/lib/demo-garage";
import { submitDemoRequest, type DemoRequestInput } from "./actions";

const field =
  "w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-base text-slate-900 placeholder:text-slate-400 transition-colors focus:border-blue-600 focus:outline-none focus:ring-4 focus:ring-blue-600/10";

const label = "mb-1.5 block text-sm font-semibold text-slate-700";
const hint = "mt-1.5 text-xs leading-relaxed text-slate-500";

const urgencies = ["Dès que possible", "Dans la semaine", "Pas urgent"];

type Status = "idle" | "sending" | "sent" | "error";
type Preview = { subject: string; html: string; aiUsed: boolean };

export function DemandeForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [requestType, setRequestType] = useState<string>("devis");
  const frameRef = useRef<HTMLIFrameElement>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    // On lit les valeurs avant tout await, le formulaire pouvant être démonté.
    const data = new FormData(event.currentTarget);
    const input: DemoRequestInput = {
      requestType: String(data.get("requestType") ?? ""),
      name: String(data.get("name") ?? ""),
      phone: String(data.get("phone") ?? ""),
      email: String(data.get("email") ?? ""),
      plate: String(data.get("plate") ?? ""),
      brand: String(data.get("brand") ?? ""),
      model: String(data.get("model") ?? ""),
      year: String(data.get("year") ?? ""),
      mileage: String(data.get("mileage") ?? ""),
      description: String(data.get("description") ?? ""),
      slot: String(data.get("slot") ?? ""),
      urgency: String(data.get("urgency") ?? ""),
      consent: data.get("consent") === "on",
      trap: String(data.get("societe") ?? ""),
    };

    setStatus("sending");
    setErrorMsg(null);

    const result = await submitDemoRequest(input);

    if (result.ok) {
      setPreview(result.preview);
      setStatus("sent");
      return;
    }

    setErrorMsg(result.error);
    setStatus("error");
  }

  /** L'aperçu est affiché dans un cadre isolé : on ajuste sa hauteur au contenu. */
  function fitFrame() {
    const frame = frameRef.current;
    const body = frame?.contentDocument?.body;
    if (frame && body) frame.style.height = `${body.scrollHeight + 32}px`;
  }

  if (status === "sent" && preview) {
    return (
      <div className="space-y-8">
        {/* Côté client */}
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <span className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-full bg-emerald-600 text-white">
              <Check className="size-5" strokeWidth={3} />
            </span>
            <div>
              <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Demande envoyée
              </h3>
              <p className="mt-2 leading-relaxed text-slate-700">
                Le client reçoit immédiatement un accusé de réception par
                e-mail : récapitulatif de sa demande, délai de rappel indicatif
                et coordonnées du garage. Vérifiez votre boîte de réception.
              </p>
            </div>
          </div>
        </div>

        {/* Côté garage */}
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-slate-900 text-white">
              <Mail className="size-5" />
            </span>
            <div>
              <h3 className="text-xl font-bold text-slate-900 sm:text-2xl">
                Voici ce que le garage reçoit
              </h3>
              <p className="text-sm text-slate-600">
                Au même moment, dans la boîte e-mail du garage.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
            <div className="space-y-1 border-b border-slate-200 bg-slate-50 px-4 py-3 sm:px-6">
              <p className="text-sm text-slate-600">
                <span className="font-semibold text-slate-500">À :</span>{" "}
                l&apos;adresse e-mail du garage
              </p>
              <p className="text-sm break-words text-slate-900">
                <span className="font-semibold text-slate-500">Objet :</span>{" "}
                {preview.subject}
              </p>
            </div>
            <iframe
              ref={frameRef}
              onLoad={fitFrame}
              srcDoc={preview.html}
              sandbox="allow-same-origin"
              title="Aperçu de l'e-mail reçu par le garage"
              className="h-[560px] w-full border-0 bg-white"
            />
          </div>

          {preview.aiUsed ? (
            <p className="mt-4 flex items-start gap-2 rounded-xl bg-blue-50 p-4 text-sm leading-relaxed text-blue-900">
              <Sparkles className="mt-0.5 size-4 shrink-0" />
              <span>
                Le bloc « en une phrase » est une reformulation automatique de
                votre description. Elle ne contient ni diagnostic, ni cause, ni
                prix : seulement ce que vous avez écrit, en plus court.
              </span>
            </p>
          ) : null}
        </div>

        <button
          type="button"
          onClick={() => {
            setPreview(null);
            setStatus("idle");
          }}
          className="w-full rounded-full border border-slate-300 bg-white px-6 py-3.5 font-semibold text-slate-900 transition-colors hover:bg-slate-50 sm:w-auto"
        >
          Faire un autre essai
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-7" noValidate>
      {/* Type de demande */}
      <fieldset>
        <legend className={label}>Votre demande concerne</legend>
        <div className="grid gap-2 sm:grid-cols-3">
          {demoRequestTypes.map((type) => {
            const active = requestType === type.value;
            return (
              <label
                key={type.value}
                className={`flex cursor-pointer items-center justify-center rounded-xl border px-4 py-3.5 text-center text-base font-semibold transition-colors ${
                  active
                    ? "border-blue-600 bg-blue-600 text-white"
                    : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
                }`}
              >
                <input
                  type="radio"
                  name="requestType"
                  value={type.value}
                  checked={active}
                  onChange={() => setRequestType(type.value)}
                  className="sr-only"
                />
                {type.label}
              </label>
            );
          })}
        </div>
      </fieldset>

      {/* Coordonnées */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className={label} htmlFor="name">
            Nom et prénom
          </label>
          <input
            id="name"
            name="name"
            className={field}
            autoComplete="name"
            maxLength={80}
            placeholder="Camille Durand"
            required
          />
        </div>
        <div>
          <label className={label} htmlFor="phone">
            Téléphone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            maxLength={25}
            className={field}
            placeholder="06 12 34 56 78"
            required
          />
        </div>
        <div>
          <label className={label} htmlFor="email">
            E-mail
          </label>
          <input
            id="email"
            name="email"
            type="email"
            inputMode="email"
            autoComplete="email"
            maxLength={120}
            className={field}
            placeholder="camille.durand@exemple.fr"
            required
          />
          <p className={hint}>
            C&apos;est à cette adresse que part l&apos;accusé de réception.
          </p>
        </div>
      </div>

      {/* Véhicule */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 sm:p-6">
        <p className="mb-4 text-sm font-bold tracking-wide text-slate-500 uppercase">
          Votre véhicule
        </p>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className={label} htmlFor="plate">
              Plaque d&apos;immatriculation
            </label>
            <input
              id="plate"
              name="plate"
              className={`${field} font-mono tracking-wider uppercase`}
              maxLength={15}
              placeholder="AA-123-AA"
              autoCapitalize="characters"
            />
            <p className={hint}>
              Format actuel (AA-123-AA) ou ancien (123 ABC 45), avec ou sans
              tirets. Si vous ne l&apos;avez pas sous les yeux, indiquez la
              marque et le modèle.
            </p>
          </div>
          <div>
            <label className={label} htmlFor="brand">
              Marque{" "}
              <span className="font-normal text-slate-500">(facultatif)</span>
            </label>
            <input
              id="brand"
              name="brand"
              className={field}
              maxLength={40}
              placeholder="La marque de votre voiture"
            />
          </div>
          <div>
            <label className={label} htmlFor="model">
              Modèle{" "}
              <span className="font-normal text-slate-500">(facultatif)</span>
            </label>
            <input
              id="model"
              name="model"
              className={field}
              maxLength={40}
              placeholder="Le modèle"
            />
          </div>
          <div>
            <label className={label} htmlFor="year">
              Année{" "}
              <span className="font-normal text-slate-500">(facultatif)</span>
            </label>
            <input
              id="year"
              name="year"
              inputMode="numeric"
              maxLength={4}
              className={field}
              placeholder="2016"
            />
          </div>
          <div>
            <label className={label} htmlFor="mileage">
              Kilométrage{" "}
              <span className="font-normal text-slate-500">(facultatif)</span>
            </label>
            <input
              id="mileage"
              name="mileage"
              inputMode="numeric"
              maxLength={9}
              className={field}
              placeholder="124000"
            />
          </div>
        </div>
      </div>

      {/* Demande */}
      <div>
        <label className={label} htmlFor="description">
          Décrivez votre besoin
        </label>
        <textarea
          id="description"
          name="description"
          rows={5}
          maxLength={1500}
          className={`${field} resize-y`}
          placeholder="Par exemple : un bruit au freinage depuis une semaine, surtout à froid. J'aimerais un devis avant intervention."
          required
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="slot">
            Créneau souhaité{" "}
            <span className="font-normal text-slate-500">(facultatif)</span>
          </label>
          <input
            id="slot"
            name="slot"
            className={field}
            maxLength={120}
            placeholder="Plutôt en fin de semaine, le matin"
          />
        </div>
        <div>
          <label className={label} htmlFor="urgency">
            Urgence{" "}
            <span className="font-normal text-slate-500">(facultatif)</span>
          </label>
          <select id="urgency" name="urgency" className={field} defaultValue="">
            <option value="">Je ne sais pas</option>
            {urgencies.map((choice) => (
              <option key={choice} value={choice}>
                {choice}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Champ piège : invisible à l'écran, seul un robot le remplit. */}
      <div className="absolute left-[-9999px] h-0 w-0 overflow-hidden" aria-hidden>
        <label htmlFor="societe">Société</label>
        <input id="societe" name="societe" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Consentement */}
      <label className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 bg-white p-4">
        <input
          type="checkbox"
          name="consent"
          required
          className="mt-0.5 size-5 shrink-0 cursor-pointer rounded border-slate-400 accent-blue-600"
        />
        <span className="text-sm leading-relaxed text-slate-700">
          J&apos;accepte que mes informations soient utilisées pour répondre à
          ma demande.{" "}
          <Link
            href="/demo/garage/donnees"
            className="font-semibold text-blue-700 underline decoration-blue-300 underline-offset-2 hover:decoration-blue-700"
          >
            Comment ces données sont utilisées
          </Link>
          .
        </span>
      </label>

      {errorMsg ? (
        <p
          role="alert"
          className="flex items-start gap-2 rounded-xl bg-red-50 p-4 text-sm leading-relaxed text-red-800"
        >
          <TriangleAlert className="mt-0.5 size-4 shrink-0" />
          <span>{errorMsg}</span>
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <button
          type="submit"
          disabled={status === "sending"}
          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-600 px-7 py-4 text-base font-bold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {status === "sending" ? (
            <>
              <LoaderCircle className="size-5 animate-spin" />
              Envoi en cours…
            </>
          ) : (
            <>
              <Send className="size-5" />
              Envoyer ma demande
            </>
          )}
        </button>
        <p className="text-xs leading-relaxed text-slate-500">
          Ou appelez le{" "}
          <a
            href={`tel:${demoGarage.phoneLink}`}
            className="font-semibold text-slate-700"
          >
            {demoGarage.phone}
          </a>{" "}
          — numéro fictif.
        </p>
      </div>
    </form>
  );
}
