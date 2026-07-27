import Link from "next/link";
import { cn } from "@/lib/utils";
import { signOut } from "@/app/admin/actions";

const onglets = [
  { cle: "demandes", label: "Demandes de contact", href: "/admin" },
  { cle: "projets", label: "Projets clients", href: "/admin/projets" },
] as const;

export function AdminNav({
  actif,
  email,
}: {
  actif: (typeof onglets)[number]["cle"];
  email: string | undefined;
}) {
  return (
    <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
      <nav aria-label="Navigation de l'administration">
        <ul className="flex flex-wrap gap-1">
          {onglets.map((onglet) => (
            <li key={onglet.cle}>
              <Link
                href={onglet.href}
                aria-current={actif === onglet.cle ? "page" : undefined}
                className={cn(
                  "inline-block rounded-full px-5 py-2.5 text-sm font-medium transition-colors",
                  actif === onglet.cle
                    ? "bg-accent text-white"
                    : "border border-border-subtle bg-card text-muted hover:text-foreground"
                )}
              >
                {onglet.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="flex items-center gap-4">
        <span className="hidden text-sm text-muted sm:inline">{email}</span>
        <form action={signOut}>
          <button
            type="submit"
            className="rounded-full border border-border-subtle bg-card px-5 py-2.5 text-sm font-medium transition-colors hover:bg-card-hover"
          >
            Se déconnecter
          </button>
        </form>
      </div>
    </div>
  );
}
