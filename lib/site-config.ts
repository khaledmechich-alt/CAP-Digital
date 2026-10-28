/**
 * ============================================
 * COORDONNÉES DE L'AGENCE — MODIFIEZ ICI
 * Toutes les informations de contact du site
 * sont centralisées dans ce fichier.
 * ============================================
 */

type SiteConfig = {
  name: string;
  tagline: string;
  description: string;
  url: string;
  email: string;
  phone: string;
  location: string;
  socials: {
    instagram: string;
    linkedin: string;
    facebook: string;
  };
};

export const siteConfig: SiteConfig = {
  name: "CAP DIGITAL",
  tagline: "L'agence web qui transforme vos visiteurs en clients",
  description:
    "CAP DIGITAL crée et refond des sites web pour PME, artisans et entrepreneurs. Design premium, maintenance et accompagnement digital.",

  // Domaine canonique : Vercel redirige capdigitalagency.fr vers la version www.
  url: "https://www.capdigitalagency.fr",

  email: "contact@capdigitalagency.fr",

  // Les espaces sont automatiquement retirés pour les liens « appeler ».
  phone: "+33 1 85 78 29 41",

  // Ville / zone d'activité (utilisée pour le SEO local)
  location: "France",

  // Laissez vide ("") pour masquer un réseau social.
  // Les trois liens pointaient sur les pages d'accueil des réseaux, pas sur
  // des comptes CAP DIGITAL : ils ont été retirés. Remettez l'adresse
  // complète du compte (ex. https://www.instagram.com/capdigital/) pour
  // réafficher l'icône.
  socials: {
    instagram: "",
    linkedin: "",
    facebook: "",
  },
};
