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
  <section id="contact" className="page-x py-[clamp(90px,12vw,150px)]">
    <Reveal className="mx-auto w-full max-w-6xl">
      <div className="card-surface relative overflow-hidden px-6 py-10 sm:px-10 sm:py-12 lg:px-14 lg:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_80%_at_0%_0%,hsl(var(--foreground)/0.05)_0%,transparent_55%)]"
        />
        <div className="relative grid items-end gap-10 lg:grid-cols-[1.4fr_auto] lg:gap-16">
          <div>
            <h2 className="max-w-xl font-heading text-[clamp(2.1rem,4vw,3.6rem)] font-semibold tracking-[-0.03em] leading-[0.98]">
              Book a call.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-dim sm:text-base">
              Book a free 30-minute assessment call. We'll audit your current process and show you
              where automation will save time.
            </p>
          </div>

          <div className="flex flex-col items-start gap-4 lg:items-end">
            <MagneticButton
              href={CAL_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full justify-center px-6 py-2.5 sm:w-auto sm:px-8"
            >
              <CalendarCheck className="h-4 w-4 shrink-0" /> Book a call
            </MagneticButton>

            <a
              href={`tel:${PHONE}`}
              className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-border bg-background/40 px-5 py-2.5 text-sm text-foreground transition-colors hover:border-foreground/40 active:scale-95"
            >
              <Phone className="h-4 w-4" /> {PHONE_DISPLAY}
            </a>

            <div className="flex gap-2.5">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("mailto") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border text-muted-ink transition-colors hover:text-foreground active:scale-90"
                >
                  <s.icon className="h-4 w-4" />
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
