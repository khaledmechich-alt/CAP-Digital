import { Hero } from "@/components/sections/hero";
import { ClientsMarquee } from "@/components/sections/clients-marquee";
import { IntroVideoSection } from "@/components/sections/intro-video-section";
import { ServicesSection } from "@/components/sections/services-section";
import { ProcessSection } from "@/components/sections/process-section";
import { TestimonialsSection } from "@/components/sections/testimonials-section";
import { HomeFaq } from "@/components/sections/home-faq";
import { CtaSection } from "@/components/sections/cta-section";

export default function HomePage() {
  return (
    <>
      <Hero />
      <ClientsMarquee />
      <IntroVideoSection />
      <ServicesSection />
      {/* Le portfolio est vide pour le moment : la section projets est retirée
          de l'accueil plutôt que d'afficher une grille sans rien dedans.
          Son composant est conservé dans components/sections/. */}
      <ProcessSection />
      <TestimonialsSection />
      <HomeFaq />
      <CtaSection />
    </>
  );
}
