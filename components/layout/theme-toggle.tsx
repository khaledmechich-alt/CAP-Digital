"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label={
        mounted && isDark
          ? "Passer au thème clair"
          : "Passer au thème sombre"
      }
      className="flex h-10 min-w-20 items-center justify-center rounded-full border border-border-subtle bg-card px-4 text-sm font-medium text-muted transition-colors hover:bg-card-hover hover:text-foreground"
      onClick={() => setTheme(isDark ? "light" : "dark")}
    >
      {mounted ? (isDark ? "Clair" : "Sombre") : " "}
    </button>
  );
}
