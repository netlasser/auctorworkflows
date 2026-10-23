import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CalendarCheck, Sparkles, ArrowUpRight } from "lucide-react";
import { CAL_LINK } from "@/lib/site";

const StickyCTA = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrolledPastHero = window.scrollY > 400;

      const contactSection = document.getElementById("contact");
      let inContactSection = false;
      if (contactSection) {
        const rect = contactSection.getBoundingClientRect();
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
          transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-[calc(1.25rem+env(safe-area-inset-bottom))] right-[calc(1.25rem+env(safe-area-inset-right))] z-40 sm:bottom-[calc(1.75rem+env(safe-area-inset-bottom))] sm:right-[calc(1.75rem+env(safe-area-inset-right))]"
        >
          <motion.a
            id="sticky-book-consultation-btn"
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.96 }}
            className="group relative flex items-center gap-3 rounded-full border border-border bg-card/90 py-2.5 pl-4 pr-3.5 shadow-[0_14px_35px_-8px_rgba(0,0,0,0.8)] backdrop-blur-xl transition-all duration-300 hover:border-[hsl(var(--border-hover))] hover:bg-[hsl(var(--card-hover))]"
            aria-label="Book a Consultation"
          >
            <span className="relative flex h-2.5 w-2.5 flex-shrink-0">
              <span className="pulse-dot absolute inline-flex h-full w-full rounded-full bg-[hsl(var(--success))]" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[hsl(var(--success))]" />
            </span>

            <div className="flex flex-col text-left">
              <span className="whitespace-nowrap text-xs font-semibold tracking-wide text-foreground group-hover:text-primary">
                Book a call
              </span>
              <span className="hidden items-center gap-1 whitespace-nowrap text-[10px] text-muted-ink sm:inline-flex">
                <Sparkles className="h-2.5 w-2.5 text-primary" /> Free 30-Min Call
              </span>
            </div>

            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-md transition-transform duration-300 group-hover:scale-105">
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
