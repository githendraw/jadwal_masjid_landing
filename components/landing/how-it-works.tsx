"use client";

import { motion } from "framer-motion";
import { MessageSquare, SlidersHorizontal, QrCode } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Hubungi Kami",
    description:
      "Hubungi kami untuk pemasangan aplikasi Waktu Sholat. Kami akan bantu proses instalasi.",
  },
  {
    icon: SlidersHorizontal,
    title: "Atur Pengaturan",
    description:
      "Pilih masjid, metode perhitungan sholat (Kemenag/MWL), dan lokasi otomatis via GPS.",
  },
  {
    icon: QrCode,
    title: "Scan ke TV",
    description:
      "Buka menu TV, scan QR code di layar TV. Selesai! Jadwal sholat langsung tampil.",
  },
];

export function HowItWorks() {
  return (
    <section id="cara-pakai" className="bg-[#0A192F] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Cara Pakai{" "}
            <span className="text-emerald-400">3 Langkah</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Simpel dan cepat. Dalam 5 menit, TV masjid sudah bisa menampilkan
            jadwal sholat.
          </p>
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
                  <div className="w-20 h-20 bg-emerald-500/20 rounded-2xl flex items-center justify-center">
                    <step.icon className="w-10 h-10 text-emerald-400" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-slate-400">{step.description}</p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-emerald-500/50 to-transparent" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
