"use client";
import { useDropzone } from "react-dropzone";
import { AlertTriangle, FileSpreadsheet, UploadCloud } from "lucide-react";
import { formatBytes, validateFile } from "@/lib/utils";

interface Props {
  file: File | null;
  loading: boolean;
  error: string | null;
  onSelect: (file: File | null, error?: string) => void;
  onAnalyze: () => void;
}

export function UploadZone({ file, loading, error, onSelect, onAnalyze }: Props) {
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    multiple: false, noClick: true, disabled: loading,
    onDrop: (accepted, rejected) => {
      const f = accepted[0] ?? rejected[0]?.file;
      if (!f) return;
      const problem = validateFile(f);
      problem ? onSelect(null, problem) : onSelect(f);
    },
  });

  return (
    <section aria-label="Upload" className="relative md:col-span-8">
      <div aria-hidden className="absolute -left-3 -top-3 hidden h-full w-full bg-[#1D4ED8] md:block" />
      <div {...getRootProps()} className={`panel relative p-6 md:p-10 ${isDragActive ? "bg-[#FACC15]" : ""}`}>
        <input {...getInputProps()} aria-label="Choose a CSV or Excel file" />
        <div className="flex flex-col items-start gap-5">
          <UploadCloud size={44} aria-hidden />
          <h2 className="display text-3xl md:text-5xl">Drop a CSV or Excel file here</h2>
          <p className="font-medium text-[#374151]">Allowed: CSV, XLS, XLSX. Recommended maximum 4 MB. The first sheet is analyzed.</p>
          <div className="flex flex-wrap gap-3">
            <button className="btn bg-white" onClick={open} disabled={loading}>Browse files</button>
            {file && (
              <button className="btn bg-[#E6392F] text-white" onClick={onAnalyze} disabled={loading}>
                {loading ? "Analyzing dataset…" : "Analyze Data"}
              </button>
            )}
          </div>
          {file && (
            <p className="flex items-center gap-2 border-2 border-black bg-[#F5F1E6] px-3 py-2 font-bold">
              <FileSpreadsheet size={18} aria-hidden /> {file.name} <span className="font-medium text-[#374151]">({formatBytes(file.size)})</span>
            </p>
          )}
          {loading && (
            <div role="progressbar" aria-label="Analyzing" className="relative h-3 w-full overflow-hidden border-2 border-black bg-white">
              <div className="pulse-bar absolute h-full w-1/3 bg-[#1D4ED8]" />
            </div>
          )}
          {error && (
            <div role="alert" className="flex w-full items-start gap-3 border-[3px] border-black bg-[#E6392F] p-4 font-bold text-white">
              <AlertTriangle aria-hidden className="mt-0.5 shrink-0" />
              <div className="flex-1">
                <p>{error}</p>
                {file && !loading && <button className="btn mt-3 bg-white text-black" onClick={onAnalyze}>Retry</button>}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
