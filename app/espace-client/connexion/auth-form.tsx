"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const inputClasses =
  "w-full rounded-xl border border-border-subtle bg-background px-4 py-3 text-sm placeholder:text-muted/60 transition-colors focus:border-accent focus:outline-none";

type Mode = "connexion" | "inscription";

export function AuthForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("connexion");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function changerMode(nouveau: Mode) {
    setMode(nouveau);
    setError(null);
    setInfo(null);
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (loading) return;

    setLoading(true);
    setError(null);
    setInfo(null);

    const supabase = createClient();
    const identifiants = { email: email.trim(), password };

    if (mode === "connexion") {
      const { error: signInError } = await supabase.auth.signInWithPassword(
        identifiants
      );

      if (signInError) {
        setError("E-mail ou mot de passe incorrect.");
        setLoading(false);
        return;
      }

      router.push("/espace-client");
      router.refresh();
      return;
    }

    const { data, error: signUpError } = await supabase.auth.signUp(
      identifiants
    );

    if (signUpError) {
      setError(
        signUpError.message.toLowerCase().includes("password")
          ? "Le mot de passe doit contenir au moins 6 caractères."
          : "Impossible de créer le compte. Cette adresse est peut-être déjà utilisée."
      );
      setLoading(false);
      return;
    }

    // Si la confirmation par e-mail est active, il n'y a pas encore de session :
    // le compte n'existera vraiment qu'une fois le lien de l'e-mail cliqué.
    if (!data.session) {
      setInfo(
        "Compte créé ! Vérifiez votre boîte mail et cliquez sur le lien de confirmation, puis revenez vous connecter."
      );
      setLoading(false);
      return;
    }

    router.push("/espace-client");
    router.refresh();
  }

  return (
    <div className="rounded-2xl border border-border-subtle bg-card p-8">
      {/* Bascule connexion / inscription */}
      <div className="mb-6 flex gap-1 rounded-full border border-border-subtle bg-background p-1">
        {(["connexion", "inscription"] as const).map((valeur) => (
          <button
            key={valeur}
            type="button"
            onClick={() => changerMode(valeur)}
            className={cn(
              "flex-1 rounded-full px-4 py-2 text-sm font-medium transition-colors",
              mode === valeur
                ? "bg-accent text-white"
                : "text-muted hover:text-foreground"
            )}
          >
            {valeur === "connexion" ? "Se connecter" : "Créer un compte"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
            minLength={6}
            autoComplete={
              mode === "connexion" ? "current-password" : "new-password"
            }
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="••••••••"
            className={inputClasses}
          />
          {mode === "inscription" && (
            <p className="text-xs text-muted">
              6 caractères minimum. Utilisez l&apos;adresse e-mail que vous
              m&apos;avez communiquée pour votre projet.
            </p>
          )}
        </div>

        {error && (
          <p className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-500">
            {error}
          </p>
        )}

        {info && (
          <p className="rounded-xl border border-accent/40 bg-accent/10 px-4 py-3 text-sm">
            {info}
          </p>
        )}

        <Button type="submit" size="lg" className="w-full" disabled={loading}>
          {loading
            ? "Un instant…"
            : mode === "connexion"
              ? "Se connecter"
              : "Créer mon compte"}
        </Button>
      </form>
    </div>
  );
}
