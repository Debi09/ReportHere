import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const MAX_BYTES = 4 * 1024 * 1024;
export const ALLOWED = ["csv", "xls", "xlsx"];

export function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
}

export function validateFile(file: File): string | null {
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  if (!ALLOWED.includes(ext)) return `"${file.name}" is not supported. Upload a CSV, XLS, or XLSX file.`;
  if (file.size === 0) return `"${file.name}" is empty.`;
  if (file.size > MAX_BYTES) return `"${file.name}" is ${formatBytes(file.size)}. The limit is 4 MB.`;
  return null;
}

export const STATUS_STYLE = {
  Healthy: "bg-[#86EFAC] text-black",
  Warning: "bg-[#FACC15] text-black",
  Critical: "bg-[#E6392F] text-white",
} as const;
