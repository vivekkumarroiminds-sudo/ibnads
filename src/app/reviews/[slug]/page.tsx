import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { TableOfContents } from "@/components/layout/TableOfContents";
import { VerdictBox } from "@/components/review/VerdictBox";
import { SubScores } from "@/components/review/SubScores";
import { ProsCons } from "@/components/review/ProsCons";
import { SpecsTable } from "@/components/review/SpecsTable";
import { ReviewCard } from "@/components/review/ReviewCard";
import { MDXContent } from "@/components/content/MDXContent";
import { AuthorByline } from "@/components/content/AuthorByline";
import { ShareBar } from "@/components/content/ShareBar";
import { Disclosure } from "@/components/content/Disclosure";
import { AdSlot } from "@/components/content/AdSlot";
import { JsonLd } from "@/components/content/JsonLd";
import { Badge } from "@/components/ui/Badge";

import {
  getReviews,
  getReviewBySlug,
  getAuthorBySlug,
  getRelatedReviews,
  slugify,
} from "@/lib/content";
import { reviewSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getReviews().map((r) => ({ slug: r.slugAsParams }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) return {};
  return buildMetadata({
    title: review.seo?.title ?? review.title,
    description: review.seo?.description ?? review.excerpt,
    path: review.url,
    image: review.coverImage?.src,
    type: "article",
    publishedTime: review.publishedAt,
    modifiedTime: review.updatedAt,
    authors: [getAuthorBySlug(review.author)?.name ?? "Staff"],
  });
}

export default async function ReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const review = getReviewBySlug(slug);
  if (!review) notFound();

  const author = getAuthorBySlug(review.author);
  const related = getRelatedReviews(review);
  const trail = [
    { name: "Home", url: "/" },
    { name: "Reviews", url: "/reviews" },
    { name: review.category, url: `/categories/${slugify(review.category)}` },
    { name: review.title, url: review.url },
  ];

  const schema: Record<string, unknown>[] = [
    reviewSchema(review),
    breadcrumbSchema(trail),
  ];
  if (review.faq?.length) schema.push(faqSchema(review.faq));

  return (
    <>
      <JsonLd data={schema} />
      <Container className="py-8">
        <Breadcrumbs trail={trail} />

        <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-10">
          {/* Article column — constrained for readability */}
          <article className="min-w-0">
            <header className="mx-auto max-w-prose">
              <Badge tone="brand">{review.category}</Badge>
              <h1 className="mt-3 text-3xl font-bold leading-tight tracking-tight text-fg sm:text-4xl">
                {review.title}
              </h1>
              <p className="mt-3 text-lg text-muted">{review.excerpt}</p>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
                <AuthorByline
                  author={author}
                  publishedAt={review.publishedAt}
                  updatedAt={review.updatedAt}
                />
                <ShareBar path={review.url} title={review.title} />
              </div>
              <div className="mt-4">
                <Disclosure />
              </div>
            </header>

            {review.coverImage && (
              <div className="relative mx-auto mt-6 aspect-[16/9] max-w-3xl overflow-hidden rounded-2xl bg-surface">
                <Image
                  src={review.coverImage.src}
                  alt={review.title}
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 768px"
                  className="object-cover"
                />
              </div>
            )}

            <div className="mx-auto mt-8 max-w-prose space-y-8">
              <VerdictBox review={review} />

              {review.subScores && review.subScores.length > 0 && (
                <section aria-labelledby="scores-h">
                  <h2 id="scores-h" className="mb-3 text-xl font-bold text-fg">
                    Scorecard
                  </h2>
                  <SubScores scores={review.subScores} />
                </section>
              )}

              <ProsCons pros={review.pros} cons={review.cons} />

              {review.reviewType === "product" && review.specs && (
                <section aria-labelledby="specs-h">
                  <h2 id="specs-h" className="mb-3 text-xl font-bold text-fg">
                    Specifications
                  </h2>
                  <SpecsTable specs={review.specs} />
                </section>
              )}

              {/* Long-form body */}
              <div className="prose dark:prose-invert sm:prose-lg">
                <MDXContent code={review.body} />
              </div>

              <AdSlot format="rectangle" />

              {review.faq && review.faq.length > 0 && (
                <section aria-labelledby="faq-h">
                  <h2 id="faq-h" className="mb-4 text-xl font-bold text-fg">
                    Frequently asked questions
                  </h2>
                  <div className="divide-y divide-border rounded-xl border border-border">
                    {review.faq.map((f) => (
                      <details key={f.question} className="group p-4">
                        <summary className="focus-ring cursor-pointer list-none rounded font-medium text-fg">
                          {f.question}
                        </summary>
                        <p className="mt-2 text-muted">{f.answer}</p>
                      </details>
                    ))}
                  </div>
                </section>
              )}
            </div>
          </article>

          {/* Sticky TOC sidebar (desktop only) */}
          <aside className="hidden lg:block">
            <div className="sticky top-24">
              <TableOfContents toc={review.toc} />
            </div>
          </aside>
        </div>

        {related.length > 0 && (
          <section className="mt-16 border-t border-border pt-10">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-fg">Related reviews</h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <ReviewCard key={r.slug} review={r} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
