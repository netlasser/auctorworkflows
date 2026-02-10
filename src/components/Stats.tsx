import { motion } from "framer-motion";

const stats = [
  { value: "50–90%", label: "Cost Reduction" },
  { value: "40+", label: "Hours Saved / Month" },
  { value: "99.8%", label: "Error Reduction" },
  { value: "3×", label: "Client Growth" },
];

const logos = ["Stratagem", "Zenith", "Beacon", "NovaTech", "Apex"];

const Stats = () => (
  <section className="border-y border-border/50 bg-secondary/30 py-16">
    <div className="container mx-auto px-4 md:px-8">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="text-center"
          >
            <div className="font-display text-3xl font-bold gradient-text md:text-4xl">{s.value}</div>
            <div className="mt-2 text-sm text-muted-foreground">{s.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="mt-12 flex flex-wrap items-center justify-center gap-8 opacity-40">
        {logos.map((l) => (
          <span key={l} className="font-display text-lg font-semibold tracking-wider text-muted-foreground">{l}</span>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
