import { motion } from "framer-motion";
import caseStudy1 from "@/assets/case-study-1.png";
import caseStudy2 from "@/assets/case-study-2.png";
import caseStudy3 from "@/assets/case-study-3.png";
import caseStudy4 from "@/assets/case-study-4.png";
import caseStudy5 from "@/assets/case-study-5.png";

const projects = [
  { title: "Lead Automation", category: "Sales Systems", span: "md:col-span-1 md:row-span-2", image: caseStudy1 },
  { title: "Content Pipeline", category: "Content Systems", span: "md:col-span-1", image: caseStudy2 },
  { title: "CRM Integration", category: "Business Dev", span: "md:col-span-1", image: caseStudy3 },
  { title: "Ad Operations", category: "Marketing Ops", span: "md:col-span-1", image: caseStudy4 },
  { title: "Reporting Dashboard", category: "Analytics", span: "md:col-span-1", image: caseStudy5 },
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
            className={`group relative overflow-hidden rounded-xl border border-border ${p.span}`}
          >
            <div
              className={`relative flex flex-col justify-end ${i === 0 ? "min-h-[320px] md:min-h-[400px]" : "min-h-[200px]"}`}
            >
              <img
                src={p.image}
                alt={p.title}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
              <div className="relative z-10 mt-auto p-6">
                <span className="text-xs text-white/70">{p.category}</span>
                <h3 className="font-display text-lg font-semibold text-white">{p.title}</h3>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default Work;
