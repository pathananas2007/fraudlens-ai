import React, { useState, useEffect, useRef } from "react";
import {
  Eye,
  ArrowRight,
  Menu,
  X,
  ShieldCheck,
  FileSearch,
  Layers,
  GitCompare,
  Clock,
  FileText,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Lock,
  Server,
  Code2,
  Scan,
  Search,
  Scale,
  ArrowUpRight
} from "lucide-react";
import { useAuth } from "../contexts/AuthContext";

interface LandingPageProps {
  onEnterApp: () => void;
  onOpenDemoCase: () => void;
  onOpenAuth: () => void;
}

// ─── Navbar ───────────────────────────────────────────────────────────────────

const Navbar: React.FC<{
  onEnterApp: () => void;
  onOpenAuth: () => void;
  user: any;
}> = ({ onEnterApp, onOpenAuth, user }) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 12);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "Product", href: "#product" },
    { label: "Features", href: "#features" },
    { label: "How it Works", href: "#how-it-works" },
    { label: "Forensics", href: "#forensics" },
    { label: "Security", href: "#security" },
    { label: "Contact", href: "#contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a0a0a]/90 backdrop-blur-md border-b border-white/10"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]">
              <Eye className="h-6 w-6" />
            </div>
            <div>
              <span className="font-extrabold text-white text-xl tracking-tight">
                FraudLens
              </span>
              <span className="ml-1.5 rounded bg-blue-500/20 px-1.5 py-0.5 text-[10px] font-bold text-blue-400">
                AI
              </span>
            </div>
          </div>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-8 rounded-full bg-white/5 border border-white/10 px-8 py-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm font-semibold text-slate-300 hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTAs */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={user ? onEnterApp : onOpenAuth}
              className="text-sm font-bold text-slate-300 hover:text-white transition-colors"
            >
              Sign In
            </button>
            <button
              onClick={user ? onEnterApp : onOpenAuth}
              className="flex items-center gap-2 rounded-full bg-white text-black px-6 py-2.5 text-sm font-bold hover:bg-slate-200 transition shadow-lg hover:scale-105 active:scale-95"
            >
              {user ? "Console" : "Get Started"}
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden text-white p-2"
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
    </nav>
  );
};

// ─── Hero Section (Sheryians Inspired Big Image + Text) ────────────────────────

const HeroSection: React.FC<{ onStartInvestigation: () => void }> = ({ onStartInvestigation }) => (
  <section id="product" className="relative pt-32 pb-20 md:pt-48 md:pb-32 bg-[#0a0a0a] overflow-hidden min-h-screen flex items-center">
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-900/40 via-[#0a0a0a] to-[#0a0a0a] pointer-events-none" />
    
    <div className="relative max-w-7xl mx-auto px-6 w-full">
      <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        
        {/* Left: Large Image Card */}
        <div className="relative group order-2 lg:order-1">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div className="relative rounded-3xl border border-white/10 bg-[#111] overflow-hidden aspect-[4/3]">
            <img 
              src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" 
              alt="Data Analysis" 
              className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
            />
            {/* Floating Elements mimicking Sheryians */}
            <div className="absolute top-6 right-6 flex items-center gap-2 rounded-2xl bg-black/50 backdrop-blur-md border border-white/10 p-3 shadow-xl">
              <Scan className="h-6 w-6 text-blue-400" />
              <div>
                <p className="text-white text-xs font-bold">OCR Active</p>
                <p className="text-slate-400 text-[10px]">Scanning documents</p>
              </div>
            </div>
            <div className="absolute bottom-6 left-6 rounded-2xl bg-blue-600 p-4 shadow-[0_0_30px_rgba(37,99,235,0.5)]">
              <Eye className="h-8 w-8 text-white mb-2" />
              <p className="text-white text-sm font-black leading-tight">Visual<br/>Forensics</p>
            </div>
          </div>
        </div>

        {/* Right: Massive Typography */}
        <div className="order-1 lg:order-2 space-y-8">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-bold text-blue-400">
            <Sparkles className="h-4 w-4" />
            <span>AI-Powered Forensics Cohort</span>
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] tracking-tight">
            See the evidence.<br />
            Detect the <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">inconsistency.</span>
          </h1>
          
          <p className="text-lg text-slate-400 max-w-xl leading-relaxed font-medium">
            Build real scalable investigations used by top forensic teams. Learn to analyze receipts, invoices, payment screenshots, and POS slips with computer vision and OCR.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-blue-400">
                <Clock className="h-5 w-5" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Real-time</p>
                <p className="text-slate-400 text-xs">Analysis Engine</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-emerald-400">
                <CheckCircle2 className="h-5 w-5" />
              </div>
              <div>
                <p className="text-white font-bold text-sm">Verified</p>
                <p className="text-slate-400 text-xs">Integrity Checks</p>
              </div>
            </div>
          </div>

          <button
            onClick={onStartInvestigation}
            className="mt-4 flex items-center gap-3 rounded-full bg-white px-8 py-4 text-base font-black text-black hover:bg-slate-200 transition-all hover:scale-105 active:scale-95 shadow-[0_0_40px_rgba(255,255,255,0.2)]"
          >
            Start Investigation Now
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>

      </div>
    </div>
  </section>
);

