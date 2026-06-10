import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { getCategories } from "@/lib/content";
import { NewsletterForm } from "@/components/content/NewsletterForm";

export function Footer() {
  const categories = getCategories().slice(0, 6);
  const year = new Date().getFullYear();

  return (
    <footer className="mt-16 border-t border-border bg-surface">
      <div className="container py-12">
        <div className="grid gap-10 md:grid-cols-4">
          <div className="md:col-span-2">
            <p className="text-lg font-bold text-fg">{siteConfig.name}</p>
            <p className="mt-2 max-w-sm text-sm text-muted">{siteConfig.description}</p>
            <div className="mt-5 max-w-sm">
              <NewsletterForm compact />
            </div>
          </div>

          <nav aria-label="Categories">
            <h2 className="text-sm font-semibold text-fg">Categories</h2>
            <ul className="mt-3 space-y-2">
              {categories.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/categories/${c.slug}`}
                    className="focus-ring rounded text-sm text-muted hover:text-fg"
                  >
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Company">
            <h2 className="text-sm font-semibold text-fg">Company</h2>
            <ul className="mt-3 space-y-2">
              {siteConfig.footer.legal.map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    className="focus-ring rounded text-sm text-muted hover:text-fg"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-10 border-t border-border pt-6 text-sm text-muted">
          <p>
            © {year} {siteConfig.publisher}. Reader-supported — we may earn a commission from links.
          </p>
        </div>
      </div>
    </footer>
  );
}
