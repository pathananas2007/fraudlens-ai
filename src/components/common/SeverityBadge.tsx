import React from "react";
import { InvestigationSeverity } from "../../types";
import { ShieldCheck, AlertTriangle, AlertCircle, Flame } from "lucide-react";

interface SeverityBadgeProps {
  severity: InvestigationSeverity | string;
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

export const SeverityBadge: React.FC<SeverityBadgeProps> = ({
  severity,
  size = "md",
  showIcon = true,
}) => {
  const getStyle = () => {
    switch (severity) {
      case "CLEAR":
        return {
          bg: "bg-emerald-50 border-emerald-200 text-emerald-800",
          icon: ShieldCheck,
          iconColor: "text-emerald-600",
          label: "CLEAR",
        };
      case "REVIEW":
        return {
          bg: "bg-amber-50 border-amber-200 text-amber-800",
          icon: AlertTriangle,
          iconColor: "text-amber-600",
          label: "REVIEW REQUIRED",
        };
      case "SUSPICIOUS":
        return {
          bg: "bg-orange-50 border-orange-200 text-orange-800",
          icon: AlertCircle,
          iconColor: "text-orange-600",
          label: "SUSPICIOUS",
        };
      case "HIGH PRIORITY":
      case "CRITICAL":
      case "HIGH":
        return {
          bg: "bg-rose-50 border-rose-200 text-rose-800",
          icon: Flame,
          iconColor: "text-rose-600 animate-pulse",
          label: "HIGH PRIORITY",
        };
      default:
        return {
          bg: "bg-slate-100 border-slate-200 text-slate-800",
          icon: ShieldCheck,
          iconColor: "text-slate-500",
          label: severity,
        };
    }
  };

  const { bg, icon: Icon, iconColor, label } = getStyle();

  const sizeClasses = {
    sm: "px-2 py-0.5 text-[11px] gap-1",
    md: "px-2.5 py-1 text-xs gap-1.5",
    lg: "px-3 py-1.5 text-sm gap-2",
  }[size];

  return (
    <span
      className={`inline-flex items-center rounded-md border font-semibold tracking-wide ${bg} ${sizeClasses}`}
    >
      {showIcon && <Icon className={`h-3.5 w-3.5 shrink-0 ${iconColor}`} />}
      <span>{label}</span>
    </span>
  );
};
