import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/site";
import {
  getReviews,
  getRoundups,
  getAuthors,
  getCategories,
} from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["/", "/reviews", "/roundups", "/categories", "/authors", "/methodology", "/about"].map(
    (path) => ({
      url: absoluteUrl(path),
      changeFrequency: "weekly" as const,
      priority: path === "/" ? 1 : 0.7,
    })
  );

  const reviews = getReviews().map((r) => ({
    url: absoluteUrl(r.url),
    lastModified: new Date(r.updatedAt ?? r.publishedAt),
    changeFrequency: "monthly" as const,
    priority: 0.8,
  }));

  const roundups = getRoundups().map((r) => ({
    url: absoluteUrl(r.url),
    lastModified: new Date(r.updatedAt ?? r.publishedAt),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  const authors = getAuthors().map((a) => ({
    url: absoluteUrl(a.url),
    changeFrequency: "monthly" as const,
    priority: 0.4,
  }));

  const categories = getCategories().map((c) => ({
    url: absoluteUrl(`/categories/${c.slug}`),
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...reviews, ...roundups, ...categories, ...authors];
}
