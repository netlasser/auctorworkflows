import { motion } from "framer-motion";

const logos = ["DIGITAL JOURNAL", "yahoo!", "Bloomberg", "Business Insider", "TechCrunch"];

const Stats = () => (
  <section className="border-t border-border py-16">
    <div className="container mx-auto px-4 md:px-8">
      <div className="grid gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label">Backed by LeftClick</span>
          <h2 className="mt-4 font-display text-3xl font-bold leading-tight md:text-4xl">
            50–90% cost reduction<br />(& hours saved).
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="flex flex-col justify-center"
        >
          <p className="text-sm leading-relaxed text-muted-foreground">
            We craft AI workflow systems that eliminate repetitive tasks, cut overhead by 50–90%, and ship sustainable ROI. Our team has built automation systems for agencies, e-commerce brands, and content firms — delivering measurable results every time.
          </p>
          <button className="mt-4 self-start text-sm font-medium underline underline-offset-4 hover:text-foreground">
            Read more
          </button>
        </motion.div>
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-8 border-t border-border pt-8">
        {logos.map((l) => (
          <span key={l} className="font-display text-sm font-semibold tracking-wider text-muted-foreground/60">{l}</span>
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
