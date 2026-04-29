import { motion } from "framer-motion";
import { ArrowRight, Zap, Wallet, BellRing, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

const audience = [
  "Property developers launching new projects (Ivy Park, Silver Hill, Symphony…).",
  "High-volume agencies spending 50,000+ Ksh/month on Meta or Google ads.",
  "Directors tired of seeing \u201Cseen\u201D on the business WhatsApp with no follow-up.",
];

const features = [
  {
    icon: Zap,
    title: "Zero-Latency Response",
    body: "Sends brochures, price lists, and floor plans in under 3 seconds — every time.",
  },
  {
    icon: Wallet,
    title: "Buyer Liquidity Verification",
    body: "Asks the questions your agents are too polite to ask: budget range, cash vs. financing.",
  },
  {
    icon: BellRing,
    title: "High-Intent Alerting",
    body: "When a high-budget buyer surfaces, your lead broker is pinged instantly to take over.",
  },
  {
    icon: CalendarCheck,
    title: "Calendar Sync",
    body: "Serious buyers are offered a viewing slot directly through your booking link.",
  },
];

const Concierge = () => {
  const scrollToContact = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      id="concierge"
      aria-labelledby="concierge-heading"
      className="border-t border-border bg-background py-20 md:py-28"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl"
        >
          <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
            <span aria-hidden="true" className="h-2 w-2 rounded-full bg-foreground" />
            Featured Offer · Real Estate
          </span>
          <h2
            id="concierge-heading"
            className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl"
          >
            The Lead-Leakage Shield.
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground md:text-lg">
            An AI WhatsApp concierge that owns the first 2 minutes of every property inquiry —
            so no high-intent buyer ever gets a &ldquo;seen&rdquo; with no follow-up.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3">
            <Button
              size="lg"
              className="rounded-full bg-foreground px-7 text-background hover:bg-foreground/85"
              asChild
            >
              <a
                href="https://cal.com/biruke-felipe/30-minutes-assessment-call"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book My Lead Audit
              </a>
            </Button>
            <a
              href="#contact"
              onClick={scrollToContact}
              className="group inline-flex items-center gap-1.5 rounded text-sm font-medium text-foreground underline underline-offset-4 hover:text-foreground/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              Download the Blueprint
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </motion.div>

        {/* Two-column: built for / what it does */}
        <div className="mt-16 grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Built for
            </span>
            <ul className="mt-5 space-y-4">
              {audience.map((line) => (
                <li
                  key={line}
                  className="flex gap-3 border-b border-border pb-4 text-sm leading-relaxed text-foreground last:border-0 md:text-base"
                >
                  <span aria-hidden="true" className="mt-2 h-px w-4 shrink-0 bg-foreground" />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              What it does
            </span>
            <ol className="mt-5 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
              {features.map((f, i) => (
                <li key={f.title} className="bg-background p-6">
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-xs text-muted-foreground">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <f.icon aria-hidden="true" className="h-4 w-4 text-foreground" />
                  </div>
                  <h3 className="mt-3 font-display text-base font-semibold text-foreground md:text-lg">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.body}</p>
                </li>
              ))}
            </ol>
          </motion.div>
        </div>

        {/* Footnote */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mx-auto mt-16 max-w-xl text-center text-sm leading-relaxed text-muted-foreground md:text-base"
        >
          Sits on top of your existing WhatsApp Business number. Not a replacement for your agents —
          an executive assistant that never sleeps.
        </motion.p>
      </div>
    </section>
  );
};

export default Concierge;
