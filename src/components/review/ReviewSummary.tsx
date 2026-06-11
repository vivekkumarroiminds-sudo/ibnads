import { SubScores } from "./SubScores";
import { scoreWord } from "./ScoreBadge";
import type { Review } from "@/lib/content";

// The signature "Summary" card, matching the reference game-review theme:
// a dark header, a full-width verdict paragraph, then GOOD / BAD columns with
// solid colored header strips alongside a teal score panel (category bar meters
// on the left, headline score + verdict word on the right). Colors are tuned
// to stay AA-compliant.
export function ReviewSummary({ review }: { review: Review }) {
  const score = Math.max(0, Math.min(5, review.rating));
  const subScores = review.subScores ?? [];
  const hasProsCons = review.pros.length > 0 || review.cons.length > 0;

  return (
    <section
      aria-labelledby="summary-h"
      className="overflow-hidden rounded-2xl border border-border bg-bg"
    >
      {/* Dark header strip. */}
      <h2
        id="summary-h"
        className="bg-footer px-5 py-3 text-sm font-bold uppercase tracking-wider text-footer-fg"
      >
        Summary
      </h2>

      {/* Full-width verdict paragraph. */}
      {review.verdict && (
        <p className="border-b border-border px-5 py-4 text-sm leading-relaxed text-fg sm:px-6">
          {review.verdict}
        </p>
      )}

      {/* GOOD | BAD — two flush columns with a divider. */}
      {hasProsCons && (
        <div className="grid grid-cols-1 divide-y divide-border border-b border-border sm:grid-cols-2 sm:divide-x sm:divide-y-0">
          <ProConColumn label="Good" tone="positive" items={review.pros} />
          <ProConColumn label="Bad" tone="negative" items={review.cons} />
        </div>
      )}

      {/* Teal score panel — full width below GOOD/BAD: category bar meters on
          the left, headline score + verdict word on the right. */}
      <div className="bg-accent p-5 text-accent-fg sm:p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          {subScores.length > 0 && (
            <div className="min-w-0 flex-1">
              <SubScores scores={subScores} tone="onAccent" />
            </div>
          )}
          <div className="flex shrink-0 items-baseline gap-2 sm:flex-col sm:items-end sm:gap-0">
            <span className="text-5xl font-bold leading-none tabular-nums">
              {score.toFixed(1)}
            </span>
            <span className="text-sm font-bold uppercase tracking-wide text-accent-fg/90">
              {scoreWord(score)}
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}

// One GOOD/BAD column: a solid colored header strip over a plain bulleted list.
function ProConColumn({
  label,
  tone,
  items,
}: {
  label: string;
  tone: "positive" | "negative";
  items: string[];
}) {
  const strip = tone === "positive" ? "bg-positive" : "bg-negative";
  const marker = tone === "positive" ? "text-positive" : "text-negative";

  return (
    <div>
      <h3 className={`${strip} px-4 py-2 text-xs font-bold uppercase tracking-wider text-white`}>
        {label}
      </h3>
      {items.length > 0 ? (
        <ul className="divide-y divide-border">
          {items.map((item) => (
            <li key={item} className="flex gap-2 px-4 py-2.5 text-sm text-fg">
              <span aria-hidden="true" className={`mt-0.5 font-bold ${marker}`}>
                {tone === "positive" ? "＋" : "－"}
              </span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="px-4 py-2.5 text-sm text-muted">—</p>
      )}
    </div>
  );
}
