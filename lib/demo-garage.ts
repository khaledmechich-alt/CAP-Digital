/**
 * ============================================
 * GARAGE DE DÉMONSTRATION — TOUT EST FICTIF
 * Ce fichier alimente la page /demo/garage.
 * Pour transformer la démo en vrai site client,
 * il suffit de remplacer les valeurs ci-dessous.
 * ============================================
 */

export const demoGarage = {
  // Nom volontairement explicite : impossible de le confondre avec un vrai garage.
  name: "Garage Démo Auto",
  banner: "Démonstration – garage fictif créé par CAP DIGITAL",
  tagline: "Votre garage de quartier, sans mauvaise surprise",

  // Adresse inexistante (code postal 00000) et numéro réservé à la fiction par
  // l'ARCEP (plage 01 99 00 xx xx) : personne ne peut être dérangé par la démo.
  address: "12 rue de la Démonstration, 00000 Villexemple",
  phone: "01 99 00 12 34",
  phoneLink: "+33199001234",

  zone: "Villexemple et toutes les communes à moins de 20 km",
  zoneDetail:
    "Dépannage et prêt de véhicule selon disponibilité. Au-delà de 20 km, nous étudions la demande au cas par cas.",

  // Délai de rappel annoncé au client dans l'accusé de réception.
  // Aucune promesse de prix ni de délai d'intervention : juste un rappel.
  callbackDelay: "sous 24 heures ouvrées",

  hours: [
    { day: "Lundi — vendredi", time: "8 h – 12 h  /  14 h – 18 h 30" },
    { day: "Samedi", time: "9 h – 12 h" },
    { day: "Dimanche", time: "Fermé" },
  ],
} as const;

/** Les 6 prestations affichées sur la page. `icon` renvoie à la table d'icônes de la page. */
export const demoServices = [
  {
    icon: "wrench",
    title: "Entretien courant",
    text: "Vidange, filtres, bougies, révision complète selon le carnet d'entretien de votre véhicule.",
  },
  {
    icon: "disc",
    title: "Freinage",
    text: "Plaquettes, disques, liquide de frein. Contrôle gratuit si vous entendez un bruit suspect.",
  },
  {
    icon: "cog",
    title: "Distribution",
    text: "Courroie ou chaîne, pompe à eau, galets tendeurs. Intervention planifiée à l'avance.",
  },
  {
    icon: "gauge",
    title: "Diagnostic électronique",
    text: "Lecture des défauts, voyant moteur allumé, recherche de panne avant devis.",
  },
  {
    icon: "snowflake",
    title: "Climatisation",
    text: "Recharge, désinfection du circuit, recherche de fuite. À prévoir avant l'été.",
  },
  {
    icon: "tyre",
    title: "Pneumatiques",
    text: "Montage, équilibrage, géométrie, permutation et stockage de vos pneus hors saison.",
  },
] as const;

/** Les 3 types de demande du formulaire. `tag` sert d'objet d'e-mail pour le garage. */
export const demoRequestTypes = [
  { value: "devis", label: "Un devis", tag: "DEVIS" },
  { value: "rendez-vous", label: "Un rendez-vous", tag: "RENDEZ-VOUS" },
  { value: "question", label: "Une question", tag: "QUESTION" },
] as const;

export type DemoRequestType = (typeof demoRequestTypes)[number]["value"];
