"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import type { SearchRecord } from "@/lib/content";
import { RatingStars } from "@/components/review/RatingStars";
import { Badge } from "@/components/ui/Badge";

interface Scored extends SearchRecord {
  score: number;
}

// Weighted substring ranking — title > category > body keywords.
function rank(index: SearchRecord[], query: string): Scored[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const terms = q.split(/\s+/);

  return index
    .map((rec) => {
      const title = rec.title.toLowerCase();
      let score = 0;
      for (const term of terms) {
        if (title.includes(term)) score += 10;
        if (rec.category.toLowerCase().includes(term)) score += 4;
        if (rec.keywords.includes(term)) score += 1;
      }
      // Require every term to match somewhere.
      const allMatch = terms.every(
        (t) => title.includes(t) || rec.keywords.includes(t)
      );
      return { ...rec, score: allMatch ? score : 0 };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score);
}

export function SearchClient({ index }: { index: SearchRecord[] }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initial = searchParams.get("q") ?? "";
  const [query, setQuery] = useState(initial);
  const inputRef = useRef<HTMLInputElement>(null);

  // Focus the field on mount for a search-first experience.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Keep the URL's ?q= in sync (shareable, restores on reload) without
  // pushing history entries on every keystroke.
  useEffect(() => {
    const params = new URLSearchParams();
    if (query.trim()) params.set("q", query.trim());
    const qs = params.toString();
    router.replace(qs ? `/search?${qs}` : "/search", { scroll: false });
  }, [query, router]);

  const results = useMemo(() => rank(index, query), [index, query]);
  const hasQuery = query.trim().length > 0;

  return (
    <div>
      <div className="relative">
        <SearchIcon />
        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search reviews, guides, categories…"
          aria-label="Search"
          className="focus-ring h-14 w-full rounded-xl border border-border bg-bg pl-12 pr-4 text-base text-fg placeholder:text-muted"
        />
      </div>

      <div className="mt-6" aria-live="polite">
        {!hasQuery && (
          <p className="text-muted">Start typing to search our reviews and buying guides.</p>
        )}

        {hasQuery && results.length === 0 && (
          <p className="text-muted">
            No matches for <span className="font-medium text-fg">“{query}”</span>. Try a broader term.
          </p>
        )}

        {results.length > 0 && (
          <>
            <p className="mb-4 text-sm text-muted">
              {results.length} result{results.length === 1 ? "" : "s"}
            </p>
            <ul className="divide-y divide-border">
              {results.map((r) => (
                <li key={r.url}>
                  <Link
                    href={r.url}
                    className="focus-ring group flex flex-col gap-2 rounded-lg py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <div className="mb-1 flex items-center gap-2">
                        <Badge tone={r.type === "roundup" ? "positive" : "brand"}>
                          {r.type === "roundup" ? "Guide" : r.category}
                        </Badge>
                      </div>
                      <p className="font-semibold text-fg group-hover:text-brand">{r.title}</p>
                      <p className="mt-0.5 line-clamp-1 text-sm text-muted">{r.excerpt}</p>
                    </div>
                    <div className="flex shrink-0 items-center gap-4">
                      {typeof r.rating === "number" && <RatingStars value={r.rating} size="sm" />}
                      {r.price && <span className="text-sm font-semibold text-fg">{r.price}</span>}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
      className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-muted"
    >
      <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
      <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
