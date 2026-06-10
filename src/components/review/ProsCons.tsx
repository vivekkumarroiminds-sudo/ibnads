export function ProsCons({ pros, cons }: { pros: string[]; cons: string[] }) {
  if (!pros.length && !cons.length) return null;
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      {pros.length > 0 && (
        <section className="rounded-xl border border-border bg-positive/5 p-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-positive">
            <PlusIcon /> What we like
          </h3>
          <ul className="mt-3 space-y-2">
            {pros.map((p) => (
              <li key={p} className="flex gap-2 text-sm text-fg">
                <span aria-hidden="true" className="mt-1 text-positive">＋</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
      {cons.length > 0 && (
        <section className="rounded-xl border border-border bg-negative/5 p-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-negative">
            <MinusIcon /> What could be better
          </h3>
          <ul className="mt-3 space-y-2">
            {cons.map((c) => (
              <li key={c} className="flex gap-2 text-sm text-fg">
                <span aria-hidden="true" className="mt-1 text-negative">－</span>
                <span>{c}</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}

function PlusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}

function MinusIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    </svg>
  );
}
