import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Image from "next/image";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ReviewCard } from "@/components/review/ReviewCard";
import { MDXContent } from "@/components/content/MDXContent";
import { JsonLd } from "@/components/content/JsonLd";
import { Badge } from "@/components/ui/Badge";

import { getAuthors, getAuthorBySlug, getReviewsByAuthor } from "@/lib/content";
import { personSchema, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getAuthors().map((a) => ({ slug: a.slugAsParams }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) return {};
  return buildMetadata({
    title: `${author.name} — ${author.role ?? "Contributor"}`,
    description: author.bio,
    path: author.url,
    image: author.avatar?.src,
  });
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = getAuthorBySlug(slug);
  if (!author) notFound();

  const reviews = getReviewsByAuthor(slug);
  const trail = [
    { name: "Home", url: "/" },
    { name: "Authors", url: "/authors" },
    { name: author.name, url: author.url },
  ];

  return (
    <>
      <JsonLd data={[personSchema(author), breadcrumbSchema(trail)]} />
      <Container className="py-8">
        <Breadcrumbs trail={trail} />

        <header className="flex flex-col gap-5 sm:flex-row sm:items-center">
          {author.avatar ? (
            <Image
              src={author.avatar.src}
              alt={author.name}
              width={96}
              height={96}
              className="h-24 w-24 rounded-full object-cover"
            />
          ) : (
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-brand/10 text-3xl font-bold text-brand">
              {author.name.charAt(0)}
            </div>
          )}
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-fg">{author.name}</h1>
            {author.role && <p className="text-brand">{author.role}</p>}
            <p className="mt-2 max-w-2xl text-muted">{author.bio}</p>
            {author.expertise.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-2">
                {author.expertise.map((e) => (
                  <Badge key={e}>{e}</Badge>
                ))}
              </div>
            )}
          </div>
        </header>

        {author.body && (
          <div className="prose mt-8 max-w-prose dark:prose-invert">
            <MDXContent code={author.body} />
          </div>
        )}

        {reviews.length > 0 && (
          <section className="mt-12">
            <h2 className="mb-6 text-2xl font-bold tracking-tight text-fg">
              Reviews by {author.name}
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {reviews.map((r) => (
                <ReviewCard key={r.slug} review={r} />
              ))}
            </div>
          </section>
        )}
      </Container>
    </>
  );
}
