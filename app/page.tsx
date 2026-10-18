"use client";
import { useState } from "react";
import { toast } from "sonner";
import { AppHeader } from "@/components/app-header";
import { UploadZone } from "@/components/upload-zone";
import { EmptyState } from "@/components/empty-state";
import { DashboardSkeleton } from "@/components/dashboard-skeleton";
import { FileSummary } from "@/components/file-summary";
import { QualityScoreCard } from "@/components/quality-score-card";
import { QualityOverview } from "@/components/quality-overview";
import { DuplicateSummary } from "@/components/duplicate-summary";
import { ValidationTable } from "@/components/validation-table";
import { ColumnProfileTable } from "@/components/column-profile-table";
import { ReportPreview } from "@/components/report-preview";
import { DownloadReportButton } from "@/components/download-report-button";
import { analyzeFile } from "@/lib/api";
import { demoFile } from "@/lib/demo-data";
import type { AnalysisResult } from "@/lib/types";

export default function Page() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function run(f: File) {
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      setResult(await analyzeFile(f));
      toast.success("Analysis complete");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Analysis failed. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function select(f: File | null, err?: string) {
    setFile(f);
    setResult(null);
    setError(err ?? null);
  }

  function loadDemo() {
    const f = demoFile();
    setFile(f);
    run(f);
  }

  return (
    <main>
      <AppHeader onDemo={loadDemo} busy={loading} />
      <div className="mx-auto grid max-w-[1440px] gap-6 px-5 py-10 md:grid-cols-12 md:px-10">
        <UploadZone file={file} loading={loading} error={error} onSelect={select} onAnalyze={() => file && run(file)} />
        {!result && !loading && <EmptyState />}
      </div>

      <div className="mx-auto max-w-[1440px] px-5 pb-16 md:px-10">
        {loading && <DashboardSkeleton />}
        {result && file && (
          <div className="rise grid gap-6 md:grid-cols-12">
            <FileSummary meta={result.file_metadata} />
            <QualityScoreCard q={result.quality_score} />
            <QualityOverview r={result} />
            <ReportPreview insights={result.insights} />
            <section className="panel relative bg-[#FACC15] p-5 md:col-span-5" aria-label="Download report">
              <h3 className="display text-2xl">Excel report</h3>
              <p className="my-3 font-medium">Includes the summary, column profile, missing values, validation issues, duplicates, and a data preview.</p>
              <DownloadReportButton file={file} />
            </section>
            <ColumnProfileTable profiles={result.column_profiles} />
            <ValidationTable issues={result.validation_issues} />
            <DuplicateSummary r={result} />
          </div>
        )}
      </div>
    </main>
  );
}
