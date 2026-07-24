import Link from "next/link";
import { cn } from "@/lib/utils";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-accent text-white hover:bg-accent-strong hover:-translate-y-0.5 hover:shadow-[0_8px_32px_var(--glow)]",
  secondary:
    "border border-border-subtle bg-card text-foreground hover:bg-card-hover hover:-translate-y-0.5",
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
}: ButtonProps) {
  const classes = cn(
    "group inline-flex items-center justify-center gap-2 rounded-full font-medium transition-all duration-300",
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
      className={classes}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
