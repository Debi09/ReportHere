import type { FileMetadata } from "@/lib/types";

export function FileSummary({ meta }: { meta: FileMetadata }) {
  const items = [
    ["File", meta.filename], ["Type", meta.file_type.toUpperCase()], ["Sheet", meta.sheet_name ?? "n/a"],
    ["Size", `${meta.file_size_kb} KB`], ["Shape", `${meta.rows.toLocaleString()} × ${meta.columns}`],
  ];
  return (
    <dl className="flex flex-wrap gap-x-8 gap-y-2 border-b-[3px] border-black pb-4 md:col-span-12">
      {items.map(([k, v]) => (
        <div key={k}><dt className="text-sm font-medium text-[#374151]">{k}</dt><dd className="break-all font-bold">{v}</dd></div>
      ))}
    </dl>
  );
}
