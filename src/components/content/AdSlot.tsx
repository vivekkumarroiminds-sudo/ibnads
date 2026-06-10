import { cn } from "@/lib/utils";

// Reserved-height ad placeholder. The fixed min-height prevents layout shift
// (CLS) when an ad script later injects the creative. Wire to AdSense/Mediavine
// by replacing the inner placeholder with the network's <ins> tag.
const sizes = {
  leaderboard: "min-h-[90px] md:min-h-[90px]", // 728x90 / responsive
  rectangle: "min-h-[250px]", // 300x250
  inline: "min-h-[120px]",
};

export function AdSlot({
  format = "rectangle",
  label = true,
  className,
}: {
  format?: keyof typeof sizes;
  label?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex w-full flex-col items-center justify-center rounded-lg border border-dashed border-border bg-surface text-muted",
        sizes[format],
        className
      )}
      aria-hidden="true"
      data-ad-slot={format}
    >
      {label && <span className="text-[10px] uppercase tracking-widest">Advertisement</span>}
    </div>
  );
}
