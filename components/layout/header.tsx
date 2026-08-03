"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { navLinks } from "@/lib/navigation";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/layout/logo";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Button } from "@/components/ui/button";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Ferme le menu mobile à chaque changement de page
  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  // Bloque le défilement de la page quand le menu mobile est ouvert
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled || menuOpen
          ? "border-b border-border-subtle bg-background/80 backdrop-blur-xl"
          : "border-b border-transparent"
      )}
    >
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-6 lg:px-8">
        <Logo />

        {/* Navigation bureau */}
        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  className={cn(
                    "link-line py-2 text-sm transition-colors",
                    isActive(link.href)
                      ? "text-foreground [background-size:100%_1px]"
                      : "text-muted hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <ThemeToggle />
          <span className="hidden lg:block">
            <Button href="/espace-client" size="md" variant="secondary">
              Espace client
            </Button>
          </span>
          <span className="hidden lg:block">
            <Button href="/contact" size="md">
              Devis gratuit
            </Button>
          </span>
          <button
            type="button"
            className="flex h-10 items-center rounded-full border border-border-strong px-4 text-sm font-medium lg:hidden"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Fermer" : "Menu"}
          </button>
        </div>
      </div>

      {/* Menu mobile plein écran */}
      <AnimatePresence>
        {menuOpen ? (
          <motion.nav
            aria-label="Navigation mobile"
            className="fixed inset-x-0 top-18 z-40 flex h-[calc(100dvh-4.5rem)] flex-col justify-between overflow-y-auto bg-background px-6 pb-10 pt-6 lg:hidden"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="flex flex-col">
              {navLinks.map((link, index) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.05 * index, duration: 0.3 }}
                >
                  <Link
                    href={link.href}
                    aria-current={isActive(link.href) ? "page" : undefined}
                    className={cn(
                      "block border-b border-border-subtle py-4 font-display text-2xl tracking-[-0.02em]",
                      isActive(link.href) ? "em-serif text-accent" : "text-foreground"
                    )}
                  >
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
            <div className="flex flex-col gap-3">
              <Button
                href="/espace-client"
                size="lg"
                variant="secondary"
                className="w-full"
              >
                Espace client
              </Button>
              <Button href="/contact" size="lg" className="w-full">
                Demander un devis gratuit
              </Button>
            </div>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
