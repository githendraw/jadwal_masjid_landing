import { Hero } from "@/components/landing/hero";
import { CredibilityStrip } from "@/components/landing/credibility-strip";
import { Features } from "@/components/landing/features";
import { BentoGrid } from "@/components/landing/bento-grid";
import { TabShowcase } from "@/components/landing/tab-showcase";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Testimonials } from "@/components/landing/testimonials";
import { CTASection } from "@/components/landing/cta-section";
import { FAQSection } from "@/components/landing/faq-section";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <>
      <Hero />
      <CredibilityStrip />
      <Features />
      <BentoGrid />
      <TabShowcase />
      <HowItWorks />
      <Testimonials />
      <CTASection />
      <FAQSection />
      <Footer />
    </>
  );
}