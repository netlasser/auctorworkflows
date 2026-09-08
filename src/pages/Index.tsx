import Ambient from "@/components/site/Ambient";
import SiteNav from "@/components/site/SiteNav";
import Hero from "@/components/site/Hero";
import Services from "@/components/site/Services";
import Process from "@/components/site/Process";
import TechStack from "@/components/site/TechStack";
import Pricing from "@/components/site/Pricing";
import Testimonials from "@/components/site/Testimonials";
import CTA from "@/components/site/CTA";
import StickyCTA from "@/components/site/StickyCTA";
import SiteFooter from "@/components/site/SiteFooter";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Ambient />
    <SiteNav />
    <main>
      <Hero />
      <Services />
      <Process />
      <TechStack />
      <Pricing />
      <Testimonials />
      <CTA />
    </main>
    <SiteFooter />
    <StickyCTA />
  </div>
);

export default Index;
