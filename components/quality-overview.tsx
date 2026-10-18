"use client";
import { Bar, BarChart, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { AnalysisResult } from "@/lib/types";
import { IssueCard } from "./issue-card";
import { MissingValuesChart } from "./missing-values-chart";

const STATUS_COLORS = { Healthy: "#86EFAC", Warning: "#FACC15", Critical: "#E6392F" };

export function QualityOverview({ r }: { r: AnalysisResult }) {
  const s = r.summary;
  const z = (n: number, bad: "warn" | "bad" = "warn") => (n === 0 ? "good" : bad);
  const statusData = (["Healthy", "Warning", "Critical"] as const)
    .map((name) => ({ name, value: r.column_profiles.filter((p) => p.status === name).length }))
    .filter((d) => d.value > 0);
  const byType = Object.entries(
    r.validation_issues.reduce<Record<string, number>>((acc, i) => ({ ...acc, [i.issue_type]: (acc[i.issue_type] ?? 0) + i.count }), {}),
  ).map(([name, count]) => ({ name, count })).sort((a, b) => b.count - a.count).slice(0, 8);

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 md:col-span-8 lg:grid-cols-3">
        <IssueCard label="Total Rows" value={r.file_metadata.rows} tone="neutral" />
        <IssueCard label="Missing Values" value={s.total_missing_values} tone={z(s.total_missing_values)} />
        <IssueCard label="Duplicate Rows" value={s.duplicate_rows} tone={z(s.duplicate_rows, "bad")} />
        <IssueCard label="Invalid Values" value={s.invalid_value_count} tone={z(s.invalid_value_count, "bad")} />
        <IssueCard label="Columns With Issues" value={s.columns_with_issues} tone={z(s.columns_with_issues)} />
      </div>

      {s.is_clean && (
        <p role="status" className="panel bg-[#86EFAC] p-4 text-lg font-bold md:col-span-12">
          Clean data: no missing values, duplicates, or validation issues were found.
        </p>
      )}

      <div className="panel p-5 md:col-span-8">
        <h3 className="display mb-3 text-xl">Missing values by column (%)</h3>
        <MissingValuesChart data={r.missing_values} />
      </div>
      <div className="panel p-5 md:col-span-4">
        <h3 className="display mb-3 text-xl">Column health</h3>
        <div className="h-64" role="img" aria-label="Healthy, warning and critical column counts">
          <ResponsiveContainer>
            <PieChart>
              <Pie data={statusData} dataKey="value" nameKey="name" innerRadius={55} outerRadius={90} stroke="#111" strokeWidth={3} label={(d) => d.value}>
                {statusData.map((d) => <Cell key={d.name} fill={STATUS_COLORS[d.name]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <ul className="mt-2 flex flex-wrap gap-3 text-sm font-bold">
          {Object.entries(STATUS_COLORS).map(([k, c]) => (
            <li key={k} className="flex items-center gap-1"><span className="inline-block h-3 w-3 border-2 border-black" style={{ background: c }} />{k}</li>
          ))}
        </ul>
      </div>
      <div className="panel p-5 md:col-span-12">
        <h3 className="display mb-3 text-xl">Detected issues by type</h3>
        {byType.length === 0 ? <p className="font-medium">No validation issues detected.</p> : (
          <div className="h-64" role="img" aria-label="Issue counts by type">
            <ResponsiveContainer>
              <BarChart data={byType}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} interval={0} />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="count" fill="#1D4ED8" stroke="#111" strokeWidth={2} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </>
  );
}
