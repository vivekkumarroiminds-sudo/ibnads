// Horizontal bar meters for category sub-scores (mirrors the reference's
// GAMEPLAY / GRAPHICS / AUDIO / LONGEVITY bars). `tone="onAccent"` renders for
// placement on the teal score panel; the default renders on a light surface.
export function SubScores({
  scores,
  tone = "default",
}: {
  scores: { label: string; score: number }[];
  tone?: "default" | "onAccent";
}) {
  if (!scores.length) return null;

  const onAccent = tone === "onAccent";

  return (
    <dl className="space-y-3">
      {scores.map((s) => {
        const pct = (Math.max(0, Math.min(5, s.score)) / 5) * 100;
        return (
          <div key={s.label}>
            <div className="flex items-baseline justify-between gap-3">
              <dt
                className={
                  onAccent
                    ? "text-xs font-semibold uppercase tracking-wide text-accent-fg/90"
                    : "text-xs font-semibold uppercase tracking-wide text-muted"
                }
              >
                {s.label}
              </dt>
              <dd
                className={
                  onAccent
                    ? "text-sm font-bold tabular-nums text-accent-fg"
                    : "text-sm font-bold tabular-nums text-fg"
                }
              >
                {s.score.toFixed(1)}
              </dd>
            </div>
            <div
              className={
                onAccent
                  ? "mt-1 h-2 overflow-hidden rounded-full bg-accent-fg/25"
                  : "mt-1 h-2 overflow-hidden rounded-full bg-surface ring-1 ring-inset ring-border"
              }
              role="img"
              aria-label={`${s.label}: ${s.score.toFixed(1)} out of 5`}
            >
              <div
                className={onAccent ? "h-full rounded-full bg-accent-fg" : "h-full rounded-full bg-brand"}
                style={{ width: `${pct}%` }}
              />
            </div>
          </div>
        );
      })}
    </dl>
  );
}
