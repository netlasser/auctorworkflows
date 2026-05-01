import { motion, AnimatePresence } from "framer-motion";
import { Zap, Wallet, BellRing, CalendarCheck, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

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
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    whatsapp: "",
    adSpend: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.adSpend) {
      toast({ title: "Please select your monthly ad spend", variant: "destructive" });
      return;
    }
    if (!/^[+\d\s().-]{6,30}$/.test(form.whatsapp.trim())) {
      toast({ title: "Please enter a valid WhatsApp number", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("hubspot-lead", {
        body: {
          fullName: form.fullName,
          email: form.email,
          company: "—",
          headcount: form.adSpend,
          automationGoal: "Blueprint download — Lead-Leakage Shield",
          whatsapp: form.whatsapp,
          source: "blueprint",
        },
      });
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error ?? "Submission failed");
      setSubmitted(true);
      setForm({ fullName: "", email: "", whatsapp: "", adSpend: "" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast({ title: "Couldn't submit", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      id="concierge"
      aria-labelledby="concierge-heading"
      style={{ scrollMarginTop: "calc(var(--campaign-banner-h, 0px) + 5rem)" }}
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
                href="https://cal.com/biruke-felipe/30-minutes-assessment-call?utm_source=site&utm_campaign=lead-leakage-shield"
                target="_blank"
                rel="noopener noreferrer"
              >
                Book My Lead Audit
              </a>
            </Button>
            <a
              href="#concierge-blueprint"
              onClick={(e) => {
                e.preventDefault();
                document
                  .getElementById("concierge-blueprint")
                  ?.scrollIntoView({ behavior: "smooth", block: "center" });
              }}
              className="text-sm font-medium text-foreground underline underline-offset-4 hover:text-foreground/70"
            >
              Or download the Blueprint ↓
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

        {/* Blueprint mini-form */}
        <motion.div
          id="concierge-blueprint"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-20 max-w-3xl rounded-2xl border border-border bg-secondary/30 p-6 md:p-10"
        >
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="flex flex-col items-start gap-4"
                role="status"
                aria-live="polite"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground text-background">
                  <Check className="h-6 w-6" strokeWidth={3} />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-medium tracking-tight md:text-3xl">
                    Blueprint on the way.
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground md:text-base">
                    We&rsquo;ll send the Lead-Leakage Shield blueprint to your inbox within a few
                    minutes. Want to skip the wait?
                  </p>
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    className="rounded-full bg-foreground px-6 text-background hover:bg-foreground/85"
                  >
                    <a
                      href="https://cal.com/biruke-felipe/30-minutes-assessment-call?utm_source=site&utm_campaign=lead-leakage-shield"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Book a call now →
                    </a>
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setSubmitted(false)}
                    className="rounded-full"
                  >
                    Submit another
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                onSubmit={handleSubmit}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                className="space-y-5"
              >
                <div>
                  <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
                    Free download
                  </span>
                  <h3 className="mt-2 font-display text-2xl font-medium tracking-tight md:text-3xl">
                    Get the Blueprint.
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground md:text-base">
                    The exact Voiceflow setup + WhatsApp playbook we deploy for property developers.
                    Sent to your inbox, no call required.
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="bp-fullName" className="text-xs text-muted-foreground">
                      Full Name
                    </Label>
                    <Input
                      id="bp-fullName"
                      value={form.fullName}
                      onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                      placeholder="Jane Doe"
                      required
                      maxLength={120}
                      className="mt-1 rounded-lg border-border bg-background"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bp-email" className="text-xs text-muted-foreground">
                      Email Address
                    </Label>
                    <Input
                      id="bp-email"
                      type="email"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="you@company.com"
                      required
                      maxLength={255}
                      className="mt-1 rounded-lg border-border bg-background"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bp-whatsapp" className="text-xs text-muted-foreground">
                      WhatsApp Number
                    </Label>
                    <Input
                      id="bp-whatsapp"
                      type="tel"
                      value={form.whatsapp}
                      onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                      placeholder="+254 7…"
                      required
                      maxLength={30}
                      className="mt-1 rounded-lg border-border bg-background"
                    />
                  </div>
                  <div>
                    <Label htmlFor="bp-adSpend" className="text-xs text-muted-foreground">
                      Monthly Ad Spend
                    </Label>
                    <Select
                      value={form.adSpend}
                      onValueChange={(v) => setForm({ ...form, adSpend: v })}
                    >
                      <SelectTrigger
                        id="bp-adSpend"
                        className="mt-1 rounded-lg border-border bg-background"
                      >
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<50k Ksh">&lt;50k Ksh</SelectItem>
                        <SelectItem value="50k-150k Ksh">50k–150k Ksh</SelectItem>
                        <SelectItem value="150k-500k Ksh">150k–500k Ksh</SelectItem>
                        <SelectItem value="500k+ Ksh">500k+ Ksh</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <Button
                  type="submit"
                  disabled={loading}
                  size="lg"
                  className="rounded-full bg-foreground px-7 text-background hover:bg-foreground/85"
                >
                  {loading ? "Sending…" : "Send Me the Blueprint"}
                </Button>
                <p className="text-xs text-muted-foreground">
                  No spam. We&rsquo;ll only email you about the Lead-Leakage Shield.
                </p>
              </motion.form>
            )}
          </AnimatePresence>
        </motion.div>

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
