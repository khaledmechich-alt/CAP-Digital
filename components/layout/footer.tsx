import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import { legalLinks, navLinks, secondaryLinks } from "@/lib/navigation";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";

const serviceLinks = [
  "Sites vitrines",
  "Boutiques e-commerce",
  "Refonte de site",
  "Optimisation SEO",
  "Maintenance",
  "Accompagnement digital",
];

export function Footer() {
  const socials = [
    { label: "Instagram", href: siteConfig.socials.instagram },
    { label: "LinkedIn", href: siteConfig.socials.linkedin },
    { label: "Facebook", href: siteConfig.socials.facebook },
  ].filter((social) => social.href !== "");

  return (
    <footer className="border-t border-border-subtle bg-card">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Marque */}
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              {siteConfig.tagline}. Sites vitrines, e-commerce et SEO pour PME,
              artisans et entrepreneurs.
            </p>
            {socials.length > 0 ? (
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {socials.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm font-medium text-muted underline-offset-4 transition-colors hover:text-accent hover:underline"
                  >
                    {label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {/* Navigation */}
          <nav aria-label="Navigation pied de page">
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-muted">
              Navigation
            </h2>
            <ul className="flex flex-col gap-3">
              {[...navLinks, ...secondaryLinks].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-muted">
              Services
            </h2>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="text-sm text-muted transition-colors hover:text-foreground"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="mb-5 text-sm font-semibold uppercase tracking-widest text-muted">
              Contact
            </h2>
            <ul className="flex flex-col gap-4 text-sm text-muted">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Mail
                    className="h-4 w-4 shrink-0 text-foreground dark:text-accent"
                    aria-hidden="true"
                  />
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="flex items-center gap-2 transition-colors hover:text-foreground"
                >
                  <Phone
                    className="h-4 w-4 shrink-0 text-foreground dark:text-accent"
                    aria-hidden="true"
                  />
                  {siteConfig.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin
                  className="h-4 w-4 shrink-0 text-foreground dark:text-accent"
                  aria-hidden="true"
                />
                {siteConfig.location}
              </li>
            </ul>
          </div>
        </div>

        {/* Barre inférieure */}
        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-8 text-xs text-muted md:flex-row">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Tous droits
            réservés.
          </p>
          <ul className="flex gap-6">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
