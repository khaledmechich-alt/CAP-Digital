import type { Metadata } from "next";
import { AuthForm } from "./auth-form";

export const metadata: Metadata = {
  title: "Espace client",
  description: "Connectez-vous pour suivre l'avancement de votre projet.",
  robots: { index: false, follow: false },
};

export default async function ConnexionClientPage({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string }>;
}) {
  const { erreur } = await searchParams;

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-20">
      <div className="w-full max-w-sm">
        <h1 className="text-center font-display text-2xl font-semibold">
          Espace client
        </h1>
        <p className="mb-8 mt-2 text-center text-sm text-muted">
          Suivez l&apos;avancement de votre projet et retrouvez les
          informations de votre site.
        </p>

        {erreur === "lien" && (
          <p className="mb-6 rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500">
            Ce lien de confirmation a expiré ou a déjà été utilisé. Connectez-vous
            ci-dessous, ou créez à nouveau votre compte.
          </p>
        )}

        <AuthForm />
      </div>
    </section>
  );
}
