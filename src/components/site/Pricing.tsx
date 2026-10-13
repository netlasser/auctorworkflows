import { useState } from "react";
import { ArrowRight, Check, Sparkles, Layers, ShieldCheck, MapPin, CreditCard, Clock } from "lucide-react";
import { CAL_LINK } from "@/lib/site";
import Reveal from "./Reveal";

interface OfferingPlan {
  name: string;
  badge?: string;
  oneTimePrice: string;
  oneTimeNumeric: number;
  monthlyPrice: string;
  monthlyNumeric: number;
  oneTimeSavings?: string;
  monthlySavings?: string;
  systemRef: string;
  note: string;
  timeline: string;
  features: string[];
  retainerPerks: string[];
  cta: string;
  featured: boolean;
}

const offerings: OfferingPlan[] = [
  {
    name: "Lead Capture & CRM Pipeline",
    badge: "System 1",
    oneTimePrice: "$250",
    oneTimeNumeric: 250,
    monthlyPrice: "$120",
    monthlyNumeric: 120,
    systemRef: "Matches System 1: Lead Capture & Smart Routing",
    note: "Capture, qualify, and route inbound prospects to your team in <5s",
    timeline: "3–5 days delivery",
    features: [
      "Multi-source lead capture (forms, landing pages, webhook ads)",
      "Instant Slack / Telegram alert & rep routing in <5s",
      "Automated lead deduplication & CRM sync (HubSpot, Airtable, Sheets)",
      "AI intent classification & priority lead qualification",
      "14 days post-launch hypercare & video documentation",
    ],
    retainerPerks: [
      "Continuous CRM field mapping & error monitoring",
      "New form/source integration as you launch new campaigns",
      "Routing rule adjustments & webhook health checks",
    ],
    cta: "Deploy Lead Capture",
    featured: false,
  },
  {
    name: "Cold Email Outreach Engine",
    badge: "System 2",
    oneTimePrice: "$450",
    oneTimeNumeric: 450,
    monthlyPrice: "$190",
    monthlyNumeric: 190,
    systemRef: "Matches System 2: AI Cold Email Outreach Engine",
    note: "Automated AI personalization with healthy deliverability & primary inbox placement",
    timeline: "5–7 days delivery",
    features: [
      "Custom n8n cold email outreach workflow architecture",
      "Deliverability setup: SPF, DKIM, DMARC audit & inbox warming guidance",
      "AI prospect research & personalized icebreaker generation",
      "Multi-tier conditional follow-up sequences based on reply status",
      "Automated reply sentiment classification & warm lead alert",
    ],
    retainerPerks: [
      "Weekly prospect list cleaning & verified lead enrichment",
      "Continuous AI copy, angle & subject line refinement",
      "Inbox deliverability & bounce rate monitoring",
    ],
    cta: "Deploy Email Engine",
    featured: false,
  },
  {
    name: "LinkedIn Enrichment System",
    badge: "System 3",
    oneTimePrice: "$350",
    oneTimeNumeric: 350,
    monthlyPrice: "$150",
    monthlyNumeric: 150,
    systemRef: "Matches System 3: LinkedIn Enrichment & Warm Outreach",
    note: "Extract verified work emails and generate tailored connection notes for target accounts",
    timeline: "4–6 days delivery",
    features: [
      "Apollo.io & Sales Navigator prospect scraper integration",
      "Automated enrichment: verified work email, title, company tech stack",
      "2 AI-personalized connection note variants generated per prospect",
      "Bi-directional sync with your CRM (HubSpot, Notion, Airtable)",
      "Scheduled batch processing & clean CSV export automation",
    ],
    retainerPerks: [
      "Weekly fresh prospect scraping & credit management",
      "Connection note prompt tuning for higher acceptance",
      "Scraper maintenance & API updates",
    ],
    cta: "Deploy LinkedIn Engine",
    featured: false,
  },
  {
    name: "Full Stack (All 3 Systems)",
    badge: "Best Value • Complete Machine",
    oneTimePrice: "$790",
    oneTimeNumeric: 790,
    monthlyPrice: "$290",
    monthlyNumeric: 290,
    oneTimeSavings: "Save $260 vs $1,050 a la carte",
    monthlySavings: "Save $170/mo vs $460/mo a la carte",
    systemRef: "Complete end-to-end automated growth machine",
    note: "Inbound capture + AI cold email + LinkedIn enrichment unified in a single architecture",
    timeline: "10–14 days delivery",
    features: [
      "All 3 systems built & deployed in a unified master n8n architecture",
      "Inbound lead capture + Outbound AI email + LinkedIn enrichment",
      "Unified CRM sync (HubSpot, Airtable, Notion) & Slack/Telegram alerts",
      "Complete deliverability audit, DNS configuration & domain warmup",
      "30 days priority post-launch tuning & hypercare",
      "Full 1-on-1 team training call, SOP playbook & architecture map",
    ],
    retainerPerks: [
      "Full hands-off management & health monitoring of all 3 engines",
      "Weekly verified lead generation & list enrichment",
      "Continuous prompt iteration & deliverability protection",
      "1 new custom workflow automation or report added each month",
      "Direct private Slack/Telegram channel (<4h priority response)",
    ],
    cta: "Book Strategy Call",
    featured: true,
  },
];

