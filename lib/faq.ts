/**
 * ============================================
 * FAQ — MODIFIEZ ICI
 * Ajoutez, modifiez ou supprimez des questions.
 * ============================================
 */

export type FaqItem = {
  question: string;
  answer: string;
  category: string;
};

export const faqItems: FaqItem[] = [
  {
    category: "Tarifs & paiement",
    question: "Combien coûte un site internet ?",
    answer:
      "Chaque projet est unique : un site vitrine simple ne coûte pas le même prix qu'une boutique en ligne complète. Après un premier échange gratuit pour comprendre vos besoins, nous vous remettons un devis clair, détaillé et sans surprise. Aucun frais caché, jamais.",
  },
  {
    category: "Tarifs & paiement",
    question: "Peut-on payer en plusieurs fois ?",
    answer:
      "Oui. Nous proposons un paiement échelonné, généralement en trois fois : à la commande, à la validation du design, puis à la mise en ligne. L'objectif est que votre trésorerie ne soit jamais un frein à votre projet.",
  },
  {
    category: "Délais & processus",
    question: "Combien de temps faut-il pour créer un site ?",
    answer:
      "Comptez en général 48 à 72 heures une fois vos contenus réunis (textes, photos, logo). Le délai exact dépend de la complexité du projet et de la rapidité des échanges : nous vous le confirmons dès le devis.",
  },
  {
    category: "Délais & processus",
    question: "Comment se déroule un projet avec KA DIGITAL ?",
    answer:
      "En quatre étapes : un échange pour comprendre votre activité et vos objectifs, une proposition de design que vous validez, le développement du site, puis la mise en ligne. Vous êtes impliqué à chaque étape et rien n'est publié sans votre accord.",
  },
  {
    category: "Technique & autonomie",
    question: "Pourrai-je modifier mon site moi-même ?",
    answer:
      "C'est possible, mais soyons honnêtes : gérer soi-même son site représente souvent un frein en plus dans un quotidien déjà chargé (temps à y consacrer, risque de casser quelque chose). Certains clients le font, d'autres préfèrent ne pas s'en occuper. Dans les deux cas nous nous adaptons : formation pour les plus autonomes, offre de maintenance pour ceux qui préfèrent déléguer.",
  },
  {
    category: "Technique & autonomie",
    question: "Faut-il que je m'occupe de l'hébergement et du nom de domaine ?",
    answer:
      "Non, nous gérons tout : réservation de votre nom de domaine (ex. www.votre-entreprise.fr), hébergement rapide et sécurisé, adresses e-mail professionnelles. Vous restez bien sûr propriétaire de votre nom de domaine.",
  },
  {
    category: "Technique & autonomie",
    question: "Mon site fonctionnera-t-il sur mobile ?",
    answer:
      "Absolument. Plus de 60 % des visites se font aujourd'hui sur téléphone : tous nos sites sont conçus d'abord pour mobile, puis adaptés aux tablettes et ordinateurs. Ils sont testés sur tous les formats d'écran avant la mise en ligne.",
  },
  {
    category: "SEO & visibilité",
    question: "Serai-je premier sur Google ?",
    answer:
      "Personne ne peut honnêtement vous garantir la première position — méfiez-vous de ceux qui le promettent. En revanche, nous appliquons toutes les bonnes pratiques qui permettent de progresser durablement : site rapide, contenu optimisé, référencement local. Nos clients constatent des résultats concrets en quelques mois.",
  },
  {
    category: "SEO & visibilité",
    question: "Qu'est-ce que le référencement local ?",
    answer:
      "C'est le fait d'apparaître quand quelqu'un cherche votre métier dans votre ville, par exemple « boulangerie Orléans ». Pour un commerce ou un artisan, c'est souvent la source de clients la plus rentable. Nous optimisons votre site et votre fiche Google pour ces recherches.",
  },
  {
    category: "Après la mise en ligne",
    question: "Que se passe-t-il une fois le site en ligne ?",
    answer:
      "Nous ne disparaissons pas ! Chaque projet inclut une période d'accompagnement après la mise en ligne pour corriger, ajuster et répondre à vos questions. Ensuite, vous pouvez continuer avec notre offre de maintenance ou voler de vos propres ailes.",
  },
  {
    category: "Après la mise en ligne",
    question: "Que comprend la maintenance ?",
    answer:
      "Les mises à jour techniques, les sauvegardes régulières, la surveillance de la sécurité, et un volume de petites modifications chaque mois (changer un texte, ajouter des photos, publier une actualité). Votre site reste rapide, sûr et vivant.",
  },
  {
    category: "Après la mise en ligne",
    question: "Suis-je propriétaire de mon site ?",
    answer:
      "Oui, à 100 %. Votre site, votre nom de domaine et vos contenus vous appartiennent intégralement. Si vous décidez un jour de partir, nous vous remettons l'ensemble des fichiers — sans pénalité ni mauvaise surprise.",
  },
];

/** Sélection courte affichée sur la page d'accueil */
export const homeFaqItems = faqItems.filter((item) =>
  [
    "Combien coûte un site internet ?",
    "Combien de temps faut-il pour créer un site ?",
    "Pourrai-je modifier mon site moi-même ?",
    "Serai-je premier sur Google ?",
  ].includes(item.question)
);
