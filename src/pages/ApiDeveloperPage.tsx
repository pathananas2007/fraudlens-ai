import React, { useState } from "react";
import {
  Code2,
  Copy,
  Check,
  Play,
  Terminal,
  Server,
  Zap,
  Globe,
  ShieldCheck,
  Activity,
} from "lucide-react";

export const ApiDeveloperPage: React.FC = () => {
  const [selectedLang, setSelectedLang] = useState<"curl" | "python" | "node">("curl");
  const [copied, setCopied] = useState(false);
  const [testOutput, setTestOutput] = useState<string | null>(null);
  const [testing, setTesting] = useState(false);

  const curlCode = `# 1. Upload Document Exhibit for Visual Forensics & OCR
curl -X POST https://api.fraudlens.ai/api/v1/evidence/upload \\
  -H "Content-Type: application/json" \\
  -d '{
    "filename": "Apex_POS_Slip_T981.png",
    "document_type": "RECEIPT",
    "data_url": "data:image/png;base64,..."
  }'

# 2. Initialize Case & Cross-Examine Ledger
curl -X POST https://api.fraudlens.ai/api/v1/investigations \\
  -H "Content-Type: application/json" \\
  -d '{
    "merchant": "Apex Electronics Store",
    "amount": 2490.00,
    "currency": "USD",
    "card_last4": "4819",
    "evidence_ids": ["evi-101", "evi-102"]
  }'`;

  const pythonCode = `import requests

# 1. Upload financial document for computer vision scan
evidence_res = requests.post(
    "https://api.fraudlens.ai/api/v1/evidence/upload",
    json={
        "filename": "receipt_exhibit.png",
        "document_type": "RECEIPT",
        "data_url": "data:image/png;base64,..."
    }
).json()

# 2. Trigger cross-evidence forensics investigation
case_res = requests.post(
    "https://api.fraudlens.ai/api/v1/investigations",
    json={
        "merchant": "Apex Electronics Store",
        "amount": 2490.00,
        "currency": "USD",
        "card_last4": "4819",
        "evidence_ids": [evidence_res["id"]]
    }
).json()

print(f"Case {case_res['id']} Severity: {case_res['severity']}")
print(f"Visual Flags: {len(case_res['cross_evidence_findings'])}")`;

  const nodeCode = `import fetch from "node-fetch";

// 1. Upload financial document
const evRes = await fetch("https://api.fraudlens.ai/api/v1/evidence/upload", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    filename: "receipt_exhibit.png",
    document_type: "RECEIPT",
    data_url: "data:image/png;base64,..."
  })
});
const evidence = await evRes.json();

// 2. Cross-examine with ledger
const caseRes = await fetch("https://api.fraudlens.ai/api/v1/investigations", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    merchant: "Apex Electronics Store",
    amount: 2490.00,
    currency: "USD",
    card_last4: "4819",
    evidence_ids: [evidence.id]
  })
});
const investigation = await caseRes.json();
console.log("Forensic Findings:", investigation.findings_summary);`;

  const handleCopy = () => {
    const code =
      selectedLang === "curl" ? curlCode : selectedLang === "python" ? pythonCode : nodeCode;
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunTest = async () => {
    setTesting(true);
    setTestOutput(null);
    try {
      const res = await fetch("/api/v1/health");
      const healthData = await res.json();
      setTestOutput(JSON.stringify(healthData, null, 2));
    } catch (e: any) {
      setTestOutput(JSON.stringify({ error: e.message }, null, 2));
    } finally {
      setTesting(false);
    }
  };

  const endpoints = [
    { method: "POST", path: "/api/v1/evidence/upload", desc: "Upload financial document for computer vision scan & OCR", color: "bg-emerald-100 text-emerald-800" },
    { method: "GET",  path: "/api/v1/evidence",         desc: "List all evidence exhibits with forensic metadata",         color: "bg-blue-100 text-blue-800" },
    { method: "POST", path: "/api/v1/investigations",   desc: "Initialize a new forensic investigation case",              color: "bg-emerald-100 text-emerald-800" },
    { method: "GET",  path: "/api/v1/investigations",   desc: "Query investigation queue with filters",                    color: "bg-blue-100 text-blue-800" },
    { method: "GET",  path: "/api/v1/reports",          desc: "Retrieve formal dossier records",                           color: "bg-blue-100 text-blue-800" },
    { method: "GET",  path: "/api/v1/health",           desc: "Forensics engine liveness & telemetry probe",               color: "bg-blue-100 text-blue-800" },
  ];

  return (
    <div className="flex-1 space-y-6 p-6 sm:p-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="border-b border-white/10 pb-6">
        <h1 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
          Forensics API & Developer SDKs
        </h1>
        <p className="mt-1 text-sm text-slate-400">
          Integrate real-time computer vision document forensics, automated OCR layout analysis, and cross-evidence ledger verification into your payment gateway or fraud ops workflows.
        </p>
      </div>

      {/* Status strip */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: <Activity className="h-4 w-4 text-emerald-500" />, label: "API Status", value: "Operational", valueColor: "text-emerald-400", bg: "bg-emerald-500/10 border-emerald-500/20" },
          { icon: <Zap className="h-4 w-4 text-blue-500" />, label: "Avg Response Time", value: "< 480ms", valueColor: "text-blue-400", bg: "bg-blue-500/10 border-blue-500/20" },
          { icon: <ShieldCheck className="h-4 w-4 text-slate-400" />, label: "Auth Method", value: "Firebase Bearer Token", valueColor: "text-slate-300", bg: "bg-white/5 border-white/10" },
        ].map((s, i) => (
          <div key={i} className={`rounded-2xl border ${s.bg} p-4 flex items-center gap-3 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.4)] transition-all duration-300 animate-cardReveal`} style={{ animationDelay: `${i * 60}ms` }}>
            <div className="shrink-0">{s.icon}</div>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-500">{s.label}</p>
              <p className={`text-sm font-bold ${s.valueColor}`}>{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Code Snippet Box */}
      <div className="rounded-2xl border border-white/10 bg-black shadow-[0_0_40px_rgba(37,99,235,0.1)] overflow-hidden">
        {/* Toolbar */}
        <div className="flex items-center justify-between border-b border-white/10 bg-[#0a0a0a] px-4 py-3">
          <div className="flex items-center gap-1">
            {(["curl", "python", "node"] as const).map((lang) => (
              <button
                key={lang}
                onClick={() => setSelectedLang(lang)}
                className={`rounded-md px-3 py-1 text-xs font-semibold uppercase tracking-wider transition ${
                  selectedLang === lang
                    ? "bg-blue-600 text-white shadow-xs"
                    : "text-slate-400 hover:text-white hover:bg-slate-800"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>

          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 rounded-md bg-slate-800 px-2.5 py-1 text-xs font-semibold text-slate-300 hover:bg-slate-700 hover:text-white transition"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 text-emerald-400" />
            ) : (
              <Copy className="h-3.5 w-3.5" />
            )}
            <span>{copied ? "Copied!" : "Copy Snippet"}</span>
          </button>
        </div>

        {/* Code */}
        <div className="p-5 font-mono text-xs text-slate-200 leading-relaxed overflow-x-auto max-h-80">
          <pre>{selectedLang === "curl" ? curlCode : selectedLang === "python" ? pythonCode : nodeCode}</pre>
        </div>
      </div>

      {/* Endpoint Reference */}
      <div className="rounded-2xl border border-white/10 bg-[#111] shadow-xs overflow-hidden">
        <div className="flex items-center gap-2 border-b border-white/10 bg-white/5 px-6 py-4">
          <Globe className="h-4 w-4 text-blue-500" />
          <h3 className="text-sm font-bold text-white">API Endpoint Reference</h3>
        </div>
        <div className="divide-y divide-white/5">
          {endpoints.map((ep, i) => (
            <div
              key={i}
              className="flex items-center gap-4 px-6 py-3.5 hover:bg-white/5 transition-colors cursor-pointer"
            >
              <span className={`shrink-0 rounded px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                ep.method === "POST" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-blue-500/10 text-blue-400 border border-blue-500/20"
              }`}>
                {ep.method}
              </span>
              <code className="font-mono text-xs font-semibold text-white shrink-0">
                {ep.path}
              </code>
              <span className="text-xs text-slate-400 min-w-0 truncate">{ep.desc}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Live Test Sandbox */}
      <div className="rounded-2xl border border-white/10 bg-[#111] p-6 shadow-xs space-y-4">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div>
            <h3 className="text-sm font-bold text-white">
              Interactive Forensics Endpoint Sandbox
            </h3>
            <p className="text-xs text-slate-400">
              Ping the live backend forensics engine and verify API connectivity.
            </p>
          </div>

          <button
            onClick={handleRunTest}
            disabled={testing}
            className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-[0_0_20px_rgba(5,150,105,0.3)] hover:bg-emerald-500 hover:scale-[1.02] transition disabled:opacity-50 disabled:hover:scale-100"
          >
            <Play className="h-3.5 w-3.5 fill-white" />
            <span>{testing ? "Testing..." : "Test /api/v1/health"}</span>
          </button>
        </div>

        {testOutput && (
          <div className="rounded-xl bg-black border border-white/10 p-4 font-mono text-xs text-emerald-400 overflow-x-auto animate-fadeIn">
            <div className="flex items-center gap-2 mb-3 pb-2 border-b border-white/10">
              <Terminal className="h-3.5 w-3.5 text-emerald-500" />
              <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Response</span>
            </div>
            <pre className="leading-relaxed">{testOutput}</pre>
          </div>
        )}
      </div>
    </div>
  );
};
