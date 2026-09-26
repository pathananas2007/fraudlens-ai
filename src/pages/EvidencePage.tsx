import React, { useState, useEffect } from "react";
import {
  FileSearch,
  UploadCloud,
  AlertTriangle,
  Eye,
  CheckCircle2,
  X,
  Sparkles,
  Plus,
  Search,
  RefreshCw,
} from "lucide-react";
import { EvidenceItem, DocumentType } from "../types";
import { fetchEvidenceList } from "../lib/api";
import { ForensicViewer } from "../components/evidence/ForensicViewer";
import { EvidenceUploader } from "../components/evidence/EvidenceUploader";

const EvidenceCardSkeleton: React.FC = () => (
  <div className="rounded-2xl border border-white/10 bg-[#111] overflow-hidden">
    <div className="h-44 bg-white/5 animate-pulse" />
    <div className="p-4 space-y-3">
      <div className="h-3 bg-white/5 rounded w-3/4 animate-pulse" />
      <div className="h-2.5 bg-white/5 rounded w-1/2 animate-pulse" />
      <div className="space-y-1.5 pt-1">
        <div className="h-2 bg-white/5 rounded animate-pulse" />
        <div className="h-2 bg-white/5 rounded w-5/6 animate-pulse" />
      </div>
    </div>
  </div>
);

// ─── Evidence Card ────────────────────────────────────────────────────────────
interface EvidenceCardProps {
  item: EvidenceItem;
  onClick: () => void;
}
const EvidenceCard: React.FC<EvidenceCardProps> = ({ item, onClick }) => {
  const hasTampering = item.forensics.suspicious_regions.length > 0;

  return (
    <div
      onClick={onClick}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#111] hover:border-white/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] cursor-pointer"
    >
      {/* Thumbnail with zoom-on-hover */}
      <div className="relative h-44 w-full bg-[#0a0a0a] overflow-hidden">
        <img
          src={item.data_url}
          alt={item.filename}
          loading="lazy"
          className="h-full w-full object-contain p-3 transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />

        {/* Forensic status badge */}
        <div className="absolute top-2.5 right-2.5">
          {hasTampering ? (
            <span className="flex items-center gap-1 rounded-md bg-rose-500/90 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm backdrop-blur-md">
              <AlertTriangle className="h-3 w-3" />
              <span>{item.forensics.suspicious_regions.length} Flags</span>
            </span>
          ) : (
            <span className="flex items-center gap-1 rounded-md bg-emerald-500/90 px-2 py-0.5 text-[10px] font-bold text-white shadow-sm backdrop-blur-md">
              <CheckCircle2 className="h-3 w-3" />
              <span>Verified</span>
            </span>
          )}
        </div>

        {/* Doc type label */}
        <span className="absolute bottom-2.5 left-2.5 rounded bg-black/80 px-2 py-0.5 text-[10px] font-mono text-slate-300 uppercase tracking-wider backdrop-blur-md border border-white/10">
          {item.document_type}
        </span>
      </div>

      {/* Card Body */}
      <div className="flex flex-1 flex-col justify-between p-4 space-y-3">
        <div>
          <h3 className="font-bold text-xs text-white truncate group-hover:text-blue-400 transition-colors duration-200">
            {item.filename}
          </h3>
          <p className="text-[11px] text-slate-500 mt-0.5">
            {new Date(item.created_at || item.uploaded_at || Date.now()).toLocaleString()}
          </p>
        </div>

        {/* Metadata chips */}
        <div className="rounded-lg bg-white/5 border border-white/10 p-2.5 space-y-1.5 text-[11px]">
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Merchant:</span>
            <span className="font-semibold text-white truncate max-w-[120px]">
              {item.extracted_fields.merchant || "Not Detected"}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-slate-400">Extracted Total:</span>
            <span className="font-mono font-bold text-white">
              {item.extracted_fields.amount ? `$${item.extracted_fields.amount.toFixed(2)}` : "—"}
            </span>
          </div>
        </div>

        {/* Quality bar */}
        <div className="flex items-center justify-between border-t border-white/10 pt-2 text-[11px] text-slate-500">
          <span>Quality: {item.quality.score}/100</span>
          <span className="font-mono font-semibold text-blue-400">
            OCR: {item.quality.ocr_readability}%
          </span>
        </div>
      </div>

      {/* CTA Footer — becomes prominent on hover */}
      <div className="border-t border-white/10 bg-white/5 px-4 py-2.5 flex items-center justify-between text-xs font-semibold text-slate-400 group-hover:bg-blue-600 group-hover:text-white group-hover:border-blue-500 transition-colors duration-200">
        <span>Open Forensic Inspector</span>
        <Eye className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
      </div>
    </div>
  );
};

