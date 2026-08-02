# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Cible volontairement large, non tranchée à ce stade : artisans et commerçants locaux, PME établies cherchant une refonte, et entrepreneurs lançant leur activité. Le point commun est une petite structure sans compétence web interne, pour qui le site est un investissement engageant et un peu intimidant.

**Décision ouverte** : le resserrement de la cible principale n'est pas fait. Toute future page qui devrait s'adresser à un segment précis doit poser la question plutôt que de supposer.

## Product Purpose

Site vitrine de l'agence web CAP DIGITAL. Il doit convaincre un prospect que l'agence est compétente et fiable, puis déclencher une prise de contact. Après signature, le même site héberge l'espace où le client suit son projet.

Le succès se mesure en demandes de contact qualifiées, pas en trafic.

## Positioning

**L'espace client de suivi de projet.** Le client se connecte et voit où en est son site, étape par étape : Brief & cadrage → Maquette → Développement → Relecture & corrections → Mise en ligne.

C'est le différenciateur retenu par le propriétaire. Il est défendable parce qu'il est déjà construit et fonctionnel (Supabase Auth + table `projets`), pas seulement promis. La plupart des structures de cette taille gèrent le suivi par e-mail et téléphone.

Corollaire : la transparence sur l'avancement est une promesse produit, pas un argument marketing. Toute évolution qui opacifierait le suivi contredirait le positionnement.

## Operating Context

Le prospect arrive généralement sans vocabulaire technique et compare plusieurs prestataires. Il évalue surtout des signaux de confiance : est-ce que ces gens existent vraiment, est-ce qu'ils ont déjà livré, est-ce que je vais être accompagné ou abandonné après la mise en ligne.

Une part significative de la consultation se fait sur mobile.

Après signature, le client revient sur le site dans un autre état d'esprit : il ne se vend plus rien, il veut savoir où en est son projet. Les deux usages cohabitent sur le même domaine.

## Capabilities and Constraints

Prestations proposées : création de site vitrine, boutique e-commerce, refonte de site, optimisation SEO, maintenance & sécurité, accompagnement digital.

Surfaces existantes : accueil, services, réalisations (+ fiche détail), témoignages, à propos, blog (+ article), FAQ, contact, mentions légales, politique de confidentialité, espace client (connexion + tableau de bord), espace admin (connexion + gestion des projets).

Contraintes techniques : Next.js 16, TypeScript, Tailwind CSS v4, Motion, next-themes, lucide-react. Backend Supabase (Auth + Postgres avec RLS), notifications e-mail via Resend, hébergement Vercel. Thème sombre par défaut, thème clair au choix.

Un seul compte administrateur (le propriétaire). Les clients ont chacun leur compte et ne voient que leur propre projet.

**Faits produit non tranchés** — à ne jamais inventer :
- ~~Numéro de téléphone~~ : réglé le 02/08/2026 — `+33 1 85 78 29 41`.
- Nom de domaine : `www.cap-digital.fr` n'est pas actif ; le site tourne sur une URL Vercel.
- Mentions légales : SIRET, forme juridique et adresse sont encore entre crochets.
- Réseaux sociaux : les liens pointent vers les accueils génériques, aucun compte réel.
- Zone géographique : `location` vaut « France », jamais précisé davantage. Aucune stratégie de référencement local n'a été décidée.
- Tarifs : aucun prix n'est affiché ni fixé.

## Brand Commitments

Nom : **CAP DIGITAL** (anciennement KA DIGITAL, renommé le 30/07/2026).

Logo fourni par le propriétaire et binding : un « G » bleu nuit (#0B1633) traversé d'une flèche bleu vif (#0A5CFF), plus le mot-symbole « Cap Digital ». Déclinaisons dans `public/logo/`, dont une version blanche pour le thème sombre.

Accent de l'interface : bleu électrique (#3b82f6 en sombre, #2563eb en clair).

**Structure : petite équipe réelle.** Le « nous » est donc factuel et doit être tenu partout.

**Honnêteté des preuves — engagement explicite du propriétaire.** Six faux témoignages et une note « 4,9/5 » inventée ont été supprimés le 17/07/2026 à sa demande. Aucun avis, chiffre, logo client ou récompense ne doit être fabriqué, sous aucun prétexte.

Contact public : capdigital4118@gmail.com.

## Evidence on Hand

**Réel :**
- Un témoignage authentique : Houssem T., 5/5 (`lib/testimonials.ts`).
- Deux produits développés par le propriétaire, présentés avec de vraies captures d'écran : **AutoSearchPro** (extension Chrome, recherche de pièces automobiles) et **Partrelay** (SaaS de distribution de pièces détachées).
- L'espace client de suivi, fonctionnel et déployé.

**Démonstration assumée :**
- « Cabinet Delcourt » (`lib/projects.ts`) est un projet fictif, conservé volontairement pour illustrer un avant/après de refonte. Il ne doit jamais être présenté comme une référence client.

**Résolu le 02/08/2026** : la fiche affichait auparavant trois résultats chiffrés inventés et aucune mention de démonstration. Le propriétaire a tranché : le projet est conservé, les chiffres sont supprimés, et une mention « Démonstration » apparaît désormais sur la vignette et sur la fiche, complétée par un encadré qui dit explicitement que le cabinet est fictif. Le champ `demo: true` dans `lib/projects.ts` pilote cet affichage — tout futur projet de démonstration doit le porter et laisser `results` vide.

**Absences à ne pas combler par de l'invention :**
- Aucun autre témoignage client.
- Aucun site vitrine livré à un client tiers n'est présenté aujourd'hui.
- Les chiffres « 40+ projets livrés », « 98 % de clients satisfaits » et « 5 années d'expérience » étaient faux : confirmé par le propriétaire le 02/08/2026, `lib/stats.ts` et son composant ont été supprimés, ainsi que la ligne correspondante du fond animé du hero. Ne rien réintroduire de tel sans nombres réels et confirmés.

## Product Principles

1. **Ne jamais promettre ce qui n'existe pas.** La règle vaut pour les témoignages, les chiffres, les références et les délais. C'est un choix déjà tranché, pas une préférence.
2. **Le suivi de projet est le cœur, pas un bonus.** Chaque décision doit renforcer la lisibilité de l'avancement plutôt que la diluer.
3. **Parler à quelqu'un qui n'y connaît rien.** Le vocabulaire technique doit être traduit ou évité ; l'incompréhension du visiteur est un échec du site, pas du visiteur.
4. **Compenser le peu de preuves par la démonstration.** Faute de références nombreuses, c'est la qualité visible du site lui-même et la transparence du processus qui font la preuve.
5. **Le mobile est le cas normal**, pas une adaptation faite après coup.

## Accessibility & Inclusion

Aucune exigence formelle n'a été établie avec le propriétaire.

Contrainte de fait : le double thème sombre/clair impose de vérifier les contrastes dans les deux modes. Le public visé inclut des personnes peu à l'aise avec le web, ce qui rend les tailles de texte confortables et les cibles tactiles généreuses prioritaires.
