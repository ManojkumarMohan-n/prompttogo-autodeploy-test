import React, { useState, useEffect, useMemo } from 'react';
import { 
  Sparkles, 
  Search, 
  Copy, 
  Check, 
  Zap, 
  Shield, 
  Menu, 
  X, 
  ArrowRight,
  Loader2,
  Mail, 
  MapPin,
  Lock,
  PlusSquare,
  Terminal,
  Code2,
  GraduationCap,
  Briefcase,
  AlertCircle,
  Rocket,
  Clock,
  Target,
  RefreshCw,
  TrendingUp,
  BookOpen,
  ArrowUpRight,
  LucideIcon,
  MousePointer,
  Layers,
  Cpu,
  Star,
  FileText,
  Lightbulb,
  ChevronDown,
  Megaphone,
  Hammer,
  ShoppingBag,
  Bookmark,
  FolderSearch,
  LayoutGrid,
  Store,
  ShieldCheck,
  ZapOff,
  Filter,
  CheckCircle2,
  Bot,
  ArrowLeft,
  Quote
} from 'lucide-react';

// --- Assets Simulation ---
const abirami = "../assets/team/abirami.jpg";
const akshaya = "../assets/team/akshaya.jpg";
const arya = "../assets/team/arya.jpg";
const gunavathi = "../assets/team/gunavathi.jpg";
const kavin = "../assets/team/kavin.jpg";
const manoj = "../assets/team/manoj.jpg";
const mekala = "../assets/team/mekala.jpg";
const sanmugam = "../assets/team/sanmugam.jpg";

// --- Types & Interfaces ---

interface Prompt {
  id: number;
  title: string;
  desc: string;
  category: string;
  content: string;
  useCase: string;
  img: string;
  author?: string;
  price?: string;
  model: string;
  rating?: number;
  sales?: string;
}

interface Feature {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface Testimonial {
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
}

interface PricingPlan {
  name: string;
  monthlyPrice: string;
  annuallyPrice: string;
  descriptionLine1: string;
  descriptionLine2: string;
  features: string[];
  cta: string;
}

interface BlogPost {
  id: number;
  title: string;
  metaDescription: string;
  explanation: string;
  cta: string;
  category: string;
  time: string;
}

interface FormData {
  firstname: string;
  lastname: string;
  email: string;
  message: string;
}

interface FormStatus {
  submitting: boolean;
  success: boolean;
  error: string | null;
}

interface TeamMember {
  id: string;
  name: string;
  role: string;
  img: string;
  desc: string;
}

interface Benefit {
  icon: LucideIcon;
  title: string;
  text: string;
}

interface Audience {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface Step {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface FAQItem {
  q: string;
  a: string;
}

interface VerificationStep {
  icon: LucideIcon;
  title: string;
  desc: string;
}

interface HomeViewProps {
  navigateTo: (page: string) => void;
  scrollToSection: (id: string) => void;
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  filteredPrompts: Prompt[];
  setSelectedPrompt: (p: Prompt) => void;
  setActiveModal: (m: string) => void;
  isAnnual: boolean;
  setIsAnnual: (val: boolean) => void;
  onPostClick: (post: BlogPost) => void;
}

interface AboutViewProps {
  navigateTo: (page: string) => void;
}

interface BlogDetailViewProps {
  post: BlogPost;
  navigateTo: (page: string) => void;
}

// --- Constants ---
const CATEGORIES: string[] = ['All', 'Marketing', 'Development', 'Business', 'Creative'];

const FEATURES: Feature[] = [
  {
    icon: BookOpen,
    title: "Curated Prompt Library",
    desc: "Access a hand-picked selection of high-performance prompts engineered for maximum output quality."
  },
  {
    icon: Copy,
    title: "One-Click Copy",
    desc: "Instantly copy optimized prompts to your clipboard for immediate use in any AI model interface."
  },
  {
    icon: Bookmark,
    title: "Favorites & Saved Prompts",
    desc: "Build your personal library by saving your most effective prompts for quick access whenever you need them."
  },
  {
    icon: LayoutGrid,
    title: "Category-Based Discovery",
    desc: "Effortlessly find the perfect prompt by browsing through specific industries and specialized use cases."
  },
  {
    icon: FolderSearch,
    title: "Personal Prompt Collection",
    desc: "Organize and manage your own custom prompt variations to maintain a consistent AI workflow."
  },
  {
    icon: Store,
    title: "Marketplace Expansion",
    desc: "Join an emerging economy where you can buy premium prompt sets or monetize your own engineered assets."
  }
];

const CORE_BENEFITS: Benefit[] = [
  { icon: Clock, title: "Efficiency", text: "Save hours of trial and error" },
  { icon: Target, title: "Precision", text: "Get better AI output" },
  { icon: Shield, title: "Control", text: "Stay organized" },
  { icon: RefreshCw, title: "Reliability", text: "Reuse proven workflows" },
  { icon: Rocket, title: "Scalability", text: "Grow with the platform" }
];

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah Chen",
    role: "Senior Growth Marketer",
    company: "Streamline AI",
    content: "PromptToGo didn't just save me time; it transformed how we approach content strategy. The 'Viral Hook Architect' prompt alone doubled our LinkedIn engagement within two weeks.",
    avatar: "https://i.pravatar.cc/150?u=sarah"
  },
  {
    name: "David Miller",
    role: "Lead Software Architect",
    company: "TechFlow Systems",
    content: "The precision of the 'Clean Code Reviewer' prompt is unmatched. It identifies edge cases that our senior devs sometimes miss, saving us countless hours in debugging.",
    avatar: "https://i.pravatar.cc/150?u=david"
  },
  {
    name: "Elena Rodriguez",
    role: "Creative Director",
    company: "Pixel Perfect",
    content: "I was skeptical about AI in design, but the UX Storyboarder prompts provide a structure that is genuinely impressive. It handles the boring documentation so we can focus on creativity.",
    avatar: "https://i.pravatar.cc/150?u=elena"
  }
];

const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Standard",
    monthlyPrice: "$14.99",
    annuallyPrice: "$164.89",
    descriptionLine1: "🔥 Save More with Annual — Get 1 Month Free",
    descriptionLine2: "",
    features: [
      "Premium prompt library",
      "Multi-category prompts",
      "Save and favorite prompts",
      "Personal prompt library",
      "Regular prompt updates",
      "Early access to future features"
    ],
    cta: "Join Waitlist"
  }
];

const BLOG_POSTS: BlogPost[] = [
  {
    id: 1,
    title: "Why AI Prompt Libraries Are Becoming Essential",
    metaDescription: "The shift from individual prompting to team-wide libraries is the key to enterprise AI efficiency.",
    explanation: "As companies integrate LLMs into their daily stack, the 'ad-hoc' approach to prompting creates data silos and inconsistent results. A centralized library ensures every department uses field-tested logic, reducing hallucination and increasing output quality by up to 40%.",
    cta: "Read full infrastructure guide",
    category: "Infrastructure",
    time: "6 min read"
  },
  {
    id: 2,
    title: "Random vs High-Value Prompts",
    metaDescription: "Understanding the technical difference between basic queries and engineered blueprints.",
    explanation: "Random prompts lack context and constraints, leading to generic outputs. High-value prompts leverage Chain-of-Thought (CoT), few-shot learning, and explicit persona-setting to extract the full reasoning capabilities of models like Claude 3.5 or GPT-4o.",
    cta: "See technical benchmarks",
    category: "Engineering",
    time: "5 min read"
  },
  {
    id: 3,
    title: "How Teams Standardize AI Usage",
    metaDescription: "Strategies for creating a unified AI voice and workflow across global organizations.",
    explanation: "Standardization prevents 'Shadow AI' where teams use unverified methods. By implementing a Prompt Library, managers can track which templates work best, version control their prompts, and ensure brand consistency across every AI-generated document.",
    cta: "View team templates",
    category: "Workflow",
    time: "8 min read"
  },
  {
    id: 4,
    title: "Can You Monetize Prompts",
    metaDescription: "Exploring the emerging economy of the Prompt Engineer and Marketplace dynamics.",
    explanation: "Prompt engineering is transitioning from a 'skill' to a 'digital asset.' Learn how creators are licensing complex workflows, selling specialty packs for niche industries like Law or Medicine, and the IP protections required for prompt creators.",
    cta: "Start selling your prompts",
    category: "Economy",
    time: "7 min read"
  },
  {
    id: 5,
    title: "Future of Prompt Infrastructure",
    metaDescription: "From static text to dynamic variables and API-integrated prompt management.",
    explanation: "The future isn't copy-pasting; it's prompt injection via API. We look at how next-gen systems will dynamically pull context into prompts based on real-time user data, effectively turning prompts into 'software functions.'",
    cta: "Explore API integration",
    category: "Future",
    time: "10 min read"
  },
  {
    id: 6,
    title: "Why Businesses Need Structured Prompting",
    metaDescription: "The business case for investing in prompt engineering frameworks over generic LLM use.",
    explanation: "Generic usage leads to generic business. Structured prompting allows for predictable, repeatable, and scalable operations. It transforms AI from a toy into a production-ready tool that handles complex multi-step reasoning tasks without human oversight.",
    cta: "Download business case",
    category: "Strategy",
    time: "6 min read"
  }
];

