import { cn } from "@/lib/utils";

/**
 * Bandeau défilant en continu (logos clients, mots-clés…).
 * Le contenu est dupliqué pour un défilement sans coupure,
 * et se met en pause au survol.
 */
export function Marquee({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]",
        className
      )}
    >
      <div className="flex w-max shrink-0 animate-marquee items-center gap-16 pr-16 group-hover:[animation-play-state:paused] motion-reduce:animate-none">
        {children}
        <span aria-hidden className="contents">
          {children}
        </span>
      </div>
    </div>
  );
}
