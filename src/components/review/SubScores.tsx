import { RatingStars } from "./RatingStars";

export function SubScores({
  scores,
}: {
  scores: { label: string; score: number }[];
}) {
  if (!scores.length) return null;
  return (
    <dl className="grid grid-cols-1 gap-3 sm:grid-cols-2">
      {scores.map((s) => (
        <div
          key={s.label}
          className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface px-4 py-3"
        >
          <dt className="text-sm font-medium text-fg">{s.label}</dt>
          <dd>
            <RatingStars value={s.score} size="sm" />
          </dd>
        </div>
      ))}
    </dl>
  );
}
