/**
 * Injecte des données structurées schema.org dans la page
 * (utilisées par Google pour les résultats enrichis).
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
