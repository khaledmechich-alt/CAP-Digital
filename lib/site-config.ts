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
  name: "KA DIGITAL",
  tagline: "L'agence web qui transforme vos visiteurs en clients",
  description:
    "KA DIGITAL crée des sites vitrines, boutiques e-commerce et refontes de sites web pour PME, artisans et entrepreneurs. Design premium, SEO et accompagnement digital.",

  // Remplacez par votre vrai nom de domaine une fois le site en ligne
  url: "https://www.ka-digital.fr",

  email: "contact.autosearchpro@gmail.com",

  // Remplacez par votre vrai numéro de téléphone
  phone: "+33 6 00 00 00 00",

  // Ville / zone d'activité (utilisée pour le SEO local)
  location: "France",

  // Laissez vide ("") pour masquer un réseau social
  socials: {
    instagram: "https://www.instagram.com/",
    linkedin: "https://www.linkedin.com/",
    facebook: "https://www.facebook.com/",
  },
};
