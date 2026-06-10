import { defineConfig, defineCollection, s } from "velite";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode from "rehype-pretty-code";
import remarkGfm from "remark-gfm";

// ---- Shared sub-schemas -----------------------------------------------------

const subScore = s.object({
  label: s.string(),
  score: s.number().min(0).max(5),
});

const proCon = s.string();

const faqItem = s.object({
  question: s.string(),
  answer: s.string(),
});

const affiliate = s.object({
  merchant: s.string(),
  url: s.string().url(),
  price: s.string().optional(),
});

const specRow = s.object({
  label: s.string(),
  value: s.string(),
});

// Common fields shared by every review, regardless of reviewType.
const reviewCommon = {
  title: s.string().max(120),
  excerpt: s.string().max(300),
  category: s.string(),
  author: s.string(), // slug -> authors collection
  publishedAt: s.isodate(),
  updatedAt: s.isodate().optional(),
  coverImage: s.image().optional(),
  rating: s.number().min(0).max(5),
  subScores: s.array(subScore).optional(),
  pros: s.array(proCon).default([]),
  cons: s.array(proCon).default([]),
  verdict: s.string(),
  affiliate: affiliate.optional(),
  faq: s.array(faqItem).optional(),
  featured: s.boolean().default(false),
  draft: s.boolean().default(false),
  seo: s
    .object({ title: s.string().optional(), description: s.string().optional() })
    .optional(),
};

// ---- Collections ------------------------------------------------------------

const reviews = defineCollection({
  name: "Review",
  pattern: "reviews/**/*.mdx",
  schema: s
    .object({
      ...reviewCommon,
      // Discriminator drives which Schema.org type we emit.
      reviewType: s.enum(["product", "software", "media"]),
      // product
      brand: s.string().optional(),
      specs: s.array(specRow).optional(),
      // software
      pricing: s.string().optional(),
      platform: s.array(s.string()).optional(),
      // media
      mediaKind: s.enum(["book", "movie", "game"]).optional(),
      creator: s.string().optional(),
      releaseDate: s.isodate().optional(),
      // generated
      slug: s.path(),
      toc: s.toc(),
      metadata: s.metadata(),
      body: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      slugAsParams: data.slug.split("/").slice(1).join("/"),
      url: `/reviews/${data.slug.split("/").slice(1).join("/")}`,
    })),
});

const roundups = defineCollection({
  name: "Roundup",
  pattern: "roundups/**/*.mdx",
  schema: s
    .object({
      title: s.string().max(120),
      excerpt: s.string().max(300),
      category: s.string(),
      author: s.string(),
      publishedAt: s.isodate(),
      updatedAt: s.isodate().optional(),
      coverImage: s.image().optional(),
      featured: s.boolean().default(false),
      draft: s.boolean().default(false),
      // ordered list of review slugs included in this roundup
      items: s.array(
        s.object({
          review: s.string(), // review slugAsParams
          badge: s.string().optional(), // e.g. "Best Overall"
          note: s.string().optional(),
        })
      ),
      faq: s.array(faqItem).optional(),
      seo: s
        .object({ title: s.string().optional(), description: s.string().optional() })
        .optional(),
      slug: s.path(),
      toc: s.toc(),
      metadata: s.metadata(),
      body: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      slugAsParams: data.slug.split("/").slice(1).join("/"),
      url: `/roundups/${data.slug.split("/").slice(1).join("/")}`,
    })),
});

const authors = defineCollection({
  name: "Author",
  pattern: "authors/**/*.mdx",
  schema: s
    .object({
      name: s.string(),
      role: s.string().optional(),
      bio: s.string(),
      avatar: s.image().optional(),
      expertise: s.array(s.string()).default([]),
      twitter: s.string().optional(),
      linkedin: s.string().optional(),
      website: s.string().url().optional(),
      email: s.string().email().optional(),
      slug: s.path(),
      body: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      slugAsParams: data.slug.split("/").slice(1).join("/"),
      url: `/authors/${data.slug.split("/").slice(1).join("/")}`,
    })),
});

const pages = defineCollection({
  name: "Page",
  pattern: "pages/**/*.mdx",
  schema: s
    .object({
      title: s.string(),
      description: s.string().optional(),
      updatedAt: s.isodate().optional(),
      slug: s.path(),
      toc: s.toc(),
      body: s.mdx(),
    })
    .transform((data) => ({
      ...data,
      slugAsParams: data.slug.split("/").slice(1).join("/"),
    })),
});

export default defineConfig({
  root: "content",
  output: {
    data: ".velite",
    assets: "public/static",
    base: "/static/",
    name: "[name]-[hash:6].[ext]",
    clean: true,
  },
  collections: { reviews, roundups, authors, pages },
  mdx: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      rehypeSlug,
      [rehypePrettyCode, { theme: "github-dark-dimmed" }],
      [rehypeAutolinkHeadings, { behavior: "wrap" }],
    ],
  },
});
