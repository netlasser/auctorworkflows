import { Instagram, Linkedin, Mail } from "lucide-react";
import felipeLogo from "@/assets/felipe-logo.png";

const links = [
  { label: "Case studies", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const socials = [
  { icon: Instagram, href: "https://www.instagram.com/felipe_workflows/", label: "Instagram" },
  { icon: Linkedin, href: "https://www.linkedin.com/company/felipeagency/", label: "LinkedIn" },
  { icon: Mail, href: "mailto:felip.automation@gmail.com", label: "Email" },
];

const Footer = () => {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="border-t border-border bg-background py-10">
      <div className="container mx-auto flex flex-col gap-6 px-4 md:flex-row md:items-center md:justify-between md:px-8">
        <div className="flex items-center">
          <img src={felipeLogo} alt="Felipe Workflows" className="h-16 w-16 rounded object-cover" />
        </div>

        <div className="flex flex-wrap gap-6">
          {links.map((l) => (
            <button key={l.href} onClick={() => scrollTo(l.href)} className="text-xs text-muted-foreground transition-colors hover:text-foreground">
              {l.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="text-muted-foreground transition-colors hover:text-foreground" aria-label={s.label}>
              <s.icon className="h-4 w-4" />
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <p className="text-xs text-muted-foreground">© {new Date().getFullYear()} Felipe Workflows</p>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="text-xs text-muted-foreground transition-colors hover:text-foreground"
          >
            ↑ Back to top
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
