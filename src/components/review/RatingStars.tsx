import { cn } from "@/lib/utils";

// Accessible star rating. Renders 5 stars with fractional fill via a clipped
// overlay, and exposes the numeric value to screen readers.
export function RatingStars({
  value,
  size = "md",
  showValue = true,
  className,
}: {
  value: number;
  size?: "sm" | "md" | "lg";
  showValue?: boolean;
  className?: string;
}) {
  const clamped = Math.max(0, Math.min(5, value));
  const pct = (clamped / 5) * 100;
  const dim = { sm: "text-base", md: "text-xl", lg: "text-2xl" }[size];

  return (
    <span
      className={cn("inline-flex items-center gap-2", className)}
      role="img"
      aria-label={`${clamped.toFixed(1)} out of 5 stars`}
    >
      <span className={cn("relative inline-block leading-none", dim)} aria-hidden="true">
        <span className="text-border">★★★★★</span>
        <span
          className="absolute inset-0 overflow-hidden whitespace-nowrap text-brand"
          style={{ width: `${pct}%` }}
        >
          ★★★★★
        </span>
      </span>
      {showValue && (
        <span className="text-sm font-semibold text-fg">{clamped.toFixed(1)}</span>
      )}
    </span>
  );
}
