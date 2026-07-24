import type { Metadata } from "next";
import { siteConfig } from "@/lib/site-config";
import { PageHero } from "@/components/sections/page-hero";
import { ContactForm } from "@/components/sections/contact-form";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Contact — Devis gratuit sous 48h",
  description:
    "Contactez KA DIGITAL pour votre projet de site internet : devis gratuit et détaillé sous 48h, réponse garantie sous 24h. Premier échange sans engagement.",
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
        title={
          <>
            Et si on parlait de{" "}
            <span className="text-gradient-accent">votre projet&nbsp;?</span>
          </>
        }
        description="Racontez-nous votre activité et vos objectifs. Vous recevrez une réponse sous 24h et un devis détaillé sous 48h — gratuitement et sans engagement."
      />

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid items-start gap-10 lg:grid-cols-[1fr_360px]">
            <Reveal>
              <ContactForm />
            </Reveal>

            <div className="flex flex-col gap-4">
              {contactCards.map((card, index) => {
                const content = (
                  <div className="flex flex-col gap-1 rounded-2xl border border-border-subtle bg-card p-6 transition-colors hover:bg-card-hover">
                    <p className="text-xs font-medium uppercase tracking-widest text-muted">
                      {card.label}
                    </p>
                    <p className="truncate font-medium">{card.value}</p>
                  </div>
                );
                return (
                  <Reveal key={card.label} delay={index * 0.07}>
                    {card.href ? (
                      <a href={card.href} className="block">
                        {content}
                      </a>
                    ) : (
                      content
                    )}
                  </Reveal>
                );
              })}

              <Reveal delay={0.3}>
                <div className="rounded-2xl border border-border-subtle bg-card p-6">
                  <p className="mb-4 text-xs font-medium uppercase tracking-widest text-muted">
                    Comment ça se passe ensuite ?
                  </p>
                  <ol className="flex flex-col gap-3 text-sm leading-relaxed">
                    <li className="flex gap-3">
                      <span className="font-display font-bold text-accent">
                        1.
                      </span>
                      Nous vous répondons sous 24h pour convenir d&apos;un
                      échange téléphonique.
                    </li>
                    <li className="flex gap-3">
                      <span className="font-display font-bold text-accent">
                        2.
                      </span>
                      Vous recevez un devis clair et détaillé sous 48h.
                    </li>
                    <li className="flex gap-3">
                      <span className="font-display font-bold text-accent">
                        3.
                      </span>
                      Vous validez, et votre projet démarre.
                    </li>
                  </ol>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
