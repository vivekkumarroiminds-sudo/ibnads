import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ReviewCard } from "@/components/review/ReviewCard";
import { NewsletterForm } from "@/components/content/NewsletterForm";
import { AdSlot } from "@/components/content/AdSlot";
import { Badge } from "@/components/ui/Badge";
import {
  getFeaturedReviews,
  getReviews,
  getRoundups,
  getCategories,
} from "@/lib/content";
import { siteConfig } from "@/lib/site";

export default function HomePage() {
  const featured = getFeaturedReviews(3);
  const latest = getReviews().slice(0, 6);
  const roundups = getRoundups().slice(0, 3);
  const categories = getCategories();

  return (
    <>
      {/* Hero */}
      <section className="border-b border-border bg-surface">
        <Container className="py-12 sm:py-16 md:py-20">
          <div className="max-w-2xl">
            <Badge tone="brand">Independent · Hands-on tested</Badge>
            <h1 className="mt-4 text-3xl font-bold tracking-tight text-fg sm:text-4xl md:text-5xl">
              Reviews you can actually trust.
            </h1>
            <p className="mt-4 text-lg text-muted">{siteConfig.description}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {categories.slice(0, 5).map((c) => (
                <Link
                  key={c.slug}
                  href={`/categories/${c.slug}`}
                  className="focus-ring rounded-full border border-border bg-bg px-4 py-2 text-sm font-medium text-fg hover:border-brand hover:text-brand"
                >
                  {c.name}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      {/* Featured */}
      {featured.length > 0 && (
        <Container className="py-12">
          <SectionHeading title="Featured reviews" href="/reviews" cta="All reviews" />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((r, i) => (
              <ReviewCard key={r.slug} review={r} priority={i === 0} />
            ))}
          </div>
        </Container>
      )}

      <Container className="py-2">
        <AdSlot format="leaderboard" />
      </Container>

      {/* Roundups */}
      {roundups.length > 0 && (
        <Container className="py-12">
          <SectionHeading title="Best-of guides" href="/roundups" cta="All guides" />
          <div className="grid gap-4 sm:grid-cols-3">
            {roundups.map((r) => (
              <Link
                key={r.slug}
                href={r.url}
                className="focus-ring group rounded-2xl border border-border bg-bg p-6 transition hover:shadow-lg"
              >
                <Badge tone="positive">Buying guide</Badge>
                <h3 className="mt-3 text-lg font-semibold text-fg group-hover:text-brand">
                  {r.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-sm text-muted">{r.excerpt}</p>
              </Link>
            ))}
          </div>
        </Container>
      )}

      {/* Latest */}
      <Container className="py-12">
        <SectionHeading title="Latest reviews" href="/reviews" cta="See all" />
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {latest.map((r) => (
            <ReviewCard key={r.slug} review={r} />
          ))}
        </div>
      </Container>

      {/* Newsletter */}
      <Container className="pb-16">
        <NewsletterForm />
      </Container>
    </>
  );
}

function SectionHeading({ title, href, cta }: { title: string; href: string; cta: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-4">
      <h2 className="text-2xl font-bold tracking-tight text-fg">{title}</h2>
      <Link href={href} className="focus-ring shrink-0 rounded text-sm font-medium text-brand hover:underline">
        {cta} →
      </Link>
    </div>
  );
}
