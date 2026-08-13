import Link from "next/link";
import { siteConfig } from "@/lib/site-config";
import { legalLinks, navLinks, secondaryLinks } from "@/lib/navigation";
import { Container } from "@/components/ui/container";
import { Logo } from "@/components/layout/logo";

const serviceLinks = [
  "Sites vitrines",
  "Refonte de site",
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
    <footer className="overflow-hidden border-t border-border-subtle">
      <Container className="pt-16 pb-10">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Marque */}
          <div className="flex flex-col gap-5">
            <Logo />
            <p className="max-w-xs text-sm leading-relaxed text-muted">
              {siteConfig.tagline}. Sites vitrines, refonte et maintenance pour
              PME, artisans et entrepreneurs.
            </p>
            {socials.length > 0 ? (
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {socials.map(({ label, href }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="link-line text-sm text-muted hover:text-foreground"
                  >
                    {label}
                  </a>
                ))}
              </div>
            ) : null}
          </div>

          {/* Navigation */}
          <nav aria-label="Navigation pied de page">
            <h2 className="label-mono mb-6">Navigation</h2>
            <ul className="flex flex-col gap-3">
              {[...navLinks, ...secondaryLinks].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="link-line text-sm text-muted hover:text-foreground"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <h2 className="label-mono mb-6">Services</h2>
            <ul className="flex flex-col gap-3">
              {serviceLinks.map((service) => (
                <li key={service}>
                  <Link
                    href="/services"
                    className="link-line text-sm text-muted hover:text-foreground"
                  >
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h2 className="label-mono mb-6">Contact</h2>
            <ul className="flex flex-col gap-3 text-sm text-muted">
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="link-line hover:text-foreground"
                >
                  {siteConfig.email}
                </a>
              </li>
              <li>
                <a
                  href={`tel:${siteConfig.phone.replace(/\s/g, "")}`}
                  className="link-line hover:text-foreground"
                >
                  {siteConfig.phone}
                </a>
              </li>
              <li>{siteConfig.location}</li>
            </ul>
          </div>
        </div>

        {/* Barre inférieure */}
        <div className="mt-16 flex flex-col justify-between gap-4 border-t border-border-subtle pt-8 md:flex-row md:items-center">
          <p className="label-mono">
            © {new Date().getFullYear()} {siteConfig.name}. Tous droits
            réservés.
          </p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="label-mono link-line hover:text-foreground">
                  {link.label}
                </Link>
              </li>
            ))}
            {/* Accès discret à l'espace privé (réservé à l'administrateur) */}
            <li>
              <Link href="/admin" className="label-mono link-line hover:text-foreground">
                Espace admin
              </Link>
            </li>
          </ul>
        </div>
      </Container>

      {/* Signature typographique en pied de page */}
      <p
        aria-hidden
        className="font-display -mb-[0.18em] w-full px-6 text-center text-[11vw] leading-none tracking-[-0.04em] text-foreground/[0.06] select-none lg:px-8"
      >
        CAP DIGITAL
      </p>
    </footer>
  );
}
