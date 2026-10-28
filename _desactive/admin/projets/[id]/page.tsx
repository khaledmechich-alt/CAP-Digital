import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { Container } from "@/components/ui/container";
import { ProjetForm } from "@/components/admin/projet-form";
import type { Projet } from "@/lib/projets";
import { mettreAJourProjet, supprimerProjet } from "../actions";

export const dynamic = "force-dynamic";

const messages: Record<string, string> = {
  email: "L'e-mail du client est obligatoire.",
  maj: "La mise à jour a échoué. Réessayez dans un instant.",
  suppression: "La suppression a échoué. Réessayez dans un instant.",
};

export default async function ModifierProjetPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ erreur?: string }>;
}) {
  const { id } = await params;
  const { erreur } = await searchParams;
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    redirect("/admin/login?erreur=acces");
  }

  const { data } = await supabase
    .from("projets")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!data) {
    notFound();
  }

  const projet = data as Projet;

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mx-auto w-full max-w-2xl">
          <Link
            href="/admin/projets"
            className="text-sm text-muted transition-colors hover:text-foreground"
          >
            ← Retour aux projets
          </Link>

          <h1 className="mb-2 mt-4 font-display text-3xl font-semibold">
            {projet.titre}
          </h1>
          <p className="mb-8 text-sm text-muted">
            Toute modification est visible immédiatement par le client.
          </p>

          {erreur && messages[erreur] && (
            <p className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500">
              {messages[erreur]}
            </p>
          )}

          <ProjetForm
            action={mettreAJourProjet}
            projet={projet}
            libelleBouton="Enregistrer les modifications"
          />

          <div className="mt-12 border-t border-border-subtle pt-8">
            <h2 className="text-sm font-semibold">Supprimer ce projet</h2>
            <p className="mb-4 mt-1 text-sm text-muted">
              Le client n&apos;y aura plus accès. Son compte, lui, reste actif.
              Cette action est définitive.
            </p>
            <form action={supprimerProjet}>
              <input type="hidden" name="id" value={projet.id} />
              <button
                type="submit"
                className="rounded-full border border-red-500/40 px-6 py-3 text-sm font-medium text-red-500 transition-colors hover:bg-red-500/10"
              >
                Supprimer définitivement
              </button>
            </form>
          </div>
        </div>
      </Container>
    </section>
  );
}
