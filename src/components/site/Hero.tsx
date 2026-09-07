import { CalendarCheck, Code2, MapPin, Sparkles } from "lucide-react";
import profile from "@/assets/bz-profile.jpg";
import { CAL_LINK, GITHUB_LINK } from "@/lib/site";
import Reveal from "./Reveal";

const chips = ["n8n", "OpenAI", "Apollo.io", "SendGrid"];

const stats = [
  { value: "38%", label: "Avg. Cold Email Reply Rate" },
  { value: "<5s", label: "Lead Response Time" },
  { value: "10+ hrs", label: "Saved Per Week" },
];

const Hero = () => (
  <section id="top" className="px-[22px] pb-16 pt-32 md:pt-40">
    <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1fr_380px]">
      <Reveal>
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs text-dim">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--success))] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--success))]" />
          </span>
          <Sparkles className="h-3.5 w-3.5 text-primary" />
          B2B AI Automation Engineer
        </div>

        <h1 className="mt-6 font-display text-4xl leading-[1.08] tracking-tight md:text-6xl">
          Your sales team is <em className="gradient-text not-italic md:italic">one automation away</em>
        </h1>

        <p className="mt-6 max-w-xl text-base leading-relaxed text-dim">
          I'm Biruke Zeckariyas — a B2B AI automation engineer. I build intelligent n8n workflows that capture leads,
          personalize outreach, and follow up automatically. Your calendar fills itself while you sleep.
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-glow inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold"
          >
            <CalendarCheck className="h-4 w-4" /> Book Free 30-Min Assessment
          </a>
          <a
            href={GITHUB_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3.5 text-sm font-semibold text-dim transition-colors hover:border-[hsl(var(--border-hover))] hover:text-foreground"
          >
            <Code2 className="h-4 w-4" /> View My Work
          </a>
        </div>
      </Reveal>

      <Reveal delay={120}>
        <div className="relative">
          <div className="absolute -top-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-[hsl(var(--card-hover))] px-3.5 py-1.5 text-xs text-dim shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--success))] opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--success))]" />
            </span>
            Available for new projects
          </div>

          <div className="card-surface p-6 pt-10 text-center">
            <div
              className="mx-auto h-32 w-32 rounded-full p-[3px]"
              style={{ background: "linear-gradient(135deg, #d29b4a, #b06d2e, #f0c586)" }}
            >
              <img src={profile} alt="Portrait of Biruke Zeckariyas" className="h-full w-full rounded-full object-cover" />
            </div>
            <h2 className="mt-5 font-display text-xl">Biruke Zeckariyas</h2>
            <p className="mt-1 text-sm text-primary">B2B AI Automation Engineer</p>
            <p className="mt-2 inline-flex items-center gap-1.5 text-xs text-muted-ink">
              <MapPin className="h-3.5 w-3.5" /> Addis Ababa, Ethiopia
            </p>
            <div className="mt-5 flex flex-wrap justify-center gap-2">
              {chips.map((c) => (
                <span key={c} className="rounded-full border border-border px-3 py-1 text-xs text-dim">
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </div>

    <Reveal className="mx-auto mt-16 w-full max-w-6xl">
      <div className="card-surface grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((s) => (
          <div key={s.label} className="px-6 py-7 text-center">
            <div className="font-logo text-3xl font-bold text-primary">{s.value}</div>
            <div className="mt-1.5 text-xs uppercase tracking-wider text-muted-ink">{s.label}</div>
          </div>
        ))}
      </div>
    </Reveal>
  </section>
);

export default Hero;
