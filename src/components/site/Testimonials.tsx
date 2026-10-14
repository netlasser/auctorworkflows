import { useState, useEffect, useCallback } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, Pause, Play, CheckCircle2, TrendingUp } from "lucide-react";
import Reveal from "./Reveal";
import { useInView } from "@/lib/useInView";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  metric: string;
  tag: string;
}

const testimonials: Testimonial[] = [
  {
    quote:
      "The Auctor team built us a cold outreach engine that completely transformed our pipeline. We went from generic email blasts to hyper-personalized Apollo + n8n sequences that sound individually researched. Our sales team now focuses on closing, not chasing.",
    name: "Abebe Kebede",
    role: "Founder & CEO",
    company: "Addis Tech Solutions",
    metric: "+310% Outbound Replies",
    tag: "Cold Outreach",
  },
  {
    quote:
      "We were manually copying leads from forms into Sheets every single day. Now every inbound lead is enriched via OpenAI, scored against our ICP criteria, and routed to reps in seconds. We respond to hot leads before our competitors even wake up.",
    name: "Sarah Mersha",
    role: "Marketing Director",
    company: "Bole Global Imports",
    metric: "<5s Response Time",
    tag: "Inbound CRM",
  },
  {
    quote:
      "Our onboarding required 14 repetitive cross-checks across identity documents, KYC verification, and CRM updates. Auctor automated the entire flow using n8n and vision AI. What took 2 business days is now completed in 90 seconds.",
    name: "Nahum Tadesse",
    role: "Operations Lead",
    company: "Mereb FinTech",
    metric: "40+ Hrs Saved / Wk",
    tag: "Operations AI",
  },
  {
    quote:
      "The automated re-engagement workflow Auctor Workflows engineered resurrected closed-lost deals from our HubSpot database. It detected company hiring surges, personalized follow-ups, and booked 23 discovery calls in our first 30 days.",
    name: "Elena Rostova",
    role: "Head of Growth",
    company: "Pulse Analytics",
    metric: "$180k Pipeline Added",
    tag: "Database Reactivation",
  },
  {
    quote:
      "Extracting order details from unstructured PDF invoices and syncing them with inventory systems caused constant errors. Auctor's document AI pipeline solved it overnight. Reliable, silent, and flawlessly built.",
    name: "Dawit Haile",
    role: "Managing Director",
    company: "Nexus Logistics",
    metric: "99.2% Data Accuracy",
    tag: "Document Processing",
  },
  {
    quote:
      "Auctor doesn't just connect APIs; they understand sales operations and conversion psychology. The automations they deployed generated more qualified meetings in Q1 than our SDR team booked in all of last year.",
    name: "Marcus Chen",
    role: "Founder & Growth Partner",
    company: "ScaleWave Media",
    metric: "12x ROI in 60 Days",
    tag: "B2B Scale",
  },
];

