import { useState } from "react";
import { ArrowRight, Check, Sparkles, Layers } from "lucide-react";
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
  features: string[];
  retainerPerks: string[];
  cta: string;
  featured: boolean;
}

const offerings: OfferingPlan[] = [
  {
    name: "Lead Capture & CRM Pipeline",
    badge: "System 1",
    oneTimePrice: "$750",
    oneTimeNumeric: 750,
    monthlyPrice: "$350",
    monthlyNumeric: 350,
    systemRef: "Matches System 1: Lead Capture & Smart Routing",
    note: "Capture, qualify and route incoming leads in <5 seconds",
    features: [
      "Multi-source lead capture (forms, landing pages, ads)",
      "Instant Slack notification & team routing in <5s",
      "Automated lead deduplication & CRM entry (HubSpot/Airtable)",
      "GPT-4 intent scoring & priority lead qualification",
      "14 days post-launch hypercare & video documentation",
    ],
    retainerPerks: [
      "Continuous CRM field mapping & error monitoring",
      "New form/source integration as you launch campaigns",
      "Ongoing routing rule optimization",
    ],
    cta: "Deploy Lead Capture",
    featured: false,
  },
  {
    name: "Cold Email Outreach Engine",
    badge: "System 2",
    oneTimePrice: "$1,500",
    oneTimeNumeric: 1500,
    monthlyPrice: "$500",
    monthlyNumeric: 500,
    systemRef: "Matches System 2: AI Cold Email Outreach Engine",
    note: "Automated AI personalization with ~38% average reply rates",
    features: [
      "Custom n8n cold email outreach workflow architecture",
      "Deliverability setup: SPF, DKIM, DMARC audit & inbox warming",
      "GPT-4 prospect research & personalized icebreakers",
      "3-tier conditional follow-up sequences based on open/click",
      "Automated reply sentiment classification & booking alert",
    ],
    retainerPerks: [
      "Weekly list cleaning & verified lead enrichment",
      "Continuous GPT-4 copy & subject line A/B testing",
      "Inbox health & domain reputation monitoring",
    ],
    cta: "Deploy Email Engine",
    featured: false,
  },
  {
    name: "LinkedIn Enrichment System",
    badge: "System 3",
    oneTimePrice: "$1,000",
    oneTimeNumeric: 1000,
    monthlyPrice: "$400",
    monthlyNumeric: 400,
    systemRef: "Matches System 3: LinkedIn Enrichment & Warm Outreach",
    note: "Turn LinkedIn profiles into verified contact data & tailored notes",
    features: [
      "Apollo.io & Sales Navigator prospect scraper integration",
      "Automated enrichment: work email, phone, company tech stack",
      "2 AI-personalized connection note variants generated per lead",
      "Bi-directional sync with your CRM (HubSpot, Notion, Sheets)",
      "Scheduled batch processing & export automation",
    ],
    retainerPerks: [
      "Weekly fresh prospect scraping & credit management",
      "Ongoing connection note prompt refinement",
      "Scraper maintenance & API updates",
    ],
    cta: "Deploy LinkedIn Engine",
    featured: false,
  },
  {
    name: "Full Stack (All 3)",
    badge: "Best Value • All 3 Systems",
    oneTimePrice: "$2,500",
    oneTimeNumeric: 2500,
    monthlyPrice: "$800",
    monthlyNumeric: 800,
    oneTimeSavings: "Save $750 vs $3,250 a la carte",
    monthlySavings: "Save $450/mo vs $1,250/mo a la carte",
    systemRef: "Complete end-to-end automated growth machine",
    note: "The complete automated machine that sells while you sleep",
    features: [
      "All 3 systems built & deployed in a unified master architecture",
      "Inbound lead capture + Outbound AI email + LinkedIn enrichment",
      "Unified CRM sync (HubSpot, Airtable, Notion) & Slack bot alerts",
      "Complete deliverability audit, DNS configuration & domain warmup",
      "30 days priority post-launch tuning & hypercare",
      "Full team training call, technical SOP playbook & architecture map",
    ],
    retainerPerks: [
      "Full hands-off management of all 3 engines",
      "Weekly verified lead generation & data enrichment",
      "Continuous prompt iteration & deliverability protection",
      "2 new custom workflow automations added each month",
      "Dedicated private Slack channel (<2h priority response)",
    ],
    cta: "Book Free Assessment",
    featured: true,
  },
];

