export type RiskLevel = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";

export type InvestigationSeverity = "CLEAR" | "REVIEW" | "SUSPICIOUS" | "HIGH PRIORITY";

export type InvestigationStatus = "NEW" | "INVESTIGATING" | "IN_REVIEW" | "RESOLVED" | "DISMISSED";

export type DocumentType =
  | "RECEIPT"
  | "INVOICE"
  | "POS_SLIP"
  | "BANK_STATEMENT"
  | "PAYMENT_SCREENSHOT"
  | "UNKNOWN";

export interface QualityAssessment {
  resolution: "GOOD" | "ACCEPTABLE" | "POOR";
  sharpness: "SHARP" | "MODERATE" | "BLURRY";
  lighting: "UNIFORM" | "UNEVEN" | "POOR";
  perspective: "CORRECTED" | "SLIGHT_SKEW" | "DISTORTED";
  ocr_readability: number; // 0 - 100 percentage
  score: number; // 0 - 100
  warning?: string;
}

export interface BoundingBox {
  x: number; // percentage (0 - 100) or relative
  y: number; // percentage (0 - 100)
  width: number;
  height: number;
}

export interface OcrWordBox {
  id: string;
  box: BoundingBox;
  text: string;
  confidence: number; // 0 to 1
  category?: "AMOUNT" | "MERCHANT" | "DATE" | "TIME" | "REF_ID" | "HEADER" | "TEXT";
}

export interface SuspiciousRegion {
  id: string;
  box: BoundingBox;
  type:
    | "FONT_INCONSISTENCY"
    | "BASELINE_MISALIGNMENT"
    | "COMPRESSION_MISMATCH"
    | "BACKGROUND_SPLICE"
    | "CLONED_PATCH"
    | "EDGE_HALO"
    | "AMOUNT_ALTERATION"
    | "METADATA_DISCREPANCY";
  severity: "HIGH" | "MEDIUM" | "LOW";
  label: string;
  description: string;
  forensic_indicators: string[];
}

export interface ForensicSignals {
  text_region_inconsistency: boolean;
  font_anomaly: boolean;
  compression_inconsistency: boolean;
  cloning_detected: boolean;
  background_inconsistency: boolean;
  edge_artifacts: boolean;
  metadata_alerts: string[];
  suspicious_regions: SuspiciousRegion[];
}

export interface ExtractedFields {
  amount?: number | null;
  currency?: string | null;
  merchant?: string | null;
  reference_id?: string | null;
  date?: string | null;
  time?: string | null;
  payment_method?: string | null;
  account_id?: string | null;
  invoice_number?: string | null;
  terminal_id?: string | null;
  tax?: number | null;
  subtotal?: number | null;
  customer?: string | null;
  due_date?: string | null;
  auth_code?: string | null;
  app_name?: string | null;
  sender?: string | null;
  recipient?: string | null;
  status_text?: string | null;
}

export interface EvidenceItem {
  id: string;
  filename: string;
  mime_type: string;
  file_size_kb: number;
  data_url: string;
  document_type: DocumentType;
  confidence_score: number;
  quality: QualityAssessment;
  ocr_boxes: OcrWordBox[];
  raw_text: string;
  extracted_fields: ExtractedFields;
  forensics: ForensicSignals;
  created_at: string;
  uploaded_at?: string;
  perceptual_hash?: string;
  duplicate_match?: {
    case_number: string;
    similarity: number;
    evidence_id: string;
    note: string;
  };
}

// Backwards compatibility alias for Evidence
export type Evidence = EvidenceItem;

export interface CrossEvidenceFinding {
  id?: string;
  field: string;
  status: "MATCH" | "MISMATCH" | "UNVERIFIABLE" | "PARTIAL";
  details: string;
  severity: "HIGH" | "MEDIUM" | "INFO";
  source_a_value?: string | number | null;
  source_b_value?: string | number | null;
  explanation?: string;
  evidence_values?: Record<string, string | number | undefined | null>;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  display_time: string;
  title: string;
  event?: string;
  source: "TRANSACTION_LEDGER" | "RECEIPT" | "INVOICE" | "POS_TERMINAL" | "GATEWAY";
  description: string;
  is_inconsistent?: boolean;
  divergence_flag?: boolean;
  inconsistency_reason?: string;
}

