"use server";

import { createClient } from "@supabase/supabase-js";
import { Resend } from "resend";

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

// Adresse de notre domaine, vérifié dans Resend (DKIM + SPF + DMARC).
const EMAIL_FROM = "CAP DIGITAL <contact@capdigitalagency.fr>";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
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

async function sendNotification(input: ContactInput): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY manquante — e-mail non envoyé.");
    return;
  }

  const to =
    process.env.CONTACT_NOTIFICATION_EMAIL || "contact@capdigitalagency.fr";

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: EMAIL_FROM,
      to,
      replyTo: input.email,
      subject: `Nouvelle demande — ${input.name} (${input.projectType || "projet"})`,
      html: buildEmailHtml(input),
    });
    if (error) {
      console.error("[contact] Échec de l'envoi de l'e-mail :", error);
    }
  } catch (err) {
    console.error("[contact] Erreur inattendue à l'envoi de l'e-mail :", err);
  }
}

export async function submitContact(
  input: ContactInput
): Promise<ContactResult> {
  const name = input.name?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const message = input.message?.trim() ?? "";

  // Validation minimale côté serveur (on ne fait jamais confiance au client).
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

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!supabaseUrl || !supabaseKey) {
    console.error("[contact] Variables d'environnement Supabase manquantes.");
    return {
      ok: false,
      error:
        "Le serveur n'est pas configuré pour le moment. Réessayez plus tard.",
    };
  }

  const cleaned: ContactInput = {
    name,
    email,
    phone: input.phone?.trim() ?? "",
    company: input.company?.trim() ?? "",
    projectType: input.projectType?.trim() ?? "",
    budget: input.budget?.trim() ?? "",
    message,
  };

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false },
  });

  const { error } = await supabase.from("contacts").insert({
    name: cleaned.name,
    email: cleaned.email,
    phone: cleaned.phone || null,
    company: cleaned.company || null,
    project_type: cleaned.projectType || null,
    budget: cleaned.budget || null,
    message: cleaned.message,
  });

  if (error) {
    console.error("[contact] Échec de l'enregistrement :", error.message);
    return { ok: false, error: "L'envoi a échoué. Réessayez dans un instant." };
  }

  // La demande est enregistrée. On envoie la notification e-mail sans bloquer
  // la réponse au visiteur (si l'e-mail échoue, la demande reste sauvegardée).
  await sendNotification(cleaned);

  return { ok: true };
}
