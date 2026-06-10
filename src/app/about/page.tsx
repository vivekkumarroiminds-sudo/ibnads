import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/layout/Breadcrumbs";
import { MDXContent } from "@/components/content/MDXContent";
import { JsonLd } from "@/components/content/JsonLd";
import { getPageBySlug } from "@/lib/content";
import { articleSchema, breadcrumbSchema } from "@/lib/schema";
import { buildMetadata } from "@/lib/seo";

const SLUG = "about";

export function generateMetadata(): Metadata {
  const page = getPageBySlug(SLUG);
  if (!page) return {};
  return buildMetadata({
    title: page.title,
    description: page.description ?? "",
    path: `/${SLUG}`,
  });
}

export default function AboutPage() {
  const page = getPageBySlug(SLUG);
  if (!page) notFound();

  const trail = [
    { name: "Home", url: "/" },
    { name: page.title, url: `/${SLUG}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          articleSchema({
            title: page.title,
            description: page.description,
            url: `/${SLUG}`,
            updatedAt: page.updatedAt,
          }),
          breadcrumbSchema(trail),
        ]}
      />
      <Container className="py-8">
        <Breadcrumbs trail={trail} />
        <article className="prose mx-auto max-w-prose dark:prose-invert sm:prose-lg">
          <h1>{page.title}</h1>
          <MDXContent code={page.body} />
        </article>
      </Container>
    </>
  );
}
