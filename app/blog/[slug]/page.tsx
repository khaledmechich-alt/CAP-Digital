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
      <article className="relative overflow-hidden pt-36 pb-16 md:pt-44 md:pb-24">
        <div
          className="glow-orb top-[-260px] left-1/2 size-[560px] -translate-x-1/2"
          aria-hidden
        />
        <Container className="relative max-w-3xl">
          <Reveal className="flex flex-col gap-6">
            <Link
              href="/blog"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
            >
              <span aria-hidden>←</span>
              Tous les articles
            </Link>

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

            <h1 className="font-display text-3xl leading-tight font-bold tracking-tight text-balance md:text-5xl">
              {post.title}
            </h1>

            <p className="text-lg leading-relaxed text-muted">{post.excerpt}</p>
          </Reveal>

          <div className="mt-12 flex flex-col gap-10">
            {post.content.map((section, index) => (
              <Reveal key={index} className="flex flex-col gap-4">
                {section.heading ? (
                  <h2 className="font-display text-2xl font-semibold tracking-tight">
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
                  <ul className="flex flex-col gap-3 rounded-2xl border border-border-subtle bg-card p-6">
                    {section.list.map((item) => (
                      <li key={item} className="flex items-start gap-3">
                        <span
                          className="mt-2 size-1.5 shrink-0 rounded-full bg-accent"
                          aria-hidden
                        />
                        <span className="leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14">
            <div className="flex flex-col items-start gap-4 rounded-2xl border border-border-subtle bg-card p-8 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <Logo />
              </div>
              <p className="text-sm text-muted">
                Article rédigé par l&apos;équipe KA DIGITAL
              </p>
            </div>
          </Reveal>
        </Container>
      </article>

      <CtaSection
        title={
          <>
            Un projet web en tête&nbsp;?{" "}
            <span className="text-gradient-accent">On en parle&nbsp;?</span>
          </>
        }
      />
    </>
  );
}
