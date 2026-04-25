import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Clock, DollarSign, TrendingUp, Sparkles, Check } from "lucide-react";
import confetti from "canvas-confetti";

const benefits = [
  {
    icon: Clock,
    title: "Time saved per week",
    desc: "See exactly which manual tasks we can eliminate from your workflow.",
  },
  {
    icon: DollarSign,
    title: "Cost reduction estimate",
    desc: "Get a clear ROI projection based on your team size and current process.",
  },
  {
    icon: TrendingUp,
    title: "Automation roadmap",
    desc: "A prioritized 90-day plan tailored to your highest-impact workflows.",
  },
  {
    icon: Sparkles,
    title: "Tooling recommendations",
    desc: "The exact AI stack we'd deploy — no vendor lock-in, no fluff.",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    company: "",
    headcount: "",
    automationGoal: "",
  });

  const fireConfetti = () => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const defaults = {
      startVelocity: 30,
      spread: 360,
      ticks: 60,
      zIndex: 100,
      colors: ["#000000", "#404040", "#a3a3a3", "#e5e5e5", "#ffffff"],
    };
    const shoot = (originX: number) => {
      confetti({ ...defaults, particleCount: 40, origin: { x: originX, y: 0.6 } });
    };
    shoot(0.25);
    shoot(0.5);
    shoot(0.75);
    setTimeout(() => shoot(0.4), 200);
    setTimeout(() => shoot(0.6), 250);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.headcount) {
      toast({ title: "Please select a headcount", variant: "destructive" });
      return;
    }
    setLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke("hubspot-lead", {
        body: form,
      });
      if (error) throw error;
      if (!data?.success) throw new Error(data?.error ?? "Submission failed");

      setSubmitted(true);
      fireConfetti();
      setForm({ fullName: "", email: "", company: "", headcount: "", automationGoal: "" });
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      toast({ title: "Couldn't submit", description: message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="border-t border-border py-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid gap-12 md:grid-cols-2 md:gap-16">
          {/* Left: form */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="font-display text-4xl font-medium tracking-tight md:text-5xl">
                Get Your AI Automation Plan
              </h2>
              <p className="mt-4 text-base text-muted-foreground md:text-lg">
                Find out how much time and cost you can save by automating your workflows with AI.
              </p>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-8 space-y-4"
            >
              <div>
                <Label htmlFor="fullName" className="text-xs text-muted-foreground">
                  Full Name
                </Label>
                <Input
                  id="fullName"
                  value={form.fullName}
                  onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                  placeholder="Jane Doe"
                  required
                  maxLength={120}
                  className="mt-1 rounded-lg border-border"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-xs text-muted-foreground">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="you@company.com"
                  required
                  maxLength={255}
                  className="mt-1 rounded-lg border-border"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <Label htmlFor="company" className="text-xs text-muted-foreground">
                    Company Name
                  </Label>
                  <Input
                    id="company"
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Acme Inc."
                    required
                    maxLength={200}
                    className="mt-1 rounded-lg border-border"
                  />
                </div>
                <div>
                  <Label htmlFor="headcount" className="text-xs text-muted-foreground">
                    Headcount
                  </Label>
                  <Select
                    value={form.headcount}
                    onValueChange={(v) => setForm({ ...form, headcount: v })}
                  >
                    <SelectTrigger id="headcount" className="mt-1 rounded-lg border-border">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-5">1–5</SelectItem>
                      <SelectItem value="5-25">5–25</SelectItem>
                      <SelectItem value="25-50">25–50</SelectItem>
                      <SelectItem value="50-100">50–100</SelectItem>
                      <SelectItem value="100-500">100–500</SelectItem>
                      <SelectItem value="500-1000">500–1000</SelectItem>
                      <SelectItem value="1000+">1000+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <Label htmlFor="automationGoal" className="text-xs text-muted-foreground">
                  What do you want to automate?
                </Label>
                <Textarea
                  id="automationGoal"
                  value={form.automationGoal}
                  onChange={(e) => setForm({ ...form, automationGoal: e.target.value })}
                  placeholder="e.g. lead qualification, invoice processing, customer support…"
                  rows={3}
                  required
                  maxLength={1000}
                  className="mt-1 rounded-lg border-border"
                />
              </div>
              <Button
                type="submit"
                disabled={loading}
                className="rounded-full bg-foreground px-6 text-background hover:bg-foreground/80"
              >
                {loading ? "Sending…" : "Get My Plan"}
              </Button>
            </motion.form>
          </div>

          {/* Right: benefits list */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex flex-col justify-center"
          >
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              What you'll get
            </span>
            <h3 className="mt-3 font-display text-2xl font-medium tracking-tight md:text-3xl">
              A custom plan, not a sales pitch.
            </h3>
            <ul className="mt-8 space-y-6">
              {benefits.map((b, i) => (
                <motion.li
                  key={b.title}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.08 }}
                  className="flex gap-4"
                >
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-background">
                    <b.icon className="h-4 w-4 text-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{b.title}</p>
                    <p className="mt-1 text-sm text-muted-foreground">{b.desc}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
