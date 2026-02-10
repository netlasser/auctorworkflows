import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

const Hero = () => {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative pt-14">
      {/* Diagonal lines background */}
      <div className="pointer-events-none absolute right-0 top-14 h-32 w-1/2 overflow-hidden opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div key={i} className="absolute h-px w-full bg-foreground" style={{ top: `${i * 8}px`, transform: "rotate(-30deg)", transformOrigin: "right center" }} />
        ))}
      </div>

      <div className="container mx-auto px-4 pb-16 pt-16 md:px-8 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl"
        >
          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            Stop Hiring for Problems AI Already Solved.
          </h1>

          <div className="mt-8">
            <Button
              size="lg"
              className="rounded-full bg-foreground px-8 text-background hover:bg-foreground/80"
              onClick={() => scrollTo("#contact")}
            >
              Get a Call
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
