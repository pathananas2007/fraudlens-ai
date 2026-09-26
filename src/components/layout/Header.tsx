import React, { useState } from "react";
import {
  Bell,
  Activity,
  PlusCircle,
  ExternalLink,
  ChevronDown,
  User,
  Eye,
  LogOut,
  LogIn,
  Key,
} from "lucide-react";
import { SystemHealth } from "../../types";
import { useAuth } from "../../contexts/AuthContext";

interface HeaderProps {
  systemHealth?: SystemHealth | null;
  onOpenNewInvestigation: () => void;
  onNavigateLanding: () => void;
  onOpenAuthModal?: () => void;
  currentPage: string;
}

export const Header: React.FC<HeaderProps> = ({
  systemHealth,
  onOpenNewInvestigation,
  onNavigateLanding,
  onOpenAuthModal,
  currentPage,
}) => {
  const { user, logout } = useAuth();
  const [showHealthMenu, setShowHealthMenu] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const getInitials = (name?: string | null, email?: string | null) => {
    if (name) {
      const parts = name.split(" ");
      if (parts.length >= 2) return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
      return name.substring(0, 2).toUpperCase();
    }
    if (email) return email.substring(0, 2).toUpperCase();
    return "FL";
  };

  const pageTitle = currentPage.replace(/-/g, " ");

  return (
    <header className="sticky top-0 z-20 flex h-16 w-full items-center justify-between border-b border-white/5 bg-[#0a0a0a]/90 px-6 backdrop-blur-md">
      {/* Left: Breadcrumbs */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.15em] text-slate-600">
            Forensics Console
          </span>
          <span className="text-white/10">/</span>
          <h1 className="text-sm font-bold capitalize text-white">
            {pageTitle}
          </h1>
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* System Health Status */}
        <div className="relative">
          <button
            onClick={() => setShowHealthMenu(!showHealthMenu)}
            className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-white/10"
            title="Computer Vision Forensics Telemetry"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
            </span>
            <span className="hidden sm:inline text-slate-400">Vision Forensics</span>
            <span className="font-semibold text-emerald-400">Online</span>
            <ChevronDown className="h-3.5 w-3.5 text-slate-500" />
          </button>

          {showHealthMenu && (
            <div className="absolute right-0 mt-2 w-80 rounded-2xl border border-white/10 bg-[#111] p-4 shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-50">
              <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
                <span className="text-xs font-bold text-white flex items-center gap-1.5">
                  <Activity className="h-3.5 w-3.5 text-blue-400" />
                  Forensics Engine Telemetry
                </span>
                <span className="rounded-lg bg-emerald-500/20 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                  HEALTHY
                </span>
              </div>
              <div className="space-y-2 text-xs">
                {[
                  { label: "Vision OCR", value: "Active (Multi-Angle)", color: "text-blue-400" },
                  { label: "Visual Tamper Checks", value: "Heuristics & Font Analysis", color: "text-emerald-400" },
                  { label: "Cross-Evidence Matrix", value: "Automated Audit Active", color: "text-indigo-400" },
                  { label: "Integrity Custody", value: "SHA-256 Enabled", color: "text-slate-300" },
                ].map((item, i) => (
                  <div key={i} className="flex justify-between py-1.5 border-b border-white/5 last:border-0">
                    <span className="text-slate-500">{item.label}</span>
                    <span className={`font-semibold ${item.color}`}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* View Landing Page */}
        <button
          onClick={onNavigateLanding}
          className="hidden md:flex items-center gap-1.5 rounded-xl border border-white/10 px-3 py-1.5 text-xs font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white"
          title="View public SaaS landing page"
        >
          <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
          <span>Product Overview</span>
        </button>

        {/* New Investigation CTA */}
        <button
          onClick={onOpenNewInvestigation}
          className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-[0_0_20px_rgba(37,99,235,0.3)] transition hover:bg-blue-500 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(37,99,235,0.5)] active:scale-[0.98]"
        >
          <PlusCircle className="h-4 w-4" />
          <span>New Investigation</span>
        </button>

        {/* User Avatar / Menu */}
        {user ? (
          <div className="relative">
            <button
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="flex items-center gap-2 rounded-full p-0.5 hover:ring-2 hover:ring-blue-500/50 transition"
              title="Investigator Account"
            >
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt={user.displayName || "User"}
                  className="h-8 w-8 rounded-full object-cover ring-2 ring-white/10"
                  referrerPolicy="no-referrer"
                />
              ) : (
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-xs font-bold text-white ring-2 ring-white/10">
                  {getInitials(user.displayName, user.email)}
                </div>
              )}
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 rounded-2xl border border-white/10 bg-[#111] p-2.5 shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-50">
                <div className="p-2.5 border-b border-white/5 mb-1">
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-bold text-white truncate">
                      {user.displayName || "Investigator"}
                    </p>
                    <span className="rounded-lg bg-blue-500/20 border border-blue-500/20 px-1.5 py-0.5 text-[9px] font-bold text-blue-400 uppercase">
                      {user.provider}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-500 truncate mt-0.5">
                    {user.email || "No email provided"}
                  </p>
                  <p className="text-[10px] font-semibold text-slate-600 mt-1">
                    {user.role}
                  </p>
                </div>

                <div className="py-1 space-y-0.5">
                  {onOpenAuthModal && (
                    <button
                      onClick={() => { setShowProfileMenu(false); onOpenAuthModal(); }}
                      className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-white transition"
                    >
                      <Key className="h-3.5 w-3.5 text-slate-500" />
                      <span>Switch / Link Account</span>
                    </button>
                  )}
                  <button
                    onClick={() => { setShowProfileMenu(false); onNavigateLanding(); }}
                    className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-medium text-slate-300 hover:bg-white/5 hover:text-white transition"
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-slate-500" />
                    <span>Public Landing Page</span>
                  </button>
                </div>

                <div className="border-t border-white/5 pt-1">
                  <button
                    onClick={async () => { setShowProfileMenu(false); await logout(); }}
                    className="flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition"
                  >
                    <LogOut className="h-3.5 w-3.5 text-rose-500" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onOpenAuthModal}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold text-slate-300 hover:bg-white/10 transition"
          >
            <LogIn className="h-3.5 w-3.5 text-blue-400" />
            <span>Sign In</span>
          </button>
        )}
      </div>
    </header>
  );
};
