import { useEffect, useState } from "react";
import { Github, Menu, X } from "lucide-react";
import { CAL_LINK, GITHUB_LINK } from "@/lib/site";

const links = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Testimonials", href: "#testimonials" },
];

const SiteNav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 backdrop-blur-xl transition-all duration-300 ${
        scrolled ? "border-b border-border bg-background/85 py-2" : "border-b border-transparent py-4"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-[22px]">
        <a href="#top" className="flex items-center">
          <img
            src="/favicon.png"
            alt="Auctor Workflows logo"
            className="h-10 w-10 object-contain sm:h-11 sm:w-11 md:h-12 md:w-12"
          />
        </a>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="rounded-lg px-3 py-2 text-sm text-dim transition-colors hover:text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href={GITHUB_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-1 inline-flex items-center gap-2 rounded-xl border border-border px-3.5 py-2 text-sm text-dim transition-colors hover:border-[hsl(var(--border-hover))] hover:text-foreground"
          >
            <Github className="h-4 w-4" /> Portfolio
          </a>
          <a
            href={CAL_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary-glow ml-2 inline-flex items-center rounded-xl px-4 py-2 text-sm font-semibold"
          >
            Book a Call
          </a>
        </nav>

        <button
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-border text-foreground transition-colors hover:bg-card active:scale-95 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <>
          <div
            className="fixed inset-0 top-[65px] -z-10 bg-black/60 backdrop-blur-sm md:hidden"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div className="mx-[18px] mt-2.5 flex flex-col gap-1.5 rounded-2xl border border-border bg-card/95 p-3.5 shadow-2xl backdrop-blur-xl md:hidden">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="flex min-h-[44px] items-center rounded-xl px-3.5 py-2 text-sm font-medium text-dim transition-colors hover:bg-primary/10 hover:text-foreground"
              >
                {l.label}
              </a>
            ))}
            <a
              href={GITHUB_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="flex min-h-[44px] items-center gap-2 rounded-xl px-3.5 py-2 text-sm font-medium text-dim transition-colors hover:bg-primary/10 hover:text-foreground"
            >
              <Github className="h-4 w-4" /> Portfolio
            </a>
            <a
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="btn-primary-glow mt-2 flex min-h-[44px] items-center justify-center rounded-xl px-4 py-2.5 text-center text-sm font-semibold"
            >
              Book a Call
            </a>
          </div>
        </>
      )}
    </header>
  );
};

export default SiteNav;
