import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ReviewCard } from "@/components/review/ReviewCard";
import { JsonLd } from "@/components/content/JsonLd";

import { getCategories, getCategoryName, getReviewsByCategory } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return getCategories().map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const name = getCategoryName(slug);
  if (!name) return {};
  return buildMetadata({
    title: `${name} Reviews`,
    description: `Hands-on ${name.toLowerCase()} reviews, tested and scored by our editors.`,
    path: `/categories/${slug}`,
  });
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const name = getCategoryName(slug);
  if (!name) notFound();

  const reviews = getReviewsByCategory(slug);
  const trail = [
    { name: "Home", url: "/" },
    { name: "Categories", url: "/categories" },
    { name, url: `/categories/${slug}` },
  ];

  return (
    <Container className="py-8 sm:py-12">
      <JsonLd data={breadcrumbSchema(trail)} />
      <Breadcrumbs trail={trail} />
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">{name} reviews</h1>
        <p className="mt-2 text-muted">{reviews.length} reviews in this category.</p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r, i) => (
          <ReviewCard key={r.slug} review={r} priority={i < 3} />
        ))}
      </div>
    </Container>
  );
}
