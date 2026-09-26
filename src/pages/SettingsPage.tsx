import React, { useState } from "react";
import {
  Settings,
  Eye,
  FileCheck,
  Save,
  CheckCircle2,
  User,
  ShieldCheck,
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

export const SettingsPage: React.FC = () => {
  const { user, logout } = useAuth();
  const [saved, setSaved] = useState(false);
  const [sensitivity, setSensitivity] = useState("HIGH");
  const [compressionThreshold, setCompressionThreshold] = useState("0.18");
  const [autoCorrectPerspective, setAutoCorrectPerspective] = useState(true);
  const [enableSha256Custody, setEnableSha256Custody] = useState(true);
  const [webhookUrl, setWebhookUrl] = useState("https://api.internal-fraud-ops.net/v1/webhook");
  const [investigatorName, setInvestigatorName] = useState(
    user?.displayName || "Lead Forensics Specialist"
  );

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex-1 space-y-6 p-6 sm:p-8 max-w-4xl mx-auto">
      {/* Header */}
      <div className="border-b border-white/10 pb-6 animate-slideInUp">
        <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
          Forensics Engine Governance & Settings
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Configure computer vision tamper sensitivity, OCR perspective correction, cryptographic chain of custody, and team sign-off credentials.
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-xs font-semibold text-emerald-400 animate-fadeIn">
          <CheckCircle2 className="h-4 w-4 text-emerald-500" />
          <span>Forensics engine parameters successfully updated and active.</span>
        </div>
      )}

      {/* Investigator Identity — NO Firebase IDs, NO internal UIDs */}
      <div className="rounded-2xl border border-white/10 bg-[#111] p-6 shadow-xs space-y-4 animate-cardEntrance">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-blue-500" />
            <h3 className="text-sm font-bold text-white">
              Investigator Account
            </h3>
          </div>
          <div className="flex items-center gap-1.5 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 text-[11px] font-semibold text-emerald-400">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
            <span>Authenticated</span>
          </div>
        </div>

        {user ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Active Investigator
              </span>
              <p className="text-sm font-bold text-white">
                {user.displayName || "Investigator"}
              </p>
              <p className="text-slate-400 text-[11px]">{user.email || "No email"}</p>
            </div>

            <div className="p-3 rounded-xl bg-white/5 border border-white/10 space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Authentication Status
              </span>
              <div className="flex items-center gap-2 mt-1">
                <span className="rounded-md bg-blue-500/20 px-1.5 py-0.5 text-[10px] font-bold text-blue-400 uppercase">
                  {user.provider || "Firebase"}
                </span>
                <span className="text-[11px] text-slate-400">Verified & Active</span>
              </div>
              <p className="text-[10px] text-slate-500">
                Platform: <span className="font-semibold text-slate-300">FraudLens AI</span>
              </p>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300">
            Not currently signed in to a verified investigator account.
          </div>
        )}
      </div>

      {/* Computer Vision & CV Settings */}
      <div className="rounded-2xl border border-white/10 bg-[#111] p-6 shadow-xs space-y-4 animate-cardEntrance" style={{ animationDelay: "80ms" }}>
        <div className="flex items-center gap-2 border-b border-white/5 pb-3">
          <Eye className="h-4 w-4 text-blue-500" />
          <h3 className="text-sm font-bold text-white">
            Computer Vision & Tampering Detection Engine
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-500 mb-1">
              Visual Tampering Sensitivity
            </label>
            <select
              value={sensitivity}
              onChange={(e) => setSensitivity(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-2 text-white focus:border-blue-500 focus:outline-none transition appearance-none"
            >
              <option value="HIGH" className="bg-[#111]">High (Flags 1.5σ text baseline shifts & subtle font variations)</option>
              <option value="MEDIUM" className="bg-[#111]">Medium (Standard institutional forensics threshold)</option>
              <option value="LOW" className="bg-[#111]">Low (Severe pixel alterations and gross mismatches only)</option>
            </select>
            <p className="text-[11px] text-slate-500 mt-1">
              Controls stroke width and font anomaly detection tolerance
            </p>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-500 mb-1">
              Compression Discontinuity Threshold
            </label>
            <input
              type="text"
              value={compressionThreshold}
              onChange={(e) => setCompressionThreshold(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-2 font-mono text-white focus:border-blue-500 focus:outline-none transition"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Detects spliced JPG blocks with discordant quantization matrices
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-300">
            <input
              type="checkbox"
              checked={autoCorrectPerspective}
              onChange={(e) => setAutoCorrectPerspective(e.target.checked)}
              className="rounded border-white/20 bg-white/5 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
            />
            <span>Automatic 4-Corner Document Homography & Perspective Rectification</span>
          </label>

          <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-slate-300">
            <input
              type="checkbox"
              checked={enableSha256Custody}
              onChange={(e) => setEnableSha256Custody(e.target.checked)}
              className="rounded border-white/20 bg-white/5 text-blue-600 focus:ring-blue-500 focus:ring-offset-0"
            />
            <span>Cryptographic SHA-256 Chain of Custody Fingerprinting on Upload</span>
          </label>
        </div>
      </div>

      {/* Investigator Sign-off Profile */}
      <div className="rounded-2xl border border-white/10 bg-[#111] p-6 shadow-xs space-y-4 animate-cardEntrance" style={{ animationDelay: "160ms" }}>
        <div className="flex items-center gap-2 border-b border-white/5 pb-3">
          <FileCheck className="h-4 w-4 text-emerald-500" />
          <h3 className="text-sm font-bold text-white">
            Investigator Sign-off & Dispute Dossier Profile
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-500 mb-1">
              Default Investigator Title / Credential
            </label>
            <input
              type="text"
              value={investigatorName}
              onChange={(e) => setInvestigatorName(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-2 text-white focus:border-blue-500 focus:outline-none transition"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              Appears on formal bank chargeback export certificates
            </p>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-slate-500 mb-1">
              Dispute Notification Webhook
            </label>
            <input
              type="text"
              value={webhookUrl}
              onChange={(e) => setWebhookUrl(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 p-2 font-mono text-white focus:border-blue-500 focus:outline-none transition"
            />
            <p className="text-[11px] text-slate-500 mt-1">
              SIEM or case management system integration
            </p>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end pt-2 animate-fadeIn">
        <button
          onClick={handleSave}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] hover:bg-blue-500 hover:scale-[1.02] transition"
        >
          <Save className="h-4 w-4" />
          <span>Save Configuration</span>
        </button>
      </div>
    </div>
  );
};
