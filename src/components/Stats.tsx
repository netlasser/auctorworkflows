import { motion } from "framer-motion";
import logoMereb from "@/assets/logo-mereb.png";
import logoChapa from "@/assets/logo-chapa.png";
import logoAcuity from "@/assets/logo-acuity.png";
import logoLaven from "@/assets/logo-laven.png";

const logos = [
  { name: "Mereb Technologies", src: logoMereb },
  { name: "Chapa", src: logoChapa },
  { name: "Acuity Analytics", src: logoAcuity },
  { name: "Laven", src: logoLaven },
];

const Stats = () => (
  <section className="border-t border-border py-16">
    <div className="container mx-auto px-4 md:px-8">
      <div className="grid gap-12 md:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label">Why Felipe Workflows</span>
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
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            The future arrived faster than expected. Businesses today are drowning in repetitive work, manual processes, and data chaos — while the promise of AI feels out of reach: too complex, too expensive, too vague. We bridge that gap by building practical, revenue-driving automation systems tailored to your exact workflow. No fluff. No over-engineering. Just systems that save time and money from day one.
          </p>
          <button className="mt-4 self-start text-sm font-medium underline underline-offset-4 hover:text-foreground" onClick={() => document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" })}>
            Learn more about us →
          </button>
        </motion.div>
      </div>

      <div className="mt-12 flex flex-wrap items-center gap-8 border-t border-border pt-8">
        {logos.map((l) => (
          <img key={l.name} src={l.src} alt={l.name} className="h-8 object-contain opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all" />
        ))}
      </div>
    </div>
  </section>
);

export default Stats;
