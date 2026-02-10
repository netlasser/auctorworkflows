import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Felipe's team built us a seamless automation that cut our client onboarding from 10 hours to under an hour. They gave me back 40 hours a month — literally, a full work week. This is the single most impactful investment we've made in our business's growth.",
    name: "Maria Chen",
    title: "Founder & CEO",
    company: "Stratagem Consulting",
  },
  {
    quote: "Felipe Workflows implemented an intelligent automation system that connected our Shopify, warehouse, and accounting platforms. A 99.8% reduction in fulfillment errors and 28% recovery of abandoned carts. We've grown 3x in the last year.",
    name: "David Rossi",
    title: "Operations Director",
    company: "Zenith Goods",
  },
  {
    quote: "They mapped our entire client delivery process, identified hidden bottlenecks, and built a custom dashboard. Our project margins improved by 22% because we could finally track profitability in real-time. Felipe Workflows isn't a vendor — they're a strategic partner.",
    name: "Samira Patel",
    title: "Managing Partner",
    company: "Beacon Creative Agency",
  },
];

const Testimonials = () => (
  <section id="testimonials" className="py-24">
    <div className="container mx-auto px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <h2 className="font-display text-3xl font-bold md:text-4xl">
          Trusted by <span className="gradient-text">Industry Leaders</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
          Real results from real businesses that made the switch.
        </p>
      </motion.div>

      <div className="grid gap-6 md:grid-cols-3">
        {testimonials.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="h-full border-border/50 bg-card">
              <CardContent className="flex h-full flex-col p-6">
                <Quote className="mb-4 h-8 w-8 text-primary/40" />
                <p className="flex-1 text-sm leading-relaxed text-muted-foreground">"{t.quote}"</p>
                <div className="mt-6 border-t border-border/50 pt-4">
                  <div className="font-display font-semibold">{t.name}</div>
                  <div className="text-sm text-primary">{t.title}</div>
                  <div className="text-xs text-muted-foreground">{t.company}</div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
