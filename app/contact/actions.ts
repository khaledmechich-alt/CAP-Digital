"use server";

import { Resend } from "resend";
import { tooManyRequests } from "@/lib/rate-limit";

/**
 * Formulaire de contact du site.
 *
 * Depuis la mise en pause du projet Supabase, la demande n'est plus
 * enregistrée en base : l'e-mail de notification EST la demande. C'est
 * pourquoi un échec d'envoi doit être annoncé au visiteur, et jamais masqué
 * derrière une fausse confirmation : sinon la demande est perdue pour tout
 * le monde, sans que personne ne le sache.
 */

export type ContactInput = {
  name: string;
  email: string;
  phone: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
};

export type ContactResult = { ok: boolean; error?: string };

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Longueurs maximales : un formulaire public reçoit parfois n'importe quoi.
const LIMITS = {
  name: 80,
  email: 120,
  phone: 25,
  company: 80,
  projectType: 60,
  budget: 60,
  message: 3000,
} as const;

/**
 * Adresse d'expédition. Le domaine doit être vérifié dans Resend, sinon
 * l'envoi est refusé. CONTACT_FROM_EMAIL permet d'en changer sans toucher
 * au code.
 */
const EMAIL_FROM =
  process.env.CONTACT_FROM_EMAIL ||
  "CAP DIGITAL <contact@capdigitalagency.fr>";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function oneLine(value: string | undefined, max: number): string {
  return (value ?? "").replace(/\s+/g, " ").trim().slice(0, max);
}

function buildEmailHtml(input: ContactInput): string {
  const line = (label: string, value: string) =>
    `<tr>
      <td style="padding:6px 16px 6px 0;color:#64748b;font-size:14px;white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:6px 0;font-size:14px;font-weight:600;color:#0f172a;">${escapeHtml(value)}</td>
    </tr>`;

  return `
  <div style="font-family:Arial,Helvetica,sans-serif;max-width:560px;margin:0 auto;padding:24px;color:#0f172a;">
    <h2 style="margin:0 0 4px;font-size:20px;">📬 Nouvelle demande de contact</h2>
    <p style="margin:0 0 20px;color:#64748b;font-size:14px;">Reçue depuis le site CAP DIGITAL</p>
    <table style="border-collapse:collapse;margin-bottom:20px;">
      ${line("Nom", input.name)}
      ${line("E-mail", input.email)}
      ${line("Téléphone", input.phone || "Non renseigné")}
      ${line("Entreprise", input.company || "Non renseignée")}
      ${line("Type de projet", input.projectType || "Non précisé")}
      ${line("Budget", input.budget || "Non précisé")}
    </table>
    <div style="padding:16px;background:#f1f5f9;border-radius:12px;">
      <p style="margin:0 0 6px;color:#64748b;font-size:13px;font-weight:600;">MESSAGE</p>
      <p style="margin:0;font-size:14px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(input.message)}</p>
    </div>
    <p style="margin:20px 0 0;color:#94a3b8;font-size:13px;">
      💡 Répondez directement à cet e-mail pour recontacter ${escapeHtml(input.name)}.
    </p>
  </div>`;
}

export async function submitContact(
  input: ContactInput
): Promise<ContactResult> {
  // --- 1. Validation côté serveur : on ne fait jamais confiance au client ---
  const name = oneLine(input.name, LIMITS.name);
  const email = oneLine(input.email, LIMITS.email).toLowerCase();
  const message = (input.message ?? "")
    .replace(/\r\n/g, "\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\n{3,}/g, "\n\n")
    .trim()
    .slice(0, LIMITS.message);

  if (!name || !email || !message) {
    return {
      ok: false,
      error:
        "Merci d'indiquer au moins votre nom, votre e-mail et votre message.",
    };
  }
  if (!EMAIL_REGEX.test(email)) {
    return { ok: false, error: "Votre adresse e-mail semble incorrecte." };
  }

  // --- 2. Garde-fou anti-robot ---
  if (
    await tooManyRequests({
      scope: "contact",
      max: 5,
      windowMs: 15 * 60 * 1000,
    })
  ) {
    return {
      ok: false,
      error:
        "Vous avez déjà envoyé plusieurs messages. Merci de patienter quelques minutes.",
    };
  }

  const cleaned: ContactInput = {
    name,
    email,
    phone: oneLine(input.phone, LIMITS.phone),
    company: oneLine(input.company, LIMITS.company),
    projectType: oneLine(input.projectType, LIMITS.projectType),
    budget: oneLine(input.budget, LIMITS.budget),
    message,
  };

  // --- 3. Envoi : c'est la seule trace de la demande, il doit réussir ---
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY manquante — e-mail non envoyé.");
    return {
      ok: false,
      // L'adresse de l'agence est ajoutée par le formulaire, en lien cliquable.
      error:
        "Votre message n'a pas pu être envoyé : notre service d'e-mail ne répond pas.",
    };
  }

  const to =
    process.env.CONTACT_NOTIFICATION_EMAIL || "contact@capdigitalagency.fr";

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      replyTo: cleaned.email,
      subject: `Nouvelle demande — ${cleaned.name} (${cleaned.projectType || "projet"})`,
      html: buildEmailHtml(cleaned),
    });

    if (error) {
      // Le détail part dans les journaux du serveur, jamais chez le visiteur.
      console.error("[contact] Échec de l'envoi de l'e-mail :", error);
      return {
        ok: false,
        error:
          "Votre message n'a pas pu être envoyé et ne nous est pas parvenu.",
      };
    }
  } catch (err) {
    console.error("[contact] Erreur inattendue à l'envoi de l'e-mail :", err);
    return {
      ok: false,
      error:
        "Votre message n'a pas pu être envoyé et ne nous est pas parvenu.",
    };
  }

  return { ok: true };
}
