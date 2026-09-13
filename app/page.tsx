import { Header } from "@/components/landing/header";
import { Hero } from "@/components/landing/hero";
import { CredibilityStrip } from "@/components/landing/credibility-strip";
import { ProblemSection } from "@/components/landing/problem-section";
import { Features } from "@/components/landing/features";
import { BentoGrid } from "@/components/landing/bento-grid";
import { PrayerClock } from "@/components/landing/prayer-clock";
import { HowItWorks } from "@/components/landing/how-it-works";
// Testimonials tidak dirender: isinya contoh, bukan pelanggan sungguhan
// (dihapus 2026-09-13). Komponennya sengaja dibiarkan di
// components/landing/testimonials.tsx untuk diaktifkan kembali setelah ada
// testimoni asli yang boleh ditampilkan.
import { PricingSection } from "@/components/landing/pricing-section";
import { ComparisonSection } from "@/components/landing/comparison-section";
import { CTASection } from "@/components/landing/cta-section";
import { TabShowcase } from "@/components/landing/tab-showcase";
import { FAQSection } from "@/components/landing/faq-section";
import { Footer } from "@/components/landing/footer";
import { jsonLdFaq, jsonLdHomepage } from "@/lib/structured-data";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      {/* Markup terstruktur khusus halaman ini. Jangan pindahkan ke layout:
          markup Product wajib cocok dengan isi halaman yang memasangnya. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdHomepage()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq()) }}
      />
      <Header />
      <main className="relative pb-16">
        <Hero />
        <CredibilityStrip />
        <ProblemSection />
        <Features />
        <TabShowcase />
        <BentoGrid />
        <PrayerClock />
        <HowItWorks />
        <ComparisonSection />
        {/* Testimoni dihapus 2026-09-13: teksnya contoh, bukan pelanggan nyata. */}
        <PricingSection />
        <CTASection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}
