import React, { useState, useRef } from "react";
import {
  EvidenceItem,
  SuspiciousRegion,
  OcrWordBox,
} from "../../types";
import {
  ZoomIn,
  ZoomOut,
  Maximize2,
  Layers,
  Eye,
  AlertTriangle,
  RotateCcw,
  Sparkles,
  Contrast,
  Sliders,
  CheckCircle2,
  FileCheck,
  SplitSquareVertical,
} from "lucide-react";

export type ViewMode = "ORIGINAL" | "ENHANCED" | "HEATMAP" | "OCR" | "SIDE_BY_SIDE";

interface ForensicViewerProps {
  evidence: EvidenceItem;
  comparisonEvidence?: EvidenceItem | null;
  selectedRegionId?: string | null;
  onSelectRegion?: (region: SuspiciousRegion | null) => void;
}

export const ForensicViewer: React.FC<ForensicViewerProps> = ({
  evidence,
  comparisonEvidence,
  selectedRegionId,
  onSelectRegion,
}) => {
  const [zoomLevel, setZoomLevel] = useState<number>(100);
  const [viewMode, setViewMode] = useState<ViewMode>("HEATMAP");
  const [showOcrBoxes, setShowOcrBoxes] = useState<boolean>(true);
  const [showSuspiciousBoxes, setShowSuspiciousBoxes] = useState<boolean>(true);
  const [invertContrast, setInvertContrast] = useState<boolean>(false);
  const [hoveredOcrBox, setHoveredOcrBox] = useState<OcrWordBox | null>(null);

  // Pan state
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 100) {
      setIsDragging(true);
      dragStartRef.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      setPan({
        x: e.clientX - dragStartRef.current.x,
        y: e.clientY - dragStartRef.current.y,
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleResetView = () => {
    setZoomLevel(100);
    setPan({ x: 0, y: 0 });
    setInvertContrast(false);
  };

  const suspiciousCount = evidence.forensics.suspicious_regions.length;

  return (
    <div className="flex flex-col rounded-xl border border-slate-200 bg-white shadow-xs overflow-hidden">
      {/* Top Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200 bg-slate-50/80 px-4 py-2.5">
        {/* Left: View Mode Selector */}
        <div className="flex items-center gap-1 bg-slate-200/70 p-1 rounded-lg">
          <button
            onClick={() => setViewMode("HEATMAP")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition ${
              viewMode === "HEATMAP"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
            <span>Forensic Heatmap</span>
            {suspiciousCount > 0 && (
              <span className="rounded-full bg-rose-100 text-rose-700 px-1.5 py-0.2 text-[10px] font-bold">
                {suspiciousCount}
              </span>
            )}
          </button>

          <button
            onClick={() => setViewMode("OCR")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition ${
              viewMode === "OCR"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Layers className="h-3.5 w-3.5 text-blue-500" />
            <span>OCR Layout</span>
          </button>

          <button
            onClick={() => setViewMode("ENHANCED")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition ${
              viewMode === "ENHANCED"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Sparkles className="h-3.5 w-3.5 text-indigo-500" />
            <span>Edge Contrast</span>
          </button>

          <button
            onClick={() => setViewMode("ORIGINAL")}
            className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition ${
              viewMode === "ORIGINAL"
                ? "bg-white text-slate-900 shadow-xs"
                : "text-slate-600 hover:text-slate-900"
            }`}
          >
            <Eye className="h-3.5 w-3.5 text-slate-500" />
            <span>Original</span>
          </button>

          {comparisonEvidence && (
            <button
              onClick={() => setViewMode("SIDE_BY_SIDE")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-semibold transition ${
                viewMode === "SIDE_BY_SIDE"
                  ? "bg-white text-slate-900 shadow-xs"
                  : "text-slate-600 hover:text-slate-900"
              }`}
            >
              <SplitSquareVertical className="h-3.5 w-3.5 text-amber-500" />
              <span>Side-by-Side</span>
            </button>
          )}
        </div>

        {/* Right: Zoom & Inspection Controls */}
        <div className="flex items-center gap-2">
          {/* Invert Filter Toggle */}
          <button
            onClick={() => setInvertContrast(!invertContrast)}
            title="Invert Contrast / Negative View (Detects hidden background splices)"
            className={`flex items-center gap-1 rounded-md border px-2 py-1 text-xs font-medium transition ${
              invertContrast
                ? "border-indigo-300 bg-indigo-50 text-indigo-700"
                : "border-slate-200 bg-white text-slate-600 hover:bg-slate-50"
            }`}
          >
            <Contrast className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Invert</span>
          </button>

          {/* Zoom Buttons */}
          <div className="flex items-center border border-slate-200 rounded-md bg-white overflow-hidden">
            <button
              onClick={() => setZoomLevel((z) => Math.max(50, z - 25))}
              className="p-1.5 text-slate-600 hover:bg-slate-100 transition"
              title="Zoom Out"
            >
              <ZoomOut className="h-3.5 w-3.5" />
            </button>
            <span className="px-2 text-[11px] font-mono font-medium text-slate-600 min-w-[42px] text-center">
              {zoomLevel}%
            </span>
            <button
              onClick={() => setZoomLevel((z) => Math.min(250, z + 25))}
              className="p-1.5 text-slate-600 hover:bg-slate-100 transition"
              title="Zoom In"
            >
              <ZoomIn className="h-3.5 w-3.5" />
            </button>
          </div>

          <button
            onClick={handleResetView}
            className="p-1.5 text-slate-500 hover:bg-slate-200/60 rounded-md transition"
            title="Reset Zoom & Pan"
          >
            <RotateCcw className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Forensic Quality Metadata Bar */}
      <div className="flex flex-wrap items-center justify-between border-b border-slate-200 bg-slate-900 px-4 py-2 text-white text-xs">
        <div className="flex items-center gap-3">
          <span className="font-semibold text-slate-300">EXHIBIT:</span>
          <span className="font-mono text-blue-400 font-medium">{evidence.filename}</span>
          <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-slate-300 uppercase">
            {evidence.document_type}
          </span>
          <span className="ml-2 inline-flex items-center gap-1 text-[10px] font-bold tracking-wide text-blue-300">
            <Sparkles className="h-3 w-3" /> AI FORENSIC SCAN &middot; COMPLETE
          </span>
        </div>

        <div className="flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Resolution:</span>
            <span
              className={`font-semibold ${
                evidence.quality.resolution === "GOOD" ? "text-emerald-400" : "text-amber-400"
              }`}
            >
              {evidence.quality.resolution}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Sharpness:</span>
            <span className="font-semibold text-emerald-400">{evidence.quality.sharpness}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">OCR Readability:</span>
            <span className="font-mono font-bold text-blue-400">
              {evidence.quality.ocr_readability}%
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <span className="text-slate-400">Quality Score:</span>
            <span className="font-mono font-bold text-emerald-400">
              {evidence.quality.score}/100
            </span>
          </div>
        </div>
      </div>

      {/* Main Interactive Canvas Area */}
      <div
        className={`relative flex min-h-[480px] max-h-[580px] w-full items-center justify-center overflow-hidden bg-slate-950/90 select-none ${
          zoomLevel > 100 ? (isDragging ? "cursor-grabbing" : "cursor-grab") : "cursor-default"
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {/* Side-by-Side Dual View */}
        {viewMode === "SIDE_BY_SIDE" && comparisonEvidence ? (
          <div className="grid grid-cols-2 gap-4 w-full h-full p-4">
            <div className="flex flex-col items-center justify-center rounded-lg border border-slate-700 bg-slate-900/60 p-2">
              <span className="text-[11px] font-mono text-slate-400 mb-2">
                EXHIBIT A: {evidence.filename}
              </span>
              <img
                src={evidence.data_url}
                alt="Exhibit A"
                className="max-h-[440px] max-w-full rounded shadow-md object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex flex-col items-center justify-center rounded-lg border border-slate-700 bg-slate-900/60 p-2">
              <span className="text-[11px] font-mono text-slate-400 mb-2">
                EXHIBIT B: {comparisonEvidence.filename}
              </span>
              <img
                src={comparisonEvidence.data_url}
                alt="Exhibit B"
                className="max-h-[440px] max-w-full rounded shadow-md object-contain"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        ) : (
          /* Single Interactive Canvas */
          <div
            className="relative transition-transform duration-100 ease-out"
            style={{
              transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoomLevel / 100})`,
              transformOrigin: "center center",
            }}
          >
            {/* Primary Document Image */}
            <img
              src={evidence.data_url}
              alt="Forensic Document"
              className={`max-h-[520px] max-w-[480px] rounded-lg shadow-2xl object-contain pointer-events-none transition ${
                viewMode === "ENHANCED"
                  ? "contrast-150 saturate-125 filter"
                  : invertContrast
                  ? "invert contrast-125"
                  : ""
              }`}
              referrerPolicy="no-referrer"
            />

            {/* OCR Bounding Boxes Layer */}
            {(viewMode === "OCR" || showOcrBoxes) &&
              evidence.ocr_boxes.map((item) => (
                <div
                  key={item.id}
                  onMouseEnter={() => setHoveredOcrBox(item)}
                  onMouseLeave={() => setHoveredOcrBox(null)}
                  className={`absolute rounded transition cursor-pointer border ${
                    item.category === "AMOUNT"
                      ? "border-emerald-400 bg-emerald-400/15 hover:bg-emerald-400/30"
                      : item.category === "MERCHANT"
                      ? "border-blue-400 bg-blue-400/15 hover:bg-blue-400/30"
                      : item.category === "DATE" || item.category === "TIME"
                      ? "border-purple-400 bg-purple-400/15 hover:bg-purple-400/30"
                      : "border-sky-300/60 bg-sky-300/10 hover:bg-sky-300/25"
                  }`}
                  style={{
                    left: `${item.box.x}%`,
                    top: `${item.box.y}%`,
                    width: `${item.box.width}%`,
                    height: `${item.box.height}%`,
                  }}
                />
              ))}

            {/* Suspicious Tamper Regions Layer (Forensic Heatmap) */}
            {(viewMode === "HEATMAP" || showSuspiciousBoxes) &&
              evidence.forensics.suspicious_regions.map((region) => {
                const isSelected = selectedRegionId === region.id;
                return (
                  <div
                    key={region.id}
                    onClick={() => onSelectRegion && onSelectRegion(region)}
                    className={`absolute rounded cursor-pointer transition-all duration-200 ${
                      isSelected
                        ? "border-2 border-rose-500 bg-rose-500/35 ring-4 ring-rose-500/40 animate-pulse z-20"
                        : "border-2 border-rose-500/90 bg-rose-500/20 hover:bg-rose-500/30 z-10"
                    }`}
                    style={{
                      left: `${region.box.x}%`,
                      top: `${region.box.y}%`,
                      width: `${region.box.width}%`,
                      height: `${region.box.height}%`,
                    }}
                  >
                    {/* Badge Label */}
                    <div className="absolute -top-6 left-0 flex items-center gap-1 rounded bg-rose-600 px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-white shadow-md whitespace-nowrap">
                      <AlertTriangle className="h-2.5 w-2.5" />
                      <span>{region.label}</span>
                    </div>
                  </div>
                );
              })}
          </div>
        )}

        {/* Live Hover Tooltip for OCR Box */}
        {hoveredOcrBox && (
          <div className="absolute bottom-4 left-4 z-30 flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-900/95 px-3 py-2 text-xs text-white shadow-xl backdrop-blur-sm">
            <span className="font-semibold text-blue-400 uppercase text-[10px]">
              {hoveredOcrBox.category || "OCR TEXT"}:
            </span>
            <span className="font-mono font-medium text-slate-100">"{hoveredOcrBox.text}"</span>
            <span className="rounded bg-slate-800 px-1.5 py-0.5 text-[10px] text-emerald-400 font-mono">
              {Math.round(hoveredOcrBox.confidence * 100)}% conf
            </span>
          </div>
        )}
      </div>

      {/* Forensic Inspection Findings Drawer */}
      <div className="border-t border-slate-200 bg-slate-50 p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Sliders className="h-4 w-4 text-slate-600" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Visual Forensics Inspection Findings ({suspiciousCount})
            </h4>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <label className="flex items-center gap-1.5 cursor-pointer text-slate-600 font-medium">
              <input
                type="checkbox"
                checked={showOcrBoxes}
                onChange={(e) => setShowOcrBoxes(e.target.checked)}
                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500"
              />
              <span>OCR Boxes</span>
            </label>

            <label className="flex items-center gap-1.5 cursor-pointer text-slate-600 font-medium ml-2">
              <input
                type="checkbox"
                checked={showSuspiciousBoxes}
                onChange={(e) => setShowSuspiciousBoxes(e.target.checked)}
                className="rounded border-slate-300 text-rose-600 focus:ring-rose-500"
              />
              <span>Tamper Regions</span>
            </label>
          </div>
        </div>

        {suspiciousCount === 0 ? (
          <div className="flex items-center gap-2.5 rounded-lg border border-emerald-200 bg-emerald-50/70 p-3 text-xs text-emerald-800">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
            <div>
              <p className="font-semibold">No visual tampering signals detected in this exhibit.</p>
              <p className="text-[11px] text-emerald-700/80">
                Font baselines, typography stroke weights, compression quantization, and pixel gradients appear authentic.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {evidence.forensics.suspicious_regions.map((region) => {
              const isSelected = selectedRegionId === region.id;
              return (
                <div
                  key={region.id}
                  onClick={() => onSelectRegion && onSelectRegion(region)}
                  className={`flex flex-col gap-1.5 rounded-lg border p-3 text-xs cursor-pointer transition ${
                    isSelected
                      ? "border-rose-400 bg-rose-50/90 ring-2 ring-rose-300 shadow-sm"
                      : "border-slate-200 bg-white hover:border-rose-300 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
                      <span className="font-bold text-slate-900">{region.label}</span>
                    </div>
                    <span className="rounded bg-rose-100 px-1.5 py-0.2 text-[10px] font-bold text-rose-700">
                      {region.severity} SEVERITY
                    </span>
                  </div>

                  <p className="text-slate-600 text-[11px] leading-relaxed">{region.description}</p>

                  <div className="flex flex-wrap gap-1 mt-1">
                    {region.forensic_indicators.map((ind, i) => (
                      <span
                        key={i}
                        className="rounded bg-slate-100 border border-slate-200 px-1.5 py-0.5 text-[10px] font-medium text-slate-700"
                      >
                        {ind}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
