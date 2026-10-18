export type Status = "Healthy" | "Warning" | "Critical";
export type Severity = "warning" | "critical";

export interface FileMetadata {
  filename: string; file_type: string; sheet_name: string | null; file_size_kb: number;
  rows: number; columns: number; column_names: string[]; duplicate_column_names: string[];
}
export interface Deduction { factor: string; percentage: number; points: number }
export interface QualityScore {
  score: number; grade: "A" | "B" | "C" | "D" | "F"; label: string; explanation: string; deductions: Deduction[];
}
export interface Summary {
  total_missing_values: number; duplicate_rows: number; empty_rows: number; columns_with_issues: number;
  invalid_value_count: number; format_issue_count: number; duplicate_id_count: number; is_clean: boolean;
}
export interface ColumnIssue { issue_type: string; severity: Severity; count: number; examples: string[] }
export interface ColumnProfile {
  column: string; inferred_type: string; pandas_dtype: string; non_null_count: number;
  missing_count: number; missing_pct: number; unique_count: number; duplicate_value_count: number;
  min: string | number | null; max: string | number | null; mean: number | null; most_frequent: string | null;
  invalid_count: number; issue_count: number; status: Status; sample_values: string[]; issues: ColumnIssue[];
}
export interface MissingValue {
  column: string; missing_count: number; missing_pct: number; data_type: string; unique_count: number; examples: string[];
}
export interface ValidationIssue {
  column: string; issue_type: string; kind: "invalid" | "format" | "duplicate"; severity: Severity; count: number; examples: string[];
}
export interface DuplicateAnalysis {
  full_duplicate_rows: number;
  identifier_duplicates: { column: string; duplicate_rows: number; examples: string[] }[];
  duplicate_column_names: string[];
}
export interface DuplicateSample { row_number: number; match_type: string; values: Record<string, string | null> }
export interface Insight { kind: "finding" | "action"; severity: "success" | "warning" | "critical" | "info"; text: string }

export interface AnalysisResult {
  file_metadata: FileMetadata; quality_score: QualityScore; summary: Summary;
  column_profiles: ColumnProfile[]; missing_values: MissingValue[]; validation_issues: ValidationIssue[];
  duplicate_analysis: DuplicateAnalysis; duplicate_samples: DuplicateSample[]; insights: Insight[];
  report_generated_at: string;
}
