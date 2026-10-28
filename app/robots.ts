import type { MetadataRoute } from "next";
import { siteConfig } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      // Pas d'interdiction sur /demo/ : ces pages portent une balise noindex,
      // et un robot doit pouvoir la lire pour en tenir compte. Les bloquer ici
      // aurait l'effet inverse de celui recherché.
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  };
}
