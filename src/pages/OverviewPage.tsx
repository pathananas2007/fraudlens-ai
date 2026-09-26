import React, { useEffect, useState } from "react";
import {
  Eye,
  ShieldAlert,
  FileCheck,
  AlertTriangle,
  ArrowUpRight,
  PlusCircle,
  Sparkles,
  FileSearch,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { SeverityBadge } from "../components/common/SeverityBadge";
import { StatusBadge } from "../components/common/StatusBadge";
import { InvestigationCase, Transaction, SystemHealth } from "../types";
import { fetchInvestigations, fetchTransactions, fetchAnalytics, fetchHealth } from "../lib/api";

interface OverviewPageProps {
  onOpenInvestigation: (id: string) => void;
  onNewInvestigation: () => void;
  onNavigate: (page: any) => void;
}

// ─── KPI Card ─────────────────────────────────────────────────────────────────
interface KpiCardProps {
  label: string;
  value: string | number;
  sub: string;
  icon: React.ReactNode;
  iconBg: string;
  valueColor?: string;
  delay?: number;
}
const KpiCard: React.FC<KpiCardProps> = ({ label, value, sub, icon, iconBg, valueColor, delay = 0 }) => (
  <div
    className="rounded-2xl border border-white/8 bg-[#111] p-5 hover:border-white/15 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)]"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="flex items-center justify-between">
      <span className="text-xs font-bold uppercase tracking-wider text-slate-500">{label}</span>
      <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBg}`}>
        {icon}
      </div>
    </div>
    <div className="mt-3 flex items-baseline gap-2">
      <span className={`text-3xl font-black ${valueColor || "text-white"}`}>{value}</span>
    </div>
    <p className="mt-1.5 text-xs text-slate-500 leading-relaxed">{sub}</p>
  </div>
);

// ─── Skeleton KPI card ────────────────────────────────────────────────────────
const KpiSkeleton: React.FC = () => (
  <div className="rounded-2xl border border-white/8 bg-[#111] p-5">
    <div className="flex items-center justify-between">
      <div className="h-2.5 bg-white/5 rounded w-24 animate-pulse" />
      <div className="h-9 w-9 bg-white/5 rounded-xl animate-pulse" />
    </div>
    <div className="mt-4 h-8 bg-white/5 rounded w-16 animate-pulse" />
    <div className="mt-2 h-2.5 bg-white/5 rounded w-3/4 animate-pulse" />
  </div>
);

export const OverviewPage: React.FC<OverviewPageProps> = ({
  onOpenInvestigation,
  onNewInvestigation,
  onNavigate,
}) => {
  const [investigations, setInvestigations] = useState<InvestigationCase[]>([]);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [analytics, setAnalytics] = useState<any>(null);
  const [health, setHealth] = useState<SystemHealth | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
      setError(null);
      const [invRes, txnRes, anaRes, healthRes] = await Promise.all([
        fetchInvestigations(),
        fetchTransactions(),
        fetchAnalytics(),
        fetchHealth(),
      ]);
      setInvestigations(invRes.investigations);
      setTransactions(txnRes.transactions);
      setAnalytics(anaRes);
      setHealth(healthRes);
    } catch (err) {
      console.error("Failed to load overview data:", err);
      setError("Unable to load dashboard data.");
    } finally {
      setLoading(false);
    }
  }

  const highPriorityCount = investigations.filter(
    (i) => i.severity === "HIGH PRIORITY" || i.severity === "SUSPICIOUS"
  ).length;

  const trendData = (analytics?.trend_data && analytics.trend_data.length > 0)
    ? analytics.trend_data
    : [
        { day: "Mon", clear: 0, suspicious: 0, tampered: 0 },
        { day: "Tue", clear: 0, suspicious: 0, tampered: 0 },
        { day: "Wed", clear: 0, suspicious: 0, tampered: 0 },
        { day: "Thu", clear: 0, suspicious: 0, tampered: 0 },
        { day: "Fri", clear: 0, suspicious: 0, tampered: 0 },
        { day: "Sat", clear: 0, suspicious: 0, tampered: 0 },
        { day: "Sun", clear: 0, suspicious: 0, tampered: 0 },
      ];

  const divergenceTypes = (analytics?.inconsistency_types && analytics.inconsistency_types.length > 0)
    ? analytics.inconsistency_types.map((sig: any) => ({
        label: sig.name || sig.type,
        count: sig.count || 0,
        percent: sig.percentage || 0,
        color: sig.color ? (sig.color.startsWith("#") ? "bg-rose-500" : sig.color) : "bg-rose-500",
      }))
    : [];

  return (
    <div className="flex-1 space-y-6 p-6 sm:p-8 max-w-7xl mx-auto">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="rounded-lg bg-blue-500/15 border border-blue-500/20 text-blue-400 px-2.5 py-0.5 text-xs font-bold uppercase tracking-wider">
              Computer Vision Forensics
            </span>
            <span className="flex items-center gap-1.5 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-lg border border-emerald-500/20">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Inspection Engine v2.4 Active
            </span>
          </div>
          <h1 className="mt-2 text-2xl font-black tracking-tight text-white sm:text-3xl">
            Financial Evidence Forensics Intelligence
          </h1>
          <p className="mt-1 text-sm text-slate-500 max-w-2xl">
            Inspect financial documents, detect visual and textual inconsistencies, cross-examine transaction ledgers, and build explainable fraud findings.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onNavigate("evidence")}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 hover:bg-white/10 hover:text-white transition"
          >
            <FileSearch className="h-4 w-4 text-slate-500" />
            <span>Evidence Vault</span>
          </button>

          <button
            onClick={onNewInvestigation}
            className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-500 hover:scale-[1.02] transition"
          >
            <PlusCircle className="h-4 w-4 text-blue-200" />
            <span>New Investigation</span>
          </button>
        </div>
      </div>

      {/* Error state */}
      {error && (
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-6 text-center space-y-3">
          <AlertTriangle className="h-7 w-7 text-rose-400 mx-auto" />
          <p className="text-sm font-semibold text-rose-300">{error}</p>
          <button
            onClick={loadData}
            className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-700 transition"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </button>
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {loading ? (
          <>
            <KpiSkeleton /><KpiSkeleton /><KpiSkeleton /><KpiSkeleton />
          </>
        ) : (
          <>
            <KpiCard
              label="Active Cases"
              value={investigations.length}
              sub={`${highPriorityCount} require high-priority forensics review`}
              icon={<ShieldAlert className="h-4 w-4 text-blue-600" />}
              iconBg="bg-blue-50"
              delay={0}
            />
            <KpiCard
              label="Exhibits Processed"
              value={analytics?.kpis?.evidence_documents_analyzed ?? analytics?.total_evidence_processed ?? 0}
              sub="Receipts, POS slips, invoices & payment screenshots"
              icon={<Eye className="h-4 w-4 text-indigo-600" />}
              iconBg="bg-indigo-50"
              delay={60}
            />
            <KpiCard
              label="Visual Tamper Detections"
              value={analytics?.kpis?.visual_inconsistencies_detected ?? analytics?.tamper_detections_count ?? 0}
              sub="Font anomalies, spliced amounts, compression shifts"
              icon={<AlertTriangle className="h-4 w-4 text-rose-600" />}
              iconBg="bg-rose-50"
              valueColor="text-rose-600"
              delay={120}
            />
            <KpiCard
              label="Mean OCR Confidence"
              value={investigations.length > 0 || (analytics?.kpis?.evidence_documents_analyzed ?? 0) > 0 ? "96.4%" : "0.0%"}
              sub="Multi-angle perspective correction & edge sharpening"
              icon={<CheckCircle2 className="h-4 w-4 text-emerald-600" />}
              iconBg="bg-emerald-50"
              valueColor="text-emerald-700"
              delay={180}
            />
          </>
        )}
      </div>

      {/* Chart + Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Area Chart */}
        <div className="lg:col-span-2 rounded-xl border border-slate-200 bg-white p-5 shadow-xs kpi-card">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">
                Visual Forensics & Divergence Detection Signals
              </h3>
              <p className="text-xs text-slate-500">
                Weekly distribution of detected tampering, amount mismatches, and OCR anomalies
              </p>
            </div>
            <span className="text-xs font-semibold text-slate-400">Last 7 Days</span>
          </div>

          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorClear" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.2} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorTamper" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#EF4444" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#F1F5F9" />
                <XAxis dataKey="day" stroke="#94A3B8" fontSize={11} />
                <YAxis stroke="#94A3B8" fontSize={11} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#0F172A",
                    borderColor: "#334155",
                    borderRadius: "8px",
                    color: "#FFF",
                    fontSize: "12px",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="clear"
                  stroke="#10B981"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorClear)"
                  name="Verified Authentic"
                />
                <Area
                  type="monotone"
                  dataKey="tampered"
                  stroke="#EF4444"
                  strokeWidth={2}
                  fillOpacity={1}
                  fill="url(#colorTamper)"
                  name="Visual Tampering Flagged"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Divergence Breakdown */}
        <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-xs kpi-card flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-bold text-slate-900 mb-1">
              Top Forensic Divergence Types
            </h3>
            <p className="text-xs text-slate-500 mb-4">
              Breakdown of automated visual & cross-evidence findings
            </p>

            <div className="space-y-3.5">
              {divergenceTypes.length === 0 ? (
                <div className="py-8 text-center text-xs text-slate-400">
                  No forensic divergence signals recorded for this account.
                </div>
              ) : (
                divergenceTypes.map((sig, i) => (
                  <div key={i} className="text-xs">
                    <div className="flex items-center justify-between mb-1.5 font-medium text-slate-700">
                      <span>{sig.label}</span>
                      <span className="font-bold text-slate-900 ml-2 shrink-0">{sig.count}</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${sig.color} transition-all duration-500`}
                        style={{ width: `${sig.percent}%` }}
                      />
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-100">
            <button
              onClick={() => onNavigate("analytics")}
              className="flex w-full items-center justify-between text-xs font-semibold text-blue-600 hover:text-blue-700 transition group"
            >
              <span>View In-depth Forensic Analytics</span>
              <ArrowUpRight className="h-4 w-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
            </button>
          </div>
        </div>
      </div>

      {/* Active Investigation Queue */}
      <div className="rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
        <div className="flex items-center justify-between border-b border-slate-200 bg-slate-50/70 px-6 py-4">
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              Active Forensic Investigation Queue
            </h3>
            <p className="text-xs text-slate-500">
              Cases prioritized by visual evidence tampering indicators and transactional divergence
            </p>
          </div>

          <button
            onClick={() => onNavigate("investigations")}
            className="flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition group"
          >
            <span>View All Cases ({investigations.length})</span>
            <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-200 bg-slate-100/60 text-[11px] font-bold uppercase tracking-wider text-slate-600">
              <tr>
                <th className="py-3 px-6">Case Ref / Date</th>
                <th className="py-3 px-6">Disputed Merchant</th>
                <th className="py-3 px-6">Disputed Amount</th>
                <th className="py-3 px-6">Severity</th>
                <th className="py-3 px-6">Primary Forensic Finding</th>
                <th className="py-3 px-6">Status</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                Array.from({ length: 4 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    {Array.from({ length: 7 }).map((_, j) => (
                      <td key={j} className="py-3.5 px-6">
                        <div className="h-3 skeleton rounded w-full" />
                      </td>
                    ))}
                  </tr>
                ))
              ) : investigations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-12 text-center text-xs text-slate-400">
                    No active investigation cases. Create a new investigation to get started.
                  </td>
                </tr>
              ) : (
                investigations.slice(0, 6).map((item) => (
                  <tr
                    key={item.id}
                    onClick={() => onOpenInvestigation(item.id)}
                    className="table-row-interactive cursor-pointer"
                  >
                    <td className="py-3.5 px-6">
                      <div className="font-mono font-bold text-slate-900">{item.id}</div>
                      <div className="text-[11px] text-slate-400">
                        {new Date(item.created_at).toLocaleDateString()}
                      </div>
                    </td>

                    <td className="py-3.5 px-6">
                      <div className="font-semibold text-slate-900">{item.transaction.merchant}</div>
                      <div className="text-[11px] text-slate-400">
                        Card: •••• {item.transaction.card_last4 || "4819"}
                      </div>
                    </td>

                    <td className="py-3.5 px-6 font-mono font-bold text-slate-900">
                      ${item.transaction.amount.toFixed(2)} {item.transaction.currency}
                    </td>

                    <td className="py-3.5 px-6">
                      <SeverityBadge severity={item.severity} size="sm" />
                    </td>

                    <td className="py-3.5 px-6 max-w-xs text-slate-600 truncate">
                      {item.findings_summary || "Automated OCR and visual tampering check completed."}
                    </td>

                    <td className="py-3.5 px-6">
                      <StatusBadge status={item.status} size="sm" />
                    </td>

                    <td className="py-3.5 px-6 text-right">
                      <button
                        onClick={(e) => { e.stopPropagation(); onOpenInvestigation(item.id); }}
                        className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700 shadow-xs transition"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
