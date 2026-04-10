import { useState, useRef, useEffect, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

interface CaseStudy {
  client: string;
  tag: string;
  title: string;
  description: string;
  stats: { value: string; label: string }[];
  tech: string[];
  badge: string;
  gradient: string;
}

const caseStudies: CaseStudy[] = [
  {
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
    gradient: "from-[#0f2027] via-[#203a43] to-[#2c5364]",
  },
  {
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
    gradient: "from-[#0f0c29] via-[#302b63] to-[#24243e]",
  },
  {
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
    gradient: "from-[#1a2a3a] via-[#0d4a4a] to-[#1a3a2a]",
  },
  {
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
    gradient: "from-[#1a1a2e] via-[#16213e] to-[#0f3460]",
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
    const increment = numeric / steps;
    let current = 0;
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      const eased = 1 - Math.pow(1 - progress, 3);
      current = Math.round(eased * numeric);
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
      <span className="block text-lg font-bold text-[hsl(var(--cs-accent))]">{display}</span>
      <span className="text-[10px] uppercase tracking-wider text-[hsl(var(--muted-foreground))]">{label}</span>
    </div>
  );
}

/* ── Single card ── */
function CaseCard({ study, index }: { study: CaseStudy; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

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
      className="cs-card group relative flex-shrink-0 w-[340px] sm:w-[380px] snap-center"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) translateZ(${hovered ? 30 : 0}px)`,
        transition: "transform 0.2s ease-out",
      }}
    >
      <div
        className="relative flex h-[620px] sm:h-[640px] flex-col overflow-hidden rounded-3xl border border-[hsl(var(--border))]"
        style={{
          background: "hsl(var(--cs-card-bg))",
          boxShadow: hovered
            ? "0 20px 60px -10px hsla(var(--cs-accent)/.15), 0 0 0 1px hsla(var(--cs-accent)/.2)"
            : "0 10px 40px -10px rgba(0,0,0,.3)",
        }}
      >
        {/* Visual area */}
        <div className={`relative h-[45%] overflow-hidden bg-gradient-to-br ${study.gradient}`}>
          {/* Shine sweep */}
          <div
            className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background:
                "linear-gradient(105deg, transparent 40%, rgba(255,255,255,.12) 45%, rgba(255,255,255,.2) 50%, rgba(255,255,255,.12) 55%, transparent 60%)",
              animation: hovered ? "shineSweep 0.8s ease forwards" : "none",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--cs-card-bg))] via-transparent to-transparent" />

          {/* Client logo text */}
          <motion.div
            animate={{ y: [0, -4, 0] }}
            transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
            className="absolute left-4 top-4 rounded-lg bg-white/10 px-3 py-1.5 text-xs font-semibold text-white backdrop-blur-sm"
          >
            {study.client}
          </motion.div>

          {/* Badge */}
          <div
            className="absolute right-4 top-4 translate-y-[-20px] rounded-lg border border-[hsl(var(--cs-accent))]/30 bg-[hsl(var(--cs-accent))]/10 px-3 py-1.5 text-xs font-medium text-[hsl(var(--cs-accent))] opacity-0 backdrop-blur-md transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            {study.badge}
          </div>
        </div>

        {/* Content area */}
        <div className="flex flex-1 flex-col p-5">
          <span className="text-[10px] font-bold uppercase tracking-widest text-[hsl(var(--cs-accent))]">
            {study.tag}
          </span>
          <h3 className="mt-2 text-xl font-bold text-[hsl(var(--foreground))]">{study.title}</h3>
          <p className="mt-2 text-sm leading-relaxed text-[hsl(var(--muted-foreground))]">{study.description}</p>

          {/* Stats */}
          <div className="mt-4 grid grid-cols-3 gap-2 rounded-xl bg-[hsl(var(--muted))]/30 p-3">
            {study.stats.map((s) => (
              <AnimatedStat key={s.label} {...s} />
            ))}
          </div>

          {/* Tech pills */}
          <div className="mt-4 flex flex-wrap gap-2">
            {study.tech.map((t, i) => (
              <span
                key={t}
                className="rounded-full border border-[hsl(var(--border))] bg-[hsl(var(--muted))]/40 px-3 py-1 text-[10px] font-medium uppercase tracking-wider text-[hsl(var(--muted-foreground))] transition-all duration-200 group-hover:border-[hsl(var(--cs-accent))]/30 group-hover:bg-[hsl(var(--cs-accent))]/10 group-hover:text-[hsl(var(--cs-accent))]"
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* CTA */}
          <button className="cs-cta mt-auto flex items-center gap-2 self-start rounded-xl bg-gradient-to-r from-[hsl(var(--cs-accent))] to-[hsl(var(--cs-accent-end))] px-5 py-2.5 text-sm font-semibold text-[hsl(var(--cs-card-bg))] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-[hsl(var(--cs-accent))]/20">
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
    <section id="work" className="cs-section relative overflow-hidden py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[hsl(var(--cs-accent))]">
            Selected Work
          </span>
          <h2 className="mt-3 bg-gradient-to-b from-[hsl(var(--foreground))] to-[hsl(var(--muted-foreground))] bg-clip-text text-4xl font-bold text-transparent md:text-5xl">
            Case Studies
          </h2>
          <p className="mt-3 text-sm text-[hsl(var(--muted-foreground))]">
            Drag or scroll to explore our transformative AI implementations
          </p>
        </motion.div>
      </div>

      {/* Carousel */}
      <div className="mt-12" style={{ perspective: "2000px" }}>
        <div
          ref={trackRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto scroll-smooth px-[max(1rem,calc((100vw-380px)/2))] pb-6 pt-2 snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none" }}
        >
          {caseStudies.map((s, i) => (
            <CaseCard key={s.client} study={s} index={i} />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          onClick={() => scrollTo(Math.max(0, activeIdx - 1))}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] transition-colors hover:border-[hsl(var(--cs-accent))] hover:text-[hsl(var(--cs-accent))]"
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
                  activeIdx === i ? "hsl(var(--cs-accent))" : "hsl(var(--muted-foreground)/.3)",
              }}
            />
          ))}
        </div>
        <button
          onClick={() => scrollTo(Math.min(caseStudies.length - 1, activeIdx + 1))}
          className="flex h-10 w-10 items-center justify-center rounded-full border border-[hsl(var(--border))] text-[hsl(var(--muted-foreground))] transition-colors hover:border-[hsl(var(--cs-accent))] hover:text-[hsl(var(--cs-accent))]"
        >
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
};

export default Work;
