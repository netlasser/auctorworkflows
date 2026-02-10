import { motion } from "framer-motion";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

const team = [
  {
    name: "Biruke Lavencian",
    role: "Founder",
    initials: "BL",
    bio: "Passionate about translating AI's potential into real, working systems. Focuses on building custom automation that eliminates manual overhead and drives sustainable growth for agencies and businesses.",
  },
  {
    name: "Nahum Welday",
    role: "Co-Founder",
    initials: "NW",
    bio: "Expert in workflow architecture and system design. Builds the infrastructure that connects tools, teams, and processes into seamless automated pipelines.",
  },
];

const About = () => (
  <section id="about" className="border-t border-border bg-secondary py-16">
    <div className="container mx-auto px-4 md:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-label">About us</span>
        <h2 className="mt-4 font-display text-3xl font-bold md:text-4xl">
          AI-native since day one.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground">
          The future arrived faster than expected. Businesses today are drowning in repetitive work, manual processes, and data chaos — while the promise of AI feels out of reach: too complex, too expensive, too vague. That's where we come in.
        </p>
      </motion.div>

      <div className="mt-12 grid gap-8 md:grid-cols-2">
        {team.map((t, i) => (
          <motion.div
            key={t.name}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="flex gap-4"
          >
            <Avatar className="h-14 w-14 shrink-0">
              <AvatarFallback className="bg-foreground font-display text-sm font-bold text-primary-foreground">{t.initials}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-display font-semibold">{t.name}</div>
              <div className="text-xs text-muted-foreground">{t.role}</div>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.bio}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default About;
