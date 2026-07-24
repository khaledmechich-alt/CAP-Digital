import type { Metadata } from "next";
import Link from "next/link";
import { blogPosts, formatBlogDate } from "@/lib/blog-posts";
import { PageHero } from "@/components/sections/page-hero";
import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";

export const metadata: Metadata = {
  title: "Blog — Conseils web pour entrepreneurs",
  description:
    "Prix d'un site, refonte, SEO local, visibilité Google : des conseils concrets et sans jargon pour les PME, artisans et entrepreneurs.",
};

export default function BlogPage() {
  return (
    <>
      <PageHero
        eyebrow="Blog"
        title={
          <>
            Des conseils concrets,{" "}
            <span className="text-gradient-accent">zéro jargon</span>
          </>
        }
        description="Tout ce qu'un entrepreneur doit savoir sur le web : combien ça coûte, comment être visible sur Google, quand refondre son site — expliqué simplement."
      />

      <section className="pb-24 md:pb-32">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {blogPosts.map((post, index) => (
              <Reveal key={post.slug} delay={(index % 2) * 0.1}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group flex h-full flex-col gap-5 rounded-2xl border border-border-subtle bg-card p-8 transition-all duration-300 hover:-translate-y-1 hover:border-accent/40 hover:bg-card-hover hover:shadow-[0_12px_48px_var(--glow)]"
                >
                  <div className="flex flex-wrap items-center gap-3 text-xs">
                    <span className="rounded-full bg-accent-soft px-3 py-1 font-medium text-accent">
                      {post.category}
                    </span>
                    <time dateTime={post.date} className="text-muted">
                      {formatBlogDate(post.date)}
                    </time>
                    <span className="text-muted">
                      {post.readingTime} de lecture
                    </span>
                  </div>
                  <h2 className="font-display text-2xl font-semibold tracking-tight text-balance transition-colors group-hover:text-accent">
                    {post.title}
                  </h2>
                  <p className="flex-1 text-sm leading-relaxed text-muted">
                    {post.excerpt}
                  </p>
                  <span className="flex items-center gap-1.5 text-sm font-medium text-accent">
                    Lire l&apos;article
                    <span
                      className="transition-transform group-hover:translate-x-0.5"
                      aria-hidden
                    >
                      →
                    </span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaSection
        title={
          <>
            Assez lu.{" "}
            <span className="text-gradient-accent">Passons à l&apos;action.</span>
          </>
        }
      />
    </>
  );
}
