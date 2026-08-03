import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/sections/contact-form";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Contact — Devis gratuit sous 48h",
  description:
    "Contactez CAP DIGITAL pour votre projet de site internet : devis gratuit et détaillé sous 48h, réponse garantie sous 24h. Premier échange sans engagement.",
};

const contactCards = [
  {
    label: "Par e-mail",
    value: siteConfig.email,
    href: `mailto:${siteConfig.email}`,
  },
  {
    label: "Par téléphone",
    value: siteConfig.phone,
    href: `tel:${siteConfig.phone.replace(/\s/g, "")}`,
  },
  {
    label: "Zone d'intervention",
    value: `${siteConfig.location} — à distance ou sur place`,
    href: null,
  },
  {
    label: "Délai de réponse",
    value: "Sous 24h, garanti",
    href: null,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Et si on parlait de votre projet ?"
        em="votre projet ?"
        description="Racontez-nous votre activité et vos objectifs. Vous recevrez une réponse sous 24h et un devis détaillé sous 48h — gratuitement et sans engagement."
      />

      <section className="pt-8 pb-24 md:pb-32">
        <Container>
          <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-16">
            <Reveal variant="up" className="lg:col-span-7">
              <ContactForm />
            </Reveal>

            <div className="flex flex-col gap-12 lg:col-span-4 lg:col-start-9">
              <dl className="flex flex-col divide-y divide-border-subtle border-y border-border-subtle">
                {contactCards.map((card, index) => (
                  <Reveal key={card.label} variant="up" delay={index * 0.07}>
                    <div className="flex flex-col gap-1 py-4">
                      <dt className="label-mono">{card.label}</dt>
                      <dd className="font-display text-base md:text-lg">
                        {card.href ? (
                          <a href={card.href} className="link-line">
                            {card.value}
                          </a>
                        ) : (
                          card.value
                        )}
                      </dd>
                    </div>
                  </Reveal>
                ))}
              </dl>

              <Reveal variant="up" delay={0.3}>
                <p className="label-mono mb-5">Comment ça se passe ensuite ?</p>
                <ol className="flex flex-col gap-5">
                  {[
                    "Nous vous répondons sous 24h pour convenir d'un échange téléphonique.",
                    "Vous recevez un devis clair et détaillé sous 48h.",
                    "Vous validez, et votre projet démarre.",
                  ].map((step, index) => (
                    <li key={step} className="flex gap-4 text-sm leading-relaxed">
                      <span className="label-mono shrink-0 text-accent">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
