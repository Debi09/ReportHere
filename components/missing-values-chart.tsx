"use client";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import type { MissingValue } from "@/lib/types";

export function MissingValuesChart({ data }: { data: MissingValue[] }) {
  const rows = data.slice(0, 15).map((d) => ({ column: d.column, pct: d.missing_pct }));
  if (rows.every((r) => r.pct === 0)) return <p className="font-medium">No missing values in any column.</p>;
  return (
    <div style={{ height: Math.max(220, rows.length * 34) }} role="img" aria-label="Missing value percentage per column">
      <ResponsiveContainer>
        <BarChart data={rows} layout="vertical" margin={{ left: 10, right: 20 }}>
          <XAxis type="number" domain={[0, 100]} unit="%" />
          <YAxis type="category" dataKey="column" width={110} tick={{ fontSize: 12 }} />
          <Tooltip formatter={(v) => `${v}%`} />
          <Bar dataKey="pct" fill="#E6392F" stroke="#111" strokeWidth={2} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
