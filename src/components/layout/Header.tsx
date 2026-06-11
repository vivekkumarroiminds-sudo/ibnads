import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-brand text-brand-fg shadow-sm">
      <div className="container flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="focus-ring rounded text-lg font-bold lowercase tracking-tight text-brand-fg"
        >
          {siteConfig.name}
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {siteConfig.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="focus-ring rounded-lg px-3 py-2 text-sm font-medium text-brand-fg/90 transition hover:bg-white/15 hover:text-brand-fg"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1">
          <Link
            href="/search"
            aria-label="Search"
            className="focus-ring inline-flex h-11 w-11 items-center justify-center rounded-lg text-brand-fg hover:bg-white/15"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
              <path d="m20 20-3.5-3.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </Link>
          <ThemeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  );
}
