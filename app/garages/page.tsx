import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Accordion } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/ui/section-heading";
import { PageHero } from "@/components/sections/page-hero";

export const metadata: Metadata = {
  title: "Site internet pour garage automobile — demandes de devis en ligne",
  description:
    "CAP DIGITAL crée des sites pour garages indépendants avec prise de demandes automatique : votre client reçoit une réponse immédiate, vous recevez un résumé clair avec véhicule, plaque et problème. Démonstration à voir en ligne.",
};

const problemes = [
  {
    titre: "Le téléphone sonne quand vous êtes sous une voiture",
    texte:
      "Vous avez les mains prises, un client au comptoir, une réparation à finir pour ce soir. L'appel passe en absent, et vous ne savez même pas qui c'était ni pourquoi.",
  },
  {
    titre: "Le client sans réponse appelle le garage suivant",
    texte:
      "Une personne dont la voiture fait un bruit inquiétant ne laisse pas toujours de message : elle rappelle ailleurs. Vous ne saurez jamais que cette demande a existé.",
  },
  {
    titre: "Vous rappelez le soir, c'est déjà trop tard",
    texte:
      "Quand vous reprenez vos appels en fin de journée, le rendez-vous est souvent pris ailleurs. Et la plaque notée sur un bout de papier a disparu du comptoir.",
  },
];

const solution = [
  {
    etape: "Côté client",
    titre: "Il décrit son besoin en deux minutes, depuis son téléphone",
    texte:
      "Devis, rendez-vous ou simple question : il indique son véhicule, sa plaque, ce qu'il entend ou ce qu'il voit, et le créneau qui l'arrange. Même à 22 h, même le dimanche.",
  },
  {
    etape: "Tout de suite après",
    titre: "Il reçoit un accusé de réception par e-mail",
    texte:
      "Sa demande est bien arrivée, vous le rappellerez : il arrête de chercher un autre garage. Aucun tarif ni délai n'est annoncé à votre place.",
  },
  {
    etape: "Côté garage",
    titre: "Vous recevez un résumé clair, prêt à traiter",
    texte:
      "Le client, le véhicule, la plaque, le problème décrit avec ses mots, le créneau souhaité et le niveau d'urgence. Vous répondez directement à l'e-mail pour le recontacter.",
  },
];

const etapes = [
  {
    numero: "01",
    titre: "On échange sur votre garage",
    texte:
      "Vos prestations, votre zone, vos horaires, votre façon de travailler. Un premier échange sans engagement, par téléphone ou sur place.",
  },
  {
    numero: "02",
    titre: "Nous construisons, vous validez",
    texte:
      "Nous montons le site et la prise de demandes avec vos informations, puis nous vous le montrons. Vous demandez les corrections que vous voulez avant toute mise en ligne.",
  },
  {
    numero: "03",
    titre: "Mise en ligne et prise en main",
    texte:
      "Le site passe en ligne sur votre nom de domaine et nous vous montrons comment lire les demandes. Délai de réalisation : [À CONFIRMER].",
  },
];

const faqGarages = [
  {
    question: "Est-ce que je serai premier sur Google ?",
    answer:
      "Non, et personne ne peut vous le promettre honnêtement. Votre place dépend de vos concurrents, de l'ancienneté de votre site et de l'algorithme de Google — trois choses qu'aucune agence ne contrôle. Ce qui aide vraiment : un site rapide qui dit clairement ce que vous faites et où, plus une fiche Google bien remplie avec vos horaires, vos photos et vos avis. Nous faisons les deux, et nous vous expliquons comment entretenir la fiche. Mais nous ne vendons aucune garantie de position.",
  },
  {
    question: "Je n'y connais rien en informatique, c'est un problème ?",
    answer:
      "Non. Vous n'avez rien à installer et rien à administrer. Les demandes arrivent dans votre boîte e-mail, comme un message normal, et vous répondez comme vous répondez à n'importe quel e-mail. Si vous voulez modifier un horaire ou une prestation, vous nous le dites.",
  },
  {
    question: "Est-ce que ça répond à ma place aux clients ?",
    answer:
      "Non, et c'est volontaire. L'accusé de réception confirme seulement que la demande est arrivée et que vous rappellerez. Il n'avance aucun diagnostic, aucun tarif et aucun délai d'intervention : ces trois choses vous appartiennent, et elles dépendent du véhicule que vous aurez sous les yeux.",
  },
  {
    question: "Je garde mon téléphone ?",
    answer:
      "Bien sûr. Le site ne remplace pas le téléphone, il récupère ce que le téléphone laisse passer : les appels pendant que vous travaillez, le soir, le week-end. Votre numéro reste affiché en évidence, avec un bouton d'appel direct sur mobile.",
  },
  {
    question: "Et si je reçois des demandes qui ne me concernent pas ?",
    answer:
      "Le formulaire est protégé contre les robots et limite le nombre d'envois depuis une même connexion. Pour le reste, vous restez maître : une demande qui ne vous intéresse pas, vous ne la traitez pas. Rien ne vous engage.",
  },
  {
    question: "Combien ça coûte ?",
    answer:
      "À partir de 690 € pour la première année, puis un abonnement mensuel dont le montant et le contenu sont [À CONFIRMER]. Le devis est gratuit et détaillé : vous savez ce que vous payez avant de vous engager.",
  },
];

