import type { Insight } from "@/lib/types";

const TONE = { success: "bg-[#86EFAC]", warning: "bg-[#FACC15]", critical: "bg-[#E6392F] text-white", info: "bg-white" };

export function ReportPreview({ insights }: { insights: Insight[] }) {
  return (
    <section className="relative md:col-span-7" aria-label="Insights">
      <div aria-hidden className="absolute -left-3 -top-3 hidden h-16 w-16 bg-[#E6392F] md:block" />
      <div className="panel relative p-5">
        <h3 className="display mb-4 text-2xl md:text-3xl">What needs attention</h3>
        <ul className="space-y-3">
          {insights.slice(0, 5).map((i, k) => (
            <li key={k} className={`border-l-[10px] border-black p-3 font-medium ${TONE[i.severity]} ${i.kind === "action" ? "font-bold" : ""}`}>{i.text}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
