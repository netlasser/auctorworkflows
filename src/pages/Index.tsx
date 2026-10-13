import Ambient from "@/components/site/Ambient";
import NoiseOverlay from "@/components/site/NoiseOverlay";
import SiteNav from "@/components/site/SiteNav";
import Hero from "@/components/site/Hero";
import TrustedBy from "@/components/site/TrustedBy";
import Features from "@/components/site/Features";
import Philosophy from "@/components/site/Philosophy";
import Protocol from "@/components/site/Protocol";
import TechStack from "@/components/site/TechStack";
import Pricing from "@/components/site/Pricing";
import Testimonials from "@/components/site/Testimonials";
import Members from "@/components/site/Members";
import CTA from "@/components/site/CTA";
import StickyCTA from "@/components/site/StickyCTA";
import SiteFooter from "@/components/site/SiteFooter";

const Index = () => (
  <div className="min-h-screen bg-background text-foreground">
    <Ambient />
    <NoiseOverlay />
    <SiteNav />
    <main>
      <Hero />
      <TrustedBy />
      <Features />
      <Philosophy />
      <Protocol />
      <TechStack />
      <Pricing />
      <Testimonials />
      <Members />
      <CTA />
    </main>
    <SiteFooter />
    <StickyCTA />
  </div>
);

export default Index;
