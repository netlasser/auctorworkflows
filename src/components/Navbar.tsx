import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (href: string) => {
    setOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur-xl">
      <div className="container mx-auto flex h-16 items-center justify-between px-4 md:px-8">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="font-display text-xl font-bold tracking-tight">
          <span className="gradient-text">Felipe</span> Workflows
        </button>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navLinks.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </button>
          ))}
          <Button size="sm" className="bg-primary hover:bg-primary/80" onClick={() => scrollTo("#contact")}>
            Book a Call
          </Button>
        </div>

        {/* Mobile */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon"><Menu className="h-5 w-5" /></Button>
          </SheetTrigger>
          <SheetContent side="right" className="border-border bg-background">
            <div className="mt-8 flex flex-col gap-6">
              {navLinks.map((l) => (
                <button key={l.href} onClick={() => scrollTo(l.href)} className="text-left text-lg text-muted-foreground transition-colors hover:text-foreground">
                  {l.label}
                </button>
              ))}
              <Button className="mt-4" onClick={() => scrollTo("#contact")}>Book a Call</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
