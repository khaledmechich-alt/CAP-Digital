export const navLinks = [
  { label: "Accueil", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Garages", href: "/garages" },
  { label: "À propos", href: "/a-propos" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
] as const;

/**
 * Liens repris uniquement dans le pied de page.
 *
 * « Réalisations » y est descendu le 28/10/2026, le temps que le portfolio se
 * remplisse : dans le menu principal, le mot promet des projets à voir, et la
 * page annonce aujourd'hui qu'ils arrivent. Elle reste accessible, et
 * remontera dans navLinks dès la première réalisation publiée.
 */
export const secondaryLinks = [
  { label: "Réalisations", href: "/realisations" },
  { label: "Témoignages", href: "/temoignages" },
  { label: "FAQ", href: "/faq" },
] as const;

export const legalLinks = [
  { label: "Mentions légales", href: "/mentions-legales" },
  { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
] as const;
