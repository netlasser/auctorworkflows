import { ShieldCheck, Cpu, Zap, CheckCircle2 } from "lucide-react";
import Reveal from "./Reveal";

interface ClientCompany {
  name: string;
  subname?: string;
  category: string;
  location: string;
  highlight: string;
  logo: React.ReactNode;
}

const clientCompanies: ClientCompany[] = [
  {
    name: "Fivetran",
    category: "Automated Data Integration",
    location: "Oakland, CA / Global",
    highlight: "Pipeline & Data Sync",
    logo: (
      <svg
        viewBox="0 0 48 48"
        className="h-10 w-10 rounded-xl overflow-hidden shadow-sm shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Fivetran Logo"
      >
        <rect width="48" height="48" rx="10" fill="#0A38B8" />
        {/* Fivetran top horizontal bar */}
        <rect x="13" y="10" width="22" height="7" rx="1.5" fill="#FFFFFF" />
        {/* Fivetran lower curved 5-arch */}
        <path
          d="M13 20H23C29.6274 20 35 25.3726 35 32V38H27V32C27 29.7909 25.2091 28 23 28H13V20Z"
          fill="#FFFFFF"
        />
      </svg>
    ),
  },
  {
    name: "Firmao",
    subname: "firmao.io",
    category: "Cloud CRM & ERP Platform",
    location: "Łódź, Poland / Global",
    highlight: "CRM & Invoicing Webhooks",
    logo: (
      <svg
        viewBox="0 0 48 48"
        className="h-10 w-10 rounded-xl overflow-hidden shadow-sm shrink-0 bg-white"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Firmao Logo"
      >
        <rect width="48" height="48" rx="10" fill="#FFFFFF" />
        {/* Firmao cobalt blue circle */}
        <circle cx="24" cy="24" r="14.5" stroke="#1E53E5" strokeWidth="6.5" />
      </svg>
    ),
  },
  {
    name: "Ryan Companies",
    subname: "RYAN",
    category: "Commercial Real Estate",
    location: "Minneapolis, MN / US",
    highlight: "Enterprise Ops & Workflows",
    logo: (
      <svg
        viewBox="0 0 48 48"
        className="h-10 w-10 rounded-xl overflow-hidden shadow-sm shrink-0"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Ryan Companies Logo"
      >
        <rect width="48" height="48" rx="10" fill="#255E38" />
        {/* RYAN wordmark */}
        <text
          x="24"
          y="26"
          textAnchor="middle"
          fill="#FFFFFF"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="11"
          letterSpacing="0.8"
        >
          RYAN
        </text>
        {/* Shamrock icon inside 'R' bowl */}
        <circle cx="14" cy="20" r="1.3" fill="#82B961" />
        <circle cx="16" cy="18.8" r="1.3" fill="#82B961" />
        <circle cx="16" cy="21.2" r="1.3" fill="#82B961" />
        {/* Lime green bottom baseline */}
        <rect x="7" y="30" width="34" height="2.2" rx="1" fill="#82B961" />
      </svg>
    ),
  },
  {
    name: "Myntra",
    category: "Fashion & E-Commerce",
    location: "Bengaluru, India",
    highlight: "High-Volume Catalog Routing",
    logo: (
      <svg
        viewBox="0 0 48 48"
        className="h-10 w-10 rounded-xl overflow-hidden shadow-sm shrink-0 bg-white"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Myntra Logo"
      >
        <rect width="48" height="48" rx="10" fill="#FFFFFF" />
        {/* Myntra M overlapping ribbon loops */}
        <g transform="translate(6.5, 9) scale(0.72)">
          {/* Left loop (Magenta) */}
          <path
            d="M8 38C4.5 31 4 17 12 9C19 2 24 14 26 23C20 31 12 44 8 38Z"
            fill="#E11D74"
          />
          {/* Middle-left loop (Orange) */}
          <path
            d="M16 11C23 3 32 16 35 25C29 32 20 20 16 11Z"
            fill="#FF6E1A"
          />
          {/* Middle-right loop (Tangerine) */}
          <path
            d="M26 23C28 14 34 2 41 9C49 17 48 31 44 38C40 44 32 31 26 23Z"
            fill="#F25C05"
          />
          {/* Right loop (Pink) */}
          <path
            d="M35 25C37 17 42 7 46 13C50 20 47 32 44 38C41 33 38 29 35 25Z"
            fill="#EE1289"
          />
        </g>
      </svg>
    ),
  },
  {
    name: "Nia Communications",
    subname: "nia. COMMUNICATIONS",
    category: "PR & Communications",
    location: "London / Global",
    highlight: "Outreach & Media Pipeline",
    logo: (
      <svg
        viewBox="0 0 48 48"
        className="h-10 w-10 rounded-xl overflow-hidden shadow-sm shrink-0 bg-white"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Nia Communications Logo"
      >
        <rect width="48" height="48" rx="10" fill="#FFFFFF" />
        {/* nia. lowercase stylized logotype */}
        <text
          x="24"
          y="23"
          textAnchor="middle"
          fill="#111111"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="900"
          fontSize="12.5"
          letterSpacing="-0.5"
        >
          nia.
        </text>
        {/* COMMUNICATIONS tracked subtitle */}
        <text
          x="24"
          y="31"
          textAnchor="middle"
          fill="#333333"
          fontFamily="system-ui, -apple-system, sans-serif"
          fontWeight="600"
          fontSize="4.2"
          letterSpacing="0.6"
        >
          COMMUNICATIONS
        </text>
      </svg>
    ),
  },
  {
    name: "Companies for Good",
    subname: "Companies4Good",
    category: "CSR & Impact Platform",
    location: "Dubai, UAE / Global",
    highlight: "Engagement & Member Flows",
    logo: (
      <svg
        viewBox="0 0 48 48"
        className="h-10 w-10 rounded-xl overflow-hidden shadow-sm shrink-0 bg-white"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Companies for Good Logo"
      >
        <rect width="48" height="48" rx="10" fill="#FFFFFF" />
        {/* Companies for Good dual checkmarks */}
        <g transform="translate(4, 5) scale(0.82)">
          {/* Left green tick */}
          <path
            d="M3 24L12 33L26 13L21 9L12 23L7 19L3 24Z"
            fill="#00B660"
          />
          {/* Right green tick */}
          <path
            d="M19 32L28 41L45 16L40 12L28 29L24 25L19 32Z"
            fill="#00B660"
          />
        </g>
      </svg>
    ),
  },
];

