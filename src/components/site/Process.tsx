import Reveal from "./Reveal";

const steps = [
  { title: "Discovery Call", desc: "30-minute call where I audit your current process and identify the highest-ROI automation opportunity." },
  { title: "Build & Test", desc: "I build your custom n8n workflow, integrate your tools, and test end-to-end with sample data." },
  { title: "Deploy & Train", desc: "Workflow goes live. I train your team on how it works and provide full documentation." },
  { title: "Optimize", desc: "We monitor performance, tweak based on real data, and add new automations as you scale." },
];

const Process = () => (
  <section id="process" className="px-[22px] py-[clamp(80px,10vw,130px)]">
    <div className="mx-auto w-full max-w-6xl">
      <Reveal className="max-w-2xl">
        <span className="section-label">How It Works</span>
        <h2 className="mt-4 font-display text-3xl md:text-4xl">From chaos to automation in 4 steps</h2>
        <p className="mt-4 text-dim">No complex onboarding. No lengthy contracts. Just results.</p>
      </Reveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((s, i) => (
          <Reveal key={s.title} delay={i * 80}>
            <div className="card-surface h-full p-6">
              <span className="font-logo text-2xl font-bold text-primary/70">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-4 font-display text-lg">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-dim">{s.desc}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Process;
