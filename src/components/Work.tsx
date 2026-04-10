import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface CaseStudy {
  id: string;
  client: string;
  tag: string;
  title: string;
  description: string;
  stats: { value: string; label: string }[];
  tech: string[];
  badge: string;
  gradient: string;
  fullDescription?: string;
  challenge?: string;
  solution?: string;
  results?: string;
}

export const caseStudies: CaseStudy[] = [
  {
    id: "mereb-technologies",
    client: "Mereb Technologies",
    tag: "FinTech / Document Processing",
    title: "Intelligent Document Processing",
    description:
      "Automated commercial loan agreement analysis, reducing processing time from weeks to minutes while maintaining 99.2% accuracy.",
    stats: [
      { value: "360K", label: "Hours Saved" },
      { value: "99", label: "% Accuracy" },
      { value: "85", label: "% Cost Cut" },
    ],
    tech: ["NLP", "OCR", "Workflow"],
    badge: "⚡ 360K hrs saved",
    gradient: "from-primary/20 via-muted to-secondary",
    fullDescription: "Mereb Technologies needed to process thousands of commercial loan agreements monthly. Manual review was slow, error-prone, and expensive.",
    challenge: "Processing commercial loan agreements manually took weeks per batch, with inconsistent accuracy and high labor costs.",
    solution: "We built an AI-powered document processing pipeline using NLP and OCR to automatically extract, validate, and classify key terms from loan agreements.",
    results: "The system reduced processing time from weeks to minutes, achieved 99.2% accuracy, saved 360K hours annually, and cut costs by 85%.",
  },
  {
    id: "chapa",
    client: "Chapa",
    tag: "E-Commerce / Inventory",
    title: "Predictive Inventory Automation",
    description:
      "AI-driven supply chain optimization predicting stockouts before they happen, automating reordering across 12 distribution centers.",
    stats: [
      { value: "10", label: "% Cost Saved" },
      { value: "7", label: "% Transport" },
      { value: "12", label: "Centers" },
    ],
    tech: ["ML", "Forecasting", "API"],
    badge: "📦 12 centers synced",
    gradient: "from-secondary via-muted to-accent",
    fullDescription: "Chapa's rapid growth across East Africa demanded a smarter approach to inventory management across their 12 distribution centers.",
    challenge: "Frequent stockouts and overstock situations across 12 distribution centers led to lost sales and increased carrying costs.",
    solution: "We deployed a machine learning forecasting system that predicts demand patterns, automates reordering, and optimizes transport routes.",
    results: "Achieved 10% cost savings, 7% reduction in transport costs, and seamless synchronization across all 12 distribution centers.",
  },
  {
    id: "acuity-analytics",
    client: "Acuity Analytics",
    tag: "Healthcare / Claims",
    title: "Medical Claims Processing AI",
    description:
      "Automated claims validation and processing system reducing manual review time while flagging anomalies with 95% precision.",
    stats: [
      { value: "40", label: "% Speed ↑" },
      { value: "95", label: "% Precision" },
      { value: "20", label: "% Errors ↓" },
    ],
    tech: ["Secure", "Pattern AI", "Audit"],
    badge: "🏥 HIPAA compliant",
    gradient: "from-muted via-secondary to-accent",
    fullDescription: "Acuity Analytics handles millions of medical claims annually and needed to improve processing speed while maintaining HIPAA compliance.",
    challenge: "Manual claims review was slow and error-prone, with 20% of claims requiring rework due to processing errors.",
    solution: "We built a HIPAA-compliant AI system that validates claims, flags anomalies using pattern recognition, and provides full audit trails.",
    results: "Processing speed increased by 40%, anomaly detection precision reached 95%, and errors were reduced by 20%.",
  },
  {
    id: "laven",
    client: "Laven",
    tag: "Customer Service / Support",
    title: "Omnichannel Support Automation",
    description:
      "Intelligent routing and response system handling 50,000+ daily inquiries across email, chat, and voice with contextual understanding.",
    stats: [
      { value: "50K+", label: "Daily Queries" },
      { value: "25", label: "% Cost Cut" },
      { value: "24/7", label: "Uptime" },
    ],
    tech: ["NLP", "Sentiment", "Routing"],
    badge: "💬 50K+ daily",
    gradient: "from-accent via-muted to-secondary",
    fullDescription: "Laven's customer support team was overwhelmed by 50,000+ daily inquiries, leading to long wait times and inconsistent experiences.",
    challenge: "Handling 50,000+ daily support inquiries across multiple channels with limited staff led to poor response times and customer dissatisfaction.",
    solution: "We implemented an intelligent routing system with NLP-powered sentiment analysis that prioritizes, categorizes, and responds to inquiries automatically.",
    results: "The system now handles 50K+ queries daily with 24/7 uptime, cutting support costs by 25% while improving customer satisfaction.",
  },
];

