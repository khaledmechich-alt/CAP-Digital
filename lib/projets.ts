// Modèle partagé entre l'espace client et l'espace admin.

// Les étapes par lesquelles passe un projet, dans l'ordre.
// L'étape en cours d'un projet est un numéro entre 1 et 5.
export const ETAPES = [
  {
    numero: 1,
    titre: "Brief & cadrage",
    description: "On définit ensemble vos besoins, vos pages et vos objectifs.",
  },
  {
    numero: 2,
    titre: "Maquette",
    description: "Nous vous présentons le design avant d'écrire la moindre ligne.",
  },
  {
    numero: 3,
    titre: "Développement",
    description: "Votre site prend vie, page après page.",
  },
  {
    numero: 4,
    titre: "Relecture & corrections",
    description: "Vous testez, vous nous dites, on ajuste.",
  },
  {
    numero: 5,
    titre: "Mise en ligne",
    description: "Votre site est publié et visible par tous.",
  },
] as const;

export const PREMIERE_ETAPE = 1;
export const DERNIERE_ETAPE = ETAPES.length;

export type Projet = {
  id: string;
  created_at: string;
  client_email: string;
  client_name: string | null;
  titre: string;
  etape: number;
  date_prevue: string | null;
  note: string | null;
  site_url: string | null;
  nom_domaine: string | null;
  renouvellement_domaine: string | null;
  url_backoffice: string | null;
  maintenance: string | null;
};

// Ramène une étape lue en base dans les bornes autorisées.
export function etapeValide(etape: number): number {
  if (!Number.isFinite(etape)) return PREMIERE_ETAPE;
  return Math.min(Math.max(Math.round(etape), PREMIERE_ETAPE), DERNIERE_ETAPE);
}

export function pourcentageAvancement(etape: number): number {
  return Math.round((etapeValide(etape) / DERNIERE_ETAPE) * 100);
}

// "2026-03-14" -> "14 mars 2026". Renvoie null si la date est absente.
export function formaterDate(date: string | null): string | null {
  if (!date) return null;
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return null;
  return parsed.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
