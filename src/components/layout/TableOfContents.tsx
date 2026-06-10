"use client";

import { useEffect, useState } from "react";

// Velite's s.toc() entry shape.
interface TocEntry {
  title: string;
  url: string;
  items?: TocEntry[];
}

function flatten(entries: TocEntry[]): TocEntry[] {
  return entries.flatMap((e) => [e, ...(e.items ? flatten(e.items) : [])]);
}

export function TableOfContents({ toc }: { toc: TocEntry[] }) {
  const items = flatten(toc).filter((i) => i.url);
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    const headings = items
      .map((i) => document.getElementById(i.url.replace(/^#/, "")))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "0% 0% -75% 0%", threshold: 0 }
    );

    headings.forEach((h) => observer.observe(h));
    return () => observer.disconnect();
  }, [items]);

  if (items.length < 2) return null;

  return (
    <nav aria-label="Table of contents" className="text-sm">
      <p className="mb-3 font-semibold text-fg">On this page</p>
      <ul className="space-y-2 border-l border-border">
        {items.map((item) => {
          const id = item.url.replace(/^#/, "");
          const active = id === activeId;
          return (
            <li key={item.url}>
              <a
                href={item.url}
                className={`focus-ring -ml-px block border-l-2 pl-3 transition ${
                  active
                    ? "border-brand font-medium text-brand"
                    : "border-transparent text-muted hover:text-fg"
                }`}
              >
                {item.title}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
