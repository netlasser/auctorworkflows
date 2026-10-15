import { useEffect, useState } from "react";
import { ArrowRight, Filter, Linkedin, Mail } from "lucide-react";
import Reveal from "./Reveal";
import { useInView } from "@/lib/useInView";

const services = [
  {
    icon: Filter,
    title: "Lead Capture & Smart Routing",
    desc: "Capture leads from any source — web forms, ads, landing pages — automatically score them by intent, and instantly route hot leads to your team. No lead ever goes cold again.",
    rows: [
      ["3 hours/day copying leads into spreadsheets", "Fully automated pipeline, zero manual entry"],
      ["Hot leads sit unnoticed for hours", "Instant Slack alert + CRM entry in <5s"],
    ],
  },
  {
    icon: Mail,
    title: "AI Cold Email Outreach Engine",
    desc: "Stop sending generic blasts. Our system researches each prospect, writes personalized icebreakers with GPT-4, A/B tests subject lines, and sends smart follow-ups based on engagement.",
    rows: [
      ["Generic blasts with ~2% reply rate", "AI-personalized emails, ~38% reply rate"],
      ["No follow-up, leads go cold", "3-tier conditional follow-up sequence"],
    ],
  },
  {
    icon: Linkedin,
    title: "LinkedIn Enrichment & Warm Outreach",
    desc: "Upload a list of LinkedIn profiles. The system bulk-enriches them via Apollo.io (emails, phone, tech stack), scores data quality, and generates AI-personalized connection notes.",
    rows: [
      ["5 minutes of manual research per lead", "100 leads enriched in under 2 minutes"],
      ['Generic "I\'d like to connect" messages', "2 AI-personalized variants per lead"],
    ],
  },
];

/* Card 1 — Diagnostic Shuffler */
const shufflerItems = [
  { label: "New lead captured", value: "inbound form", accent: false },
  { label: "Intent scored", value: "ICP · High", accent: true },
  { label: "Routed to rep", value: "in <5s", accent: false },
];

