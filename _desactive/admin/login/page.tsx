import { LoginForm } from "./login-form";

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ erreur?: string }>;
}) {
  const { erreur } = await searchParams;

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-20">
      <div className="w-full max-w-sm">
        <h1 className="text-center font-display text-2xl font-semibold">
          Espace administrateur
        </h1>
        <p className="mb-8 mt-2 text-center text-sm text-muted">
          Connectez-vous pour consulter vos demandes de contact.
        </p>

        <LoginForm accessDenied={erreur === "acces"} />
      </div>
    </section>
  );
}
