import Image from "next/image";
import Link from "next/link";

// Deux fichiers pour un seul logo : le bleu nuit du mot « Cap » disparaîtrait
// sur le thème sombre, on lui substitue donc la version blanche.
const DIMENSIONS = { width: 900, height: 264 };

export function Logo() {
  return (
    <Link href="/" className="flex items-center" aria-label="CAP DIGITAL — Accueil">
      <Image
        src="/logo/cap-digital-complet.png"
        alt="CAP DIGITAL"
        {...DIMENSIONS}
        priority
        className="h-8 w-auto dark:hidden"
      />
      <Image
        src="/logo/cap-digital-complet-blanc.png"
        alt=""
        aria-hidden="true"
        {...DIMENSIONS}
        priority
        className="hidden h-8 w-auto dark:block"
      />
    </Link>
  );
}
