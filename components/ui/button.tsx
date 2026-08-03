import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-strong hover:-translate-y-0.5 hover:shadow-[0_8px_32px_var(--glow)]",
  secondary:
    "border border-border-subtle bg-card text-foreground hover:bg-card-hover hover:-translate-y-0.5 hover:border-accent/40",
  ghost: "text-muted hover:text-foreground",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "px-6 py-3 text-sm",
  lg: "px-8 py-4 text-base",
};

type ButtonProps = {
  variant?: ButtonVariant;
  size?: ButtonSize;
  href?: string;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  type?: "button" | "submit";
  ariaLabel?: string;
  disabled?: boolean;
};

export function Button({
  variant = "primary",
  size = "md",
  href,
  className,
  children,
  onClick,
  type = "button",
  ariaLabel,
  disabled,
}: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-60",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes} aria-label={ariaLabel}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}

/**
 * Lien de fin de section, avec une flèche qui part vers la droite
 * et un soulignement qui se dessine au survol.
 */
export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-baseline gap-2 font-display text-base text-accent md:text-lg",
        className
      )}
    >
      <span className="link-line">{children}</span>
      <span
        className="font-sans transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5"
        aria-hidden
      >
        →
      </span>
    </Link>
  );
}
