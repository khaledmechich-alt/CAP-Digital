import { demoGarage } from "@/lib/demo-garage";

/**
 * Les deux e-mails de la démo :
 *  - buildGarageEmail  : le résumé complet, envoyé au garage ;
 *  - buildClientEmail  : l'accusé de réception envoyé au visiteur.
 *
 * Règle de sécurité : l'accusé de réception ne contient AUCUN texte libre
 * saisi par le visiteur. Sinon le formulaire pourrait servir à faire partir
 * un message quelconque vers une adresse quelconque depuis notre domaine,
 * et c'est la réputation de capdigitalagency.fr qui en paierait le prix.
 */

export type DemoRequestData = {
  typeLabel: string;
  typeTag: string;
  name: string;
  phone: string;
  email: string;
  plate: string;
  brand: string;
  model: string;
  year: string;
  mileage: string;
  description: string;
  slot: string;
  urgency: string;
};

/**
 * Expéditeur des deux e-mails. Le domaine doit être vérifié dans Resend,
 * sinon l'envoi est refusé. DEMO_FROM_EMAIL permet d'en utiliser un autre
 * sans toucher au code (nom affiché entre guillemets : il contient des
 * parenthèses, que la norme des e-mails interdit telles quelles).
 */
export const EMAIL_FROM =
  process.env.DEMO_FROM_EMAIL ||
  '"Garage Démo Auto (démo CAP DIGITAL)" <contact@capdigitalagency.fr>';

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/**
 * Filtre très strict, réservé à l'accusé de réception du client : on ne garde
 * que des lettres, des chiffres et quelques signes. Une marque de voiture n'a
 * jamais besoin de plus, donc ni lien ni balise ne peut passer.
 */
function strictLabel(value: string, maxLength = 40): string {
  const kept = value
    .normalize("NFC")
    .replace(/[^A-Za-zÀ-ÖØ-öø-ÿ0-9 .-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, maxLength);
  return /[A-Za-zÀ-ÖØ-öø-ÿ0-9]/.test(kept) ? kept : "";
}

const WRAPPER =
  "font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Arial,sans-serif;max-width:600px;margin:0 auto;padding:24px;color:#0f172a;background:#ffffff;";

const DEMO_BADGE =
  '<p style="margin:0 0 16px;display:inline-block;padding:6px 12px;border-radius:999px;background:#fef3c7;color:#92400e;font-size:12px;font-weight:700;letter-spacing:0.04em;">DÉMONSTRATION — GARAGE FICTIF</p>';

function row(label: string, value: string): string {
  return `<tr>
      <td style="padding:7px 16px 7px 0;color:#64748b;font-size:14px;white-space:nowrap;vertical-align:top;">${label}</td>
      <td style="padding:7px 0;font-size:15px;font-weight:600;color:#0f172a;">${value}</td>
    </tr>`;
}

function block(title: string, rows: string[]): string {
  const content = rows.filter(Boolean).join("");
  if (!content) return "";
  return `<div style="margin:0 0 14px;padding:16px 18px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
    <p style="margin:0 0 8px;color:#64748b;font-size:11px;font-weight:700;letter-spacing:0.08em;">${title}</p>
    <table style="border-collapse:collapse;width:100%;">${content}</table>
  </div>`;
}

const EMAIL_TITLES: Record<string, string> = {
  DEVIS: "Nouvelle demande de devis",
  "RENDEZ-VOUS": "Nouvelle demande de rendez-vous",
  QUESTION: "Nouvelle question d'un client",
};

function vehicleLabel(data: DemoRequestData): string {
  const parts = [data.brand, data.model].filter(Boolean).join(" ").trim();
  return parts || "Véhicule non précisé";
}

/** Objet du type : [DEVIS] Peugeot 208 – AB-123-CD – Bruits au freinage */
function garageSubject(data: DemoRequestData): string {
  const plate = data.plate || "plaque non précisée";
  // On coupe sur un mot entier : un objet tronqué au milieu d'un mot fait négligé.
  const flat = data.description.replace(/\s+/g, " ").trim();
  const extract =
    flat.length > 60
      ? `${flat.slice(0, 60).replace(/[\s,;:.!?-]+\S*$/, "")}…`
      : flat;
  const parts = [`[${data.typeTag}]`, vehicleLabel(data), "–", plate];
  if (extract) parts.push("–", extract);
  // Un objet d'e-mail ne doit jamais contenir de retour à la ligne.
  return parts.join(" ").replace(/[\r\n]+/g, " ").slice(0, 150);
}

export function buildGarageEmail(
  data: DemoRequestData,
  aiSummary: string | null
): { subject: string; html: string } {
  const summaryBlock = aiSummary
    ? `<div style="margin:0 0 14px;padding:16px 18px;background:#eff6ff;border:1px solid #bfdbfe;border-radius:12px;">
        <p style="margin:0 0 6px;color:#1d4ed8;font-size:11px;font-weight:700;letter-spacing:0.08em;">EN UNE PHRASE</p>
        <p style="margin:0;font-size:15px;line-height:1.55;color:#0f172a;">${escapeHtml(aiSummary)}</p>
        <p style="margin:8px 0 0;color:#64748b;font-size:12px;">Reformulation automatique de la description du client, sans diagnostic ni estimation de prix.</p>
      </div>`
    : "";

  const html = `<div style="${WRAPPER}">
  ${DEMO_BADGE}
  <h2 style="margin:0 0 4px;font-size:21px;line-height:1.3;">${escapeHtml(
    EMAIL_TITLES[data.typeTag] ?? "Nouvelle demande"
  )}</h2>
  <p style="margin:0 0 20px;color:#64748b;font-size:14px;">Reçue depuis le site du ${escapeHtml(
    demoGarage.name
  )}</p>
  ${summaryBlock}
  ${block("CLIENT", [
    row("Nom", escapeHtml(data.name)),
    row(
      "Téléphone",
      `<a href="tel:${escapeHtml(
        data.phone.replace(/[^+\d]/g, "")
      )}" style="color:#1d4ed8;text-decoration:none;">${escapeHtml(
        data.phone
      )}</a>`
    ),
    row(
      "E-mail",
      `<a href="mailto:${escapeHtml(
        data.email
      )}" style="color:#1d4ed8;text-decoration:none;">${escapeHtml(
        data.email
      )}</a>`
    ),
  ])}
  ${block("VÉHICULE", [
    row("Plaque", escapeHtml(data.plate || "Non renseignée")),
    row("Marque / modèle", escapeHtml(vehicleLabel(data))),
    data.year ? row("Année", escapeHtml(data.year)) : "",
    data.mileage ? row("Kilométrage", `${escapeHtml(data.mileage)} km`) : "",
  ])}
  <div style="margin:0 0 14px;padding:16px 18px;background:#f8fafc;border:1px solid #e2e8f0;border-radius:12px;">
    <p style="margin:0 0 8px;color:#64748b;font-size:11px;font-weight:700;letter-spacing:0.08em;">DEMANDE</p>
    <p style="margin:0;font-size:15px;line-height:1.6;white-space:pre-wrap;">${escapeHtml(
      data.description
    )}</p>
  </div>
  ${block("CRÉNEAU ET URGENCE", [
    row("Créneau souhaité", escapeHtml(data.slot || "Aucun créneau précisé")),
    row("Urgence annoncée", escapeHtml(data.urgency || "Non précisée")),
  ])}
  <p style="margin:18px 0 0;color:#64748b;font-size:13px;line-height:1.6;">
    Répondez directement à cet e-mail pour recontacter ${escapeHtml(
      data.name
    )}.
  </p>
  <p style="margin:14px 0 0;padding-top:14px;border-top:1px solid #e2e8f0;color:#94a3b8;font-size:12px;line-height:1.6;">
    E-mail de démonstration envoyé par CAP DIGITAL. Le ${escapeHtml(
      demoGarage.name
    )} n'existe pas : nom, adresse et téléphone sont fictifs.
  </p>
</div>`;

  return { subject: garageSubject(data), html };
}

