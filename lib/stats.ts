/**
 * ============================================
 * STATISTIQUES — MODIFIEZ ICI
 * Chiffres clés affichés sur la page d'accueil.
 * ============================================
 */

export type Stat = {
  value: number;
  suffix: string;
  label: string;
};

export const stats: Stat[] = [
  { value: 40, suffix: "+", label: "Projets livrés" },
  { value: 98, suffix: "%", label: "Clients satisfaits" },
  { value: 5, suffix: "", label: "Années d'expérience" },
  { value: 24, suffix: "h", label: "Délai de réponse maximum" },
];
