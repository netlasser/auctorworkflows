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

      // Parallax the ambient backdrop as the hero scrolls away (mobile + desktop).
      const bg = root.current?.querySelector("[data-hero-bg]");
      if (bg) {
        gsap.to(bg, {
          yPercent: 14,
          ease: "none",
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        });
      }
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="top"
      ref={root}
      className="page-x relative flex min-h-[100dvh] flex-col justify-end overflow-hidden pb-12 pt-36 sm:pb-16 sm:pt-40 lg:pb-20 lg:pt-44"
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div data-hero-bg className="absolute inset-x-0 -inset-y-[14%]">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_15%_20%,hsl(var(--card))_0%,transparent_60%)]" />
          <div className="absolute inset-0 grid-overlay opacity-50" />
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-background via-background/60 to-transparent" />
      </div>

      <div className="mx-auto w-full max-w-4xl">
        <span
          data-hero="eyebrow"
          className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-1.5 text-sm text-muted-ink"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-foreground/60" />
          Available for new projects
        </span>

        <h1 className="mt-7 font-heading text-[clamp(2.7rem,7.4vw,6.4rem)] font-semibold leading-[0.92] lg:mt-8">
          <span data-hero="line-1" className="block">
            Your sales team is
          </span>
          <span data-hero="line-2" className="font-drama block font-normal text-dim">
            one automation away.
          </span>
        </h1>

        <p data-hero="para" className="mt-8 max-w-xl text-[15px] leading-relaxed text-dim sm:text-base lg:mt-10">
          Auctor Workflows is a two-person B2B AI automation agency. We build n8n workflows that
          capture leads, personalize outreach, and follow up automatically. Your calendar fills
          itself.
        </p>

        <p
          data-hero="founders"
          className="mt-5 text-sm text-muted-ink lg:mt-6"
        >
          Biruke Zeckariyas · Horeb Yohannes · Addis Ababa, Ethiopia
        </p>

        <div data-hero="cta" className="mt-9 flex flex-col gap-3 sm:flex-row sm:gap-4">
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

      <div className="mx-auto mt-12 w-full max-w-4xl border-t border-border sm:mt-16 lg:mt-20">
        <div className="grid sm:grid-cols-3">
          {stats.map((s) => (
            <div
              key={s.label}
              data-hero="stat"
              className="border-b border-border py-6 text-left last:border-b-0 sm:border-b-0 sm:border-r sm:px-8 sm:py-7 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0"
            >
              <div className="font-heading text-[2rem] font-semibold tracking-[-0.04em] leading-none text-foreground sm:text-4xl">
                {s.value}
              </div>
              <div className="mt-3 text-sm text-muted-ink">
                {s.label}
              </div>
            </div>
          ))}
        </div>
        <a
          href="#services"
          className="mt-8 inline-flex items-center gap-3 text-sm text-muted-ink transition-colors hover:text-foreground"
        >
          <span aria-hidden className="h-px w-10 bg-border" />
          Scroll
        </a>
      </div>
    </section>
  );
};

export default Hero;
