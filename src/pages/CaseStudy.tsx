import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { caseStudies } from "@/components/Work";

const CaseStudy = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const study = caseStudies.find((s) => s.id === id);

  if (!study) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground">Case study not found</h1>
          <Button onClick={() => navigate("/")} className="mt-4 rounded-full" variant="outline">
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Back nav */}
      <div className="container mx-auto px-4 pt-8 md:px-8">
        <button
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Back to Home
        </button>
      </div>

      {/* Hero */}
      <section className="container mx-auto px-4 py-12 md:px-8 md:py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-3xl"
        >
          <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
            {study.tag}
          </span>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">{study.title}</h1>
          <p className="mt-2 text-lg text-muted-foreground">Client: {study.client}</p>

          {/* Stats */}
          <div className="mt-8 grid grid-cols-3 gap-4 rounded-2xl border border-border bg-muted/30 p-6">
            {study.stats.map((s) => (
              <div key={s.label} className="text-center">
                <span className="block text-3xl font-bold text-foreground">{s.value}</span>
                <span className="text-xs uppercase tracking-wider text-muted-foreground">{s.label}</span>
              </div>
            ))}
          </div>

          {/* Tech */}
          <div className="mt-6 flex flex-wrap gap-2">
            {study.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-border bg-muted/40 px-4 py-1.5 text-xs font-medium uppercase tracking-wider text-muted-foreground"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Content sections */}
      <section className="container mx-auto px-4 pb-20 md:px-8">
        <div className="mx-auto max-w-3xl space-y-12">
          {study.fullDescription && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold">Overview</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{study.fullDescription}</p>
            </motion.div>
          )}

          {study.challenge && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold">The Challenge</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{study.challenge}</p>
            </motion.div>
          )}

          {study.solution && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold">Our Solution</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{study.solution}</p>
            </motion.div>
          )}

          {study.results && (
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <h2 className="text-2xl font-bold">Results</h2>
              <p className="mt-3 text-muted-foreground leading-relaxed">{study.results}</p>
            </motion.div>
          )}

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-border bg-muted/30 p-8 text-center"
          >
            <h3 className="text-xl font-bold">Ready to transform your workflow?</h3>
            <p className="mt-2 text-sm text-muted-foreground">
              Let's discuss how we can build something similar for your business.
            </p>
            <Button className="mt-4 rounded-full bg-foreground px-8 text-background hover:bg-foreground/80" asChild>
              <a href="https://cal.com/biruke-felipe/30-minutes-assessment-call" target="_blank" rel="noopener noreferrer">
                Book a Call <ArrowUpRight className="ml-1 h-4 w-4" />
              </a>
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default CaseStudy;
