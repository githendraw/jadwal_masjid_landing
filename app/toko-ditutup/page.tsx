import type { Metadata } from "next";
import Link from "next/link";
import { Store, MessageSquare, ArrowLeft } from "lucide-react";
import { Header } from "@/components/landing/header";
import { Footer } from "@/components/landing/footer";

const WHATSAPP_LINK =
  "https://wa.me/6287789179242?text=Halo%20Jadwal%20Masjid,%20saya%20ingin%20bertanya...";

// Halaman sementara: jangan diindeks, tapi tautannya tetap diikuti.
export const metadata: Metadata = {
  title: "Toko Sedang Disiapkan - Jadwal Masjid",
  robots: { index: false, follow: true },
};

export default function TokoDitutupPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-28 sm:pt-32 pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="inline-flex w-14 h-14 rounded-2xl bg-primary/10 text-primary items-center justify-center mb-6">
            <Store className="w-7 h-7" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
            Pembelian &amp; Akun Belum Dibuka
          </h1>

          <p className="text-muted-foreground leading-relaxed mb-2">
            Kami sedang menyelesaikan proses verifikasi penyedia pembayaran, jadi
            keranjang, checkout, dan login belum bisa dipakai untuk sementara.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            Katalog dan harga tetap bisa Anda lihat seperti biasa.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/produk"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground h-11 px-6 font-semibold text-sm hover:bg-primary/90 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Lihat Katalog &amp; Harga
            </Link>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-primary/50 text-primary h-11 px-6 font-semibold text-sm hover:bg-primary/10 transition-colors"
            >
              <MessageSquare className="w-4 h-4" />
              Hubungi Kami
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
