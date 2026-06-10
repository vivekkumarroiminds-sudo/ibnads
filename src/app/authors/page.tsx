import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { getAuthors, getReviewsByAuthor } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Our Reviewers",
  description: "The experts behind our hands-on reviews and testing.",
  path: "/authors",
});

export default function AuthorsPage() {
  const authors = getAuthors();
  const trail = [
    { name: "Home", url: "/" },
    { name: "Authors", url: "/authors" },
  ];

  return (
    <Container className="py-8 sm:py-12">
      <Breadcrumbs trail={trail} />
      <h1 className="text-3xl font-bold tracking-tight text-fg sm:text-4xl">Our reviewers</h1>
      <p className="mt-2 text-muted">Independent experts who test before they write.</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {authors.map((a) => (
          <Link
            key={a.slug}
            href={a.url}
            className="focus-ring flex items-center gap-4 rounded-2xl border border-border bg-bg p-5 transition hover:shadow-lg"
          >
            {a.avatar ? (
              <Image
                src={a.avatar.src}
                alt={a.name}
                width={56}
                height={56}
                className="h-14 w-14 rounded-full object-cover"
              />
            ) : (
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-brand/10 text-xl font-bold text-brand">
                {a.name.charAt(0)}
              </div>
            )}
            <div>
              <p className="font-semibold text-fg">{a.name}</p>
              {a.role && <p className="text-sm text-muted">{a.role}</p>}
              <p className="text-xs text-muted">{getReviewsByAuthor(a.slugAsParams).length} reviews</p>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
