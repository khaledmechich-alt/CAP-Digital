"use client";

import { useState } from "react";
import { siteConfig } from "@/lib/site-config";
import { Button } from "@/components/ui/button";

const inputClasses =
  "w-full rounded-xl border border-border-subtle bg-background px-4 py-3 text-sm placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none";

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

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const subject = `Demande de devis — ${data.get("projectType")}`;
    const body = [
      `Nom : ${data.get("name")}`,
      `E-mail : ${data.get("email")}`,
      `Téléphone : ${data.get("phone") || "Non renseigné"}`,
      `Entreprise : ${data.get("company") || "Non renseignée"}`,
      `Type de projet : ${data.get("projectType")}`,
      `Budget envisagé : ${data.get("budget")}`,
      "",
      "Message :",
      String(data.get("message")),
    ].join("\n");

    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="flex flex-col items-center gap-4 rounded-2xl border border-border-subtle bg-card p-10 text-center">
        <h3 className="font-display text-2xl font-semibold">
          Votre message est prêt !
        </h3>
        <p className="max-w-md leading-relaxed text-muted">
          Votre logiciel de messagerie vient de s&apos;ouvrir avec votre demande
          pré-remplie : il ne reste qu&apos;à cliquer sur « Envoyer ». Si rien ne
          s&apos;est ouvert, écrivez-nous directement à{" "}
          <a
            href={`mailto:${siteConfig.email}`}
            className="font-medium text-accent hover:underline"
          >
            {siteConfig.email}
          </a>
          .
        </p>
        <Button variant="secondary" onClick={() => setSent(false)}>
          Renvoyer un message
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-5 rounded-2xl border border-border-subtle bg-card p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="name" className="text-sm font-medium">
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
          <label htmlFor="email" className="text-sm font-medium">
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
          <label htmlFor="phone" className="text-sm font-medium">
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
          <label htmlFor="company" className="text-sm font-medium">
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
          <label htmlFor="projectType" className="text-sm font-medium">
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
          <label htmlFor="budget" className="text-sm font-medium">
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
        <label htmlFor="message" className="text-sm font-medium">
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

      <Button type="submit" size="lg" className="w-full sm:w-auto">
        Envoyer ma demande
      </Button>
      <p className="text-xs leading-relaxed text-muted">
        En envoyant ce formulaire, votre logiciel de messagerie s&apos;ouvrira
        avec votre demande pré-remplie. Vos informations ne sont utilisées que
        pour répondre à votre demande — jamais revendues, jamais de spam.
      </p>
    </form>
  );
}
