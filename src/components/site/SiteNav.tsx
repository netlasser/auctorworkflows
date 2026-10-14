import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { CAL_LINK } from "@/lib/site";
import MagneticButton from "@/components/ui/MagneticButton";

const links = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Team", href: "#team" },
];

const SiteNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4 pt-[env(safe-area-inset-top)]">
      <div
        className={`ease-cinematic w-full max-w-4xl rounded-full border px-2.5 py-2.5 transition-all duration-500 ${
          scrolled || open
            ? "border-border bg-background/60 shadow-[0_16px_50px_-24px_rgba(0,0,0,0.9)] backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <div className="flex items-center justify-between gap-3">
          <a href="#top" className="flex items-center gap-2.5 pl-2">
            <img
              src="/logo.png"
              alt="Auctor Workflows logo"
              className="h-10 w-10 rounded-full object-contain sm:h-11 sm:w-11"
            />
            <span className="font-heading text-sm font-semibold tracking-tight">
              Auctor <span className="text-dim">Workflows</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="lift rounded-full px-3.5 py-2 text-sm text-dim hover:text-foreground active:opacity-70"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <MagneticButton
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                strength={0.18}
                className="px-5 py-2.5 text-xs font-semibold"
              >
                Book a Call
              </MagneticButton>
            </div>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={open}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-card active:scale-95 lg:hidden"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={open ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="flex items-center justify-center"
                >
                  {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </div>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="overflow-hidden lg:hidden"
            >
              <div className="mt-2.5 flex flex-col gap-1 rounded-[1.75rem] border border-border bg-card/95 p-3 shadow-2xl backdrop-blur-xl">
                {links.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.04 * i + 0.05, duration: 0.25 }}
                    className="flex min-h-[44px] items-center rounded-2xl px-4 py-2 text-sm font-medium text-dim transition-colors hover:bg-primary/10 hover:text-foreground active:bg-primary/10"
                  >
                    {l.label}
                  </motion.a>
                ))}
                <motion.a
                  href={CAL_LINK}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * links.length + 0.06, duration: 0.25 }}
                  className="mt-1.5 flex min-h-[48px] items-center justify-center rounded-2xl bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground active:scale-[0.98]"
                >
                  Book a Call
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
};

export default SiteNav;
