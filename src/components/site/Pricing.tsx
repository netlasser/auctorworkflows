import { Check } from "lucide-react";
import { CAL_LINK } from "@/lib/site";
import Reveal from "./Reveal";

const plans = [
  {
    name: "One-Time Build",
    price: "$500+",
    note: "Perfect for a single automation workflow",
    features: [
      "Custom n8n workflow build",
      "Integration with your existing tools",
      "1 week of post-launch support",
      "Full documentation & handover",
      "30-min training call",
    ],
    cta: "Get Started",
    featured: false,
  },
  {
    name: "Monthly Retainer",
    price: "$400",
    suffix: "/month",
    note: "Ongoing optimization & new automations",
    features: [
      "Everything in One-Time Build",
      "Unlimited tweaks & improvements",
      "Priority support (24h response)",
      "Monthly performance reports",
      "New workflow requests included",
      "Dedicated Slack channel",
    ],
    cta: "Book a Call",
    featured: true,
  },
];

const Pricing = () => (
  <section id="pricing" className="px-[22px] py-[clamp(80px,10vw,130px)]">
    <div className="mx-auto w-full max-w-5xl">
      <Reveal className="max-w-2xl">
        <span className="section-label">Pricing</span>
        <h2 className="mt-4 font-display text-3xl md:text-4xl">Simple, transparent pricing</h2>
        <p className="mt-4 text-dim">No hidden fees. No surprise invoices.</p>
      </Reveal>

      <div className="mt-14 grid items-start gap-6 md:grid-cols-2">
        {plans.map((p, i) => (
          <Reveal key={p.name} delay={i * 100}>
            <div
              className={`card-surface relative h-full p-7 ${
                p.featured ? "md:scale-[1.03] border-primary/60" : ""
              }`}
              style={p.featured ? { boxShadow: "0 20px 60px -25px rgba(210,155,74,0.45)" } : undefined}
            >
              {p.featured && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-primary px-3 py-1 text-[11px] font-semibold text-primary-foreground">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-xl">{p.name}</h3>
              <p className="mt-1 text-sm text-muted-ink">{p.note}</p>
              <div className="mt-5 font-logo text-4xl font-bold text-foreground">
                {p.price}
                {p.suffix && <span className="text-base font-medium text-muted-ink">{p.suffix}</span>}
              </div>
              <ul className="mt-6 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-dim">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-7 block rounded-xl px-5 py-3 text-center text-sm font-semibold transition-colors ${
                  p.featured
                    ? "btn-primary-glow"
                    : "border border-border text-dim hover:border-[hsl(var(--border-hover))] hover:text-foreground"
                }`}
              >
                {p.cta}
              </a>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Pricing;
