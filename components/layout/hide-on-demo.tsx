"use client";

import { usePathname } from "next/navigation";

/**
 * Masque l'en-tête et le pied de page de l'agence sur les pages de
 * démonstration : un garage fictif ne doit pas afficher la navigation de
 * CAP DIGITAL, sinon la démo n'est plus crédible.
 */
export function HideOnDemo({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  if (pathname?.startsWith("/demo")) return null;

  return <>{children}</>;
}
