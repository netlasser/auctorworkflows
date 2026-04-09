import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WebcamPixelGrid } from "@/components/ui/webcam-pixel-grid";

const Hero = () => {
  return (
    <section className="relative pt-14 overflow-hidden">
      {/* Webcam pixel grid background */}
      <div className="absolute inset-0 top-14">
        <WebcamPixelGrid
          gridCols={64}
          gridRows={48}
          colorMode="monochrome"
          monochromeColor="#888888"
          backgroundColor="hsl(0, 0%, 100%)"
          darken={0.3}
          borderOpacity={0.04}
          gapRatio={0.08}
          maxElevation={10}
          motionSensitivity={0.5}
          onWebcamReady={() => console.log("Webcam ready!")}
          onWebcamError={(err) => console.error("Webcam error:", err)}
        />
      </div>

      {/* Gradient overlay for text readability */}
      <div className="pointer-events-none absolute inset-0 top-14 bg-gradient-to-b from-background/80 via-background/60 to-background" />

      <div className="container relative z-10 mx-auto px-4 pb-16 pt-16 md:px-8 md:pt-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center"
        >
          <h1 className="font-display text-4xl font-bold leading-[1.1] tracking-tight md:text-5xl lg:text-6xl">
            Stop Hiring for Problems AI Already Solved.
          </h1>

          <div className="mt-8">
            <Button
              size="lg"
              className="rounded-full bg-foreground px-8 text-background hover:bg-foreground/80"
              asChild
            >
              <a href="https://cal.com/biruke-felipe/30min" target="_blank" rel="noopener noreferrer">Get a Call</a>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
