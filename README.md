# ibnads

Mobile-first, SEO-optimized, article-focused review website. Reviews physical products, software/SaaS, and media (books/movies/games). Built with **Next.js (App Router) + TypeScript + Tailwind**, content authored in **MDX** via **Velite**, deployed on **Vercel**.

## Local development

```bash
npm install
npm run dev          # http://localhost:3000  (Velite watches /content)
```

Other scripts:

```bash
npm run build        # velite + next build (production)
npm run start        # serve the production build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
```

Requires Node ≥ 20 (see `.nvmrc`).

## Environment variables

Copy `.env.example` → `.env.local` and set:

| Variable | Purpose |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | Canonical site URL, no trailing slash. Drives canonical tags, OG/Twitter, JSON-LD, sitemap, robots, RSS. |

## Authoring content

- Reviews → `content/reviews/*.mdx` (copy `content/reviews/_TEMPLATE.mdx`)
- Roundups → `content/roundups/*.mdx`
- Authors → `content/authors/*.mdx`
- Static pages → `content/pages/*.mdx`

Schema, canonical, OG/Twitter, sitemap, and RSS are generated automatically. See `CLAUDE.md` for the full authoring workflow and architecture rules.

## Deploy (Vercel)

1. Push this repo to GitHub.
2. In Vercel → **Add New → Project** → import the repo. Framework preset **Next.js** is auto-detected (build `npm run build`, output handled automatically).
3. Add the env var **`NEXT_PUBLIC_SITE_URL`** = `https://ibnads.com` (Production).
4. Deploy. Then add the custom domain `ibnads.com` under **Settings → Domains** and point your DNS as Vercel instructs.

After deploy, submit `https://ibnads.com/sitemap.xml` in Google Search Console.
