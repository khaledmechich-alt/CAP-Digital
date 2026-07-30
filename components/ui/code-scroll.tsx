/**
 * Fond animé « code qui défile » du hero.
 * Animation 100 % CSS (voir .anim-code-scroll dans globals.css) :
 * fluide partout, y compris là où les vidéos sont gelées par le navigateur.
 */

type Segment = [text: string, color?: keyof typeof COLORS];

const COLORS = {
  kw: "text-sky-700 dark:text-sky-400",
  str: "text-emerald-700 dark:text-emerald-400",
  fn: "text-violet-700 dark:text-violet-400",
  com: "text-slate-500 dark:text-slate-500",
  num: "text-amber-700 dark:text-amber-300",
  txt: "text-slate-700 dark:text-slate-300",
} as const;

const LINES: Segment[][] = [
  [["// Déploiement — cap-digital.fr", "com"]],
  [["import", "kw"], [" { createSite } ", "txt"], ["from", "kw"], [" \"@cap-digital/core\"", "str"], [";", "txt"]],
  [["import", "kw"], [" { seo, performance } ", "txt"], ["from", "kw"], [" \"@cap-digital/web\"", "str"], [";", "txt"]],
  [[""]],
  [["const", "kw"], [" site ", "txt"], ["=", "kw"], [" ", "txt"], ["createSite", "fn"], ["({", "txt"]],
  [["  client: ", "txt"], ["\"votre-entreprise\"", "str"], [",", "txt"]],
  [["  objectif: ", "txt"], ["\"transformer les visiteurs en clients\"", "str"], [",", "txt"]],
  [["  design: ", "txt"], ["\"sur-mesure\"", "str"], [",", "txt"]],
  [["  responsive: ", "txt"], ["true", "num"], [",", "txt"]],
  [["  chargement: ", "txt"], ["\"0.8s\"", "str"], [",", "txt"]],
  [["});", "txt"]],
  [[""]],
  [["await", "kw"], [" seo.", "txt"], ["optimiser", "fn"], ["(site, {", "txt"]],
  [["  google: ", "txt"], ["\"première page\"", "str"], [",", "txt"]],
  [["  local: ", "txt"], ["true", "num"], [",", "txt"]],
  [["  vitesse: ", "txt"], ["98", "num"], [",", "txt"], [" // score /100", "com"]],
  [["});", "txt"]],
  [[""]],
  [["export", "kw"], [" ", "txt"], ["async", "kw"], [" ", "txt"], ["function", "kw"], [" ", "txt"], ["deployer", "fn"], ["() {", "txt"]],
  [["  const", "kw"], [" pages ", "txt"], ["=", "kw"], [" ", "txt"], ["await", "kw"], [" site.", "txt"], ["build", "fn"], ["();", "txt"]],
  [["  console.", "txt"], ["log", "fn"], ["(", "txt"], ["`${", "txt"], ["pages.length", "num"], ["} pages générées`", "str"], [");", "txt"]],
  [["  return", "kw"], [" site.", "txt"], ["publier", "fn"], ["({ ssl: ", "txt"], ["true", "num"], [" });", "txt"]],
  [["}", "txt"]],
  [[""]],
  [["// Mise en ligne réussie ✓", "com"]],
  [["// 40+ projets livrés — 98% de clients satisfaits", "com"]],
  [["deployer", "fn"], ["();", "txt"]],
  [[""]],
];

function CodeBlock() {
  return (
    <pre className="px-6 font-mono text-sm leading-8 whitespace-pre md:px-16 md:text-base">
      {LINES.map((line, i) => (
        <div key={i}>
          {line.map(([text, color], j) => (
            <span key={j} className={COLORS[color ?? "txt"]}>
              {text}
            </span>
          ))}
        </div>
      ))}
    </pre>
  );
}

export function CodeScroll() {
  return (
    <div className="anim-code-scroll">
      <CodeBlock />
      <CodeBlock />
    </div>
  );
}
