import React from "react";
import {
  LayoutDashboard,
  ShieldAlert,
  CreditCard,
  FileSearch,
  FileCheck,
  BarChart3,
  Code2,
  Settings,
  Sparkles,
  Plus,
  Eye,
  ShieldCheck,
  User,
} from "lucide-react";
import { useAuth } from "../../contexts/AuthContext";

export type NavItem =
  | "overview"
  | "investigations"
  | "new-investigation"
  | "evidence"
  | "transactions"
  | "reports"
  | "analytics"
  | "developer"
  | "settings";

interface SidebarProps {
  currentPage: NavItem;
  onNavigate: (page: NavItem) => void;
  onOpenAuthModal?: () => void;
  investigationsCount?: number;
  evidenceCount?: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  onOpenAuthModal,
  investigationsCount,
  evidenceCount,
}) => {
  const { user } = useAuth();

  const isDemo = user?.email === "demo.analyst@fraudlens.ai";
  const actualInvCount = investigationsCount ?? (isDemo ? 4 : 0);
  const actualEviCount = evidenceCount ?? (isDemo ? 6 : 0);

  const navLinks: Array<{
    id: NavItem;
    label: string;
    icon: React.ComponentType<{ className?: string }>;
    badge?: string | number;
    badgeColor?: string;
  }> = [
    { id: "overview", label: "Forensic Overview", icon: LayoutDashboard },
    {
      id: "investigations",
      label: "Investigation Cases",
      icon: ShieldAlert,
      badge: actualInvCount,
      badgeColor: "bg-rose-500/20 text-rose-400",
    },
    {
      id: "evidence",
      label: "Evidence Vault",
      icon: FileSearch,
      badge: actualEviCount,
      badgeColor: "bg-blue-500/20 text-blue-400",
    },
    { id: "transactions", label: "Transaction Ledger", icon: CreditCard },
    { id: "reports", label: "Formal Dossiers", icon: FileCheck },
    { id: "analytics", label: "Forensic Analytics", icon: BarChart3 },
    { id: "developer", label: "API & Webhooks", icon: Code2 },
    { id: "settings", label: "Forensics Engine", icon: Settings },
  ];

  return (
    <aside className="flex flex-col w-64 bg-[#0a0a0a] border-r border-white/5 min-h-screen shrink-0 select-none">
      {/* Brand Header */}
      <div className="flex flex-col px-5 py-5 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-transform duration-200 hover:scale-105">
            <Eye className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-extrabold text-white tracking-tight text-base">FraudLens</span>
              <span className="rounded bg-blue-500/20 px-1 text-[10px] font-bold text-blue-400">AI</span>
            </div>
            <p className="text-[11px] font-medium text-slate-500 leading-tight">Evidence Forensics SaaS</p>
          </div>
        </div>

        {/* New Investigation CTA */}
        <button
          onClick={() => onNavigate("new-investigation")}
          className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-2.5 text-xs font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] transition-all duration-200 hover:bg-blue-500 hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] hover:scale-[1.02] active:scale-[0.98]"
        >
          <Plus className="h-3.5 w-3.5" />
          <span>New Investigation</span>
        </button>
      </div>

      {/* Navigation */}
      <div className="flex-1 px-3 py-4 space-y-0.5 overflow-y-auto">
        <div className="px-3 pb-3 text-[10px] font-bold uppercase tracking-[0.15em] text-slate-600">
          Forensics Workspace
        </div>

        {navLinks.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`group relative flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-xs font-semibold transition-all duration-200 ${
                isActive
                  ? "bg-blue-600/15 text-blue-400 border border-blue-500/20"
                  : "text-slate-400 hover:bg-white/5 hover:text-white border border-transparent"
              }`}
            >
              {/* Active left bar */}
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-0.5 bg-blue-500 rounded-r-full" />
              )}
              <div className="flex items-center gap-2.5">
                <Icon
                  className={`h-4 w-4 transition-colors duration-150 ${
                    isActive ? "text-blue-400" : "text-slate-600 group-hover:text-slate-300"
                  }`}
                />
                <span>{item.label}</span>
              </div>
              {item.badge !== undefined && (
                <span
                  className={`rounded-full px-1.5 py-0.5 text-[10px] font-bold transition-colors ${
                    isActive
                      ? "bg-blue-500/30 text-blue-300"
                      : item.badgeColor || "bg-white/10 text-slate-400"
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Forensics Status Card */}
      <div className="p-3 mx-3 mb-3 rounded-xl border border-white/5 bg-white/3 hover:border-blue-500/20 hover:bg-blue-600/5 transition-all duration-200 cursor-default">
        <div className="flex items-center justify-between text-xs font-bold text-white mb-1">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-blue-400" />
            <span>Forensics Pipeline</span>
          </div>
          <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse-slow" />
        </div>
        <p className="text-[11px] text-slate-500 leading-snug">
          OCR, layout segmentation & visual tampering checks operational.
        </p>
        <div className="mt-2 flex items-center justify-between text-[10px] font-mono text-slate-600 border-t border-white/5 pt-1.5">
          <span>Engine: v2.4-cv</span>
          <span className="text-emerald-500 font-semibold">100% Online</span>
        </div>
      </div>

      {/* User Session Footer */}
      <div className="px-3 pb-4 border-t border-white/5 pt-3">
        {user ? (
          <div
            onClick={onOpenAuthModal}
            className="flex items-center gap-2.5 p-2.5 rounded-xl bg-white/3 hover:bg-white/8 border border-white/5 hover:border-white/15 cursor-pointer transition-all duration-200 group"
            title="Click to switch or view account"
          >
            {user.photoURL ? (
              <img
                src={user.photoURL}
                alt={user.displayName || "User"}
                className="h-8 w-8 rounded-full object-cover ring-1 ring-white/20 shrink-0"
                referrerPolicy="no-referrer"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white shrink-0">
                {user.displayName ? user.displayName.substring(0, 2).toUpperCase() : "FL"}
              </div>
            )}
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate group-hover:text-blue-300 transition-colors duration-150">
                {user.displayName || "Investigator"}
              </p>
              <p className="text-[10px] text-slate-500 truncate">
                {user.email || "Connected via Firebase"}
              </p>
            </div>
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-500 shrink-0" />
          </div>
        ) : (
          <button
            onClick={onOpenAuthModal}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600/15 border border-blue-500/20 p-2.5 text-xs font-semibold text-blue-400 hover:bg-blue-600/25 transition-all duration-200"
          >
            <User className="h-3.5 w-3.5" />
            <span>Sign In to FraudLens</span>
          </button>
        )}
      </div>
    </aside>
  );
};
