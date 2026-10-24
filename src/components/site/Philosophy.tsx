import { useEffect, useRef } from "react";
import { KeyRound, ShieldCheck, Video, Zap } from "lucide-react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

const principles = [
  {
    title: "Zero Vendor Lock-In",
    desc: "You own 100% of the workflow logic, code, and accounts. We provide raw JSON export files that you can import into any n8n instance at any time.",
    icon: KeyRound,
  },
  {
    title: "Asynchronous Respect",
    desc: "No endless status meetings. We share concise Loom video demos and written milestone logs, reserving live calls purely for high-value strategic decisions.",
    icon: Video,
  },
  {
    title: "Fail-Safe By Design",
    desc: "Every automation includes automated error-catching nodes, dead-letter queues, and instant Slack/Telegram notifications so not a single lead is ever lost.",
    icon: ShieldCheck,
  },
  {
    title: "Milestone-Backed Trust",
    desc: "Work is divided into clear, reviewable phases. You only release milestone payments once you verify the automation working in sandbox or production.",
    icon: Zap,
  },
];

const statementA = "Anyone can connect two apps together.";
const statementB = "We engineer automations that hold under real traffic, bad data, and 3am.";

const splitWords = (text: string, prefix: string) =>
  text.split(" ").map((word, i) => (
    <span
      key={`${prefix}-${i}`}
      className="mr-[0.28em] inline-block overflow-hidden pb-[0.14em] align-bottom"
    >
      <span className="inline-block" data-word>
        {word}
      </span>
    </span>
  ));

const Philosophy = () => {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set("[data-word]", { yPercent: 0 });
        gsap.set("[data-texture]", { yPercent: 0 });
        return;
      }

      gsap.from("[data-manifesto-a]", {
        y: 30,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: "[data-manifesto-a]", start: "top 82%" },
      });

      gsap.from("[data-word]", {
        yPercent: 110,
        duration: 0.9,
        ease: "power3.out",
        stagger: 0.08,
        scrollTrigger: { trigger: "[data-manifesto-b]", start: "top 80%" },
      });

      gsap.to("[data-texture]", {
        yPercent: -18,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      ScrollTrigger.refresh();
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="philosophy"
      ref={root}
      className="relative overflow-hidden border-y border-border/70 px-[22px] py-[clamp(90px,12vw,160px)]"
    >
      <div
        aria-hidden
        data-texture
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 dot-grid opacity-[0.18]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_60%_at_75%_40%,hsl(var(--card))_0%,transparent_65%)]" />
      </div>

      <div className="mx-auto w-full max-w-5xl">
        <p
          data-manifesto-a
          className="border-t border-border pt-8 max-w-xl text-lg text-muted-ink sm:text-xl lg:pt-10"
        >
          {statementA}
        </p>

        <h2
          data-manifesto-b
          className="font-drama mt-4 max-w-4xl text-[clamp(2rem,5.4vw,4.4rem)] font-normal leading-[1.05] text-foreground"
        >
          {splitWords(statementB, "b")}
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-4 sm:gap-5 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-6">
          {principles.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.title}
                className="group flex h-full flex-col rounded-[1.75rem] border border-border bg-card/50 p-5 sm:p-6 lg:p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[hsl(var(--border-hover))] hover:bg-card"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-border bg-[hsl(var(--card-hover))] text-primary transition-transform group-hover:scale-110">
                  <Icon className="h-4 w-4" />
                </div>
                <h3 className="mt-4 font-heading text-sm lg:text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-dim">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
