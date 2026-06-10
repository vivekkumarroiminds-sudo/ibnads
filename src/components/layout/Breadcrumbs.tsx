import Link from "next/link";

export interface Crumb {
  name: string;
  url: string;
}

// Renders the visible breadcrumb trail. The matching JSON-LD is emitted
// separately via breadcrumbSchema() so both stay in sync from one source.
export function Breadcrumbs({ trail }: { trail: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm text-muted">
        {trail.map((crumb, i) => {
          const isLast = i === trail.length - 1;
          return (
            <li key={crumb.url} className="flex items-center gap-1">
              {isLast ? (
                <span aria-current="page" className="text-fg">
                  {crumb.name}
                </span>
              ) : (
                <>
                  <Link href={crumb.url} className="focus-ring rounded hover:text-fg">
                    {crumb.name}
                  </Link>
                  <span aria-hidden="true">/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
