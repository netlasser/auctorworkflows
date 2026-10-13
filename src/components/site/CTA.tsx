import { CalendarCheck, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { CAL_LINK, EMAIL, PHONE, PHONE_DISPLAY, TELEGRAM, WHATSAPP } from "@/lib/site";
import Reveal from "./Reveal";

const socials = [
  { icon: Mail, label: "Email", href: `mailto:${EMAIL}` },
  { icon: Send, label: "Telegram", href: TELEGRAM },
  { icon: MessageCircle, label: "WhatsApp", href: WHATSAPP },
];

const CTA = () => (
  <section id="contact" className="px-[22px] py-[clamp(80px,10vw,130px)]">
    <Reveal className="mx-auto w-full max-w-3xl text-center">
      <span className="section-label">Let's Talk</span>
      <h2 className="mt-4 font-display text-3xl md:text-4xl">Ready to stop doing work a machine should do?</h2>
      <p className="mx-auto mt-5 max-w-2xl text-dim">
        Book a free 30-minute assessment call. We'll audit your current process and show you exactly where automation
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

      <a
        href={`tel:${PHONE}`}
        className="mt-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/5 px-5 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-primary hover:bg-primary/10"
      >
        <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
      </a>

      <div className="mt-4 flex justify-center gap-3">
        {socials.map((s) => (
          <a
            key={s.label}
            href={s.href}
            target={s.href.startsWith("mailto") ? undefined : "_blank"}
            rel="noopener noreferrer"
            aria-label={s.label}
            title={s.label}
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-dim transition-colors hover:border-[hsl(var(--border-hover))] hover:text-foreground"
          >
            <s.icon className="h-4 w-4 text-primary" />
          </a>
        ))}
      </div>
    </Reveal>
  </section>
);

export default CTA;
