import { Github, Mail, MessageCircle, Send } from "lucide-react";
import { EMAIL, GITHUB_LINK, TELEGRAM, WHATSAPP } from "@/lib/site";

const navigate = [
  { label: "Services", href: "#services" },
  { label: "Process", href: "#process" },
  { label: "Pricing", href: "#pricing" },
  { label: "Team", href: "#team" },
  { label: "Contact", href: "#contact" },
];

const elsewhere = [
  { label: "GitHub", href: GITHUB_LINK, icon: Github },
  { label: "Email", href: `mailto:${EMAIL}`, icon: Mail },
  { label: "Telegram", href: TELEGRAM, icon: Send },
  { label: "WhatsApp", href: WHATSAPP, icon: MessageCircle },
];

const SiteFooter = () => (
  <footer className="page-x mt-6 border-t border-border bg-card/30 pb-10 pt-16 lg:pb-12 lg:pt-20">
    <div className="mx-auto w-full max-w-6xl">
      <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr] lg:gap-16">
        <div>
          <a href="#top" className="flex items-center gap-3">
            <img
              src="/logo.png"
              alt="Auctor Workflows logo"
              className="h-12 w-12 rounded-full object-contain lg:h-14 lg:w-14"
            />
            <span className="font-heading text-base font-semibold lg:text-lg">Auctor Workflows</span>
          </a>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-dim">
            A two-person B2B AI automation agency. We build n8n systems that capture leads,
            personalize outreach, and fill your calendar.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3.5 py-1.5">
            <span className="pulse-dot h-2 w-2 rounded-full bg-[hsl(var(--success))]" />
            <span className="text-sm text-dim">System operational</span>
          </div>
        </div>

        <div>
          <h3 className="text-sm text-muted-ink">Navigate</h3>
          <ul className="mt-4 space-y-3">
            {navigate.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="lift inline-block text-sm sm:text-base text-dim hover:text-foreground active:opacity-70">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm text-muted-ink">Elsewhere</h3>
          <ul className="mt-4 space-y-3">
            {elsewhere.map((l) => (
              <li key={l.label}>
                <a
                  href={l.href}
                  target={l.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="lift inline-flex items-center gap-2 text-sm sm:text-base text-dim hover:text-foreground active:opacity-70"
                >
                  <l.icon className="h-4 w-4 text-primary" /> {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <p
        aria-hidden
        className="wordmark-ghost mt-16 select-none overflow-hidden font-heading text-[clamp(3.4rem,14vw,9.5rem)] font-semibold leading-[0.8] tracking-[-0.07em]"
      >
        Auctor
      </p>

      <div className="mt-8 flex flex-col items-center justify-between gap-3 border-t border-border pt-6 text-center sm:flex-row sm:text-left">
        <p className="text-sm text-muted-ink">© 2026 Auctor Workflows</p>
      </div>
    </div>
  </footer>
);

export default SiteFooter;
