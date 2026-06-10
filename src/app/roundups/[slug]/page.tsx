import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ComparisonTable } from "@/components/content/ComparisonTable";
import { MDXContent } from "@/components/content/MDXContent";
import { AuthorByline } from "@/components/content/AuthorByline";
import { Disclosure } from "@/components/content/Disclosure";
import { ReviewCard } from "@/components/review/ReviewCard";
import { JsonLd } from "@/components/content/JsonLd";

import {
  getRoundups,
  getRoundupBySlug,
  getAuthorBySlug,
  resolveRoundupItems,
} from "@/lib/content";
import { roundupSchema, breadcrumbSchema, faqSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getRoundups().map((r) => ({ slug: r.slugAsParams }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const roundup = getRoundupBySlug(slug);
  if (!roundup) return {};
  return buildMetadata({
    title: roundup.seo?.title ?? roundup.title,
    description: roundup.seo?.description ?? roundup.excerpt,
    path: roundup.url,
    image: roundup.coverImage?.src,
    type: "article",
    publishedTime: roundup.publishedAt,
    modifiedTime: roundup.updatedAt,
  });
}

export default async function RoundupPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const roundup = getRoundupBySlug(slug);
  if (!roundup) notFound();

  const author = getAuthorBySlug(roundup.author);
  const items = resolveRoundupItems(roundup);
  const trail = [
    { name: "Home", url: "/" },
    { name: "Best Of", url: "/roundups" },
    { name: roundup.title, url: roundup.url },
  ];

  const schema: Record<string, unknown>[] = [
    roundupSchema(
      roundup,
      items.map((i) => ({ name: i.reviewData!.title, url: i.reviewData!.url }))
    ),
    breadcrumbSchema(trail),
  ];
  if (roundup.faq?.length) schema.push(faqSchema(roundup.faq));

  return (
    <>
      <JsonLd data={schema} />
      <Container className="py-8">
        <Breadcrumbs trail={trail} />

        <header className="mx-auto max-w-prose">
          <h1 className="text-3xl font-bold leading-tight tracking-tight text-fg sm:text-4xl">
            {roundup.title}
          </h1>
          <p className="mt-3 text-lg text-muted">{roundup.excerpt}</p>
          <div className="mt-5">
            <AuthorByline
              author={author}
              publishedAt={roundup.publishedAt}
              updatedAt={roundup.updatedAt}
            />
          </div>
          <div className="mt-4">
            <Disclosure />
          </div>
        </header>

        <section className="mt-8" aria-label="Comparison">
          <ComparisonTable rows={items} />
        </section>

        <div className="prose mx-auto mt-8 max-w-prose dark:prose-invert sm:prose-lg">
          <MDXContent code={roundup.body} />
        </div>

        {/* Full cards for each pick */}
        <section className="mt-12">
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-fg">The picks in detail</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {items.map((i) => (
              <ReviewCard key={i.reviewData!.slug} review={i.reviewData!} />
            ))}
          </div>
        </section>

        {roundup.faq && roundup.faq.length > 0 && (
          <section className="mx-auto mt-12 max-w-prose" aria-labelledby="faq-h">
            <h2 id="faq-h" className="mb-4 text-2xl font-bold text-fg">
              Frequently asked questions
            </h2>
            <div className="divide-y divide-border rounded-xl border border-border">
              {roundup.faq.map((f) => (
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
      </Container>
    </>
  );
}
