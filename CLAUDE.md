# Blog Review Site

Mobile-first, SEO-optimized, article-focused review website built with Next.js (App Router) + TypeScript + Tailwind. Reviews physical products, software/SaaS, and media (books/movies/games). Monetized via SEO, affiliate, ads, and email.

## Commands
- `npm run dev` — local dev server (Velite watches content)
- `npm run build` — production build (runs Velite content build first)
- `npm run typecheck` — `tsc --noEmit`
- `npm run lint` — ESLint
- `npm run start` — serve production build

## Architecture
- **App Router + RSC**, static-first. All content pages use `generateStaticParams` — no runtime DB.
- **Content** lives as MDX in `/content`, typed and validated via **Velite** (`velite.config.ts`, Zod schemas). Generated typed output is imported from `#site/content` (alias to `.velite`). Query helpers live in `src/lib/content.ts`. Never read MDX files directly in components — use the typed Velite exports.
- **Reviews are typed by `reviewType`** (`product | software | media`). JSON-LD is built in `src/lib/schema/` keyed by that type. To add a review type: add the Velite variant + one schema builder.
- **Ratings:** primary 0–5 star (decimals) required; optional `subScores[]`. Both feed Schema.org `aggregateRating` / `Review.reviewRating`.

## Non-negotiables
1. **SEO first.** Every page MUST emit correct `generateMetadata` (canonical, OG, Twitter) and JSON-LD. Reviews emit Review + their product-type schema + BreadcrumbList. Validate against Google Rich Results expectations.
2. **Mobile-first.** Author every component at 360px first, enhance upward. Tap targets ≥44px.
3. **Core Web Vitals.** No layout shift: `next/image` with dimensions, reserved-height AdSlots. Prefer static rendering; avoid client components unless interactive.
4. **E-E-A-T.** Reviews link to an author (Person schema + bio page). Keep the methodology page accurate.
5. **Affiliate compliance.** Affiliate links use `rel="sponsored nofollow"` and pages with them render the FTC Disclosure.
6. **Accessibility.** Semantic HTML, AA contrast, keyboard focus, `prefers-reduced-motion`.

## Conventions
- TypeScript strict; no `any`. Tailwind utilities (no inline styles). Server Components by default; mark `"use client"` only when needed (theme toggle, forms, interactive tables).
- Content authoring: see `/content/reviews/_TEMPLATE.mdx` for frontmatter shape.
- Colors/spacing via Tailwind theme tokens — don't hardcode hex values in components.

## Monetization hooks
- `<AffiliateButton>`, `<ComparisonTable>`, `<AdSlot>`, `<NewsletterForm>`, `<Disclosure>` — reuse these; don't reinvent CTAs.

## Site config
- Global site metadata (name, url, social, defaults) lives in `src/lib/site.ts`. Change brand/domain there, not scattered across files.

## Content Authoring (SEO Reviews)
Workflow for turning **Product Name + Product URL (+ optional editorial/competitor URLs)** into a finished review. Follow it whenever asked to draft/write a product, software, or media review.

**1. Research & verify first.** Fetch the product URL, then cross-check **≥2 independent sources**. Never trust marketing copy. Label every spec **verified / manufacturer-claimed / owner-reported** in the prose (mirror the "rated"/"reported" language in `content/reviews/tikitunes-bluetooth-speaker.mdx`). Watch for funnel/dropship red flags — single-product funnel URLs (`?prod=`, `/intl_*/`), countdown/scarcity timers, no Amazon/retail presence, syndicated PR "reviews", Scamadviser flags. Surfacing those honestly is the E-E-A-T differentiator. Set the `rating` only after verification.

**2. Map the spec to this repo — don't reinvent what's automatic.** Most of a generic SEO brief is already handled here, so do NOT write it as body prose:

| Brief asks for | Where it lives here |
| --- | --- |
| Meta title / description, 5 title variants | `seo.title` / `seo.description` (one each; falls back to `title`/`excerpt`). Variants → strategy file. |
| URL slug | Filename of the `.mdx` (slug is derived). |
| Quick Verdict Box, TL;DR | `rating` + `verdict` frontmatter → auto `VerdictBox` at top. Don't repeat as prose. |
| Product Overview Table | `specs[]` (product) / `pricing`+`platform` (software) → auto Specs table. |
| Pros & Cons | `pros[]` / `cons[]` → auto grid. Don't re-list in body. |
| Sub-scores | `subScores[]` → auto Scorecard. |
| 10+ FAQs | `faq[]` → auto FAQ accordion **+ FAQPage JSON-LD**. Author the FAQs here, not as body prose. |
| Schema (Review/Product/FAQ/Breadcrumb), canonical, OG/Twitter, sitemap | **Fully automatic** — author supplies nothing. |
| Competitor audit, topical cluster, image-SEO, title/meta variants | **Strategy-only** → companion file, never the MDX. |

**3. Body outline (MDX H2s).** Hook in `## Overview` → feature/benefit sections → `## Performance and real-world use` → `## How we tested` (REQUIRED — link `/methodology`; be honest about what was and wasn't tested) → `## How it compares` (GFM markdown table — `ComparisonTable` is roundup-only, unavailable in reviews) → `## Pricing and value` → buyer-guide sections (`## What to look for`, category rules, common mistakes) → `## Who it's for (and who should skip it)` → `## The verdict`. Only `AdSlot`, `AffiliateButton`, `Disclosure`, `NewsletterForm`, `Image` are available in MDX. Never hand-add `<Disclosure>` (auto-rendered in the header) or `<AdSlot>` (auto-placed after the body).

**4. Length.** Target the brief's word count, but **substance-first** — fill length with genuine buyer-education value (buying guide, regulations, comparisons, troubleshooting), never filler. Cut a section before padding it; thin/padded content fails Google's Helpful Content guidance.

**5. Compliance.** Author is `jordan-lee` (only existing author). Affiliate links are `sponsored nofollow` (handled by `AffiliateButton`/`VerdictBox`). Keep `draft: true` until `npx velite build` passes schema validation, then flip to `false`.

**6. Strategy deliverables** (5 titles, 5 meta descriptions, competitor/semantic gap analysis, topical cluster + internal-linking map, image SEO) go to `content/_strategy/<slug>.md` — a `_`-prefixed dir outside the `reviews/**/*.mdx` glob, so it is never built or published. Never put this in the MDX.
