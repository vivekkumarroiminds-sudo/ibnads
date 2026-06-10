import Link from "next/link";
import type { Review } from "@/lib/content";
import { RatingStars } from "@/components/review/RatingStars";
import { AffiliateButton } from "./AffiliateButton";
import { Badge } from "@/components/ui/Badge";

interface Row {
  review: string;
  badge?: string;
  note?: string;
  reviewData?: Review;
}

// Horizontally scrollable on mobile; sticky first column keeps product names
// visible while scanning across. Used by roundup pages.
export function ComparisonTable({ rows }: { rows: Row[] }) {
  const items = rows.filter((r) => r.reviewData) as (Row & { reviewData: Review })[];
  if (!items.length) return null;

  return (
    <div className="-mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0">
      <table className="w-full min-w-[640px] border-separate border-spacing-0 text-sm">
        <caption className="sr-only">Comparison of top picks</caption>
        <thead>
          <tr className="text-left text-muted">
            <th scope="col" className="sticky left-0 z-10 bg-bg px-3 py-3 font-medium">
              Product
            </th>
            <th scope="col" className="px-3 py-3 font-medium">Rating</th>
            <th scope="col" className="px-3 py-3 font-medium">Price</th>
            <th scope="col" className="px-3 py-3 font-medium">Where to buy</th>
          </tr>
        </thead>
        <tbody>
          {items.map(({ reviewData: r, badge }) => (
            <tr key={r.slug} className="border-t border-border">
              <th
                scope="row"
                className="sticky left-0 z-10 bg-bg px-3 py-4 text-left align-top font-normal"
              >
                {badge && (
                  <Badge tone="positive" className="mb-1">
                    {badge}
                  </Badge>
                )}
                <Link
                  href={r.url}
                  className="focus-ring block rounded font-semibold text-fg hover:text-brand"
                >
                  {r.title.replace(/ Review.*$/i, "")}
                </Link>
              </th>
              <td className="px-3 py-4 align-top">
                <RatingStars value={r.rating} size="sm" />
              </td>
              <td className="px-3 py-4 align-top font-medium text-fg">
                {r.affiliate?.price ?? "—"}
              </td>
              <td className="px-3 py-4 align-top">
                {r.affiliate ? (
                  <AffiliateButton affiliate={r.affiliate} />
                ) : (
                  <Link href={r.url} className="text-brand underline">
                    Read review
                  </Link>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
