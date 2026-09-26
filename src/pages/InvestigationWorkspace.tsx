import React, { useState, useEffect } from "react";
import {
  ArrowLeft,
  ShieldAlert,
  CreditCard,
  FileSearch,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Sparkles,
  Download,
  Share2,
  ChevronDown,
  Layers,
  Lock,
  Plus,
  Save,
  UserCheck,
  SplitSquareVertical,
  Clock,
  Sliders,
  Scale,
} from "lucide-react";
import { SeverityBadge } from "../components/common/SeverityBadge";
import { StatusBadge } from "../components/common/StatusBadge";
import {
  InvestigationCase,
  InvestigationStatus,
  InvestigationSeverity,
  EvidenceItem,
  SuspiciousRegion,
} from "../types";
import {
  fetchInvestigationById,
  fetchEvidenceById,
  updateInvestigationStatus,
  signOffInvestigation,
} from "../lib/api";
import { ForensicViewer } from "../components/evidence/ForensicViewer";
import { CrossEvidenceMatrix } from "../components/investigation/CrossEvidenceMatrix";
import { EvidenceTimeline } from "../components/investigation/EvidenceTimeline";
import { AiInvestigatorChat } from "../components/investigation/AiInvestigatorChat";
import { FormalReportModal } from "../components/investigation/FormalReportModal";
import { EvidenceUploader } from "../components/evidence/EvidenceUploader";

interface InvestigationWorkspaceProps {
  caseId: string;
  onBack: () => void;
}

