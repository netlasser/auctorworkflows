import { ArrowRight, Check, Sparkles } from "lucide-react";
import { CAL_LINK } from "@/lib/site";
import Reveal from "./Reveal";

interface Plan {
  name: string;
  badge?: string;
  originalPrice?: string;
  price: string;
  discount?: string;
  suffix?: string;
  note: string;
  systemSummary: {
    label: string;
    items: string[];
    highlight?: boolean;
  };
  features: string[];
  cta: string;
  featured: boolean;
}

const plans: Plan[] = [
  {
    name: "Single Engine Build",
    badge: "Targeted Fix",
    originalPrice: "$1,500",
    price: "$1,050",
    discount: "30% OFF",
    note: "Deploy 1 dedicated automation system into your stack",
    systemSummary: {
      label: "Choose 1 system from above:",
      items: [
        "Lead Capture & Smart Routing",
        "AI Cold Email Outreach Engine",
        "LinkedIn Enrichment & Warm Outreach",
      ],
      highlight: false,
    },
    features: [
      "Custom n8n workflow architecture built & deployed",
      "Direct integration with your existing CRM & Slack",
      "Custom GPT-4 prompt tuning & intent scoring logic",
      "14 days post-launch hypercare & bug-fixing",
      "Full video walkthrough & technical documentation",
      "45-min live team handover & training call",
    ],
    cta: "Deploy Single Engine",
    featured: false,
  },
  {
    name: "Complete Growth Engine",
    badge: "All 3 Systems • Most Popular",
    originalPrice: "$3,800",
    price: "$1,900",
    discount: "50% OFF • Special",
    note: "The full automated machine that sells while you sleep",
    systemSummary: {
      label: "Includes all 3 systems deployed end-to-end:",
      items: [
        "System 1: Lead Capture & Smart Routing (<5s response)",
        "System 2: AI Cold Email Outreach Engine (~38% reply rate)",
        "System 3: LinkedIn Enrichment & Warm Outreach (Apollo)",
      ],
      highlight: true,
    },
    features: [
      "Master unified pipeline connecting inbound & outbound",
      "End-to-end CRM synchronization (HubSpot, Airtable, Notion)",
      "Deliverability setup: SPF, DKIM, DMARC audit & warming",
      "Multi-variant GPT-4 icebreakers & 3-tier follow-up sequences",
      "30 days priority post-launch tuning & hypercare",
      "Complete SOP playbook, architecture diagrams & team training",
    ],
    cta: "Book Free Assessment",
    featured: true,
  },
  {
    name: "Growth Partner Retainer",
    badge: "Ongoing Scale",
    originalPrice: "$1,500",
    price: "$1,050",
    suffix: "/month",
    discount: "30% OFF",
    note: "Hands-off maintenance, weekly list enrichment & continuous scale",
    systemSummary: {
      label: "Continuous management for your 3 systems:",
      items: [
        "Weekly fresh Apollo.io verified lead scraping",
        "Ongoing GPT-4 prompt tuning & copy A/B tests",
        "Deliverability monitoring & error self-healing",
      ],
      highlight: false,
    },
    features: [
      "Proactive monitoring & maintenance for all 3 engines",
      "Weekly verified prospect list enrichment & data cleaning",
      "Continuous prompt iteration & subject line A/B testing",
      "Inbox reputation & bounce rate protection",
      "2 new custom workflows or integrations added each month",
      "Dedicated private Slack / Telegram channel (<2h response)",
    ],
    cta: "Partner With Me",
    featured: false,
  },
];

const Pricing = () => (
  <section id="pricing" className="px-[22px] py-[clamp(80px,10vw,130px)]">
    <div className="mx-auto w-full max-w-6xl">
      <Reveal className="max-w-2xl">
        <span className="section-label">Pricing</span>
        <h2 className="mt-4 font-display text-3xl md:text-4xl">Realistic, value-driven pricing</h2>
        <p className="mt-4 text-dim">
          Invest in automated systems that generate qualified pipeline 24/7. Transparent deliverables, no surprise invoices.
        </p>
      </Reveal>

      <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-3">
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 90} className="h-full">
            <div
              className={`card-surface relative flex h-full flex-col p-6 sm:p-7 transition-all ${
                p.featured
                  ? "border-primary/70 bg-[hsl(var(--card-hover))] shadow-[0_20px_60px_-25px_rgba(210,155,74,0.45)] lg:-translate-y-2"
                  : "hover:border-[hsl(var(--border-hover))]"
              }`}
            >
              {p.badge && (
                <div className="mb-4">
                  <span
                    className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold tracking-wide ${
                      p.featured
                        ? "bg-primary text-primary-foreground shadow-sm"
                        : "border border-border bg-background/60 text-dim"
                    }`}
                  >
                    {p.featured && <Sparkles className="h-3 w-3" />}
                    {p.badge}
                  </span>
                </div>
              )}

              <h3 className="font-display text-xl">{p.name}</h3>
              <p className="mt-1.5 text-xs text-muted-ink leading-relaxed">{p.note}</p>

              <div className="mt-5">
                {p.originalPrice && (
                  <div className="mb-1 flex items-center gap-2">
                    <span className="text-sm font-medium text-muted-ink line-through decoration-muted-ink/60">
                      {p.originalPrice}{p.suffix}
                    </span>
                    {p.discount && (
                      <span
                        className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider ${
                          p.featured
                            ? "border border-primary/40 bg-primary/20 text-primary"
                            : "border border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
                        }`}
                      >
                        {p.discount}
                      </span>
                    )}
                  </div>
                )}
                <div className="flex items-baseline gap-1 font-logo text-4xl font-bold text-foreground">
                  <span>{p.price}</span>
                  {p.suffix && <span className="text-sm font-medium text-muted-ink">{p.suffix}</span>}
                </div>
              </div>

              {/* System link box following "Systems that sell while you sleep" */}
              <div
                className={`mt-5 rounded-xl border p-3.5 text-xs ${
                  p.systemSummary.highlight
                    ? "border-primary/35 bg-primary/[0.08]"
                    : "border-border/80 bg-background/50"
                }`}
              >
                <span className={`font-semibold ${p.systemSummary.highlight ? "text-primary" : "text-foreground"}`}>
                  {p.systemSummary.label}
                </span>
                <ul className="mt-2 space-y-1.5">
                  {p.systemSummary.items.map((item) => (
                    <li key={item} className="flex items-start gap-1.5 text-dim">
                      <span
                        className={`mt-1 h-1.5 w-1.5 shrink-0 rounded-full ${
                          p.systemSummary.highlight ? "bg-primary" : "bg-muted-ink"
                        }`}
                      />
                      <span className="leading-snug">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="my-6 h-px bg-border" />

              <div className="flex-1">
                <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-ink">
                  Deliverables & Specs
                </span>
                <ul className="mt-3 space-y-2.5">
                  {p.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-xs leading-relaxed text-dim">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <a
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-8 flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-center text-sm font-semibold transition-all ${
                  p.featured
                    ? "btn-primary-glow"
                    : "border border-border text-dim hover:border-[hsl(var(--border-hover))] hover:text-foreground hover:bg-[hsl(var(--card-hover))]"
                }`}
              >
                <span>{p.cta}</span>
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;
