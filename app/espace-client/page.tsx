import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/container";
import {
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

function CarteProjet({ projet }: { projet: Projet }) {
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
              Livraison prévue le {datePrevue}
            </p>
          )}
        </div>
        <span className="shrink-0 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
          {avancement}&nbsp;% terminé
        </span>
      </div>

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

      {/* Les étapes */}
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

      {projet.note && (
        <div className="mt-8 rounded-xl border border-border-subtle bg-background p-5">
          <h3 className="mb-2 text-sm font-semibold">Message de KA DIGITAL</h3>
          <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted">
            {projet.note}
          </p>
        </div>
      )}

      <InfoSite projet={projet} />
    </article>
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

  const { data, error } = await supabase
    .from("projets")
    .select("*")
    .order("created_at", { ascending: false });

  const projets = (data ?? []) as Projet[];

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

        {!error && projets.length === 0 && (
          <div className="rounded-2xl border border-border-subtle bg-card p-10 text-center">
            <p className="font-medium">
              Aucun projet n&apos;est encore rattaché à cette adresse.
            </p>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted">
              Votre espace se remplira dès que votre projet sera ouvert. Si vous
              pensez qu&apos;il s&apos;agit d&apos;une erreur, vérifiez que vous
              utilisez bien l&apos;adresse e-mail communiquée lors de votre
              demande — ou contactez-moi.
            </p>
          </div>
        )}

        <div className="flex flex-col gap-8">
          {projets.map((projet) => (
            <CarteProjet key={projet.id} projet={projet} />
          ))}
        </div>
      </Container>
    </section>
  );
}
