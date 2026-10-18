export function EmptyState() {
  return (
    <section className="relative md:col-span-4" aria-label="Getting started">
      <div className="panel relative min-h-[220px] overflow-hidden bg-[#F5F1E6] p-6">
        <div aria-hidden className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-[#FACC15]" />
        <div aria-hidden className="absolute bottom-0 right-6 h-24 w-6 bg-[#E6392F]" />
        <div aria-hidden className="absolute bottom-6 right-16 h-0 w-0 border-x-[28px] border-b-[48px] border-x-transparent border-b-[#1D4ED8]" />
        <h2 className="display relative text-3xl">No report yet</h2>
        <p className="relative mt-3 max-w-[22ch] font-medium text-[#374151]">Upload a file or load the demo data to see your score, issues, and charts.</p>
      </div>
    </section>
  );
}
