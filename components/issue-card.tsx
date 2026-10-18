interface Props { label: string; value: number | string; tone: "neutral" | "good" | "warn" | "bad" }
const TONE = { neutral: "bg-white", good: "bg-[#86EFAC]", warn: "bg-[#FACC15]", bad: "bg-[#E6392F] text-white" };

export function IssueCard({ label, value, tone }: Props) {
  return (
    <div className={`panel p-4 ${TONE[tone]}`}>
      <p className="text-sm font-bold">{label}</p>
      <p className="display mt-1 text-4xl">{typeof value === "number" ? value.toLocaleString() : value}</p>
    </div>
  );
}