export const InvestigationWorkspace: React.FC<InvestigationWorkspaceProps> = ({
  caseId,
  onBack,
}) => {
  const [investigation, setInvestigation] = useState<InvestigationCase | null>(null);
  const [evidenceItems, setEvidenceItems] = useState<EvidenceItem[]>([]);
  const [activeEvidenceIndex, setActiveEvidenceIndex] = useState<number>(0);
  const [comparisonEvidenceIndex, setComparisonEvidenceIndex] = useState<number | null>(null);
  const [selectedRegion, setSelectedRegion] = useState<SuspiciousRegion | null>(null);
  const [loading, setLoading] = useState(true);

  // Status & Notes
  const [status, setStatus] = useState<InvestigationStatus>("INVESTIGATING");
  const [severity, setSeverity] = useState<InvestigationSeverity>("SUSPICIOUS");
  const [notes, setNotes] = useState<string>("");
  const [isSavingNotes, setIsSavingNotes] = useState<boolean>(false);
  const [signOffModalOpen, setSignOffModalOpen] = useState<boolean>(false);
  const [signerName, setSignerName] = useState<string>("Lead Forensics Investigator");

  // Modals
  const [reportModalOpen, setReportModalOpen] = useState<boolean>(false);
  const [uploaderOpen, setUploaderOpen] = useState<boolean>(false);

  // Bottom Tabs
  const [activeTab, setActiveTab] = useState<"matrix" | "timeline" | "copilot" | "notes">("matrix");

  useEffect(() => {
    loadCaseData();
  }, [caseId]);

  async function loadCaseData() {
    try {
      setLoading(true);
      const c = await fetchInvestigationById(caseId);
      setInvestigation(c);
      setStatus(c.status);
      setSeverity(c.severity);
      setNotes(c.investigator_notes || "");

      // Fetch all evidence records
      if (c.evidence_ids && c.evidence_ids.length > 0) {
        const items = await Promise.all(
          c.evidence_ids.map(async (eid) => {
            try {
              return await fetchEvidenceById(eid);
            } catch (e) {
              return null;
            }
          })
        );
        const valid = items.filter((x): x is EvidenceItem => x !== null);
        setEvidenceItems(valid);
        if (valid.length > 1) {
          setComparisonEvidenceIndex(1);
        }
      }
    } catch (err) {
      console.error("Failed to load investigation workspace:", err);
    } finally {
      setLoading(false);
    }
  }

  const handleStatusChange = async (newStatus: InvestigationStatus) => {
    setStatus(newStatus);
    try {
      await updateInvestigationStatus(caseId, { status: newStatus });
      if (investigation) setInvestigation({ ...investigation, status: newStatus });
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const handleSaveNotes = async () => {
    try {
      setIsSavingNotes(true);
      await updateInvestigationStatus(caseId, { investigator_notes: notes });
      if (investigation) setInvestigation({ ...investigation, investigator_notes: notes });
    } catch (err) {
      console.error("Failed to save notes:", err);
    } finally {
      setIsSavingNotes(false);
    }
  };

  const handleSignOff = async () => {
    try {
      const updated = await signOffInvestigation(caseId, signerName);
      setInvestigation(updated);
      setStatus(updated.status);
      setSignOffModalOpen(false);
    } catch (err) {
      console.error("Failed to sign off:", err);
    }
  };

  const handleNewEvidenceAttached = async (newEvidence: EvidenceItem) => {
    setEvidenceItems((prev) => [...prev, newEvidence]);
    setUploaderOpen(false);
    // Reload full case
    loadCaseData();
  };

  if (loading || !investigation) {
    return (
      <div className="flex h-96 items-center justify-center">
        <div className="flex flex-col items-center gap-2 text-slate-500 text-xs">
          <div className="h-6 w-6 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
          <span>Loading Forensic Investigation Workspace...</span>
        </div>
      </div>
    );
  }

  const activeEvidence = evidenceItems[activeEvidenceIndex] || null;
  const comparisonEvidence =
    comparisonEvidenceIndex !== null && comparisonEvidenceIndex !== activeEvidenceIndex
      ? evidenceItems[comparisonEvidenceIndex]
      : null;

  return (
    <div className="flex-1 space-y-5 p-6 sm:p-8 max-w-7xl mx-auto">
      {/* Back button and quick actions */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 transition"
        >
          <ArrowLeft className="h-4 w-4" />
          <span>Back to Investigation Queue</span>
        </button>

        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-3 mr-4 text-[10px] font-bold text-slate-400">
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-slate-400"></span> SYSTEM DATA</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span> AI ANALYSIS</span>
            <span className="flex items-center gap-1.5"><span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> INVESTIGATOR INPUT</span>
          </div>

          {/* Sign-off Certification Button */}
          {investigation.signed_off_by ? (
            <div className="flex items-center gap-1.5 rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span>Certified by {investigation.signed_off_by}</span>
            </div>
          ) : (
            <button
              onClick={() => setSignOffModalOpen(true)}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 shadow-xs hover:bg-slate-50 transition"
            >
              <UserCheck className="h-3.5 w-3.5 text-slate-500" />
              <span>Sign Off & Certify</span>
            </button>
          )}

          {/* Formal Report Button */}
          <button
            onClick={() => setReportModalOpen(true)}
            className="btn-lift flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition"
          >
            <FileText className="h-3.5 w-3.5 text-blue-200" />
            <span>Generate Formal Report</span>
          </button>
        </div>
      </div>

      {/* Case Header Card */}
      <div className="s-card animate-cardEntrance p-6">
        <div className="flex flex-wrap items-start justify-between gap-4 pb-4 border-b border-slate-100">
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="font-mono text-sm font-black text-slate-900">
                CASE #{investigation.id}
              </span>
              <SeverityBadge severity={severity} size="sm" />
              <StatusBadge status={status} size="sm" />
              {investigation.evidence_chain_hash && (
                <span className="font-mono text-[10px] text-slate-400 bg-slate-50 border border-slate-200 px-1.5 py-0.5 rounded">
                  Hash: {investigation.evidence_chain_hash.substring(0, 16)}...
                </span>
              )}
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              {investigation.transaction.merchant} — ${investigation.transaction.amount.toFixed(2)}{" "}
              {investigation.transaction.currency}
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Cardholder authorization log •••• {investigation.transaction.card_last4 || "4819"} •{" "}
              {new Date(investigation.transaction.timestamp).toLocaleString()}
            </p>
          </div>

          {/* Status Change Dropdown */}
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Status:
            </span>
            <select
              value={status}
              onChange={(e) => handleStatusChange(e.target.value as InvestigationStatus)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-800 focus:border-blue-500 focus:outline-none"
            >
              <option value="NEW">NEW</option>
              <option value="INVESTIGATING">INVESTIGATING</option>
              <option value="IN_REVIEW">IN REVIEW</option>
              <option value="RESOLVED">RESOLVED</option>
              <option value="DISMISSED">DISMISSED</option>
            </select>
          </div>
        </div>

        {/* Primary Forensic Summary Alert */}
        <div className="mt-4 flex items-start gap-3 rounded-lg bg-amber-50/70 border border-amber-200/80 p-3.5 text-xs text-amber-900">
          <AlertTriangle className="h-4 w-4 text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <span className="inline-flex items-center gap-1 bg-amber-200/50 text-amber-800 px-1.5 py-0.5 rounded mr-2 text-[10px] font-bold tracking-wide">
              <Sparkles className="h-3 w-3" /> AI FORENSIC FINDING
            </span>
            <span className="font-bold">Investigator Alert: </span>
            <span>
              {investigation.findings_summary ||
                "Computer vision scan identified potential text region alteration and amount divergence between ledger and uploaded document."}
            </span>
          </div>
        </div>
      </div>

      {/* Forensic Exhibit Selector Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 pb-2">
        <div className="flex items-center gap-2 overflow-x-auto">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 mr-1">
            Exhibits ({evidenceItems.length}):
          </span>
          {evidenceItems.map((item, index) => {
            const isActive = index === activeEvidenceIndex;
            const hasTampering = item.forensics.suspicious_regions.length > 0;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveEvidenceIndex(index);
                  setSelectedRegion(null);
                }}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white border border-slate-200 text-slate-700 hover:bg-slate-50"
                }`}
              >
                <span>
                  Exhibit {String.fromCharCode(65 + index)}: {item.filename}
                </span>
                {hasTampering && (
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[9px] font-bold ${
                      isActive ? "bg-rose-500 text-white" : "bg-rose-100 text-rose-700"
                    }`}
                  >
                    {item.forensics.suspicious_regions.length} Flags
                  </span>
                )}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setUploaderOpen(true)}
          className="flex items-center gap-1.5 rounded-lg border border-dashed border-slate-300 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:border-blue-400 hover:text-blue-600 transition"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>Attach Exhibit</span>
        </button>
      </div>

      {/* Main Forensic Viewer Component */}
      {activeEvidence ? (
        <ForensicViewer
          evidence={activeEvidence}
          comparisonEvidence={comparisonEvidence}
          selectedRegionId={selectedRegion?.id || null}
          onSelectRegion={(reg) => setSelectedRegion(reg)}
        />
      ) : (
        <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 p-12 text-center">
          <FileSearch className="h-8 w-8 text-slate-400 mx-auto mb-2" />
          <p className="text-sm font-semibold text-slate-700">No exhibits attached to this case yet.</p>
          <p className="text-xs text-slate-400 mb-4">
            Upload a receipt, invoice, or screenshot to run visual forensics.
          </p>
          <button
            onClick={() => setUploaderOpen(true)}
            className="rounded-lg bg-blue-600 px-4 py-2 text-xs font-semibold text-white hover:bg-blue-700"
          >
            Upload Document Exhibit
          </button>
        </div>
      )}

      {/* Bottom Tabs: Verification Matrix / Timeline / Copilot / Notes */}
      <div className="s-card animate-cardEntrance overflow-hidden" style={{ animationDelay: "160ms" }}>
        {/* Tab Headers */}
        <div className="flex border-b border-slate-200 bg-slate-50/70 overflow-x-auto">
          {[
            {
              id: "matrix",
              label: "Cross-Evidence Matrix",
              icon: Scale,
              badge: investigation.cross_evidence_findings.length,
            },
            {
              id: "timeline",
              label: "Chronological Timeline",
              icon: Clock,
              badge: investigation.timeline.length,
            },
            {
              id: "copilot",
              label: "AI Forensic Assistant",
              icon: Sparkles,
            },
            {
              id: "notes",
              label: "Investigator Notes",
              icon: FileText,
            },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center gap-2 border-b-2 py-3 px-5 text-xs font-bold transition whitespace-nowrap ${
                  isActive
                    ? "border-blue-600 bg-white text-blue-700"
                    : "border-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100/50"
                }`}
              >
                <Icon className={`h-4 w-4 ${isActive ? "text-blue-600" : "text-slate-400"}`} />
                <span>{tab.label}</span>
                {tab.badge !== undefined && (
                  <span
                    className={`rounded-full px-1.5 py-0.2 text-[10px] ${
                      isActive ? "bg-blue-100 text-blue-700" : "bg-slate-200 text-slate-600"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab Body */}
        <div className="p-5">
          {activeTab === "matrix" && (
            <CrossEvidenceMatrix findings={investigation.cross_evidence_findings} />
          )}

          {activeTab === "timeline" && <EvidenceTimeline timeline={investigation.timeline} />}

          {activeTab === "copilot" && <AiInvestigatorChat caseId={caseId} />}

          {activeTab === "notes" && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Investigator Certification Notes & Rationale
                  </h4>
                  <p className="text-xs text-slate-500">
                    Notes entered here are included in the formal export dossier.
                  </p>
                </div>

                <button
                  onClick={handleSaveNotes}
                  disabled={isSavingNotes}
                  className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 disabled:opacity-50 transition"
                >
                  <Save className="h-3.5 w-3.5" />
                  <span>{isSavingNotes ? "Saving..." : "Save Notes"}</span>
                </button>
              </div>

              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={6}
                placeholder="Enter investigator observations, interview results, or visual tampering notes..."
                className="w-full rounded-xl border border-slate-200 p-3.5 text-xs text-slate-800 placeholder-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
          )}
        </div>
      </div>

      {/* Formal Printable Report Modal */}
      <FormalReportModal
        investigation={investigation}
        evidenceItems={evidenceItems}
        isOpen={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
      />

      {/* Attach Evidence Modal */}
      {uploaderOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-xl">
            <EvidenceUploader
              onEvidenceUploaded={handleNewEvidenceAttached}
              onCancel={() => setUploaderOpen(false)}
            />
          </div>
        </div>
      )}

      {/* Digital Sign-off Modal */}
      {signOffModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-2">
              <UserCheck className="h-5 w-5 text-blue-600" />
              <h3 className="text-base font-bold text-slate-900">
                Certify & Sign Off Investigation
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Certifying records that all visual exhibits, OCR data, and cross-evidence matrix findings have been verified by a qualified investigator.
            </p>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                Investigator Name / Title
              </label>
              <input
                type="text"
                value={signerName}
                onChange={(e) => setSignerName(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-900 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setSignOffModalOpen(false)}
                className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSignOff}
                className="rounded-lg bg-emerald-600 px-4 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700"
              >
                Sign & Certify Case
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
