/**
 * ============================================
 * TÉMOIGNAGES — MODIFIEZ ICI
 * Ajoutez ici les témoignages de vos vrais clients.
 * ============================================
 */

export type Testimonial = {
  name: string;
  role: string;
  quote: string;
  rating: number;
  highlight?: string;
};

export const testimonials: Testimonial[] = [
  {
    name: "Houssem T",
    role: "Client",
    quote:
      "Magnifique site, moderne et soigné. Le travail a été sérieux, tout était clair du début à la fin. Je recommande.",
    rating: 5,
  },
];