export default function GaragesPage() {
  return (
    <>
      <PageHero
        eyebrow="Garages automobiles indépendants"
        title="Vous ne ratez plus aucun client, même les mains dans un moteur."
        em="les mains dans un moteur."
        description="Un site de garage avec une prise de demandes automatique : votre client reçoit une réponse immédiate, vous recevez un résumé clair. Vous rappelez quand vous avez les mains libres."
      />

      {/* Démonstration : le plus convaincant, donc tout en haut */}
      <section className="py-10">
        <Container>
          <Reveal variant="up">
            <div className="flex flex-col items-start gap-6 border-y border-border-subtle py-10 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="label-mono mb-3">À voir en 2 minutes</p>
                <p className="font-display max-w-xl text-2xl leading-[1.15] tracking-[-0.02em] md:text-3xl">
                  Essayez la démonstration : remplissez le formulaire et{" "}
                  <span className="em-serif">
                    vous verrez les deux e-mails
                  </span>
                  , celui du client et celui du garage.
                </p>
              </div>
              <Button href="/demo/garage" size="lg" className="shrink-0">
                Voir la démonstration
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Le problème */}
      <section className="py-20 md:py-28">
        <Container className="flex flex-col gap-16">
          <SectionHeading
            eyebrow="Le problème"
            title="Un garage ne peut pas être au téléphone et sous une voiture."
            em="sous une voiture."
            description="Ce n'est pas un défaut d'organisation : c'est le métier. Mais chaque appel manqué est un client qui part ailleurs, sans que vous sachiez qu'il a essayé."
          />

          <div className="grid gap-px border-y border-border-subtle bg-border-subtle md:grid-cols-3">
            {problemes.map((item, index) => (
              <Reveal key={item.titre} variant="up" delay={index * 0.08}>
                <article className="flex h-full flex-col gap-3 bg-background p-8">
                  <h3 className="font-display text-xl tracking-[-0.02em]">
                    {item.titre}
                  </h3>
                  <p className="leading-relaxed text-muted">{item.texte}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* La solution */}
      <section className="border-t border-border-subtle py-20 md:py-28">
        <Container className="flex flex-col gap-16">
          <SectionHeading
            eyebrow="La solution"
            title="Le site prend la demande, vous reprenez la main."
            em="vous reprenez la main."
            description="L'automatisation ne remplace pas le garagiste : elle attrape la demande pendant que vous travaillez, et vous la présente proprement quand vous êtes disponible."
          />

          <ol className="flex flex-col">
            {solution.map((item, index) => (
              <Reveal key={item.titre} variant="up" delay={index * 0.08}>
                <li className="grid gap-4 border-t border-border-subtle py-10 md:grid-cols-12 md:gap-8">
                  <p className="label-mono md:col-span-3">{item.etape}</p>
                  <h3 className="font-display text-2xl leading-[1.15] tracking-[-0.02em] md:col-span-4">
                    {item.titre}
                  </h3>
                  <p className="leading-relaxed text-muted md:col-span-5">
                    {item.texte}
                  </p>
                </li>
              </Reveal>
            ))}
          </ol>

          <Reveal variant="up">
            <Button href="/demo/garage" size="lg">
              Essayer la démonstration
            </Button>
          </Reveal>
        </Container>
      </section>

      {/* Positionnement */}
      <section className="border-t border-border-subtle py-20 md:py-28">
        <Container>
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <SectionHeading
                eyebrow="Qui vous parle"
                title="Une agence qui vient du monde de la pièce auto."
                em="de la pièce auto."
              />
            </div>
            <div className="flex flex-col gap-6 md:col-span-7">
              <p className="text-lg leading-relaxed text-muted">
                Avant de faire des sites pour les garages, nous avons construit
                des outils pour ceux qui cherchent et distribuent des pièces
                détachées : <strong className="text-foreground">AutoSearchPro</strong>,
                une extension qui compare les fournisseurs à partir d&apos;une
                plaque ou d&apos;un VIN, et{" "}
                <strong className="text-foreground">Partrelay</strong>, un
                logiciel de distribution de pièces.
              </p>
              <p className="leading-relaxed text-muted">
                Concrètement, vous n&apos;aurez pas à nous expliquer ce
                qu&apos;est une référence OEM, un VIN ou une immatriculation au
                format SIV. Le formulaire accepte d&apos;ailleurs l&apos;ancien
                format de plaque comme le nouveau, avec ou sans tirets — parce
                que vos clients tapent ce qu&apos;ils ont sous les yeux.
              </p>
              <p className="leading-relaxed text-muted">
                Nous sommes une petite équipe. Vous parlez à la personne qui
                fait le travail, pas à un commercial.
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* Offre */}
      <section className="border-t border-border-subtle py-20 md:py-28">
        <Container className="flex flex-col gap-12">
          <SectionHeading
            eyebrow="L'offre"
            title="À partir de 690 € la première année."
            em="690 €"
            description="Le devis est gratuit et détaillé. Vous savez ce que vous payez avant de vous engager, et rien ne démarre sans votre accord écrit."
          />

          <div className="grid gap-px border-y border-border-subtle bg-border-subtle md:grid-cols-2">
            <div className="flex flex-col gap-4 bg-background p-8">
              <p className="label-mono">Première année</p>
              <p className="font-display text-4xl tracking-[-0.02em]">
                à partir de 690 €
              </p>
              <ul className="flex flex-col gap-2 leading-relaxed text-muted">
                <li>Le site du garage, pensé pour le téléphone d&apos;abord</li>
                <li>
                  Prestations, horaires, zone d&apos;intervention et bouton
                  d&apos;appel direct
                </li>
                <li>
                  La prise de demandes automatique : accusé au client, résumé au
                  garage
                </li>
                <li>Mise en ligne et prise en main</li>
                <li className="text-foreground">
                  Nom de domaine, nombre de pages et contenu exact :
                  [À CONFIRMER]
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-4 bg-background p-8">
              <p className="label-mono">Ensuite</p>
              <p className="font-display text-4xl tracking-[-0.02em]">
                abonnement mensuel
              </p>
              <ul className="flex flex-col gap-2 leading-relaxed text-muted">
                <li className="text-foreground">
                  Montant mensuel : [À CONFIRMER]
                </li>
                <li className="text-foreground">
                  Ce que couvre l&apos;abonnement : [À CONFIRMER]
                </li>
                <li>
                  Durée d&apos;engagement et conditions d&apos;arrêt :
                  [À CONFIRMER]
                </li>
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* 3 étapes */}
      <section className="border-t border-border-subtle py-20 md:py-28">
        <Container className="flex flex-col gap-16">
          <SectionHeading
            eyebrow="Comment ça se passe"
            title="Trois étapes, et vous n'avez rien à installer."
            em="rien à installer."
          />

          <ol className="grid gap-px border-y border-border-subtle bg-border-subtle md:grid-cols-3">
            {etapes.map((etape, index) => (
              <Reveal key={etape.numero} variant="up" delay={index * 0.08}>
                <li className="flex h-full flex-col gap-3 bg-background p-8">
                  <p className="label-mono text-accent">{etape.numero}</p>
                  <h3 className="font-display text-xl tracking-[-0.02em]">
                    {etape.titre}
                  </h3>
                  <p className="leading-relaxed text-muted">{etape.texte}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* FAQ */}
      <section className="border-t border-border-subtle py-20 md:py-28">
        <Container>
          <div className="grid gap-10 md:grid-cols-12">
            <div className="md:col-span-4">
              <SectionHeading
                eyebrow="Questions de garagistes"
                title="Les réponses, sans enrobage."
                em="sans enrobage."
              />
            </div>
            <div className="md:col-span-8">
              <Accordion items={faqGarages} />
            </div>
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section className="border-t border-border-subtle py-20 md:py-28">
        <Container className="flex flex-col items-start gap-8">
          <h2 className="font-display max-w-[20ch] text-3xl leading-[1.08] tracking-[-0.025em] md:text-5xl">
            Parlons de votre garage, <span className="em-serif">sans engagement</span>.
          </h2>
          <p className="max-w-xl leading-relaxed text-muted">
            Dites-nous où vous êtes, ce que vous réparez et ce qui vous échappe
            aujourd&apos;hui. Nous vous répondons avec un devis clair, ou nous
            vous disons franchement si nous ne sommes pas les bons.
          </p>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button href="/contact" size="lg">
              Demander un devis gratuit
            </Button>
            <Button href="/demo/garage" variant="secondary" size="lg">
              Revoir la démonstration
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