const FAQS: FAQItem[] = [
  { q: "What is PromptToGo?", a: "We are a curated marketplace for high-performance AI prompts, designed to save you hours of trial and error." },
  { q: "Can I use these for commercial projects?", a: "Yes, all prompts purchased or accessed through our library come with a full commercial usage license." },
  { q: "Do you offer custom prompt engineering?", a: "Absolutely. Our enterprise team works directly with companies to build private prompt libraries and workflows." },
  { q: "What makes a prompt premium?", a: "A premium prompt has been rigorously tested against multiple LLM models, includes dynamic variables for flexibility, and follows industry-standard prompt engineering frameworks like Chain-of-Thought or Few-Shot prompting." },
  { q: "Which AI tools does this support?", a: "Our prompts are platform-agnostic but optimized for leading models including ChatGPT (GPT-4), Claude 3.5, Gemini 1.5 Pro, and Llama 3." },
  { q: "Can I sell prompts?", a: "Yes! Once our marketplace officially launches, verified creators can list their high-performing prompt sets for sale to our global audience." },
  { q: "Do you offer enterprise-grade licensing?", a: "We do. Our enterprise plans include multi-seat licenses, private internal library hosting, and custom SLA agreements for large-scale deployments." },
  { q: "How often is the prompt library updated?", a: "We add new prompts every week. Our team constantly monitors AI model updates to ensure our library remains compatible with the latest capabilities." },
  { q: "Is there a refund policy for marketplace purchases?", a: "Due to the digital nature of prompt content, we typically offer a 24-hour 'compatibility window' where refunds can be requested if a prompt fails to produce the advertised output structure." },
  { q: "Can I use these prompts for automated API workflows?", a: "Absolutely. Many of our prompts are designed with JSON or Markdown output structures specifically to be integrated into automated software pipelines and API calls." }
];

const TEAM_MEMBERS: TeamMember[] = [
  { id: "1", name: "ARYA KC", role: "Full stack Developer", img: arya, desc: "Leading end-to-end development architecture with a focus on scalable systems." },
  { id: "2", name: "Kavin P", role: "Frontend Developer", img: kavin, desc: "Crafting intuitive and responsive user interfaces with modern web technologies." },
  { id: "3", name: "Mekala M", role: "Backend Developer", img: mekala, desc: "Architecting robust server-side logic and high-performance database management." },
  { id: "4", name: "Shanmuga Sundaram", role: "Prompt Engineer", img: sanmugam, desc: "Designing precision AI interaction frameworks for maximum output quality." },
  { id: "5", name: "Manoj Kumar M", role: "Cloud and Devops Engineer", img: manoj, desc: "Optimizing deployment pipelines and cloud infrastructure for seamless scaling." },
  { id: "6", name: "Akshaya Gopi", role: "Quality Analyst", img: akshaya, desc: "Ensuring excellence through rigorous testing and performance monitoring." },
  { id: "7", name: "Gunavathi", role: "Quality Analyst", img: gunavathi, desc: "Dedicated to maintaining the highest standards of product reliability and user experience." },
  { id: "8", name: "Abirami", role: "Digital Marketing specialist", img: abirami, desc: "Driving growth through strategic digital campaigns and data-driven engagement." }
];

const STEPS: Step[] = [
  {
    icon: Search,
    title: "Discover high quality prompt",
    desc: "Explore our collection of verified, high-performance prompts tailored for specific industries."
  },
  {
    icon: GraduationCap,
    title: "Learn to build prompt",
    desc: "Review detailed use cases and visual examples to master prompt engineering frameworks."
  },
  {
    icon: Hammer,
    title: "Built your prompts",
    desc: "Construct custom logic and variables to optimize your specific AI model requirements."
  },
  {
    icon: ShoppingBag,
    title: "Buy and sell prompt",
    desc: "Join our marketplace to access premium prompt sets or monetize your own engineered assets."
  }
];

const AUDIENCES: Audience[] = [
  { icon: FileText, title: "Professionals", desc: "Create reports, proposals, and summaries faster." },
  { icon: Megaphone, title: "Marketers", desc: "Generate campaigns, ad copy, and content plans." },
  { icon: Code2, title: "Developers", desc: "Get help with coding, debugging, and documentation." },
  { icon: GraduationCap, title: "Students & Researchers", desc: "Create study guides and structured notes." },
  { icon: Briefcase, title: "Founders & Teams", desc: "Speed up planning, research, and workflows." },
  { icon: Lightbulb, title: "Creators", desc: "Generate scripts, hooks, and creative ideas." }
];

const VERIFICATION_STEPS: VerificationStep[] = [
  { icon: Target, title: "Real-World Use Case Check", desc: "Every prompt solves a practical task like writing, coding, marketing, or research." },
  { icon: Layers, title: "Structure & Clarity Review", desc: "Prompts are clear, structured, and easy to use." },
  { icon: Cpu, title: "Output Quality Testing", desc: "Tested to ensure useful and repeatable results." },
  { icon: Sparkles, title: "Refinement & Optimization", desc: "Improved for better performance and simplicity." },
  { icon: Filter, title: "Category Mapping", desc: "Organized by use case and workflow." },
  { icon: CheckCircle2, title: "Final Approval", desc: "Only high-quality prompts are marked as verified." }
];

