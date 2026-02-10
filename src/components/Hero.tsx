import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const Hero = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16">
      {/* Background glow */}
      <div className="hero-glow pointer-events-none absolute inset-0" />
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/10 blur-[120px] animate-pulse-glow" />

      <div className="container relative z-10 mx-auto px-4 text-center md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="mx-auto max-w-4xl"
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse-glow" />
            AI-Powered Workflow Automation
          </div>

          <h1 className="font-display text-4xl font-bold leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Stop Hiring for Problems{" "}
            <span className="gradient-text">AI Already Solved</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl">
            We craft AI workflow systems that eliminate repetitive tasks, cut overhead by 50–90%, and ship sustainable ROI.
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button size="lg" className="gap-2 bg-primary px-8 text-base hover:bg-primary/80" onClick={() => scrollTo("#contact")}>
              Book a Call <ArrowRight className="h-4 w-4" />
            </Button>
            <Button size="lg" variant="outline" className="gap-2 border-border px-8 text-base hover:bg-secondary" onClick={() => scrollTo("#services")}>
              <Play className="h-4 w-4" /> See Our Work
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