const Pricing = () => {
  const [billingMode, setBillingMode] = useState<"one-time" | "retainer">("one-time");

  return (
    <section id="pricing" className="px-[18px] py-[clamp(60px,8vw,120px)] sm:px-[22px]">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <span className="section-label">Pricing</span>
            <h2 className="mt-4 font-display text-2xl sm:text-3xl md:text-4xl leading-tight">
              Honest, accessible pricing
            </h2>
            <p className="mt-3 text-xs sm:text-sm text-dim leading-relaxed">
              Transparent rates designed for growing businesses, startups, and agencies. Available as a one-time build or ongoing monthly retainer.
            </p>
          </Reveal>

          {/* Billing Switcher Toggle - Mobile Full Width */}
          <Reveal delay={100} className="w-full sm:w-auto">
            <div className="grid grid-cols-2 sm:inline-flex items-center rounded-xl sm:rounded-full border border-border bg-[hsl(var(--card))] p-1 shadow-sm w-full sm:w-auto">
              <button
                type="button"
                onClick={() => setBillingMode("one-time")}
                className={`min-h-[40px] rounded-full px-4 py-2 text-xs font-semibold text-center transition-all ${
                  billingMode === "one-time"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-dim hover:text-foreground"
                }`}
              >
                One-Time Build
              </button>
              <button
                type="button"
                onClick={() => setBillingMode("retainer")}
                className={`min-h-[40px] rounded-full px-4 py-2 text-xs font-semibold text-center transition-all ${
                  billingMode === "retainer"
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "text-dim hover:text-foreground"
                }`}
              >
                Monthly Retainer
              </button>
            </div>
          </Reveal>
        </div>

        {/* Mindful Trust & Regional Context Banner */}
        <Reveal delay={60} className="mt-6 sm:mt-8">
          <div className="grid gap-3 rounded-2xl border border-border/80 bg-background/50 p-4 sm:grid-cols-3 text-xs text-dim">
            <div className="flex items-start gap-2.5">
              <ShieldCheck className="h-4 w-4 shrink-0 text-primary mt-0.5" />
              <div>
                <strong className="text-foreground font-semibold block">Milestone Protection</strong>
                <span>50% kickoff, 50% only after live testing and your full sign-off.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <MapPin className="h-4 w-4 shrink-0 text-primary mt-0.5" />
              <div>
                <strong className="text-foreground font-semibold block">Local & Global Support</strong>
                <span>Based in Addis Ababa, Ethiopia. Supporting local firms & global founders.</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <CreditCard className="h-4 w-4 shrink-0 text-primary mt-0.5" />
              <div>
                <strong className="text-foreground font-semibold block">Flexible Payments</strong>
                <span>International wire/card or local Ethiopian bank transfer / Telebirr.</span>
              </div>
            </div>
          </div>
        </Reveal>

        {/* 4 Cards Grid */}
        <div className="mt-8 sm:mt-10 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {offerings.map((p, i) => {
            const isOneTime = billingMode === "one-time";
            const currentPrice = isOneTime ? p.oneTimePrice : p.monthlyPrice;
            const currentSuffix = isOneTime ? "" : "/month";
            const alternateLabel = isOneTime
              ? `Retainer: ${p.monthlyPrice}/month`
              : `One-Time: ${p.oneTimePrice}`;
            const savings = isOneTime ? p.oneTimeSavings : p.monthlySavings;

            return (
              <Reveal key={p.name} delay={i * 80} className="h-full">
                <div
                  className={`card-surface relative flex h-full flex-col p-5 sm:p-6 transition-all ${
                    p.featured
                      ? "border-primary/80 bg-[hsl(var(--card-hover))] shadow-[0_20px_60px_-25px_rgba(224,224,224,0.25)] lg:-translate-y-2"
                      : "hover:border-[hsl(var(--border-hover))]"
                  }`}
                >
                  {p.badge && (
                    <div className="mb-3.5">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[10px] sm:text-[11px] font-semibold tracking-wide ${
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

                  <h3 className="font-display text-base sm:text-lg font-bold leading-tight">{p.name}</h3>
                  <p className="mt-2 text-xs text-muted-ink leading-relaxed min-h-[34px]">{p.note}</p>

                  <div className="mt-4 sm:mt-5 border-t border-border pt-4">
                    {savings && (
                      <div className="mb-1.5">
                        <span className="rounded-md border border-primary/40 bg-primary/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                          {savings}
                        </span>
                      </div>
                    )}
                    <div className="flex items-baseline gap-1 font-logo text-2xl sm:text-3xl font-bold text-foreground">
                      <span>{currentPrice}</span>
                      {currentSuffix && (
                        <span className="text-xs font-medium text-muted-ink">{currentSuffix}</span>
                      )}
                    </div>
                    <div className="mt-1 flex items-center justify-between text-[11px]">
                      <span className="font-medium text-muted-ink">{alternateLabel}</span>
                      {isOneTime && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-primary">
                          <Clock className="h-3 w-3" /> {p.timeline}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="my-4 sm:my-5 h-px bg-border" />

                  {/* Included Deliverables */}
                  <div className="flex-1">
                    <span className="text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-muted-ink">
                      {isOneTime ? "What's Included" : "Retainer Services"}
                    </span>
                    <ul className="mt-3 space-y-2.5">
                      {(isOneTime ? p.features : p.retainerPerks).map((feat) => (
                        <li key={feat} className="flex items-start gap-2 text-xs text-dim leading-snug">
                          <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-primary" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <a
                    href={CAL_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-6 sm:mt-7 flex min-h-[44px] items-center justify-center gap-2 rounded-full px-4 py-2.5 text-center text-xs font-semibold transition-all ${
                      p.featured
                        ? "btn-primary-glow"
                        : "border border-border text-dim hover:border-[hsl(var(--border-hover))] hover:text-foreground hover:bg-[hsl(var(--card-hover))]"
                    }`}
                  >
                    <span>{p.cta}</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </a>
                </div>
              </Reveal>
            );
          })}
        </div>

        {/* Clean Overview Table & Mobile Cards */}
        <Reveal delay={200} className="mt-10 sm:mt-14">
          <div className="card-surface overflow-hidden p-4 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4 border-b border-border pb-4 sm:pb-5">
              <div>
                <h3 className="font-display text-base sm:text-lg font-bold">Pricing Comparison Matrix</h3>
                <p className="text-xs text-dim mt-0.5 sm:mt-1">
                  Direct breakdown of One-Time Builds versus Ongoing Monthly Retainers.
                </p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-ink">
                <Layers className="h-4 w-4 text-primary shrink-0" />
                <span>All builds include handover recording & workflow export file</span>
              </div>
            </div>

            {/* Mobile Stacked Card View for small screens (under sm) */}
            <div className="mt-4 space-y-3 sm:hidden">
              {offerings.map((item) => (
                <div
                  key={item.name}
                  className={`rounded-2xl border p-4 transition-all ${
                    item.featured
                      ? "border-primary/60 bg-primary/[0.04]"
                      : "border-border bg-background/50"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="font-display text-sm font-bold text-foreground flex items-center gap-1.5">
                        {item.name}
                        {item.featured && (
                          <span className="rounded bg-primary/20 px-1.5 py-0.5 text-[9px] font-semibold text-primary">
                            Best Value
                          </span>
                        )}
                      </h4>
                      <p className="text-[11px] text-muted-ink mt-0.5">{item.note}</p>
                    </div>
                  </div>

                  <div className="mt-3 grid grid-cols-2 gap-2 rounded-xl bg-background/80 p-2.5 border border-border/60 text-xs">
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-muted-ink block">One-Time Build</span>
                      <span className="font-logo font-bold text-sm text-foreground">{item.oneTimePrice}</span>
                      {item.oneTimeSavings && (
                        <span className="block text-[9px] text-primary font-medium">{item.oneTimeSavings}</span>
                      )}
                    </div>
                    <div>
                      <span className="text-[10px] uppercase font-semibold text-muted-ink block">Monthly Retainer</span>
                      <span className="font-logo font-bold text-sm text-foreground">{item.monthlyPrice}</span>
                      <span className="text-[10px] text-muted-ink">/mo</span>
                      {item.monthlySavings && (
                        <span className="block text-[9px] text-primary font-medium">{item.monthlySavings}</span>
                      )}
                    </div>
                  </div>

                  <div className="mt-2.5 text-[11px] text-dim flex items-center justify-between">
                    <span><strong className="text-foreground">Scope:</strong> {item.systemRef}</span>
                  </div>

                  <a
                    href={CAL_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-3 flex min-h-[40px] w-full items-center justify-center gap-1.5 rounded-full px-3 py-2 text-xs font-semibold ${
                      item.featured
                        ? "btn-primary-glow"
                        : "border border-border bg-background/80 text-foreground hover:bg-[hsl(var(--card-hover))]"
                    }`}
                  >
                    <span>Book Strategy Call</span>
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              ))}
            </div>

            {/* Desktop Table View */}
            <div className="hidden sm:block mt-5 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-muted-ink uppercase tracking-wider">
                    <th className="py-3 px-4 font-semibold">Offering</th>
                    <th className="py-3 px-4 font-semibold">One-Time Build</th>
                    <th className="py-3 px-4 font-semibold">Monthly Retainer</th>
                    <th className="py-3 px-4 font-semibold">Turnaround & Scope</th>
                    <th className="py-3 px-4 font-semibold text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {offerings.map((item) => (
                    <tr
                      key={item.name}
                      className={`transition-colors hover:bg-background/40 ${
                        item.featured ? "bg-primary/[0.04]" : ""
                      }`}
                    >
                      <td className="py-4 px-4 font-medium text-foreground">
                        <div className="flex items-center gap-2">
                          <span>{item.name}</span>
                          {item.featured && (
                            <span className="rounded bg-primary/20 px-1.5 py-0.5 text-[10px] font-semibold text-primary">
                              Best Value
                            </span>
                          )}
                        </div>
                        <span className="text-[11px] text-muted-ink block mt-0.5">{item.note}</span>
                      </td>
                      <td className="py-4 px-4 font-logo text-sm font-bold text-foreground">
                        {item.oneTimePrice}
                        {item.oneTimeSavings && (
                          <span className="block text-[10px] font-normal text-primary">
                            {item.oneTimeSavings}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 font-logo text-sm font-bold text-foreground">
                        {item.monthlyPrice}
                        <span className="text-[11px] font-normal text-muted-ink">/month</span>
                        {item.monthlySavings && (
                          <span className="block text-[10px] font-normal text-primary">
                            {item.monthlySavings}
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-dim max-w-xs leading-relaxed">
                        <span className="font-medium text-foreground block">{item.timeline}</span>
                        <span className="text-muted-ink text-[11px]">{item.systemRef}</span>
                      </td>
                      <td className="py-4 px-4 text-right">
                        <a
                          href={CAL_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex min-h-[36px] items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold transition-all ${
                            item.featured
                              ? "bg-primary text-primary-foreground hover:bg-primary/90"
                              : "border border-border text-dim hover:text-foreground hover:border-[hsl(var(--border-hover))]"
                          }`}
                        >
                          Book Call
                          <ArrowRight className="h-3 w-3" />
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Pricing;
