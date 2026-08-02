import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/site-config";
import {
  DERNIERE_ETAPE,
  ETAPES,
  etapeValide,
  formaterDate,
  pourcentageAvancement,
  type Projet,
} from "@/lib/projets";
import { cn } from "@/lib/utils";
import { signOutClient } from "./actions";

export const metadata: Metadata = {
  title: "Espace client",
  robots: { index: false, follow: false },
};

// On lit la session et la base à chaque visite.
export const dynamic = "force-dynamic";

// Le prénom pour dire bonjour. Deux sources possibles : ce que la personne a
// saisi à l'inscription, ou le nom que nous avons nous-mêmes renseigné sur son
// projet. Si les deux manquent (comptes créés avant l'ajout du champ), on salue
// sans prénom plutôt que d'afficher un début d'adresse e-mail.
function prenomDe(
  metadata: Record<string, unknown> | undefined,
  projets: Projet[]
): string | null {
  const saisi = typeof metadata?.prenom === "string" ? metadata.prenom : "";
  const surProjet = projets.find((p) => p.client_name)?.client_name ?? "";

  const premier = (saisi.trim() || surProjet.trim()).split(/\s+/)[0];
  if (!premier) return null;

  return premier.charAt(0).toUpperCase() + premier.slice(1);
}

function InfoSite({ projet }: { projet: Projet }) {
  const infos = [
    { label: "Adresse du site", valeur: projet.site_url, lien: true },
    { label: "Nom de domaine", valeur: projet.nom_domaine, lien: false },
    {
      label: "Renouvellement du domaine",
      valeur: formaterDate(projet.renouvellement_domaine),
      lien: false,
    },
    { label: "Accès à votre back-office", valeur: projet.url_backoffice, lien: true },
    { label: "Maintenance", valeur: projet.maintenance, lien: false },
  ].filter((info) => info.valeur);

  if (infos.length === 0) return null;

  return (
    <div className="mt-8 border-t border-border-subtle pt-6">
      <h3 className="mb-4 text-sm font-semibold uppercase tracking-widest text-muted">
        Les infos de votre site
      </h3>
      <dl className="grid gap-4 sm:grid-cols-2">
        {infos.map((info) => (
          <div key={info.label}>
            <dt className="text-xs text-muted">{info.label}</dt>
            <dd className="mt-1 break-words text-sm font-medium">
              {info.lien ? (
                <a
                  href={info.valeur as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-accent hover:underline"
                >
                  {info.valeur}
                </a>
              ) : (
                info.valeur
              )}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

function CarteProjet({ projet, livre }: { projet: Projet; livre: boolean }) {
  const etapeCourante = etapeValide(projet.etape);
  const avancement = pourcentageAvancement(etapeCourante);
  const datePrevue = formaterDate(projet.date_prevue);

  return (
    <article className="rounded-2xl border border-border-subtle bg-card p-6 md:p-8">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="font-display text-xl font-semibold">{projet.titre}</h2>
          {datePrevue && (
            <p className="mt-1 text-sm text-muted">
              {livre ? "Livré le" : "Livraison prévue le"} {datePrevue}
            </p>
          )}
        </div>
        <span className="shrink-0 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
          {livre ? "Site en ligne" : `${avancement} % terminé`}
        </span>
      </div>

      {/* Un site livré n'a plus besoin de sa barre d'avancement ni de ses
          étapes : on va droit aux informations utiles. */}
      {!livre && (
        <>
          {/* Barre d'avancement */}
          <div
            className="h-2 w-full overflow-hidden rounded-full bg-background"
            role="progressbar"
            aria-valuenow={avancement}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={`Avancement du projet ${projet.titre}`}
          >
            <div
              className="h-full rounded-full bg-accent transition-all duration-500"
              style={{ width: `${avancement}%` }}
            />
          </div>

          <EtapesProjet etapeCourante={etapeCourante} />
        </>
      )}

      {projet.note && (
        <div className="mt-8 rounded-xl border border-border-subtle bg-background p-5">
          <h3 className="mb-2 text-sm font-semibold">Message de CAP DIGITAL</h3>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted">
            {projet.note}
          </p>
        </div>
      )}

      <InfoSite projet={projet} />
    </article>
  );
}

function EtapesProjet({ etapeCourante }: { etapeCourante: number }) {
  return (
    <ol className="mt-8 flex flex-col gap-5">
        {ETAPES.map((etape) => {
          const terminee = etape.numero < etapeCourante;
          const enCours = etape.numero === etapeCourante;

          return (
            <li key={etape.numero} className="flex gap-4">
              <span
                aria-hidden="true"
                className={cn(
                  "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold",
                  terminee && "border-accent bg-accent text-white",
                  enCours && "border-accent text-accent",
                  !terminee && !enCours && "border-border-subtle text-muted"
                )}
              >
                {terminee ? "✓" : etape.numero}
              </span>
              <div>
                <p
                  className={cn(
                    "text-sm font-medium",
                    !terminee && !enCours && "text-muted"
                  )}
                >
                  {etape.titre}
                  {enCours && (
                    <span className="ml-2 text-xs font-normal text-accent">
                      en cours
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-sm text-muted">{etape.description}</p>
              </div>
            </li>
          );
      })}
    </ol>
  );
}

export default async function EspaceClientPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Le middleware protège déjà la page, mais on revérifie ici.
  if (!user) {
    redirect("/espace-client/connexion");
  }

  // Le filtre par e-mail double la sécurité déjà assurée par Supabase (RLS) :
  // même en cas de règle mal configurée, un client ne peut voir que ses projets.
  const { data, error } = await supabase
    .from("projets")
    .select("*")
    .eq("client_email", (user.email ?? "").toLowerCase())
    .order("created_at", { ascending: false });

  const projets = (data ?? []) as Projet[];

  // Un site est « livré » quand il a passé la dernière étape (mise en ligne).
  const enCours = projets.filter((p) => etapeValide(p.etape) < DERNIERE_ETAPE);
  const livres = projets.filter((p) => etapeValide(p.etape) === DERNIERE_ETAPE);

  const prenom = prenomDe(user.user_metadata, projets);

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mb-12 flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold md:text-4xl">
              Bonjour{prenom ? ` ${prenom}` : ""}
            </h1>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted">
              Bienvenue dans votre espace client. Vous y suivez l&apos;avancement
              de votre projet et retrouvez toutes les informations de votre site.
            </p>
          </div>
          <form action={signOutClient}>
            <button
              type="submit"
              className="rounded-full border border-border-subtle bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:bg-card-hover"
            >
              Se déconnecter
            </button>
          </form>
        </div>

        {error && (
          <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500">
            Impossible de charger votre projet pour le moment. Réessayez dans un
            instant.
          </p>
        )}

        {/* Aucun site : on reste sobre. Pas de rubriques vides ni d'étapes
            cochées d'avance — rien n'a encore commencé, on le dit simplement
            et on donne la seule action utile. */}
        {!error && projets.length === 0 && (
          <div className="border-t border-border-subtle">
            <div className="py-10">
              <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
                Votre projet
              </h2>
              <p className="mt-4 font-display text-2xl font-semibold">
                Aucun projet en cours
              </p>
              <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
                Racontez-nous le vôtre : nous vous répondons sous 24h et vous
                recevez un devis détaillé sous 48h, gratuitement et sans
                engagement.
              </p>
              <div className="mt-7">
                <Button href="/contact" size="lg">
                  Lancer mon projet
                </Button>
              </div>
              <p className="mt-7 max-w-lg text-xs leading-relaxed text-muted">
                Vous avez déjà un projet avec nous ? Vérifiez que vous êtes
                connecté avec l&apos;adresse e-mail communiquée lors de votre
                demande : c&apos;est elle qui relie votre site à ce compte.
              </p>
            </div>
          </div>
        )}

        {/* Les sites en cours de fabrication */}
        {enCours.length > 0 && (
          <div className="mb-12">
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-muted">
              {enCours.length > 1 ? "Vos sites en cours" : "Votre site en cours"}
            </h2>
            <div className="flex flex-col gap-8">
              {enCours.map((projet) => (
                <CarteProjet key={projet.id} projet={projet} livre={false} />
              ))}
            </div>
          </div>
        )}

        {/* L'historique : les sites déjà livrés */}
        {livres.length > 0 && (
          <div>
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-muted">
              Historique de vos sites
            </h2>
            <div className="flex flex-col gap-8">
              {livres.map((projet) => (
                <CarteProjet key={projet.id} projet={projet} livre />
              ))}
            </div>
          </div>
        )}

        {/* Déjà client : on propose quand même de lancer un nouveau projet. */}
        {!error && projets.length > 0 && (
          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-border-subtle bg-card px-6 py-5">
            <p className="text-sm text-muted">
              Envie d&apos;un nouveau site ou d&apos;une refonte ?
            </p>
            <Button href="/contact" variant="secondary">
              Nouveau projet
            </Button>
          </div>
        )}

        {/* Le support : une vraie adresse, pas une rubrique décorative. */}
        <div className="mt-12 border-t border-border-subtle pt-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
            Besoin d&apos;aide ?
          </h2>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-muted">
            Une question sur votre projet ? Écrivez-nous à{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-accent hover:underline"
            >
              {siteConfig.email}
            </a>
            . Nous répondons sous 24h.
          </p>
          <p className="mt-6 text-xs text-muted">
            Connecté en tant que {user.email}
          </p>
        </div>
      </Container>
    </section>
  );
}
