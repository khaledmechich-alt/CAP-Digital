import { cn } from "@/lib/utils";

/**
 * Étiquette de section : petit filet + libellé monospace.
 * (Remplace l'ancienne pastille arrondie.)
 */
export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span className="h-px w-8 shrink-0 bg-accent" aria-hidden />
      <span className="label-mono">{children}</span>
    </span>
  );
}
