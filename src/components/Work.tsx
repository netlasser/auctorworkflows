import { motion } from "framer-motion";

const projects = [
  { title: "Lead Automation", category: "Sales Systems", span: "md:col-span-1 md:row-span-2", bg: "bg-muted" },
  { title: "Content Pipeline", category: "Content Systems", span: "md:col-span-1", bg: "bg-secondary" },
  { title: "CRM Integration", category: "Business Dev", span: "md:col-span-1", bg: "bg-muted" },
  { title: "Ad Operations", category: "Marketing Ops", span: "md:col-span-1", bg: "bg-secondary" },
  { title: "Reporting Dashboard", category: "Analytics", span: "md:col-span-1", bg: "bg-muted" },
];

const Work = () => (
  <section id="work" className="border-t border-border py-16">
    <div className="container mx-auto px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-label">Case Studies</span>
        <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">Some of our work.</h2>
      </motion.div>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        {projects.map((p, i) => (
          <motion.div
            key={p.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08 }}
            className={`group relative overflow-hidden rounded-xl border border-border ${p.bg} ${p.span}`}
          >
            <div className={`flex flex-col justify-end p-6 ${i === 0 ? "min-h-[320px] md:min-h-[400px]" : "min-h-[200px]"}`}>
              <div className="mt-auto">
                <span className="text-xs text-muted-foreground">{p.category}</span>
                <h3 className="font-display text-lg font-semibold">{p.title}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Work;
