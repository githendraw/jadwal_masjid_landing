import type { Metadata } from "next";
import { Sora, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/landing/header";
import { WhatsAppWidget } from "@/components/landing/whatsapp-widget";

const OG_IMAGE_URL = "https://jadwalmasjid.com/api/og";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const WHATSAPP_LINK = "https://wa.me/6281234567890?text=Halo%20Jadwal%20Masjid";

export const metadata: Metadata = {
  title: "Jadwal Masjid - Jadwal Sholat Digital untuk TV Masjid",
  description:
    "Tampilkan jadwal sholat akurat di TV masjid dengan mudah. Satu HP mengelola banyak TV, otomatis update setiap hari tanpa ribet. Gratis untuk masjid.",
  keywords: [
    "jadwal sholat",
    "digital mosque",
    "TV masjid",
    "display sholat",
    "aplikasi masjid",
    "iqomah counter",
  ],
  authors: [{ name: "Jadwal Masjid" }],
  openGraph: {
    title: "Jadwal Masjid - Jadwal Sholat Digital untuk TV Masjid",
    description:
      "Tampilkan jadwal sholat akurat di TV masjid dengan mudah. Satu HP mengelola banyak TV.",
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
    title: "Jadwal Masjid - Jadwal Sholat Digital untuk TV Masjid",
    description:
      "Tampilkan jadwal sholat akurat di TV masjid dengan mudah.",
    images: [OG_IMAGE_URL],
  },
  robots: {
    index: true,
    follow: true,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Jadwal Masjid",
  description: "Jadwal sholat digital untuk TV masjid",
  applicationCategory: "Entertainment",
  operatingSystem: "Android, iOS",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "IDR",
  },
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.8",
    ratingCount: "120",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico?v=3" type="image/x-icon" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body
        className={`${sora.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} font-jakarta antialiased bg-[#0A192F] overflow-x-hidden max-w-screen`}
      >
        <Header />
        {children}
        <WhatsAppWidget />
      </body>
    </html>
  );
}