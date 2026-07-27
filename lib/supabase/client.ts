import { createBrowserClient } from "@supabase/ssr";

// Client Supabase pour le NAVIGATEUR (composants "use client").
// Sert à la connexion (login) côté page admin.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
