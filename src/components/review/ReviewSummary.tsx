import { ProsCons } from "./ProsCons";
import { SubScores } from "./SubScores";
import { scoreWord } from "./ScoreBadge";
import type { Review } from "@/lib/content";

// The signature "Summary" card: GOOD/BAD columns alongside a teal score panel
// with the headline number, verdict word, and category bar meters. Mirrors the
// reference game-review theme's summary block while staying AA-compliant.
export function ReviewSummary({ review }: { review: Review }) {
  const score = Math.max(0, Math.min(5, review.rating));
  const subScores = review.subScores ?? [];
  const hasProsCons = review.pros.length > 0 || review.cons.length > 0;

  return (
    <section aria-labelledby="summary-h" className="overflow-hidden rounded-2xl border border-border bg-bg">
      <h2
        id="summary-h"
        className="bg-brand px-5 py-3 text-sm font-bold uppercase tracking-wider text-brand-fg"
      >
        Summary
      </h2>

      <div className="grid gap-5 p-5 sm:p-6 lg:grid-cols-3">
        {/* GOOD / BAD — spans two of three columns on large screens. */}
        {hasProsCons && (
          <div className="lg:col-span-2">
            <ProsCons pros={review.pros} cons={review.cons} />
          </div>
        )}

        {/* Teal score panel — headline score, verdict word, category meters. */}
        <div
          className={`flex flex-col gap-4 rounded-xl bg-accent p-5 text-accent-fg ${
            hasProsCons ? "" : "lg:col-span-3"
          }`}
        >
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-accent-fg/80">
                Our score
              </p>
              <p className="mt-0.5 text-lg font-bold uppercase tracking-wide">
                {scoreWord(score)}
              </p>
            </div>
            <p className="flex items-baseline font-bold leading-none">
              <span className="text-4xl tabular-nums">{score.toFixed(1)}</span>
              <span className="ml-1 text-base text-accent-fg/70">/5</span>
            </p>
          </div>

          {subScores.length > 0 && (
            <div className="border-t border-accent-fg/20 pt-4">
              <SubScores scores={subScores} tone="onAccent" />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
