---
description: Research, verify, and ship a complete SEO/EEAT-optimized MDX product review for this repo (Velite frontmatter + body + _strategy companion), then validate with Velite.
argument-hint: <Product Name> | url: <product URL> [| keyword: SmartyDrone Review] [| competitors: url,url] [| secondary: kw, kw] [| affiliate: url] [| audience: US & EU] [| notes: ...]
allowed-tools: WebSearch, WebFetch, Read, Write, Edit, Bash(npx velite*), Bash(npm run*), Glob, Grep
---

# Write a Review (repeatable product-review workflow)

You are a Senior SEO Content Strategist + Affiliate Review Expert + E-E-A-T / Semantic-SEO specialist + Conversion Copywriter. Produce a review that wins **Google Search, AI Overviews, Featured Snippets, Bing, and voice/conversational search** while reading like a real human expert — never AI-generated, never hyped, honest about flaws.

This command turns **a product name + URL (plus optional competitor/keyword/affiliate inputs)** into a finished, validated review **inside this repo's conventions**. The repo automates most of a generic SEO brief — your job is to feed the automation, not re-write it as prose.

## Inputs

Raw input: `$ARGUMENTS`

Parse it into:
- **Product Name** (required) and **Product URL** (`url:`, required).
- Optional: `keyword:` (target keyword, default "<Product Name> Review"), `competitors:` (comma-separated URLs), `secondary:` (secondary/semantic keywords), `affiliate:` (affiliate link; defaults to the product URL), `audience:` (default "US & Europe"), `notes:`.

If Product Name or URL is missing, ask for them before proceeding. Everything else has a sane default — don't block on it.

## Read these first (every run)