/* ── Animated stat counter ── */
function AnimatedStat({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!isInView) return;
    const numeric = parseInt(value.replace(/[^0-9]/g, ""), 10);
    if (isNaN(numeric)) {
      setDisplay(value);
      return;
    }
    const suffix = value.replace(/[0-9]/g, "");
    const duration = 2000;
    const steps = 60;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(eased * numeric);
      setDisplay(current + suffix);
      if (step >= steps) {
        clearInterval(timer);
        setDisplay(value);
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center">
      <span className="block text-lg font-bold text-foreground">{display}</span>
      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</span>
    </div>
  );
}

/* ── Single card ── */
function CaseCard({ study, index }: { study: CaseStudy; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();

  const handleMouse = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -10, y: x * 10 });
  }, []);

  const resetTilt = useCallback(() => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  }, []);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={resetTilt}
      className="group relative flex-shrink-0 w-[340px] sm:w-[380px] snap-center cursor-pointer"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${hovered ? 30 : 0}px)`,
        transition: "transform 0.2s ease-out",
      }}
      onClick={() => navigate(`/case-study/${study.id}`)}
    >
      <div
        className="relative flex h-[580px] sm:h-[600px] flex-col overflow-hidden rounded-3xl border border-border bg-card"
        style={{
          boxShadow: hovered
            ? "0 20px 60px -10px hsl(var(--foreground)/.1), 0 0 0 1px hsl(var(--foreground)/.08)"
            : "0 10px 40px -10px hsl(var(--foreground)/.06)",
        }}
      >
        {/* Visual area */}
        <div className={`relative h-[40%] overflow-hidden bg-gradient-to-br ${study.gradient}`}>
          {/* Shine sweep */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,.12) 45%, rgba(255,255,255,.2) 50%, rgba(255,255,255,.12) 55%, transparent 60%)",
              animation: hovered ? "shineSweep 0.8s ease forwards" : "none",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />

          {/* Client logo text */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute left-4 top-4 rounded-lg bg-foreground/10 px-3 py-1.5 text-xs font-semibold text-foreground backdrop-blur-sm"
          >
            {study.client}
          </motion.div>

          {/* Badge */}
          <div className="absolute right-4 top-4 translate-y-[-20px] rounded-lg border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-medium text-foreground opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            {study.badge}
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-1 flex-col p-5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">
            {study.tag}
          </span>
          <h3 className="mt-2 text-xl font-bold text-foreground">{study.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{study.description}</p>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-muted/50 p-3">
            {study.stats.map((s) => (
              <AnimatedStat key={s.label} {...s} />
            ))}
          </div>

          {/* Tech pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {study.tech.map((t, i) => (
              <span
                key={t}
                className="rounded-full border border-border bg-muted/40 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground transition-all duration-200 group-hover:border-primary/30 group-hover:bg-primary/10 group-hover:text-foreground"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button
            className="mt-auto flex items-center gap-2 self-start rounded-xl bg-foreground px-5 py-2.5 text-sm font-semibold text-background transition-all duration-300 hover:scale-[1.02] hover:shadow-lg"
            onClick={(e) => {
              e.stopPropagation();
              navigate(`/case-study/${study.id}`);
            }}
          >
            View Case Study
            <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Main section ── */
const Work = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const scrollTo = (idx: number) => {
    const el = trackRef.current;
    if (!el) return;
    const cards = el.children;
    if (!cards[idx]) return;
    (cards[idx] as HTMLElement).scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center",
    });
    setActiveIdx(idx);
  };

  const handleScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const center = el.scrollLeft + el.clientWidth / 2;
    let closest = 0;
    let minDist = Infinity;
    Array.from(el.children).forEach((child, i) => {
      const c = (child as HTMLElement).offsetLeft + (child as HTMLElement).offsetWidth / 2;
      const dist = Math.abs(center - c);
      if (dist < minDist) {
        minDist = dist;
        closest = i;
      }
    });
    setActiveIdx(closest);
  };

  return (
    <section id="work" className="relative overflow-hidden py-16 md:py-24">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="section-label">Selected Work</span>
          <h2 className="mt-3 text-4xl font-bold text-foreground md:text-5xl">
            Case Studies
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Drag or scroll to explore our transformative AI implementations
          </p>
        </motion.div>
      </div>

      {/* Carousel */}
      <div className="mt-10" style={{ perspective: "2000px" }}>
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto scroll-smooth px-[max(1rem,calc((100vw-380px)/2))] pb-4 pt-2 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {caseStudies.map((s, i) => (
            <CaseCard key={s.client} study={s} index={i} />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <button
          onClick={() => scrollTo(Math.max(0, activeIdx - 1))}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>
        <div className="flex gap-2">
          {caseStudies.map((_, i) => (
            <button
              key={i}
              onClick={() => scrollTo(i)}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: activeIdx === i ? 24 : 8,
                background:
                  activeIdx === i ? "hsl(var(--foreground))" : "hsl(var(--muted-foreground)/.3)",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => scrollTo(Math.min(caseStudies.length - 1, activeIdx + 1))}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-colors hover:border-foreground hover:text-foreground"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
};

export default Work;
