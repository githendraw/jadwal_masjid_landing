import {
  Header,
  Hero,
  CredibilityStrip,
  BentoGrid,
  TabShowcase,
  HowItWorks,
  Features,
  CtaSection,
  FaqSection,
  Footer,
} from "@/components/landing";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <CredibilityStrip />
      <BentoGrid />
      <TabShowcase />
      <HowItWorks />
      <Features />
      <CtaSection />
      <FaqSection />
      <Footer />
    </main>
  );
}
