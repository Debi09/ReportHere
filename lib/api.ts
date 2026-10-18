import type { AnalysisResult } from "./types";

const BASE = process.env.NEXT_PUBLIC_API_BASE ?? "";

async function failure(res: Response): Promise<Error> {
  try {
    const body = await res.json();
    if (body?.error) return new Error(body.error);
  } catch {}
  if (res.status === 413) return new Error("The file is too large for the server. Use a file under 4 MB.");
  return new Error(`Request failed (${res.status}). Please try again.`);
}

async function post(path: string, file: File): Promise<Response> {
  const form = new FormData();
  form.append("file", file);
  try {
    const res = await fetch(`${BASE}${path}`, { method: "POST", body: form });
    if (!res.ok) throw await failure(res);
    return res;
  } catch (e) {
    if (e instanceof TypeError) throw new Error("Could not reach the analysis server. Is the API running?");
    throw e;
  }
}

export async function analyzeFile(file: File): Promise<AnalysisResult> {
  return (await post("/api/analyze", file)).json();
}

export async function downloadExcelReport(file: File): Promise<string> {
  const res = await post("/api/generate-report", file);
  const blob = await res.blob();
  const match = res.headers.get("Content-Disposition")?.match(/filename="?([^";]+)"?/);
  const name = match?.[1] ?? "data_quality_report.xlsx";
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
  return name;
}

export async function healthCheck(): Promise<boolean> {
  try {
    const res = await fetch(`${BASE}/api/health`);
    return res.ok;
  } catch {
    return false;
  }
}
