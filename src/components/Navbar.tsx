import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const navLinks = [
  { label: "Case studies", href: "#work" },
  { label: "About", href: "#about" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);

  const scrollTo = (href: string) => {
    setOpen(false);
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-border bg-background/90 backdrop-blur-md">
      <div className="container mx-auto flex h-14 items-center justify-between px-4 md:px-8">
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="font-display text-base font-bold tracking-tight flex items-center gap-1.5">
          <span className="flex h-6 w-6 items-center justify-center rounded bg-foreground text-primary-foreground text-xs font-bold">F</span>
          FELIPE WORKFLOWS
        </button>

        <div className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </button>
          ))}
          <Button size="sm" className="rounded-full bg-foreground text-background hover:bg-foreground/80 text-xs px-5" onClick={() => scrollTo("#contact")}>
            Join us →
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
              <Button className="mt-4 rounded-full" onClick={() => scrollTo("#contact")}>Book a Call</Button>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </nav>
  );
};

export default Navbar;
