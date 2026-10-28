import type { Metadata } from "next";
import { EspaceIndisponible } from "@/components/layout/espace-indisponible";

/**
 * Remplace l'ancien gestionnaire de route qui échangeait le code de
 * connexion Supabase contre une session. Les liens de connexion déjà
 * envoyés par e-mail arrivent donc sur une explication, pas sur une erreur.
 */
export const metadata: Metadata = {
  title: "Espace temporairement indisponible",
  robots: { index: false, follow: false, nocache: true },
};

export default function CallbackIndisponible() {
  return <EspaceIndisponible />;
}
