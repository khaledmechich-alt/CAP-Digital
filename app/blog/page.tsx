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
        title="Des conseils concrets, zéro jargon"
        em="zéro jargon"
        description="Tout ce qu'un entrepreneur doit savoir sur le web : combien ça coûte, comment être visible sur Google, quand refondre son site — expliqué simplement."
      />

      {/* Les articles sont présentés en sommaire de revue, pas en cartes. */}
      <section className="pt-4 pb-24 md:pb-32">
        <Container>
          <ul className="border-t border-border-subtle">
            {blogPosts.map((post, index) => (
              <Reveal
                as="li"
                key={post.slug}
                variant="fade"
                delay={index * 0.05}
                duration={0.6}
                className="border-b border-border-subtle"
              >
                <Link
                  href={`/blog/${post.slug}`}
                  className="group relative grid gap-3 py-8 md:grid-cols-12 md:items-baseline md:gap-8 md:py-10"
                >
                  <span
                    aria-hidden
                    className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-accent transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-x-100"
                  />

                  <div className="label-mono flex flex-wrap gap-x-3 md:col-span-3 md:flex-col md:gap-y-1">
                    <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
                    <span className="text-accent">{post.category}</span>
                    <span>{post.readingTime} de lecture</span>
                  </div>

                  <h2 className="font-display text-xl leading-[1.2] tracking-[-0.02em] text-balance transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-1.5 md:col-span-5 md:text-2xl">
                    {post.title}
                  </h2>

                  <p className="text-sm leading-relaxed text-muted md:col-span-4">
                    {post.excerpt}
                  </p>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <CtaSection title="Assez lu. Passons à l'action." em="Passons à l'action." />
    </>
  );
}
