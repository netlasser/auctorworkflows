import { useEffect, useState } from "react";
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
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
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
                className="lift rounded-full px-3.5 py-2 text-sm text-dim hover:text-foreground"
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
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-colors hover:bg-card lg:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mt-2.5 flex flex-col gap-1 rounded-[1.75rem] border border-border bg-card/95 p-3 shadow-2xl backdrop-blur-xl lg:hidden">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex min-h-[44px] items-center rounded-2xl px-4 py-2 text-sm font-medium text-dim transition-colors hover:bg-primary/10 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-1.5 flex min-h-[48px] items-center justify-center rounded-2xl bg-primary px-4 py-2.5 text-center text-sm font-semibold text-primary-foreground"
            >
              Book a Call
            </a>
          </div>
        )}
      </div>
    </header>
  );
};

export default SiteNav;
