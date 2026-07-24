import { cn } from "@/lib/utils";

export function Badge({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-border-subtle bg-card px-4 py-1.5 text-xs font-medium uppercase tracking-widest text-muted",
        className
      )}
    >
      <span className="size-1.5 rounded-full bg-accent" aria-hidden />
      {children}
    </span>
  );
}
