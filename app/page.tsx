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
    <main>
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
