import React, { useState, useRef } from "react";
import { DocumentType, EvidenceItem } from "../../types";
import { uploadEvidence } from "../../lib/api";
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  AlertTriangle,
  Loader2,
  Sparkles,
  FileSpreadsheet,
  Receipt,
  Smartphone,
  CreditCard,
  Building2,
} from "lucide-react";

interface EvidenceUploaderProps {
  onEvidenceUploaded: (evidence: EvidenceItem) => void;
  onCancel?: () => void;
}

export const EvidenceUploader: React.FC<EvidenceUploaderProps> = ({
  onEvidenceUploaded,
  onCancel,
}) => {
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [docType, setDocType] = useState<DocumentType>("RECEIPT");
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [processingStep, setProcessingStep] = useState<string>("");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const processFile = (file: File) => {
    setSelectedFile(file);
    setErrorMsg(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleUploadAndAnalyze = async () => {
    if (!previewUrl) return;

    try {
      setIsProcessing(true);
      setErrorMsg(null);

      setProcessingStep("1/4 Assessing Image Quality & Perspective...");
      await new Promise((r) => setTimeout(r, 400));

      setProcessingStep("2/4 Segmenting Document & Layout Structure...");
      await new Promise((r) => setTimeout(r, 450));

      setProcessingStep("3/4 Running OCR & Financial Entity Extraction...");
      await new Promise((r) => setTimeout(r, 500));

      setProcessingStep("4/4 Running Visual Forensics & Inconsistency Detection...");

      const uploaded = await uploadEvidence({
        filename: selectedFile?.name || `Exhibit_${Date.now()}.png`,
        data_url: previewUrl,
        document_type: docType,
      });

      onEvidenceUploaded(uploaded);
    } catch (err: any) {
      setErrorMsg(err.message || "Upload and analysis failed. Please try again.");
    } finally {
      setIsProcessing(false);
      setProcessingStep("");
    }
  };

  // Quick preset sample loaders
  const loadPresetSample = (type: "CLEAN" | "MISMATCH" | "ALTERED") => {
    const samples = {
      CLEAN: {
        name: "Apex_Electronics_Receipt_Sample.svg",
        type: "RECEIPT" as DocumentType,
        url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="520" viewBox="0 0 400 520" fill="none"><rect width="400" height="520" fill="%23FFFFFF"/><rect x="20" y="20" width="360" height="480" rx="8" stroke="%23CBD5E1" stroke-width="2"/><text x="200" y="60" text-anchor="middle" font-family="monospace" font-size="18" font-weight="bold" fill="%230F172A">APEX ELECTRONICS STORE</text><text x="200" y="85" text-anchor="middle" font-family="monospace" font-size="12" fill="%2364748B">Branch %234092</text><line x1="40" y1="110" x2="360" y2="110" stroke="%23E2E8F0"/><text x="40" y="140" font-family="monospace" font-size="13" fill="%23334155">DATE: 2026-09-21  14:24</text><text x="40" y="165" font-family="monospace" font-size="13" fill="%23334155">CARD: **** 4819</text><text x="40" y="240" font-family="monospace" font-size="14" fill="%230F172A">OLED Monitor %2B Tower</text><text x="360" y="240" text-anchor="end" font-family="monospace" font-size="14" fill="%230F172A">$2,490.00</text><line x1="40" y1="290" x2="360" y2="290" stroke="%23CBD5E1"/><text x="40" y="330" font-family="monospace" font-size="16" font-weight="bold" fill="%230F172A">TOTAL:</text><text x="360" y="330" text-anchor="end" font-family="monospace" font-size="20" font-weight="bold" fill="%230F172A">$2,490.00</text></svg>`,
      },
      MISMATCH: {
        name: "Harbor_Luxury_Invoice_Mismatch.svg",
        type: "INVOICE" as DocumentType,
        url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="520" viewBox="0 0 400 520" fill="none"><rect width="400" height="520" fill="%23FFFDF5"/><rect x="20" y="20" width="360" height="480" rx="8" stroke="%23FDE68A" stroke-width="2"/><text x="200" y="60" text-anchor="middle" font-family="serif" font-size="19" font-weight="bold" fill="%2392400E">HARBOR LUXURY BOUTIQUE</text><text x="200" y="85" text-anchor="middle" font-family="sans-serif" font-size="12" fill="%23B45309">Invoice %23INV-89104</text><line x1="40" y1="110" x2="360" y2="110" stroke="%23FDE68A"/><text x="40" y="140" font-family="sans-serif" font-size="13" fill="%2378350F">DATE: 2026-09-20</text><text x="40" y="240" font-family="sans-serif" font-size="14" fill="%23451A03">Diamond Bracelet</text><text x="360" y="240" text-anchor="end" font-family="sans-serif" font-size="14" fill="%23451A03">$18,500.00</text><line x1="40" y1="290" x2="360" y2="290" stroke="%23FDE68A"/><text x="40" y="330" font-family="sans-serif" font-size="16" font-weight="bold" fill="%2392400E">TOTAL:</text><text x="360" y="330" text-anchor="end" font-family="sans-serif" font-size="20" font-weight="bold" fill="%2392400E">$18,500.00</text></svg>`,
      },
      ALTERED: {
        name: "Mobile_Wallet_Screenshot_Altered.svg",
        type: "PAYMENT_SCREENSHOT" as DocumentType,
        url: `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="400" height="520" viewBox="0 0 400 520" fill="none"><rect width="400" height="520" fill="%230F172A"/><rect x="20" y="20" width="360" height="480" rx="16" fill="%231E293B" stroke="%23EF4444" stroke-width="2"/><text x="200" y="80" text-anchor="middle" font-family="sans-serif" font-size="18" font-weight="bold" fill="%23FFFFFF">Payment Confirmed</text><rect x="50" y="120" width="300" height="60" rx="8" fill="%230F172A" stroke="%23EF4444" stroke-dasharray="4 4"/><text x="200" y="162" text-anchor="middle" font-family="Arial" font-size="32" font-weight="bold" fill="%23FFFFFF">$4,900.00</text><text x="200" y="240" text-anchor="middle" font-family="sans-serif" font-size="13" fill="%2394A3B8">To Global Cash Express</text><text x="200" y="270" text-anchor="middle" font-family="sans-serif" font-size="11" fill="%23EF4444">⚠ Visual Inconsistency Detected</text></svg>`,
      },
    }[type];

    setSelectedFile(new File([samples.url], samples.name, { type: "image/svg+xml" }));
    setDocType(samples.type);
    setPreviewUrl(samples.url);
  };

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-slate-900">Upload Financial Evidence Exhibit</h3>
          <p className="text-xs text-slate-500">
            Upload receipts, invoices, POS slips, or screenshots for real-time computer vision analysis & forensics.
          </p>
        </div>

        {onCancel && (
          <button
            onClick={onCancel}
            className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Preset Test Exhibits (Instant testing without external files) */}
      <div className="mb-5 flex flex-wrap items-center gap-2 rounded-lg bg-slate-50 border border-slate-200/80 p-2.5">
        <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 mr-1">
          Quick Demo Exhibits:
        </span>
        <button
          type="button"
          onClick={() => loadPresetSample("CLEAN")}
          className="flex items-center gap-1.5 rounded-md bg-white border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-emerald-300 hover:bg-emerald-50/50 transition shadow-xs"
        >
          <Receipt className="h-3.5 w-3.5 text-emerald-600" />
          <span>Clean POS Receipt</span>
        </button>

        <button
          type="button"
          onClick={() => loadPresetSample("MISMATCH")}
          className="flex items-center gap-1.5 rounded-md bg-white border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-amber-300 hover:bg-amber-50/50 transition shadow-xs"
        >
          <Building2 className="h-3.5 w-3.5 text-amber-600" />
          <span>Mismatched Invoice</span>
        </button>

        <button
          type="button"
          onClick={() => loadPresetSample("ALTERED")}
          className="flex items-center gap-1.5 rounded-md bg-white border border-slate-200 px-2.5 py-1 text-xs font-medium text-slate-700 hover:border-rose-300 hover:bg-rose-50/50 transition shadow-xs"
        >
          <Smartphone className="h-3.5 w-3.5 text-rose-600" />
          <span>Altered Screenshot</span>
        </button>
      </div>

      {/* Document Type Selector */}
      <div className="mb-4">
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
          Document Classification Type
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {(
            [
              { id: "RECEIPT", label: "Receipt", icon: Receipt },
              { id: "INVOICE", label: "Invoice", icon: FileSpreadsheet },
              { id: "POS_SLIP", label: "POS Slip", icon: CreditCard },
              { id: "PAYMENT_SCREENSHOT", label: "Screenshot", icon: Smartphone },
              { id: "BANK_STATEMENT", label: "Statement", icon: FileText },
            ] as const
          ).map((item) => {
            const Icon = item.icon;
            const isSelected = docType === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setDocType(item.id)}
                className={`flex items-center justify-center gap-1.5 rounded-lg border py-2 px-3 text-xs font-semibold transition ${
                  isSelected
                    ? "border-blue-600 bg-blue-50 text-blue-700 shadow-xs"
                    : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
                }`}
              >
                <Icon className={`h-3.5 w-3.5 ${isSelected ? "text-blue-600" : "text-slate-400"}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Drag & Drop Area */}
      <div
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-8 text-center cursor-pointer transition ${
          dragActive
            ? "border-blue-500 bg-blue-50/50"
            : previewUrl
            ? "border-emerald-300 bg-emerald-50/20"
            : "border-slate-200 bg-slate-50/60 hover:bg-slate-50 hover:border-slate-300"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/png,image/jpeg,image/webp,image/svg+xml"
          onChange={handleChange}
          className="hidden"
        />

        {previewUrl ? (
          <div className="flex flex-col items-center gap-3">
            <img
              src={previewUrl}
              alt="Preview"
              className="max-h-48 rounded-lg border border-slate-200 shadow-sm object-contain bg-white"
              referrerPolicy="no-referrer"
            />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              <span className="text-xs font-semibold text-slate-700">
                {selectedFile?.name || "Evidence Loaded"}
              </span>
              <span className="text-[11px] text-slate-400">
                ({selectedFile ? Math.round(selectedFile.size / 1024) : 95} KB)
              </span>
            </div>
            <p className="text-[11px] text-slate-500">Click or drag another image to replace</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-600">
              <UploadCloud className="h-6 w-6" />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-800">
                Click to upload or drag & drop evidence file
              </p>
              <p className="text-xs text-slate-400 mt-0.5">
                PNG, JPG, WEBP, or SVG (Up to 50MB)
              </p>
            </div>
          </div>
        )}
      </div>

      {errorMsg && (
        <div className="mt-3 flex items-center gap-2 rounded-lg border border-rose-200 bg-rose-50 p-2.5 text-xs text-rose-800">
          <AlertTriangle className="h-4 w-4 text-rose-600 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Action Button & Processing Indicator */}
      <div className="mt-5 flex flex-col gap-2">
        <button
          onClick={handleUploadAndAnalyze}
          disabled={!previewUrl || isProcessing}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-2.5 px-4 text-xs font-semibold text-white shadow-xs transition hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin text-white" />
              <span>Analyzing with Forensic Computer Vision...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4 text-blue-200" />
              <span>Run Computer Vision Forensics & Extraction</span>
            </>
          )}
        </button>

        {isProcessing && (
          <div className="flex items-center justify-center gap-2 text-xs font-mono text-slate-600 animate-pulse">
            <span>{processingStep}</span>
          </div>
        )}
      </div>
    </div>
  );
};
