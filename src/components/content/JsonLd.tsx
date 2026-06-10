// Renders one or more JSON-LD objects into a <script> tag.
// Server component — emitted statically into the HTML for crawlers.

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const json = Array.isArray(data) ? data : [data];
  return (
    <>
      {json.map((node, i) => (
        <script
          key={i}
          type="application/ld+json"
          // Schema is built from trusted, typed content — safe to inline.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(node) }}
        />
      ))}
    </>
  );
}
