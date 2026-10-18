"use client";
import { useState } from "react";
import { Download, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { downloadExcelReport } from "@/lib/api";

export function DownloadReportButton({ file }: { file: File }) {
  const [busy, setBusy] = useState(false);
  async function run() {
    setBusy(true);
    try {
      const name = await downloadExcelReport(file);
      toast.success(`Downloaded ${name}`);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Could not generate the report.");
    } finally {
      setBusy(false);
    }
  }
  return (
    <button className="btn bg-[#1D4ED8] text-white" onClick={run} disabled={busy}>
      {busy ? <Loader2 className="animate-spin" size={18} aria-hidden /> : <Download size={18} aria-hidden />}
      {busy ? "Generating…" : "Download Excel Report"}
    </button>
  );
}
