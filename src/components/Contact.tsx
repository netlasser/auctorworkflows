import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

const Contact = () => {
  const { toast } = useToast();
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({ title: "Message sent!", description: "We'll get back to you shortly." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="border-t border-border py-16">
      <div className="container mx-auto px-4 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-md"
        >
          <p className="text-sm text-muted-foreground">
            Trust us for a free, friendly, no-obligation chat about your workflow.
          </p>
          <div className="mt-4">
            <Button
              size="lg"
              className="rounded-full bg-foreground px-8 text-background hover:bg-foreground/80"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Get a Call
            </Button>
          </div>
        </motion.div>

        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="mt-10 max-w-md space-y-4"
        >
          <div>
            <Label htmlFor="name" className="text-xs text-muted-foreground">Name</Label>
            <Input id="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" required className="mt-1 rounded-lg border-border" />
          </div>
          <div>
            <Label htmlFor="email" className="text-xs text-muted-foreground">Email</Label>
            <Input id="email" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" required className="mt-1 rounded-lg border-border" />
          </div>
          <div>
            <Label htmlFor="message" className="text-xs text-muted-foreground">Message</Label>
            <Textarea id="message" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Tell us about your workflow challenges..." rows={3} required className="mt-1 rounded-lg border-border" />
          </div>
          <Button type="submit" className="rounded-full bg-foreground px-6 text-background hover:bg-foreground/80">
            Send Message
          </Button>
        </motion.form>
      </div>
    </section>
  );
};

export default Contact;
