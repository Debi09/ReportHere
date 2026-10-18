import type { ValidationIssue } from "@/lib/types";

export function ValidationTable({ issues }: { issues: ValidationIssue[] }) {
  return (
    <section className="panel p-5 md:col-span-12" aria-label="Validation issues">
      <h3 className="display mb-3 text-xl">Validation issues</h3>
      {issues.length === 0 ? <p className="font-medium">No validation issues detected.</p> : (
        <div className="overflow-x-auto border-2 border-black">
          <table className="w-full text-left text-sm">
            <thead className="bg-black text-white"><tr>
              <th className="p-2">Issue</th><th className="p-2">Column</th><th className="p-2">Severity</th><th className="p-2">Count</th><th className="p-2">Examples</th>
            </tr></thead>
            <tbody>{issues.map((i, k) => (
              <tr key={k} className="border-t-2 border-black align-top">
                <td className="p-2 font-bold">{i.issue_type}</td><td className="p-2">{i.column}</td>
                <td className="p-2"><span className={`px-2 py-0.5 font-bold ${i.severity === "critical" ? "bg-[#E6392F] text-white" : "bg-[#FACC15]"}`}>{i.severity}</span></td>
                <td className="p-2">{i.count}</td><td className="p-2 break-words">{i.examples.join(", ")}</td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}
    </section>
  );
}