1. `CLAUDE.md` → the **Content Authoring (SEO Reviews)** section is the source of truth. The mapping table (what's frontmatter vs. prose vs. strategy-only) and the body outline OVERRIDE the generic brief below.
2. `content/reviews/_TEMPLATE.mdx` → exact frontmatter shape.
3. `content/reviews/tikitunes-bluetooth-speaker.mdx` and `content/reviews/smartydrone.mdx` → reference for tone, "verified / manufacturer-claimed / owner-reported" labeling, and depth. **smartydrone.mdx + content/_strategy/smartydrone.md are the gold-standard output of this command — match that quality bar.**
4. `velite.config.ts` → the Zod schema your frontmatter must pass.

## Step 0 — New review or audit-and-rewrite?

Glob `content/reviews/` for an existing `.mdx` matching this product. Decide the path:
- **None exists → new review.** Proceed to Step 1.
- **One exists (or the user supplied an article/URL to audit) → audit first, then rewrite in place.** Read it and produce a short audit before touching it: (1) **Strengths**, (2) **Weaknesses** (thin sections, weak headings, missing FAQs/entities, weak EEAT, poor buyer guidance, weak/duplicate intent, over-optimization, weak CTA), (3) **Competitor advantages**, (4) **Content-gap analysis**, (5) **Semantic-gap analysis**, (6) **Exact improvements needed**. Then rewrite the same file (do not paraphrase — materially improve depth, structure, trust, intent coverage) and refresh its `content/_strategy/<slug>.md`. Bump `updatedAt`. Keep what already works; replace what the audit flagged.

## Step 1 — Research & VERIFY (do not skip, do not trust marketing)

- Fetch the product URL. Then cross-check **≥2 independent sources** (retail listings, owner reviews, reputable test outlets, spec databases, Scamadviser/trust-checks).
- Label every spec in prose as **verified / manufacturer-claimed / owner-reported** (mirror tikitunes/smartydrone language).
- Watch for **funnel / dropship red flags** and surface them honestly — this is the E-E-A-T differentiator: single-product funnel URLs (`?prod=`, `/intl_*/`), countdown/scarcity timers, no Amazon/retail presence, syndicated PR "reviews" (often in newspaper "marketplace" sections), Scamadviser flags, dead/parked review domains, refund/chargeback friction.
- Decide `rating` (0–5, decimals) and each `subScore` **only after** verification. Be willing to rate low (the SmartyDrone honest verdict was 2.4) — credibility beats affiliate optimism.

## Step 2 — Map to frontmatter (do NOT write these as body prose)

Fill the MDX frontmatter per the template. The platform auto-renders / auto-generates all of this:

| Brief asks for | Goes in |
| --- | --- |
| Meta title + 5 title variants | `seo.title` = the one chosen; all 5 → strategy file |
| Meta description + 5 variants | `seo.description` = the one chosen; all 5 → strategy file |
| URL slug | the `.mdx` filename (clean, exact-match, no year) |
| Quick Verdict Box / TL;DR | `rating` + `verdict` (auto `VerdictBox`) — don't repeat as prose |
| Product Overview Table | `specs[]` (product) / `pricing`+`platform` (software) |
| Pros & Cons | `pros[]` / `cons[]` — don't re-list in body |
| Sub-scores | `subScores[]` |
| 10+ FAQs | `faq[]` (auto FAQ accordion **+ FAQPage JSON-LD**) — author them here, not as prose |
| Review/Product/FAQ/Breadcrumb schema, canonical, OG/Twitter, sitemap | **fully automatic — author nothing** |

Fixed conventions: `author: "jordan-lee"` (only author), `reviewType` = product | software | media, `draft: true` until Velite passes, affiliate links are handled by `AffiliateButton`/`VerdictBox` (`sponsored nofollow`). Set `category` (becomes `/categories/<slug>`). Author **10+ FAQs** matching real voice/AI-overview intent ("Is X a scam?", "Is X worth it?", "What is the real <spec>?").

## Step 3 — Write the body (MDX H2s only — substance, not filler)

Follow the CLAUDE.md outline. Optimize each section for AI extraction & snippets: lead with a concise 40–60 word direct answer, then depth; use question-style H2s; GFM tables for comparisons.

Hook in `## Overview` → feature/benefit sections → `## Performance and real-world use` → `## How we tested` (**REQUIRED** — link `/methodology`, be honest about what was and wasn't tested) → `## How it compares` (GFM markdown table vs named competitors — `ComparisonTable` is roundup-only, unavailable here) → `## Pricing and value` → buyer-guide sections (`## What to look for`, category rules/regulations, `## Common mistakes`) → `## Who it's for (and who should skip it)` → `## The verdict`.

Available MDX components: only `AdSlot`, `AffiliateButton`, `Disclosure`, `NewsletterForm`, `Image`. **Never** hand-add `<Disclosure>` (auto in header) or `<AdSlot>` (auto after body).

**Length:** match the brief's word count if one was given; otherwise go comprehensive and substance-first. Fill length with genuine buyer education (buying guide, regulations like FAA/EASA where relevant, comparisons, troubleshooting) — **never padding**. Cut a section before bloating it; thin/padded content fails Helpful Content.

**Human voice:** conversational trusted-advisor tone, varied sentence length, short paragraphs, honest limitations, no generic AI phrasing, no fake hype, no keyword stuffing, no unrealistic claims.

## Step 4 — Strategy companion (NEVER in the MDX)

Write `content/_strategy/<slug>.md` (the `_`-prefixed dir is outside the build glob). Mirror the structure of `content/_strategy/smartydrone.md`. It must cover every brief deliverable that is NOT on-page:

- [ ] **5 SEO titles** (≤60 chars; numbers/curiosity/mild FOMO/power words) + the one chosen for `seo.title`
- [ ] **5 meta descriptions** (≤160 chars, benefit-led, natural) + the one chosen for `seo.description`
- [ ] **URL slug** + rationale (clean, exact-match, no year)
- [ ] **Existing-article audit** (only if Step 0 took the audit path) — strengths / weaknesses / improvements
- [ ] **Competitor SEO analysis** — top SERP pages, per-competitor strengths & weaknesses
- [ ] **Content-gap analysis** + **semantic-gap analysis** (entities/NLP terms to reinforce) + **opportunity map**
- [ ] **Topical-authority plan** — pillar page + 15+ supporting ideas (comparisons, alternatives, tutorials, troubleshooting, buyer guides, "Best X")
- [ ] **Internal-linking strategy** — silo architecture + anchor-text mix (branded / descriptive / topical; avoid exact-match over-optimization)
- [ ] **Image-SEO table** — featured/comparison/infographic ideas with filenames + ALT text
- [ ] **Keyword-placement notes** (primary in H1/intro/verdict; question H2s for voice + AI Overview; avoid stuffing)
- [ ] **Suggested schema types** (note which are auto-emitted here vs. any extra) + **external authority references** for E-E-A-T

The 10+ FAQs are NOT here — they live in the MDX `faq[]` (Step 2) so they emit FAQPage JSON-LD.

## Step 5 — Validate & finish

1. Run `npx velite build` (or `npm run build`). Fix any Zod/schema errors.
2. Once it passes, flip `draft: false` in the MDX.
3. Report back: the new file paths, chosen title/description/slug, the rating + one-line rationale, any **red flags** you surfaced, and a short summary of the audit/gap analysis. Do **not** paste the full 8k-word article into chat — it lives in the MDX. If the user gave an existing article to audit, summarize strengths / weaknesses / competitor advantages / gaps before the rewrite.

## Guardrails

- Verify before you write; rate after you verify.
- Honesty > affiliate optimism — surfacing red flags IS the ranking thesis.
- Frontmatter for anything auto-rendered; strategy file for anything strategy-only; body only for genuine prose.
- TypeScript-strict repo, mobile-first, accessibility, FTC affiliate compliance are platform-handled — don't fight them.
