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

const sectionIds = ["services", "process", "pricing", "team", "testimonials", "contact"];

const SiteNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("");
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      const h = document.documentElement;
      const p = (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)) * 100;
      setProgress(p);
      let current = "";
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (!el) continue;
        const r = el.getBoundingClientRect();
        if (r.top <= 140) current = id;
      }
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-[env(safe-area-inset-top)]">
      <div className="absolute inset-x-0 top-0 h-px bg-border">
        <div className="h-px bg-foreground/40" style={{ width: `${progress}%` }} />
      </div>
      <div
        className={`ease-cinematic mt-2 w-full max-w-6xl border px-2 py-1.5 transition-all duration-500 ${
          scrolled || open
            ? "border-border bg-background/80 backdrop-blur"
            : "border-transparent bg-transparent"
        }`}
        style={{ borderRadius: "999px" }}
      >
        <div className="flex items-center justify-between gap-3">
          <a href="#top" className="flex items-center gap-2.5 pl-2">
            <img
              src="/logo.png"
              alt="Auctor Workflows logo"
              className="h-9 w-9 rounded-full object-contain sm:h-10 sm:w-10"
            />
            <span className="font-heading text-sm font-semibold tracking-[-0.02em]">
              Auctor <span className="text-muted-ink">Workflows</span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 lg:flex">
            {links.map((l) => {
              const id = l.href.replace("#", "");
              const isActive = active === id;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  aria-current={isActive ? "page" : undefined}
                className={`group relative rounded-full px-3.5 py-1.5 text-sm transition-colors ${isActive ? "text-foreground" : "text-muted-ink hover:text-foreground"}`}
              >
                {l.label}
                <span className={`absolute inset-x-3.5 bottom-1 h-px bg-foreground transition-transform duration-300 ${isActive ? "scale-x-100" : "origin-left scale-x-0 group-hover:scale-x-100"}`} />
              </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <div className="hidden sm:block">
              <MagneticButton
                href={CAL_LINK}
                target="_blank"
                rel="noopener noreferrer"
                strength={0.18}
                className="px-4 py-1.5 text-sm"
              >
                Book a call
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
              <div className="mt-2.5 flex flex-col gap-1 rounded-3xl border border-border bg-card/95 p-3 shadow-[inset_0_1px_0_hsl(var(--foreground)/0.06)] backdrop-blur-xl">
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
