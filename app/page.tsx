import { Hero } from "@/components/sections/hero";
import { ClientsMarquee } from "@/components/sections/clients-marquee";
import { IntroVideoSection } from "@/components/sections/intro-video-section";
import { ServicesSection } from "@/components/sections/services-section";
import { FeaturedProjects } from "@/components/sections/featured-projects";
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
      <FeaturedProjects />
      <ProcessSection />
      <TestimonialsSection />
      <HomeFaq />
      <CtaSection />
    </>
  );
}
