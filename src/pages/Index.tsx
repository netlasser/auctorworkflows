import { lazy, Suspense } from "react";
import Ambient from "@/components/site/Ambient";
import NoiseOverlay from "@/components/site/NoiseOverlay";
import SiteNav from "@/components/site/SiteNav";
import Hero from "@/components/site/Hero";
import Protocol from "@/components/site/Protocol";
import CTA from "@/components/site/CTA";
import StickyCTA from "@/components/site/StickyCTA";
import SiteFooter from "@/components/site/SiteFooter";

const TrustedBy = lazy(() => import("@/components/site/TrustedBy"));
const Features = lazy(() => import("@/components/site/Features"));
const Philosophy = lazy(() => import("@/components/site/Philosophy"));
const TechStack = lazy(() => import("@/components/site/TechStack"));
const Pricing = lazy(() => import("@/components/site/Pricing"));
const Testimonials = lazy(() => import("@/components/site/Testimonials"));
const Members = lazy(() => import("@/components/site/Members"));

const SectionFallback = () => <div aria-hidden className="min-h-[45vh] w-full" />;

const Index = () => (
  <div className="min-h-screen overflow-x-clip bg-background text-foreground">
    <Ambient />
    <NoiseOverlay />
    <SiteNav />
    <main>
      <Hero />
      <Suspense fallback={<SectionFallback />}>
        <TrustedBy />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Features />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Philosophy />
      </Suspense>
      <Protocol />
      <Suspense fallback={<SectionFallback />}>
        <TechStack />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Pricing />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Testimonials />
      </Suspense>
      <Suspense fallback={<SectionFallback />}>
        <Members />
      </Suspense>
      <CTA />
    </main>
    <SiteFooter />
    <StickyCTA />
  </div>
);

export default Index;