export interface InvestigationFinding {
  id: string;
  type: "MATCHING_SIGNAL" | "SUSPICIOUS_FINDING" | "MANUAL_CHECK";
  title: string;
  description: string;
  severity?: "HIGH" | "MEDIUM" | "LOW";
  icon_status: "SUCCESS" | "WARNING" | "DANGER" | "INFO";
  evidence_ref?: string;
}

export interface Transaction {
  id: string;
  transaction_id: string;
  amount: number;
  currency: string;
  merchant: string;
  category: string;
  timestamp: string;
  card_last4: string;
  card_type: string;
  country: string;
  features?: Record<string, number>;
  risk_score: number;
  risk_level: RiskLevel;
  status: "FLAGGED" | "CLEARED" | "INVESTIGATING" | "BLOCKED";
  created_at: string;
  discrepancy_note?: string;
  evidence_count?: number;
  model_results?: {
    xgboost: { risk_probability: number; is_fraud: boolean };
    decision_tree: { risk_probability: number; is_fraud: boolean };
    svm: { risk_probability: number; is_fraud: boolean };
    isolation_forest: { anomaly_score: number; is_anomaly: boolean };
  };
}

export interface DuplicateDetectionResult {
  is_duplicate: boolean;
  similarity_score: number;
  matched_case: string;
  matched_evidence_name: string;
  note: string;
}

export interface InvestigationCase {
  id: string;
  case_number: string;
  title: string;
  severity: InvestigationSeverity;
  status: InvestigationStatus;
  created_at: string;
  updated_at: string;
  assigned_to: string;
  summary: string;
  transaction: Transaction;
  evidence_items: EvidenceItem[];
  evidence_ids?: string[];
  evidence_chain_hash?: string;
  findings_summary?: string;
  signed_off_by?: string;
  cross_evidence_findings: CrossEvidenceFinding[];
  timeline: TimelineEvent[];
  findings: InvestigationFinding[];
  duplicate_detection?: DuplicateDetectionResult;
  ai_investigator: {
    summary: string;
    why_flagged: string[];
    evidence_breakdown: string[];
    next_steps: string[];
    questions: string[];
    confidence: "HIGH" | "MEDIUM" | "LOW";
  };
  investigator_notes: string;
  sign_off?: {
    signed_by: string;
    timestamp: string;
    hash: string;
  };

  // Backwards compatibility props for older component references if any:
  evidence?: EvidenceItem | null;
  risk_score?: number;
  risk_level?: RiskLevel;
  evidence_fusion?: any;
  ai_analysis?: any;
  user_context?: string;
}

// Backwards compatibility alias
export type Investigation = InvestigationCase;

export interface FormalReportRecord {
  id: string;
  case_id: string;
  case_number: string;
  title: string;
  severity: InvestigationSeverity;
  status: InvestigationStatus;
  generated_at: string;
  created_at?: string;
  investigator_name: string;
  signed_by?: string;
  merchant?: string;
  amount?: number;
  integrity_hash: string;
  sha256_hash?: string;
  total_evidence_count: number;
  suspicious_findings_count: number;
  is_signed: boolean;
}

export interface MLModelInfo {
  id: string;
  name: string;
  role: string;
  type: string;
  roc_auc: number;
  pr_auc: number;
  precision: number;
  recall: number;
  f1_score: number;
  latency_ms: number;
  description: string;
}

export interface FeatureImportance {
  feature: string;
  importance: number;
  direction: string;
  desc: string;
}

export interface SystemHealth {
  status: string;
  timestamp: string;
  services: {
    api: string;
    cv_engine: string;
    ocr_service: string;
    forensics_analyzer: string;
    ai_investigator: string;
    database: string;
  };
  version: string;
}
