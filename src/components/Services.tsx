import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Target, Handshake, FileText, BarChart3 } from "lucide-react";

const services = [
  {
    icon: Target,
    title: "Sales Systems",
    audience: "for SEO / Marketing Agencies",
    description: "I build sales systems for SEO and marketing agencies. Agencies live and die by pipeline — more booked calls = immediate money.",
    tags: ["Lead Sourcing", "Enrichment", "Outbound", "CRM Updates", "Follow-ups", "Reporting"],
  },
  {
    icon: Handshake,
    title: "Business Development Systems",
    audience: "for Agencies",
    description: "I build business development systems for agencies. Bigger contracts, partnerships, referrals — high leverage.",
    tags: ["Partner Sourcing", "Outreach", "Relationship Tracking", "Deal Flow", "Warm Intros"],
  },
  {
    icon: FileText,
    title: "Content Production Systems",
    audience: "for Writing / Content Firms",
    description: "I build content production systems for content and writing firms. Briefs, writers, approvals, deadlines — chaos becomes order.",
    tags: ["Intake", "Assignment", "Status Tracking", "Client Approvals", "Publishing"],
  },
  {
    icon: BarChart3,
    title: "Marketing Operations Systems",
    audience: "for PPC / Ad Agencies",
    description: "I build marketing operations systems for PPC and advertising agencies. Clients, campaigns, reporting, creatives, leads — streamlined.",
    tags: ["Reporting", "Lead Routing", "Alerts", "Budget Tracking", "Performance Aggregation"],
  },
];

const Services = () => (
  <section id="services" className="py-24">
    <div className="container mx-auto px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="font-display text-3xl font-bold md:text-4xl">
          What We <span className="gradient-text">Build</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Turnkey AI workflow systems designed for specific industries — no generic solutions.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-2">
        {services.map((s, i) => (
          <motion.div
            key={s.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="group h-full border-border/50 bg-card transition-all duration-300 hover:border-primary/40 hover:glow-border">
              <CardHeader>
                <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10 text-primary transition-colors group-hover:bg-primary/20">
                  <s.icon className="h-6 w-6" />
                </div>
                <CardTitle className="font-display text-xl">{s.title}</CardTitle>
                <p className="text-sm font-medium text-primary">{s.audience}</p>
              </CardHeader>
              <CardContent>
                <p className="mb-4 text-sm text-muted-foreground">{s.description}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span key={t} className="rounded-full border border-border bg-secondary/50 px-3 py-1 text-xs text-muted-foreground">
                      {t}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Services;
