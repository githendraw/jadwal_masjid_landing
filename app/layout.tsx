import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";
import { Header } from "@/components/landing/header";
import { WhatsAppWidget } from "@/components/landing/whatsapp-widget";

const OG_IMAGE_URL = "https://jadwalmasjid.com/og-image.jpg";

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const WHATSAPP_LINK = "https://wa.me/6285283302551?text=Halo%20Jadwal%20Masjid,%20saya%20ingin%20bertanya...";

export const metadata: Metadata = {
  metadataBase: new URL("https://jadwalmasjid.com"),
  title: "Jadwal Masjid - Android TV Box Jadwal Sholat Digital",
  description:
    "Android TV Box jadwal sholat digital untuk TV masjid. Cukup colok ke TV, scan QR Code di layar TV pakai HP untuk atur nama masjid. 100% offline tanpa butuh internet.",
  keywords: [
    "jadwal sholat",
    "digital mosque",
    "TV masjid",
    "display sholat",
    "android tv box masjid",
    "iqomah counter",
    "jadwal sholat digital",
  ],
  authors: [{ name: "Jadwal Masjid" }],
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Jadwal Masjid - Android TV Box Jadwal Sholat Digital",
    description:
      "Android TV Box jadwal sholat digital untuk TV masjid. Cukup colok ke TV, scan QR Code di layar TV pakai HP. 100% offline tanpa internet.",
    url: "https://jadwalmasjid.com",
    siteName: "Jadwal Masjid",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Jadwal Masjid - Jadwal Sholat Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jadwal Masjid - Android TV Box Jadwal Sholat Digital",
    description:
      "Android TV Box jadwal sholat digital untuk TV masjid. Cukup colok ke TV, scan QR Code di layar TV pakai HP.",
    images: [OG_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Product",
  name: "Android TV Box Jadwal Masjid",
  description: "Android TV Box jadwal sholat digital untuk TV masjid. Setup cepat via scan QR code di layar TV.",
  offers: {
    "@type": "Offer",
    price: "946000",
    priceCurrency: "IDR",
    availability: "https://schema.org/InStock",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "120",
  },
};

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "Berapa harga Android TV Box-nya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Harga Rp 946.000 per box (1 box untuk 1 TV). Sudah termasuk Android TV Box dengan aplikasi Jadwal Masjid yang terinstall, kabel HDMI, dan adaptor daya. Sekali bayar, langsung bisa dipasang.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah perlu download aplikasi atau daftar akun?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tidak perlu sama sekali. Aplikasi Jadwal Masjid sudah terinstall di dalam TV box. Untuk pengaturannya, Anda cukup scan QR Code di layar TV menggunakan HP (dalam jaringan Wi-Fi yang sama). Tanpa buat akun cloud dan tanpa download aplikasi tambahan.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah harus terkoneksi ke internet?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tidak. Sistem berjalan 100% lokal di Android TV Box. Pengaturan via QR Code dan penayangan jadwal sholat tetap berfungsi walau tidak ada jaringan internet.",
      },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="light scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico?v=5" type="image/x-icon" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body
        className={`${dmSans.variable} ${jetbrainsMono.variable} font-sans antialiased bg-background text-foreground overflow-x-hidden max-w-screen`}
      >
        <ThemeProvider>
          <Header />
          {children}
          <WhatsAppWidget />
        </ThemeProvider>
</body>
    </html>
  );
}