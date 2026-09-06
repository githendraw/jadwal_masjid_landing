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
  openGraph: {
    title: "Jadwal Masjid - Android TV Box Jadwal Sholat Digital",
    description:
      "Android TV Box jadwal sholat digital untuk TV masjid. Cukup colok ke TV, scan QR Code di layar TV pakai HP. 100% offline tanpa internet.",
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="light scroll-smooth" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico?v=3" type="image/x-icon" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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