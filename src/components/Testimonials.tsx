import { motion } from "framer-motion";
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote: "Felipe's team built us a seamless automation that cut our client onboarding from 10 hours to under an hour. They gave me back 40 hours a month. This is the single most impactful investment we've made in our business's growth.",
    name: "Maria Chen",
    title: "Founder & CEO, Stratagem Consulting",
    avatar: "MC",
  },
  {
    quote: "A 99.8% reduction in fulfillment errors and 28% recovery of abandoned carts. We've grown 3x in the last year, and our operations have actually gotten smoother. That's their magic.",
    name: "David Rossi",
    title: "Operations Director, Zenith Goods",
    avatar: "DR",
  },
  {
    quote: "Our project margins improved by 22% because we could finally track profitability in real-time. Felipe Workflows isn't a vendor — they're a strategic partner in our business.",
    name: "Samira Patel",
    title: "Managing Partner, Beacon Creative Agency",
    avatar: "SP",
  },
];

const Testimonials = () => {
  const [idx, setIdx] = useState(0);
  const t = testimonials[idx];

  return (
    <section id="testimonials" className="border-t border-border bg-foreground py-16 text-primary-foreground">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex items-start justify-between">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-flex items-center gap-2 text-sm text-primary-foreground/60">
              <span className="h-2 w-2 rounded-full bg-primary-foreground" />
              Testimonials
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">Some words from happy clients.</h2>
          </motion.div>

          <div className="hidden gap-2 md:flex">
            <Button variant="outline" size="icon" className="rounded-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" onClick={() => setIdx((idx - 1 + testimonials.length) % testimonials.length)}>
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="rounded-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" onClick={() => setIdx((idx + 1) % testimonials.length)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <motion.div
          key={idx}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-10 max-w-2xl rounded-xl border border-primary-foreground/10 bg-primary-foreground/5 p-6 md:p-8"
        >
          <p className="font-display text-lg font-medium leading-relaxed md:text-xl">
            "{t.quote}"
          </p>
          <div className="mt-6 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground font-display text-sm font-bold text-foreground">
              {t.avatar}
            </div>
            <div>
              <div className="font-display font-semibold">{t.name}</div>
              <div className="text-xs text-primary-foreground/60">{t.title}</div>
            </div>
          </div>
        </motion.div>

        <div className="mt-6 flex gap-2 md:hidden">
          <Button variant="outline" size="icon" className="rounded-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" onClick={() => setIdx((idx - 1 + testimonials.length) % testimonials.length)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground/10" onClick={() => setIdx((idx + 1) % testimonials.length)}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
