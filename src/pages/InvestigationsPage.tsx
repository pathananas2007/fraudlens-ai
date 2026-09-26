import React, { useState, useEffect } from "react";
import {
  ShieldAlert,
  Search,
  PlusCircle,
  Eye,
  FileSearch,
  AlertTriangle,
  RefreshCw,
} from "lucide-react";
import { SeverityBadge } from "../components/common/SeverityBadge";
import { StatusBadge } from "../components/common/StatusBadge";
import { InvestigationCase } from "../types";
import { fetchInvestigations } from "../lib/api";

interface InvestigationsPageProps {
  onOpenInvestigation: (id: string) => void;
  onNewInvestigation: () => void;
}

export const InvestigationsPage: React.FC<InvestigationsPageProps> = ({
  onOpenInvestigation,
  onNewInvestigation,
}) => {
  const [investigations, setInvestigations] = useState<InvestigationCase[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("ALL");
  const [severityFilter, setSeverityFilter] = useState<string>("ALL");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadCases();
  }, [statusFilter, severityFilter, search]);

  async function loadCases() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchInvestigations({
        status: statusFilter === "ALL" ? undefined : statusFilter,
        severity: severityFilter === "ALL" ? undefined : severityFilter,
        search: search || undefined,
      });
      setInvestigations(res.investigations);
    } catch (err) {
      console.error("Failed to load investigations:", err);
      setError("Unable to load investigation cases. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const severityOptions = [
    { id: "ALL", label: "All Severities" },
    { id: "HIGH PRIORITY", label: "High Priority" },
    { id: "SUSPICIOUS", label: "Suspicious" },
    { id: "REVIEW", label: "Review Required" },
    { id: "CLEAR", label: "Clear" },
  ];

  const statusOptions = [
    { id: "ALL", label: "All Statuses" },
    { id: "NEW", label: "New" },
    { id: "INVESTIGATING", label: "Investigating" },
    { id: "IN_REVIEW", label: "In Review" },
    { id: "RESOLVED", label: "Resolved" },
    { id: "DISMISSED", label: "Dismissed" },
  ];

  return (
    <div className="flex-1 space-y-6 p-6 sm:p-8 max-w-7xl mx-auto">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Forensic Investigation Queue
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Cases prioritized by multi-modal evidence divergence, visual tampering flags, and OCR audit results.
          </p>
        </div>

        <button
          onClick={onNewInvestigation}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-500 hover:scale-[1.02] transition self-start sm:self-auto"
        >
          <PlusCircle className="h-4 w-4 text-blue-200" />
          <span>New Investigation</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by merchant, case ID, or card last 4..."
            className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:bg-white/10 transition"
          />
        </div>

        <select
          value={severityFilter}
          onChange={(e) => setSeverityFilter(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white focus:border-blue-500 focus:outline-none transition appearance-none"
        >
          {severityOptions.map((opt) => (
            <option key={opt.id} value={opt.id} className="bg-[#111]">{opt.label}</option>
          ))}
        </select>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-medium text-white focus:border-blue-500 focus:outline-none transition appearance-none"
        >
          {statusOptions.map((opt) => (
            <option key={opt.id} value={opt.id} className="bg-[#111]">{opt.label}</option>
          ))}
        </select>
      </div>

      {/* Error state */}
      {error && (
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-8 text-center space-y-3">
          <AlertTriangle className="h-7 w-7 text-rose-400 mx-auto" />
          <p className="text-sm font-semibold text-rose-300">{error}</p>
          <button
            onClick={loadCases}
            className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-500 transition"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </button>
        </div>
      )}

      {/* Cases Table */}
      {!error && (
        <div className="rounded-2xl border border-white/10 bg-[#111] shadow-xs overflow-hidden">
          {loading ? (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/10 bg-black/40 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="py-3 px-6">Case Identifier</th>
                    <th className="py-3 px-6">Disputed Merchant</th>
                    <th className="py-3 px-6">Disputed Amount</th>
                    <th className="py-3 px-6">Exhibits</th>
                    <th className="py-3 px-6">Severity Rating</th>
                    <th className="py-3 px-6">Primary Forensic Findings</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <tr key={i} className="animate-pulse">
                      {Array.from({ length: 8 }).map((_, j) => (
                        <td key={j} className="py-4 px-6">
                          <div className="h-3 bg-white/5 rounded w-full" />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : investigations.length === 0 ? (
            <div className="p-14 text-center space-y-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/5 border border-white/10 mx-auto">
                <FileSearch className="h-7 w-7 text-slate-500" />
              </div>
              <p className="text-sm font-semibold text-white">No matching investigation cases</p>
              <p className="text-xs text-slate-400">
                Try adjusting your search criteria or create a new investigation.
              </p>
              <button
                onClick={onNewInvestigation}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-500 transition mt-2 shadow-[0_0_15px_rgba(37,99,235,0.3)]"
              >
                <PlusCircle className="h-3.5 w-3.5" />
                New Investigation
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="border-b border-white/10 bg-black/40 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  <tr>
                    <th className="py-3 px-6">Case Identifier</th>
                    <th className="py-3 px-6">Disputed Merchant</th>
                    <th className="py-3 px-6">Disputed Amount</th>
                    <th className="py-3 px-6">Exhibits</th>
                    <th className="py-3 px-6">Severity Rating</th>
                    <th className="py-3 px-6">Primary Forensic Findings</th>
                    <th className="py-3 px-6">Status</th>
                    <th className="py-3 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {investigations.map((item) => (
                    <tr
                      key={item.id}
                      onClick={() => onOpenInvestigation(item.id)}
                      className="group cursor-pointer hover:bg-white/5 transition-colors duration-200"
                    >
                      <td className="py-3.5 px-6">
                        <div className="font-mono font-bold text-white group-hover:text-blue-400 transition-colors duration-150">
                          {item.id}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {new Date(item.created_at).toLocaleDateString()}
                        </div>
                      </td>

                      <td className="py-3.5 px-6">
                        <div className="font-semibold text-white">{item.transaction.merchant}</div>
                        <div className="text-[11px] text-slate-500">
                          Card: •••• {item.transaction.card_last4 || "4819"}
                        </div>
                      </td>

                      <td className="py-3.5 px-6 font-mono font-bold text-white">
                        ${item.transaction.amount.toFixed(2)} {item.transaction.currency}
                      </td>

                      <td className="py-3.5 px-6">
                        <span className="inline-flex items-center gap-1 rounded bg-white/10 px-2 py-0.5 text-xs font-semibold text-slate-300">
                          <FileSearch className="h-3.5 w-3.5 text-slate-400" />
                          <span>{item.evidence_ids?.length || item.evidence_items?.length || 0} Exhibits</span>
                        </span>
                      </td>

                      <td className="py-3.5 px-6">
                        <SeverityBadge severity={item.severity} size="sm" />
                      </td>

                      <td className="py-3.5 px-6 max-w-xs text-slate-400 truncate">
                        {item.findings_summary || "Automated forensics analysis completed."}
                      </td>

                      <td className="py-3.5 px-6">
                        <StatusBadge status={item.status} size="sm" />
                      </td>

                      <td className="py-3.5 px-6 text-right">
                        <button
                          onClick={(e) => { e.stopPropagation(); onOpenInvestigation(item.id); }}
                          className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-blue-500/30 hover:bg-blue-600/20 hover:text-blue-400 transition"
                        >
                          <Eye className="h-3.5 w-3.5" />
                          <span>Open Workspace</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
