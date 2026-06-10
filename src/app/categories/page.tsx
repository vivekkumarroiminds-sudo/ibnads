import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getCategories } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Categories",
  description: "Browse reviews by category — products, software, and media.",
  path: "/categories",
});

export default function CategoriesPage() {
  const categories = getCategories();
  const trail = [
    { name: "Home", url: "/" },
    { name: "Categories", url: "/categories" },
  ];

  return (
    <Container className="py-8 sm:py-12">
      <Breadcrumbs trail={trail} />
      <h1 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">Categories</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((c) => (
          <Link
            key={c.slug}
            href={`/categories/${c.slug}`}
            className="focus-ring flex items-center justify-between rounded-xl border border-border bg-bg p-5 transition hover:border-brand hover:shadow"
          >
            <span className="font-semibold text-fg">{c.name}</span>
            <span className="text-sm text-muted">{c.count}</span>
          </Link>
        ))}
      </div>
    </Container>
  );
}
