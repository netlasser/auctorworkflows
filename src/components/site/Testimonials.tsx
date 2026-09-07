import { Star } from "lucide-react";
import Reveal from "./Reveal";

const items = [
  {
    quote:
      "Biruke built us a cold email system that completely changed how we do outreach. We went from generic blasts to personalized emails that actually get replies. Our sales team now focuses on closing, not chasing.",
    name: "Abebe K.",
    role: "Founder, Addis Tech Solutions",
  },
  {
    quote:
      "We were manually copying leads from forms into Sheets every single day. Now everything flows automatically into our pipeline with scoring. We respond to hot leads within seconds instead of hours. Game changer.",
    name: "Sarah M.",
    role: "Marketing Director, Bole Imports",
  },
];

const Testimonials = () => (
  <section className="px-[22px] py-[clamp(80px,10vw,130px)]">
    <div className="mx-auto w-full max-w-5xl">
      <Reveal className="max-w-2xl">
        <span className="section-label">Testimonials</span>
        <h2 className="mt-4 font-display text-3xl md:text-4xl">What clients say</h2>
        <p className="mt-4 text-dim">Real businesses, real results.</p>
      </Reveal>

      <div className="mt-12 grid gap-6 md:grid-cols-2">
        {items.map((t, i) => (
          <Reveal key={t.name} delay={i * 100}>
            <figure className="card-surface h-full p-7">
              <div className="flex gap-1">
                {Array.from({ length: 5 }).map((_, s) => (
                  <Star key={s} className="h-4 w-4 fill-primary text-primary" />
                ))}
              </div>
              <blockquote className="mt-5 text-sm leading-relaxed text-dim">"{t.quote}"</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 font-logo font-semibold text-primary">
                  {t.name[0]}
                </span>
                <span>
                  <span className="block text-sm font-semibold">{t.name}</span>
                  <span className="block text-xs text-muted-ink">{t.role}</span>
                </span>
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Testimonials;
