import type { QualityScore } from "@/lib/types";

const COLOR = { A: "#86EFAC", B: "#86EFAC", C: "#FACC15", D: "#E6392F", F: "#E6392F" } as const;

export function QualityScoreCard({ q }: { q: QualityScore }) {
  const dark = q.grade === "D" || q.grade === "F";
  return (
    <section aria-label="Quality score" className="relative md:col-span-4 md:-mb-8 md:translate-y-2">
      <div aria-hidden className="absolute -bottom-3 -right-3 hidden h-full w-full bg-black md:block" />
      <div className="panel relative p-6" style={{ background: COLOR[q.grade], color: dark ? "#fff" : "#111" }}>
        <div className="flex items-start justify-between">
          <p className="font-bold">Data quality score</p>
          <span className="border-[3px] border-black bg-white px-3 py-1 text-2xl font-bold text-black" aria-label={`Grade ${q.grade}`}>{q.grade}</span>
        </div>
        <p className="display mt-2 text-[96px] leading-none md:text-[120px]">{q.score}<span className="text-3xl">/100</span></p>
        <p className="display mt-1 text-2xl">{q.label}</p>
        <p className="mt-4 text-sm font-medium">{q.explanation}</p>
      </div>
    </section>
  );
}
