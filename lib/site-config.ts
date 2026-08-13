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

  // Remplacez par votre vrai nom de domaine une fois le site en ligne
  url: "https://www.cap-digital.fr",

  email: "capdigital4118@gmail.com",

  // Les espaces sont automatiquement retirés pour les liens « appeler ».
  phone: "+33 1 85 78 29 41",

  // Ville / zone d'activité (utilisée pour le SEO local)
  location: "France",

  // Laissez vide ("") pour masquer un réseau social
  socials: {
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
    facebook: "https://www.facebook.com/",
  },
};
