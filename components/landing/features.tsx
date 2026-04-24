"use client";

import { motion } from "framer-motion";
import {
  Globe,
  Smartphone,
  Monitor,
  Bell,
  Wifi,
  Palette,
  Clock,
  Settings,
  Layout,
} from "lucide-react";
import { MihrabCard } from "./mihrab-card";

const features = [
  {
    icon: Globe,
    title: "Metode Perhitungan Resmi",
    description:
      "Pilihan metode Kemenag RI, MWL, dan custom. Cocok untuk semua daerah di Indonesia.",
    span: "md:col-span-2",
  },
  {
    icon: Smartphone,
    title: "Kelola dari Smartphone",
    description:
      "Semua pengaturan dari HP. Tidak perlu dekat TV untuk mengubah jadwal.",
    span: "",
  },
  {
    icon: Monitor,
    title: "Tampilan Full HD",
    description:
      "Optimasi untuk TV 32-65 inch. Teks besar, warna kontras, mudah dibaca.",
    span: "",
  },
  {
    icon: Bell,
    title: "Notifikasi Adzan",
    description:
      "Tampil notifikasi adzan 5 menit sebelumnya. Pengumuman bisa dikustom.",
    span: "",
  },
  {
    icon: Wifi,
    title: "Offline Mode",
    description:
      "Cache jadwal 30 hari. Tetap jalan walau internet mati sebulan.",
    span: "",
  },
  {
    icon: Palette,
    title: "Tema Customizable",
    description:
      "Ganti warna, font, dan layout sesuai karakter masjid. Ada 5 preset tema.",
    span: "",
  },
  {
    icon: Clock,
    title: "Mode Iqomah",
    description:
      "Countdown iqomah otomatis. Tampil setelah adzan, hitung mundur ke sholat.",
    span: "md:col-span-2",
  },
  {
    icon: Settings,
    title: "Manajemen Multi TV",
    description:
      "Satu HP konek ke 10+ TV sekaligus. Semua tampil sama persis.",
    span: "",
  },
  {
    icon: Layout,
    title: "Background Kustom",
    description:
      "Upload foto Kabah, masjid, atau arabic pattern. Tambah kesan estetik.",
    span: "",
  },
];

export function Features() {
  return (
    <section id="fitur" className="bg-background py-24 relative overflow-hidden">
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none hidden xl:block">
        <MihrabCard className="w-96 h-96" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Fitur{" "}
            <span className="gradient-text">Lengkap</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Semua yang kamu butuhkan untuk display jadwal sholat yang profesional
          </p>
        </motion.div>

        {/* Bento grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.07 }}
              className={`${feature.span} bg-card/50 border border-border rounded-xl p-6 card-hover group`}
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors">
                  <feature.icon className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="text-foreground font-semibold text-base mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
