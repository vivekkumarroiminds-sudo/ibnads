// JSON-LD structured-data builders. Keyed by reviewType so adding a review
// type means adding one builder here. Output is plain objects rendered via
// the <JsonLd> component (src/components/content/JsonLd.tsx).

import type { Review, Roundup, Author } from "@/lib/content";
import { siteConfig, absoluteUrl } from "@/lib/site";
import { getAuthorBySlug } from "@/lib/content";

type Json = Record<string, unknown>;

function authorNode(authorSlug: string): Json {
  const author = getAuthorBySlug(authorSlug);
  return {
    "@type": "Person",
    name: author?.name ?? authorSlug,
    ...(author ? { url: absoluteUrl(author.url) } : {}),
  };
}

function publisherNode(): Json {
  return {
    "@type": "Organization",
    name: siteConfig.publisher,
    url: siteConfig.url,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/icon.svg"),
    },
  };
}

function ratingNode(value: number): Json {
  return {
    "@type": "Rating",
    ratingValue: value,
    bestRating: 5,
    worstRating: 0,
  };
}

/** The thing being reviewed — its @type depends on reviewType. */
function itemReviewedNode(review: Review): Json {
  const base: Json = { name: review.title.replace(/ Review.*$/i, "").trim() };
  switch (review.reviewType) {
    case "product":
      return {
        "@type": "Product",
        ...base,
        ...(review.brand ? { brand: { "@type": "Brand", name: review.brand } } : {}),
      };
    case "software":
      return {
        "@type": "SoftwareApplication",
        ...base,
        applicationCategory: review.category,
        operatingSystem: review.platform?.join(", "),
        ...(review.pricing
          ? { offers: { "@type": "Offer", description: review.pricing } }
          : {}),
      };
    case "media": {
      const typeMap = { book: "Book", movie: "Movie", game: "VideoGame" } as const;
      return {
        "@type": typeMap[review.mediaKind ?? "book"],
        ...base,
        ...(review.creator ? { author: { "@type": "Person", name: review.creator } } : {}),
        ...(review.releaseDate ? { datePublished: review.releaseDate } : {}),
      };
    }
  }
}

/** Review + nested itemReviewed (with aggregateRating). */
export function reviewSchema(review: Review): Json {
  const item = itemReviewedNode(review);
  const aggregate: Json = {
    "@type": "AggregateRating",
    ratingValue: review.rating,
    bestRating: 5,
    worstRating: 0,
    ratingCount: 1,
    reviewCount: 1,
  };

  return {
    "@context": "https://schema.org",
    "@type": "Review",
    name: review.title,
    headline: review.title,
    description: review.excerpt,
    datePublished: review.publishedAt,
    ...(review.updatedAt ? { dateModified: review.updatedAt } : {}),
    author: authorNode(review.author),
    publisher: publisherNode(),
    reviewRating: ratingNode(review.rating),
    reviewBody: review.verdict,
    ...(review.affiliate?.price
      ? { positiveNotes: review.pros, negativeNotes: review.cons }
      : {}),
    itemReviewed: { ...item, aggregateRating: aggregate },
    url: absoluteUrl(review.url),
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(review.url) },
  };
}

export function breadcrumbSchema(
  trail: { name: string; url: string }[]
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.url),
    })),
  };
}

export function faqSchema(
  faq: { question: string; answer: string }[]
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}

export function roundupSchema(
  roundup: Roundup,
  items: { name: string; url: string }[]
): Json {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: roundup.title,
    description: roundup.excerpt,
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: absoluteUrl(item.url),
    })),
  };
}

export function personSchema(author: Author): Json {
  const sameAs = [
    author.twitter && `https://twitter.com/${author.twitter}`,
    author.linkedin && `https://www.linkedin.com/in/${author.linkedin}`,
    author.website,
  ].filter(Boolean);

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    ...(author.role ? { jobTitle: author.role } : {}),
    description: author.bio,
    knowsAbout: author.expertise,
    url: absoluteUrl(author.url),
    worksFor: { "@type": "Organization", name: siteConfig.publisher },
    ...(sameAs.length ? { sameAs } : {}),
  };
}

export function organizationSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
    description: siteConfig.description,
    logo: absoluteUrl("/icon.svg"),
  };
}

export function websiteSchema(): Json {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteConfig.name,
    url: siteConfig.url,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: absoluteUrl("/search?q={search_term_string}"),
      },
      "query-input": "required name=search_term_string",
    },
  };
}

export function articleSchema(page: {
  title: string;
  description?: string;
  url: string;
  updatedAt?: string;
}): Json {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    ...(page.description ? { description: page.description } : {}),
    ...(page.updatedAt ? { dateModified: page.updatedAt } : {}),
    publisher: publisherNode(),
    mainEntityOfPage: { "@type": "WebPage", "@id": absoluteUrl(page.url) },
  };
}
