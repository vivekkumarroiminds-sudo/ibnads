// Typed query helpers over the Velite-generated content collections.
// Components import from here — never read MDX files directly.

import {
  reviews as allReviews,
  roundups as allRoundups,
  authors as allAuthors,
  pages as allPages,
  type Review,
  type Roundup,
  type Author,
  type Page,
} from "#site/content";

const isPublished = <T extends { draft: boolean }>(d: T) => !d.draft;

const byNewest = (a: { publishedAt: string }, b: { publishedAt: string }) =>
  +new Date(b.publishedAt) - +new Date(a.publishedAt);

// ---- Reviews ----------------------------------------------------------------

export function getReviews(): Review[] {
  return [...allReviews].filter(isPublished).sort(byNewest);
}

export function getReviewBySlug(slug: string): Review | undefined {
  return allReviews.find((r) => r.slugAsParams === slug && !r.draft);
}

export function getFeaturedReviews(limit = 6): Review[] {
  return getReviews()
    .filter((r) => r.featured)
    .slice(0, limit);
}

export function getReviewsByCategory(category: string): Review[] {
  return getReviews().filter(
    (r) => slugify(r.category) === slugify(category)
  );
}

export function getReviewsByAuthor(authorSlug: string): Review[] {
  return getReviews().filter((r) => r.author === authorSlug);
}

export function getRelatedReviews(review: Review, limit = 3): Review[] {
  return getReviews()
    .filter((r) => r.slug !== review.slug && r.category === review.category)
    .slice(0, limit);
}

// ---- Roundups ---------------------------------------------------------------

export function getRoundups(): Roundup[] {
  return [...allRoundups].filter(isPublished).sort(byNewest);
}

export function getRoundupBySlug(slug: string): Roundup | undefined {
  return allRoundups.find((r) => r.slugAsParams === slug && !r.draft);
}

/** Resolve a roundup's referenced review slugs into full Review objects. */
export function resolveRoundupItems(roundup: Roundup) {
  return roundup.items
    .map((item) => ({
      ...item,
      reviewData: getReviewBySlug(item.review),
    }))
    .filter((i) => i.reviewData);
}

// ---- Authors ----------------------------------------------------------------

export function getAuthors(): Author[] {
  return [...allAuthors];
}

export function getAuthorBySlug(slug: string): Author | undefined {
  return allAuthors.find((a) => a.slugAsParams === slug);
}

// ---- Pages ------------------------------------------------------------------

export function getPageBySlug(slug: string): Page | undefined {
  return allPages.find((p) => p.slugAsParams === slug);
}

// ---- Categories -------------------------------------------------------------

export function getCategories(): { name: string; slug: string; count: number }[] {
  const map = new Map<string, { name: string; count: number }>();
  for (const r of getReviews()) {
    const slug = slugify(r.category);
    const existing = map.get(slug);
    if (existing) existing.count += 1;
    else map.set(slug, { name: r.category, count: 1 });
  }
  return [...map.entries()]
    .map(([slug, v]) => ({ slug, name: v.name, count: v.count }))
    .sort((a, b) => b.count - a.count);
}

export function getCategoryName(slug: string): string | undefined {
  return getCategories().find((c) => c.slug === slug)?.name;
}

// ---- Search -----------------------------------------------------------------

export interface SearchRecord {
  type: "review" | "roundup";
  title: string;
  excerpt: string;
  url: string;
  category: string;
  rating?: number;
  price?: string;
  /** Lowercased haystack of all searchable text for fast substring matching. */
  keywords: string;
}

/** Build a lightweight, fully static search index from all published content. */
export function getSearchIndex(): SearchRecord[] {
  const reviewRecords: SearchRecord[] = getReviews().map((r) => ({
    type: "review",
    title: r.title,
    excerpt: r.excerpt,
    url: r.url,
    category: r.category,
    rating: r.rating,
    price: r.affiliate?.price,
    keywords: [
      r.title,
      r.excerpt,
      r.category,
      r.brand,
      r.creator,
      r.reviewType,
      ...r.pros,
      ...r.cons,
    ]
      .filter(Boolean)
      .join(" ")
      .toLowerCase(),
  }));

  const roundupRecords: SearchRecord[] = getRoundups().map((r) => ({
    type: "roundup",
    title: r.title,
    excerpt: r.excerpt,
    url: r.url,
    category: r.category,
    keywords: [r.title, r.excerpt, r.category, "best guide roundup"]
      .filter(Boolean)
      .join(" ")
      .toLowerCase(),
  }));

  return [...reviewRecords, ...roundupRecords];
}

// ---- utils ------------------------------------------------------------------

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export type { Review, Roundup, Author, Page };
