/**
 * ============================================
 * BLOG — AJOUTEZ VOS ARTICLES ICI
 *
 * Pour ajouter un article : copiez un bloc { ... },
 * collez-le en haut de la liste et modifiez les textes.
 * La date doit être au format "AAAA-MM-JJ".
 * ============================================
 */

export type BlogSection = {
  heading?: string;
  paragraphs: string[];
  list?: string[];
};

export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  readingTime: string;
  content: BlogSection[];
};

export const blogPosts: BlogPost[] = [
  {
    slug: "pourquoi-site-web-entreprise",
    title: "Pourquoi votre entreprise a besoin d'un site web en 2026",
    excerpt:
      "8 Français sur 10 recherchent une entreprise sur internet avant de la contacter. Sans site web, vous êtes invisible pour la majorité de vos futurs clients.",
    date: "2026-06-12",
    category: "Stratégie digitale",
    readingTime: "5 min",
    content: [
      {
        paragraphs: [
          "« J'ai déjà une page Facebook, à quoi bon un site web ? » C'est une question que nous entendons souvent. Et elle mérite une vraie réponse, car l'enjeu est plus important qu'il n'y paraît : aujourd'hui, 8 Français sur 10 recherchent une entreprise sur internet avant de la contacter ou de se déplacer.",
        ],
      },
      {
        heading: "Votre site web travaille quand vous dormez",
        paragraphs: [
          "Un site web, c'est un commercial disponible 24h/24, 7j/7. Pendant que vous êtes en rendez-vous, en chantier ou en famille, il présente votre activité, répond aux questions fréquentes et collecte des demandes de devis.",
          "Contrairement aux réseaux sociaux, vous en êtes propriétaire : pas d'algorithme qui décide qui voit vos publications, pas de compte qui peut être suspendu du jour au lendemain.",
        ],
      },
      {
        heading: "La confiance se joue en quelques secondes",
        paragraphs: [
          "Mettez-vous à la place d'un client qui compare deux artisans : le premier a un site clair avec des photos de ses réalisations et des avis clients ; le second n'a qu'un numéro de téléphone dans un annuaire. Lequel appelle-t-il en premier ?",
          "Un site professionnel rassure immédiatement. Il montre que votre entreprise est sérieuse, établie et soucieuse de la qualité — avant même le premier contact.",
        ],
      },
      {
        heading: "Être trouvé sur Google, un avantage décisif",
        paragraphs: [
          "Quand quelqu'un tape « plombier », « restaurant » ou « coiffeur » suivi du nom de votre ville, Google affiche en priorité les entreprises qui disposent d'un site optimisé. Chaque jour sans site, ce sont des clients qui partent chez un concurrent mieux référencé.",
        ],
        list: [
          "81 % des consommateurs recherchent en ligne avant d'acheter",
          "Les recherches « près de chez moi » ont triplé en 5 ans",
          "Un site rapide et clair peut doubler vos demandes de contact",
        ],
      },
      {
        heading: "Par où commencer ?",
        paragraphs: [
          "Pas besoin de commencer par un site complexe. Un site vitrine bien conçu — qui présente clairement vos services, vos réalisations et un moyen de vous contacter — suffit souvent à faire une vraie différence.",
          "Chez CAP DIGITAL, le premier échange est gratuit et sans engagement : nous analysons votre situation et vous disons honnêtement ce qui aurait le plus d'impact pour votre activité.",
        ],
      },
    ],
  },
  {
    slug: "combien-coute-un-site-internet",
    title: "Combien coûte un site internet ? Le vrai prix expliqué",
    excerpt:
      "De 0 € à plusieurs dizaines de milliers d'euros : les écarts de prix sont énormes et souvent incompréhensibles. On vous explique ce qui fait vraiment le prix d'un site.",
    date: "2026-05-28",
    category: "Conseils",
    readingTime: "6 min",
    content: [
      {
        paragraphs: [
          "C'est LA question que tout le monde se pose, et c'est bien normal. Le problème, c'est que les réponses trouvées en ligne vont de « gratuit » à « 50 000 € »… Essayons d'y voir clair, honnêtement.",
        ],
      },
      {
        heading: "Pourquoi de tels écarts de prix ?",
        paragraphs: [
          "Le prix d'un site dépend surtout du travail sur mesure qu'il demande : un site vitrine de 5 pages ne représente pas le même travail qu'une boutique en ligne avec 500 produits, un paiement sécurisé et une gestion des stocks.",
          "Trois grands facteurs font varier le prix : la complexité (vitrine, e-commerce, fonctionnalités spécifiques), le niveau de personnalisation du design, et l'accompagnement inclus (textes, photos, référencement, formation).",
        ],
      },
      {
        heading: "Les sites « gratuits » ou à 5 € par mois : le piège",
        paragraphs: [
          "Les plateformes en libre-service semblent imbattables sur le prix. Mais le résultat est souvent un site lent, générique, mal référencé sur Google — et surtout, vous y passez des dizaines d'heures qui seraient mieux investies dans votre métier.",
          "Sans compter les limites qui arrivent vite : publicités imposées, nom de domaine non professionnel, impossibilité d'évoluer. Beaucoup de nos clients sont passés par là avant de nous contacter.",
        ],
      },
      {
        heading: "Nos fourchettes de prix",
        paragraphs: [
          "À titre indicatif, voici les fourchettes que nous pratiquons chez CAP DIGITAL :",
        ],
        list: [
          "Site vitrine professionnel : entre 800 € et 2 500 €",
          "Boutique e-commerce : entre 2 000 € et 6 000 €",
          "Refonte complète : entre 1 000 € et 3 500 €",
          "Maintenance mensuelle : entre 30 € et 150 € par mois",
        ],
      },
      {
        heading: "Le bon réflexe : raisonner en investissement",
        paragraphs: [
          "La vraie question n'est pas « combien ça coûte » mais « combien ça rapporte ». Un site à 1 500 € qui vous amène deux clients par mois est bien plus rentable qu'un site à 300 € qui n'en amène aucun.",
          "C'est pourquoi nous chiffrons chaque projet après un échange gratuit, avec un devis détaillé ligne par ligne. Vous savez exactement ce que vous payez, et pourquoi.",
        ],
      },
    ],
  },
  {
    slug: "5-signes-refonte-site-web",
    title: "5 signes qu'il est temps de refondre votre site web",
    excerpt:
      "Votre site a plus de 5 ans ? Il est peut-être en train de faire fuir vos clients sans que vous le sachiez. Voici les signaux qui ne trompent pas.",
    date: "2026-04-15",
    category: "Refonte",
    readingTime: "4 min",
    content: [
      {
        paragraphs: [
          "Un site web vieillit vite : les habitudes des visiteurs évoluent, Google change ses critères, le design d'hier paraît daté aujourd'hui. Voici les 5 signes qui indiquent qu'une refonte s'impose.",
        ],
      },
      {
        heading: "1. Votre site est illisible sur téléphone",
        paragraphs: [
          "Plus de 60 % des visites se font sur mobile. Si vos visiteurs doivent zoomer pour lire vos textes ou que les boutons sont impossibles à toucher du doigt, la majorité d'entre eux repart en quelques secondes — direction un concurrent.",
        ],
      },
      {
        heading: "2. Il met plus de 3 secondes à charger",
        paragraphs: [
          "53 % des visiteurs quittent un site qui met plus de 3 secondes à s'afficher. Et Google pénalise les sites lents dans ses résultats. Testez le vôtre : si vous avez le temps de soupirer avant que la page s'affiche, il y a un problème.",
        ],
      },
      {
        heading: "3. Le design fait « années 2010 »",
        paragraphs: [
          "Petites photos pixelisées, textes tassés, couleurs criardes… Votre site est souvent le premier contact avec votre entreprise. Un design daté envoie un message involontaire : « ici, on ne se soucie pas trop des détails ».",
        ],
      },
      {
        heading: "4. Il ne génère aucun contact",
        paragraphs: [
          "Un site n'est pas une plaquette : c'est un outil commercial. S'il ne vous apporte ni appels, ni e-mails, ni demandes de devis, c'est qu'il a un problème de visibilité, de clarté ou de confiance. Les trois se corrigent.",
        ],
      },
      {
        heading: "5. Vous ne pouvez pas le modifier vous-même",
        paragraphs: [
          "Changer un horaire, ajouter une photo, publier une actualité : ces gestes simples devraient être à votre portée. Si chaque petite modification nécessite de payer un prestataire, votre site est un frein plutôt qu'un outil.",
          "Bonne nouvelle : une refonte bien menée conserve votre référencement existant tout en corrigeant ces cinq problèmes. C'est précisément notre spécialité — parlons-en.",
        ],
      },
    ],
  },
  {
    slug: "seo-local-visible-google",
    title: "SEO local : comment être visible sur Google dans votre ville",
    excerpt:
      "Pour un commerce ou un artisan, apparaître dans les recherches locales est la source de clients la plus rentable. Voici comment ça fonctionne, sans jargon.",
    date: "2026-03-02",
    category: "SEO",
    readingTime: "5 min",
    content: [
      {
        paragraphs: [
          "Quand un habitant de votre ville tape « boulangerie », « électricien » ou « institut de beauté » sur Google, il voit d'abord une carte avec trois établissements, puis une liste de sites. Être dans ces premiers résultats, c'est ce qu'on appelle le référencement local — et c'est une mine d'or pour les entreprises de proximité.",
        ],
      },
      {
        heading: "Pourquoi le SEO local est si rentable",
        paragraphs: [
          "Une personne qui cherche « plombier + votre ville » n'est pas en train de se renseigner vaguement : elle a besoin d'un plombier, maintenant, près de chez elle. Ces visiteurs-là se transforment en clients bien plus souvent que la moyenne.",
        ],
      },
      {
        heading: "Les 3 piliers de la visibilité locale",
        paragraphs: ["Google s'appuie principalement sur trois éléments :"],
        list: [
          "Votre fiche d'établissement Google (horaires, photos, avis clients à jour)",
          "Un site web optimisé qui mentionne clairement votre ville et vos services",
          "Des avis clients réguliers et des réponses à ces avis",
        ],
      },
      {
        heading: "Le rôle décisif de votre site web",
        paragraphs: [
          "La fiche Google ne suffit pas : c'est votre site qui confirme à Google que vous êtes une entreprise sérieuse et pertinente. Pages de services claires, textes qui mentionnent votre zone d'intervention, site rapide et adapté au mobile : chaque détail compte dans le classement.",
        ],
      },
      {
        heading: "Combien de temps pour voir des résultats ?",
        paragraphs: [
          "Le référencement local porte généralement ses fruits en 3 à 6 mois. C'est un investissement progressif mais durable : une fois bien positionné, vous recevez des contacts réguliers sans payer de publicité.",
          "Nous incluons les fondations du SEO local dans tous nos sites, et proposons un accompagnement dédié pour aller plus loin. Premier audit gratuit sur simple demande.",
        ],
      },
    ],
  },
];

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

export function formatBlogDate(date: string): string {
  return new Date(date).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