const PROMPTS: Prompt[] = [
  {
    id: 1,
    title: "Viral Hook Architect",
    category: "Marketing",
    desc: "Generate 10 high-engagement hooks for social media content based on psychology.",
    img: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800",
    model: "ChatGPT, Grok, Meta",
    content: "Act as a viral marketing expert. Analyze the following topic: [TOPIC]. Create 10 hooks using the 'Curiosity Gap' and 'Negative Constraint' frameworks to stop the scroll and drive clicks.",
    useCase: "Ideal for Content Creators and Growth Hackers."
  },
  {
    id: 2,
    title: "Clean Code Reviewer",
    category: "Development",
    desc: "Automated code review agent that focuses on SOLID principles and performance.",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    model: "Claude, Gemini, Grok",
    content: "You are a Senior Full-stack Engineer. Review the provided snippet for: 1. Time complexity 2. DRY violations 3. Memory leaks. Refactor the code for maximum readability. Snippet: [CODE]",
    useCase: "Perfect for Technical Leads and Senior Devs."
  },
  {
    id: 3,
    title: "SaaS SEO Strategist",
    category: "Marketing",
    desc: "Comprehensive SEO audit and strategy planner for high-growth software companies.",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80",
    model: "Perplexity, Gemini, ChatGPT",
    content: "Develop a 3-month SEO roadmap for a B2B SaaS startup. Focus on topical authority and pillar-cluster architecture for high-intent keywords.",
    useCase: "Best for early-stage startups building organic moats."
  },
  {
    id: 4,
    title: "Product Launch Guru",
    category: "Business",
    desc: "Detailed GTM strategy including pricing tiers, launch sequence, and copy.",
    author: "FounderFlow",
    img: "https://images.unsplash.com/photo-1664575602554-2087b04935a5?w=800&q=80",
    model: "Claude, ChatGPT, Perplexity",
    content: "Develop a 30-day Go-To-Market (GTM) plan for a B2B SaaS product in the AI space. Define three distinct pricing tiers based on value-based pricing models. Outline a launch sequence starting from 'Teaser Phase' (Day 1-7), 'Hype Building' (Day 8-21), to 'Launch Day' (Day 30). For each phase, provide high-converting copy templates for email sequences, LinkedIn posts, and Product Hunt descriptions. Include a list of key metrics (KPIs) to track success and a contingency plan for low initial user acquisition.",
    useCase: "Designed for product managers and founders preparing for a Product Hunt launch."
  },
  {
    id: 5,
    title: "UX Storyboarder",
    category: "Creative",
    desc: "Generate detailed user journey scenarios and visual interface requirements.",
    author: "DesignLead",
    img: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80",
    model: "Meta, Gemini, Claude",
    content: "Create a detailed user story for a mobile app focused on sustainability, mapping out every touchpoint from initial onboarding to daily habit formation. Describe the user's emotional state, pain points, and 'aha moments' at each stage. Based on this journey, outline the visual interface requirements: specify primary call-to-action placements, necessary feedback loops (micro-interactions), and data visualization needs that help the user track their environmental impact in real-time. Provide a high-level site map for the core flow.",
    useCase: "Use this during discovery phases to align stakeholders and designers."
  },
  {
    id: 6,
    title: "Backend API Designer",
    category: "Development",
    desc: "Define REST/GraphQL schemas and database relationships for complex apps.",
    author: "SystemSage",
    img: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=800",
    model: "Grok, ChatGPT, Gemini",
    content: "Design a scalable API schema for a real-time collaboration tool. Define the core entities (Users, Workspaces, Documents, Comments) and their relationships (One-to-Many, Many-to-Many). Create a full RESTful endpoint list with appropriate HTTP methods, request body structures, and expected response codes. Additionally, provide a GraphQL schema equivalent including Queries, Mutations, and Subscriptions for real-time updates. Include a strategy for rate limiting, authentication (JWT/OAuth2), and data caching using Redis to ensure low latency under heavy load.",
    useCase: "Essential for technical leads mapping out system requirements before coding starts."
  }
];

// --- Sub-components ---
const Logo: React.FC = () => (
  <span className="text-xl font-bold tracking-tight text-gray-900">
    Prompt<span className="text-emerald-600">ToGo</span>
  </span>
);

