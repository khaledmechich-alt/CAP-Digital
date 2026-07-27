// Qui a le droit d'entrer dans l'espace administrateur.
//
// La liste est définie dans la variable d'environnement ADMIN_EMAIL
// (une adresse, ou plusieurs séparées par des virgules).
// Par sécurité, si la variable est absente, personne n'est administrateur :
// mieux vaut une porte fermée qu'une porte ouverte à tous.
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;

  const allowed = (process.env.ADMIN_EMAIL ?? "")
    .split(",")
    .map((entry) => entry.trim().toLowerCase())
    .filter(Boolean);

  if (allowed.length === 0) {
    console.error(
      "[admin] ADMIN_EMAIL n'est pas configurée : accès administrateur refusé."
    );
    return false;
  }

  return allowed.includes(email.trim().toLowerCase());
}
