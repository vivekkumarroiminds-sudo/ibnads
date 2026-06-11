"use client";

import { useEffect, useState } from "react";

// Reader-reaction bar styled after the reference's green/red "Have your say"
// vote strip. Honest by design: it records the visitor's own vote in
// localStorage (no fabricated tallies, no backend) and shows an acknowledgement.
export function VoteBar({ slug }: { slug: string }) {
  const key = `vote:${slug}`;
  const [vote, setVote] = useState<"up" | "down" | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem(key);
      if (saved === "up" || saved === "down") setVote(saved);
    } catch {
      /* localStorage may be unavailable (private mode) — ignore. */
    }
  }, [key]);

  function cast(choice: "up" | "down") {
    setVote(choice);
    try {
      localStorage.setItem(key, choice);
    } catch {
      /* ignore */
    }
  }

  return (
    <section aria-labelledby="vote-h" className="overflow-hidden rounded-2xl border border-border">
      <h2
        id="vote-h"
        className="bg-fg px-5 py-3 text-sm font-bold uppercase tracking-wider text-bg"
      >
        Was this review helpful?
      </h2>
      <div className="grid grid-cols-2">
        <button
          type="button"
          aria-pressed={vote === "up"}
          onClick={() => cast("up")}
          className={`focus-ring flex min-h-[56px] items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white transition ${
            vote === "up" ? "bg-positive" : "bg-positive/85 hover:bg-positive"
          }`}
        >
          <ThumbIcon /> Yes, helpful
        </button>
        <button
          type="button"
          aria-pressed={vote === "down"}
          onClick={() => cast("down")}
          className={`focus-ring flex min-h-[56px] items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white transition ${
            vote === "down" ? "bg-negative" : "bg-negative/85 hover:bg-negative"
          }`}
        >
          <ThumbIcon className="rotate-180" /> Not really
        </button>
      </div>
      {/* Reserve space + announce politely; only show text once a vote exists. */}
      <p aria-live="polite" className="min-h-[2.5rem] px-5 py-3 text-sm text-muted">
        {mounted && vote
          ? "Thanks for the feedback — it helps us improve our reviews."
          : " "}
      </p>
    </section>
  );
}

function ThumbIcon({ className }: { className?: string }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M2 10h3v10H2V10Zm5 0 4-7c1.1 0 2 .9 2 2v3h5.5c1.1 0 1.9 1 1.6 2.1l-2 7c-.2.9-1 1.5-1.9 1.5H7V10Z" />
    </svg>
  );
}