const ecosystemTools = [
  { name: "n8n Workflow Engine", badge: "Core Engine" },
  { name: "OpenAI GPT-4o", badge: "Intent & Copy AI" },
  { name: "Anthropic Claude", badge: "Enrichment" },
  { name: "Apollo.io API", badge: "Verified Data" },
  { name: "HubSpot CRM", badge: "Direct Sync" },
  { name: "Make.com & Webhooks", badge: "Connectors" },
];

const TrustedBy = () => {
  return (
    <section id="trusted-by" className="relative border-y border-border/80 bg-card/40 px-[18px] py-14 sm:px-[22px] sm:py-20">
      <div className="mx-auto w-full max-w-6xl">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto">
          <Reveal>
            <span className="section-label">Credibility & Trust</span>
            <h2 className="mt-3 font-display text-xl sm:text-2xl md:text-3xl leading-tight">
              Trusted by innovative companies & teams
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-dim leading-relaxed">
              Workflow engineering and AI automation built for fast-moving businesses, global agencies, and scaling platforms.
            </p>
          </Reveal>
        </div>

        {/* Company Logo Grid */}
        <div className="mt-10 grid grid-cols-2 gap-4 sm:gap-4 md:grid-cols-3 lg:grid-cols-6">
          {clientCompanies.map((company, index) => (
            <Reveal key={company.name} delay={index * 60} className="h-full">
              <div className="group relative flex h-full flex-col justify-between rounded-[1.75rem] border border-border bg-background/60 p-4 sm:p-5 transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(var(--border-hover))] hover:bg-[hsl(var(--card-hover))] hover:shadow-[0_12px_24px_-10px_rgba(224,224,224,0.12)]">
                <div>
                  <div className="flex items-center justify-between">
                    <div className="opacity-75 grayscale transition-all duration-300 group-hover:scale-105 group-hover:opacity-100 group-hover:grayscale-0">
                      {company.logo}
                    </div>
                  </div>

                  <h3 className="mt-3.5 font-display text-sm font-bold text-foreground group-hover:text-primary transition-colors">
                    {company.name}
                  </h3>
                  {company.subname && company.subname !== company.name && (
                    <p className="text-[10px] sm:text-xs font-mono text-primary/80 truncate">
                      {company.subname}
                    </p>
                  )}
                  <p className="mt-1 text-[11px] sm:text-xs text-muted-ink leading-snug">
                    {company.category}
                  </p>
                </div>

                <div className="mt-3 pt-2.5 border-t border-border/60">
                  <span className="inline-flex items-center gap-1 text-[10px] sm:text-xs font-medium text-dim">
                    <CheckCircle2 className="h-3 w-3 text-primary shrink-0" />
                    <span className="truncate">{company.highlight}</span>
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Certified Stack & Infrastructure Strip */}
        <Reveal delay={120} className="mt-8 sm:mt-12">
          <div className="rounded-[2rem] border border-border bg-card/80 p-5 sm:p-6 shadow-sm">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-border/80 pb-4">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10 text-primary">
                  <Cpu className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="font-display text-xs sm:text-sm font-bold text-foreground">
                    Enterprise Tool & API Ecosystem
                  </h4>
                  <p className="text-[11px] text-muted-ink">
                    Production-grade integrations connected directly through official OAuth and webhooks.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-xs text-primary font-medium">
                <Zap className="h-3.5 w-3.5" />
                <span>Zero vendor lock-in • 100% workflow exportable</span>
              </div>
            </div>

            {/* Ecosystem Badges */}
            <div className="mt-4 flex flex-wrap items-center justify-center sm:justify-start gap-2 sm:gap-2.5">
              {ecosystemTools.map((tool) => (
                <div
                  key={tool.name}
                  className="flex items-center gap-2 rounded-lg border border-border bg-background/60 px-3 py-1.5 text-xs text-dim transition-colors hover:border-primary/40 hover:text-foreground"
                >
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                  <span className="font-medium text-foreground">{tool.name}</span>
                  <span className="rounded bg-primary/10 px-1.5 py-0.5 text-[9px] font-semibold text-primary">
                    {tool.badge}
                  </span>
                </div>
              ))}
            </div>

            {/* Credibility Safeguards */}
            <div className="mt-5 grid grid-cols-1 sm:grid-cols-3 gap-3 border-t border-border/80 pt-4 text-xs text-dim">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-primary shrink-0" />
                <span><strong>Privacy First:</strong> Your leads & prompts remain strictly confidential.</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-primary shrink-0" />
                <span><strong>Direct Webhook Latency:</strong> &lt;5s trigger-to-CRM execution speed.</span>
              </div>
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-primary shrink-0" />
                <span><strong>Clean Deliverability:</strong> SPF/DKIM/DMARC compliant inbox routing.</span>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default TrustedBy;
