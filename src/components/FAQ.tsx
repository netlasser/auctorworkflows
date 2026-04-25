import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "How long does a typical automation project take?",
    a: "Most workflows ship in 2–4 weeks. We start with a discovery call, scope the highest-ROI process first, and roll out incrementally so you see value before the project ends.",
  },
  {
    q: "What does it cost?",
    a: "Engagements start at a fixed-scope build for a single workflow and scale into ongoing automation partnerships. We quote per project after a free 30-minute assessment so the price always matches the ROI.",
  },
  {
    q: "Which tools do you work with?",
    a: "We're tool-agnostic. Common stacks include Make.com, n8n, Zapier, OpenAI, Claude, Airtable, HubSpot, Notion, Slack, and custom code when needed. We pick what fits your team — not what we want to sell.",
  },
  {
    q: "Will this replace my team?",
    a: "No. We replace busywork, not people. Our clients use the time they get back to focus on strategy, customer relationships, and growth — the work humans actually enjoy.",
  },
  {
    q: "What happens after the workflow goes live?",
    a: "Every build comes with documentation, monitoring, and a 30-day support window. Many clients keep us on a monthly retainer for new workflows, optimizations, and changes as their business evolves.",
  },
];

const FAQ = () => {
  return (
    <section id="faq" className="border-t border-border bg-background py-20 md:py-28">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:sticky lg:top-24 lg:self-start"
          >
            <span className="inline-flex items-center gap-2 text-sm text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-foreground" />
              FAQ
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight text-foreground md:text-5xl">
              Questions, answered.
            </h2>
            <p className="mt-4 max-w-md text-sm text-muted-foreground md:text-base">
              The five things every operator asks before working with us. Still wondering something?{" "}
              <a
                href="#contact"
                className="text-foreground underline underline-offset-4 hover:text-foreground/70"
              >
                Just ask
              </a>
              .
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <Accordion type="single" collapsible defaultValue="item-0" className="w-full">
              {faqs.map((f, i) => (
                <AccordionItem
                  key={f.q}
                  value={`item-${i}`}
                  className="border-b border-border [&[data-state=open]>h3>button>svg]:rotate-45"
                >
                  <AccordionTrigger className="group py-6 text-left font-display text-lg font-semibold text-foreground hover:no-underline md:text-xl [&>svg]:hidden">
                    <span className="flex-1 pr-4">{f.q}</span>
                    <Plus className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:text-foreground" />
                  </AccordionTrigger>
                  <AccordionContent className="pb-6 text-base leading-relaxed text-muted-foreground">
                    {f.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
