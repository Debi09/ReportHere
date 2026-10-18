"use client";
import { Fragment, useMemo, useState } from "react";
import { ChevronDown, ChevronRight, Search } from "lucide-react";
import type { ColumnProfile } from "@/lib/types";
import { STATUS_STYLE } from "@/lib/utils";

export function ColumnProfileTable({ profiles }: { profiles: ColumnProfile[] }) {
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState<string | null>(null);
  const rows = useMemo(() => profiles.filter((p) => p.column.toLowerCase().includes(query.toLowerCase())), [profiles, query]);

  return (
    <section className="panel p-5 md:col-span-12" aria-label="Column profile">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-3">
        <h3 className="display text-xl">Column profile</h3>
        <label className="flex items-center gap-2 border-[3px] border-black bg-white px-3 py-2">
          <Search size={16} aria-hidden />
          <input className="bg-transparent outline-none" placeholder="Search columns" value={query} onChange={(e) => setQuery(e.target.value)} aria-label="Search columns" />
        </label>
      </div>
      <div className="overflow-x-auto border-2 border-black">
        <table className="w-full text-left text-sm">
          <thead className="bg-black text-white"><tr>
            {["Column", "Inferred Type", "Missing %", "Unique Values", "Invalid Values", "Status"].map((h) => <th key={h} className="p-2">{h}</th>)}
          </tr></thead>
          <tbody>
            {rows.length === 0 && <tr><td colSpan={6} className="p-3">No columns match &quot;{query}&quot;.</td></tr>}
            {rows.map((p) => (
              <Fragment key={p.column}>
                <tr className="border-t-2 border-black">
                  <td className="p-2 font-bold">
                    <button className="flex items-center gap-1 text-left" aria-expanded={open === p.column} onClick={() => setOpen(open === p.column ? null : p.column)}>
                      {open === p.column ? <ChevronDown size={16} /> : <ChevronRight size={16} />}{p.column}
                    </button>
                  </td>
                  <td className="p-2">{p.inferred_type}</td><td className="p-2">{p.missing_pct}%</td>
                  <td className="p-2">{p.unique_count}</td><td className="p-2">{p.invalid_count}</td>
                  <td className="p-2"><span className={`px-2 py-0.5 font-bold ${STATUS_STYLE[p.status]}`}>{p.status}</span></td>
                </tr>
                {open === p.column && (
                  <tr className="bg-[#F5F1E6]"><td colSpan={6} className="p-4">
                    <dl className="grid grid-cols-2 gap-x-6 gap-y-2 sm:grid-cols-4">
                      {([["Pandas dtype", p.pandas_dtype], ["Non-null", p.non_null_count], ["Missing", p.missing_count], ["Duplicate values", p.duplicate_value_count],
                        ["Min", p.min], ["Max", p.max], ["Mean", p.mean], ["Most frequent", p.most_frequent]] as const).map(([k, v]) => (
                        <div key={k}><dt className="text-xs font-medium text-[#374151]">{k}</dt><dd className="font-bold">{v ?? "n/a"}</dd></div>
                      ))}
                    </dl>
                    <p className="mt-3 text-sm"><b>Sample values:</b> {p.sample_values.join(", ") || "none"}</p>
                    {p.issues.map((i) => <p key={i.issue_type} className="mt-1 text-sm"><b>{i.issue_type} ({i.count}):</b> {i.examples.join(", ")}</p>)}
                  </td></tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
