import Reveal from "./Reveal";
import biruke from "@/assets/Biruke.jpg";
import horeb from "@/assets/Horeb.jpg";

interface TeamMember {
  name: string;
  role: string;
  tagline: string;
  bio: string;
  focus: string[];
  image: string;
}

const members: TeamMember[] = [
  {
    name: "Biruke Zeckariyas",
    role: "B2B AI Automation Engineer",
    tagline: "Lead architect & builder",
    bio: "Engineers every n8n pipeline, AI prompt, and API integration from the ground up — architecting automations that run reliably in production around the clock.",
    focus: ["n8n Architecture", "AI Prompt Engineering", "API Integrations"],
    image: biruke,
  },
  {
    name: "Horeb Yohannes",
    role: "VP-Manager",
    tagline: "Delivery, client ops & quality control",
    bio: "Owns delivery, timelines, and communication — stress-testing every build, guarding the milestones, and making sure each workflow meets spec before it goes live.",
    focus: ["Client Delivery", "QA & Stress Testing", "Milestone Ops"],
    image: horeb,
  },
];

const Team = () => (
  <section id="team" className="px-[22px] py-[clamp(80px,10vw,130px)]">
    <div className="mx-auto w-full max-w-6xl">
      <Reveal className="max-w-2xl">
        <span className="section-label">Our Team</span>
        <h2 className="mt-4 font-display text-3xl md:text-4xl">Two specialists, one accountable team</h2>
        <p className="mt-4 text-dim">
          Every engagement pairs an expert builder with a dedicated delivery lead — so you get depth of engineering
          and the discipline to ship on time.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {members.map((m, i) => (
          <Reveal key={m.name} delay={i * 120} className="h-full">
            <article className="card-surface group h-full overflow-hidden">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={m.image}
                  alt={`Portrait of ${m.name}`}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--card))] via-transparent to-transparent opacity-70" />
              </div>

              <div className="p-6 sm:p-7">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <h3 className="font-display text-xl">{m.name}</h3>
                  <span className="rounded-full border border-primary/30 bg-[hsl(var(--card-hover))] px-3 py-1 text-[11px] font-semibold text-foreground">
                    {m.role}
                  </span>
                </div>
                <p className="mt-1.5 text-sm font-medium text-primary">{m.tagline}</p>
                <p className="mt-3 text-sm leading-relaxed text-dim">{m.bio}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {m.focus.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-border bg-background/50 px-3 py-1 text-xs text-muted-ink"
                    >
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Team;