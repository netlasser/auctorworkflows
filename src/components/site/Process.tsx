import { useState, useRef } from "react";
import {
  Search,
  FileCode2,
  Cpu,
  ShieldAlert,
  Rocket,
  Activity,
  CheckCircle2,
  Clock,
  Video,
  FileText,
  KeyRound,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Zap,
  ChevronDown,
} from "lucide-react";
import Reveal from "./Reveal";
import { CAL_LINK } from "@/lib/site";

interface ProcessStep {
  id: string;
  stepNumber: string;
  phase: string;
  title: string;
  duration: string;
  clientTime: string;
  icon: React.ComponentType<{ className?: string }>;
  tagline: string;
  summary: string;
  actions: string[];
  deliverable: {
    label: string;
    description: string;
  };
  safeguard: string;
}

const processSteps: ProcessStep[] = [
  {
    id: "discovery",
    stepNumber: "01",
    phase: "Discovery & Audit",
    title: "Process Audit & System Mapping",
    duration: "Day 1",
    clientTime: "30-min call",
    icon: Search,
    tagline: "Pinpointing bottlenecks, data leaks, and high-leverage automation targets.",
    summary:
      "We begin with a focused 30-minute discovery session to inspect your existing sales, marketing, or ops stack (CRM, lead forms, Apollo, email inboxes, Google Sheets). We map the exact manual touchpoints and quantify the time and revenue leaks.",
    actions: [
      "Audit existing manual workflows, spreadsheets, and repetitive team tasks",
      "Inspect API capabilities, webhook endpoints, and rate limits across your current tools",
      "Identify the highest-ROI entry point (e.g. instant lead qualification, cold email sync)",
      "Establish measurable baseline metrics (response latency, manual hours, reply rates)",
    ],
    deliverable: {
      label: "Automation Blueprint & Architecture Map",
      description:
        "A clear diagram outlining the proposed node architecture, data triggers, and expected runtime speed before a single line of code is written.",
    },
    safeguard: "Strict NDA & data confidentiality applied to all reviewed processes.",
  },
  {
    id: "scoping",
    stepNumber: "02",
    phase: "Scoping & Blueprint",
    title: "Fixed Scope & Milestone Roadmap",
    duration: "Day 2",
    clientTime: "15-min async review",
    icon: FileCode2,
    tagline: "Clear deliverables, fixed pricing, and transparent milestone checkpoints.",
    summary:
      "No vague hourly billing or runaway scope. You receive a concrete milestone-based scope document specifying exact inputs, schema mappings, AI prompt models, and fallbacks.",
    actions: [
      "Document exact trigger events, schema structures, and data transformation rules",
      "Agree on fixed milestone pricing with zero hidden surcharges or surprise invoices",
      "Establish secure credential exchange via encrypted vaults or scoped API keys",
      "Define unambiguous success criteria required for production sign-off",
    ],
    deliverable: {
      label: "Milestone Agreement & Security Checklist",
      description:
        "A fixed-price specification sheet with designated milestone deliverables and verified API credential checklist.",
    },
    safeguard: "Zero credentials stored in plain text. Scoped read/write tokens only.",
  },
  {
    id: "engineering",
    stepNumber: "03",
    phase: "Engineering",
    title: "n8n Workflow Build & AI Prompting",
    duration: "Days 3–6",
    clientTime: "Zero meetings (Async updates)",
    icon: Cpu,
    tagline: "Crafting resilient node logic, webhook listeners, and structured LLM prompts.",
    summary:
      "We engineer the entire automation pipeline inside n8n or Make.com. Our AI components (OpenAI GPT-4o, Anthropic Claude) are configured with strict JSON schemas and few-shot examples to guarantee hallucination-free outputs.",
    actions: [
      "Build custom n8n node sequences connecting webhooks, databases, and APIs",
      "Engineer system prompts with structured JSON validation to prevent AI drift",
      "Implement data deduplication, email normalization, and company enrichment logic",
      "Send async Loom video updates so you see working logic without sitting in meetings",
    ],
    deliverable: {
      label: "Sandbox Working Prototype",
      description:
        "A fully assembled automation engine running in staging with simulated live payloads and data enrichment checks.",
    },
    safeguard: "All AI prompts tested with fallback regex and JSON schema enforcement.",
  },
  {
    id: "testing",
    stepNumber: "04",
    phase: "Hardening & Stress Test",
    title: "Edge-Case Testing & Failover Mesh",
    duration: "Days 7–8",
    clientTime: "10-min Loom review",
    icon: ShieldAlert,
    tagline: "Simulating API crashes, bad inputs, and duplicate payloads to ensure bulletproof reliability.",
    summary:
      "Automations that fail silently destroy pipeline trust. We subject every workflow to rigorous stress testing: malformed lead forms, disconnected webhooks, and rate-limit spikes, ensuring automated failovers trigger instantly.",
    actions: [
      "Run 50+ diverse test payloads with missing data, unusual characters, and edge cases",
      "Configure automated dead-letter queues and instant Slack/Telegram alert nodes on errors",
      "Verify email deliverability compliance (SPF, DKIM, DMARC) for cold outreach sequences",
      "Conduct end-to-end sandbox dry-run with your team's real test data",
    ],
    deliverable: {
      label: "100% Verified Test Execution Report",
      description:
        "Detailed execution logs proving graceful error handling, webhook retries, and automated alerts for any edge case.",
    },
    safeguard: "Zero-data-loss guarantee: Failed payloads are captured in backup queues for instant retry.",
  },
  {
    id: "deployment",
    stepNumber: "05",
    phase: "Cutover & Handoff",
    title: "Live Production Cutover & Team Handoff",
    duration: "Days 9–10",
    clientTime: "20-min walkthrough",
    icon: Rocket,
    tagline: "Going live in your infrastructure with complete documentation and full code ownership.",
    summary:
      "We cut over to your live production environment. We provide a complete walkthrough video, detailed Notion/Markdown documentation, and raw exportable workflow JSON files. You own 100% of everything.",
    actions: [
      "Migrate workflows directly to your self-hosted VPS or n8n Cloud instance",
      "Record custom step-by-step Loom SOPs explaining every node and configuration switch",
      "Deliver clear Notion/Markdown technical documentation for your internal team",
      "Export raw workflow JSON files—ensuring zero vendor lock-in and complete portability",
    ],
    deliverable: {
      label: "Live Production Engine + Video SOPs + JSON Files",
      description:
        "The workflow executing live with full access credentials, comprehensive video SOPs, and permanent JSON backups.",
    },
    safeguard: "100% intellectual property ownership transferred to your company on delivery.",
  },
  {
    id: "warranty",
    stepNumber: "06",
    phase: "Warranty & Scale",
    title: "Active Monitoring & Optimization",
    duration: "14–30 Days post-launch",
    clientTime: "As needed",
    icon: Activity,
    tagline: "Free bug-fix warranty, live performance monitoring, and prompt fine-tuning.",
    summary:
      "We don't disappear after deployment. Every project includes a 14 to 30 day warranty where we monitor real-world execution logs, tune AI prompt temperatures, and optimize API costs as your volume grows.",
    actions: [
      "Monitor daily production execution logs for unexpected third-party API rate limits",
      "Fine-tune prompt scoring criteria and custom fields based on real inbound lead feedback",
      "Optimize token consumption and API payload sizes to minimize ongoing operational costs",
      "Provide free prompt adjustments and bug fixes under the milestone warranty",
    ],
    deliverable: {
      label: "Performance Stabilization & Cost Audit",
      description:
        "A follow-up report summarizing uptime, execution times, token cost savings, and recommendations for future scaling.",
    },
    safeguard: "Comprehensive 14–30 day warranty covers any bug or workflow adjustment at zero extra charge.",
  },
];

