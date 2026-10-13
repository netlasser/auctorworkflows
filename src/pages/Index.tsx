import Ambient from "@/components/site/Ambient";
import SiteNav from "@/components/site/SiteNav";
import Hero from "@/components/site/Hero";
import TrustedBy from "@/components/site/TrustedBy";
import Services from "@/components/site/Services";
import Process from "@/components/site/Process";
import TechStack from "@/components/site/TechStack";
import Pricing from "@/components/site/Pricing";
import Testimonials from "@/components/site/Testimonials";
import Team from "@/components/site/Team";
import CTA from "@/components/site/CTA";
import StickyCTA from "@/components/site/StickyCTA";
import SiteFooter from "@/components/site/SiteFooter";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Ambient />
    <SiteNav />
    <main>
      <Hero />
      <TrustedBy />
      <Services />
      <Process />
      <TechStack />
      <Pricing />
      <Testimonials />
      <Team />
      <CTA />
    </main>
    <SiteFooter />
    <StickyCTA />
  </div>
);

export default Index;