// ─── Page ─────────────────────────────────────────────────────────────────────
export const EvidencePage: React.FC = () => {
  const [evidenceList, setEvidenceList] = useState<EvidenceItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedEvidence, setSelectedEvidence] = useState<EvidenceItem | null>(null);
  const [isUploaderOpen, setIsUploaderOpen] = useState(false);
  const [docTypeFilter, setDocTypeFilter] = useState<string>("ALL");
  const [tamperFilter, setTamperFilter] = useState<string>("ALL");
  const [search, setSearch] = useState("");

  useEffect(() => {
    loadEvidence();
  }, [docTypeFilter, search]);

  async function loadEvidence() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchEvidenceList({
        document_type: docTypeFilter === "ALL" ? undefined : docTypeFilter,
        search: search || undefined,
      });
      setEvidenceList(res.evidence);
    } catch (err) {
      console.error("Failed to load evidence:", err);
      setError("Unable to load evidence exhibits. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const filteredEvidence = evidenceList.filter((item) => {
    if (tamperFilter === "FLAGGED") return item.forensics.suspicious_regions.length > 0;
    if (tamperFilter === "CLEAN") return item.forensics.suspicious_regions.length === 0;
    return true;
  });

  return (
    <div className="flex-1 space-y-6 p-6 sm:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Evidence Vault & Forensics Repository
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Catalog of financial document exhibits analyzed for visual tampering, OCR layout consistency, and transactional alignment.
          </p>
        </div>

        <button
          onClick={() => setIsUploaderOpen(true)}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-500 hover:scale-[1.02] transition self-start sm:self-auto"
        >
          <Plus className="h-4 w-4 text-blue-200" />
          <span>Upload Exhibit</span>
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search exhibits by filename, merchant, or extracted text..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:bg-white/10 transition"
          />
        </div>

        <select
          value={docTypeFilter}
          onChange={(e) => setDocTypeFilter(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white focus:border-blue-500 focus:outline-none transition appearance-none"
        >
          <option value="ALL" className="bg-[#111]">All Document Types</option>
          <option value="RECEIPT" className="bg-[#111]">Receipts</option>
          <option value="INVOICE" className="bg-[#111]">Invoices</option>
          <option value="POS_SLIP" className="bg-[#111]">POS Slips</option>
          <option value="PAYMENT_SCREENSHOT" className="bg-[#111]">Payment Screenshots</option>
          <option value="BANK_STATEMENT" className="bg-[#111]">Bank Statements</option>
        </select>

        <select
          value={tamperFilter}
          onChange={(e) => setTamperFilter(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white focus:border-blue-500 focus:outline-none transition appearance-none"
        >
          <option value="ALL" className="bg-[#111]">All Forensics Status</option>
          <option value="FLAGGED" className="bg-[#111]">Visual Inconsistencies Only</option>
          <option value="CLEAN" className="bg-[#111]">Verified Authentic Only</option>
        </select>
      </div>

      {/* Content */}
      {error ? (
        /* Error state */
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-10 text-center space-y-3">
          <AlertTriangle className="h-8 w-8 text-rose-400 mx-auto" />
          <p className="text-sm font-semibold text-rose-300">Unable to load evidence</p>
          <p className="text-xs text-rose-400/80">{error}</p>
          <button
            onClick={loadEvidence}
            className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-500 transition"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </button>
        </div>
      ) : loading ? (
        /* Skeleton loading grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: 6 }).map((_, i) => (
            <EvidenceCardSkeleton key={i} />
          ))}
        </div>
      ) : filteredEvidence.length === 0 ? (
        /* Empty state */
        <div className="rounded-2xl border border-dashed border-white/20 bg-white/5 p-14 text-center space-y-3">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 mx-auto border border-white/10">
            <FileSearch className="h-7 w-7 text-slate-500" />
          </div>
          <p className="text-sm font-semibold text-white">No matching exhibits found</p>
          <p className="text-xs text-slate-400">Upload an exhibit to begin forensic analysis.</p>
          <button
            onClick={() => setIsUploaderOpen(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition mt-2 shadow-[0_0_15px_rgba(37,99,235,0.3)]"
          >
            <UploadCloud className="h-3.5 w-3.5" />
            Upload Document Exhibit
          </button>
        </div>
      ) : (
        /* Card grid */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredEvidence.map((item) => (
            <EvidenceCard
              key={item.id}
              item={item}
              onClick={() => setSelectedEvidence(item)}
            />
          ))}
        </div>
      )}

      {/* Forensic Inspector Modal */}
      {selectedEvidence && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fadeIn">
          <div
            className="relative bg-[#111] border border-white/10 shadow-[0_0_80px_rgba(0,0,0,0.8)] rounded-2xl flex flex-col overflow-hidden"
            style={{ width: "min(1200px, calc(100vw - 32px))", maxHeight: "calc(100vh - 32px)" }}
          >
            {/* Sticky modal header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-[#0a0a0a] px-6 py-4 shrink-0">
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-blue-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-white">
                  Visual Forensics & Tamper Inspection
                </span>
              </div>
              <button
                onClick={() => setSelectedEvidence(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:bg-white/10 hover:text-white transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Scrollable body */}
            <div className="modal-body-scroll p-5 bg-[#111]">
              <ForensicViewer evidence={selectedEvidence} />
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal */}
      {isUploaderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs animate-fadeIn">
          <div
            className="w-full rounded-2xl overflow-hidden"
            style={{ maxWidth: "560px", maxHeight: "calc(100vh - 32px)", overflowY: "auto" }}
          >
            <EvidenceUploader
              onEvidenceUploaded={(newEv) => {
                setEvidenceList((prev) => [newEv, ...prev]);
                setIsUploaderOpen(false);
                setSelectedEvidence(newEv);
              }}
              onCancel={() => setIsUploaderOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};
