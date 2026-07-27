import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { Container } from "@/components/ui/container";
import { AdminNav } from "@/components/admin/admin-nav";
import { ETAPES, etapeValide, formaterDate, type Projet } from "@/lib/projets";

export const dynamic = "force-dynamic";

const messages: Record<string, { texte: string; erreur: boolean }> = {
  "ok:creation": { texte: "Projet créé.", erreur: false },
  "ok:maj": { texte: "Projet mis à jour.", erreur: false },
  "ok:suppression": { texte: "Projet supprimé.", erreur: false },
  "erreur:email": {
    texte: "L'e-mail du client est obligatoire.",
    erreur: true,
  },
  "erreur:creation": {
    texte: "La création a échoué. Réessayez dans un instant.",
    erreur: true,
  },
  "erreur:introuvable": { texte: "Projet introuvable.", erreur: true },
};

export default async function AdminProjetsPage({
  searchParams,
}: {
  searchParams: Promise<{ ok?: string; erreur?: string }>;
}) {
  const { ok, erreur } = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    redirect("/admin/login?erreur=acces");
  }

  const { data, error } = await supabase
    .from("projets")
    .select("*")
    .order("created_at", { ascending: false });

  const projets = (data ?? []) as Projet[];
  const message = messages[ok ? `ok:${ok}` : erreur ? `erreur:${erreur}` : ""];

  return (
    <section className="py-16 md:py-24">
      <Container>
        <AdminNav actif="projets" email={user.email} />

        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold">
              Projets clients
            </h1>
            <p className="mt-1 text-sm text-muted">
              {projets.length} projet{projets.length > 1 ? "s" : ""} en cours de
              suivi
            </p>
          </div>
          <Link
            href="/admin/projets/nouveau"
            className="rounded-full bg-accent px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-accent-strong"
          >
            + Nouveau projet
          </Link>
        </div>

        {message && (
          <p
            className={
              message.erreur
                ? "mb-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500"
                : "mb-6 rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm"
            }
          >
            {message.texte}
          </p>
        )}

        {error && (
          <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500">
            Impossible de charger les projets. Avez-vous bien créé la table
            « projets » dans Supabase ?
          </p>
        )}

        {!error && projets.length === 0 && (
          <div className="rounded-2xl border border-border-subtle bg-card p-10 text-center text-muted">
            Aucun projet pour le moment. Créez-en un, puis demandez à votre
            client de créer son compte avec la même adresse e-mail.
          </div>
        )}

        <div className="flex flex-col gap-4">
          {projets.map((projet) => {
            const etape = etapeValide(projet.etape);
            const titreEtape = ETAPES[etape - 1]?.titre ?? "—";
            const datePrevue = formaterDate(projet.date_prevue);

            return (
              <Link
                key={projet.id}
                href={`/admin/projets/${projet.id}`}
                className="rounded-2xl border border-border-subtle bg-card p-6 transition-colors hover:bg-card-hover"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">{projet.titre}</h2>
                    <p className="mt-1 text-sm text-muted">
                      {projet.client_name
                        ? `${projet.client_name} — ${projet.client_email}`
                        : projet.client_email}
                    </p>
                  </div>
                  <span className="shrink-0 rounded-full border border-accent/40 bg-accent/10 px-4 py-1.5 text-xs font-medium text-accent">
                    {etape}/{ETAPES.length} · {titreEtape}
                  </span>
                </div>
                {datePrevue && (
                  <p className="mt-3 text-xs text-muted">
                    Livraison prévue le {datePrevue}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
