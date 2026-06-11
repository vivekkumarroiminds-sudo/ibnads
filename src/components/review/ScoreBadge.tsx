import { cn } from "@/lib/utils";

// Maps a 0–5 score to a short verdict word (mirrors the reference's
// POOR / GOOD / GREAT label beside the number).
export function scoreWord(value: number): string {
  const v = Math.max(0, Math.min(5, value));
  if (v >= 4.5) return "Outstanding";
  if (v >= 4) return "Great";
  if (v >= 3.5) return "Good";
  if (v >= 3) return "Decent";
  if (v >= 2) return "Mediocre";
  return "Poor";
}

// Large circular score (out of 5). Used as the headline verdict marker.
export function ScoreBadge({
  value,
  showLabel = false,
  className,
}: {
  value: number;
  showLabel?: boolean;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(5, value));
  const tone =
    clamped >= 4 ? "border-positive text-positive" : clamped >= 3 ? "border-brand text-brand" : "border-negative text-negative";

  return (
    <div className={cn("flex flex-col items-center gap-1", className)}>
      <div
        className={cn(
          "flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 bg-bg",
          tone
        )}
        role="img"
        aria-label={`Score ${clamped.toFixed(1)} out of 5 — ${scoreWord(clamped)}`}
      >
        <span className="text-2xl font-bold leading-none">{clamped.toFixed(1)}</span>
        <span className="text-[10px] font-medium uppercase tracking-wide text-muted">/ 5</span>
      </div>
      {showLabel && (
        <span className={cn("text-xs font-bold uppercase tracking-wide", tone)}>
          {scoreWord(clamped)}
        </span>
      )}
    </div>
  );
}