export function buildClientEmail(data: DemoRequestData): {
  subject: string;
  html: string;
} {
  // Uniquement des valeurs au format vérifié : la plaque (contrôlée par
  // expression régulière), l'année et le kilométrage (chiffres), la marque et
  // le modèle passés au filtre strict. Jamais la description.
  const vehicle = [strictLabel(data.brand), strictLabel(data.model)]
    .filter(Boolean)
    .join(" ");

  const html = `<div style="${WRAPPER}">
  ${DEMO_BADGE}
  <h2 style="margin:0 0 4px;font-size:21px;line-height:1.3;">Nous avons bien reçu votre demande</h2>
  <p style="margin:0 0 20px;color:#64748b;font-size:14px;">${escapeHtml(
    demoGarage.name
  )}</p>
  <p style="margin:0 0 18px;font-size:15px;line-height:1.65;">
    Bonjour,<br /><br />
    Votre demande nous est bien parvenue et un membre de l'équipe la regarde.
    Nous vous rappelons ${escapeHtml(
      demoGarage.callbackDelay
    )} pour en parler et convenir de la suite.
  </p>
  ${block("VOTRE DEMANDE", [
    row("Objet", escapeHtml(data.typeLabel)),
    data.plate ? row("Plaque", escapeHtml(data.plate)) : "",
    vehicle ? row("Véhicule", escapeHtml(vehicle)) : "",
    data.year ? row("Année", escapeHtml(data.year)) : "",
    data.mileage ? row("Kilométrage", `${escapeHtml(data.mileage)} km`) : "",
  ])}
  <p style="margin:0 0 18px;font-size:15px;line-height:1.65;">
    Nous avons également noté la description que vous nous avez transmise ainsi
    que le créneau souhaité. Nous n'avançons aucun tarif et aucun délai
    d'intervention avant d'avoir échangé avec vous ou vu le véhicule.
  </p>
  ${block("NOUS JOINDRE", [
    row(
      "Téléphone",
      `<a href="tel:${demoGarage.phoneLink}" style="color:#1d4ed8;text-decoration:none;">${demoGarage.phone}</a>`
    ),
    row("Adresse", escapeHtml(demoGarage.address)),
    row("Horaires", escapeHtml(demoGarage.hours[0].time)),
  ])}
  <p style="margin:14px 0 0;padding-top:14px;border-top:1px solid #e2e8f0;color:#94a3b8;font-size:12px;line-height:1.6;">
    Cet e-mail provient d'un site de <strong>démonstration</strong> réalisé par
    CAP DIGITAL. Le ${escapeHtml(
      demoGarage.name
    )} n'existe pas : son nom, son adresse et son téléphone sont fictifs, et
    aucun rendez-vous réel n'a été enregistré. Vos informations ne sont pas
    conservées.
  </p>
</div>`;

  return {
    subject: `Votre demande a bien été reçue — ${demoGarage.name}`,
    html,
  };
}
