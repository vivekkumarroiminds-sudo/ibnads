# ibnads

Mobile-first, SEO-optimized, article-focused **review website** built with Next.js (App Router) + TypeScript + Tailwind. Reviews physical products, software/SaaS, and media (books/movies/games). Monetized via SEO, affiliate, ads, and email.

## Local development

```bash
npm install
cp .env.example .env.local   # optional for local; defaults to https://ibnads.com
npm run dev                  # http://localhost:3000
```

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server (Velite watches `/content`) |
| `npm run build` | Production build (runs Velite content build first) |
| `npm run start` | Serve the production build locally |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run lint` | ESLint |

Content lives as MDX in [`/content`](content) and is typed/validated by Velite. To add a review, copy [`content/reviews/_TEMPLATE.mdx`](content/reviews/_TEMPLATE.mdx) and set `draft: false`.

## Deploy to Vercel

This app is zero-config on Vercel (it auto-detects Next.js). Two paths:

### Option A — GitHub → Vercel (recommended)

1. Create a GitHub repo and push (see "Push to GitHub" below).
2. Go to **vercel.com → Add New → Project → Import** your repo.
3. Framework preset auto-detects **Next.js**. Leave build/output settings at defaults.
4. **Add an Environment Variable:**
   - `NEXT_PUBLIC_SITE_URL` = `https://ibnads.com`  (Production)
5. Click **Deploy**. Every future `git push` to `main` auto-deploys; PRs get preview URLs.

### Option B — Vercel CLI

```bash
npm i -g vercel
vercel            # first run links/creates the project (follow prompts)
vercel --prod     # promote to production
```

Set the env var once: `vercel env add NEXT_PUBLIC_SITE_URL` (enter `https://ibnads.com`, scope: Production).

## Connect your domain (ibnads.com)

1. In the Vercel project → **Settings → Domains → Add** `ibnads.com` (and `www.ibnads.com`).
2. At your domain registrar, point DNS as Vercel instructs:
   - Apex `ibnads.com` → **A** record `76.76.21.21`, or an `ALIAS/ANAME` to `cname.vercel-dns.com`
   - `www` → **CNAME** `cname.vercel-dns.com`
3. Vercel issues HTTPS automatically. Set the apex (or www) as the **primary** domain so the other redirects to it.

## Post-deploy SEO checklist

- [ ] `NEXT_PUBLIC_SITE_URL` set in Vercel → canonical/OG/sitemap URLs use `https://ibnads.com`
- [ ] Verify `https://ibnads.com/sitemap.xml`, `/robots.txt`, `/feed.xml` load
- [ ] Submit the sitemap in **Google Search Console** (add the domain property first)
- [ ] Test a review URL in **Google Rich Results Test** (Review/Product/FAQ schema)
- [ ] Run **Lighthouse** (mobile) on a review page — target ≥95 Perf/SEO/Accessibility

## Go-live config (not done automatically)

- **Brand/domain** — [`src/lib/site.ts`](src/lib/site.ts) (already set to ibnads / ibnads.com)
- **Newsletter** — wire the `TODO` in [`NewsletterForm.tsx`](src/components/content/NewsletterForm.tsx) to your ESP (ConvertKit/Beehiiv)
- **Ads** — drop your AdSense/Mediavine tag into [`AdSlot.tsx`](src/components/content/AdSlot.tsx) (heights already reserved → no layout shift)
- **Analytics** — `@vercel/analytics` + Speed Insights are wired; enable them in the Vercel dashboard

## Architecture

See [`CLAUDE.md`](CLAUDE.md) for the full architecture, conventions, and content-authoring workflow.
