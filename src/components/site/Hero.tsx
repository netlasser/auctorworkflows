import { useEffect, useRef } from "react";
import { CalendarCheck, Code2 } from "lucide-react";
import { CAL_LINK, GITHUB_LINK } from "@/lib/site";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";

const stats = [
  { value: "38%", label: "Avg. Cold Email Reply Rate" },
  { value: "<5s", label: "Lead Response Time" },
  { value: "10+ hrs", label: "Saved Per Week" },
];

const Hero = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set("[data-hero]", { opacity: 1, y: 0 });
        return;
      }
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero='eyebrow']", { y: 24, opacity: 0, duration: 0.7 })
        .from("[data-hero='line-1']", { y: 48, opacity: 0, duration: 0.9 }, "-=0.4")
        .from("[data-hero='line-2']", { y: 60, opacity: 0, duration: 1 }, "-=0.7")
        .from("[data-hero='para']", { y: 32, opacity: 0, duration: 0.8 }, "-=0.6")
        .from("[data-hero='founders']", { y: 20, opacity: 0, duration: 0.6 }, "-=0.5")
        .from("[data-hero='cta'] > *", { y: 24, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.4")
        .from(
          "[data-hero='stat']",
          { y: 26, opacity: 0, duration: 0.6, stagger: 0.15 },
          "-=0.3"
        );
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="relative flex min-h-[100dvh] flex-col justify-end overflow-hidden px-[22px] pb-16 pt-32"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_15%_20%,hsl(var(--card))_0%,transparent_60%)]" />
        <div className="absolute inset-0 grid-overlay opacity-50" />
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-4xl">
        <span data-hero="eyebrow" className="section-label">
          B2B AI Automation Agency
        </span>

        <h1 className="mt-6 font-heading text-[clamp(2.4rem,7vw,5.6rem)] font-semibold leading-[0.98]">
          <span data-hero="line-1" className="block">
            Your sales team is
          </span>
          <span data-hero="line-2" className="font-drama block font-normal text-dim">
            one automation away.
          </span>
        </h1>

        <p data-hero="para" className="mt-7 max-w-xl text-base leading-relaxed text-dim">
          We're Auctor Workflows — a two-person B2B AI automation agency. We build intelligent
          n8n workflows that capture leads, personalize outreach, and follow up automatically.
          Your calendar fills itself while you sleep.
        </p>

        <p
          data-hero="founders"
          className="mt-4 font-data text-xs uppercase tracking-[0.2em] text-muted-ink"
        >
          Biruke Zeckariyas · Horeb Yohannes — Addis Ababa, Ethiopia
        </p>

        <div data-hero="cta" className="mt-9 flex flex-col gap-3 sm:flex-row">
          <MagneticButton
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold"
          >
            <CalendarCheck className="h-4 w-4" /> Book Free 30-Min Assessment
          </MagneticButton>
          <MagneticButton
            href={GITHUB_LINK}
            target="_blank"
            rel="noopener noreferrer"
            variant="ghost"
            className="font-semibold"
          >
            <Code2 className="h-4 w-4" /> View Our Work
          </MagneticButton>
        </div>
      </div>

      <div className="mx-auto mt-12 w-full max-w-4xl sm:mt-16">
        <div className="grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label} data-hero="stat" className="bg-card px-6 py-7 text-center">
              <div className="font-data text-3xl font-bold text-primary">{s.value}</div>
              <div className="mt-1.5 text-xs uppercase tracking-[0.18em] text-muted-ink">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
