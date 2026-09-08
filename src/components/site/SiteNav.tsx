import { useEffect, useState } from "react";
import { Github, Menu, X } from "lucide-react";
import logo from "@/assets/bz-logo-transparent.png";
import { CAL_LINK, GITHUB_LINK } from "@/lib/site";

const links = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
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
            src={logo}
            alt="Biruke Zeckariyas logo"
            className="h-[180px] w-[180px] object-contain sm:h-[220px] sm:w-[220px] lg:h-[280px] lg:w-[280px]"
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
          className="rounded-lg border border-border p-2 md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div className="mx-[22px] mt-3 flex flex-col gap-1 rounded-2xl border border-border bg-card p-3 md:hidden">
          {links.map((l) => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm text-dim">
              {l.label}
            </a>
          ))}
          <a href={GITHUB_LINK} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-dim">
            <Github className="h-4 w-4" /> Portfolio
          </a>
          <a href={CAL_LINK} target="_blank" rel="noopener noreferrer" className="btn-primary-glow mt-1 rounded-xl px-4 py-2.5 text-center text-sm font-semibold">
            Book a Call
          </a>
        </div>
      )}
    </header>
  );
};

export default SiteNav;
