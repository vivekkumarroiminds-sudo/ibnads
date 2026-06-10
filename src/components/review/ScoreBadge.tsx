import { cn } from "@/lib/utils";

// Large circular score (out of 5). Used as the headline verdict marker.
export function ScoreBadge({
  value,
  className,
}: {
  value: number;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(5, value));
  const tone =
    clamped >= 4 ? "border-positive text-positive" : clamped >= 3 ? "border-brand text-brand" : "border-negative text-negative";

  return (
    <div
      className={cn(
        "flex h-20 w-20 flex-col items-center justify-center rounded-full border-4 bg-bg",
        tone,
        className
      )}
      role="img"
      aria-label={`Score ${clamped.toFixed(1)} out of 5`}
    >
      <span className="text-2xl font-bold leading-none">{clamped.toFixed(1)}</span>
      <span className="text-[10px] font-medium uppercase tracking-wide text-muted">/ 5</span>
    </div>
  );
}
