import React, { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import {
  ShieldCheck,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User,
  X,
  AlertCircle,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Scan,
} from "lucide-react";

interface AuthModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onSuccess?: () => void;
  canClose?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  canClose = true,
}) => {
  const {
    user,
    loading,
    error,
    loginWithGoogle,
    loginWithEmail,
    registerWithEmail,
    loginDemo,
    clearError,
  } = useAuth();

  const [tab, setTab] = useState<"signin" | "signup" | "demo">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    clearError();
    try {
      if (tab === "signin") {
        await loginWithEmail(email, password);
      } else if (tab === "signup") {
        await registerWithEmail(email, password, displayName);
      }
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch {
      // Error handled by AuthContext
    } finally {
      setSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setSubmitting(true);
    clearError();
    try {
      await loginWithGoogle();
      if (onSuccess) onSuccess();
      if (onClose) onClose();
    } catch {
      // Error handled by AuthContext
    } finally {
      setSubmitting(false);
    }
  };

  const handleDemoSignIn = (role: string, name: string, demoEmail: string) => {
    loginDemo(role);
    if (onSuccess) onSuccess();
    if (onClose) onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md animate-fadeIn">
      <div className="relative w-full max-w-4xl rounded-3xl overflow-hidden shadow-[0_0_80px_rgba(37,99,235,0.2)] border border-white/10 flex flex-col md:flex-row min-h-[580px]">

        {/* ── Left Panel: Brand ─────────────────────────────────────── */}
        <div className="relative hidden md:flex flex-col justify-between p-12 bg-[#0a0a0a] md:w-[45%] overflow-hidden">
          {/* Background glow */}
          <div className="absolute -top-20 -left-20 h-80 w-80 rounded-full bg-blue-600/20 blur-[80px] pointer-events-none" />
          <div className="absolute -bottom-20 -right-10 h-60 w-60 rounded-full bg-cyan-500/10 blur-[60px] pointer-events-none" />

          {/* Logo */}
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-12">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.5)]">
                <Eye className="h-6 w-6" />
              </div>
              <div>
                <span className="font-extrabold text-white text-xl tracking-tight">FraudLens</span>
                <span className="ml-1.5 rounded bg-blue-500/20 px-1.5 py-0.5 text-[10px] font-bold text-blue-400">AI</span>
              </div>
            </div>

            <h2 className="text-4xl font-black text-white leading-tight tracking-tight mb-4">
              See the evidence.<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
                Detect the inconsistency.
              </span>
            </h2>
            <p className="text-slate-400 leading-relaxed text-sm">
              The forensic-grade AI platform used by investigators to uncover suspicious financial evidence.
            </p>
          </div>

          {/* Feature list */}
          <div className="relative z-10 space-y-4">
            {[
              { icon: Scan, text: "OCR & Visual Document Analysis" },
              { icon: ShieldCheck, text: "Cross-Evidence Verification" },
              { icon: CheckCircle2, text: "Automated Investigation Reports" },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-blue-400">
                  <item.icon className="h-4 w-4" />
                </div>
                <span className="text-sm font-medium text-slate-300">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right Panel: Form ──────────────────────────────────────── */}
        <div className="flex-1 bg-[#111] p-8 sm:p-10 relative">
          {/* Close Button */}
          {canClose && onClose && (
            <button
              onClick={onClose}
              className="absolute top-5 right-5 rounded-full p-2 text-slate-500 hover:bg-white/10 hover:text-white transition"
            >
              <X className="h-5 w-5" />
            </button>
          )}

          {/* Mobile Logo */}
          <div className="flex md:hidden items-center gap-2 mb-6">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white">
              <Eye className="h-5 w-5" />
            </div>
            <span className="font-extrabold text-white text-lg">FraudLens <span className="text-blue-400">AI</span></span>
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h3 className="text-2xl font-black text-white tracking-tight">
              {tab === "demo" ? "Quick Demo Access" : tab === "signup" ? "Create Account" : "Welcome back"}
            </h3>
            <p className="text-slate-500 text-sm mt-1">
              {tab === "demo"
                ? "Launch the console instantly with a preset analyst profile."
                : tab === "signup"
                ? "Join the FraudLens forensics platform."
                : "Sign in to your investigator console."}
            </p>
          </div>

          {/* Navigation Tabs */}
          <div className="flex rounded-xl bg-white/5 border border-white/10 p-1 mb-6 text-xs font-semibold">
            {(["signin", "signup", "demo"] as const).map((t) => (
              <button
                key={t}
                onClick={() => { setTab(t); clearError(); }}
                className={`flex-1 rounded-lg py-2 transition-all ${
                  tab === t
                    ? "bg-white text-black shadow"
                    : "text-slate-400 hover:text-white"
                }`}
              >
                {t === "signin" ? "Sign In" : t === "signup" ? "Register" : "Demo"}
              </button>
            ))}
          </div>

          {/* Error Notification */}
          {error && (
            <div className="mb-4 flex items-start gap-2.5 rounded-xl border border-rose-500/30 bg-rose-500/10 p-3 text-xs text-rose-300">
              <AlertCircle className="h-4 w-4 text-rose-400 shrink-0 mt-0.5" />
              <div className="flex-1 leading-relaxed">
                <span className="font-semibold block">Authentication Notice:</span>
                {error}
              </div>
            </div>
          )}

          {/* Sign In / Register Form */}
          {(tab === "signin" || tab === "signup") && (
            <div className="space-y-4">
              {/* Google OAuth */}
              <button
                type="button"
                onClick={handleGoogleSignIn}
                disabled={submitting || loading}
                className="flex w-full items-center justify-center gap-2.5 rounded-xl border border-white/10 bg-white/5 py-3 px-4 text-sm font-semibold text-white hover:bg-white/10 transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50"
              >
                <svg className="h-4 w-4" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                </svg>
                <span>Continue with Google</span>
              </button>

              <div className="relative flex items-center justify-center my-2">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-white/10"></div>
                </div>
                <span className="relative bg-[#111] px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Or with email
                </span>
              </div>

              {/* Email / Password Form */}
              <form onSubmit={handleSubmit} className="space-y-3">
                {tab === "signup" && (
                  <div>
                    <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                      Investigator Name
                    </label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                      <input
                        type="text"
                        required
                        placeholder="e.g. Sarah Jenkins"
                        value={displayName}
                        onChange={(e) => setDisplayName(e.target.value)}
                        className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-3 py-3 text-sm text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none focus:bg-white/8 transition"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="analyst@institution.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-3 py-3 text-sm text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none focus:bg-white/8 transition"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-500 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      minLength={6}
                      placeholder="••••••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-white/10 bg-white/5 pl-10 pr-10 py-3 text-sm text-white placeholder-slate-600 focus:border-blue-500 focus:outline-none focus:bg-white/8 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-3 text-slate-500 hover:text-slate-300"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting || loading}
                  className="w-full mt-2 flex items-center justify-center gap-2 rounded-xl bg-white py-3 px-4 text-sm font-black text-black hover:bg-slate-200 transition hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 shadow-[0_0_30px_rgba(255,255,255,0.1)]"
                >
                  {submitting ? (
                    <span>Authenticating...</span>
                  ) : tab === "signin" ? (
                    <span>Sign In to Console</span>
                  ) : (
                    <span>Create Account</span>
                  )}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </form>
            </div>
          )}

          {/* Demo Tab */}
          {tab === "demo" && (
            <div className="space-y-3">
              {[
                {
                  role: "Lead Forensics Specialist",
                  name: "Sarah Jenkins, CFE",
                  email: "sarah.jenkins@fraudlens.ai",
                  label: "Primary",
                  sub: "Lead Forensics Specialist • Full Case Authority",
                  accent: "bg-blue-500/20 text-blue-400 border-blue-500/30",
                },
                {
                  role: "Senior Fraud Analyst",
                  name: "Marcus Vance, CAMS",
                  email: "marcus.vance@fraudlens.ai",
                  label: "Auditor",
                  sub: "Senior Fraud Analyst • Transaction Audits",
                  accent: "bg-white/10 text-slate-300 border-white/10",
                },
              ].map((profile, i) => (
                <button
                  key={i}
                  onClick={() => handleDemoSignIn(profile.role, profile.name, profile.email)}
                  className="w-full flex items-center justify-between p-4 rounded-2xl border border-white/10 bg-white/5 hover:bg-white/10 hover:border-white/20 text-left transition group"
                >
                  <div>
                    <p className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors">
                      {profile.name}
                    </p>
                    <p className="text-xs text-slate-500 mt-0.5">{profile.sub}</p>
                  </div>
                  <span className={`rounded-lg border px-2.5 py-1 text-[10px] font-bold ${profile.accent}`}>
                    {profile.label}
                  </span>
                </button>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="mt-6 border-t border-white/5 pt-4 text-center">
            <p className="text-[10px] font-mono text-slate-600">
              Project: <span className="text-slate-500">fraudlens-production-env</span> • Encrypted TLS 1.3
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
