import React from "react";
import { CrossEvidenceFinding } from "../../types";
import { CheckCircle2, AlertTriangle, XCircle, HelpCircle, Sparkles } from "lucide-react";

interface CrossEvidenceMatrixProps {
  findings: CrossEvidenceFinding[];
}

export const CrossEvidenceMatrix: React.FC<CrossEvidenceMatrixProps> = ({ findings }) => {
  const getStatusBadge = (status: CrossEvidenceFinding["status"]) => {
    switch (status) {
      case "MATCH":
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-emerald-50 border border-emerald-200 px-2 py-0.5 text-xs font-semibold text-emerald-800">
            <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600" />
            <span>MATCH</span>
          </span>
        );
      case "MISMATCH":
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-rose-50 border border-rose-200 px-2 py-0.5 text-xs font-semibold text-rose-800">
            <XCircle className="h-3.5 w-3.5 text-rose-600" />
            <span>MISMATCH</span>
          </span>
        );
      case "PARTIAL":
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-amber-50 border border-amber-200 px-2 py-0.5 text-xs font-semibold text-amber-800">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />
            <span>PARTIAL</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 border border-slate-200 px-2 py-0.5 text-xs font-semibold text-slate-700">
            <HelpCircle className="h-3.5 w-3.5 text-slate-500" />
            <span>{status}</span>
          </span>
        );
    }
  };

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
      <div className="border-b border-slate-200 bg-slate-50/80 px-4 py-3 flex items-start justify-between">
        <div>
          <h4 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
            Cross-Evidence Verification Matrix
            <span className="inline-flex items-center gap-1 rounded bg-blue-100 px-1.5 py-0.5 text-[9px] font-bold text-blue-700 tracking-wide">
              <Sparkles className="h-2.5 w-2.5" /> AI VERIFIED
            </span>
          </h4>
          <p className="text-xs text-slate-500 mt-1">
            Automated AI comparison between primary transaction ledger and OCR-extracted document exhibits.
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead className="border-b border-slate-200 bg-slate-100/70 text-[11px] font-bold uppercase tracking-wider text-slate-600">
            <tr>
              <th className="py-2.5 px-4">Field Attribute</th>
              <th className="py-2.5 px-4">Ledger Record</th>
              <th className="py-2.5 px-4">Document Exhibit</th>
              <th className="py-2.5 px-4">Status</th>
              <th className="py-2.5 px-4">Forensic Finding & Explanation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {findings.map((finding, idx) => {
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
                <tr
                  key={finding.id || `finding-${idx}`}
                  className={`transition ${
                    finding.status === "MISMATCH"
                      ? "bg-rose-50/30 hover:bg-rose-50/60"
                      : "hover:bg-slate-50/80"
                  }`}
                >
                  <td className="py-3 px-4 font-semibold text-slate-800">
                    {finding.field}
                  </td>
                  <td className="py-3 px-4 font-mono font-medium text-slate-700">
                    {valA !== undefined && valA !== null ? String(valA) : "—"}
                  </td>
                  <td className="py-3 px-4 font-mono font-medium text-slate-900">
                    {valB !== undefined && valB !== null ? String(valB) : "—"}
                  </td>
                  <td className="py-3 px-4">
                    {getStatusBadge(finding.status)}
                  </td>
                  <td className="py-3 px-4 text-slate-600 max-w-xs leading-relaxed">
                    {explanationText}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
