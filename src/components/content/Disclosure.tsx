import Link from "next/link";

// FTC affiliate disclosure. Render on any page that contains affiliate links.
export function Disclosure({ inline = false }: { inline?: boolean }) {
  const text = (
    <>
      We may earn a commission if you buy through links on this page, at no extra
      cost to you.{" "}
      <Link href="/methodology#affiliate-disclosure" className="underline hover:text-fg">
        Learn how this works
      </Link>
      .
    </>
  );

  if (inline) {
    return <p className="text-xs text-muted">{text}</p>;
  }

  return (
    <div className="flex items-start gap-2 rounded-lg border border-border bg-surface px-3 py-2 text-xs text-muted">
      <InfoIcon />
      <p>{text}</p>
    </div>
  );
}

function InfoIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="mt-0.5 shrink-0"
    >
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path d="M12 11v5M12 8h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
