import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  Sparkles, 
  Search, 
  X,
  Cpu, 
  Zap, 
  Menu,
  MousePointerClick,
  Star,
  SquarePlus as PlusSquare,
  LayoutDashboard as Layout,
  Tags
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

// --- Interfaces & Types ---

interface VisibilityState {
  [key: string]: boolean;
}

interface Prompt {
  id: number;
  title: string;
  category: string;
  desc: string;
  author: string;
  img: string;
  content: string;
  useCase: string;
}

interface PricingPlan {
  name: string;
  priceText: string;
  description: string;
  features: string[];
  cta: string;
  popular: boolean;
}

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface Step {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface ColorPalette {
  bg: string;
  primary: string;
  accent: string;
  white: string;
  textMain: string;
  textMuted: string;
  boxBg: string;
  goldenBrown: string;
  skyBlue: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

interface TermsItem {
  title: string;
  content: string;
}

// HubSpot & Confetti Global Types
declare global {
  interface Window {
    hbspt?: {
      forms: {
        create: (config: {
          region?: string;
          portalId: string;
          formId: string;
          target: string;
        }) => void;
      };
    };
    confetti?: (options?: {
      particleCount?: number;
      spread?: number;
      origin?: { x: number; y: number };
      colors?: string[];
      scalar?: number;
    }) => void;
  }
}

const App: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isVisible, setIsVisible] = useState<VisibilityState>({});
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isFAQOpen, setIsFAQOpen] = useState<boolean>(false);
  const [isTermsOpen, setIsTermsOpen] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  
  const formCreatedRef = useRef<boolean>(false);

  const colors: ColorPalette = {
    bg: '#b83636', 
    primary: '#3c587e', 
    accent: 'rgb(250, 204, 21)',
    white: '#97757527',
    textMain: '#000000', 
    textMuted: 'rgba(255, 255, 255, 0.7)',
    boxBg: '#001D3D',
    goldenBrown: '#996515',
    skyBlue: '#87CEEB' 
  };

  const faqData: FAQItem[] = [
    {
      question: "What is PromptToGo?",
      answer: "PromptToGo is a free platform that allows users to discover, search, save, and export AI prompts."
    },
    {
      question: "Is PromptToGo free?",
      answer: "Yes. The current version is a free tier with daily usage limits."
    },
    {
      question: "Do I need an account?",
      answer: "Guests can browse. Registered users can favorite, export, and submit prompts."
    },
    {
      question: "How does export work?",
      answer: "Users can export prompts as TXT or JSON. Exports count toward daily limits."
    },
    {
      question: "Are there usage limits?",
      answer: "Yes. Daily export limits and IP throttling are enforced."
    },
    {
      question: "How does moderation work?",
      answer: "Submitted prompts enter a pending queue and are reviewed by admins."
    },
    {
      question: "Is my data secure?",
      answer: "Yes. Authentication, Row-Level Security (RLS), rate limiting, and input validation are implemented."
    }
  ];

  const termsData: TermsItem[] = [
    {
      title: "1. Acceptance of Terms",
      content: "By using PromptToGo, you agree to comply with these terms."
    },
    {
      title: "2. Account Responsibility",
      content: "Users are responsible for maintaining account security."
    },
    {
      title: "3. Acceptable Use",
      content: "Users must not submit illegal, harmful, or abusive content or attempt to bypass limits."
    },
    {
      title: "4. Content Submission",
      content: "Users retain ownership of their prompts but grant PromptToGo a license to display approved content."
    },
    {
      title: "5. Usage Limits",
      content: "Daily export limits and rate limiting are enforced."
    },
    {
      title: "6. Moderation Rights",
      content: "Admins may approve, reject, or remove content at their discretion."
    },
    {
      title: "7. Limitation of Liability",
      content: "PromptToGo is provided “as is” without guarantees of uninterrupted service."
    },
    {
      title: "8. Changes to Terms",
      content: "Terms may be updated at any time."
    }
  ];

  const triggerConfetti = () => {
    if (window.confetti) {
      window.confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: [colors.primary, colors.accent, '#FFFFFF', '#FF6B6B']
      });
    }
  };

  const copyToClipboard = (text: string, id: number): void => {
    const el = document.createElement('textarea');
    el.value = text;
    document.body.appendChild(el);
    el.select();
    try {
      document.execCommand('copy');
      setCopiedId(id);
      triggerConfetti();
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error('Copy failed', err);
    }
    document.body.removeChild(el);
  };

  useEffect(() => {
    // Load Confetti Library
    const confettiScript = document.createElement('script');
    confettiScript.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.6.0/dist/confetti.browser.min.js';
    confettiScript.async = true;
    document.head.appendChild(confettiScript);

    const handleMouseMove = (e: globalThis.MouseEvent) => {
      const cards = document.querySelectorAll('.luxury-card');
      cards.forEach((card) => {
        const rect = (card as HTMLElement).getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        (card as HTMLElement).style.setProperty('--mouse-x', `${x}px`);
        (card as HTMLElement).style.setProperty('--mouse-y', `${y}px`);
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && entry.target.id) {
          const targetId = entry.target.id;
          setIsVisible(prev => ({ ...prev, [targetId]: true }));
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('section').forEach(section => observer.observe(section));

    const loadHubSpotForm = (): void => {
      const targetSelector = '#hubspot-form-mount';
      const mountPoint = document.querySelector(targetSelector);
      
      if (window.hbspt && window.hbspt.forms && mountPoint && !formCreatedRef.current) {
        formCreatedRef.current = true;
        try {
          window.hbspt.forms.create({
            region: "na2",
            portalId: "245230949",
            formId: "d4b3c9f5-ca4d-4aef-b253-df1a0f4d07cb",
            target: targetSelector
          });
        } catch (e) {
          console.error("HubSpot form creation failed:", e);
          formCreatedRef.current = false;
        }
      }
    };

    const scriptId = 'hs-forms-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.src = 'https://js-na2.hsforms.net/forms/embed/v2.js';
      script.type = 'text/javascript';
      script.charset = 'utf-8';
      script.async = true;
      script.onload = () => {
        const interval = window.setInterval(() => {
          if (window.hbspt) {
            window.clearInterval(interval);
            loadHubSpotForm();
          }
        }, 100);
      };
      document.head.appendChild(script);
    } else if (window.hbspt) {
      loadHubSpotForm();
    }

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const scrollToSection = (id: string): void => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({ top: element.offsetTop - 80, behavior: 'smooth' });
    }
    setIsMobileMenuOpen(false);
  };

  const steps: Step[] = [
    { icon: Search, title: "Discover", desc: "Explore our vetted library of high-performance prompts engineered for specific professional tasks." },
    { icon: Zap, title: "Customize", desc: "Fine-tune variables in our real-time editor to match your specific brand voice or requirements." },
    { icon: Cpu, title: "Deploy", desc: "Instantly copy-paste or integrate directly into your favorite AI models with optimized formatting." }
  ];

  const features: Feature[] = [
    { icon: Search, title: "Smart Prompt Search", desc: "Find any prompt instantly with fast, keyword-based search. No more scrolling — get the right prompt exactly when you need it." },
    { icon: MousePointerClick, title: "One-Click Copy", desc: "Copy prompts with a single click. Perfect for quick workflow, speed, and seamless use across AI tools." },
    { icon: Star, title: "Favorites for Quick Access", desc: "Star your most-used prompts and keep them in a dedicated section for instant access anytime." },
    { icon: PlusSquare, title: "Submit & Save Your Own", desc: "Easily add new prompts to your personal library. Organize your creative ideas and expand your toolkit effortlessly." },
    { icon: Layout, title: "User-Friendly Interface", desc: "A simple, modern interface designed to keep your workflow smooth, intuitive, and distraction-free." },
    { icon: Tags, title: "Organized Categories", desc: "Group prompts into categories and tags to keep everything tidy and easy to navigate." }
  ];

  const mockPrompts: Prompt[] = [
    {
      id: 1,
      title: "Global CMO Strategic Roadmap",
      category: "Strategy",
      desc: "Engineered for F500 marketing leaders to architect 18-month transformation cycles.",
      author: "Alex Rivera",
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
      content: "Act as a Global CMO for a Tier 1 SaaS enterprise. Develop a comprehensive 18-month roadmap focusing on AI-driven customer acquisition, brand repositioning for the Gen-AI era, and cross-functional operational efficiency...",
      useCase: "Executive Planning"
    },
    {
      id: 2,
      title: "Quant-Style Technical Audit",
      category: "Engineering",
      desc: "Deep-level code analysis prompt designed to identify architectural debt in legacy systems.",
      author: "Sarah Chen",
      img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
      content: "Perform a rigorous technical audit of the following legacy codebase. Evaluate based on: Big O efficiency, cyclomatic complexity, memory leaks...",
      useCase: "DevOps / SRE"
    },
    {
      id: 3,
      title: "High-Conversion Ad Copy Engine",
      category: "Marketing",
      desc: "Neuro-linguistic programming based prompt for generating viral social media campaigns.",
      author: "Marcus Thorne",
      img: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=800",
      content: "Utilize psychological triggers of scarcity, social proof, and loss aversion to generate 5 distinct ad copy variations...",
      useCase: "Performance Marketing"
    },
    {
      id: 4,
      title: "Data Science Logic Synthesizer",
      category: "Analysis",
      desc: "Convert raw unstructured datasets into actionable business intelligence schemas.",
      author: "Elena Zhao",
      img: "https://images.unsplash.com/photo-1518186285589-2f7649de83e0?auto=format&fit=crop&q=80&w=800",
      content: "Ingest the provided CSV data points and perform a multi-dimensional analysis identifying non-obvious correlations...",
      useCase: "Business Intelligence"
    },
    {
      id: 5,
      title: "UX Research Persona Architect",
      category: "Design",
      desc: "Generate hyper-realistic user personas based on specific industry empathy maps.",
      author: "Jordan Smith",
      img: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=800",
      content: "Construct three distinct user personas for a decentralized finance application...",
      useCase: "Product Discovery"
    },
    {
      id: 6,
      title: "Legal Contract Risk Scraper",
      category: "Legal",
      desc: "Automated clause identification for high-velocity venture capital documentation.",
      author: "David Vance",
      img: "https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&q=80&w=800",
      content: "Analyze the attached MSA for unfavorable liability caps, auto-renewal traps, and IP assignment ambiguities...",
      useCase: "Compliance / Legal Ops"
    }
  ];

  const pricingPlans: PricingPlan[] = [
    { 
      name: 'Popular', 
      priceText: '$19/mo', 
      description: 'Perfect for consultants, founders, and analysts.',
      features: ['Unlimited Prompts', 'Private Folders', 'Variable Injection', 'Cloud Sync'], 
      cta: 'Join waitlist', 
      popular: true 
    },
  ];

  const filteredPrompts = useMemo(() => {
    return mockPrompts.filter(p => 
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [searchQuery, mockPrompts]);

  const sectionOpacity = (id: string): string => isVisible[id] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4';

  const CustomLogoIcon: React.FC = () => (
    <div 
      className="w-10 h-10 rounded-xl flex items-center justify-center relative overflow-hidden shadow-lg shadow-black/20"
      style={{ backgroundColor: '#001D3D' }} 
    >
      <Sparkles className="text-white w-6 h-6" />
    </div>
  );

  const FAQModal: React.FC = () => {
    if (!isFAQOpen) return null;
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
        <div className="bg-white w-full max-w-3xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
          <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-[#fcfcfc]">
            <div>
              <h2 className="text-3xl font-black text-[#1A1A1A] uppercase italic tracking-tighter">Frequently Asked Questions</h2>
            </div>
            <button onClick={() => setIsFAQOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400">
              <X size={24} />
            </button>
          </div>
          <div className="p-10 max-h-[60vh] overflow-y-auto space-y-8">
            {faqData.map((item, idx) => (
              <div key={idx} className="group">
                <h4 className="text-lg font-black text-gray-900 mb-3 flex items-start gap-3">
                  <span className="text-blue-600 font-black">{idx + 1}.</span>
                  {item.question}
                </h4>
                <p className="text-gray-600 font-medium leading-loose pl-8">{item.answer}</p>
              </div>
            ))}
          </div>
          <div className="p-8 bg-gray-50 border-t border-gray-100 text-center">
            <button onClick={() => setIsFAQOpen(false)} className="px-10 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-blue-600 transition-all">
              Got it, thanks
            </button>
          </div>
        </div>
      </div>
    );
  };

  const TermsModal: React.FC = () => {
    if (!isTermsOpen) return null;
    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
        <div className="bg-white w-full max-w-3xl rounded-[2.5rem] overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
          <div className="p-10 border-b border-gray-100 flex justify-between items-center bg-[#fcfcfc]">
            <div>
              <h2 className="text-3xl font-black text-[#1A1A1A] uppercase italic tracking-tighter">Terms and Conditions</h2>
            </div>
            <button onClick={() => setIsTermsOpen(false)} className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors text-gray-400">
              <X size={24} />
            </button>
          </div>
          <div className="p-10 max-h-[60vh] overflow-y-auto space-y-8">
            {termsData.map((item, idx) => (
              <div key={idx} className="group">
                <h4 className="text-lg font-black text-gray-900 mb-3">{item.title}</h4>
                <p className="text-gray-600 font-medium leading-loose">{item.content}</p>
              </div>
            ))}
          </div>
          <div className="p-8 bg-gray-50 border-t border-gray-100 text-center">
            <button onClick={() => setIsTermsOpen(false)} className="px-10 py-4 bg-black text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:bg-blue-600 transition-all">
              I Agree
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen font-['Inter',_sans-serif] selection:bg-blue-500/30" style={{ backgroundColor: colors.bg, color: colors.textMain }}>
      
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@700;900&family=Inter:wght@400;500;600;700;900&display=swap" rel="stylesheet" />
      <link href="https://fonts.cdnfonts.com/css/creme-espana" rel="stylesheet" />

      <style>{`
        .luxury-card {
          position: relative;
          background: ${colors.boxBg};
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.05);
          box-shadow: 0 10px 30px -10px rgba(0, 0, 0, 0.3);
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), background 0.6s ease, border-color 0.6s ease;
          overflow: hidden;
        }
        .luxury-card::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: 0;
          opacity: 0;
          transition: opacity 0.5s ease;
          background: radial-gradient(
            600px circle at var(--mouse-x, 0px) var(--mouse-y, 0px),
            rgba(255, 100, 100, 0.2),
            rgba(100, 200, 255, 0.15),
            rgba(100, 255, 100, 0.1),
            rgba(200, 100, 255, 0.05),
            rgba(255, 255, 100, 0.02),
            transparent 50%
          );
        }
        .luxury-card:hover::before { opacity: 1; }
        .luxury-card > * { position: relative; z-index: 1; }
        .luxury-card:hover {
          transform: translateY(-8px);
          background: #002d5e; 
          border-color: rgba(255, 255, 255, 0.15);
        }
        .premium-btn {
          transition: all 0.5s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }
        .premium-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        }
        .premium-btn:active {
          transform: scale(0.98);
        }
        .premium-btn::after {
          content: "";
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at center, rgba(255,255,255,0.4) 0%, transparent 70%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        .premium-btn:hover::after {
          opacity: 1;
        }
        .text-3d-glow-mixed {
           background: linear-gradient(90deg, #FF6B6B, #4D96FF, #FF6B6B, #6BCB77, #9B72AA, #F9D923, #FF6B6B);
           background-size: 300% auto;
           -webkit-background-clip: text;
           -webkit-text-fill-color: transparent;
           animation: flowGradient 6s linear infinite;
        }
        @keyframes flowGradient { to { background-position: 300% center; } }
        .nav-font { font-family: 'Montserrat', sans-serif; font-weight: 900; letter-spacing: 0.1em; }
        .logo-text { font-family: 'Inter', sans-serif; font-weight: 900; letter-spacing: -0.02em; font-size: 26px; }
        .bg-soft-gradient { background: radial-gradient(circle at 50% -20%, rgba(255, 255, 255, 0.08) 0%, transparent 60%); }
        .hs-form-frame {
          background: rgba(255, 255, 255, 0.98);
          padding: 3.5rem;
          border-radius: 2.5rem;
          min-height: 400px;
        }
        .hero-ai-bg {
          position: absolute;
          top: -20%; left: -10%; width: 120%; height: 140%;
          background-image: url('https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1600');
          background-size: cover; background-position: center; opacity: 0.12;
          mix-blend-mode: overlay; pointer-events: none; z-index: -1;
          mask-image: radial-gradient(circle at center, black, transparent 70%);
          -webkit-mask-image: radial-gradient(circle at center, black, transparent 70%);
        }
        .hero-display-font {
          font-family: 'Creme Espana', sans-serif;
          font-weight: 400;
        }
      `}</style>

      <FAQModal />
      <TermsModal />

      {/* Nav */}
      <nav className="fixed top-0 w-full z-50 bg-white/95 backdrop-blur-md border-b border-black/10 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <CustomLogoIcon />
            <span className="logo-text uppercase tracking-tight">
              <span style={{ color: '#001D3D' }}>PROMPT</span><span style={{ color: '#FACC15' }}>TOGO</span>
            </span>
          </div>
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X /> : <Menu />}
          </button>
          <div className="hidden md:flex items-center gap-10 text-[18px] nav-font">
            {['How it works', 'Features', 'Discover', 'Pricing'].map((item) => (
              <button 
                key={item} 
                onClick={() => scrollToSection(item.toLowerCase().replace(/\s+/g, '-'))} 
                className="hover:text-blue-600 transition-colors text-[#1A1A1A] uppercase whitespace-nowrap"
                style={{ fontWeight: 900, fontSize: '18px' }}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="pt-64 pb-48 px-6 relative overflow-hidden bg-soft-gradient">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-24 items-center">
          <div className="relative z-10 transition-all duration-1000">
            <div className="hero-ai-bg"></div>
            <h1 className="text-7xl md:text-8xl font-black mb-10 leading-[0.95] tracking-tighter text-black uppercase">
              Build with <br />
              <span className="text-3d-glow-mixed">Intelligence.</span>
            </h1>
            <p className="text-xl md:text-2xl font-medium mb-12 max-w-xl leading-relaxed text-black/80">
              Stop guessing. Start engineering. The world's first repository of vetted, battle-tested AI prompts for high-stakes workflows.
            </p>
            <div className="flex flex-wrap gap-6">
              <button onClick={() => { scrollToSection('waitlist'); triggerConfetti(); }} className="premium-btn px-10 py-5 bg-white text-black rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-white/90">
                Join the waitlist
              </button>
              <button onClick={() => scrollToSection('prompts')} className="premium-btn px-10 py-5 bg-transparent border border-black/20 text-black rounded-full text-xs font-black uppercase tracking-[0.2em] hover:bg-white/10 backdrop-blur-md">
                Browse Library
              </button>
            </div>
          </div>
          <div className="relative group">
             <div className="aspect-[4/5] rounded-[2.5rem] p-1 border border-white/10 bg-white/5 backdrop-blur-sm shadow-2xl overflow-hidden">
                <img src="https://images.unsplash.com/photo-1620712943543-bcc4688e7485?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover rounded-[2.2rem] opacity-90 transition-all duration-1000" alt="Modern AI Tech" />
            </div>
          </div>
        </div>
      </header>

      {/* How it works Section */}
      <section id="how-it-works" className={`py-40 px-6 transition-all duration-1000 ${sectionOpacity('how-it-works')}`}>
        <div className="max-w-7xl mx-auto">
          <div className="mb-24">
            <span className="text-xs font-black uppercase tracking-[0.4em] mb-4 block" style={{ color: colors.goldenBrown }}>Process</span>
            <h2 className="text-5xl font-black text-black uppercase italic tracking-tighter">How it works</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {steps.map((step, idx) => (
              <div key={idx} className="luxury-card p-12 rounded-[2rem] flex flex-col items-start min-h-[320px]">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-10 shadow-lg border border-white/5" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <step.icon size={22} color={colors.accent} />
                </div>
                <h3 className="text-2xl font-black text-white mb-6 tracking-tight">{step.title}</h3>
                <p className="text-white/70 text-base leading-loose font-semibold">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section id="features" className={`py-40 px-6 bg-black/5 transition-all duration-1000 ${sectionOpacity('features')}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-xs font-black uppercase tracking-[0.4em] mb-4 block" style={{ color: colors.goldenBrown }}>Capabilities</span>
            <h2 className="text-5xl font-black text-black uppercase italic tracking-tighter">Platform Features</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((f, i) => (
              <div key={i} className="luxury-card p-12 rounded-[2rem] min-h-[320px]">
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-8 border border-white/5" style={{ backgroundColor: 'rgba(255,255,255,0.05)' }}>
                  <f.icon size={20} color={colors.accent} />
                </div>
                <h3 className="text-sm font-black text-white mb-6 uppercase tracking-[0.15em]">{f.title}</h3>
                <p className="text-white/70 text-base leading-loose font-semibold">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Prompts Section */}
      <section id="discover" className={`py-40 px-6 transition-all duration-1000 ${sectionOpacity('discover')}`}>
        <div id="prompts" className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between mb-24 gap-8">
            <div className="flex-1">
              <span className="text-xs font-black uppercase tracking-[0.4em] mb-4 block" style={{ color: colors.goldenBrown }}>Archive</span>
              <h2 className="text-5xl font-black text-black uppercase italic tracking-tighter mb-4">Sample Library</h2>
            </div>
            <button className="px-8 py-4 border border-black/10 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-black/60 hover:text-black transition-colors">
              View All 2,400+ Prompts
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-12">
            {filteredPrompts.map((p) => (
              <div key={p.id} className="luxury-card rounded-[2.2rem] overflow-hidden flex flex-col group/card border-none">
                <div className="h-64 overflow-hidden relative">
                    <img src={p.img} className="w-full h-full object-cover transition-transform duration-[1.5s]" alt={p.title} />
                    <span className="absolute top-8 left-8 px-5 py-2 bg-black/40 backdrop-blur-xl rounded-full text-[9px] font-black uppercase text-white tracking-[0.2em] border border-white/10 z-20">
                      {p.category}
                    </span>
                </div>
                <div className="p-12 flex-grow">
                  <h3 className="text-2xl font-black text-white mb-6 leading-tight tracking-tight">{p.title}</h3>
                  <p className="text-white/70 text-base mb-10 leading-loose font-semibold">{p.desc}</p>
                  <div className="mb-10 p-10 bg-black/40 rounded-[1.5rem] min-h-[10rem] flex items-center justify-center relative overflow-hidden">
                    <p className="text-[14px] text-white/60 font-mono text-center px-4 leading-loose italic font-semibold">
                      {p.content.substring(0, 150)}...
                    </p>
                    <div className="absolute inset-0 bg-white/5 backdrop-blur-[4px] opacity-0 group-hover:opacity-100 transition-all duration-700 flex items-center justify-center">
                       <span className="bg-white text-black px-6 py-3 rounded-full text-[9px] font-black uppercase tracking-[0.2em]">Locked Content</span>
                    </div>
                  </div>
                  <button 
                    onClick={() => copyToClipboard(p.content, p.id)}
                    className={`premium-btn w-full py-5 rounded-2xl font-black uppercase text-[10px] tracking-[0.2em] transition-all ${copiedId === p.id ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}
                  >
                    {copiedId === p.id ? 'Copied' : 'Copy Premium Prompt'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section id="pricing" className={`py-40 px-6 bg-black/10 transition-all duration-1000 ${sectionOpacity('pricing')}`}>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-24">
            <span className="text-xs font-black uppercase tracking-[0.4em] mb-4 block" style={{ color: colors.goldenBrown }}>Membership</span>
            <h2 className="text-5xl font-black text-black uppercase italic tracking-tighter mb-6">Pricing Plans</h2>
          </div>
          <div className="flex justify-center">
            <div className="grid md:grid-cols-1 gap-10 max-w-md w-full">
              {pricingPlans.map((plan, i) => (
                <div key={i} className={`luxury-card p-16 rounded-[2.5rem] flex flex-col min-h-[700px] ${plan.popular ? 'border-white/20' : ''}`}>
                  <div className="flex justify-between items-start mb-12">
                    <h4 className="text-[14px] font-black uppercase tracking-[0.3em] text-white">{plan.name}</h4>
                    {plan.popular && <span className="px-3 py-1 bg-blue-500/20 text-blue-400 text-[8px] font-black uppercase rounded-full border border-blue-500/30">Popular</span>}
                  </div>
                  <div className="mb-10">
                    <span className="text-3xl md:text-4xl font-black tracking-tight text-white block">{plan.priceText}</span>
                  </div>
                  <div className="mb-14">
                    <p className="text-base text-white/70 font-semibold leading-loose">{plan.description}</p>
                  </div>
                  <ul className="space-y-6 mb-16 flex-grow">
                    {plan.features.map(f => (
                      <li key={f} className="flex items-center gap-4 text-[13px] font-semibold uppercase tracking-wider text-white/80">
                        <Star size={14} color={colors.accent} className="shrink-0" />
                        {f}
                      </li>
                    ))}
                  </ul>
                  <button 
                    onClick={() => { scrollToSection('waitlist'); triggerConfetti(); }}
                    className={`premium-btn w-full py-6 rounded-2xl font-black uppercase text-[11px] tracking-[0.3em] ${plan.popular ? 'bg-blue-600 text-white' : 'bg-white text-black'}`}
                  >
                    {plan.cta}
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Waitlist Section */}
      <section id="waitlist" className={`py-48 px-6 relative overflow-hidden transition-all duration-1000 ${sectionOpacity('waitlist')}`} style={{ backgroundColor: colors.bg }}>
        <div className="absolute inset-0 bg-soft-gradient opacity-40"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <span className="text-xs font-black uppercase tracking-[0.4em] mb-6 block" style={{ color: colors.goldenBrown }}>Inaugural Cohort</span>
          <h2 className="text-6xl md:text-8xl font-black text-black mb-10 italic uppercase leading-none tracking-tighter">Join the <br/>Waitlist</h2>
          <p className="text-black/70 text-lg md:text-xl mb-20 font-medium max-w-2xl mx-auto leading-relaxed">Limited slots available for institutional partners. Secure your position in the next generation of AI engineering.</p>
          <div className="max-w-2xl mx-auto">
            <div id="hubspot-form-mount" className="hs-form-frame"></div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white pt-24 pb-12 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-20">
            <div className="md:col-span-6">
              <div className="flex items-center gap-3 mb-6">
                <CustomLogoIcon />
                <span className="logo-text uppercase tracking-tight">
                  <span style={{ color: '#001D3D' }}>PROMPT</span><span style={{ color: '#FACC15' }}>TOGO</span>
                </span>
              </div>
              <p className="text-gray-900 text-base leading-relaxed mb-8 max-w-sm font-bold">
                The professional standard for generative AI prompt management and discovery. Trusted by industry leaders worldwide.
              </p>
              <div className="flex gap-2 p-1 bg-gray-50 border border-gray-100 rounded-xl max-w-sm">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="bg-transparent px-6 py-3 rounded-lg text-sm flex-grow font-semibold text-gray-900 outline-none"
                />
                <button 
                  onClick={() => { scrollToSection('waitlist'); triggerConfetti(); }}
                  className="bg-[#001D3D] text-white px-6 py-3 rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-black transition-colors"
                >
                    Join
                </button>
              </div>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-900 mb-8 border-b border-gray-100 pb-2">Product</h4>
              <ul className="space-y-4">
                {[
                  { label: 'How it Works', id: 'how-it-works' },
                  { label: 'Features', id: 'features' },
                  { label: 'FAQ', id: 'faq' }
                ].map(item => (
                  <li key={item.label}>
                    <button 
                      onClick={() => item.id === 'faq' ? setIsFAQOpen(true) : item.id !== '#' ? scrollToSection(item.id) : null} 
                      className="text-gray-900 text-[14px] font-black transition-all hover:text-blue-600 uppercase tracking-wider"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <div className="md:col-span-3">
              <h4 className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-900 mb-8 border-b border-gray-100 pb-2">Company</h4>
              <ul className="space-y-4">
                {[
                  { label: 'Privacy', id: 'privacy' },
                  { label: 'Terms', id: 'terms' }
                ].map(item => (
                  <li key={item.label}>
                    <button 
                      onClick={() => item.id === 'terms' && setIsTermsOpen(true)}
                      className="text-gray-900 text-[14px] font-black transition-all hover:text-blue-600 uppercase tracking-wider"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-gray-100">
            <p className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-900">
              © 2026 PROMPTTOGO BY LH IDEACRAFT INC. • ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;