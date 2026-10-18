import type { AnalysisResult } from "@/lib/types";

export function DuplicateSummary({ r }: { r: AnalysisResult }) {
  const da = r.duplicate_analysis;
  const none = !da.full_duplicate_rows && !da.identifier_duplicates.length && !da.duplicate_column_names.length;
  return (
    <section className="panel p-5 md:col-span-12" aria-label="Duplicates">
      <h3 className="display mb-3 text-xl">Duplicates</h3>
      {none ? <p className="font-medium">No duplicate rows, identifiers, or column names found.</p> : (
        <>
          <ul className="mb-4 list-inside list-disc font-medium">
            <li>{da.full_duplicate_rows} fully duplicated row(s)</li>
            {da.identifier_duplicates.map((d) => (
              <li key={d.column}>{d.duplicate_rows} repeated value(s) in &quot;{d.column}&quot; (e.g. {d.examples.slice(0, 3).join(", ")})</li>
            ))}
            {da.duplicate_column_names.length > 0 && <li>Repeated column names: {da.duplicate_column_names.join(", ")}</li>}
          </ul>
          {r.duplicate_samples.length > 0 && (
            <div className="overflow-x-auto border-2 border-black">
              <table className="w-full text-left text-sm">
                <thead className="bg-black text-white"><tr>
                  <th className="p-2">Row</th><th className="p-2">Match</th>
                  {r.file_metadata.column_names.map((c) => <th key={c} className="p-2">{c}</th>)}
                </tr></thead>
                <tbody>{r.duplicate_samples.map((d, i) => (
                  <tr key={i} className="border-t-2 border-black">
                    <td className="p-2 font-bold">{d.row_number}</td><td className="p-2">{d.match_type}</td>
                    {r.file_metadata.column_names.map((c) => <td key={c} className="p-2">{d.values[c] ?? ""}</td>)}
                  </tr>
                ))}</tbody>
              </table>
            </div>
          )}
        </>
      )}
    </section>
  );
}
