import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { JsonLd } from "@/components/content/JsonLd";
import { Badge } from "@/components/ui/Badge";
import { breadcrumbSchema } from "@/lib/schema";
import { getRoundups } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Best-Of Buying Guides",
  description: "Our hands-on buying guides — the best products in every category, ranked and compared.",
  path: "/roundups",
});

export default function RoundupsPage() {
  const roundups = getRoundups();
  const trail = [
    { name: "Home", url: "/" },
    { name: "Best Of", url: "/roundups" },
  ];

  return (
    <Container className="py-8 sm:py-12">
      <JsonLd data={breadcrumbSchema(trail)} />
      <Breadcrumbs trail={trail} />
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">Buying guides</h1>
        <p className="mt-2 text-muted">Ranked, compared, and tested by our editors.</p>
      </header>
      <div className="grid gap-6 sm:grid-cols-2">
        {roundups.map((r) => (
          <Link
            key={r.slug}
            href={r.url}
            className="focus-ring group rounded-2xl border border-border bg-bg p-6 transition hover:shadow-lg"
          >
            <Badge tone="positive">Buying guide</Badge>
            <h2 className="mt-3 text-xl font-semibold text-fg group-hover:text-brand">{r.title}</h2>
            <p className="mt-2 text-muted">{r.excerpt}</p>
          </Link>
        ))}
      </div>
    </Container>
  );
}
