import { motion } from "framer-motion";
import { Target, Handshake, FileText, BarChart3 } from "lucide-react";

const services = [
  {
    icon: Target,
    title: "Sales Systems",
    audience: "for SEO / Marketing Agencies",
    automations: ["Lead Sourcing", "Enrichment", "Outbound", "CRM Updates", "Follow-ups", "Reporting"],
  },
  {
    icon: Handshake,
    title: "Business Development",
    audience: "for Agencies",
    automations: ["Partner Sourcing", "Outreach", "Relationship Tracking", "Deal Flow", "Warm Intros"],
  },
  {
    icon: FileText,
    title: "Content Production",
    audience: "for Writing / Content Firms",
    automations: ["Intake", "Assignment", "Status Tracking", "Client Approvals", "Publishing"],
  },
  {
    icon: BarChart3,
    title: "Marketing Operations",
    audience: "for PPC / Ad Agencies",
    automations: ["Reporting", "Lead Routing", "Alerts", "Budget Tracking", "Performance Aggregation"],
  },
];

const Services = () => (
  <section id="services" className="border-t border-border py-16">
    <div className="container mx-auto px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-label">Our Services</span>
        <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">What we specialize in.</h2>
      </motion.div>

      <div className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-2">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className="bg-background p-6 md:p-8 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-foreground">
              <s.icon className="h-5 w-5" />
            </div>
            <h3 className="font-display text-lg font-semibold">{s.title}</h3>
            <p className="mt-1 text-xs text-muted-foreground">{s.audience}</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {s.automations.map((a) => (
                <span key={a} className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-foreground">{a}</span>
              ))}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
