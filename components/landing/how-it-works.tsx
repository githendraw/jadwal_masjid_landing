"use client";

import { motion } from "framer-motion";
import { MessageSquare, Cable, SlidersHorizontal } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/6285283302551?text=Halo%20Jadwal%20Masjid,%20saya%20ingin%20memesan%20Android%20TV%20Box%20Jadwal%20Masjid";

const steps = [
  {
    icon: MessageSquare,
    title: "Pesan TV Box",
    description:
      "Hubungi kami via WhatsApp untuk memesan Android TV Box. Kami bantu proses pemesanan dan pengiriman.",
  },
  {
    icon: Cable,
    title: "Pasang ke TV",
    description:
      "Colok TV box ke TV masjid Anda. Kabel HDMI sudah termasuk. Tidak perlu download atau install apa pun.",
  },
  {
    icon: SlidersHorizontal,
    title: "Setting & Siap",
    description:
      "Atur nama masjid, kota, dan metode perhitungan (Kemenag/MWL). Semua offline, langsung tampil.",
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
