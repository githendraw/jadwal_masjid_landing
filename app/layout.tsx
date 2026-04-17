import type { Metadata } from "next";
import { Sora, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Waktu Sholat - Jadwal Sholat Digital untuk TV Masjid",
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
  authors: [{ name: "Waktu Sholat" }],
  openGraph: {
    title: "Waktu Sholat - Jadwal Sholat Digital untuk TV Masjid",
    description:
      "Tampilkan jadwal sholat akurat di TV masjid dengan mudah. Satu HP mengelola banyak TV.",
    type: "website",
    locale: "id_ID",
  },
  twitter: {
    card: "summary_large_image",
    title: "Waktu Sholat - Jadwal Sholat Digital untuk TV Masjid",
    description:
      "Tampilkan jadwal sholat akurat di TV masjid dengan mudah.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="scroll-smooth">
      <body
        className={`${sora.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable} font-jakarta antialiased bg-[#0A192F]`}
      >
        {children}
      </body>
    </html>
  );
}