const Pricing = () => {
  const [billingMode, setBillingMode] = useState<"one-time" | "retainer">("one-time");

  return (
    <section id="pricing" className="px-[22px] py-[clamp(80px,10vw,130px)]">
      <div className="mx-auto w-full max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <Reveal className="max-w-2xl">
            <span className="section-label">Pricing</span>
            <h2 className="mt-4 font-display text-3xl md:text-4xl">Simple, transparent pricing</h2>
            <p className="mt-4 text-dim">
              Choose an individual engine build or deploy the full stack. Available as a one-time build or ongoing monthly retainer.
            </p>
          </Reveal>

          {/* Billing Switcher Toggle */}
          <Reveal delay={100}>
            <div className="inline-flex items-center rounded-full border border-border bg-[hsl(var(--card))] p-1 shadow-sm">
              <button
                type="button"
                onClick={() => setBillingMode("one-time")}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
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
                className={`rounded-full px-4 py-2 text-xs font-semibold transition-all ${
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

        {/* 4 Cards Grid */}
        <div className="mt-12 grid items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
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
                  className={`card-surface relative flex h-full flex-col p-6 transition-all ${
                    p.featured
                      ? "border-primary/80 bg-[hsl(var(--card-hover))] shadow-[0_20px_60px_-25px_rgba(210,155,74,0.45)] lg:-translate-y-2"
                      : "hover:border-[hsl(var(--border-hover))]"
                  }`}
                >
                  {p.badge && (
                    <div className="mb-4">
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide ${
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

                  <h3 className="font-display text-lg font-bold leading-tight">{p.name}</h3>
                  <p className="mt-2 text-xs text-muted-ink leading-relaxed min-h-[34px]">{p.note}</p>

                  <div className="mt-5 border-t border-border pt-4">
                    {savings && (
                      <div className="mb-1.5">
                        <span className="rounded-md border border-primary/40 bg-primary/20 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                          {savings}
                        </span>
                      </div>
                    )}
                    <div className="flex items-baseline gap-1 font-logo text-3xl font-bold text-foreground">
                      <span>{currentPrice}</span>
                      {currentSuffix && (
                        <span className="text-xs font-medium text-muted-ink">{currentSuffix}</span>
                      )}
                    </div>
                    <p className="mt-1 text-[11px] font-medium text-muted-ink">
                      {alternateLabel}
                    </p>
                  </div>

                  <div className="my-5 h-px bg-border" />

                  {/* Included Deliverables */}
                  <div className="flex-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-muted-ink">
                      {isOneTime ? "What's Included" : "Retainer Services"}
                    </span>
                    <ul className="mt-3 space-y-2.5">
                      {(isOneTime ? p.features : [...p.features.slice(0, 3), ...p.retainerPerks]).map((f) => (
                        <li key={f} className="flex items-start gap-2 text-xs leading-relaxed text-dim">
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
                    className={`mt-7 flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-center text-xs font-semibold transition-all ${
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

        {/* Clean Overview Table */}
        <Reveal delay={250} className="mt-14">
          <div className="card-surface overflow-hidden p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-border pb-5">
              <div>
                <h3 className="font-display text-lg font-bold">Pricing Comparison Matrix</h3>
                <p className="text-xs text-dim mt-1">Direct breakdown of One-Time Builds versus Ongoing Monthly Retainers.</p>
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-ink">
                <Layers className="h-4 w-4 text-primary" />
                <span>All builds include full documentation & handover</span>
              </div>
            </div>

            <div className="mt-5 overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-border text-muted-ink uppercase tracking-wider">
                    <th className="py-3 px-4 font-semibold">Offering</th>
                    <th className="py-3 px-4 font-semibold">One-Time Build</th>
                    <th className="py-3 px-4 font-semibold">Monthly Retainer</th>
                    <th className="py-3 px-4 font-semibold">Scope & Delivery</th>
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
                            Save $750
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 font-logo text-sm font-bold text-foreground">
                        {item.monthlyPrice}
                        <span className="text-[11px] font-normal text-muted-ink">/month</span>
                        {item.monthlySavings && (
                          <span className="block text-[10px] font-normal text-primary">
                            Save $450/mo
                          </span>
                        )}
                      </td>
                      <td className="py-4 px-4 text-dim max-w-xs leading-relaxed">
                        {item.systemRef}
                      </td>
                      <td className="py-4 px-4 text-right">
                        <a
                          href={CAL_LINK}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`inline-flex items-center gap-1 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all ${
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

