import type { Metadata } from "next";
import { EspaceIndisponible } from "@/components/layout/espace-indisponible";

// Catch-all : couvre /espace-client et /espace-client/connexion.
export const metadata: Metadata = {
  title: "Espace temporairement indisponible",
  robots: { index: false, follow: false, nocache: true },
};

export default function EspaceClientIndisponible() {
  return <EspaceIndisponible />;
}
