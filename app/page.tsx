import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { CredibilityStrip } from "@/components/landing/credibility-strip";
import { ProblemSection } from "@/components/landing/problem-section";
import { Features } from "@/components/landing/features";
import { BentoGrid } from "@/components/landing/bento-grid";
import { PrayerClock } from "@/components/landing/prayer-clock";
import { HowItWorks } from "@/components/landing/how-it-works";
import { Testimonials } from "@/components/landing/testimonials";
import { PricingSection } from "@/components/landing/pricing-section";
import { CTASection } from "@/components/landing/cta-section";
import { TabShowcase } from "@/components/landing/tab-showcase";
import { FAQSection } from "@/components/landing/faq-section";
import { Footer } from "@/components/landing/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="relative">
        <Hero />
        <CredibilityStrip />
        <ProblemSection />
        <Features />
        <TabShowcase />
        <BentoGrid />
        <PrayerClock />
        <HowItWorks />
        <Testimonials />
        <PricingSection />
        <CTASection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
