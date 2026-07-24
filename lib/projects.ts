/**
 * ============================================
 * PORTFOLIO — AJOUTEZ VOS PROJETS ICI
 *
 * Pour ajouter un projet : copiez un bloc { ... },
 * collez-le en haut de la liste et modifiez les textes.
 * Placez l'image du projet dans /public/projects/
 * (format conseillé : 1200 x 750 pixels).
 *
 * Les projets marqués `featured: true` apparaissent
 * sur la page d'accueil (4 maximum recommandé).
 * ============================================
 */

export type ProjectCategory =
  | "Site vitrine"
  | "E-commerce"
  | "Refonte"
  | "Application web";

export type Project = {
  slug: string;
  title: string;
  client: string;
  category: ProjectCategory;
  year: number;
  /** Résumé court affiché sur les cartes du portfolio */
  shortDescription: string;
  /** Le problème du client avant le projet */
  challenge: string;
  /** Ce que KA DIGITAL a réalisé */
  solution: string;
  technologies: string[];
  /** Résultats chiffrés — l'argument commercial le plus fort */
  results: { value: string; label: string }[];
  /** Lien vers le site en ligne ("" si non disponible) */
  url: string;
  image: string;
  featured: boolean;
  /** Uniquement pour les refontes : images avant / après */
  beforeImage?: string;
  afterImage?: string;
};

export const projects: Project[] = [
  {
    slug: "autosearchpro",
    title: "AutoSearchPro",
    client: "Extension Chrome — pièces automobiles",
    category: "Application web",
    year: 2026,
    shortDescription:
      "Extension Chrome qui trouve la bonne pièce auto au meilleur prix chez tous vos fournisseurs, en quelques secondes.",
    challenge:
      "Les professionnels de la pièce automobile perdent un temps précieux à recopier VIN, plaques et références d'un catalogue fournisseur à l'autre pour comparer les prix — avec un risque d'erreur à chaque saisie.",
    solution:
      "Une extension Chrome et son site de présentation : on sélectionne un VIN ou une plaque, et AutoSearchPro compare instantanément le prix chez tous les fournisseurs pour afficher la bonne référence au meilleur tarif — sans rien recopier.",
    technologies: [
      "Extension Chrome",
      "Recherche par VIN / plaque",
      "Comparateur de prix",
    ],
    results: [
      { value: "1 clic", label: "pour comparer tous les fournisseurs" },
      { value: "VIN / plaque", label: "recherche instantanée" },
      { value: "0 saisie", label: "aucune référence à recopier" },
    ],
    url: "",
    image: "/projects/autosearchpro.png",
    featured: true,
  },
  {
    slug: "partrelay",
    title: "Partrelay",
    client: "Logiciel SaaS — distribution de pièces détachées",
    category: "Application web",
    year: 2026,
    shortDescription:
      "Application web qui suit devis et commandes du comptoir jusqu'à la livraison, sans rien retaper.",
    challenge:
      "Au comptoir, chaque devis et chaque commande devaient être ressaisis à la main dans Systemwone pour produire les bons de livraison et les factures : du temps perdu et des erreurs de saisie au quotidien.",
    solution:
      "Partrelay suit chaque devis et chaque commande du comptoir jusqu'à la livraison, et crée automatiquement les BL et les factures dans Systemwone. Mise en place en une journée, essai gratuit de 30 jours sans carte bancaire.",
    technologies: [
      "Application web",
      "Intégration Systemwone",
      "BL & factures automatiques",
    ],
    results: [
      { value: "0 ressaisie", label: "BL et factures créés automatiquement" },
      { value: "1 journée", label: "de mise en place" },
      { value: "30 jours", label: "d'essai gratuit, sans engagement" },
    ],
    url: "",
    image: "/projects/partrelay.png",
    featured: true,
  },
  {
    slug: "cabinet-delcourt",
    title: "Cabinet Delcourt",
    client: "Cabinet d'avocats",
    category: "Refonte",
    year: 2026,
    shortDescription:
      "Refonte complète du site d'un cabinet d'avocats : image modernisée, contacts multipliés.",
    challenge:
      "Le site du cabinet datait de 2014 : design dépassé, illisible sur mobile, très lent. Il renvoyait une image en décalage total avec le sérieux du cabinet et ne générait quasiment aucune demande.",
    solution:
      "Refonte intégrale : design sobre et prestigieux, présentation claire des domaines d'expertise, prise de rendez-vous en ligne. Migration soignée pour conserver le référencement acquis, puis amélioration des positions.",
    technologies: ["Next.js", "Refonte", "Prise de RDV en ligne", "SEO"],
    results: [
      { value: "-38 %", label: "de taux de rebond" },
      { value: "+60 %", label: "de demandes de consultation" },
      { value: "98/100", label: "score de performance Google" },
    ],
    url: "",
    image: "/projects/cabinet-delcourt.svg",
    featured: true,
    beforeImage: "/projects/cabinet-delcourt-avant.svg",
    afterImage: "/projects/cabinet-delcourt-apres.svg",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

/** Projet de refonte avec images avant/après (pour le comparateur) */
export const beforeAfterProject = projects.find(
  (p) => p.beforeImage && p.afterImage
);
