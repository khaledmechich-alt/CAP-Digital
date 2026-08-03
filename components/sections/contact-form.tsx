"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";
import { submitContact } from "@/app/contact/actions";

// Champs « papier » : un simple filet sous le texte, qui s'épaissit
// et passe à l'accent quand on écrit dedans.
const inputClasses =
  "w-full border-0 border-b border-border-subtle bg-transparent px-0 py-3 text-base placeholder:text-muted/50 transition-colors focus:border-foreground focus:outline-none";

const labelClasses = "label-mono";

const projectTypes = [
  "Site vitrine",
  "Boutique e-commerce",
  "Refonte de site",
  "Référencement SEO",
  "Maintenance",
  "Autre / Je ne sais pas encore",
];

const budgets = [
  "Moins de 800 €",
  "800 € — 1 500 €",
  "1 500 € — 2 500 €",
  "Plus de 2 500 €",
  "Je ne sais pas encore",
];

type Status = "idle" | "sending" | "sent" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    // On lit les valeurs de façon synchrone, avant tout await.
    const data = new FormData(event.currentTarget);
    const input = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      phone: String(data.get("phone") ?? ""),
      company: String(data.get("company") ?? ""),
      projectType: String(data.get("projectType") ?? ""),
      budget: String(data.get("budget") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    setStatus("sending");
    setErrorMsg(null);

    const result = await submitContact(input);

    if (result.ok) {
      setStatus("sent");
    } else {
      setErrorMsg(result.error ?? null);
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-6 border-y border-border-subtle py-12">
        <h3 className="font-display text-4xl leading-[1.1] tracking-[-0.02em] md:text-5xl">
          Merci, votre demande est <span className="em-serif">bien partie</span>.
        </h3>
        <p className="max-w-md leading-relaxed text-muted">
          Nous avons bien reçu votre message et nous vous recontactons très vite
          (sous 24&nbsp;h ouvrées). Une question urgente&nbsp;? Écrivez-nous
          directement à{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="link-line text-accent"
          >
            {siteConfig.email}
          </a>
          .
        </p>
        <Button variant="secondary" onClick={() => setStatus("idle")}>
          Envoyer une autre demande
        </Button>
      </div>
    );
  }

  const isSending = status === "sending";

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-8"
    >
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className={labelClasses}>
            Votre nom <span className="text-accent">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            required
            autoComplete="name"
            placeholder="Jean Dupont"
            className={inputClasses}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="email" className={labelClasses}>
            Votre e-mail <span className="text-accent">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="jean@entreprise.fr"
            className={inputClasses}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="phone" className={labelClasses}>
            Téléphone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            autoComplete="tel"
            placeholder="06 12 34 56 78"
            className={inputClasses}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="company" className={labelClasses}>
            Votre entreprise
          </label>
          <input
            id="company"
            name="company"
            type="text"
            autoComplete="organization"
            placeholder="Nom de votre entreprise"
            className={inputClasses}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="projectType" className={labelClasses}>
            Type de projet <span className="text-accent">*</span>
          </label>
          <select
            id="projectType"
            name="projectType"
            required
            className={inputClasses}
            defaultValue={projectTypes[0]}
          >
            {projectTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="budget" className={labelClasses}>
            Budget envisagé
          </label>
          <select
            id="budget"
            name="budget"
            className={inputClasses}
            defaultValue={budgets[budgets.length - 1]}
          >
            {budgets.map((budget) => (
              <option key={budget} value={budget}>
                {budget}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="message" className={labelClasses}>
          Parlez-nous de votre projet <span className="text-accent">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          required
          rows={5}
          placeholder="Décrivez votre activité et ce que vous aimeriez obtenir : plus de clients, une boutique en ligne, un site plus moderne…"
          className={inputClasses}
        />
      </div>

      {status === "error" && (
        <p className="border-l-2 border-red-500 py-1 pl-4 text-sm leading-relaxed text-red-500">
          {errorMsg ?? "Une erreur est survenue."} Vous pouvez aussi nous écrire
          directement à{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-medium underline"
          >
            {siteConfig.email}
          </a>
          .
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        className="w-full sm:w-auto"
        disabled={isSending}
      >
        {isSending ? "Envoi en cours…" : "Envoyer ma demande"}
      </Button>
      <p className="text-xs leading-relaxed text-muted">
        Vos informations ne sont utilisées que pour répondre à votre demande —
        jamais revendues, jamais de spam.
      </p>
    </form>
  );
}
