export function SpecsTable({ specs }: { specs: { label: string; value: string }[] }) {
  if (!specs.length) return null;
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <table className="w-full text-sm">
        <caption className="sr-only">Specifications</caption>
        <tbody>
          {specs.map((s, i) => (
            <tr key={s.label} className={i % 2 ? "bg-surface" : "bg-bg"}>
              <th scope="row" className="w-1/2 px-4 py-3 text-left font-medium text-muted">
                {s.label}
              </th>
              <td className="px-4 py-3 text-fg">{s.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
