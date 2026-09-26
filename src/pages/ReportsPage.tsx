import React, { useState, useEffect } from "react";
import {
  FileCheck,
  Search,
  Eye,
  CheckCircle2,
  Lock,
  AlertTriangle,
  RefreshCw,
  FileSearch,
} from "lucide-react";
import { FormalReportRecord, InvestigationCase, EvidenceItem } from "../types";
import { fetchReports, fetchInvestigationById, fetchEvidenceById } from "../lib/api";
import { FormalReportModal } from "../components/investigation/FormalReportModal";

// Skeleton report card
const ReportCardSkeleton: React.FC = () => (
  <div className="rounded-2xl border border-white/10 bg-[#111] animate-cardEntrance flex flex-col">
    <div className="h-3 bg-white/5 animate-pulse rounded mx-5 mt-5 w-1/3" />
    <div className="h-4 bg-white/5 animate-pulse rounded mx-5 mt-3 w-2/3" />
    <div className="px-5 pb-4 mt-4 space-y-2">
      <div className="h-2.5 bg-white/5 animate-pulse rounded w-full" />
      <div className="h-2.5 bg-white/5 animate-pulse rounded w-4/5" />
      <div className="h-2.5 bg-white/5 animate-pulse rounded w-3/5" />
    </div>
    <div className="border-t border-white/10 px-5 py-3 flex justify-between mt-auto">
      <div className="h-6 bg-white/5 animate-pulse rounded w-20" />
      <div className="h-6 bg-white/5 animate-pulse rounded w-24" />
    </div>
  </div>
);

// Premium report card — Sheryians card style
interface ReportCardProps {
  report: FormalReportRecord;
  onOpen: () => void;
}
const ReportCard: React.FC<ReportCardProps> = ({ report, onOpen }) => (
  <div
    onClick={onOpen}
    className="group flex flex-col rounded-2xl border border-white/10 bg-[#111] hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] cursor-pointer animate-cardEntrance"
  >
    {/* Header strip */}
    <div className="px-5 pt-5 pb-3 border-b border-white/10">
      <div className="flex items-start justify-between gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10 transition-all duration-200 group-hover:bg-blue-600 group-hover:border-blue-500">
          <FileCheck className="h-5 w-5 text-blue-400 transition-colors duration-200 group-hover:text-white" />
        </div>
        <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[10px] font-bold text-emerald-400 shrink-0">
          <CheckCircle2 className="h-3 w-3 text-emerald-500" />
          Certified
        </span>
      </div>

      <div className="mt-3">
        <p className="font-mono text-[10px] text-blue-400 font-bold tracking-wider">
          REF: {report.case_id}
        </p>
        <h3 className="text-sm font-bold text-white mt-0.5 group-hover:text-blue-400 transition-colors duration-200 line-clamp-1">
          {report.merchant || report.title || "Forensic Investigation Dossier"}
        </h3>
        <p className="text-[11px] text-slate-500 mt-0.5">
          {new Date(report.created_at || report.generated_at || Date.now()).toLocaleDateString()}
        </p>
      </div>
    </div>

    {/* Metadata */}
    <div className="flex-1 px-5 py-3 space-y-2 text-[11px] bg-[#0a0a0a]/50">
      <div className="flex items-center justify-between">
        <span className="text-slate-400">Disputed Amount:</span>
        <span className="font-mono font-bold text-white">
          {report.amount !== undefined ? `$${report.amount.toFixed(2)}` : "—"}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-slate-400">Certified Investigator:</span>
        <span className="font-semibold text-white truncate max-w-[120px]">
          {report.signed_by || report.investigator_name || "Investigator"}
        </span>
      </div>
      <div className="flex items-center justify-between">
        <span className="text-slate-400">SHA-256:</span>
        <span className="font-mono text-slate-500 text-[10px]">
          {(report.sha256_hash || report.integrity_hash || "").substring(0, 14)}…
        </span>
      </div>
    </div>

    {/* CTA footer — Sheryians style reveal */}
    <div className="border-t border-white/10 bg-white/5 px-5 py-2.5 flex items-center justify-between text-xs font-semibold text-slate-400 rounded-b-2xl group-hover:bg-blue-600 group-hover:text-white transition-colors duration-200">
      <span>Inspect Dossier</span>
      <Eye className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </div>
  </div>
);

export const ReportsPage: React.FC = () => {
  const [reports, setReports] = useState<FormalReportRecord[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const [selectedCase, setSelectedCase] = useState<InvestigationCase | null>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem[]>([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [openingId, setOpeningId] = useState<string | null>(null);

  useEffect(() => {
    loadReports();
  }, []);

  async function loadReports() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchReports();
      setReports(res.reports);
    } catch (err) {
      console.error("Failed to load formal reports:", err);
      setError("Unable to load formal reports. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const handleOpenReport = async (caseId: string) => {
    setOpeningId(caseId);
    try {
      const c = await fetchInvestigationById(caseId);
      setSelectedCase(c);
      const evidenceIds = c.evidence_ids || c.evidence_items?.map((item) => item.id) || [];
      const items = await Promise.all(
        evidenceIds.map(async (eid) => {
          try { return await fetchEvidenceById(eid); } catch { return null; }
        })
      );
      setSelectedEvidence(items.filter((x): x is EvidenceItem => x !== null));
      setModalOpen(true);
    } catch (err) {
      console.error("Failed to fetch report case:", err);
    } finally {
      setOpeningId(null);
    }
  };

  const filteredReports = reports.filter(
    (r) =>
      r.case_id.toLowerCase().includes(search.toLowerCase()) ||
      (r.merchant || r.title || "").toLowerCase().includes(search.toLowerCase()) ||
      (r.signed_by || r.investigator_name || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-6 p-6 sm:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 animate-slideInUp">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Formal Case Reports & Export Dossiers
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Digitally certified investigation findings, evidence chains of custody, and cryptographic SHA-256 integrity hashes for bank dispute submission.
          </p>
        </div>
      </div>

      {/* Search */}
      <div className="relative animate-fadeIn">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search by case reference, merchant, or investigator name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:bg-white/10 transition-all duration-200"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-10 text-center space-y-3 animate-fadeIn">
          <AlertTriangle className="h-7 w-7 text-rose-400 mx-auto" />
          <p className="text-sm font-semibold text-rose-300">{error}</p>
          <button
            onClick={loadReports}
            className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-500 transition"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </button>
        </div>
      )}

      {/* Cards Grid */}
      {!error && (
        <>
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {Array.from({ length: 6 }).map((_, i) => (
                <ReportCardSkeleton key={i} />
              ))}
            </div>
          ) : filteredReports.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-14 text-center space-y-3 animate-fadeIn">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 mx-auto">
                <FileSearch className="h-7 w-7 text-slate-500" />
              </div>
              <p className="text-sm font-semibold text-white">No formal reports found</p>
              <p className="text-xs text-slate-400">No formal reports match your search query.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredReports.map((r) => (
                <ReportCard
                  key={r.id}
                  report={r}
                  onOpen={() => handleOpenReport(r.case_id)}
                />
              ))}
            </div>
          )}
        </>
      )}

      {/* Formal Report Modal */}
      {selectedCase && (
        <FormalReportModal
          investigation={selectedCase}
          evidenceItems={selectedEvidence}
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};
