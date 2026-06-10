import { absoluteUrl } from "@/lib/site";

// Static share links — no client JS, no third-party trackers.
export function ShareBar({ path, title }: { path: string; title: string }) {
  const url = absoluteUrl(path);
  const enc = encodeURIComponent;
  const links = [
    { label: "Share on X", href: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}` },
    { label: "Share on Facebook", href: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}` },
    { label: "Share on LinkedIn", href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { label: "Share by email", href: `mailto:?subject=${enc(title)}&body=${enc(url)}` },
  ];

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium text-muted">Share</span>
      <ul className="flex gap-1">
        {links.map((l) => (
          <li key={l.label}>
            <a
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={l.label}
              className="focus-ring inline-flex h-9 items-center rounded-lg border border-border px-3 text-xs font-medium text-muted hover:text-fg"
            >
              {l.label.replace("Share on ", "").replace("Share by ", "")}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
