export function DashboardSkeleton() {
  const block = "border-[3px] border-black bg-[#D1D5DB]";
  return (
    <div className="grid gap-6 md:grid-cols-12" aria-busy="true" aria-label="Analyzing dataset">
      <p className="display text-2xl md:col-span-12">Analyzing dataset…</p>
      <div className={`${block} h-56 md:col-span-4`} />
      <div className="grid gap-4 sm:grid-cols-2 md:col-span-8 lg:grid-cols-3">
        {Array.from({ length: 5 }).map((_, i) => <div key={i} className={`${block} h-24`} />)}
      </div>
      <div className={`${block} h-72 md:col-span-8`} />
      <div className={`${block} h-72 md:col-span-4`} />
    </div>
  );
}
