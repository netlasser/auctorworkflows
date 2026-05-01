import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

const STORAGE_KEY = "campaign-concierge-dismissed";

const setBannerHeightVar = (px: number) => {
  if (typeof document === "undefined") return;
  document.documentElement.style.setProperty("--campaign-banner-h", `${px}px`);
};

const CampaignBanner = () => {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (localStorage.getItem(STORAGE_KEY) !== "1") setVisible(true);
    else setBannerHeightVar(0);
  }, []);

  useEffect(() => {
    if (!visible) {
      setBannerHeightVar(0);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const measure = () => setBannerHeightVar(el.offsetHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, [visible]);

  const dismiss = () => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  };

  const goToSection = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById("concierge")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence initial={false}>
      {visible && (
        <motion.div
          ref={ref}
          initial={{ y: "-100%" }}
          animate={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed left-0 right-0 top-0 z-[60] w-full border-b border-border bg-foreground text-background"
          role="region"
          aria-label="Campaign announcement"
        >
          <div className="container mx-auto flex items-center gap-3 px-4 py-2.5 md:px-8">
            <span className="hidden items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-background/60 md:inline-flex">
              <span aria-hidden="true" className="h-1.5 w-1.5 rounded-full bg-background" />
              New · Real Estate
            </span>
            <span aria-hidden="true" className="hidden h-3 w-px bg-background/20 md:block" />
            <p className="flex-1 truncate text-xs md:text-sm">
              <span className="font-semibold">The Lead-Leakage Shield</span>
              <span className="hidden text-background/70 md:inline">
                {" "}— AI WhatsApp Concierge for property developers.
              </span>
            </p>
            <a
              href="#concierge"
              onClick={goToSection}
              className="group inline-flex shrink-0 items-center gap-1.5 rounded text-xs font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-foreground md:text-sm"
            >
              See how it works
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </a>
            <button
              type="button"
              onClick={dismiss}
              aria-label="Dismiss campaign banner"
              className="ml-1 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-background/70 transition hover:bg-background/10 hover:text-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-background focus-visible:ring-offset-2 focus-visible:ring-offset-foreground"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CampaignBanner;