const WaitlistView: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({ firstname: '', lastname: '', email: '', message: '' });
  const [status, setStatus] = useState<FormStatus>({ submitting: false, success: false, error: null });

  const validateName = (name: string) => /^[a-zA-Z\s]+$/.test(name.trim()) && name.trim().length > 0;
  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email.toLowerCase()) && email.toLowerCase().endsWith('.com');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateName(formData.firstname) || !validateName(formData.lastname)) {
      setStatus({ submitting: false, success: false, error: "Names cannot contain special characters or numbers." });
      return;
    }
    if (!validateEmail(formData.email)) {
      setStatus({ submitting: false, success: false, error: "Please enter a valid .com email address." });
      return;
    }

    setStatus({ submitting: true, success: false, error: null });

    const portalId = "245230949";
    const formId = "d4b3c9f5-ca4d-4aef-b253-df1a0f4d07cb";
    const endpoint = `https://api.hsforms.com/submissions/v3/integration/submit/${portalId}/${formId}`;

    const payload = {
      fields: [
        { name: "firstname", value: formData.firstname },
        { name: "lastname", value: formData.lastname },
        { name: "email", value: formData.email },
        { name: "message", value: formData.message || "No message provided" }
      ],
      context: {
        pageUri: window.location.href,
        pageName: "PromptToGo Waitlist"
      }
    };

    const submitWithRetry = async (retries = 5, delay = 1000): Promise<Response> => {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
        if (!response.ok && retries > 0) throw new Error('Retry');
        return response;
      } catch (err) {
        if (retries === 0) throw err;
        await new Promise(resolve => setTimeout(resolve, delay));
        return submitWithRetry(retries - 1, delay * 2);
      }
    };

    try {
      const response = await submitWithRetry();
      if (response.ok) {
        setStatus({ submitting: false, success: true, error: null });
      } else {
        throw new Error('Failed to submit');
      }
    } catch (err) {
      setStatus({ submitting: false, success: false, error: "Something went wrong. Please try again later." });
    }
  };

  return (
    <section className="pt-44 pb-32 px-6 min-h-screen">
      <div className="max-w-2xl mx-auto">
        <div className="mb-12 text-center">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6 mx-auto bg-emerald-600/10">
            <Zap className="w-8 h-8 text-emerald-600" />
          </div>
          <h2 className="text-5xl font-black tracking-tighter mb-4 uppercase text-gray-900">Join Waitlist</h2>
          <p className="text-xl font-medium text-gray-600">Be the first to access our premium prompt marketplace.</p>
        </div>

        <div className="p-8 md:p-12 rounded-[3rem] border border-gray-200 bg-white/50 shadow-2xl backdrop-blur-sm">
          {status.success ? (
            <div className="py-12 text-center">
              <div className="w-20 h-20 rounded-full bg-emerald-600/10 flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-3xl font-black text-gray-900 uppercase mb-2">Success</h3>
              <p className="text-gray-600 font-medium">Thank you for joining our exclusive early access list.</p>
              <button onClick={() => setStatus({ submitting: false, success: false, error: null })} className="mt-8 px-8 py-3 rounded-xl text-[12px] font-black uppercase tracking-widest text-emerald-600 border border-emerald-600/20 hover:bg-emerald-600/10">Go Back</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-500 mb-2 block">First Name</label>
                  <input required type="text" name="firstname" value={formData.firstname} onChange={handleInputChange} placeholder="First Name" className="w-full h-14 bg-white border border-gray-200 rounded-xl px-6 outline-none text-gray-900 focus:border-emerald-600 transition-colors" />
                </div>
                <div>
                  <label className="text-[11px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Last Name</label>
                  <input required type="text" name="lastname" value={formData.lastname} onChange={handleInputChange} placeholder="Last Name" className="w-full h-14 bg-white border border-gray-200 rounded-xl px-6 outline-none text-gray-900 focus:border-emerald-600 transition-colors" />
                </div>
              </div>
              <div>
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Email Address</label>
                <input required type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="email@example.com" className="w-full h-14 bg-white border border-gray-200 rounded-xl px-6 outline-none text-gray-900 focus:border-emerald-600 transition-colors" />
              </div>
              <div>
                <label className="text-[11px] font-black uppercase tracking-widest text-gray-500 mb-2 block">Message (Optional)</label>
                <textarea name="message" value={formData.message} onChange={handleInputChange} placeholder="How do you plan to use PromptToGo?" className="w-full bg-white border border-gray-200 rounded-xl p-6 outline-none text-gray-900 focus:border-emerald-600 transition-colors min-h-[120px] resize-none"></textarea>
              </div>
              {status.error && <div className="text-red-600 text-[10px] font-black uppercase text-center">{status.error}</div>}
              <button disabled={status.submitting} className="w-full py-5 rounded-2xl text-[14px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-3 text-white bg-emerald-600 hover:scale-[1.02] disabled:opacity-50">
                {status.submitting ? <Loader2 className="w-5 h-5 animate-spin" /> : 'Join Waitlist'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const ContactView = (): JSX.Element => (
  <section className="pt-44 pb-32 px-6 min-h-screen">
    <div className="max-w-3xl mx-auto text-center">
      <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-12 uppercase text-gray-900">Get in Touch</h2>
      <p className="text-xl text-gray-600 mb-12">Have questions or want to collaborate? Reach out to our team.</p>
      
      <div className="grid gap-8">
        <div className="inline-block p-12 rounded-[3rem] border border-gray-200 bg-white shadow-sm">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-emerald-600/10 text-emerald-600">
            <Mail className="w-8 h-8" />
          </div>
          <p className="text-[12px] font-black uppercase tracking-widest text-gray-500 mb-4">Email Address</p>
          <a href="mailto:founder@lhideacraft.com" className="text-3xl font-black text-emerald-600 hover:opacity-80 transition-opacity decoration-none">founder@lhideacraft.com</a>
        </div>

        <div className="inline-block p-12 rounded-[3rem] border border-gray-200 bg-white shadow-sm">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6 bg-emerald-600/10 text-emerald-600">
            <MapPin className="w-8 h-8" />
          </div>
          <p className="text-[12px] font-black uppercase tracking-widest text-gray-500 mb-4">Mailing Address</p>
          <p className="text-xl font-black text-gray-900 leading-relaxed">
            251 Little Falls Drive<br />
            Wilmington, DE 19808
          </p>
        </div>
      </div>
    </div>
  </section>
);

const AboutView = ({ navigateTo }: AboutViewProps): JSX.Element => (
  <section className="pt-44 pb-32 px-6 min-h-screen">
    <div className="max-w-3xl mx-auto">
      <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-12 uppercase text-gray-900">
        About Prompt<span className="text-emerald-600">ToGo</span>
      </h2>
      
      <div className="space-y-8 text-gray-600 font-medium leading-relaxed text-lg mb-16">
        <p>PromptToGo is a specialized platform dedicated to the art and science of prompt engineering. We believe that the bridge between human intent and AI excellence is a well-crafted prompt.</p>
        <p>Our mission is to empower professionals across all industries—from software development to creative marketing—with the architectural blueprints they need to harness generative AI effectively.</p>
        <p>Founded by a group of AI researchers and workflow optimizers, we bridge the gap between "good enough" results and "production-ready" excellence.</p>
      </div>
      
      <div className="p-10 rounded-[2.5rem] border border-gray-200 bg-white/80 mb-16">
        <p className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-2">INCUBATED BY</p>
        <h4 className="text-2xl font-black uppercase tracking-tight text-gray-900 mb-4">LH IdeaCraft Inc.</h4>
        <p className="text-lg text-gray-600 font-medium leading-relaxed">
          PromptToGo is developed and backed by LH IdeaCraft Inc., a product innovation lab focused on building next-generation productivity tools that help people work smarter with AI.
        </p>
      </div>

      <div className="flex justify-center mb-16">
        <div className="inline-block p-10 rounded-[2.5rem] border border-gray-200 bg-white">
          <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-4">Get in Touch</h4>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center bg-emerald-600/10 text-emerald-600">
              <Mail className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] font-black uppercase tracking-widest text-gray-500 mb-1">Email us at</p>
              <a href="founder@lhideacraft.com" className="text-xl font-black text-gray-900 hover:text-emerald-600 transition-colors">support@prompttogo.ai</a>
            </div>
          </div>
        </div>
      </div>

      <div className="p-10 md:p-14 rounded-[3rem] border border-emerald-600/20 bg-white shadow-xl relative overflow-hidden mb-16">
        <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
          <Zap className="w-32 h-32 text-emerald-600" />
        </div>
        <div className="relative z-10">
          <h3 className="text-3xl md:text-4xl font-black tracking-tighter uppercase mb-4 text-gray-900">
            Stop guessing prompts. <br />
            <span className="text-emerald-600">Start executing better AI workflows.</span>
          </h3>
          <p className="text-lg text-gray-600 font-medium mb-10 max-w-xl">
            Join thousands of users saving hours every week with premium, ready-to-use AI prompts.
          </p>
          <button 
            onClick={() => navigateTo('waitlist')}
            className="px-10 py-5 rounded-2xl text-[14px] font-black uppercase tracking-[0.2em] transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-3 text-white bg-emerald-600"
          >
            Join Waitlist <Zap className="w-5 h-5 fill-current" />
          </button>
        </div>
      </div>
    </div>
  </section>
);

const TeamsView = (): JSX.Element => (
  <section className="pt-44 pb-32 px-6 min-h-screen">
    <div className="max-w-5xl mx-auto">
      <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-12 uppercase text-gray-900 text-center">Our Team</h2>
      
      <div className="grid gap-12">
        {TEAM_MEMBERS.map((member) => (
          <div key={member.id} className="p-8 md:p-12 rounded-[3rem] border border-gray-200 bg-white shadow-sm">
            <div className="flex flex-col md:flex-row items-center gap-10">
              <div className="w-48 h-48 rounded-[2rem] overflow-hidden border border-emerald-600/20 shrink-0 bg-gray-100">
                 <img 
                   src={member.img} 
                   alt={member.name} 
                   className="w-full h-full object-cover"
                   onError={(e) => {
                     (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(member.name)}&background=10b981&color=fff&size=400`;
                   }}
                 />
              </div>
              <div>
                <h3 className="text-4xl font-black uppercase tracking-tighter mb-2 text-gray-900">{member.name}</h3>
                <p className="text-[14px] font-black uppercase tracking-[0.2em] text-emerald-600 mb-6">{member.role}</p>
                {member.desc && (
                  <div className="space-y-4 text-lg text-gray-600 font-medium leading-relaxed">
                    <p>{member.desc}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const BlogDetailView: React.FC<BlogDetailViewProps> = ({ post, navigateTo }) => (
  <section className="pt-44 pb-32 px-6 min-h-screen">
    <div className="max-w-4xl mx-auto">
      <button 
        onClick={() => navigateTo('home')}
        className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.3em] text-gray-400 hover:text-emerald-600 transition-colors mb-12 group"
      >
        <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" /> Back to home
      </button>

      <div className="mb-12">
        <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-600/10 text-emerald-600 border border-emerald-600/10 mb-8 inline-block">
          {post.category}
        </span>
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-gray-900 leading-[1.1] mb-8">
          {post.title}
        </h1>
        <div className="flex items-center gap-6 pb-12 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-emerald-600" />
            <span className="text-[11px] font-black uppercase tracking-widest text-gray-400">{post.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-600/10 flex items-center justify-center">
              <Sparkles className="w-4 h-4 text-emerald-600" />
            </div>
            <span className="text-[11px] font-black uppercase tracking-widest text-gray-900">By PromptToGo Editorial</span>
          </div>
        </div>
      </div>

      <div className="prose prose-xl max-w-none text-gray-600">
        <div className="bg-emerald-600/5 p-10 rounded-[2.5rem] border border-emerald-600/10 mb-12">
          <p className="text-xl font-bold text-emerald-900 leading-relaxed italic">
            "{post.metaDescription}"
          </p>
        </div>
        
        <div className="space-y-8 text-lg font-medium leading-relaxed">
          <p>{post.explanation}</p>
          <p>
            The integration of AI into modern workflows is no longer optional. However, the difference between success and failure often lies in the <strong>infrastructure of intent</strong>. 
            At PromptToGo, we've observed that high-performing teams treat their AI interactions like software code—version-controlled, tested, and shared.
          </p>
          <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100">
            <h3 className="text-xl font-black uppercase tracking-tighter text-gray-900 mb-4">Key Takeaways</h3>
            <ul className="space-y-4 list-none p-0">
              <li className="flex gap-4">
                <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Standardized prompts reduce output variability by up to 60%.</span>
              </li>
              <li className="flex gap-4">
                <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Team libraries prevent "prompt silos" and knowledge loss.</span>
              </li>
              <li className="flex gap-4">
                <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Structured data output (JSON/Markdown) is essential for scaling.</span>
              </li>
            </ul>
          </div>
          <p>
            As we move forward, the "Prompt Economy" will continue to evolve. Those who master the architectural principles of prompting today will lead the productivity gains of tomorrow.
          </p>
        </div>
      </div>

      <div className="mt-20 pt-12 border-t border-gray-100">
        <div className="p-10 md:p-14 rounded-[3rem] bg-gray-900 text-white relative overflow-hidden">
          <div className="relative z-10">
            <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">Ready to optimize your workflow?</h3>
            <p className="text-gray-400 mb-10 max-w-lg">Access our library of field-tested prompts today and start seeing immediate results.</p>
            <button 
              onClick={() => navigateTo('waitlist')}
              className="px-10 py-5 rounded-2xl text-[14px] font-black uppercase tracking-[0.2em] bg-emerald-600 hover:bg-emerald-700 transition-all text-white shadow-xl shadow-emerald-600/20"
            >
              Join Waitlist
            </button>
          </div>
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Zap className="w-48 h-48" />
          </div>
        </div>
      </div>
    </div>
  </section>
);

const HomeView: React.FC<HomeViewProps> = ({ 
  navigateTo, 
  scrollToSection, 
  activeCategory, 
  setActiveCategory, 
  filteredPrompts, 
  setSelectedPrompt,
  setActiveModal,
  isAnnual,
  setIsAnnual,
  onPostClick
}) => (
  <>
    {/* 1. Hero */}
    <section className="relative pt-44 pb-32 px-6">
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="w-full text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 border border-emerald-600/40 bg-emerald-600/10">
            <Zap className="w-4 h-4 text-emerald-600" />
            <span className="text-[12px] font-black uppercase tracking-[0.2em] text-emerald-600">
              The Future of Prompt Engineering
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-black leading-[0.95] tracking-tighter mb-8 text-gray-900 w-full uppercase">
            VERIFIED AI PROMPTS <br />
            <span className="text-emerald-600">FOR REAL WORK.</span>
          </h1>
          <p className="text-xl max-w-xl mb-12 font-medium leading-relaxed text-gray-600 mx-auto md:mx-0">
            Access a premium library of practical, high-quality prompts for marketing, business, development, research, and creative workflows.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center md:justify-start">
            <button 
              onClick={() => navigateTo('waitlist')}
              className="px-10 py-5 rounded-2xl text-lg font-black uppercase tracking-wider flex items-center justify-center gap-3 transition-all hover:translate-y-[-4px] text-white bg-emerald-600 shadow-lg shadow-emerald-600/20">
              Join Waitlist <Zap className="w-5 h-5 fill-current" />
            </button>
            <button 
              onClick={() => scrollToSection('library')}
              className="px-10 py-5 rounded-2xl text-lg font-black uppercase tracking-wider border-2 border-gray-300 transition-all flex items-center justify-center text-gray-900 hover:bg-white bg-transparent"
            >
              Explore Library
            </button>
          </div>
          <p className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-400">
            Save time. Improve output. Reuse what works.
          </p>
        </div>
      </div>
    </section>

    {/* 2. Core Benefits Section */}
    <section id="benefits" className="py-24 px-6 bg-white/40 border-y border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg mb-6 bg-emerald-600/10 border border-emerald-600/20">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Core Benefits</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 uppercase text-gray-900">Why PromptToGo</h2>
          <p className="text-lg font-medium text-gray-600">Engineered to transform your AI interaction into a high-performance asset.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          {CORE_BENEFITS.map((benefit, i) => (
            <div key={i} className="p-8 rounded-[2.5rem] border border-gray-200 bg-white/80 flex flex-col items-center text-center group hover:border-emerald-600/40 transition-all shadow-sm">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600/10 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                <benefit.icon size={28} />
              </div>
              <h4 className="text-[11px] font-black uppercase tracking-[0.2em] text-gray-400 mb-2">{benefit.title}</h4>
              <span className="text-[13px] font-bold text-gray-900 leading-tight">{benefit.text}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 3. Who it is for */}
    <section className="py-24 px-6 border-b border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-4 uppercase text-gray-900">Who PromptToGo is for</h2>
          <p className="text-lg font-medium text-gray-600">Tailored solutions for high-impact AI utilization.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {AUDIENCES.map((audience, i) => (
            <div key={i} className="p-8 rounded-[2rem] border border-gray-200 bg-white/60 group hover:border-emerald-600/40 transition-all shadow-sm">
              <div className="w-12 h-12 rounded-xl bg-emerald-600/10 flex items-center justify-center text-emerald-600 mb-6 group-hover:scale-110 transition-transform">
                <audience.icon size={24} />
              </div>
              <h4 className="text-xl font-black uppercase tracking-tighter mb-2 text-gray-900">{audience.title}</h4>
              <p className="font-medium text-gray-600 leading-relaxed text-sm">{audience.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 4. Problem section */}
    <section className="py-24 px-6 bg-white/60 border-y border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg mb-6 bg-red-600/10 border border-red-600/20">
              <AlertCircle className="w-4 h-4 text-red-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-red-600">The Problem</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 mb-8 uppercase leading-[1.1]">
              Stop wasting hours on <span className="text-red-600">weak prompts.</span>
            </h2>
            <div className="space-y-6">
              <p className="text-xl text-gray-600 font-medium leading-relaxed">
                Most people waste too much time writing weak prompts. Getting useful results from AI often requires trial and error.
              </p>
              <p className="text-xl text-emerald-600 font-black uppercase tracking-tight leading-relaxed">
                PromptToGo gives users a cleaner way to discover, save, and reuse prompts that actually improve output.
              </p>
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <div className="p-8 md:p-12 rounded-[3rem] bg-white border border-gray-200 relative overflow-hidden group shadow-lg">
              <div className="absolute top-0 right-0 p-8 opacity-[0.03]">
                <Terminal className="w-32 h-32 text-gray-900" />
              </div>
              <div className="relative z-10 space-y-8">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-red-600/10 flex items-center justify-center mt-1">
                      <X className="w-4 h-4 text-red-600" />
                    </div>
                    <div>
                      <h4 className="text-gray-900 font-black uppercase text-sm mb-1">Before PromptToGo</h4>
                      <p className="text-gray-500 text-sm">Frustrating loops of trial and error, inconsistent AI outputs, and scattered notes of "what worked."</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="shrink-0 w-8 h-8 rounded-full bg-emerald-600/10 flex items-center justify-center mt-1">
                      <Check className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div>
                      <h4 className="text-emerald-600 font-black uppercase text-sm mb-1">With PromptToGo</h4>
                      <p className="text-gray-600 text-sm">Instant access to field-tested prompt structures that deliver precise results on the first try.</p>
                    </div>
                  </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* 5. How it works */}
    <section id="how-it-works" className="py-24 px-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-4 uppercase text-gray-900">How It Works</h2>
          <p className="text-lg font-medium text-gray-600">Follow our simple four-step process to AI mastery.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {STEPS.map((s, i) => (
            <div key={i} className="text-center p-8 rounded-3xl border border-gray-200 bg-white/60 hover:border-emerald-600/40 transition-all group shadow-sm">
                <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-8 bg-emerald-600/10 text-emerald-600 group-hover:scale-110 transition-transform">
                  <s.icon className="w-10 h-10" />
                </div>
                <h4 className="text-xl font-black mb-4 uppercase tracking-tighter text-gray-900">{s.title}</h4>
                <p className="font-medium text-gray-600 text-sm">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 6. Benefits (Detailed Features) */}
    <section id="features" className="py-32 px-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-4 uppercase text-gray-900">Features</h2>
          <p className="text-lg font-medium text-gray-600">Everything you need to master AI prompt engineering.</p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURES.map((feat, i) => (
            <div key={i} className="p-10 rounded-[2.5rem] border border-gray-200 bg-white shadow-sm transition-all hover:border-emerald-600/40 hover:translate-y-[-4px]">
              <div className="w-14 h-14 rounded-2xl bg-emerald-600/10 flex items-center justify-center text-emerald-600 mb-8">
                <feat.icon size={28} />
              </div>
              <h4 className="text-xl font-black uppercase mb-4 tracking-tighter text-gray-900">{feat.title}</h4>
              <p className="font-medium text-gray-600 leading-relaxed">{feat.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 7. Categories (Library) */}
    <section id="library" className="py-32 px-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-black tracking-tighter mb-4 uppercase text-gray-900">Sample Prompt Library</h2>
          <p className="text-lg font-medium text-gray-600">Explore our industry-leading AI blueprint collection by category.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-xl text-[13px] font-black uppercase tracking-widest transition-all ${activeCategory === cat ? 'scale-105 text-white bg-emerald-600 shadow-md' : 'bg-white border border-gray-200 text-gray-500 hover:text-gray-900 hover:border-gray-300'}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPrompts.map((prompt) => (
            <div 
              key={prompt.id}
              className="group relative rounded-[2rem] overflow-hidden border border-gray-200 transition-all hover:scale-[1.02] bg-white shadow-sm"
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img src={prompt.img} alt={prompt.title} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-widest backdrop-blur-md bg-white/80 text-emerald-700 w-fit">
                    {prompt.category}
                  </span>
                  <div className="flex items-center gap-1 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider backdrop-blur-md bg-emerald-600/90 text-white w-fit">
                    <Bot size={10} /> {prompt.model}
                  </div>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-black mb-4 leading-tight transition-colors uppercase text-gray-900">{prompt.title}</h3>
                <p className="font-medium mb-8 line-clamp-2 text-gray-500">{prompt.desc}</p>
                <button 
                  onClick={() => { setSelectedPrompt(prompt); setActiveModal('prompt'); }}
                  className="w-full py-4 rounded-2xl text-[13px] font-black uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 bg-emerald-600/10 text-emerald-600 hover:bg-emerald-600/20"
                >
                  View Details <PlusSquare className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 8. The PromptToGo Blog */}
    <section id="blog" className="py-32 px-6 bg-white/40 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg mb-6 bg-emerald-600/10 border border-emerald-600/20">
              <BookOpen className="w-4 h-4 text-emerald-600" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Library Insights</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 uppercase text-gray-900 leading-[1.1]">The Prompt<span className="text-emerald-600">ToGo</span> Blog</h2>
            <p className="text-lg font-medium text-gray-600">Insights on prompt engineering, AI workflows, and building better outputs.</p>
          </div>
          <button className="flex items-center gap-2 text-[12px] font-black uppercase tracking-widest text-emerald-600 group">
            View All Posts <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {BLOG_POSTS.map((post) => (
            <article 
              key={post.id} 
              onClick={() => onPostClick(post)}
              className="p-10 rounded-[3rem] border border-gray-200 bg-white flex flex-col transition-all hover:border-emerald-600/40 hover:translate-y-[-4px] group cursor-pointer shadow-sm"
            >
              <div className="flex justify-between items-start mb-8">
                <span className="px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-600/10 text-emerald-600 border border-emerald-600/10">
                  {post.category}
                </span>
                <ArrowUpRight className="w-6 h-6 text-gray-300 group-hover:text-emerald-600 transition-colors" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter mb-6 text-gray-900 leading-tight group-hover:text-emerald-600 transition-colors">
                {post.title}
              </h3>
              <p className="text-[12px] font-black uppercase tracking-widest text-emerald-600/80 mb-4">
                {post.metaDescription}
              </p>
              <div className="space-y-6 mb-10">
                <p className="text-sm font-medium text-gray-500 leading-relaxed">
                  {post.explanation}
                </p>
              </div>
              <div className="mt-auto pt-8 border-t border-gray-100 flex flex-col gap-6">
                <button className="flex items-center gap-3 text-[11px] font-black uppercase tracking-[0.2em] text-gray-900 hover:text-emerald-600 transition-colors">
                  {post.cta} <ArrowRight className="w-4 h-4" />
                </button>
                <div className="flex items-center gap-2">
                  <Clock className="w-3 h-3 text-emerald-600" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">{post.time}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* 9. Social Proof (Replaced Roadmap) */}
    <section id="testimonials" className="py-32 px-6 bg-white/60 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg mb-6 bg-emerald-600/10 border border-emerald-600/20">
            <Star className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Wall of Love</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 uppercase text-gray-900 leading-tight">
            Trusted by <span className="text-emerald-600">AI Power Users</span>
          </h2>
          <p className="text-lg font-medium text-gray-600">See how professionals are accelerating their output with PromptToGo.</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-20">
          {TESTIMONIALS.map((t, i) => (
            <div key={i} className="p-10 rounded-[3rem] border border-gray-200 bg-white shadow-sm relative group hover:border-emerald-600/40 transition-all">
              <Quote className="absolute top-8 right-10 w-12 h-12 text-gray-50 opacity-10 group-hover:text-emerald-100 transition-colors" />
              <p className="text-lg font-medium text-gray-700 leading-relaxed mb-8 relative z-10 italic">
                "{t.content}"
              </p>
              <div className="flex items-center gap-4 border-t border-gray-50 pt-8">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-emerald-600/10 shrink-0">
                  <img src={t.avatar} alt={t.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-[14px] font-black uppercase tracking-tight text-gray-900">{t.name}</h4>
                  <p className="text-[11px] font-black uppercase tracking-widest text-emerald-600">{t.role} • {t.company}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: "Hours Saved/Week", val: "12+" },
            { label: "Verified Prompts", val: "500+" },
            { label: "Output Quality", val: "94%" },
            { label: "Active Users", val: "2.4k" }
          ].map((stat, i) => (
            <div key={i} className="p-8 rounded-[2rem] bg-gray-900 text-center flex flex-col justify-center items-center shadow-lg">
              <span className="text-4xl font-black text-emerald-500 mb-2">{stat.val}</span>
              <span className="text-[10px] font-black uppercase tracking-[0.25em] text-gray-400">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Verification Section */}
    <section id="verification" className="py-32 px-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-lg mb-6 bg-emerald-600/10 border border-emerald-600/20">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-emerald-600">Quality Assurance</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4 uppercase text-gray-900">Quality You Can Trust</h2>
          <p className="text-lg font-medium text-gray-600 max-w-2xl mx-auto">
            Every prompt in PromptToGo goes through a verification process to ensure quality, clarity, and real-world usefulness.
          </p>
        </div>

        <div className="mb-24">
          <h3 className="text-[12px] font-black uppercase tracking-[0.3em] text-emerald-600 mb-10 text-center flex items-center justify-center gap-4">
            <span className="h-px w-12 bg-emerald-600/20"></span>
            How Prompt Verification Works
            <span className="h-px w-12 bg-emerald-600/20"></span>
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {VERIFICATION_STEPS.map((step, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] border border-gray-200 bg-white group hover:border-emerald-600/40 transition-all shadow-sm">
                <div className="flex items-center gap-6 mb-6">
                  <div className="shrink-0 w-12 h-12 rounded-2xl bg-emerald-600/10 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform">
                    <step.icon size={24} />
                  </div>
                  <span className="text-4xl font-black text-gray-100">{i + 1}</span>
                </div>
                <h4 className="text-xl font-black uppercase mb-4 tracking-tighter text-gray-900 leading-tight">{step.title}</h4>
                <p className="font-medium text-gray-500 leading-relaxed text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          <div className="p-12 rounded-[3rem] bg-white border border-gray-200 shadow-sm">
            <h3 className="text-xl font-black uppercase tracking-tighter text-gray-900 mb-8 flex items-center gap-3">
              <CheckCircle2 className="text-emerald-600" /> What "Verified" Means
            </h3>
            <ul className="space-y-6">
              {[
                "Reviewed for real-world usefulness",
                "Tested for output quality",
                "Optimized for performance",
                "Organized for easy discovery",
                "Approved for practical workflows"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-gray-500 font-bold text-sm uppercase tracking-wide">
                  <Check className="w-5 h-5 text-emerald-600 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="p-12 rounded-[3rem] bg-emerald-600 border border-emerald-500 shadow-lg">
            <h3 className="text-xl font-black uppercase tracking-tighter text-white mb-8 flex items-center gap-3">
              <Zap className="text-white fill-current" /> Why It Matters
            </h3>
            <ul className="space-y-6">
              {[
                "Less trial and error",
                "Faster execution",
                "More consistent results",
                "Better productivity"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-white font-black text-sm uppercase tracking-widest">
                  <Check className="w-5 h-5 text-white shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex justify-center">
          <button 
            onClick={() => scrollToSection('library')}
            className="px-12 py-6 rounded-2xl text-[14px] font-black uppercase tracking-[0.25em] transition-all hover:scale-105 active:scale-95 text-white bg-gray-900 border border-transparent hover:bg-black flex items-center gap-3 shadow-xl"
          >
            Explore Verified Prompts <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>

    {/* 10. Pricing */}
    <section id="pricing" className="py-32 px-6 bg-white/40 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-4xl font-black tracking-tighter mb-4 uppercase text-gray-900">
            Simple pricing for serious AI users
          </h2>
          <div className="flex items-center justify-center gap-4 mt-8">
            <span className={`text-[12px] font-black uppercase tracking-widest ${!isAnnual ? 'text-gray-900' : 'text-gray-400'}`}>Monthly</span>
            <button 
              onClick={() => setIsAnnual(!isAnnual)}
              className="w-14 h-8 rounded-full bg-gray-200 border border-gray-300 p-1 flex items-center transition-all"
            >
              <div className={`w-6 h-6 rounded-full bg-emerald-600 shadow-lg transform transition-transform ${isAnnual ? 'translate-x-6' : 'translate-x-0'}`} />
            </button>
            <span className={`text-[12px] font-black uppercase tracking-widest ${isAnnual ? 'text-gray-900' : 'text-gray-400'}`}>Annually</span>
          </div>
        </div>

        <div className="max-w-lg mx-auto">
          {PRICING_PLANS.map((plan, i) => (
            <div key={i} className="relative p-10 md:p-14 rounded-[3.5rem] border-2 border-emerald-600 bg-white shadow-2xl shadow-emerald-600/10 group">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 px-6 py-2 rounded-full bg-emerald-600 text-white text-[11px] font-black uppercase tracking-widest">
                Most Popular
              </div>
              <div className="mb-10 text-center">
                <h3 className="text-2xl font-black uppercase tracking-tighter mb-4 text-gray-900">{plan.name}</h3>
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-6xl font-black tracking-tighter text-gray-900">{isAnnual ? plan.annuallyPrice : plan.monthlyPrice}</span>
                  <span className="text-gray-400 font-bold uppercase text-[12px] tracking-widest">{isAnnual ? '/year' : '/month'}</span>
                </div>
                <div className="mt-6 space-y-2">
                  <p className="text-emerald-600 font-bold text-sm uppercase tracking-tight">{plan.descriptionLine1}</p>
                  <p className="text-gray-500 font-medium text-[11px] uppercase tracking-wider">{plan.descriptionLine2}</p>
                </div>
              </div>
              <div className="space-y-4 mb-10">
                {plan.features.map((feat, j) => (
                  <div key={j} className="flex items-center gap-4">
                    <div className="shrink-0 w-6 h-6 rounded-full bg-emerald-600/10 flex items-center justify-center">
                      <Check className="w-3 h-3 text-emerald-600" />
                    </div>
                    <span className="text-gray-600 font-medium">{feat}</span>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => navigateTo('waitlist')}
                className="w-full py-5 rounded-2xl bg-emerald-600 text-white font-black uppercase tracking-[0.2em] text-[13px] hover:bg-emerald-700 transition-all hover:scale-[1.02] shadow-xl shadow-emerald-600/20"
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* 11. Final CTA */}
    <section className="py-32 px-6 border-t border-gray-200">
      <div className="max-w-7xl mx-auto">
        <div className="relative p-12 md:p-24 rounded-[4rem] bg-white overflow-hidden text-center border border-emerald-600/20 shadow-xl">
          <div className="absolute top-0 left-0 w-full h-full opacity-[0.03] pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,#10b981_0,transparent_50%)]" />
          </div>
          
          <div className="relative z-10 max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-6 uppercase text-gray-900 leading-[1.1]">
              Master the Art of the Prompt.
            </h2>
            <p className="text-xl md:text-2xl font-black tracking-tight mb-12 text-emerald-600 uppercase leading-snug">
              Start with a premium library of verified prompts built for real workflows.
            </p>
            <div className="flex flex-col items-center gap-6">
              <button 
                onClick={() => navigateTo('waitlist')}
                className="inline-flex px-12 py-6 rounded-2xl text-[16px] font-black uppercase tracking-[0.25em] transition-all hover:scale-105 hover:shadow-2xl hover:shadow-emerald-600/30 text-white bg-emerald-600"
              >
                Join Waitlist
              </button>
              <p className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-400">
                Better prompts. Better output. Less trial and error.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </>
);

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('home');
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const [copiedId, setCopiedId] = useState<number | null>(null);
  const [selectedPrompt, setSelectedPrompt] = useState<Prompt | null>(null);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [isAnnual, setIsAnnual] = useState<boolean>(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);

  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('All');

  useEffect(() => {
    const handleScroll = (): void => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredPrompts = useMemo(() => {
    return PROMPTS.filter(p => {
      const matchesSearch = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          p.desc.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, activeCategory]);

  const handleCopy = (text: string, id: number): void => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const navigateTo = (page: string): void => {
    setCurrentPage(page);
    setIsMenuOpen(false);
    if (page !== 'blog-detail') setSelectedPost(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (id: string): void => {
    setIsMenuOpen(false);
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.getElementById(id);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const closeModals = (): void => {
    setSelectedPrompt(null);
    setActiveModal(null);
  };

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const handlePostClick = (post: BlogPost) => {
    setSelectedPost(post);
    setCurrentPage('blog-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] text-gray-900 font-['Plus_Jakarta_Sans'] selection:bg-emerald-600/20 selection:text-emerald-700">
      <style>{`
        .nav-link {
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.25em;
          text-transform: uppercase;
          color: #4b5563;
          transition: all 0.3s ease;
        }
        .nav-link:hover {
          color: #059669;
        }
      `}</style>

      {/* Navigation */}
      <nav className={`fixed w-full z-[100] transition-all duration-300 ${scrolled ? 'py-4 backdrop-blur-md border-b border-gray-200 bg-white/90' : 'py-6 bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
          <div className="flex items-center gap-2 group cursor-pointer" onClick={() => navigateTo('home')}>
            <div className="w-10 h-10 rounded-xl flex items-center justify-center transition-transform bg-gray-100 group-hover:scale-110">
              <Sparkles className="text-gray-900 w-6 h-6" />
            </div>
            <Logo />
          </div>

          <div className="hidden md:flex items-center gap-10">
            <button onClick={() => navigateTo('home')} className="nav-link">HOME</button>
            <button onClick={() => scrollToSection('benefits')} className="nav-link">BENEFITS</button>
            <button onClick={() => scrollToSection('how-it-works')} className="nav-link">HOW IT WORKS</button>
            <button onClick={() => scrollToSection('library')} className="nav-link">LIBRARY</button>
            <button onClick={() => scrollToSection('features')} className="nav-link">FEATURES</button>
            <button onClick={() => scrollToSection('pricing')} className="nav-link">PRICING</button>
            <button 
              onClick={() => navigateTo('waitlist')}
              className="px-8 py-3 rounded-full text-[14px] font-black uppercase tracking-widest transition-all hover:scale-105 active:scale-95 text-white bg-emerald-600 shadow-md">
              Join Waitlist
            </button>
          </div>

          <button className="md:hidden text-gray-900" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-b border-gray-200 py-8 px-6 space-y-6 flex flex-col items-center shadow-lg">
            <button onClick={() => navigateTo('home')} className="nav-link">HOME</button>
            <button onClick={() => scrollToSection('benefits')} className="nav-link">BENEFITS</button>
            <button onClick={() => scrollToSection('how-it-works')} className="nav-link">HOW IT WORKS</button>
            <button onClick={() => scrollToSection('library')} className="nav-link">LIBRARY</button>
            <button onClick={() => scrollToSection('features')} className="nav-link">FEATURES</button>
            <button onClick={() => scrollToSection('pricing')} className="nav-link">PRICING</button>
            <button 
              onClick={() => navigateTo('waitlist')}
              className="w-full py-4 rounded-xl text-[14px] font-black uppercase tracking-widest text-white bg-emerald-600">
              Join Waitlist
            </button>
          </div>
        )}
      </nav>

      <main className="relative z-10">
        {currentPage === 'home' && (
          <HomeView 
            navigateTo={navigateTo} 
            scrollToSection={scrollToSection} 
            activeCategory={activeCategory}
            setActiveCategory={setActiveCategory}
            filteredPrompts={filteredPrompts}
            setSelectedPrompt={setSelectedPrompt}
            setActiveModal={setActiveModal}
            isAnnual={isAnnual}
            setIsAnnual={setIsAnnual}
            onPostClick={handlePostClick}
          />
        )}

        {currentPage === 'waitlist' && <WaitlistView />}

        {currentPage === 'contact' && <ContactView />}

        {currentPage === 'about' && <AboutView navigateTo={navigateTo} />}

        {(currentPage === 'team' || currentPage === 'teams') && <TeamsView />}

        {currentPage === 'blog-detail' && selectedPost && (
          <BlogDetailView post={selectedPost} navigateTo={navigateTo} />
        )}

        {currentPage === 'faq' && (
          <div className="pt-44 pb-20 px-6 min-h-screen">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-5xl md:text-7xl font-black mb-16 tracking-tighter text-center uppercase text-gray-900">FAQ</h1>
              <div className="grid gap-6">
                {FAQS.map((item, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className={`bg-white border rounded-[2.5rem] p-8 md:p-10 transition-all shadow-sm ${isOpen ? 'border-emerald-600/40 shadow-xl' : 'border-gray-200 hover:border-emerald-600/20'}`}>
                      <button 
                        onClick={() => toggleFaq(idx)}
                        className="w-full flex items-center justify-between text-left group"
                      >
                        <h3 className={`text-2xl font-black uppercase tracking-tighter leading-tight transition-colors ${isOpen ? 'text-emerald-600' : 'text-gray-900 group-hover:text-emerald-600'}`}>
                          <span className="text-emerald-600 mr-4">Q.</span>{item.q}
                        </h3>
                        <div className={`shrink-0 ml-4 p-2 rounded-xl bg-gray-50 transition-transform duration-300 ${isOpen ? 'rotate-180 text-emerald-600' : 'text-gray-400'}`}>
                          <ChevronDown size={24} />
                        </div>
                      </button>
                      
                      <div className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-8' : 'grid-rows-[0fr] opacity-0 mt-0 overflow-hidden'}`}>
                        <div className="flex gap-4 overflow-hidden">
                          <span className="text-gray-400 font-black uppercase text-sm mt-1 shrink-0">A.</span>
                          <p className="text-gray-600 text-lg font-medium leading-relaxed">{item.a}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Prompt Detail Modal */}
      {selectedPrompt && activeModal === 'prompt' && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-md">
          <div className="relative w-full max-w-4xl bg-white border border-gray-200 rounded-[3rem] p-12 overflow-y-auto max-h-[90vh] shadow-2xl">
            <button onClick={closeModals} className="absolute top-8 right-8 p-3 hover:bg-gray-100 rounded-xl text-gray-900"><X /></button>
            <h2 className="text-4xl font-black mb-6 uppercase tracking-tighter text-gray-900">{selectedPrompt.title}</h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <p className="text-gray-600 text-lg mb-8">{selectedPrompt.desc}</p>
                {selectedPrompt.author && (
                  <div className="mb-2 text-xs font-black uppercase tracking-widest text-gray-400">
                    Author: <span className="text-emerald-600">{selectedPrompt.author}</span>
                  </div>
                )}
                <div className="mb-4 text-[10px] font-black uppercase tracking-widest text-emerald-600 flex items-center gap-2">
                  <Bot size={14} /> Optimized For: {selectedPrompt.model}
                </div>
                <div className="p-6 bg-emerald-600/5 border border-emerald-600/10 rounded-2xl mb-8">
                  <h4 className="text-xs font-black uppercase text-emerald-600 mb-2">Use Case</h4>
                  <p className="italic font-bold text-gray-900">"{selectedPrompt.useCase}"</p>
                </div>
              </div>
              <div className="space-y-6">
                <div className="p-8 rounded-3xl bg-gray-50 border border-gray-100 font-mono text-sm relative group">
                  <p className="text-emerald-800 pr-10">{selectedPrompt.content}</p>
                  <button onClick={() => handleCopy(selectedPrompt.content, selectedPrompt.id)} className="absolute top-4 right-4 p-2 bg-white shadow-sm rounded-lg hover:bg-emerald-600 hover:text-white transition-colors">
                    {copiedId === selectedPrompt.id ? <Check size={16} /> : <Copy size={16} />}
                  </button>
                </div>
                <button className="w-full h-16 bg-emerald-600 text-white font-black uppercase tracking-widest rounded-xl hover:bg-emerald-700 transition-all shadow-lg">Get Blueprint</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="py-24 px-6 border-t border-gray-200 bg-white relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-12 gap-16 mb-20">
            <div className="md:col-span-4">
              <div className="flex items-center gap-2 mb-8 cursor-pointer" onClick={() => navigateTo('home')}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-gray-50">
                  <Sparkles className="text-gray-900 w-6 h-6" />
                </div>
                <Logo />
              </div>
              <p className="text-lg font-medium max-w-sm mb-8 text-gray-500">
                Empowering the next generation of AI creators through precision prompt engineering and curated workflows.
              </p>
            </div>
            <div className="md:col-span-2">
              <h4 className="text-[12px] font-black uppercase tracking-[0.2em] mb-8 border-b border-gray-100 pb-2 text-gray-900">Product</h4>
              <ul className="space-y-4">
                <li><button onClick={() => scrollToSection('how-it-works')} className="text-[12px] font-black uppercase tracking-wider transition-colors hover:opacity-80 text-gray-500 text-left">How It Works</button></li>
                <li><button onClick={() => scrollToSection('library')} className="text-[12px] font-black uppercase tracking-wider transition-colors hover:opacity-80 text-gray-500 text-left">Library</button></li>
                <li><button onClick={() => scrollToSection('features')} className="text-[12px] font-black uppercase tracking-wider transition-colors hover:opacity-80 text-gray-500 text-left">Features</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="text-[12px] font-black uppercase tracking-wider transition-colors hover:opacity-80 text-gray-500 text-left">Pricing</button></li>
                <li><button onClick={() => scrollToSection('testimonials')} className="text-[12px] font-black uppercase tracking-wider transition-colors hover:opacity-80 text-gray-500 text-left">Testimonials</button></li>
                <li><button onClick={() => navigateTo('faq')} className="text-[12px] font-black uppercase tracking-wider transition-colors hover:opacity-80 text-gray-500 text-left">FAQ</button></li>
              </ul>
            </div>
            <div className="md:col-span-3">
              <h4 className="text-[12px] font-black uppercase tracking-[0.2em] mb-8 border-b border-gray-100 pb-2 text-gray-900">Company</h4>
              <ul className="space-y-4">
                <li><button onClick={() => navigateTo('about')} className="text-[12px] font-black uppercase tracking-wider transition-colors hover:opacity-80 text-gray-500 text-left">About</button></li>
                <li><button onClick={() => navigateTo('contact')} className="text-[12px] font-black uppercase tracking-wider transition-colors hover:opacity-80 text-gray-500 text-left">Contact</button></li>
                <li><button onClick={() => navigateTo('terms')} className="text-[12px] font-black uppercase tracking-wider transition-colors hover:opacity-80 text-gray-500 text-left">Terms</button></li>
                <li><button onClick={() => navigateTo('privacy')} className="text-[12px] font-black uppercase tracking-wider transition-colors hover:opacity-80 text-gray-500 text-left">Privacy</button></li>
              </ul>
            </div>
            <div className="md:col-span-3">
              <h4 className="text-[12px] font-black uppercase tracking-[0.2em] mb-8 border-b border-gray-100 pb-2 text-gray-900">Developers</h4>
              <ul className="space-y-4">
                <li><button onClick={() => navigateTo('teams')} className="text-[12px] font-black uppercase tracking-wider transition-colors hover:opacity-80 text-gray-500 text-left">Our Team</button></li>
              </ul>
            </div>
          </div>
          <div className="pt-12 border-t border-gray-100">
            <p className="text-[12px] font-black uppercase tracking-[0.2em] text-gray-400">
              © 2026 PROMPTTOGO BY LH IDEACRAFT INC. ALL RIGHTS RESERVED.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;