import { CalendarCheck, Mail, MessageCircle, Phone, Send } from "lucide-react";
import { CAL_LINK, EMAIL, PHONE, PHONE_DISPLAY, TELEGRAM, WHATSAPP } from "@/lib/site";
import Reveal from "./Reveal";
import MagneticButton from "@/components/ui/MagneticButton";

const socials = [
  { icon: Mail, label: "Email", href: `mailto:${EMAIL}` },
  { icon: Send, label: "Telegram", href: TELEGRAM },
  { icon: MessageCircle, label: "WhatsApp", href: WHATSAPP },
];

const CTA = () => (
  <section id="contact" className="px-[22px] py-[clamp(80px,10vw,130px)]">
    <Reveal className="mx-auto w-full max-w-4xl">
      <div className="relative overflow-hidden rounded-[3rem] border border-border bg-card/40 px-6 py-16 text-center sm:px-14">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_0%,hsl(var(--card))_0%,transparent_70%)]"
        />
        <div className="relative">
          <span className="section-label">Let's Talk</span>
          <h2 className="font-heading mx-auto mt-5 max-w-2xl text-3xl md:text-5xl">
            Ready to stop doing work a machine should do?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-dim">
            Book a free 30-minute assessment call. We'll audit your current process and show you
            exactly where automation will save you the most time and money.
          </p>

          <div className="mt-9 flex justify-center">
            <MagneticButton
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full justify-center px-5 font-semibold sm:w-auto sm:px-7"
            >
              <CalendarCheck className="h-4 w-4 shrink-0" /> Book Your Free Assessment
            </MagneticButton>
          </div>

          <div className="mt-7 flex flex-col items-center gap-4">
            <a
              href={`tel:${PHONE}`}
              className="lift inline-flex items-center gap-2 rounded-full border border-border bg-background/40 px-5 py-2.5 text-sm font-semibold text-primary hover:border-[hsl(var(--border-hover))] active:scale-95"
            >
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>

            <div className="flex justify-center gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-dim transition-colors hover:border-[hsl(var(--border-hover))] hover:text-foreground active:scale-90"
                >
                  <s.icon className="h-4 w-4 text-primary" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Reveal>
  </section>
);

export default CTA;
