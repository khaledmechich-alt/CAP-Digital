import { NextResponse, type NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// Point d'arrivée des liens envoyés par e-mail (confirmation d'inscription,
// mot de passe oublié…).
//
// Supabase renvoie ici avec un paramètre « code » : c'est un jeton à usage
// unique. Sans cette route, le code reste affiché dans l'URL sans être utilisé
// et la personne retombe sur l'accueil sans être connectée.
export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  // Où envoyer la personne une fois connectée. On n'accepte qu'un chemin
  // interne : un lien trafiqué ne doit pas pouvoir rediriger ailleurs.
  const demande = searchParams.get("next") ?? "/espace-client";
  const suite = demande.startsWith("/") ? demande : "/espace-client";

  // En production, Vercel place un proxy devant le site : c'est cet en-tête
  // qui porte le vrai domaine.
  const hoteTransfere = request.headers.get("x-forwarded-host");
  const base =
    process.env.NODE_ENV === "development" || !hoteTransfere
      ? origin
      : `https://${hoteTransfere}`;

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(`${base}${suite}`);
    }

    console.error("[auth/callback] Échange du code impossible :", error.message);
  }

  // Lien expiré, déjà utilisé, ou incomplet : on repasse par la connexion.
  return NextResponse.redirect(
    `${base}/espace-client/connexion?erreur=lien`
  );
}
