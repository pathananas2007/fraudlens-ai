import React from "react";
import { RiskLevel } from "../../types";

interface RiskBadgeProps {
  level: RiskLevel;
  score?: number;
  size?: "sm" | "md" | "lg";
  showDot?: boolean;
}

export const RiskBadge: React.FC<RiskBadgeProps> = ({ level, score, size = "md", showDot = true }) => {
  const getColors = () => {
    switch (level) {
      case "CRITICAL":
        return {
          bg: "bg-rose-50 border-rose-200 text-rose-800",
          dot: "bg-rose-600 animate-pulse",
          scoreBg: "bg-rose-100 text-rose-900",
        };
      case "HIGH":
        return {
          bg: "bg-red-50 border-red-200 text-red-700",
          dot: "bg-red-500",
          scoreBg: "bg-red-100 text-red-800",
        };
      case "MEDIUM":
        return {
          bg: "bg-amber-50 border-amber-200 text-amber-800",
          dot: "bg-amber-500",
          scoreBg: "bg-amber-100 text-amber-900",
        };
      case "LOW":
      default:
        return {
          bg: "bg-emerald-50 border-emerald-200 text-emerald-800",
          dot: "bg-emerald-500",
          scoreBg: "bg-emerald-100 text-emerald-900",
        };
    }
  };

  const { bg, dot, scoreBg } = getColors();

  const sizeClasses = {
    sm: "px-2 py-0.5 text-xs font-semibold",
    md: "px-2.5 py-1 text-xs font-semibold",
    lg: "px-3 py-1.5 text-sm font-bold",
  }[size];

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-md border ${bg} ${sizeClasses} tracking-tight whitespace-nowrap shadow-xs`}
    >
      {showDot && <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />}
      <span>{level}</span>
      {score !== undefined && (
        <span className={`ml-1 rounded px-1 py-0.2 text-[10px] font-mono ${scoreBg}`}>
          {score}
        </span>
      )}
    </span>
  );
};
