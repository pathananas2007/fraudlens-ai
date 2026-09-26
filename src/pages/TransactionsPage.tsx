import React, { useState, useEffect } from "react";
import {
  CreditCard,
  Search,
  Download,
  AlertTriangle,
  Eye,
  FileSearch,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { Transaction } from "../types";
import { fetchTransactions } from "../lib/api";

interface TransactionsPageProps {
  onInvestigateTransaction: (txn: Transaction) => void;
}

const SkeletonRow: React.FC = () => (
  <tr className="border-b border-white/5">
    {Array.from({ length: 7 }).map((_, i) => (
      <td key={i} className="py-4 px-6">
        <div className="h-3 bg-white/5 animate-pulse rounded" style={{ width: `${60 + Math.random() * 30}%` }} />
      </td>
    ))}
  </tr>
);

export const TransactionsPage: React.FC<TransactionsPageProps> = ({
  onInvestigateTransaction,
}) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTransactions();
  }, [search]);

  async function loadTransactions() {
    try {
      setLoading(true);
      setError(null);
      const res = await fetchTransactions({ search: search || undefined });
      setTransactions(res.transactions);
    } catch (err) {
      console.error("Failed to load transactions:", err);
      setError("Unable to load transaction ledger. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  const exportCSV = () => {
    const headers = "Transaction_ID,Merchant,Category,Amount,Currency,Card_Last4,Timestamp,Discrepancy\n";
    const rows = transactions
      .map(
        (t) =>
          `"${t.id}","${t.merchant}","${t.category}",${t.amount},"${t.currency}","${t.card_last4}","${t.timestamp}","${t.discrepancy_note || "None"}"`
      )
      .join("\n");
    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `fraudlens_transactions_${Date.now()}.csv`;
    a.click();
  };

  return (
    <div className="flex-1 space-y-6 p-6 sm:p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-white/10 pb-6 animate-slideInUp">
        <div>
          <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
            Transaction Clearing Ledger
          </h1>
          <p className="mt-1 text-sm text-slate-400">
            Authorizations clearing stream cross-referenced against visual evidence exhibits, OCR receipts, and merchant logs.
          </p>
        </div>

        <button
          onClick={exportCSV}
          className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-xs font-semibold text-slate-300 shadow-xs hover:bg-white/10 hover:text-white transition-all duration-200 self-start sm:self-auto"
        >
          <Download className="h-4 w-4 text-slate-400" />
          <span>Export Ledger CSV</span>
        </button>
      </div>

      {/* Search */}
      <div className="relative animate-fadeIn">
        <Search className="absolute left-3 top-2.5 h-4 w-4 text-slate-500" />
        <input
          type="text"
          placeholder="Search by merchant, transaction ID, or card last 4..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-xl border border-white/10 bg-white/5 py-2 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:bg-white/10 transition-all duration-200"
        />
      </div>

      {/* Error */}
      {error && (
        <div className="rounded-2xl border border-rose-500/20 bg-rose-500/10 p-8 text-center space-y-3 animate-fadeIn">
          <AlertTriangle className="h-7 w-7 text-rose-400 mx-auto" />
          <p className="text-sm font-semibold text-rose-300">{error}</p>
          <button
            onClick={loadTransactions}
            className="inline-flex items-center gap-2 rounded-xl bg-rose-600 px-4 py-2 text-xs font-semibold text-white hover:bg-rose-500 transition"
          >
            <RefreshCw className="h-3.5 w-3.5" />
            Retry
          </button>
        </div>
      )}

      {/* Table */}
      {!error && (
        <div className="rounded-2xl border border-white/10 bg-[#111] overflow-hidden animate-cardEntrance">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-white/10 bg-black/40 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <tr>
                  <th className="py-3 px-6">Transaction Ref</th>
                  <th className="py-3 px-6">Merchant & Category</th>
                  <th className="py-3 px-6">Disputed Amount</th>
                  <th className="py-3 px-6">Payment Instrument</th>
                  <th className="py-3 px-6">Evidence Status</th>
                  <th className="py-3 px-6">Forensic Divergence Alert</th>
                  <th className="py-3 px-6 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {loading ? (
                  Array.from({ length: 6 }).map((_, i) => <SkeletonRow key={i} />)
                ) : transactions.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-14 text-center">
                      <div className="flex flex-col items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10">
                          <CreditCard className="h-6 w-6 text-slate-500" />
                        </div>
                        <p className="text-sm font-semibold text-white">No transactions found</p>
                        <p className="text-xs text-slate-400">No transactions matching search criteria.</p>
                      </div>
                    </td>
                  </tr>
                ) : (
                  transactions.map((t) => {
                    const hasDiscrepancy = !!t.discrepancy_note;
                    return (
                      <tr
                        key={t.id}
                        className="group hover:bg-white/5 cursor-pointer transition-colors"
                        onClick={() => onInvestigateTransaction(t)}
                      >
                        <td className="py-3.5 px-6">
                          <div className="font-mono font-bold text-white group-hover:text-blue-400 transition-colors duration-150">
                            {t.id}
                          </div>
                          <div className="text-[11px] text-slate-500">
                            {new Date(t.timestamp).toLocaleString()}
                          </div>
                        </td>

                        <td className="py-3.5 px-6">
                          <div className="font-semibold text-white">{t.merchant}</div>
                          <div className="text-[11px] text-slate-500">{t.category}</div>
                        </td>

                        <td className="py-3.5 px-6 font-mono font-bold text-white">
                          ${t.amount.toFixed(2)} {t.currency}
                        </td>

                        <td className="py-3.5 px-6 font-mono text-slate-400">
                          •••• {t.card_last4 || "4819"}
                        </td>

                        <td className="py-3.5 px-6">
                          <span className="inline-flex items-center gap-1 rounded bg-white/10 px-2 py-0.5 text-xs font-semibold text-slate-300">
                            <FileSearch className="h-3.5 w-3.5 text-slate-400" />
                            <span>{t.evidence_count || 1} Exhibits</span>
                          </span>
                        </td>

                        <td className="py-3.5 px-6">
                          {hasDiscrepancy ? (
                            <span className="inline-flex items-center gap-1 text-rose-400 font-semibold bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded text-[11px]">
                              <AlertTriangle className="h-3 w-3 text-rose-400 shrink-0" />
                              <span>{t.discrepancy_note}</span>
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded text-[11px]">
                              <CheckCircle2 className="h-3 w-3 text-emerald-400 shrink-0" />
                              <span>Aligned with terminal</span>
                            </span>
                          )}
                        </td>

                        <td className="py-3.5 px-6 text-right">
                          <button
                            onClick={(e) => { e.stopPropagation(); onInvestigateTransaction(t); }}
                            className="inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:border-blue-500/30 hover:bg-blue-600/20 hover:text-blue-400 transition-all duration-200"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>Investigate</span>
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
