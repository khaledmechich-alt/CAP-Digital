"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { cn } from "@/lib/utils";

// Étoiles du ciel de nuit : position en %, taille en px, opacité.
const STARS = [
  { left: 34, top: 26, size: 2, opacity: 0.9 },
  { left: 45, top: 62, size: 1.5, opacity: 0.7 },
  { left: 56, top: 22, size: 1.5, opacity: 0.8 },
  { left: 63, top: 52, size: 2, opacity: 0.95 },
  { left: 74, top: 30, size: 1.5, opacity: 0.7 },
  { left: 83, top: 62, size: 2, opacity: 0.85 },
  { left: 90, top: 38, size: 1.5, opacity: 0.6 },
];

// Nuages du ciel de jour : ellipses blanches en bas à gauche.
const CLOUDS = [
  { left: 4, top: 58, w: 30, h: 16 },
  { left: 20, top: 46, w: 24, h: 14 },
  { left: 30, top: 62, w: 28, h: 15 },
  { left: 48, top: 54, w: 20, h: 12 },
];

/**
 * Bascule jour / nuit : le ciel change de couleur et la pastille passe
 * de la lune (à gauche) au soleil (à droite). Tout est en CSS, donc
 * l'animation tourne partout, même là où le JS est ralenti.
 */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Avant l'hydratation on suppose le thème sombre, qui est celui par
  // défaut du site : évite que la pastille saute au chargement.
  const isDark = mounted ? resolvedTheme === "dark" : true;

  return (
    <button
      type="button"
      role="switch"
      aria-checked={!isDark}
      aria-label={isDark ? "Passer au thème clair" : "Passer au thème sombre"}
      title={isDark ? "Passer au thème clair" : "Passer au thème sombre"}
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative h-10 w-[76px] shrink-0 overflow-hidden rounded-full border border-border-subtle transition-shadow duration-300 hover:shadow-[0_4px_20px_var(--glow)]"
    >
      {/* Ciel de nuit */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 bg-[linear-gradient(120deg,#2a1a5e_0%,#43277f_45%,#7b3fa6_100%)] transition-opacity duration-700",
          isDark ? "opacity-100" : "opacity-0"
        )}
      />
      {/* Ciel de jour */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 bg-[linear-gradient(180deg,#a5dcf0_0%,#d8f1fa_100%)] transition-opacity duration-700",
          isDark ? "opacity-0" : "opacity-100"
        )}
      />

      {/* Étoiles */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 transition-opacity duration-700",
          isDark ? "opacity-100 delay-150" : "opacity-0"
        )}
      >
        {STARS.map((star, index) => (
          <span
            key={index}
            className="absolute rounded-full bg-white"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
            }}
          />
        ))}
      </span>

      {/* Nuages */}
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 transition-opacity duration-700",
          isDark ? "opacity-0" : "opacity-100 delay-150"
        )}
      >
        {CLOUDS.map((cloud, index) => (
          <span
            key={index}
            className="absolute rounded-full bg-white/85"
            style={{
              left: `${cloud.left}%`,
              top: `${cloud.top}%`,
              width: cloud.w,
              height: cloud.h,
            }}
          />
        ))}
      </span>

      {/* Pastille : lune à gauche, soleil à droite */}
      <span
        aria-hidden
        className={cn(
          "absolute top-1 left-1 size-8 rounded-full transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]",
          isDark
            ? "translate-x-0 bg-[radial-gradient(circle_at_35%_30%,#ffffff,#d7d7dd_70%,#b9b9c2)] shadow-[0_0_12px_rgba(255,255,255,0.45)]"
            : "translate-x-10 bg-[radial-gradient(circle_at_35%_30%,#ffe680,#ffd23f_60%,#f7b500)] shadow-[0_0_14px_rgba(255,196,0,0.55)]"
        )}
      />
    </button>
  );
}
