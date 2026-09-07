import { CalendarCheck, Mail, MessageCircle, Send } from "lucide-react";
import { CAL_LINK, EMAIL, TELEGRAM, WHATSAPP } from "@/lib/site";
import Reveal from "./Reveal";

const contacts = [
  { icon: Mail, label: EMAIL, href: `mailto:${EMAIL}` },
  { icon: Send, label: "@Colavenci", href: TELEGRAM },
  { icon: MessageCircle, label: "WhatsApp", href: WHATSAPP },
];

const CTA = () => (
  <section id="contact" className="px-[22px] py-[clamp(80px,10vw,130px)]">
    <Reveal className="mx-auto w-full max-w-3xl text-center">
      <span className="section-label">Let's Talk</span>
      <h2 className="mt-4 font-display text-3xl md:text-4xl">Ready to stop doing work a machine should do?</h2>
      <p className="mx-auto mt-5 max-w-2xl text-dim">
        Book a free 30-minute assessment call. I'll audit your current process and show you exactly where automation
        will save you the most time and money.
      </p>
      <a
        href={CAL_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-primary-glow mt-8 inline-flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-semibold"
      >
        <CalendarCheck className="h-4 w-4" /> Book Your Free Assessment
      </a>

      <div className="mt-8 flex flex-wrap justify-center gap-3">
        {contacts.map((c) => (
          <a
            key={c.label}
            href={c.href}
            target={c.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-xs text-dim transition-colors hover:border-[hsl(var(--border-hover))] hover:text-foreground"
          >
            <c.icon className="h-3.5 w-3.5 text-primary" /> {c.label}
          </a>
        ))}
      </div>
    </Reveal>
  </section>
);

export default CTA;
