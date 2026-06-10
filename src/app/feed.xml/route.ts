import { siteConfig, absoluteUrl } from "@/lib/site";
import { getReviews, getRoundups } from "@/lib/content";

export const dynamic = "force-static";

function escapeXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const items = [
    ...getReviews().map((r) => ({
      title: r.title,
      url: r.url,
      description: r.excerpt,
      date: r.updatedAt ?? r.publishedAt,
    })),
    ...getRoundups().map((r) => ({
      title: r.title,
      url: r.url,
      description: r.excerpt,
      date: r.updatedAt ?? r.publishedAt,
    })),
  ].sort((a, b) => +new Date(b.date) - +new Date(a.date));

  const entries = items
    .map(
      (item) => `    <item>
      <title>${escapeXml(item.title)}</title>
      <link>${absoluteUrl(item.url)}</link>
      <guid isPermaLink="true">${absoluteUrl(item.url)}</guid>
      <description>${escapeXml(item.description)}</description>
      <pubDate>${new Date(item.date).toUTCString()}</pubDate>
    </item>`
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(siteConfig.name)}</title>
    <link>${siteConfig.url}</link>
    <description>${escapeXml(siteConfig.description)}</description>
    <language>en-us</language>
    <atom:link href="${absoluteUrl("/feed.xml")}" rel="self" type="application/rss+xml" />
${entries}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600",
    },
  });
}
