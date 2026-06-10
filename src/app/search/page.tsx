import { Suspense } from "react";
import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { SearchClient } from "@/components/search/SearchClient";
import { getSearchIndex } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

// Search result pages are thin/duplicative — keep them out of the index
// (the SearchAction in WebSite schema still points crawlers here).
export const metadata: Metadata = buildMetadata({
  title: "Search",
  description: "Search ibnads's hands-on reviews and buying guides.",
  path: "/search",
  noIndex: true,
});

export default function SearchPage() {
  const index = getSearchIndex();
  const trail = [
    { name: "Home", url: "/" },
    { name: "Search", url: "/search" },
  ];

  return (
    <Container className="py-8 sm:py-12">
      <Breadcrumbs trail={trail} />
      <h1 className="mb-6 text-3xl font-bold tracking-tight text-fg sm:text-4xl">Search</h1>
      {/* useSearchParams requires a Suspense boundary. */}
      <Suspense fallback={<div className="h-14 rounded-xl border border-border bg-surface" />}>
        <SearchClient index={index} />
      </Suspense>
    </Container>
  );
}
