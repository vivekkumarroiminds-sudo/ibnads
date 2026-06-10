// Single source of truth for brand + domain. Change here, not across files.

export const siteConfig = {
  name: "ibnads",
  shortName: "ibnads",
  description:
    "Independent, hands-on reviews of products, software, and media — tested with a transparent methodology so you can buy with confidence.",
  // No trailing slash. Override in production via NEXT_PUBLIC_SITE_URL.
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") || "https://ibnads.com",
  locale: "en_US",
  themeColor: "#0ea5e9",
  twitter: "@ibnads",
  publisher: "ibnads",
  nav: [
    { label: "Reviews", href: "/reviews" },
    { label: "Best Of", href: "/roundups" },
    { label: "Categories", href: "/categories" },
    { label: "How We Test", href: "/methodology" },
    { label: "About", href: "/about" },
  ],
  footer: {
    legal: [
      { label: "About", href: "/about" },
      { label: "How We Test", href: "/methodology" },
      { label: "Affiliate Disclosure", href: "/methodology#affiliate-disclosure" },
    ],
  },
} as const;

export type SiteConfig = typeof siteConfig;

export function absoluteUrl(path: string): string {
  if (!path.startsWith("/")) path = `/${path}`;
  return `${siteConfig.url}${path}`;
}
