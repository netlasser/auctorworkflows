const links = [
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Contact", href: "#contact" },
];

const Footer = () => {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border/50 bg-secondary/20 py-12">
      <div className="container mx-auto flex flex-col items-center gap-6 px-4 text-center md:flex-row md:justify-between md:text-left">
        <div>
          <span className="font-display text-lg font-bold">
            <span className="gradient-text">Felipe</span> Workflows
          </span>
          <p className="mt-1 text-sm text-muted-foreground">AI workflow automation that delivers.</p>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {links.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </button>
          ))}
        </div>

        <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Felipe Workflows. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
