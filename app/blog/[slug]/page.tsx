import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  blogPosts,
  formatBlogDate,
  getBlogPostBySlug,
} from "@/lib/blog-posts";
import { siteConfig } from "@/lib/site-config";
import { JsonLd } from "@/components/seo/json-ld";
import { CtaSection } from "@/components/sections/cta-section";
import { Container } from "@/components/ui/container";
import { Reveal } from "@/components/ui/reveal";
import { Logo } from "@/components/layout/logo";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  if (!post) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    datePublished: post.date,
    inLanguage: "fr-FR",
    mainEntityOfPage: `${siteConfig.url}/blog/${post.slug}`,
    author: { "@type": "Organization", name: siteConfig.name },
    publisher: { "@type": "Organization", name: siteConfig.name },
  };

  return (
    <>
      <JsonLd data={articleSchema} />
      <article className="pt-36 pb-16 md:pt-44 md:pb-24">
        <Container className="max-w-3xl">
          <Reveal variant="up" className="flex flex-col gap-7">
            <Link
              href="/blog"
              className="label-mono link-line inline-flex w-fit items-center gap-2 hover:text-foreground"
            >
              <span aria-hidden>←</span>
              Tous les articles
            </Link>

            <div className="label-mono flex flex-wrap items-center gap-x-3 gap-y-1">
              <span className="text-accent">{post.category}</span>
              <span aria-hidden>·</span>
              <time dateTime={post.date}>{formatBlogDate(post.date)}</time>
              <span aria-hidden>·</span>
              <span>{post.readingTime} de lecture</span>
            </div>

            <h1 className="font-display text-4xl leading-[1.05] tracking-[-0.025em] text-balance md:text-6xl">
              {post.title}
            </h1>

            <p className="text-lg leading-relaxed text-muted">{post.excerpt}</p>
          </Reveal>

          <div className="mt-14 flex flex-col gap-12">
            {post.content.map((section, index) => (
              <Reveal key={index} variant="up" className="flex flex-col gap-4">
                {section.heading ? (
                  <h2 className="font-display text-3xl tracking-[-0.02em]">
                    {section.heading}
                  </h2>
                ) : null}
                {section.paragraphs.map((paragraph, pIndex) => (
                  <p
                    key={pIndex}
                    className="leading-relaxed text-pretty text-foreground/85"
                  >
                    {paragraph}
                  </p>
                ))}
                {section.list ? (
                  <ul className="mt-2 flex flex-col divide-y divide-border-subtle border-y border-border-subtle">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-baseline gap-4 py-3.5">
                        <span className="label-mono shrink-0 text-accent" aria-hidden>
                          —
                        </span>
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            ))}
          </div>

          <Reveal variant="up" className="mt-16">
            <div className="flex flex-col items-start gap-4 border-t border-border-subtle pt-8 sm:flex-row sm:items-center sm:justify-between">
              <Logo />
              <p className="label-mono">
                Article rédigé par l&apos;équipe CAP DIGITAL
              </p>
            </div>
          </Reveal>
        </Container>
      </article>

      <CtaSection title="Un projet web en tête ? On en parle ?" em="On en parle ?" />
    </>
  );
}
