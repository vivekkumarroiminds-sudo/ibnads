import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { ReviewCard } from "@/components/review/ReviewCard";
import { JsonLd } from "@/components/content/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { getReviews } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "All Reviews",
  description: "Browse every hands-on review — products, software, and media, tested and scored.",
  path: "/reviews",
});

export default function ReviewsPage() {
  const reviews = getReviews();
  const trail = [
    { name: "Home", url: "/" },
    { name: "Reviews", url: "/reviews" },
  ];

  return (
    <Container className="py-8 sm:py-12">
      <JsonLd data={breadcrumbSchema(trail)} />
      <Breadcrumbs trail={trail} />
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">All reviews</h1>
        <p className="mt-2 text-muted">{reviews.length} hands-on reviews and counting.</p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r, i) => (
          <ReviewCard key={r.slug} review={r} priority={i < 3} />
        ))}
      </div>
    </Container>
  );
}
