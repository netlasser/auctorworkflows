import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

/* ── Animated workflow nodes ── */
const workflowSteps = [
  { id: 1, label: "Incoming Lead", icon: "📩", x: 50, y: 8 },
  { id: 2, label: "AI Qualification", icon: "🤖", x: 20, y: 28 },
  { id: 3, label: "CRM Update", icon: "📊", x: 75, y: 28 },
  { id: 4, label: "Auto Follow-up", icon: "✉️", x: 10, y: 52 },
  { id: 5, label: "Meeting Booked", icon: "📅", x: 50, y: 52 },
  { id: 6, label: "Proposal Sent", icon: "📄", x: 85, y: 52 },
  { id: 7, label: "Deal Closed", icon: "🎯", x: 50, y: 76 },
];

const connections: [number, number][] = [
  [1, 2], [1, 3], [2, 4], [2, 5], [3, 5], [3, 6], [4, 7], [5, 7], [6, 7],
];

const WorkflowDiagram = () => {
  const getPos = (id: number) => {
    const s = workflowSteps.find((n) => n.id === id)!;
    return { x: s.x, y: s.y };
  };

  return (
    <div className="relative h-full w-full min-h-[420px]">
      {/* Connection lines */}
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 90" preserveAspectRatio="xMidYMid meet">
        {connections.map(([from, to], i) => {
          const a = getPos(from);
          const b = getPos(to);
          return (
            <motion.line
              key={`${from}-${to}`}
              x1={a.x}
              y1={a.y + 4}
              x2={b.x}
              y2={b.y}
              stroke="hsl(var(--muted-foreground))"
              strokeOpacity={0.15}
              strokeWidth={0.4}
              strokeDasharray="2 2"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 + i * 0.1, duration: 0.6 }}
            />
          );
        })}

        {/* Animated pulse traveling along connections */}
        {connections.map(([from, to], i) => {
          const a = getPos(from);
          const b = getPos(to);
          return (
            <motion.circle
              key={`pulse-${from}-${to}`}
              r={0.8}
              fill="hsl(var(--primary))"
              initial={{ opacity: 0 }}
              animate={{
                cx: [a.x, b.x],
                cy: [a.y + 4, b.y],
                opacity: [0, 1, 1, 0],
              }}
              transition={{
                duration: 2.5,
                delay: 1.5 + i * 0.6,
                repeat: Infinity,
                repeatDelay: connections.length * 0.6,
                ease: "easeInOut",
              }}
            />
          );
        })}
      </svg>

      {/* Nodes */}
      {workflowSteps.map((step, i) => (
        <motion.div
          key={step.id}
          className="absolute flex flex-col items-center gap-1"
          style={{ left: `${step.x}%`, top: `${step.y}%`, transform: "translate(-50%, -50%)" }}
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 * i, type: "spring", stiffness: 200, damping: 15 }}
        >
          <motion.div
            className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-background text-lg shadow-sm"
            whileHover={{ scale: 1.15, borderColor: "hsl(var(--primary))" }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            {step.icon}
          </motion.div>
          <span className="text-[10px] font-medium text-muted-foreground whitespace-nowrap">
            {step.label}
          </span>
        </motion.div>
      ))}

      {/* Floating label */}
      <motion.div
        className="absolute bottom-2 left-1/2 -translate-x-1/2 rounded-full border border-border bg-background/80 px-3 py-1 backdrop-blur-sm"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 1.2 }}
      >
        <span className="text-[10px] font-semibold tracking-wider text-muted-foreground">
          LEAD → CLOSE AUTOMATION
        </span>
      </motion.div>
    </div>
  );
};

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you shortly." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="border-t border-border py-16">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left: form */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <p className="text-sm text-muted-foreground">
                Trust us for a free, friendly, no-obligation chat about your workflow.
              </p>
              <div className="mt-4">
                <Button
                  size="lg"
                  className="rounded-full bg-foreground px-8 text-background hover:bg-foreground/80"
                  asChild
                >
                  <a href="https://cal.com/biruke-felipe/30min" target="_blank" rel="noopener noreferrer">Get a Call</a>
                </Button>
              </div>
            </motion.div>

            <motion.form
              onSubmit={handleSubmit}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="mt-10 space-y-4"
            >
              <div>
                <Label htmlFor="name" className="text-xs text-muted-foreground">Name</Label>
                <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" required className="mt-1 rounded-lg border-border" />
              </div>
              <div>
                <Label htmlFor="email" className="text-xs text-muted-foreground">Email</Label>
                <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" required className="mt-1 rounded-lg border-border" />
              </div>
              <div>
                <Label htmlFor="message" className="text-xs text-muted-foreground">Message</Label>
                <Textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your workflow challenges..." rows={3} required className="mt-1 rounded-lg border-border" />
              </div>
              <Button type="submit" className="rounded-full bg-foreground px-6 text-background hover:bg-foreground/80">
                Send Message
              </Button>
            </motion.form>
          </div>

          {/* Right: animated workflow diagram */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="hidden md:flex items-center justify-center rounded-2xl border border-border bg-muted/30 p-6"
          >
            <WorkflowDiagram />
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
