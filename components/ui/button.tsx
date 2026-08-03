import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  // Encre pleine : c'est la couleur du texte du site, pas le bleu.
  // Le bleu de la marque reste réservé aux petits signaux.
  primary:
    "bg-foreground text-background hover:bg-accent hover:text-white dark:hover:text-[#0d0c0b]",
  secondary:
    "border border-border-strong text-foreground hover:border-foreground hover:bg-foreground hover:text-background",
  ghost: "text-muted hover:text-foreground",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3.5 text-base",
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
    "group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors duration-300 disabled:cursor-not-allowed disabled:opacity-60",
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
        "group inline-flex items-baseline gap-2 font-display text-lg text-foreground md:text-xl",
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
