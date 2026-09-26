import React from "react";
import { InvestigationStatus } from "../../types";

interface StatusBadgeProps {
  status: InvestigationStatus;
  size?: "sm" | "md";
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, size = "md" }) => {
  const getStyle = () => {
    switch (status) {
      case "NEW":
        return "bg-blue-50 border-blue-200 text-blue-700";
      case "INVESTIGATING":
        return "bg-indigo-50 border-indigo-200 text-indigo-700";
      case "IN_REVIEW":
        return "bg-amber-50 border-amber-200 text-amber-700";
      case "RESOLVED":
        return "bg-emerald-50 border-emerald-200 text-emerald-700";
      case "DISMISSED":
        return "bg-slate-100 border-slate-200 text-slate-600";
      default:
        return "bg-slate-50 border-slate-200 text-slate-700";
    }
  };

  const sizeClasses = size === "sm" ? "px-2 py-0.5 text-[11px]" : "px-2.5 py-1 text-xs";

  return (
    <span className={`inline-flex items-center rounded-md border font-medium ${getStyle()} ${sizeClasses} whitespace-nowrap`}>
      {status}
    </span>
  );
};
