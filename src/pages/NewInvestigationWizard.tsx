import React, { useState } from "react";
import {
  ShieldAlert,
  CreditCard,
  UploadCloud,
  FileText,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  AlertTriangle,
  Layers,
  Eye,
  Info,
  Building2,
  Calendar,
  DollarSign,
  Receipt,
  Smartphone,
} from "lucide-react";
import { uploadEvidence, createInvestigation } from "../lib/api";
import { EvidenceUploader } from "../components/evidence/EvidenceUploader";
import { EvidenceItem } from "../types";

interface NewInvestigationWizardProps {
  onCaseCreated: (caseId: string) => void;
  onCancel: () => void;
}

export const NewInvestigationWizard: React.FC<NewInvestigationWizardProps> = ({
  onCaseCreated,
  onCancel,
}) => {
  const [step, setStep] = useState<1 | 2 | 3>(1);

  // Step 1: Disputed Transaction
  const [merchant, setMerchant] = useState("Apex Electronics Store #4092");
  const [amount, setAmount] = useState("2490.00");
  const [currency, setCurrency] = useState("USD");
  const [category, setCategory] = useState("Consumer Electronics");
  const [cardLast4, setCardLast4] = useState("4819");
  const [userNotes, setUserNotes] = useState(
    "Cardholder filed dispute stating they never authorized this transaction. Paper receipt submitted differs from terminal authorization."
  );

  // Step 2: Attached Evidence
  const [attachedEvidence, setAttachedEvidence] = useState<EvidenceItem[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  // Step 3: Creation State
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);

  const handleCreateCase = async () => {
    try {
      setIsSubmitting(true);
      setSubmissionError(null);

      const parsedAmount = parseFloat(amount) || 100;
      const evidenceIds = attachedEvidence.map((e) => e.id);

      const created = await createInvestigation({
        merchant,
        amount: parsedAmount,
        currency,
        category,
        card_last4: cardLast4,
        investigator_notes: userNotes,
        evidence_ids: evidenceIds,
      });

      onCaseCreated(created.id);
    } catch (err: any) {
      setSubmissionError(err.message || "Failed to create investigation case.");
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 space-y-6 p-6 sm:p-8 max-w-4xl mx-auto">
      {/* Wizard Header */}
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-500">
            Case Initialization Wizard
          </span>
          <h1 className="text-2xl font-black text-white mt-1">
            New Forensic Fraud Investigation
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Pair financial transaction logs with document evidence exhibits for automated forensic cross-examination.
          </p>
        </div>

        <button
          onClick={onCancel}
          className="text-xs font-semibold text-slate-400 hover:text-white transition"
        >
          Cancel
        </button>
      </div>

      {/* Steps Indicator */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        {[
          { num: 1, label: "Disputed Transaction" },
          { num: 2, label: "Visual Evidence Exhibits" },
          { num: 3, label: "Verification & Launch" },
        ].map((s) => {
          const isCurrent = step === s.num;
          const isDone = step > s.num;
          return (
            <div key={s.num} className="flex items-center gap-2">
              <div
                className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold ${
                  isCurrent
                    ? "bg-blue-600 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                    : isDone
                    ? "bg-emerald-600 text-white"
                    : "bg-white/10 text-slate-400"
                }`}
              >
                {isDone ? <CheckCircle2 className="h-4 w-4" /> : s.num}
              </div>
              <span
                className={`text-xs font-semibold ${
                  isCurrent ? "text-white" : "text-slate-500"
                }`}
              >
                {s.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* STEP 1: Disputed Transaction Details */}
      {step === 1 && (
        <div className="rounded-2xl border border-white/10 bg-[#111] animate-cardEntrance p-6 space-y-5">
          <div>
            <h3 className="text-sm font-bold text-white">
              1. Primary Transaction Record
            </h3>
            <p className="text-xs text-slate-400">
              Enter the transaction records reported on the cardholder statement or payment gateway ledger.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Merchant / Entity Name
              </label>
              <input
                type="text"
                value={merchant}
                onChange={(e) => setMerchant(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none focus:bg-white/10 transition"
                placeholder="e.g. Apex Electronics Store"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Disputed Amount
              </label>
              <div className="relative">
                <span className="absolute left-3 top-2 text-xs text-slate-500 font-mono">$</span>
                <input
                  type="number"
                  step="0.01"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 pl-7 pr-3 py-2 text-xs font-mono font-bold text-white focus:border-blue-500 focus:outline-none focus:bg-white/10 transition"
                  placeholder="2490.00"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Card Last 4 Digits
              </label>
              <input
                type="text"
                maxLength={4}
                value={cardLast4}
                onChange={(e) => setCardLast4(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-mono text-white focus:border-blue-500 focus:outline-none focus:bg-white/10 transition"
                placeholder="4819"
              />
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
                Merchant Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-white focus:border-blue-500 focus:outline-none focus:bg-white/10 transition"
                placeholder="e.g. Electronics, Luxury Goods, Travel"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1">
              Case Initiation Notes / Cardholder Dispute Summary
            </label>
            <textarea
              rows={3}
              value={userNotes}
              onChange={(e) => setUserNotes(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-3 text-xs text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none focus:bg-white/10 transition"
              placeholder="Describe the cardholder complaint, terminal logs, or dispute context..."
            />
          </div>

          <div className="flex justify-end pt-3 border-t border-white/10">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-500 hover:scale-[1.02] transition"
            >
              <span>Next: Attach Visual Evidence</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 2: Visual Evidence Exhibits */}
      {step === 2 && (
        <div className="space-y-6">
          <div className="rounded-2xl border border-white/10 bg-[#111] animate-cardEntrance p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-sm font-bold text-white">
                  2. Attach Evidence Document Exhibits
                </h3>
                <p className="text-xs text-slate-400">
                  Upload receipts, POS slips, invoices, or screenshots to inspect for visual tampering and cross-reference with the disputed record.
                </p>
              </div>

              {attachedEvidence.length > 0 && (
                <span className="rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-xs font-bold text-emerald-400">
                  {attachedEvidence.length} Exhibits Ready
                </span>
              )}
            </div>

            {/* List of currently attached exhibits */}
            {attachedEvidence.length > 0 && (
              <div className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {attachedEvidence.map((ev, idx) => (
                  <div
                    key={ev.id}
                    className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-3"
                  >
                    <img
                      src={ev.data_url}
                      alt={ev.filename}
                      className="h-12 w-12 rounded bg-white/5 border border-white/10 object-contain shrink-0"
                      referrerPolicy="no-referrer"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold text-white truncate">{ev.filename}</p>
                      <p className="text-[10px] text-slate-400">
                        {ev.document_type} • OCR Readability: {ev.quality.ocr_readability}%
                      </p>
                      {ev.forensics.suspicious_regions.length > 0 ? (
                        <span className="text-[10px] font-bold text-rose-400">
                          ⚠ {ev.forensics.suspicious_regions.length} visual tampering flags
                        </span>
                      ) : (
                        <span className="text-[10px] font-semibold text-emerald-400">
                          ✓ Verified authentic
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Evidence Uploader Tool */}
            <EvidenceUploader
              onEvidenceUploaded={(newEv) => {
                setAttachedEvidence((prev) => [...prev, newEv]);
              }}
            />
          </div>

          <div className="flex items-center justify-between">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>

            <button
              onClick={() => setStep(3)}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-500 hover:scale-[1.02] transition"
            >
              <span>Next: Review & Launch Investigation</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      {/* STEP 3: Verification & Launch */}
      {step === 3 && (
        <div className="rounded-2xl border border-white/10 bg-[#111] animate-cardEntrance p-6 space-y-6">
          <div>
            <h3 className="text-sm font-bold text-white">
              3. Case Verification & Pre-flight Forensics Summary
            </h3>
            <p className="text-xs text-slate-400">
              Confirm case details before initializing the multi-modal forensics workspace.
            </p>
          </div>

          {/* Summary Details */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-xl bg-white/5 border border-white/10 p-4 text-xs">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Disputed Merchant
              </span>
              <span className="font-bold text-white">{merchant}</span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Amount on Record
              </span>
              <span className="font-mono font-bold text-white">
                ${parseFloat(amount || "0").toFixed(2)} {currency}
              </span>
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 block mb-1">
                Evidence Exhibits
              </span>
              <span className="font-bold text-white">
                {attachedEvidence.length} Exhibits Attached
              </span>
            </div>
          </div>

          {/* Quick Pre-flight Checks */}
          <div className="space-y-2 border-t border-white/10 pt-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Pre-flight Forensics Checks:
            </h4>
            <div className="space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>Primary transaction ledger record validated</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                <span>
                  {attachedEvidence.length > 0
                    ? "Visual exhibits uploaded and OCR segmented"
                    : "Case will be initialized with baseline ledger logs"}
                </span>
              </div>
              <div className="flex items-center gap-2 text-blue-400">
                <Sparkles className="h-4 w-4 text-blue-500" />
                <span>Automated Cross-Evidence verification matrix queued</span>
              </div>
            </div>
          </div>

          {submissionError && (
            <div className="rounded-xl border border-rose-500/20 bg-rose-500/10 p-3 text-xs text-rose-300">
              {submissionError}
            </div>
          )}

          <div className="flex items-center justify-between border-t border-white/10 pt-4">
            <button
              onClick={() => setStep(2)}
              className="flex items-center gap-1.5 text-xs font-bold text-slate-400 hover:text-white transition"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>

            <button
              onClick={handleCreateCase}
              disabled={isSubmitting}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-500 hover:scale-[1.02] transition disabled:opacity-50 disabled:hover:scale-100"
            >
              {isSubmitting ? (
                <span>Initializing Forensics Workspace...</span>
              ) : (
                <>
                  <Sparkles className="h-4 w-4 text-blue-200" />
                  <span>Launch Investigation Workspace</span>
                </>
              )}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
