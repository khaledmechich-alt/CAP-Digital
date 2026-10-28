import { createHash } from "node:crypto";
import { headers } from "next/headers";

/**
 * Garde-fou anti-robot, partagé par les formulaires du site.
 *
 * Le comptage vit dans la mémoire du serveur : c'est suffisant pour freiner
 * un robot, mais ce n'est pas infaillible (chaque instance a sa propre
 * mémoire). Pour un site à fort trafic, il faudrait un compteur partagé.
 *
 * L'adresse IP n'est jamais conservée : on n'en garde qu'une empreinte
 * non réversible, qui permet de compter sans identifier personne.
 */

const buckets = new Map<string, number[]>();

async function fingerprint(scope: string): Promise<string> {
  const headerList = await headers();
  const forwarded =
    headerList.get("x-forwarded-for") ?? headerList.get("x-real-ip") ?? "";
  const ip = forwarded.split(",")[0]?.trim() || "origine-inconnue";
  const empreinte = createHash("sha256").update(ip).digest("hex").slice(0, 32);
  return `${scope}:${empreinte}`;
}

/**
 * Renvoie true si cette origine a déjà envoyé `max` demandes pendant la
 * fenêtre de temps. L'appel compte la demande en cours quand elle passe.
 */
export async function tooManyRequests(options: {
  scope: string;
  max: number;
  windowMs: number;
}): Promise<boolean> {
  const { scope, max, windowMs } = options;
  const key = await fingerprint(scope);
  const now = Date.now();

  // Purge au passage, pour que la table ne grossisse pas indéfiniment.
  for (const [entry, times] of buckets) {
    const fresh = times.filter((time) => now - time < windowMs);
    if (fresh.length) buckets.set(entry, fresh);
    else buckets.delete(entry);
  }

  const times = buckets.get(key) ?? [];
  if (times.length >= max) return true;

  buckets.set(key, [...times, now]);
  return false;
}