const Testimonials = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const { ref: carouselRef, inView } = useInView<HTMLDivElement>();

  useEffect(() => {
    if (!api) return;

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on("select", onSelect);
    api.on("reInit", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Smooth auto-playing interval with hover pause
  useEffect(() => {
    if (!api || !isPlaying || isHovered || !inView) return;

    const timer = setInterval(() => {
      api.scrollNext();
    }, 4500);

    return () => clearInterval(timer);
  }, [api, isPlaying, isHovered, inView]);

  const handleScrollPrev = useCallback(() => {
    api?.scrollPrev();
  }, [api]);

  const handleScrollNext = useCallback(() => {
    api?.scrollNext();
  }, [api]);

  const handleDotClick = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <section id="testimonials" className="px-[22px] py-[clamp(80px,10vw,130px)]">
      <div className="mx-auto w-full max-w-6xl">
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="section-label">Social Proof</span>
            <h2 className="mt-3 font-display text-3xl md:text-4xl">What clients say</h2>
            <p className="mt-3 text-dim">
              Real results from production B2B automations that run silently around the clock.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs text-dim">
              <span className="flex text-primary">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3.5 w-3.5 fill-primary text-primary" />
                ))}
              </span>
              <span className="font-semibold text-foreground">5.0 / 5.0</span>
              <span className="hidden text-muted-ink sm:inline">· 100% On-Time Delivery</span>
            </div>

            {/* Slider controls */}
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setIsPlaying((p) => !p)}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-dim transition-colors hover:border-[hsl(var(--border-hover))] hover:text-foreground"
                aria-label={isPlaying ? "Pause auto-slide" : "Play auto-slide"}
                title={isPlaying ? "Pause auto-slide" : "Play auto-slide"}
              >
                {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              </button>

              <button
                type="button"
                onClick={handleScrollPrev}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-dim transition-colors hover:border-[hsl(var(--border-hover))] hover:text-foreground"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>

              <button
                type="button"
                onClick={handleScrollNext}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-border bg-card text-dim transition-colors hover:border-[hsl(var(--border-hover))] hover:text-foreground"
                aria-label="Next testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        </Reveal>

        {/* Carousel Container */}
        <div
          ref={carouselRef}
          className="mt-10"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            setApi={setApi}
            className="w-full"
          >
            <CarouselContent className="-ml-4 md:-ml-6">
              {testimonials.map((t, idx) => (
                <CarouselItem
                  key={t.name}
                  className="pl-4 md:basis-1/2 md:pl-6 lg:basis-1/3"
                >
                  <figure className="card-surface flex h-full flex-col justify-between p-7">
                    <div>
                      {/* Top row: Stars & Metric highlight */}
                      <div className="flex items-center justify-between gap-2">
                        <div className="flex gap-1">
                          {Array.from({ length: 5 }).map((_, s) => (
                            <Star key={s} className="h-3.5 w-3.5 fill-primary text-primary" />
                          ))}
                        </div>
                        <span className="inline-flex items-center gap-1 rounded-full border border-primary/20 bg-primary/10 px-2.5 py-0.5 text-[11px] font-medium text-primary">
                          <TrendingUp className="h-3 w-3" />
                          {t.metric}
                        </span>
                      </div>

                      {/* Quote */}
                      <div className="relative mt-5">
                        <Quote className="absolute -left-1 -top-2 h-6 w-6 text-primary/10" />
                        <blockquote className="relative z-10 text-sm leading-relaxed text-dim">
                          "{t.quote}"
                        </blockquote>
                      </div>
                    </div>

                    {/* Author footer */}
                    <figcaption className="mt-7 flex items-center justify-between border-t border-border/70 pt-5">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/25 to-accent/15 font-logo text-sm font-semibold text-primary ring-1 ring-primary/20">
                          {t.name
                            .split(" ")
                            .map((p) => p[0])
                            .join("")}
                        </span>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-semibold text-foreground">{t.name}</span>
                            <CheckCircle2
                              className="h-3.5 w-3.5 text-primary"
                              aria-label="Verified Client"
                            />
                          </div>
                          <span className="block text-xs text-muted-ink">
                            {t.role}, <span className="text-dim">{t.company}</span>
                          </span>
                        </div>
                      </div>
                    </figcaption>
                  </figure>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {/* Dots Indicator & Auto-play status */}
          <div className="mt-8 flex items-center justify-between px-2">
            <div className="flex items-center gap-2">
              <span
                className={`h-2 w-2 rounded-full transition-colors ${
                  isPlaying && !isHovered ? "bg-[hsl(var(--success))]" : "bg-muted-ink"
                }`}
                title={isPlaying && !isHovered ? "Autoplay active" : "Autoplay paused"}
              />
              <span className="text-xs text-muted-ink">
                {isHovered ? "Paused on hover" : isPlaying ? "Autoplaying" : "Paused"}
              </span>
            </div>

            <div className="flex items-center gap-2">
              {Array.from({ length: count }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handleDotClick(i)}
                  className={`h-2 rounded-full transition-all ${
                    current === i ? "w-7 bg-primary" : "w-2 bg-border hover:bg-dim"
                  }`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