const DiagnosticShuffler = () => {
  const [step, setStep] = useState(0);
  const { ref, inView } = useInView<HTMLDivElement>();
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setStep((s) => s + 1), 3000);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <div ref={ref} className="relative h-44">
      {shufflerItems.map((item, i) => {
        const pos = (i - step + shufflerItems.length) % shufflerItems.length;
        const style =
          pos === 0
            ? { transform: "translateY(0) scale(1)", opacity: 1, zIndex: 30 }
            : pos === 1
            ? { transform: "translateY(-18px) scale(0.95)", opacity: 0.72, zIndex: 20 }
            : { transform: "translateY(-36px) scale(0.9)", opacity: 0.4, zIndex: 10 };
        return (
          <div
            key={item.label}
            style={{
              ...style,
              transition:
                "transform 0.75s cubic-bezier(0.34,1.56,0.64,1), opacity 0.7s ease",
            }}
            className="absolute inset-x-3 top-10 rounded-2xl border border-border bg-card px-4 py-3.5 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <span className="font-data text-[10px] uppercase tracking-[0.2em] text-muted-ink">
                {item.label}
              </span>
              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  item.accent ? "bg-[hsl(var(--success))]" : "bg-primary"
                }`}
              />
            </div>
            <p className="mt-1.5 font-heading text-lg">{item.value}</p>
          </div>
        );
      })}
    </div>
  );
};

/* Card 2 — Telemetry Typewriter */
const telemetryLines = [
  "lead #4821 captured →",
  "score 0.92 · ICP match",
  "alert → #sales (4.1s)",
  "crm sync: ok ✓",
];

const TelemetryTypewriter = () => {
  const [lineIdx, setLineIdx] = useState(0);
  const [text, setText] = useState("");
  const [buf, setBuf] = useState<string[]>([]);
  const { ref, inView } = useInView<HTMLDivElement>();

  useEffect(() => {
    if (!inView) return;
    const full = telemetryLines[lineIdx];
    let i = 0;
    const t = setInterval(() => {
      i += 1;
      setText(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(t);
        setTimeout(() => {
          setBuf((b) => [...b, full].slice(-3));
          setText("");
          setLineIdx((p) => (p + 1) % telemetryLines.length);
        }, 1500);
      }
    }, 42);
    return () => clearInterval(t);
  }, [lineIdx, inView]);

  return (
    <div ref={ref} className="flex h-44 flex-col justify-end gap-1.5 overflow-hidden px-1 font-data text-xs">
      <div className="mb-2 flex items-center gap-2">
        <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-[hsl(var(--success))]" />
        <span className="text-[10px] uppercase tracking-[0.22em] text-muted-ink">
          Live Feed
        </span>
      </div>
      {buf.map((line, i) => (
        <p key={`${line}-${i}`} className="text-muted-ink/70">
          <span className="text-primary/60">›</span> {line}
        </p>
      ))}
      <p className="text-foreground">
        <span className="text-primary">›</span> {text}
        <span className="caret-blink ml-0.5 inline-block h-[1em] w-[7px] translate-y-[2px] bg-primary align-middle" />
      </p>
    </div>
  );
};

/* Card 3 — Cursor Protocol Scheduler */
const weekdays = ["S", "M", "T", "W", "T", "F", "S"];
const scheduled = [false, true, false, true, false, true, false];

const CursorProtocolScheduler = () => {
  const [active, setActive] = useState(1);
  const { ref, inView } = useInView<HTMLDivElement>();
  useEffect(() => {
    if (!inView) return;
    const t = setInterval(() => setActive((a) => (a + 1) % 7), 1500);
    return () => clearInterval(t);
  }, [inView]);

  return (
    <div ref={ref} className="relative flex h-44 flex-col justify-center">
      <div className="grid grid-cols-7 gap-1.5">
        {weekdays.map((d, i) => {
          const isActive = i === active;
          return (
            <div
              key={`${d}-${i}`}
              className={`flex h-12 items-center justify-center rounded-xl border font-data text-xs transition-all duration-500 ${
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : scheduled[i]
                  ? "border-border bg-card text-primary"
                  : "border-border/60 bg-background/40 text-muted-ink"
              }`}
            >
              {d}
            </div>
          );
        })}
      </div>

      <svg
        viewBox="0 0 24 24"
        className="pointer-events-none absolute top-2 h-5 w-5 text-foreground drop-shadow"
        style={{
          left: `${((active + 0.5) / 7) * 100}%`,
          transform: "translateX(-50%)",
          transition: "left 0.7s cubic-bezier(0.25,0.46,0.45,0.94)",
        }}
        fill="currentColor"
        aria-hidden
      >
        <path d="M5 2l14 8-6 1.5L10 20 5 2z" />
      </svg>

      <div className="mt-4 flex items-center justify-between">
        <span className="font-data text-[10px] uppercase tracking-[0.2em] text-muted-ink">
          Batch · 09:00
        </span>
        <span
          className={`rounded-full px-4 py-1.5 font-data text-[11px] transition-colors duration-500 ${
            scheduled[active]
              ? "bg-primary text-primary-foreground"
              : "border border-border text-dim"
          }`}
        >
          {scheduled[active] ? "Save ✓" : "Save"}
        </span>
      </div>
    </div>
  );
};

const artifacts = [DiagnosticShuffler, TelemetryTypewriter, CursorProtocolScheduler];

const Features = () => (
  <section id="services" className="px-[22px] py-[clamp(80px,10vw,130px)]">
    <div className="mx-auto w-full max-w-6xl">
      <Reveal className="max-w-2xl">
        <span className="section-label">What We Build</span>
        <h2 className="mt-4 font-heading text-3xl md:text-5xl">Systems that sell while you sleep</h2>
        <p className="mt-4 text-dim">
          Three automation engines that handle the repetitive work between a stranger and a booked call.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-6 lg:mt-16 lg:grid-cols-3 lg:gap-8">
        {services.map((s, i) => {
          const Artifact = artifacts[i];
          return (
            <Reveal key={s.title} delay={i * 120} className="h-full">
              <article className="card-surface flex h-full flex-col p-6 sm:p-7 lg:p-8">
                <div className="flex items-center justify-between">
                  <span className="font-data text-[11px] uppercase tracking-[0.24em] text-muted-ink">
                    0{i + 1}
                  </span>
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-border bg-[hsl(var(--card-hover))] text-primary">
                    <s.icon className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-6 overflow-hidden rounded-[1.75rem] border border-border bg-background/50 px-4 py-3 sm:py-2">
                  <Artifact />
                </div>

                <h3 className="mt-6 font-heading text-xl lg:text-2xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-dim lg:text-[0.95rem]">{s.desc}</p>

                <div className="mt-6 flex-1 rounded-2xl border border-border bg-background/40 p-4 sm:p-5">
                  {s.rows.map(([before, after], idx) => (
                    <div key={before}>
                      {idx > 0 && <div className="my-3 h-px bg-border" />}
<div className="grid grid-cols-1 items-center gap-2 sm:grid-cols-[1fr_auto_1fr] sm:gap-3">
                    <p className="text-xs text-muted-ink leading-snug">{before}</p>
                    <ArrowRight className="h-4 w-4 shrink-0 rotate-90 text-primary sm:rotate-0" />
                    <p className="text-xs text-[hsl(var(--success))] leading-snug">{after}</p>
                  </div>
                    </div>
                  ))}
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default Features;
