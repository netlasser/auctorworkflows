import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const team = [
  { name: "Biruke Lavencian", role: "Founder", initials: "BL" },
  { name: "Nahum Welday", role: "Co-Founder", initials: "NW" },
];

const About = () => (
  <section id="about" className="border-t border-border/50 py-24">
    <div className="container mx-auto px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mx-auto max-w-3xl text-center"
      >
        <h2 className="font-display text-3xl font-bold md:text-4xl">
          We Don't Just Automate Tasks.{" "}
          <span className="gradient-text">We Build Your Future-Proof Business.</span>
        </h2>
        <p className="mt-6 text-lg text-muted-foreground">
          The future arrived faster than expected. Businesses today are drowning in repetitive work, manual processes, and data chaos — while the promise of AI feels out of reach: too complex, too expensive, too vague.
        </p>
        <p className="mt-4 text-muted-foreground">
          That's where we come in. We translate AI's potential into real, working systems — custom-built for your business, your team, and your goals.
        </p>
      </motion.div>

      <div className="mt-16 flex flex-wrap items-center justify-center gap-8">
        {team.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15 }}
            className="flex flex-col items-center gap-4 rounded-xl border border-border/50 bg-card p-8 text-center"
          >
            <Avatar className="h-20 w-20 text-lg">
              <AvatarFallback className="bg-primary/20 font-display text-xl text-primary">{t.initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-display text-lg font-semibold">{t.name}</div>
              <div className="text-sm text-primary">{t.role}</div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default About;
