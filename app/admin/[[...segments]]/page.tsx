import type { Metadata } from "next";
import { EspaceIndisponible } from "@/components/layout/espace-indisponible";

// Catch-all : couvre /admin et toutes ses sous-adresses (/admin/login,
// /admin/projets…), pour qu'aucune ne renvoie d'erreur serveur.
export const metadata: Metadata = {
  title: "Espace temporairement indisponible",
  robots: { index: false, follow: false, nocache: true },
};

export default function AdminIndisponible() {
  return <EspaceIndisponible />;
}
