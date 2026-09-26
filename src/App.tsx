import React, { useState, useEffect } from "react";
import { Eye } from "lucide-react";
import { Sidebar, NavItem } from "./components/layout/Sidebar";
import { Header } from "./components/layout/Header";
import { LandingPage } from "./pages/LandingPage";
import { OverviewPage } from "./pages/OverviewPage";
import { InvestigationsPage } from "./pages/InvestigationsPage";
import { InvestigationWorkspace } from "./pages/InvestigationWorkspace";
import { NewInvestigationWizard } from "./pages/NewInvestigationWizard";
import { TransactionsPage } from "./pages/TransactionsPage";
import { EvidencePage } from "./pages/EvidencePage";
import { ReportsPage } from "./pages/ReportsPage";
import { AnalyticsPage } from "./pages/AnalyticsPage";
import { ApiDeveloperPage } from "./pages/ApiDeveloperPage";
import { SettingsPage } from "./pages/SettingsPage";
import { FormalReportModal } from "./components/investigation/FormalReportModal";
import { AuthModal } from "./components/auth/AuthModal";
import { AuthProvider, useAuth } from "./contexts/AuthContext";
import { InvestigationCase, Transaction, EvidenceItem } from "./types";

export type ViewState = NavItem | "workspace" | "landing";

// ─── Sheryians-style Splash Screen ───────────────────────────────────────────
const SplashScreen: React.FC<{ visible: boolean }> = ({ visible }) => (
  <div
    className="splash-screen"
    style={{
      opacity: visible ? 1 : 0,
      visibility: visible ? "visible" : "hidden",
      transition: "opacity 0.5s ease-out, visibility 0.5s ease-out",
    }}
  >
    {/* Radial glow */}
    <div className="splash-glow" />

    {/* Logo */}
    <div className="animate-logoEntrance flex flex-col items-center gap-5 relative z-10">
      <div className="flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-600 shadow-2xl shadow-blue-500/40">
          <Eye className="h-8 w-8 text-white" />
        </div>
        <div>
          <div className="text-2xl font-extrabold tracking-tight text-white">
            FraudLens <span className="text-blue-400">AI</span>
          </div>
          <p className="text-xs text-slate-400 font-medium">Evidence Forensics Platform</p>
        </div>
      </div>

      {/* Bouncing dots — Sheryians style */}
      <div className="dot-loader">
        <span style={{ background: "#3B82F6" }} />
        <span style={{ background: "#60A5FA" }} />
        <span style={{ background: "#93C5FD" }} />
      </div>
    </div>
  </div>
);

// ─── App Content ──────────────────────────────────────────────────────────────
function AppContent() {
  const { user } = useAuth();
  const [currentPage, setCurrentPage] = useState<ViewState>("landing");
  const [selectedCaseId, setSelectedCaseId] = useState<string>("case-1");
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [splash, setSplash] = useState(true);
  const [reportCase, setReportCase] = useState<{
    investigation: InvestigationCase;
    evidence: EvidenceItem[];
  } | null>(null);

  // Sheryians-style splash — fade out after 1.8s
  useEffect(() => {
    const t = setTimeout(() => setSplash(false), 1800);
    return () => clearTimeout(t);
  }, []);

  // Redirect to landing page when user logs out
  useEffect(() => {
    if (!user && !splash) {
      setCurrentPage("landing");
    }
  }, [user, splash]);

  const handleOpenCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    setCurrentPage("workspace");
  };

  const handleCreateCaseFromTxn = (txn: Transaction) => {
    setCurrentPage("new-investigation");
  };

  const handleCaseCreated = (caseId: string) => {
    setSelectedCaseId(caseId);
    setCurrentPage("workspace");
  };

  return (
    <>
      {/* Sheryians-style splash loader */}
      <SplashScreen visible={splash} />

      {/* Landing page */}
      {currentPage === "landing" && !splash && (
        <>
          <LandingPage
            onEnterApp={() => setCurrentPage("overview")}
            onOpenDemoCase={() => {
              setSelectedCaseId("case-1");
              setCurrentPage("workspace");
            }}
            onOpenAuth={() => setIsAuthModalOpen(true)}
          />
          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onSuccess={() => {
              setCurrentPage("overview");
              setIsAuthModalOpen(false);
            }}
          />
        </>
      )}

      {/* App shell — all other pages */}
      {currentPage !== "landing" && !splash && (
        <div className="flex h-screen bg-[#0a0a0a] font-sans text-slate-100 antialiased overflow-hidden">
          <Sidebar
            currentPage={
              currentPage === "workspace" ? "investigations" : (currentPage as NavItem)
            }
            onNavigate={(page) => setCurrentPage(page)}
            onOpenAuthModal={() => setIsAuthModalOpen(true)}
          />

          <div className="flex flex-1 flex-col overflow-hidden">
            <Header
              currentPage={currentPage}
              onOpenNewInvestigation={() => setCurrentPage("new-investigation")}
              onNavigateLanding={() => setCurrentPage("landing")}
              onOpenAuthModal={() => setIsAuthModalOpen(true)}
            />

            <main className="flex-1 overflow-y-auto">
              {currentPage === "overview" && (
                <OverviewPage
                  onOpenInvestigation={handleOpenCase}
                  onNewInvestigation={() => setCurrentPage("new-investigation")}
                  onNavigate={(page) => setCurrentPage(page as ViewState)}
                />
              )}

              {currentPage === "investigations" && (
                <InvestigationsPage
                  onOpenInvestigation={handleOpenCase}
                  onNewInvestigation={() => setCurrentPage("new-investigation")}
                />
              )}

              {currentPage === "workspace" && (
                <InvestigationWorkspace
                  caseId={selectedCaseId}
                  onBack={() => setCurrentPage("investigations")}
                />
              )}

              {currentPage === "new-investigation" && (
                <NewInvestigationWizard
                  onCancel={() => setCurrentPage("investigations")}
                  onCaseCreated={handleCaseCreated}
                />
              )}

              {currentPage === "transactions" && (
                <TransactionsPage onInvestigateTransaction={handleCreateCaseFromTxn} />
              )}

              {currentPage === "evidence" && <EvidencePage />}
              {currentPage === "reports" && <ReportsPage />}
              {currentPage === "analytics" && <AnalyticsPage />}
              {currentPage === "developer" && <ApiDeveloperPage />}
              {currentPage === "settings" && <SettingsPage />}
            </main>
          </div>

          {reportCase && (
            <FormalReportModal
              investigation={reportCase.investigation}
              evidenceItems={reportCase.evidence}
              isOpen={true}
              onClose={() => setReportCase(null)}
            />
          )}

          <AuthModal
            isOpen={isAuthModalOpen}
            onClose={() => setIsAuthModalOpen(false)}
            onSuccess={() => {
              setCurrentPage("overview");
              setIsAuthModalOpen(false);
            }}
          />
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}
