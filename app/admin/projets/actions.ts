"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { isAdminEmail } from "@/lib/admin";
import { etapeValide } from "@/lib/projets";

// Un champ vide dans un formulaire vaut "rien" en base, pas "chaîne vide".
function texte(donnees: FormData, champ: string): string | null {
  const valeur = donnees.get(champ);
  if (typeof valeur !== "string") return null;
  const propre = valeur.trim();
  return propre === "" ? null : propre;
}

// Vérifie que c'est bien l'administrateur qui agit, et renvoie sa connexion.
async function clientAdmin() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !isAdminEmail(user.email)) {
    redirect("/admin/login?erreur=acces");
  }

  return supabase;
}

function champsDepuisFormulaire(donnees: FormData) {
  return {
    titre: texte(donnees, "titre") ?? "Projet sans titre",
    client_name: texte(donnees, "client_name"),
    client_email: (texte(donnees, "client_email") ?? "").toLowerCase(),
    etape: etapeValide(Number(donnees.get("etape"))),
    date_prevue: texte(donnees, "date_prevue"),
    note: texte(donnees, "note"),
    site_url: texte(donnees, "site_url"),
    nom_domaine: texte(donnees, "nom_domaine"),
    renouvellement_domaine: texte(donnees, "renouvellement_domaine"),
    url_backoffice: texte(donnees, "url_backoffice"),
    maintenance: texte(donnees, "maintenance"),
  };
}

export async function creerProjet(donnees: FormData) {
  const supabase = await clientAdmin();
  const champs = champsDepuisFormulaire(donnees);

  if (!champs.client_email) {
    redirect("/admin/projets?erreur=email");
  }

  const { error } = await supabase.from("projets").insert(champs);

  if (error) {
    console.error("[admin/projets] Création impossible :", error.message);
    redirect("/admin/projets?erreur=creation");
  }

  revalidatePath("/admin/projets");
  redirect("/admin/projets?ok=creation");
}

export async function mettreAJourProjet(donnees: FormData) {
  const supabase = await clientAdmin();
  const id = texte(donnees, "id");

  if (!id) {
    redirect("/admin/projets?erreur=introuvable");
  }

  const champs = champsDepuisFormulaire(donnees);

  if (!champs.client_email) {
    redirect(`/admin/projets/${id}?erreur=email`);
  }

  const { error } = await supabase.from("projets").update(champs).eq("id", id);

  if (error) {
    console.error("[admin/projets] Mise à jour impossible :", error.message);
    redirect(`/admin/projets/${id}?erreur=maj`);
  }

  revalidatePath("/admin/projets");
  revalidatePath(`/admin/projets/${id}`);
  redirect("/admin/projets?ok=maj");
}

export async function supprimerProjet(donnees: FormData) {
  const supabase = await clientAdmin();
  const id = texte(donnees, "id");

  if (!id) {
    redirect("/admin/projets?erreur=introuvable");
  }

  const { error } = await supabase.from("projets").delete().eq("id", id);

  if (error) {
    console.error("[admin/projets] Suppression impossible :", error.message);
    redirect(`/admin/projets/${id}?erreur=suppression`);
  }

  revalidatePath("/admin/projets");
  redirect("/admin/projets?ok=suppression");
}