// ─── Stacked Cards Section (Sheryians Scroll Effect) ────────────────────────

const StackedFeaturesSection: React.FC = () => {
  const cards = [
    {
      id: "card-1",
      title: "Visual Forensics & OCR",
      subtitle: "3.0 Investigation Engine",
      desc: "Inspect suspicious regions, visual inconsistencies, image characteristics, and possible document alterations using our proprietary AI models.",
      color: "bg-blue-600",
      img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80",
    },
    {
      id: "card-2",
      title: "Cross-Evidence Matrix",
      subtitle: "Data Science & Analytics",
      desc: "Compare transaction records against receipts, invoices, screenshots, and other submitted evidence automatically to find discrepancies.",
      color: "bg-[#e8602e]", // Sheryians Orange flavor
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80",
    },
    {
      id: "card-3",
      title: "Automated Reporting",
      subtitle: "2.0 Formal Dossiers",
      desc: "Generate structured investigation dossiers with findings, timeline, and AI summary from analyzed evidence, ready for compliance.",
      color: "bg-[#0a0a0a]", // Dark card
      img: "https://images.unsplash.com/photo-1618044733300-9472054094ee?auto=format&fit=crop&q=80",
      border: "border border-white/10"
    }
  ];

  return (
    <section id="features" className="bg-[#0a0a0a] py-32 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center mb-24">
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            Master the Evidence.
          </h2>
          <p className="text-xl text-slate-400 mt-4">Industry-grade forensic tools.</p>
        </div>

        {/* Sticky Stacked Cards Implementation */}
        <div className="relative space-y-[10vh]">
          {cards.map((card, index) => (
            <div 
              key={card.id}
              className={`sticky top-32 w-full rounded-[2.5rem] p-8 md:p-12 shadow-2xl transition-all duration-500 overflow-hidden ${card.color} ${card.border || ''}`}
              style={{ 
                zIndex: index,
                marginTop: index === 0 ? 0 : '100px', // Spacing for stack effect
                boxShadow: '0 -20px 40px rgba(0,0,0,0.5)'
              }}
            >
              <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-6">
                  <h3 className={`text-4xl md:text-5xl font-black leading-tight ${card.id === 'card-3' ? 'text-white' : 'text-white'}`}>
                    {card.title}
                  </h3>
                  <p className={`text-lg font-bold ${card.id === 'card-3' ? 'text-slate-400' : 'text-white/80'}`}>
                    {card.subtitle}
                  </p>
                  <p className={`text-base leading-relaxed ${card.id === 'card-3' ? 'text-slate-400' : 'text-white/70'}`}>
                    {card.desc}
                  </p>
                  <button className={`mt-4 rounded-full px-8 py-3 font-bold text-sm transition-transform hover:scale-105 ${card.id === 'card-3' ? 'bg-white text-black' : 'bg-black/20 text-white hover:bg-black/40'}`}>
                    Explore Module
                  </button>
                </div>
                
                {/* Embedded Large Image */}
                <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl group">
                  <img src={card.img} alt={card.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Horizontal Scroll Cards (Impact Section) ────────────────────────────────

const ImpactSection: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const images = [
    { title: "Invoice Verification", img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80" },
    { title: "Payment Disputes", img: "https://images.unsplash.com/photo-1620714223084-8fcacc6dfd8d?auto=format&fit=crop&q=80" },
    { title: "POS Slip Analysis", img: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80" },
    { title: "Screenshot Forensics", img: "https://images.unsplash.com/photo-1618044733300-9472054094ee?auto=format&fit=crop&q=80" },
  ];

  return (
    <section className="bg-[#0a0a0a] py-32 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-block border border-white/20 rounded px-4 py-1 text-xs font-bold text-slate-300 tracking-[0.2em] mb-6">
            IMPACT
          </div>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight">
            How We Are Doing It Faster And Better
            <br />
            Than Others!
          </h2>
        </div>

        {/* Infinite Marquee Scroll container */}
        <div className="relative w-full overflow-hidden flex pt-4 pb-12">
          {/* We duplicate the array to create a seamless loop */}
          <div className="flex gap-6 animate-marquee whitespace-nowrap min-w-max hover:[animation-play-state:paused]">
            {[...images, ...images, ...images].map((item, i) => (
              <div 
                key={i} 
                className="relative w-[280px] md:w-[320px] h-[360px] md:h-[420px] rounded-3xl overflow-hidden group cursor-pointer shrink-0 inline-block whitespace-normal"
              >
                <img 
                  src={item.img} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                
                {/* Arrow Icon in Top Right */}
                <div className="absolute top-6 right-6 h-12 w-12 bg-black rounded-full flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:bg-blue-600">
                  <ArrowUpRight className="h-6 w-6 text-white" />
                </div>

                {/* Title at Bottom */}
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-2xl font-black text-white leading-tight">{item.title}</h3>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


// ─── How FraudLens Works (4-Step Cinematic Process) ──────────────────────────

const HowItWorksSection: React.FC = () => {
  const steps = [
    { num: "01", title: "Upload Evidence", desc: "Upload receipts, invoices, screenshots, PDFs, transaction records, etc.", img: "https://images.unsplash.com/photo-1618044733300-9472054094ee?auto=format&fit=crop&q=80" },
    { num: "02", title: "AI Analysis", desc: "FraudLens extracts text, analyzes visual patterns and detects anomalies.", img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" },
    { num: "03", title: "Cross-Evidence Investigation", desc: "Compare multiple pieces of evidence and identify inconsistencies.", img: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80" },
    { num: "04", title: "Investigation Report", desc: "Generate a structured forensic report with findings, evidence and risk indicators.", img: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80" },
  ];

  return (
    <section id="how-it-works" className="bg-[#0a0a0a] py-32 px-6">
      <div className="max-w-5xl mx-auto space-y-12">
        <div className="text-center mb-24">
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            How FraudLens Works
          </h2>
          <p className="text-xl text-slate-400 mt-4">A 4-step cinematic process.</p>
        </div>
        
        <div className="relative space-y-[10vh]">
          {steps.map((step, index) => (
            <div 
              key={index}
              className="sticky top-32 w-full rounded-[2.5rem] p-8 md:p-12 shadow-2xl transition-all duration-500 overflow-hidden bg-[#111] border border-white/10"
              style={{ 
                zIndex: index,
                marginTop: index === 0 ? 0 : '100px',
                boxShadow: '0 -20px 40px rgba(0,0,0,0.5)'
              }}
            >
              <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
                <div className="space-y-6">
                  <span className="text-7xl font-black text-white/5">{step.num}</span>
                  <h3 className="text-4xl md:text-5xl font-black leading-tight text-white">
                    {step.title}
                  </h3>
                  <p className="text-lg leading-relaxed text-slate-400">
                    {step.desc}
                  </p>
                </div>
                
                <div className="relative rounded-2xl overflow-hidden aspect-video shadow-2xl group">
                  <img src={step.img} alt={step.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                  <div className="absolute inset-0 bg-blue-600/10 group-hover:bg-transparent transition-colors"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Forensic Analysis Demo ───────────────────────────────────────────────────

const ForensicDemoSection: React.FC = () => (
  <section id="forensics" className="bg-[#0a0a0a] py-32 px-6 overflow-hidden">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <div className="order-2 lg:order-1 relative rounded-3xl bg-[#111] border border-white/10 p-8 aspect-square flex items-center justify-center">
        <img src="https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&q=80" alt="Demo" className="absolute inset-0 w-full h-full object-cover rounded-3xl opacity-30" />
        <div className="absolute w-3/4 h-3/4 border-2 border-blue-500/50 rounded-lg">
          <div className="absolute top-0 right-0 bg-blue-500 text-white text-xs font-bold px-2 py-1 translate-x-1/2 -translate-y-1/2">OCR Box</div>
        </div>
        <div className="absolute w-1/2 h-1/4 top-1/4 left-1/4 bg-rose-500/30 blur-xl"></div>
        <div className="absolute top-1/4 left-1/4 border-2 border-rose-500 rounded-lg w-1/2 h-1/4">
          <div className="absolute top-0 right-0 bg-rose-500 text-white text-xs font-bold px-2 py-1 translate-x-1/2 -translate-y-1/2">Suspicious Region</div>
        </div>
      </div>
      <div className="order-1 lg:order-2 space-y-8">
        <h2 className="text-4xl sm:text-5xl font-black text-white">Forensic Analysis Demo</h2>
        <p className="text-xl text-slate-400">See exactly what the AI sees. Our models highlight suspicious regions, tamper indicators, and perform precise OCR extraction.</p>
        <ul className="space-y-4 text-slate-300 font-medium">
          <li className="flex items-center gap-3"><CheckCircle2 className="text-emerald-500" /> OCR extraction bounding boxes</li>
          <li className="flex items-center gap-3"><CheckCircle2 className="text-rose-500" /> Suspicious region highlighting</li>
          <li className="flex items-center gap-3"><CheckCircle2 className="text-blue-500" /> Image tamper indicators</li>
          <li className="flex items-center gap-3"><CheckCircle2 className="text-amber-500" /> Analysis result confidence scores</li>
        </ul>
      </div>
    </div>
  </section>
);

// ─── Why FraudLens ────────────────────────────────────────────────────────────

const WhyFraudLensSection: React.FC = () => {
  const reasons = [
    { title: "Multimodal Analysis", desc: "Combines vision models and structured data analysis.", color: "from-blue-600/20 to-transparent", glow: "rgba(37,99,235,0.3)", icon: "🔍" },
    { title: "Evidence Correlation", desc: "Automatically links patterns across different documents.", color: "from-cyan-600/20 to-transparent", glow: "rgba(6,182,212,0.3)", icon: "🔗" },
    { title: "Automated Investigation", desc: "Reduces manual review time by 80%.", color: "from-emerald-600/20 to-transparent", glow: "rgba(16,185,129,0.3)", icon: "⚡" },
    { title: "Explainable Findings", desc: "Clear visual indicators for every flagged anomaly.", color: "from-purple-600/20 to-transparent", glow: "rgba(139,92,246,0.3)", icon: "💡" },
    { title: "Secure Evidence Handling", desc: "Enterprise-grade encryption for sensitive files.", color: "from-rose-600/20 to-transparent", glow: "rgba(244,63,94,0.3)", icon: "🔒" },
  ];

  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState<boolean[]>(reasons.map(() => false));

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll("[data-card]");
            cards.forEach((card, i) => {
              setTimeout(() => {
                setVisible((prev) => {
                  const next = [...prev];
                  next[i] = true;
                  return next;
                });
              }, i * 120);
            });
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-black py-32 px-6 border-y border-white/5">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">Why FraudLens</h2>
          <p className="text-slate-400 mt-4 text-xl">Everything you need for serious forensics.</p>
        </div>
        <div ref={sectionRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((r, i) => (
            <div
              key={i}
              data-card
              className="relative bg-[#111] border border-white/10 rounded-2xl p-8 text-left overflow-hidden cursor-default group"
              style={{
                transform: visible[i] ? "translateY(0) scale(1)" : "translateY(40px) scale(0.95)",
                opacity: visible[i] ? 1 : 0,
                transition: "transform 0.55s cubic-bezier(0.34,1.56,0.64,1), opacity 0.45s ease",
              }}
            >
              {/* Background gradient glow */}
              <div className={`absolute inset-0 bg-gradient-to-br ${r.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

              {/* Hover border glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ boxShadow: `inset 0 0 0 1px ${r.glow}` }}
              />

              {/* Icon */}
              <div className="text-4xl mb-5 group-hover:scale-110 transition-transform duration-300 inline-block">
                {r.icon}
              </div>

              <h3 className="text-2xl font-bold text-white mb-3 relative z-10">{r.title}</h3>
              <p className="text-slate-400 relative z-10 group-hover:text-slate-300 transition-colors">{r.desc}</p>

              {/* Hover lift shadow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-all duration-500"
                style={{ transform: "translateY(8px)", filter: `blur(20px)`, background: r.glow, zIndex: -1 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// ─── Security & Privacy ───────────────────────────────────────────────────────

const SecuritySection: React.FC = () => (
  <section id="security" className="bg-[#0a0a0a] py-32 px-6">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <div>
        <h2 className="text-4xl sm:text-5xl font-black text-white mb-8">Security & Privacy</h2>
        <div className="space-y-6">
          {[
            { title: "Authentication", desc: "Secure Firebase auth and role-based access control.", icon: Lock },
            { title: "Evidence Protection", desc: "All uploaded files are encrypted at rest and in transit.", icon: ShieldCheck },
            { title: "Secure Processing", desc: "AI models run in isolated, secure environments.", icon: Server },
          ].map((item, i) => (
            <div key={i} className="flex gap-4 items-start">
              <div className="h-12 w-12 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 shrink-0">
                <item.icon className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-xl font-bold text-white">{item.title}</h4>
                <p className="text-slate-400">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="relative rounded-3xl border border-white/10 bg-[#111] p-12 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 to-transparent"></div>
        <Lock className="h-24 w-24 text-blue-500 mx-auto mb-6 opacity-80" />
        <h3 className="text-2xl font-bold text-white mb-4">Enterprise Grade Security</h3>
        <p className="text-slate-400">Your investigation data never leaves our secure perimeter.</p>
      </div>
    </div>
  </section>
);

// ─── Final CTA ────────────────────────────────────────────────────────────────

const FinalCTASection: React.FC<{ onStart: () => void }> = ({ onStart }) => (
  <section className="relative py-40 px-6 overflow-hidden">
    {/* Background image — clearly visible */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80')" }}
    />
    {/* Dark + blue tinted overlay — not too heavy */}
    <div className="absolute inset-0 bg-blue-950/75" />
    {/* Subtle blue glow center */}
    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(37,99,235,0.35)_0%,_transparent_70%)]" />

    <div className="relative z-10 max-w-4xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 rounded-full border border-blue-400/30 bg-blue-500/10 px-4 py-2 text-xs font-bold text-blue-300 mb-8">
        <Sparkles className="h-4 w-4" />
        <span>AI-Powered Investigation Platform</span>
      </div>
      <h2 className="text-5xl sm:text-7xl font-black text-white mb-8 leading-[1.05]">
        Ready to investigate<br />the evidence?
      </h2>
      <p className="text-slate-300 text-xl mb-12 max-w-xl mx-auto">
        Join 200+ forensics professionals using FraudLens to uncover the truth.
      </p>
      <button
        onClick={onStart}
        className="inline-flex items-center gap-3 bg-white text-blue-700 px-10 py-5 rounded-full font-black text-xl hover:bg-slate-100 hover:scale-105 transition-all shadow-[0_0_60px_rgba(37,99,235,0.5)]"
      >
        Start Investigation <ArrowRight className="h-6 w-6" />
      </button>
    </div>
  </section>
);

// ─── Developer Testimonial Grid (Dark Mode Cards) ───────────────────────────

const TestimonialGrid: React.FC = () => {
  const reviews = [
    { name: "Sarah Jenkins", role: "Lead Forensics Investigator", text: "FraudLens is an excellent platform. The computer vision analysis spots font anomalies I would have completely missed. Highly skilled tooling.", rating: 5 },
    { name: "Marcus Vance", role: "Fraud Analyst", text: "Best place to conduct offline payment disputes. The timeline generation and cross-evidence matrix saves me hours of manual correlation.", rating: 5 },
    { name: "Elena Rostova", role: "Risk Management", text: "We proudly share our investigation process with FraudLens. Helping our team build rock-solid dispute dossiers for chargebacks.", rating: 4.8 },
    { name: "David Chen", role: "Financial Auditor", text: "I am currently learning how deeply documents can be tampered with. This platform's edge detection is simply mind-blowing.", rating: 4.9 },
  ];

  return (
    <section className="bg-[#0a0a0a] py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl sm:text-6xl font-black text-white tracking-tight">
            200+ Forensics Professionals On
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">FraudLens</span>
          </h2>
        </div>

        {/* Infinite marquee row */}
        <div className="relative w-full overflow-hidden">
          <div className="flex gap-6 animate-marquee whitespace-nowrap min-w-max hover:[animation-play-state:paused]">
            {[...reviews, ...reviews, ...reviews].map((rev, i) => (
              <div key={i} className="inline-block whitespace-normal w-[320px] shrink-0 rounded-3xl border border-white/5 bg-[#111] p-8 hover:border-white/20 transition-colors duration-300 group">
                <div className="flex items-center gap-4 mb-6">
                  <div className="h-12 w-12 rounded-full bg-blue-900/50 flex items-center justify-center text-blue-400 font-bold text-xl">
                    {rev.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-white font-bold text-sm">{rev.name}</h4>
                    <p className="text-slate-500 text-xs">{rev.role}</p>
                  </div>
                </div>
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Sparkles key={j} className={`h-4 w-4 ${j < Math.floor(rev.rating) ? 'text-amber-400' : 'text-slate-700'}`} />
                  ))}
                  <span className="text-slate-300 text-xs font-bold ml-2">{rev.rating}</span>
                </div>
                <p className="text-slate-400 text-sm leading-relaxed group-hover:text-slate-300 transition-colors">
                  "{rev.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};


// ─── Footer ───────────────────────────────────────────────────────────────────

const Footer: React.FC<{ onEnterApp: () => void; onOpenAuth: () => void; user: any }> = ({ onEnterApp, onOpenAuth, user }) => (
  <footer id="contact" className="bg-black pt-24 pb-12 px-6 border-t border-white/10">
    <div className="max-w-7xl mx-auto">
      <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-12 pb-16 border-b border-white/10">
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center gap-3">
            <Eye className="h-8 w-8 text-blue-500" />
            <span className="font-extrabold text-white text-2xl tracking-tight">FraudLens Coding School</span>
          </div>
          <p className="text-base text-slate-400 leading-relaxed max-w-sm font-medium">
            Building real scalable products used by thousands of investigators, learn AI forensics, document intelligence, and cross-verification.
          </p>
          <div className="flex gap-4">
             <button
              onClick={user ? onEnterApp : onOpenAuth}
              className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-bold text-white hover:bg-blue-700 transition hover:scale-105"
            >
              {user ? "Go to Console" : "Get Started"}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        {[
          { title: "Programs", links: [{name: "Web Development", href: "#"}, {name: "AI Forensics", href: "#"}, {name: "Data Science", href: "#"}] },
          { title: "Contact", links: [{name: "GitHub", href: "https://github.com/pathananas2007"}, {name: "Email", href: "mailto:pathananas2007@gmail.com"}, {name: "WhatsApp", href: "https://wa.me/917028388155"}] },
          { title: "Legal", links: [{name: "Privacy Policy", href: "/privacy.html"}, {name: "Terms of Service", href: "/terms.html"}] },
        ].map(({ title, links }) => (
          <div key={title}>
            <p className="text-sm font-black text-white mb-6">{title}</p>
            <ul className="space-y-4">
              {links.map((l) => (
                <li key={l.name}>
                  <a href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel={l.href.startsWith("http") ? "noopener noreferrer" : undefined} className="text-sm font-medium text-slate-400 hover:text-white transition">
                    {l.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="pt-8 text-center text-sm font-medium text-slate-600">
        © 2026 FraudLens AI Inc. — Built by Pathan Anas
      </div>
    </div>
  </footer>
);

// ─── Social Proof & Product Showcase ──────────────────────────────────────────

const SocialProofProductShowcaseSection: React.FC = () => (
  <section className="bg-[#0a0a0a] py-20 px-6 border-b border-white/5">
    <div className="max-w-7xl mx-auto text-center space-y-16">
      <div className="space-y-4">
        <p className="text-sm font-bold tracking-widest text-slate-500 uppercase">Trusted by top forensic investigation teams</p>
        <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale">
          <div className="text-xl font-black text-white">AcmeForensics</div>
          <div className="text-xl font-black text-white">GlobalRisk</div>
          <div className="text-xl font-black text-white">TrustGuard</div>
          <div className="text-xl font-black text-white">VeriScan</div>
        </div>
      </div>

      <div className="pt-16">
        <div className="inline-block border border-blue-500/30 bg-blue-500/10 rounded-full px-4 py-1.5 text-xs font-bold text-blue-400 mb-6">
          PRODUCT SHOWCASE
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight mb-12">
          The Actual Forensics Workspace
        </h2>
        <div className="relative rounded-[2.5rem] border border-white/10 bg-[#111] p-4 shadow-2xl overflow-hidden aspect-video group">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80" alt="Workspace" className="w-full h-full object-cover rounded-3xl opacity-80 group-hover:scale-105 transition-transform duration-1000" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-8 left-8 text-left">
            <h3 className="text-2xl font-bold text-white">Cross-Evidence Matrix Active</h3>
            <p className="text-slate-400">Comparing receipts vs terminal logs in real-time.</p>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── Use Cases Section ────────────────────────────────────────────────────────

const UseCasesSection: React.FC = () => (
  <section className="bg-[#0a0a0a] py-32 px-6">
    <div className="max-w-7xl mx-auto space-y-16">
      <div className="text-center">
        <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">Investigation Use Cases</h2>
        <p className="text-xl text-slate-400 mt-4">Where FraudLens shines.</p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {[
          { title: "Invoice Verification", desc: "Detect modified payment details, altered dates, and fake vendor logos.", icon: FileText, color: "from-blue-600/20 to-transparent", glow: "rgba(37,99,235,0.3)" },
          { title: "Payment Disputes", desc: "Cross-reference cardholder claims with merchant receipts and terminal logs.", icon: AlertTriangle, color: "from-amber-600/20 to-transparent", glow: "rgba(217,119,6,0.3)" },
          { title: "Document Fraud", desc: "Identify manipulated PDFs, tampered screenshots, and fake exhibits.", icon: ShieldCheck, color: "from-emerald-600/20 to-transparent", glow: "rgba(16,185,129,0.3)" },
        ].map((item, i) => (
          <div key={i} className="relative rounded-3xl border border-white/10 bg-[#111] p-8 overflow-hidden group cursor-default transition-transform duration-500 hover:-translate-y-2">
            {/* Background gradient glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            {/* Hover border glow */}
            <div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ boxShadow: `inset 0 0 0 1px ${item.glow}` }}
            />

            <div className="relative z-10 h-14 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
              <item.icon className="h-7 w-7" />
            </div>
            
            <h3 className="relative z-10 text-2xl font-bold text-white mb-4">{item.title}</h3>
            <p className="relative z-10 text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">{item.desc}</p>

            {/* Hover lift shadow */}
            <div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
              style={{ transform: "translateY(8px)", filter: `blur(20px)`, background: item.glow, zIndex: -1 }}
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── AI Copilot Section ───────────────────────────────────────────────────────

const AICopilotSection: React.FC = () => (
  <section className="bg-[#0a0a0a] py-32 px-6 overflow-hidden">
    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
      <div className="space-y-8">
        <div className="inline-block border border-blue-500/30 bg-blue-500/10 rounded-full px-4 py-1.5 text-xs font-bold text-blue-400 mb-2">
          AI FORENSIC COPILOT
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">Your intelligent investigation assistant.</h2>
        <p className="text-xl text-slate-400 leading-relaxed">
          Ask questions, request visual annotations, and let the AI instantly correlate data points across hundreds of pages of evidence.
        </p>
        <ul className="space-y-4">
          <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="h-5 w-5 text-emerald-500"/> Conversational case querying</li>
          <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="h-5 w-5 text-emerald-500"/> Automated discrepancy detection</li>
          <li className="flex items-center gap-3 text-slate-300"><CheckCircle2 className="h-5 w-5 text-emerald-500"/> Instant visual evidence retrieval</li>
        </ul>
      </div>
      <div className="relative rounded-[2.5rem] border border-white/10 bg-[#111] p-8 shadow-2xl">
        <div className="space-y-6">
          <div className="flex gap-4">
            <div className="h-10 w-10 rounded-full bg-slate-800 shrink-0"></div>
            <div className="flex-1 rounded-2xl bg-white/5 border border-white/10 p-4">
              <p className="text-sm text-slate-300">Does the receipt total match the terminal authorization for case #891?</p>
            </div>
          </div>
          <div className="flex gap-4 flex-row-reverse">
            <div className="h-10 w-10 rounded-full bg-blue-600 flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1 rounded-2xl bg-blue-600/10 border border-blue-500/20 p-4">
              <p className="text-sm text-blue-100 mb-3">No. The terminal authorization is for <strong>$249.00</strong>, but the submitted receipt shows <strong>$2,490.00</strong>. I've highlighted the tampered region.</p>
              <div className="h-32 rounded-lg bg-black/50 border border-white/5 flex items-center justify-center">
                <span className="text-xs text-rose-400 font-mono">tampered_receipt.png [View Highlight]</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// ─── Formal Report Section ────────────────────────────────────────────────────

const FormalReportSection: React.FC = () => (
  <section className="bg-black py-32 px-6 border-y border-white/5">
    <div className="max-w-7xl mx-auto text-center space-y-16">
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="inline-block border border-blue-500/30 bg-blue-500/10 rounded-full px-4 py-1.5 text-xs font-bold text-blue-400">
          FORMAL REPORT
        </div>
        <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">Generate Official Dossiers.</h2>
        <p className="text-xl text-slate-400">
          Complete your investigation with a cryptographically verified Formal Report, including SHA-256 hashes, PDF exports, and AI assistant summaries.
        </p>
      </div>
      <div className="grid sm:grid-cols-3 gap-6">
        {[
          { title: "PDF Export", desc: "Download the entire case file in a standardized compliance-ready format.", icon: FileText, color: "from-emerald-600/20 to-transparent", glow: "rgba(16,185,129,0.3)" },
          { title: "SHA-256 Hashing", desc: "Cryptographically seal the report to prove the evidence was not tampered post-investigation.", icon: Lock, color: "from-blue-600/20 to-transparent", glow: "rgba(37,99,235,0.3)" },
          { title: "Dossier Assembly", desc: "Automatically collates findings, visual exhibits, and timeline into one unified view.", icon: Layers, color: "from-purple-600/20 to-transparent", glow: "rgba(168,85,247,0.3)" }
        ].map((item, i) => (
          <div key={i} className="relative rounded-3xl border border-white/10 bg-[#111] p-8 text-left overflow-hidden group cursor-default transition-transform duration-500 hover:-translate-y-2">
            {/* Background gradient glow */}
            <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
            
            {/* Hover border glow */}
            <div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ boxShadow: `inset 0 0 0 1px ${item.glow}` }}
            />

            <div className="relative z-10 h-12 w-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300">
              <item.icon className="h-5 w-5" />
            </div>

            <h3 className="relative z-10 text-xl font-bold text-white mb-2">{item.title}</h3>
            <p className="relative z-10 text-slate-400 text-sm group-hover:text-slate-300 transition-colors">{item.desc}</p>

            {/* Hover lift shadow */}
            <div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-500 pointer-events-none"
              style={{ transform: "translateY(8px)", filter: `blur(20px)`, background: item.glow, zIndex: -1 }}
            />
          </div>
        ))}
      </div>
    </div>
  </section>
);

// ─── Main Landing Page ────────────────────────────────────────────────────────

export const LandingPage: React.FC<LandingPageProps> = ({
  onEnterApp,
  onOpenDemoCase,
  onOpenAuth,
}) => {
  const { user } = useAuth();

  const handleStartInvestigation = () => {
    if (user) {
      onEnterApp();
    } else {
      onOpenAuth();
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white selection:bg-blue-600 selection:text-white font-sans">
      <Navbar onEnterApp={onEnterApp} onOpenAuth={onOpenAuth} user={user} />
      <HeroSection onStartInvestigation={handleStartInvestigation} />
      <SocialProofProductShowcaseSection />
      <StackedFeaturesSection />
      <ImpactSection />
      <UseCasesSection />
      <HowItWorksSection />
      <ForensicDemoSection />
      <AICopilotSection />
      <FormalReportSection />
      <WhyFraudLensSection />
      <SecuritySection />
      <TestimonialGrid />
      <FinalCTASection onStart={handleStartInvestigation} />
      <Footer onEnterApp={onEnterApp} onOpenAuth={onOpenAuth} user={user} />
    </div>
  );
};
