import type { Metadata } from "next";
import { DM_Sans, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { CartProvider } from "@/components/store/cart-provider";
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

const WHATSAPP_LINK = "https://wa.me/6287789179242?text=Halo%20Jadwal%20Masjid,%20saya%20ingin%20bertanya...";

export const metadata: Metadata = {
  metadataBase: new URL("https://jadwalmasjid.com"),
  title: "Jadwal Masjid - Paket Display Jadwal Sholat Digital untuk TV Masjid",
  description:
    "Paket jam digital masjid siap pasang: TV + mesin + bracket. Jadwal sholat akurat Kemenag, auto-update, stabil 24 jam. Sekali wakaf tanpa biaya langganan. Mulai Rp860.000.",
  keywords: [
    "jadwal sholat digital",
    "jam digital masjid",
    "jam sholat TV",
    "TV masjid",
    "display jadwal sholat",
    "android tv box masjid",
    "jam azan TV",
    "running text masjid",
    "iqomah counter",
    "jadwal sholat otomatis",
    "wakaf TV masjid",
  ],
  authors: [{ name: "Jadwal Masjid" }],
  alternates: {
    canonical: "./",
  },
  openGraph: {
    title: "Jadwal Masjid - Paket Display Jadwal Sholat Digital untuk TV Masjid",
    description:
      "Paket jam digital masjid siap pasang: TV + mesin + bracket. Jadwal sholat akurat Kemenag, auto-update, stabil 24 jam. Sekali wakaf tanpa biaya langganan. Mulai Rp860.000.",
    url: "https://jadwalmasjid.com",
    siteName: "Jadwal Masjid",
    type: "website",
    locale: "id_ID",
    images: [
      {
        url: OG_IMAGE_URL,
        width: 1200,
        height: 630,
        alt: "Jadwal Masjid - Paket Display Jadwal Sholat Digital",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Jadwal Masjid - Paket Display Jadwal Sholat Digital untuk TV Masjid",
    description:
        "Paket jam digital masjid siap pasang. Sekali wakaf tanpa biaya langganan. Mulai Rp860.000.",
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
  name: "Paket Display Jadwal Sholat Digital untuk TV Masjid",
  description:
    "Paket jam digital masjid siap pasang: TV + mesin + bracket. Jadwal sholat akurat Kemenag, auto-update, stabil 24 jam. Sekali wakaf tanpa biaya langganan. Mulai Rp860.000.",
  offers: {
    "@type": "Offer",
    price: "860000",
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
      name: "Apa saja paket yang tersedia dan berapa harganya?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Ada 3 paket: Paket Mesin Rp860.000, Paket Hemat 32\" Rp3.899.000, dan Paket Layar Besar 40\" Rp4.999.000. Semua sekali bayar tanpa langganan bulanan.",
      },
    },
    {
      "@type": "Question",
      name: "Apakah perlu download aplikasi atau daftar akun?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Tidak perlu sama sekali. Aplikasi Jadwal Masjid sudah terinstall di dalam TV box. Untuk pengaturannya, Anda cukup scan QR Code di layar TV menggunakan HP.",
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
          <CartProvider>
            <Header />
            {children}
            <WhatsAppWidget />
          </CartProvider>
        </ThemeProvider>
</body>
    </html>
  );
}