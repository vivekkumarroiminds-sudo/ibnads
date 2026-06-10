import { ScoreBadge } from "./ScoreBadge";
import { AffiliateButton } from "@/components/content/AffiliateButton";
import type { Review } from "@/lib/content";

// The skimmable "bottom line" block placed near the top of a review.
export function VerdictBox({ review }: { review: Review }) {
  return (
    <aside
      aria-label="Verdict"
      className="rounded-2xl border border-border bg-surface p-5 sm:p-6"
    >
      <div className="flex items-start gap-4">
        <ScoreBadge value={review.rating} className="shrink-0" />
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wide text-brand">
            Our verdict
          </p>
          <p className="mt-1 text-base leading-relaxed text-fg">{review.verdict}</p>
        </div>
      </div>

      {review.affiliate && (
        <div className="mt-5">
          <AffiliateButton affiliate={review.affiliate} size="lg" className="w-full" />
        </div>
      )}
    </aside>
  );
}
