import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { Container } from "@/components/ui/container";
import { signOut } from "./actions";

// Toujours rendre à la demande (on lit la session + la base à chaque visite).
export const dynamic = "force-dynamic";

type Contact = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string | null;
  company: string | null;
  project_type: string | null;
  budget: string | null;
  message: string;
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleString("fr-FR", {
    dateStyle: "long",
    timeStyle: "short",
  });
}

export default async function AdminPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Sécurité : le middleware protège déjà /admin, mais on revérifie ici.
  if (!user) {
    redirect("/admin/login");
  }

  const { data, error } = await supabase
    .from("contacts")
    .select("*")
    .order("created_at", { ascending: false });

  const contacts = (data ?? []) as Contact[];

  return (
    <section className="py-16 md:py-24">
      <Container>
        <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-3xl font-semibold">
              Vos demandes de contact
            </h1>
            <p className="mt-1 text-sm text-muted">
              {contacts.length} demande{contacts.length > 1 ? "s" : ""} —
              connecté en tant que {user.email}
            </p>
          </div>
          <form action={signOut}>
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
            Impossible de charger les demandes pour le moment. Réessayez dans un
            instant.
          </p>
        )}

        {!error && contacts.length === 0 && (
          <div className="rounded-2xl border border-border-subtle bg-card p-10 text-center text-muted">
            Aucune demande pour le moment. Elles apparaîtront ici dès qu&apos;un
            visiteur remplira le formulaire de contact.
          </div>
        )}

        {contacts.length > 0 && (
          <div className="flex flex-col gap-4">
            {contacts.map((contact) => (
              <article
                key={contact.id}
                className="rounded-2xl border border-border-subtle bg-card p-6"
              >
                <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h2 className="text-lg font-semibold">{contact.name}</h2>
                    <a
                      href={`mailto:${contact.email}`}
                      className="text-sm text-accent hover:underline"
                    >
                      {contact.email}
                    </a>
                  </div>
                  <time className="shrink-0 text-xs text-muted">
                    {formatDate(contact.created_at)}
                  </time>
                </div>

                <div className="mb-4 flex flex-wrap gap-x-6 gap-y-1 text-sm text-muted">
                  {contact.phone && <span>📞 {contact.phone}</span>}
                  {contact.company && <span>🏢 {contact.company}</span>}
                  {contact.project_type && <span>🗂️ {contact.project_type}</span>}
                  {contact.budget && <span>💶 {contact.budget}</span>}
                </div>

                <p className="whitespace-pre-wrap text-sm leading-relaxed">
                  {contact.message}
                </p>

                <a
                  href={`mailto:${contact.email}?subject=${encodeURIComponent(
                    "Votre demande — KA DIGITAL"
                  )}`}
                  className="mt-4 inline-block text-sm font-medium text-accent hover:underline"
                >
                  Répondre par e-mail →
                </a>
              </article>
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
