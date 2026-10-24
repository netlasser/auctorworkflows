import Reveal from "./Reveal";
import biruke from "@/assets/Biruke.jpg";
import horeb from "@/assets/Horeb.jpg";

interface TeamMember {
  name: string;
  role: string;
  bio: string;
  focus: string[];
  image: string;
}

const members: TeamMember[] = [
  {
    name: "Biruke Zeckariyas",
    role: "B2B AI Automation Engineer",
    bio: "Engineers every n8n pipeline, AI prompt, and API integration from the ground up — architecting automations that run reliably in production around the clock.",
    focus: ["n8n Architecture", "AI Prompt Engineering", "API Integrations"],
    image: biruke,
  },
  {
    name: "Horeb Yohannes",
    role: "VP-Manager",
    bio: "Owns delivery, timelines, and communication — stress-testing every build, guarding the milestones, and making sure each workflow meets spec before it goes live.",
    focus: ["Client Delivery", "QA & Stress Testing", "Milestone Ops"],
    image: horeb,
  },
];

const Members = () => (
  <section id="team" className="px-[22px] py-[clamp(80px,10vw,130px)]">
    <div className="mx-auto w-full max-w-5xl">
      <Reveal>
        <div className="border-t border-border pt-6">
          <h2 className="font-heading text-[clamp(1.9rem,3.4vw,3rem)] font-semibold tracking-[-0.025em]">
            Two specialists, one accountable team
          </h2>
          <p className="mt-4 max-w-2xl text-dim">
            Every engagement pairs an expert builder with a dedicated delivery lead, so you get
            depth of engineering and the discipline to ship on time.
          </p>
        </div>
      </Reveal>

      <div className="mt-10 grid gap-5 md:gap-6 md:grid-cols-2 lg:gap-8">
        {members.map((m, i) => (
          <Reveal key={m.name} delay={i * 120} className="h-full">
            <article className="card-surface flex h-full gap-5 p-5 sm:p-6 lg:gap-6 lg:p-7">
              <img
                src={m.image}
                alt={`Portrait of ${m.name}`}
                className="h-24 w-20 shrink-0 rounded-2xl object-cover object-top grayscale sm:h-28 sm:w-24 lg:h-32 lg:w-28"
              />
              <div className="min-w-0">
                <h3 className="font-heading text-lg lg:text-xl">{m.name}</h3>
                <p className="mt-0.5 text-sm text-muted-ink">{m.role}</p>
                <p className="mt-2 text-xs sm:text-sm leading-relaxed text-dim">{m.bio}</p>
                <div className="mt-3 flex flex-wrap gap-1.5">
                  {m.focus.map((f) => (
                    <span
                      key={f}
                      className="rounded-full border border-border px-2.5 py-0.5 text-xs text-muted-ink"
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
