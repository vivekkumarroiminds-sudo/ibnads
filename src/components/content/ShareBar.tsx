import { absoluteUrl } from "@/lib/site";

// Static share links — no client JS, no third-party trackers. The fill colors
// below are the platforms' OFFICIAL brand colors (not theme tokens), matching
// the reference's solid Facebook/X share buttons; white text on each passes AA.
const PLATFORMS = [
  { key: "facebook", name: "Facebook", cls: "bg-[#1877F2] hover:bg-[#1668d9]", icon: FacebookIcon },
  { key: "x", name: "X", cls: "bg-[#0f1419] hover:bg-[#272c30]", icon: XIcon },
  { key: "linkedin", name: "LinkedIn", cls: "bg-[#0A66C2] hover:bg-[#08529c]", icon: LinkedInIcon },
  { key: "email", name: "Email", cls: "bg-fg hover:opacity-90", icon: MailIcon },
] as const;

export function ShareBar({ path, title }: { path: string; title: string }) {
  const url = absoluteUrl(path);
  const enc = encodeURIComponent;
  const hrefFor: Record<(typeof PLATFORMS)[number]["key"], string> = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`,
    x: `https://twitter.com/intent/tweet?url=${enc(url)}&text=${enc(title)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}`,
    email: `mailto:?subject=${enc(title)}&body=${enc(url)}`,
  };

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-semibold uppercase tracking-wide text-muted">Share</span>
      <ul className="flex gap-2">
        {PLATFORMS.map(({ key, name, cls, icon: Icon }) => (
          <li key={key}>
            <a
              href={hrefFor[key]}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Share on ${name}`}
              className={`focus-ring inline-flex h-9 w-9 items-center justify-center rounded-lg text-white transition ${cls}`}
            >
              <Icon />
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

function FacebookIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M14 8.5h2.5V5.5H14c-2 0-3.5 1.5-3.5 3.5v2H8v3h2.5V21h3v-7H16l.5-3h-3V9.5c0-.6.4-1 1-1Z" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2H21l-6.56 7.5L22 22h-6.4l-4.5-5.9L5.9 22H3.14l7.02-8.02L2 2h6.56l4.07 5.38L18.244 2Zm-1.12 18h1.55L7.02 3.9H5.36L17.124 20Z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.5 8.5h-3V20h3V8.5ZM5 4a1.75 1.75 0 1 0 0 3.5A1.75 1.75 0 0 0 5 4Zm6 4.5h-2.9V20h3v-6c0-1.6.3-3 2.2-3s1.8 1.7 1.8 3.1V20h3v-6.4c0-3.1-.7-5.4-4.2-5.4-1.7 0-2.6.9-3 1.8h-.1V8.5Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="m4 7 8 6 8-6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
