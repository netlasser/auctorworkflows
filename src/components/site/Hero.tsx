import { motion, type Variants } from "framer-motion";
import { CalendarCheck, Code2, MapPin } from "lucide-react";
import biruke from "@/assets/Biruke.jpg";
import horeb from "@/assets/Horeb.jpg";
import { CAL_LINK, GITHUB_LINK } from "@/lib/site";

const chips = ["n8n", "OpenAI", "Apollo.io", "SendGrid"];

const stats = [
  { value: "38%", label: "Avg. Cold Email Reply Rate" },
  { value: "<5s", label: "Lead Response Time" },
  { value: "10+ hrs", label: "Saved Per Week" },
];

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.15,
    },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 22 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.65,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 32, scale: 0.96 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.8,
      delay: 0.3,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const chipVariants: Variants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const statsContainerVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
      delay: 0.55,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1,
      delayChildren: 0.65,
    },
  },
};

const statItemVariants: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

const Hero = () => (
  <section id="top" className="px-[22px] pb-16 pt-28 sm:pt-32 lg:pt-36">
    <div className="mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[1fr_380px]">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={itemVariants}
          className="font-display text-4xl leading-[1.08] tracking-tight md:text-6xl"
        >
          Your sales team is <em className="gradient-text not-italic md:italic">one automation away</em>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-xl text-base leading-relaxed text-dim"
        >
          We're Auctor Workflows — a two-person B2B AI automation agency. We build intelligent n8n workflows that
          capture leads, personalize outreach, and follow up automatically. Your calendar fills itself while you
          sleep.
        </motion.p>

        <motion.div
          variants={itemVariants}
          className="mt-8 flex flex-col gap-3 sm:flex-row"
        >
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-glow inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3.5 text-sm font-semibold"
          >
            <CalendarCheck className="h-4 w-4" /> Book Free 30-Min Assessment
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            href={GITHUB_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-border px-6 py-3.5 text-sm font-semibold text-dim transition-colors hover:border-[hsl(var(--border-hover))] hover:text-foreground"
          >
            <Code2 className="h-4 w-4" /> View Our Work
          </motion.a>
        </motion.div>
      </motion.div>

      <motion.div
        variants={cardVariants}
        initial="hidden"
        animate="visible"
        className="relative"
      >
        <div className="absolute -top-4 left-1/2 z-10 flex -translate-x-1/2 items-center gap-2 whitespace-nowrap rounded-full border border-border bg-[hsl(var(--card-hover))] px-3.5 py-1.5 text-xs text-dim shadow-lg">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--success))] opacity-70" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(var(--success))]" />
          </span>
          Available for new projects
        </div>

        <div className="card-surface p-6 pt-10 text-center">
          <div className="flex items-end justify-center">
            <div
              className="h-28 w-28 rounded-full p-[3px]"
              style={{ background: "linear-gradient(135deg, #d29b4a, #b06d2e, #f0c586)" }}
            >
              <img src={biruke} alt="Portrait of Biruke Zeckariyas" className="h-full w-full rounded-full object-cover" />
            </div>
            <div
              className="-ml-6 mb-3 h-24 w-24 rounded-full p-[3px]"
              style={{ background: "linear-gradient(135deg, #d29b4a, #b06d2e, #f0c586)" }}
            >
              <img src={horeb} alt="Portrait of Horeb Yohannes" className="h-full w-full rounded-full object-cover" />
            </div>
          </div>
          <h2 className="mt-5 font-display text-xl">Auctor Workflows</h2>
          <p className="mt-1 text-sm text-primary">B2B AI Automation Agency</p>
          <p className="mt-2 text-xs text-dim">
            Biruke Zeckariyas · Horeb Yohannes
          </p>
          <p className="mt-2 inline-flex items-center justify-center gap-1.5 text-xs text-muted-ink">
            <MapPin className="h-3.5 w-3.5" /> Addis Ababa, Ethiopia
          </p>
          <motion.div
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.08, delayChildren: 0.5 }}
            className="mt-5 flex flex-wrap justify-center gap-2"
          >
            {chips.map((c) => (
              <motion.span
                key={c}
                variants={chipVariants}
                className="rounded-full border border-border px-3 py-1 text-xs text-dim"
              >
                {c}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>

    <motion.div
      variants={statsContainerVariants}
      initial="hidden"
      animate="visible"
      className="mx-auto mt-16 w-full max-w-6xl"
    >
      <div className="card-surface grid divide-y divide-border sm:grid-cols-3 sm:divide-x sm:divide-y-0">
        {stats.map((s) => (
          <motion.div
            key={s.label}
            variants={statItemVariants}
            className="px-6 py-7 text-center"
          >
            <div className="font-logo text-3xl font-bold text-primary">{s.value}</div>
            <div className="mt-1.5 text-xs uppercase tracking-wider text-muted-ink">{s.label}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </section>
);

export default Hero;
