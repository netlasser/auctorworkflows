import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Sparkles, ArrowUpRight } from "lucide-react";
import { CAL_LINK } from "@/lib/site";

const StickyCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Appear after scrolling past hero (~400px)
      const scrolledPastHero = window.scrollY > 400;

      // Check if user is at the bottom contact/CTA section so it doesn't duplicate
      const contactSection = document.getElementById("contact");
      let inContactSection = false;
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
        // If contact section is currently in view
        if (rect.top < window.innerHeight - 100 && rect.bottom > 100) {
          inContactSection = true;
        }
      }

      setVisible(scrolledPastHero && !inContactSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          id="sticky-cta-container"
          initial={{ opacity: 0, y: 35, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 25, scale: 0.9, transition: { duration: 0.25 } }}
          transition={{
            duration: 0.45,
            ease: [0.16, 1, 0.3, 1],
          }}
          className="fixed bottom-5 right-5 z-40 sm:bottom-7 sm:right-7"
        >
          <motion.a
            id="sticky-book-consultation-btn"
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="group relative flex items-center gap-3 rounded-full border border-primary/40 bg-[hsl(var(--card))]/90 py-2.5 pl-4 pr-3.5 shadow-[0_14px_35px_-8px_rgba(210,155,74,0.4)] backdrop-blur-xl transition-all duration-300 hover:border-primary hover:bg-[hsl(var(--card-hover))] hover:shadow-[0_18px_45px_-6px_rgba(210,155,74,0.6)]"
            aria-label="Book a Consultation"
          >
            {/* Pulsing availability badge dot */}
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[hsl(var(--success))] opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[hsl(var(--success))]" />
            </span>

            {/* CTA Label */}
            <div className="flex flex-col text-left">
              <span className="whitespace-nowrap font-sans text-xs font-semibold tracking-wide text-foreground group-hover:text-primary-light">
                Book a Consultation
              </span>
              <span className="hidden whitespace-nowrap text-[10px] text-muted-ink sm:inline-flex items-center gap-1">
                <Sparkles className="h-2.5 w-2.5 text-primary" /> Free 30-Min Call
              </span>
            </div>

            {/* Glowing Accent Button Icon */}
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary to-[hsl(var(--accent))] text-primary-foreground shadow-md transition-transform duration-300 group-hover:scale-105">
              <CalendarCheck className="h-4 w-4 transition-transform duration-300 group-hover:hidden" />
              <ArrowUpRight className="hidden h-4 w-4 transition-transform duration-300 group-hover:block" />
            </div>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default StickyCTA;
