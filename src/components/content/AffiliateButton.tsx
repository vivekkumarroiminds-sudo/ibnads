import { cn } from "@/lib/utils";

interface Affiliate {
  merchant: string;
  url: string;
  price?: string;
}

// Affiliate CTA. ALWAYS rel="sponsored nofollow" for FTC/SEO compliance.
// data-affiliate makes outbound clicks easy to track later (GA/analytics).
export function AffiliateButton({
  affiliate,
  size = "md",
  className,
}: {
  affiliate: Affiliate;
  size?: "md" | "lg";
  className?: string;
}) {
  const sizes = {
    md: "h-11 px-5 text-sm",
    lg: "h-14 px-6 text-base",
  };

  return (
    <a
      href={affiliate.url}
      target="_blank"
      rel="sponsored nofollow noopener"
      data-affiliate={affiliate.merchant}
      className={cn(
        // Full-width by default — a 100%-width CTA is the standard, tappable
        // mobile pattern. Pass a width class to override where inline is wanted.
        "focus-ring flex w-full items-center justify-center gap-2 rounded-xl bg-brand font-semibold text-brand-fg transition hover:opacity-90",
        sizes[size],
        className
      )}
    >
      <span>
        {affiliate.price ? `Check Price` : "View Deal"} at {affiliate.merchant}
      </span>
      {affiliate.price && (
        <span className="rounded-md bg-brand-fg/15 px-2 py-0.5 text-sm">
          {affiliate.price}
        </span>
      )}
      <ArrowIcon />
    </a>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 17 17 7M9 7h8v8"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
