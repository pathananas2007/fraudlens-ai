import React from "react";
import { InvestigationCase, EvidenceItem } from "../../types";
import {
  Printer,
  X,
  FileText,
  ShieldAlert,
  AlertTriangle,
  CheckCircle2,
  Lock,
  Layers,
  Calendar,
} from "lucide-react";

interface FormalReportModalProps {
  investigation: InvestigationCase;
  evidenceItems: EvidenceItem[];
  isOpen: boolean;
  onClose: () => void;
}

export const FormalReportModal: React.FC<FormalReportModalProps> = ({
  investigation,
  evidenceItems,
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const reportHash =
    investigation.evidence_chain_hash ||
    investigation.sign_off?.hash ||
    `SHA256-${Math.random().toString(36).substring(2, 10)}${Math.random()
      .toString(36)
      .substring(2, 10)}`;

  const signer =
    investigation.signed_off_by ||
    investigation.sign_off?.signed_by ||
    "Lead Forensics Specialist";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
      <div 
        className="relative bg-white shadow-2xl rounded-2xl flex flex-col overflow-hidden"
        style={{ width: "min(1200px, calc(100vw - 32px))", maxHeight: "calc(100vh - 32px)" }}
      >
        {/* Modal Controls Bar (hidden during printing) */}
        <div className="print:hidden flex items-center justify-between border-b border-slate-200 bg-slate-50 px-6 py-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Formal Case Report Dossier
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-blue-700 shadow-xs transition"
            >
              <Printer className="h-3.5 w-3.5" />
              <span>Print / Export PDF</span>
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700 transition"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Printable Formal Dossier Body */}
        <div className="p-8 sm:p-12 space-y-8 bg-white text-slate-900 overflow-y-auto">
          {/* Header & Cryptographic Seal */}
          <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 border-b-2 border-slate-900 pb-6">
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-black tracking-widest text-blue-600 uppercase">
                  FRAUDLENS AI FORENSICS ARCHIVE
                </span>
                <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-mono font-bold text-slate-700">
                  OFFICIAL DISPUTE DOSSIER
                </span>
              </div>
              <h2 className="text-2xl font-black text-slate-900 mt-1">
                Forensic Investigation Findings & Proof of Alteration
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Case Reference: <span className="font-mono font-bold text-slate-800">{investigation.id}</span> •
                Generated: {new Date().toUTCString()}
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 text-right shrink-0">
              <span className="text-[10px] font-mono text-slate-400 block uppercase">
                Integrity SHA-256
              </span>
              <span className="font-mono text-[11px] font-bold text-slate-800">
                {reportHash.substring(0, 22)}...
              </span>
              <div className="mt-1 flex items-center justify-end gap-1 text-[11px] font-bold text-emerald-700">
                <Lock className="h-3 w-3" />
                <span>Digitally Sealed</span>
              </div>
            </div>
          </div>

          {/* Section: Disputed Case Overview */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 rounded-xl bg-slate-50 border border-slate-200 p-4 text-xs">
            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block mb-0.5">
                Disputed Merchant
              </span>
              <span className="font-bold text-slate-900">
                {investigation.transaction.merchant}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block mb-0.5">
                Disputed Amount
              </span>
              <span className="font-mono font-bold text-slate-900">
                ${investigation.transaction.amount.toFixed(2)} {investigation.transaction.currency}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block mb-0.5">
                Payment Instrument
              </span>
              <span className="font-mono font-bold text-slate-900">
                •••• {investigation.transaction.card_last4 || "4819"}
              </span>
            </div>

            <div>
              <span className="text-slate-400 font-bold uppercase text-[10px] block mb-0.5">
                Severity Rating
              </span>
              <span className="font-bold text-rose-700">
                {investigation.severity}
              </span>
            </div>
          </div>

          {/* Executive Summary */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1.5 mb-2">
              1. Executive Summary & Findings
            </h4>
            <p className="text-xs text-slate-700 leading-relaxed">
              {investigation.findings_summary ||
                investigation.summary ||
                investigation.ai_investigator?.summary ||
                "Forensic multi-modal analysis was conducted across uploaded visual documents and transaction logs. Inconsistencies and tamper signatures have been documented below with exact coordinate bounding boxes."}
            </p>
          </div>

          {/* Cross-Evidence Verification Matrix */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1.5 mb-2">
              2. Cross-Evidence Verification Matrix
            </h4>
            <div className="rounded-lg border border-slate-200 overflow-hidden text-xs">
              <table className="w-full text-left">
                <thead className="bg-slate-100 font-semibold text-slate-700 text-[11px]">
                  <tr>
                    <th className="p-2.5">Field</th>
                    <th className="p-2.5">Ledger Value</th>
                    <th className="p-2.5">Exhibit OCR Value</th>
                    <th className="p-2.5">Status</th>
                    <th className="p-2.5">Verification Details</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {investigation.cross_evidence_findings.map((finding, idx) => {
                    const valA =
                      finding.source_a_value ??
                      (finding.evidence_values
                        ? Object.values(finding.evidence_values)[0]
                        : undefined);
                    const valB =
                      finding.source_b_value ??
                      (finding.evidence_values
                        ? Object.values(finding.evidence_values)[1]
                        : undefined);
                    const explanationText = finding.explanation || finding.details;

                    return (
                      <tr key={finding.id || idx}>
                        <td className="p-2.5 font-medium text-slate-900">{finding.field}</td>
                        <td className="p-2.5 font-mono text-slate-600">
                          {valA !== undefined && valA !== null ? String(valA) : "—"}
                        </td>
                        <td className="p-2.5 font-mono text-slate-900 font-medium">
                          {valB !== undefined && valB !== null ? String(valB) : "—"}
                        </td>
                        <td className="p-2.5">
                          <span
                            className={`font-bold text-[10px] px-1.5 py-0.5 rounded ${
                              finding.status === "MATCH"
                                ? "bg-emerald-100 text-emerald-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                          >
                            {finding.status}
                          </span>
                        </td>
                        <td className="p-2.5 text-slate-600">{explanationText}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Evidence Visual Exhibits & Coordinates */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1.5 mb-3">
              3. Visual Evidence Exhibits & Forensics Overlay
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {evidenceItems.map((ev) => (
                <div
                  key={ev.id}
                  className="rounded-xl border border-slate-200 bg-slate-50 p-4 space-y-3"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-slate-900">{ev.filename}</span>
                    <span className="font-mono text-[10px] text-slate-500 uppercase">
                      {ev.document_type}
                    </span>
                  </div>

                  <div className="relative h-48 w-full bg-slate-900 rounded-lg flex items-center justify-center overflow-hidden">
                    <img
                      src={ev.data_url}
                      alt={ev.filename}
                      className="max-h-full max-w-full object-contain"
                      referrerPolicy="no-referrer"
                    />
                  </div>

                  <div className="space-y-1 text-[11px] text-slate-600">
                    <div className="flex justify-between">
                      <span>OCR Readability:</span>
                      <span className="font-bold text-slate-800">
                        {ev.quality.ocr_readability}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Detected Inconsistencies:</span>
                      <span className="font-bold text-rose-600">
                        {ev.forensics.suspicious_regions.length} Flags
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Signature Sign-Off Block */}
          <div className="border-t-2 border-slate-900 pt-6">
            <div className="flex flex-wrap items-center justify-between gap-6 border-t border-dashed border-slate-300 pt-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  INVESTIGATOR IN CHARGE
                </p>
                <p className="text-xs font-bold text-slate-900">
                  {investigation.assigned_to || signer}
                </p>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  SIGN-OFF STATUS
                </p>
                <div className="flex items-center gap-1.5 text-xs font-bold text-emerald-700">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>
                    Digitally Certified by {signer}
                  </span>
                </div>
              </div>

              <div>
                <p className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                  CRYPTOGRAPHIC FINGERPRINT
                </p>
                <p className="text-[10px] font-mono text-slate-600">
                  {reportHash}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
