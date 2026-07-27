"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

const inputClasses =
  "w-full rounded-xl border border-border-subtle bg-background px-4 py-3 text-sm placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none";

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError("E-mail ou mot de passe incorrect.");
      setLoading(false);
      return;
    }

    router.push("/admin");
    router.refresh();
  }

  return (
    <section className="flex min-h-[70vh] items-center justify-center px-4 py-20">
      <div className="w-full max-w-sm">
        <h1 className="text-center font-display text-2xl font-semibold">
          Espace administrateur
        </h1>
        <p className="mb-8 mt-2 text-center text-sm text-muted">
          Connectez-vous pour consulter vos demandes de contact.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-2xl border border-border-subtle bg-card p-8"
        >
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-sm font-medium">
              E-mail
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="vous@exemple.fr"
              className={inputClasses}
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="password" className="text-sm font-medium">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              required
              autoComplete="current-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="••••••••"
              className={inputClasses}
            />
          </div>

          {error && (
            <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" className="w-full" disabled={loading}>
            {loading ? "Connexion…" : "Se connecter"}
          </Button>
        </form>
      </div>
    </section>
  );
}
