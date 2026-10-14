import { useEffect, useRef, type ReactNode } from "react";
import Reveal from "./Reveal";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

interface Phase {
  no: string;
  name: string;
  desc: string;
  stages: { no: string; title: string; duration: string }[];
}

const phases: Phase[] = [
  {
    no: "01",
    name: "Discover",
    desc: "We audit your stack, map every manual touchpoint, and lock a fixed-scope blueprint before a single line of code is written.",
    stages: [
      { no: "01", title: "Process Audit & System Mapping", duration: "Day 1" },
      { no: "02", title: "Fixed Scope & Milestone Roadmap", duration: "Day 2" },
    ],
  },
  {
    no: "02",
    name: "Build",
    desc: "We engineer the pipeline inside n8n with structured AI prompts, then stress-test it against bad data, crashes, and rate-limit spikes.",
    stages: [
      { no: "03", title: "n8n Workflow Build & AI Prompting", duration: "Days 3–6" },
      { no: "04", title: "Edge-Case Testing & Failover Mesh", duration: "Days 7–8" },
    ],
  },
  {
    no: "03",
    name: "Ship",
    desc: "We cut over to your live infrastructure with full documentation and raw JSON exports, then monitor and fine-tune under a 14–30 day warranty.",
    stages: [
      { no: "05", title: "Live Production Cutover & Team Handoff", duration: "Days 9–10" },
      { no: "06", title: "Active Monitoring & Optimization", duration: "14–30 days" },
    ],
  },
];

const RotatingMotif = () => (
  <div className="absolute inset-0 flex items-center justify-center">
    <div className="spin-slow absolute h-52 w-52">
      <svg viewBox="0 0 200 200" className="h-full w-full text-primary">
        <circle cx="100" cy="100" r="88" fill="none" stroke="currentColor" strokeOpacity="0.25" />
        <circle cx="100" cy="100" r="60" fill="none" stroke="currentColor" strokeOpacity="0.4" />
        <polygon
          points="100,20 170,150 30,150"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.5"
        />
        <circle cx="100" cy="100" r="5" fill="currentColor" />
      </svg>
    </div>
    <div className="spin-slow-rev absolute h-72 w-72">
      <svg viewBox="0 0 200 200" className="h-full w-full text-primary">
        <rect
          x="55"
          y="55"
          width="90"
          height="90"
          fill="none"
          stroke="currentColor"
          strokeOpacity="0.3"
          strokeDasharray="6 8"
        />
        <circle cx="100" cy="18" r="4" fill="currentColor" fillOpacity="0.6" />
      </svg>
    </div>
  </div>
);

const ScanningLaser = () => (
  <div className="absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 dot-grid opacity-60" />
    <div className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-primary/[0.06] to-transparent" />
    <div className="scan-line absolute inset-x-6 top-6 h-px bg-gradient-to-r from-transparent via-primary to-transparent shadow-[0_0_18px_2px_rgba(224,224,224,0.35)]" />
    <div className="absolute bottom-4 left-4 font-data text-[10px] uppercase tracking-[0.24em] text-muted-ink">
      scanning payloads…
    </div>
  </div>
);

const EkgWaveform = () => (
  <div className="absolute inset-0 flex items-center justify-center px-6">
    <svg viewBox="0 0 400 100" className="h-24 w-full text-primary">
      <path
        d="M0 50 H110 l8 -26 l8 52 l8 -34 l6 18 l5 -10 H210 l8 -30 l8 60 l8 -40 l6 20 l5 -10 H400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        className="ekg-path"
      />
    </svg>
    <div className="absolute bottom-4 left-4 font-data text-[10px] uppercase tracking-[0.24em] text-muted-ink">
      uptime · monitoring
    </div>
  </div>
);

const animations: ReactNode[] = [<RotatingMotif />, <ScanningLaser />, <EkgWaveform />];

const Protocol = () => {
  const stack = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();

      // Desktop: sticky stacking effect + scroll-scrubbed recede.
      mm.add("(min-width: 768px)", () => {
        const wraps = gsap.utils.toArray<HTMLElement>("[data-wrap]");
        wraps.forEach((wrap, i) => {
          if (i === wraps.length - 1) return;
          const inner = wrap.querySelector(".protocol-inner");
          if (!inner) return;
          gsap.to(inner, {
            scale: 0.9,
            opacity: 0.5,
            filter: "blur(20px)",
            ease: "none",
            scrollTrigger: {
              trigger: wraps[i + 1],
              start: "top bottom",
              end: "top top",
              scrub: true,
            },
          });
        });
      });

      // Mobile: phases stack in normal flow, so reveal each one as it enters.
      mm.add("(max-width: 767px)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".protocol-inner");
        cards.forEach((card) => {
          gsap.from(card, {
            y: 46,
            opacity: 0,
            duration: 0.7,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          });
          const items = card.querySelectorAll("[data-stage]");
          if (items.length) {
            gsap.from(items, {
              y: 14,
              opacity: 0,
              duration: 0.45,
              stagger: 0.09,
              ease: "power2.out",
              scrollTrigger: { trigger: card, start: "top 78%" },
            });
          }
        });
      });
    }, stack);
    return () => ctx.revert();
  }, []);

  return (
    <section id="process" className="relative py-[clamp(80px,10vw,130px)]">
      <div className="mx-auto w-full max-w-6xl px-[22px]">
        <Reveal className="max-w-2xl">
          <span className="section-label">How We Work</span>
          <h2 className="mt-4 font-heading text-3xl md:text-5xl">
            From discovery to live production automation
          </h2>
          <p className="mt-4 text-dim">
            A disciplined, 6-stage engineering process designed to eliminate guesswork, protect
            your time, and deliver reliable, high-converting workflows.
          </p>
        </Reveal>
      </div>

      <div ref={stack} className="relative mt-12 space-y-5 px-[22px] md:mt-16 md:space-y-0 md:px-0">
        {phases.map((p, i) => (
          <div
            key={p.name}
            data-wrap
            className="md:sticky md:top-0 md:flex md:h-[100dvh] md:items-center md:justify-center md:px-[22px] md:py-14"
          >
            <article className="protocol-inner card-surface relative grid w-full max-w-5xl gap-6 overflow-hidden p-5 sm:p-6 lg:p-8 md:grid-cols-2 md:gap-8 md:p-12">
              <div className="flex flex-col justify-between">
                <div>
                  <span className="font-data text-[11px] uppercase tracking-[0.28em] text-muted-ink">
                    Phase {p.no} / 03
                  </span>
                  <h3 className="font-drama mt-4 text-3xl font-normal sm:text-4xl md:text-5xl">{p.name}</h3>
                  <p className="mt-4 max-w-md text-sm sm:text-base leading-relaxed text-dim">{p.desc}</p>
                </div>

                <ul className="mt-8 space-y-3 border-t border-border pt-5">
                  {p.stages.map((s) => (
                    <li key={s.no} data-stage className="flex items-center justify-between gap-4">
                      <span className="flex items-center gap-3">
                        <span className="font-data text-xs sm:text-sm text-primary">{s.no}</span>
                        <span className="text-sm sm:text-base text-foreground">{s.title}</span>
                      </span>
                      <span className="shrink-0 font-data text-[10px] sm:text-xs uppercase tracking-wider text-muted-ink">
                        {s.duration}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="relative h-44 overflow-hidden rounded-[1.75rem] border border-border bg-background/50 sm:h-56 md:h-full md:min-h-[320px]">
                {animations[i]}
              </div>
            </article>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Protocol;
