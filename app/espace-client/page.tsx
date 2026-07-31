import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/container";
import { Button } from "@/components/ui/button";
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

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold">
              Votre espace client
            </h1>
            <p className="mt-1 text-sm text-muted">
              Connecté en tant que {user.email}
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

        {/* Aucun site : on l'annonce clairement et on propose d'en lancer un. */}
        {!error && projets.length === 0 && (
          <div className="rounded-2xl border border-border-subtle bg-card p-10 text-center">
            <p className="font-display text-xl font-semibold">
              Aucun site n&apos;a encore été créé
            </p>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-muted">
              Vous n&apos;avez pas encore de projet chez CAP DIGITAL. Dès
              qu&apos;un site sera lancé, vous suivrez ici son avancement étape
              par étape, puis vous y retrouverez toutes ses informations.
            </p>
            <div className="mt-8">
              <Button href="/contact" size="lg">
                Créer un site
              </Button>
            </div>
            <p className="mx-auto mt-6 max-w-md text-xs text-muted">
              Vous avez déjà un projet en cours avec nous ? Vérifiez que vous
              êtes connecté avec l&apos;adresse e-mail communiquée lors de votre
              demande.
            </p>
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
              Créer un site
            </Button>
          </div>
        )}
      </Container>
    </section>
  );
}
