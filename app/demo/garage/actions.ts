"use server";

import Anthropic from "@anthropic-ai/sdk";
import { Resend } from "resend";
import { demoRequestTypes } from "@/lib/demo-garage";
import { tooManyRequests } from "@/lib/rate-limit";
import {
  buildClientEmail,
  buildGarageEmail,
  EMAIL_FROM,
  type DemoRequestData,
} from "./emails";

/**
 * Formulaire de la démonstration garage.
 *
 * Ce que fait cette action :
 *  1. refuse les robots (champ piège + limite par adresse IP) ;
 *  2. valide tout côté serveur, on ne fait jamais confiance au navigateur ;
 *  3. demande éventuellement à l'API Claude une reformulation de la seule
 *     description du problème ;
 *  4. envoie deux e-mails (accusé au client, résumé au garage) ;
 *  5. renvoie l'e-mail du garage au navigateur, pour l'afficher à l'écran.
 *
 * Ce qu'elle ne fait pas : enregistrer quoi que ce soit, et écrire la moindre
 * donnée personnelle dans les journaux du serveur.
 */

export type DemoRequestInput = {
  requestType: string;
  name: string;
  phone: string;
  email: string;
  plate: string;
  brand: string;
  model: string;
  year: string;
  mileage: string;
  mileageUnit?: string;
  description: string;
  slot: string;
  urgency: string;
  consent: boolean;
  /** Champ piège, invisible à l'écran : seul un robot le remplit. */
  trap: string;
};

export type DemoRequestResult =
  | {
      ok: true;
      /** L'e-mail reçu par le garage, pour l'afficher au prospect. */
      preview: { subject: string; html: string; aiUsed: boolean };
    }
  | { ok: false; error: string };

const LIMITS = {
  name: 80,
  phone: 25,
  email: 120,
  plate: 15,
  brand: 40,
  model: 40,
  mileage: 9,
  description: 1500,
  slot: 120,
} as const;

const URGENCY_CHOICES = [
  "Dès que possible",
  "Dans la semaine",
  "Pas urgent",
] as const;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/* ------------------------------------------------------------------ *
 * Nettoyage et validation
 * ------------------------------------------------------------------ */

