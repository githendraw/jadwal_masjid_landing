"use client";

import { motion } from "framer-motion";
import { Cable, QrCode, SlidersHorizontal, Truck } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/6287789179242?text=Halo%20Jadwal%20Masjid,%20saya%20ingin%20memesan%20Android%20TV%20Box%20Jadwal%20Masjid";

const steps = [
  {
    icon: Cable,
    title: "1. Pilih Paket & Pasang",
    description:
      "Untuk Paket Mesin: colok TV Box ke TV via HDMI. Untuk Paket TV 32\"/40\": kami rakit TV + bracket rapi di belakang layar, tinggal colok 1 kabel listrik.",
  },
  {
    icon: QrCode,
    title: "2. Scan QR Code di TV",
    description:
      "Scan QR Code yang ada di layar TV menggunakan HP Anda (di Wi-Fi yang sama). Tanpa perlu download aplikasi atau daftar akun!",
  },
  {
    icon: SlidersHorizontal,
    title: "3. Atur & Simpan dari HP",
    description:
      "Atur nama masjid, pengumuman running text, dan timer iqomah langsung di browser HP. Sekali simpan, TV langsung ter-update.",
  },
];

export function HowItWorks() {
  return (
    <section id="cara-pakai" className="bg-background py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Cara Pakai{" "}
            <span className="text-primary">3 Langkah</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Simpel dan cepat. Dalam 5 menit, TV masjid sudah bisa menampilkan
            jadwal sholat.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto max-w-2xl mb-12 flex items-start gap-3 bg-primary/5 border border-primary/20 rounded-xl p-4 text-sm text-foreground/80"
        >
          <Truck className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
          <span>
            <strong className="text-foreground">Butuh terima beres?</strong> Untuk
            area kota Anda, tersedia layanan pasang &amp; bor dinding langsung di
            masjid (Rp300.000). Kami juga sudah mengatur nama masjid &amp;
            running text sebelum paket dikirim.
          </span>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center">
                    <step.icon className="w-10 h-10 text-primary" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
