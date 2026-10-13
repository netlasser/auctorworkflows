import { useEffect, useRef } from "react";
import { CalendarCheck, Code2, MapPin } from "lucide-react";
import biruke from "@/assets/Biruke.jpg";
import horeb from "@/assets/Horeb.jpg";
import { CAL_LINK, GITHUB_LINK } from "@/lib/site";
import { gsap, prefersReducedMotion } from "@/lib/gsap";
import MagneticButton from "@/components/ui/MagneticButton";

const chips = ["n8n", "OpenAI", "Apollo.io", "SendGrid"];

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
        .from("[data-hero='cta'] > *", { y: 24, opacity: 0, duration: 0.6, stagger: 0.08 }, "-=0.5")
        .from(
          "[data-hero='duo']",
          { y: 60, opacity: 0, duration: 1, ease: "power2.out" },
          "-=0.9"
        )
        .from(
          "[data-hero='stat']",
          { y: 26, opacity: 0, duration: 0.6, stagger: 0.15 },
          "-=0.6"
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

      <div className="mx-auto grid w-full max-w-6xl items-end gap-14 lg:grid-cols-[1.35fr_0.65fr]">
        <div>
          <span data-hero="eyebrow" className="section-label">
            B2B AI Automation Agency
          </span>

          <h1 className="mt-6 font-heading text-[clamp(2.4rem,6.4vw,5.2rem)] font-semibold leading-[0.98]">
            <span data-hero="line-1" className="block">
              Your sales team is
            </span>
            <span data-hero="line-2" className="font-drama block font-normal text-dim">
              one automation away.
            </span>
          </h1>

          <p
            data-hero="para"
            className="mt-7 max-w-xl text-base leading-relaxed text-dim"
          >
            We're Auctor Workflows — a two-person B2B AI automation agency. We build
            intelligent n8n workflows that capture leads, personalize outreach, and follow up
            automatically. Your calendar fills itself while you sleep.
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

        <div data-hero="duo" className="relative mx-auto w-full max-w-sm">
          <div className="absolute -top-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-card/80 px-3.5 py-1.5 text-xs text-dim shadow-lg backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--success))]" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--success))]" />
            </span>
            Available for new projects
          </div>

          <div className="overflow-hidden rounded-[2.5rem] border border-border bg-card/60 p-6 pt-10 text-center backdrop-blur-sm">
            <div className="flex items-end justify-center">
              <div className="h-28 w-28 rounded-[2rem] p-[3px] ring-1 ring-border">
                <img
                  src={biruke}
                  alt="Portrait of Biruke Zeckariyas"
                  className="h-full w-full rounded-[1.8rem] object-cover object-top grayscale"
                />
              </div>
              <div className="-ml-6 mb-3 h-24 w-24 rounded-[1.7rem] p-[3px] ring-1 ring-border">
                <img
                  src={horeb}
                  alt="Portrait of Horeb Yohannes"
                  className="h-full w-full rounded-[1.5rem] object-cover object-top grayscale"
                />
              </div>
            </div>
            <h2 className="mt-5 font-heading text-xl">Auctor Workflows</h2>
            <p className="mt-1 text-sm text-primary">B2B AI Automation Agency</p>
            <p className="mt-2 text-xs text-dim">Biruke Zeckariyas · Horeb Yohannes</p>
            <p className="mt-2 inline-flex items-center justify-center gap-1.5 text-xs text-muted-ink">
              <MapPin className="h-3.5 w-3.5" /> Addis Ababa, Ethiopia
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {chips.map((c) => (
                <span
                  key={c}
                  className="rounded-full border border-border px-3 py-1 text-xs text-dim"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto mt-14 w-full max-w-6xl">
        <div className="grid gap-px overflow-hidden rounded-[2rem] border border-border bg-border sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              data-hero="stat"
              className="bg-card px-6 py-7 text-center"
            >
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
