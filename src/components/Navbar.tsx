import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Sun, Moon } from "lucide-react";
import felipeLogo from "@/assets/felipe-logo.png";

const navLinks = [
  { label: "Case studies", href: "#work" },
  { label: "About", href: "#about" },
];

const sectionIds = ["work", "about", "services", "testimonials", "contact"];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("theme") === "dark" || (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActiveSection(id);
        },
        { rootMargin: "-40% 0px -55% 0px" }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 z-50 w-full bg-transparent backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-8">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="flex items-center gap-2">
          <img src={felipeLogo} alt="Felipe Workflows" className="h-[68px] w-[68px] rounded object-cover" />
        </button>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <button
              key={l.href}
              onClick={() => scrollTo(l.href)}
              className={`text-sm transition-colors hover:text-foreground ${
                activeSection === l.href.slice(1) ? "text-foreground font-medium" : "text-muted-foreground"
              }`}
            >
              {l.label}
            </button>
          ))}
          <button
            onClick={() => setDark(!dark)}
            className="rounded-full p-2 text-muted-foreground transition-colors hover:text-foreground hover:bg-muted"
            aria-label="Toggle dark mode"
          >
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Button size="sm" className="rounded-full bg-foreground text-background hover:bg-foreground/80 text-xs px-5" asChild>
            <a href="https://cal.com/biruke-felipe/30min" target="_blank" rel="noopener noreferrer">Join us →</a>
          </Button>
        </div>

        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>
          </SheetTrigger>
          <SheetContent side="right" className="border-border bg-background">
            <div className="mt-8 flex flex-col gap-6">
              {navLinks.map((l) => (
                <button key={l.href} onClick={() => scrollTo(l.href)} className="text-left text-lg text-muted-foreground hover:text-foreground">
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => setDark(!dark)}
                className="flex items-center gap-2 text-lg text-muted-foreground hover:text-foreground"
              >
                {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                {dark ? "Light mode" : "Dark mode"}
              </button>
              <Button className="mt-4 rounded-full" asChild>
                <a href="https://cal.com/biruke-felipe/30min" target="_blank" rel="noopener noreferrer">Book a Call</a>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
