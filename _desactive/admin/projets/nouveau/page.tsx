import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { Container } from "@/components/ui/container";
import { ProjetForm } from "@/components/admin/projet-form";
import { creerProjet } from "../actions";

export const dynamic = "force-dynamic";

export default async function NouveauProjetPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    redirect("/admin/login?erreur=acces");
  }

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

          <h1 className="mb-8 mt-4 font-display text-3xl font-semibold">
            Nouveau projet
          </h1>

          <ProjetForm action={creerProjet} libelleBouton="Créer le projet" />
        </div>
      </Container>
    </section>
  );
}
