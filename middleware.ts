import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { isAdminEmail } from "@/lib/admin";

// Gardien de la zone /admin :
//  - rafraîchit la session à chaque visite,
//  - renvoie vers /admin/login si on n'est pas connecté,
//  - refuse les comptes connectés qui ne sont pas administrateurs,
//  - renvoie vers /admin si l'administrateur ouvre la page de login.
export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isAdmin = isAdminEmail(user?.email);

  const redirection = (chemin: string, erreur?: string) => {
    const url = request.nextUrl.clone();
    url.pathname = chemin;
    url.search = "";
    if (erreur) url.searchParams.set("erreur", erreur);
    return NextResponse.redirect(url);
  };

  // --- Zone administrateur : réservée à l'adresse déclarée dans ADMIN_EMAIL ---
  if (pathname.startsWith("/admin")) {
    const isLoginPage = pathname === "/admin/login";

    if (!user && !isLoginPage) return redirection("/admin/login");

    // Connecté, mais avec un compte qui n'est pas administrateur.
    if (user && !isAdmin && !isLoginPage) {
      return redirection("/admin/login", "acces");
    }

    if (isAdmin && isLoginPage) return redirection("/admin");

    return supabaseResponse;
  }

  // --- Espace client : ouvert à tout compte connecté ---
  // Chacun ne voit que les projets rattachés à son adresse (règles Supabase).
  const isConnexionPage = pathname === "/espace-client/connexion";

  if (!user && !isConnexionPage) return redirection("/espace-client/connexion");
  if (user && isConnexionPage) return redirection("/espace-client");

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/admin",
    "/admin/:path*",
    "/espace-client",
    "/espace-client/:path*",
  ],
};