const principles = [
  {
    title: "Zero Vendor Lock-In",
    desc: "You own 100% of the workflow logic, code, and accounts. We provide raw JSON export files that you can import into any n8n instance at any time.",
    icon: KeyRound,
  },
  {
    title: "Asynchronous Respect",
    desc: "No endless status meetings. We share concise Loom video demos and written milestone logs, reserving live calls purely for high-value strategic decisions.",
    icon: Video,
  },
  {
    title: "Fail-Safe By Design",
    desc: "Every automation includes automated error-catching nodes, dead-letter queues, and instant Slack/Telegram notifications so not a single lead is ever lost.",
    icon: ShieldCheck,
  },
  {
    title: "Milestone-Backed Trust",
    desc: "Work is divided into clear, reviewable phases. You only release milestone payments once you verify the automation working in sandbox or production.",
    icon: Zap,
  },
];

const Process = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const mobileStepRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handleSelectStep = (idx: number) => {
    setActiveStep(idx);
    const targetEl = mobileStepRefs.current[idx];
    if (targetEl && window.innerWidth < 768) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  };

  return (
    <section id="process" className="relative px-4 sm:px-6 py-14 sm:py-20 md:py-24">
      <div className="mx-auto w-full max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto">
          <Reveal>
            <span className="section-label">How We Work</span>
            <h2 className="mt-3 font-display text-2xl sm:text-3xl md:text-4xl leading-tight">
              From initial discovery to live production automation
            </h2>
            <p className="mt-3 text-xs sm:text-sm md:text-base text-dim leading-relaxed max-w-2xl mx-auto">
              A disciplined, 6-stage engineering process designed to eliminate guesswork, protect your time, and deliver reliable, high-converting workflows.
            </p>
          </Reveal>
        </div>

        {/* Mobile-Only Horizontal Quick-Jump Pill Strip */}
        <div className="mt-8 block md:hidden">
          <div className="flex items-center justify-between px-1 mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-muted-ink">
              Process Stages
            </span>
            <span className="text-[11px] font-mono text-primary">
              Step {activeStep + 1} of {processSteps.length}
            </span>
          </div>

          <div className="flex gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar -mx-4 px-4">
            {processSteps.map((step, idx) => {
              const isSelected = activeStep === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => handleSelectStep(idx)}
                  className={`inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-all duration-200 active:scale-95 ${
                    isSelected
                      ? "bg-primary text-primary-foreground font-semibold shadow-sm shadow-primary/25 ring-2 ring-primary/30"
                      : "bg-card border border-border text-dim hover:text-foreground"
                  }`}
                >
                  <span
                    className={`font-mono text-[10px] ${
                      isSelected ? "text-primary-foreground" : "text-primary"
                    }`}
                  >
                    {step.stepNumber}
                  </span>
                  <span>{step.phase.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Desktop & Tablet: Interactive Step Switcher Bar */}
        <Reveal delay={80} className="mt-12 hidden md:block">
          <div className="grid grid-cols-6 gap-2 rounded-2xl border border-border bg-card/60 p-2 shadow-sm">
            {processSteps.map((step, idx) => {
              const Icon = step.icon;
              const isActive = activeStep === idx;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(idx)}
                  className={`group relative flex flex-col items-start rounded-xl p-3.5 text-left transition-all duration-200 ${
                    isActive
                      ? "bg-background border border-primary/40 shadow-sm shadow-primary/5"
                      : "hover:bg-background/50 border border-transparent"
                  }`}
                >
                  <div className="flex items-center justify-between w-full">
                    <span
                      className={`font-mono text-xs font-bold ${
                        isActive ? "text-primary" : "text-muted-ink group-hover:text-dim"
                      }`}
                    >
                      {step.stepNumber}
                    </span>
                    <Icon
                      className={`h-4 w-4 ${
                        isActive ? "text-primary" : "text-muted-ink group-hover:text-dim"
                      }`}
                    />
                  </div>
                  <span
                    className={`mt-2 text-xs font-semibold leading-tight line-clamp-1 ${
                      isActive ? "text-foreground" : "text-dim group-hover:text-foreground"
                    }`}
                  >
                    {step.phase}
                  </span>
                  <span className="mt-1 text-[10px] text-muted-ink font-mono">{step.duration}</span>

                  {isActive && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 h-1 w-8 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Active Step Deep-Dive Card (Desktop & Tablet View) */}
        <Reveal delay={120} className="mt-6 hidden md:block">
          {(() => {
            const current = processSteps[activeStep];
            const Icon = current.icon;
            return (
              <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-sm">
                {/* Top Banner of Active Step */}
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-border/70 pb-6">
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary border border-primary/20">
                      <Icon className="h-6 w-6" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs font-bold text-primary">
                          Stage {current.stepNumber}
                        </span>
                        <span className="text-xs font-medium text-muted-ink">• {current.phase}</span>
                      </div>
                      <h3 className="mt-1.5 font-display text-xl sm:text-2xl font-bold text-foreground">
                        {current.title}
                      </h3>
                      <p className="mt-1 text-sm text-dim">{current.tagline}</p>
                    </div>
                  </div>

                  {/* Time & Commitment Pill */}
                  <div className="flex flex-wrap items-center gap-3 lg:self-start">
                    <div className="flex items-center gap-2 rounded-xl border border-border bg-background/80 px-3.5 py-2 text-xs">
                      <Clock className="h-3.5 w-3.5 text-primary" />
                      <div>
                        <span className="text-muted-ink">Timeline: </span>
                        <strong className="text-foreground font-semibold">{current.duration}</strong>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 rounded-xl border border-border bg-background/80 px-3.5 py-2 text-xs">
                      <Video className="h-3.5 w-3.5 text-primary" />
                      <div>
                        <span className="text-muted-ink">Client Time: </span>
                        <strong className="text-foreground font-semibold">{current.clientTime}</strong>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Core Content Grid */}
                <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
                  {/* Left Column: What We Do */}
                  <div className="lg:col-span-7 space-y-4">
                    <div>
                      <h4 className="text-xs font-mono uppercase tracking-wider text-muted-ink">
                        Phase Execution Details
                      </h4>
                      <p className="mt-2 text-sm text-foreground/90 leading-relaxed">
                        {current.summary}
                      </p>
                    </div>

                    <div className="pt-2">
                      <h5 className="text-xs font-semibold text-foreground mb-3">
                        Technical Milestones in this Step:
                      </h5>
                      <ul className="space-y-2.5">
                        {current.actions.map((act, idx) => (
                          <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-dim">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>{act}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Right Column: Deliverable & Safeguard */}
                  <div className="lg:col-span-5 flex flex-col justify-between gap-4">
                    {/* Deliverable Box */}
                    <div className="rounded-xl border border-primary/20 bg-primary/[0.04] p-5">
                      <div className="flex items-center gap-2 text-primary text-xs font-bold uppercase tracking-wider">
                        <FileText className="h-4 w-4" />
                        <span>Client Deliverable</span>
                      </div>
                      <h5 className="mt-2 font-display text-sm sm:text-base font-bold text-foreground">
                        {current.deliverable.label}
                      </h5>
                      <p className="mt-1.5 text-xs text-dim leading-relaxed">
                        {current.deliverable.description}
                      </p>
                    </div>

                    {/* Safeguard Box */}
                    <div className="rounded-xl border border-border bg-background/60 p-4">
                      <div className="flex items-center gap-2 text-xs font-semibold text-foreground">
                        <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                        <span>Security & Quality Safeguard</span>
                      </div>
                      <p className="mt-1.5 text-xs text-muted-ink leading-relaxed">
                        {current.safeguard}
                      </p>
                    </div>

                    {/* Quick navigation buttons */}
                    <div className="flex items-center justify-between pt-2 border-t border-border/60">
                      <button
                        onClick={() => setActiveStep((prev) => (prev > 0 ? prev - 1 : processSteps.length - 1))}
                        className="text-xs font-medium text-dim hover:text-foreground transition-colors px-2 py-1"
                      >
                        ← Previous Step
                      </button>
                      <button
                        onClick={() => setActiveStep((prev) => (prev < processSteps.length - 1 ? prev + 1 : 0))}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline px-2 py-1"
                      >
                        Next Step: {processSteps[(activeStep + 1) % processSteps.length].phase} →
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </Reveal>

        {/* Mobile Connected Vertical Timeline (Optimized for Small Screens) */}
        <div className="mt-6 md:hidden relative">
          {/* Vertical Timeline Railway Spine */}
          <div className="absolute left-[18px] top-6 bottom-6 w-[2px] bg-border/80" />

          <div className="space-y-4 relative">
            {processSteps.map((step, idx) => {
              const Icon = step.icon;
              const isExpanded = activeStep === idx;
              return (
                <div
                  key={step.id}
                  ref={(el) => (mobileStepRefs.current[idx] = el)}
                  className="relative pl-12"
                >
                  {/* Step Node Marker on the Timeline Spine */}
                  <button
                    onClick={() => setActiveStep(isExpanded ? -1 : idx)}
                    aria-label={`Toggle stage ${step.stepNumber}: ${step.title}`}
                    className={`absolute left-0 top-3 flex h-9 w-9 items-center justify-center rounded-full font-mono text-xs font-bold transition-all duration-200 z-10 ${
                      isExpanded
                        ? "bg-primary text-primary-foreground ring-4 ring-primary/20 shadow-md scale-105"
                        : "bg-card border-2 border-border text-dim hover:border-primary/50"
                    }`}
                  >
                    {step.stepNumber}
                  </button>

                  {/* Step Accordion Card */}
                  <div
                    className={`rounded-xl border transition-all duration-200 overflow-hidden ${
                      isExpanded
                        ? "border-primary/40 bg-card shadow-sm shadow-primary/5"
                        : "border-border bg-card/60 hover:bg-card"
                    }`}
                  >
                    {/* Header Bar */}
                    <button
                      onClick={() => setActiveStep(isExpanded ? -1 : idx)}
                      className="flex w-full items-start justify-between p-3.5 sm:p-4 text-left gap-2"
                    >
                      <div className="flex-1 min-w-0 pr-1">
                        <div className="flex flex-wrap items-center gap-1.5">
                          <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-mono font-bold text-primary">
                            {step.phase}
                          </span>
                          <span className="text-[10px] font-mono text-muted-ink">• {step.duration}</span>
                        </div>

                        <h3 className="mt-1 font-display text-sm font-bold text-foreground leading-snug break-words">
                          {step.title}
                        </h3>

                        {!isExpanded && (
                          <p className="mt-1 text-[11px] text-muted-ink line-clamp-1">
                            {step.tagline}
                          </p>
                        )}
                      </div>

                      <div
                        className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-border/80 bg-background/80 transition-transform duration-200 mt-0.5 ${
                          isExpanded ? "rotate-180 text-primary border-primary/30" : "text-muted-ink"
                        }`}
                      >
                        <ChevronDown className="h-4 w-4" />
                      </div>
                    </button>

                    {/* Expanded Content on Mobile */}
                    {isExpanded && (
                      <div className="border-t border-border/70 px-3.5 sm:px-4 pb-4 pt-3 space-y-3.5 bg-background/40">
                        {/* Summary */}
                        <p className="text-xs text-dim leading-relaxed">
                          {step.summary}
                        </p>

                        {/* Quick Time & Commitment Badges */}
                        <div className="grid grid-cols-2 gap-2 text-[11px] pt-1">
                          <div className="rounded-lg border border-border/70 bg-card/80 p-2">
                            <span className="block text-[10px] text-muted-ink">Timeline</span>
                            <strong className="text-foreground font-semibold">{step.duration}</strong>
                          </div>
                          <div className="rounded-lg border border-border/70 bg-card/80 p-2">
                            <span className="block text-[10px] text-muted-ink">Your Time</span>
                            <strong className="text-foreground font-semibold">{step.clientTime}</strong>
                          </div>
                        </div>

                        {/* Key Milestones List */}
                        <div className="space-y-1.5 pt-1">
                          <span className="text-[11px] font-semibold text-foreground">
                            Key Milestones:
                          </span>
                          <ul className="space-y-1.5">
                            {step.actions.map((act, aIdx) => (
                              <li key={aIdx} className="flex items-start gap-2 text-[11px] sm:text-xs text-dim">
                                <CheckCircle2 className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                                <span className="leading-snug">{act}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Deliverable Box */}
                        <div className="rounded-xl border border-primary/25 bg-primary/[0.05] p-3">
                          <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                            <FileText className="h-3.5 w-3.5" />
                            <span>Client Deliverable</span>
                          </div>
                          <p className="text-xs font-bold text-foreground mt-1 leading-snug">
                            {step.deliverable.label}
                          </p>
                          <p className="text-[11px] text-dim mt-1 leading-relaxed">
                            {step.deliverable.description}
                          </p>
                        </div>

                        {/* Safeguard Note */}
                        <div className="flex items-start gap-2 rounded-lg border border-border/60 bg-card/60 p-2.5 text-[11px] text-muted-ink">
                          <ShieldCheck className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                          <span className="leading-tight">{step.safeguard}</span>
                        </div>

                        {/* Next Step Progression Action */}
                        {idx < processSteps.length - 1 ? (
                          <button
                            onClick={() => handleSelectStep(idx + 1)}
                            className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-primary/10 py-2.5 text-xs font-semibold text-primary transition-colors hover:bg-primary/20"
                          >
                            <span>Next: Step {processSteps[idx + 1].stepNumber} ({processSteps[idx + 1].phase})</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </button>
                        ) : (
                          <a
                            href={CAL_LINK}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-full flex items-center justify-center gap-1.5 rounded-lg bg-primary py-2.5 text-xs font-bold text-primary-foreground shadow-sm shadow-primary/20"
                          >
                            <span>Book Discovery Call</span>
                            <ArrowRight className="h-3.5 w-3.5" />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4 Guarantees Grid (Optimized for Mobile) */}
        <div className="mt-12 sm:mt-16">
          <Reveal>
            <div className="text-center max-w-xl mx-auto mb-6 sm:mb-8">
              <h3 className="font-display text-lg sm:text-xl font-bold text-foreground">
                The Guarantees Behind How We Work
              </h3>
              <p className="text-xs sm:text-sm text-dim mt-1">
                Built-in safeguards so you can outsource critical workflow engineering with total confidence.
              </p>
            </div>
          </Reveal>

          <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {principles.map((item, idx) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={idx * 60}>
                  <div className="group relative flex h-full flex-col justify-between rounded-xl border border-border bg-card/60 p-4 sm:p-5 transition-all duration-200 hover:border-primary/40 hover:bg-card">
                    <div>
                      <div className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-lg bg-primary/10 text-primary transition-transform group-hover:scale-110">
                        <Icon className="h-4 w-4" />
                      </div>
                      <h4 className="mt-3 font-display text-sm font-bold text-foreground">
                        {item.title}
                      </h4>
                      <p className="mt-1.5 text-xs text-dim leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </div>

        {/* Bottom CTA Banner (Mobile-Optimized Touch Target) */}
        <Reveal delay={140} className="mt-10 sm:mt-16">
          <div className="rounded-2xl border border-primary/30 bg-gradient-to-br from-card via-card to-primary/5 p-5 sm:p-8 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-5 sm:gap-6 shadow-sm">
            <div className="w-full sm:w-auto text-left">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 font-mono text-[11px] font-semibold text-primary">
                <Sparkles className="h-3 w-3" /> Ready to get started?
              </span>
              <h3 className="mt-2 font-display text-lg sm:text-xl md:text-2xl font-bold text-foreground leading-snug">
                Let's map your highest-ROI automation in a 30-min call
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-dim max-w-xl">
                No high-pressure sales pitch. Just an objective architectural audit of what to automate, how long it will take, and realistic pricing.
              </p>
            </div>

            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 min-h-[48px] text-xs sm:text-sm font-bold text-primary-foreground transition-all duration-200 hover:bg-primary/90 hover:scale-[1.02] shadow-md shadow-primary/20 active:scale-95"
            >
              <span>Book Discovery Call</span>
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Process;