/** Une ligne : espaces normalisés, longueur bornée. */
function oneLine(value: string | undefined, max: number): string {
  return (value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

/** Un paragraphe : on garde les retours à la ligne, sans les empiler. */
function paragraph(value: string | undefined, max: number): string {
  return (value ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, max);
}

/**
 * Accepte le format actuel (AA-123-AA) et l'ancien (123 ABC 45), avec ou sans
 * tirets ni espaces. Renvoie la plaque remise en forme, "" si le champ est
 * vide, ou null si le format n'est pas reconnu.
 */
function normalizePlate(raw: string): string | null {
  const compact = (raw ?? "")
    .toUpperCase()
    .replace(/[^A-Z0-9]/g, "")
    .slice(0, LIMITS.plate);

  if (!compact) return "";

  if (/^[A-Z]{2}[0-9]{3}[A-Z]{2}$/.test(compact)) {
    return `${compact.slice(0, 2)}-${compact.slice(2, 5)}-${compact.slice(5)}`;
  }

  const ancien = compact.match(/^([0-9]{1,4})([A-Z]{2,3})([0-9]{2,3})$/);
  if (ancien) return `${ancien[1]}-${ancien[2]}-${ancien[3]}`;

  return null;
}

/* ------------------------------------------------------------------ *
 * Reformulation par l'API Claude (facultative)
 * ------------------------------------------------------------------ */

const AI_SYSTEM = `Tu reformules la demande d'un client de garage automobile en une ou deux phrases courtes, en français, pour que le garagiste comprenne la demande d'un coup d'oeil.

Règles absolues :
- n'utilise que ce que le client a écrit ;
- n'avance aucun diagnostic, aucune cause, aucune pièce à remplacer, aucun prix, aucun délai ;
- n'ajoute aucune information absente du texte ;
- réponds uniquement par la reformulation, sans introduction, sans liste et sans balise.`;

/**
 * Seule la description du problème est transmise à l'API : jamais le nom, le
 * téléphone, l'adresse e-mail ni la plaque d'immatriculation.
 *
 * En cas de clé absente, de panne ou de lenteur, on renvoie null et l'e-mail
 * part sans résumé : l'IA ne doit jamais empêcher la demande d'arriver.
 */
async function summarizeProblem(description: string): Promise<string | null> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return null;

  try {
    const anthropic = new Anthropic({ apiKey, maxRetries: 0 });

    const message = await anthropic.messages.create(
      {
        model: "claude-haiku-5-5",
        max_tokens: 300,
        system: AI_SYSTEM,
        thinking: { type: "disabled" },
        output_config: { effort: "low" },
        messages: [
          {
            role: "user",
            content: `Demande écrite par le client :\n\n${description}`,
          },
        ],
      },
      { timeout: 6000 }
    );

    const text = message.content
      .filter((block): block is Anthropic.TextBlock => block.type === "text")
      .map((block) => block.text)
      .join(" ")
      .replace(/\s+/g, " ")
      .trim();

    return text ? text.slice(0, 400) : null;
  } catch {
    console.error("[demo-garage] resume IA indisponible : envoi sans resume.");
    return null;
  }
}

/* ------------------------------------------------------------------ *
 * Action principale
 * ------------------------------------------------------------------ */

export async function submitDemoRequest(
  input: DemoRequestInput
): Promise<DemoRequestResult> {
  const refus = (error: string): DemoRequestResult => ({ ok: false, error });

  // 1. Champ piège : un humain ne le voit pas, donc ne le remplit jamais.
  if ((input.trap ?? "").trim()) {
    return refus("Votre demande n'a pas pu être envoyée.");
  }

  if (!input.consent) {
    return refus(
      "Merci de cocher la case d'accord pour que nous puissions traiter votre demande."
    );
  }

  const type = demoRequestTypes.find((item) => item.value === input.requestType);
  if (!type) return refus("Merci de choisir le type de votre demande.");

  const name = oneLine(input.name, LIMITS.name);
  if (name.length < 2) return refus("Merci d'indiquer votre nom.");

  const phoneRaw = oneLine(input.phone, LIMITS.phone);
  const phoneDigits = phoneRaw.replace(/[^+\d]/g, "");
  if (phoneDigits.replace(/\D/g, "").length < 9) {
    return refus("Merci d'indiquer un numéro de téléphone valide.");
  }

  const email = oneLine(input.email, LIMITS.email).toLowerCase();
  if (!EMAIL_REGEX.test(email)) {
    return refus("Votre adresse e-mail semble incorrecte.");
  }

  const plate = normalizePlate(input.plate);
  if (plate === null) {
    return refus(
      "La plaque n'est pas reconnue. Indiquez-la au format AA-123-AA ou 123-ABC-45."
    );
  }

  const brand = oneLine(input.brand, LIMITS.brand);
  const model = oneLine(input.model, LIMITS.model);
  if (!plate && !(brand && model)) {
    return refus(
      "Indiquez la plaque d'immatriculation, ou à défaut la marque et le modèle du véhicule."
    );
  }

  const yearRaw = oneLine(input.year, 4).replace(/\D/g, "");
  const currentYear = new Date().getFullYear();
  if (
    yearRaw &&
    (yearRaw.length !== 4 ||
      Number(yearRaw) < 1900 ||
      Number(yearRaw) > currentYear + 1)
  ) {
    return refus("L'année du véhicule semble incorrecte.");
  }

  const mileage = oneLine(input.mileage, LIMITS.mileage).replace(/\D/g, "");

  const description = paragraph(input.description, LIMITS.description);
  if (description.length < 5) {
    return refus("Décrivez en quelques mots ce dont vous avez besoin.");
  }

  const slot = oneLine(input.slot, LIMITS.slot);
  const urgency =
    URGENCY_CHOICES.find((choice) => choice === input.urgency) ?? "";

  // 2. Limite par adresse IP, une fois la demande reconnue comme valable.
  if (
    await tooManyRequests({
      scope: "demo-garage",
      max: 3,
      windowMs: 15 * 60 * 1000,
    })
  ) {
    return refus(
      "Vous avez déjà envoyé plusieurs demandes. Merci de patienter quelques minutes."
    );
  }

  const data: DemoRequestData = {
    typeLabel: type.label,
    typeTag: type.tag,
    name,
    phone: phoneRaw,
    email,
    plate,
    brand,
    model,
    year: yearRaw,
    mileage,
    description,
    slot,
    urgency,
  };

  // 3. Reformulation facultative, strictement limitée à la description.
  const aiSummary = await summarizeProblem(description);

  const garageEmail = buildGarageEmail(data, aiSummary);
  const clientEmail = buildClientEmail(data);

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[demo-garage] RESEND_API_KEY manquante : aucun envoi.");
    return refus(
      "La démonstration n'est pas configurée pour le moment. Réessayez plus tard."
    );
  }

  const garageInbox =
    process.env.DEMO_GARAGE_EMAIL ||
    process.env.CONTACT_NOTIFICATION_EMAIL ||
    "contact@capdigitalagency.fr";

  const resend = new Resend(apiKey);

  // 4. Les deux e-mails partent indépendamment : si l'un échoue, l'autre reste
  //    envoyé. Les journaux ne reçoivent jamais ni adresse ni nom.
  const [garageSend, clientSend] = await Promise.allSettled([
    resend.emails.send({
      from: EMAIL_FROM,
      to: garageInbox,
      replyTo: email,
      subject: garageEmail.subject,
      html: garageEmail.html,
    }),
    resend.emails.send({
      from: EMAIL_FROM,
      to: email,
      subject: clientEmail.subject,
      html: clientEmail.html,
    }),
  ]);

  const failed = (result: PromiseSettledResult<{ error: unknown }>) =>
    result.status === "rejected" || Boolean(result.value?.error);

  if (failed(garageSend)) {
    console.error("[demo-garage] envoi au garage en echec.");
    return refus("L'envoi a échoué. Réessayez dans un instant.");
  }

  if (failed(clientSend)) {
    // Le garage a bien reçu la demande : la démonstration continue.
    console.error("[demo-garage] accuse de reception client en echec.");
  }

  return {
    ok: true,
    preview: {
      subject: garageEmail.subject,
      html: garageEmail.html,
      aiUsed: Boolean(aiSummary),
    },
  };
}
