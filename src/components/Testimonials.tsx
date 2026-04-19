import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const testimonials = [
  {
    quote:
      "Felipe's team built us a seamless automation that cut our client onboarding from 10 hours to under an hour. They gave me back 40 hours a month. This is the single most impactful investment we've made in our business's growth.",
    name: "Maria Chen",
    title: "Founder & CEO",
    company: "Stratagem Consulting",
    avatar: "MC",
    metric: "40 hrs/mo saved",
  },
  {
    quote:
      "A 99.8% reduction in fulfillment errors and 28% recovery of abandoned carts. We've grown 3x in the last year, and our operations have actually gotten smoother. That's their magic.",
    name: "David Rossi",
    title: "Operations Director",
    company: "Zenith Goods",
    avatar: "DR",
    metric: "3x growth",
  },
  {
    quote:
      "Our project margins improved by 22% because we could finally track profitability in real-time. Felipe Workflows isn't a vendor — they're a strategic partner in our business.",
    name: "Samira Patel",
    title: "Managing Partner",
    company: "Beacon Creative Agency",
    avatar: "SP",
    metric: "+22% margins",
  },
];

const Testimonials = () => {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const t = testimonials[idx];

  const next = useCallback(() => setIdx((i) => (i + 1) % testimonials.length), []);
  const prev = useCallback(
    () => setIdx((i) => (i - 1 + testimonials.length) % testimonials.length),
    []
  );

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, 6000);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden border-t border-border bg-foreground py-20 text-primary-foreground md:py-28"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* decorative gradient orbs */}
      <div className="pointer-events-none absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-primary-foreground/5 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-primary-foreground/5 blur-3xl" />

      <div className="container relative mx-auto px-4 md:px-8">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-xl"
          >
            <span className="inline-flex items-center gap-2 text-sm text-primary-foreground/60">
              <span className="h-2 w-2 rounded-full bg-primary-foreground" />
              Testimonials
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-5xl">
              Trusted by operators who hate busywork.
            </h2>
            <p className="mt-4 text-sm text-primary-foreground/60 md:text-base">
              Real results from teams who replaced manual chaos with reliable automation.
            </p>
          </motion.div>

          <div className="flex items-center gap-4">
            <span className="font-display text-sm tabular-nums text-primary-foreground/60">
              {String(idx + 1).padStart(2, "0")} / {String(testimonials.length).padStart(2, "0")}
            </span>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-foreground"
                onClick={prev}
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                className="rounded-full border-primary-foreground/20 bg-transparent text-primary-foreground hover:bg-primary-foreground hover:text-foreground"
                onClick={next}
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] lg:gap-12">
          {/* Featured testimonial */}
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative rounded-3xl border border-primary-foreground/10 bg-primary-foreground/[0.03] p-8 backdrop-blur-sm md:p-12"
            >
              <Quote className="absolute right-8 top-8 h-16 w-16 text-primary-foreground/[0.06]" strokeWidth={1} />

              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-primary-foreground text-primary-foreground" />
                ))}
              </div>

              <p className="mt-6 font-display text-xl font-medium leading-relaxed md:text-2xl lg:text-3xl">
                "{t.quote}"
              </p>

              <div className="mt-10 flex items-center justify-between gap-4 border-t border-primary-foreground/10 pt-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground font-display text-sm font-bold text-foreground">
                    {t.avatar}
                  </div>
                  <div>
                    <div className="font-display font-semibold">{t.name}</div>
                    <div className="text-xs text-primary-foreground/60">
                      {t.title} · {t.company}
                    </div>
                  </div>
                </div>
                <div className="hidden rounded-full border border-primary-foreground/20 px-4 py-2 font-display text-xs font-medium tabular-nums sm:block">
                  {t.metric}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Side list */}
          <div className="flex flex-col gap-3">
            {testimonials.map((tt, i) => (
              <button
                key={tt.name}
                onClick={() => setIdx(i)}
                className={`group rounded-2xl border p-5 text-left transition-all ${
                  i === idx
                    ? "border-primary-foreground/30 bg-primary-foreground/[0.06]"
                    : "border-primary-foreground/10 bg-transparent hover:border-primary-foreground/20 hover:bg-primary-foreground/[0.03]"
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div
                      className={`flex h-9 w-9 items-center justify-center rounded-full font-display text-xs font-bold transition-colors ${
                        i === idx
                          ? "bg-primary-foreground text-foreground"
                          : "bg-primary-foreground/10 text-primary-foreground"
                      }`}
                    >
                      {tt.avatar}
                    </div>
                    <div>
                      <div className="font-display text-sm font-semibold">{tt.name}</div>
                      <div className="text-xs text-primary-foreground/50">{tt.company}</div>
                    </div>
                  </div>
                  <span className="font-display text-xs tabular-nums text-primary-foreground/60">
                    {tt.metric}
                  </span>
                </div>
              </button>
            ))}

            {/* Progress indicator */}
            <div className="mt-2 h-px w-full overflow-hidden bg-primary-foreground/10">
              <motion.div
                key={idx + (paused ? "-paused" : "")}
                initial={{ width: "0%" }}
                animate={{ width: paused ? "0%" : "100%" }}
                transition={{ duration: paused ? 0 : 6, ease: "linear" }}
                className="h-full bg-primary-foreground/40"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
