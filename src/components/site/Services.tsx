import { ArrowRight, Filter, Linkedin, Mail } from "lucide-react";
import Reveal from "./Reveal";

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
    desc: "Stop sending generic blasts. My system researches each prospect, writes personalized icebreakers with GPT-4, A/B tests subject lines, and sends smart follow-ups based on engagement.",
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

const Services = () => (
  <section id="services" className="px-[22px] py-[clamp(80px,10vw,130px)]">
    <div className="mx-auto w-full max-w-6xl">
      <Reveal className="max-w-2xl">
        <span className="section-label">What I Build</span>
        <h2 className="mt-4 font-display text-3xl md:text-4xl">Systems that sell while you sleep</h2>
        <p className="mt-4 text-dim">
          Three automation engines that handle the repetitive work between a stranger and a booked call.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 lg:grid-cols-3">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 90}>
            <article
              className="card-surface h-full p-6"
              onMouseMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect();
                e.currentTarget.style.setProperty("--mouse-x", `${e.clientX - r.left}px`);
                e.currentTarget.style.setProperty("--mouse-y", `${e.clientY - r.top}px`);
              }}
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-[hsl(var(--card-hover))] text-primary">
                <s.icon className="h-5 w-5" />
              </div>
              <h3 className="mt-5 font-display text-xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-dim">{s.desc}</p>

              <div className="mt-6 rounded-xl border border-border bg-background/40 p-4">
                {s.rows.map(([before, after], idx) => (
                  <div key={before}>
                    {idx > 0 && <div className="my-3 h-px bg-border" />}
                    <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
                      <p className="text-xs text-muted-ink">{before}</p>
                      <ArrowRight className="h-3.5 w-3.5 shrink-0 text-primary" />
                      <p className="text-xs text-[hsl(var(--success))]">{after}</p>
                    </div>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
