import Link from "next/link";

export function Logo() {
  return (
    <Link
      href="/"
      className="flex items-center gap-2.5"
      aria-label="CAP DIGITAL — Accueil"
    >
      <span className="grid size-9 place-items-center rounded-xl bg-accent font-display text-xs font-bold tracking-tight text-white shadow-[0_0_20px_var(--glow)]">
        CAP
      </span>
      <span className="font-display text-lg font-bold tracking-tight">
        DIGITAL
      </span>
    </Link>
  );
}
