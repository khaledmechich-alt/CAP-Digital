export type Service = {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  benefits: string[];
};

export const services: Service[] = [
  {
    slug: "site-vitrine",
    title: "Création de site vitrine",
    tagline: "Votre meilleure carte de visite, disponible 24h/24",
    description:
      "Un site élégant et rapide qui présente votre activité, inspire confiance et transforme vos visiteurs en clients. Conçu sur mesure, adapté à votre image et à vos objectifs.",
    benefits: [
      "Design sur mesure adapté à votre image",
      "Parfait sur mobile, tablette et ordinateur",
      "Formulaire de contact et appels à l'action efficaces",
      "Optimisé pour apparaître sur Google",
    ],
  },
  {
    slug: "refonte",
    title: "Refonte de site web",
    tagline: "Donnez une seconde vie à votre site",
    description:
      "Votre site est vieillissant, lent ou ne génère plus de contacts ? Nous le transformons en un outil moderne, rapide et efficace, sans perdre votre référencement existant.",
    benefits: [
      "Design remis au goût du jour",
      "Vitesse de chargement optimisée",
      "Référencement Google préservé et amélioré",
      "Migration de vos contenus incluse",
    ],
  },
  {
    slug: "maintenance",
    title: "Maintenance & sécurité",
    tagline: "Votre site entre de bonnes mains",
    description:
      "Mises à jour, sauvegardes, sécurité, petites modifications : nous veillons sur votre site pour qu'il reste rapide, sûr et à jour, pendant que vous vous concentrez sur votre métier.",
    benefits: [
      "Mises à jour et sauvegardes régulières",
      "Surveillance de la sécurité 7j/7",
      "Modifications de contenu à la demande",
      "Assistance prioritaire en cas de problème",
    ],
  },
  {
    slug: "accompagnement",
    title: "Accompagnement digital",
    tagline: "Un partenaire, pas juste un prestataire",
    description:
      "Stratégie digitale, conseils, formation à la gestion de votre site : nous vous accompagnons dans la durée pour que le digital devienne un vrai levier de croissance.",
    benefits: [
      "Stratégie digitale adaptée à vos objectifs",
      "Formation pour être autonome sur votre site",
      "Conseils réguliers et suivi des résultats",
      "Un interlocuteur unique qui connaît votre projet",
    ],
  },
];
