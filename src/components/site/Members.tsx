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
  index: string;
}

const members: TeamMember[] = [
  {
    name: "Biruke Zeckariyas",
    role: "B2B AI Automation Engineer",
    tagline: "Lead architect & builder",
    bio: "Engineers every n8n pipeline, AI prompt, and API integration from the ground up — architecting automations that run reliably in production around the clock.",
    focus: ["n8n Architecture", "AI Prompt Engineering", "API Integrations"],
    image: biruke,
    index: "01",
  },
  {
    name: "Horeb Yohannes",
    role: "VP-Manager",
    tagline: "Delivery, client ops & quality control",
    bio: "Owns delivery, timelines, and communication — stress-testing every build, guarding the milestones, and making sure each workflow meets spec before it goes live.",
    focus: ["Client Delivery", "QA & Stress Testing", "Milestone Ops"],
    image: horeb,
    index: "02",
  },
];

const Members = () => (
  <section id="team" className="px-[22px] py-[clamp(80px,10vw,130px)]">
    <div className="mx-auto w-full max-w-6xl">
      <Reveal className="max-w-2xl">
        <span className="section-label">Our Team</span>
        <h2 className="mt-4 font-heading text-3xl md:text-5xl">
          Two specialists, one accountable team
        </h2>
        <p className="mt-4 text-dim">
          Every engagement pairs an expert builder with a dedicated delivery lead — so you get
          depth of engineering and the discipline to ship on time.
        </p>
      </Reveal>

      <div className="mt-14 grid gap-8 md:grid-cols-2">
        {members.map((m, i) => (
          <Reveal key={m.name} delay={i * 140} className="h-full">
            <article className="group relative h-full">
              <div className="relative overflow-hidden rounded-[2.5rem] border border-border">
                <div className="relative aspect-[4/5]">
                  <img
                    src={m.image}
                    alt={`Portrait of ${m.name}`}
                    className="dur-900 ease-cinematic h-full w-full object-cover object-top grayscale transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[hsl(var(--background))] via-[hsl(var(--background))]/10 to-transparent" />
                </div>

                <span className="absolute right-6 top-6 font-data text-xs text-foreground/60">
                  {m.index}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-7 sm:p-8">
                  <span className="inline-flex rounded-full border border-border bg-background/60 px-3 py-1 text-[11px] font-medium text-dim backdrop-blur-md">
                    {m.role}
                  </span>
                  <h3 className="font-drama mt-4 text-3xl font-normal sm:text-4xl">{m.name}</h3>
                  <p className="mt-1 text-sm text-primary">{m.tagline}</p>
                </div>
              </div>

              <div className="px-2 pt-5">
                <p className="text-sm leading-relaxed text-dim">{m.bio}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {m.focus.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-border bg-background/50 px-3 py-1 font-data text-[11px] text-muted-ink"
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

export default Members;
