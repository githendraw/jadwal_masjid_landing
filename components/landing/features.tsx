"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Globe,
  Smartphone,
  Monitor,
  Bell,
  Wifi,
  Palette,
  Clock,
  Shield,
  Languages,
  QrCode,
  Settings,
  Layout,
} from "lucide-react";

const features = [
  {
    icon: Globe,
    title: "Metode Perhitungan Resmi",
    description:
      "Pilihan metode Kemenag RI, MWL, dan custom. Cocok untuk semua daerah di Indonesia.",
  },
  {
    icon: Smartphone,
    title: "Kelola dari Smartphone",
    description:
      "Semua pengaturan dari HP. Tidak perlu dekat TV untuk mengubah jadwal.",
  },
  {
    icon: Monitor,
    title: "Tampilan Full HD",
    description:
      "Optimasi untuk TV 32-65 inch. Teks besar, warna kontras, mudah dibaca.",
  },
  {
    icon: Bell,
    title: "Notifikasi Adzan",
    description:
      "Tampil notifikasi adzan 5 menit sebelumnya. Pengumuman bisa dikustom.",
  },
  {
    icon: Wifi,
    title: "Offline Mode",
    description:
      "Cache jadwal 30 hari. Tetap jalan walau internet mati sebulan.",
  },
  {
    icon: Palette,
    title: "Tema customizable",
    description:
      "Ganti warna, font, dan layout sesuai karakter masjid. Ada 5 preset tema.",
  },
  {
    icon: Clock,
    title: "Mode Iqomah",
    description:
      "Countdown iqomah otomatis. Tampil setelah adzan, hitung mundur ke sholat.",
  },
  {
    icon: Shield,
    title: "Anti Lag",
    description:
      "Dirancang ringan. Jalan lancar di TV jadul sekalipun.",
  },
  {
    icon: Languages,
    title: "Multi Bahasa",
    description:
      "Indonesia dan Arab. Mudah dipilih dari pengaturan.",
  },
  {
    icon: QrCode,
    title: "QR Code Connect",
    description:
      "Scan QR di TV untuk sinkron. Tanpa perlu input IP atau kabel.",
  },
  {
    icon: Settings,
    title: "Manajemen Multi TV",
    description:
      "Satu HP konek ke 10+ TV sekaligus. Semua tampil sama.",
  },
  {
    icon: Layout,
    title: "Background Kustom",
    description:
      "Upload foto Kabah, masjid, atau arabic pattern. Tambah kesan estetik.",
  },
];

export function Features() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-green-900 mb-4">
            Fitur{" "}
            <span className="text-green-400">Lengkap</span>
          </h2>
          <p className="text-green-700 max-w-2xl mx-auto">
            Semua yang kamu butuhkan untuk display jadwal sholat yang profesional
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion className="w-full space-y-4">
            {features.map((feature, index) => (
              <AccordionItem
                key={feature.title}
                value={feature.title}
                className="bg-green-50/50 border-green-200 rounded-lg px-6"
              >
                <AccordionTrigger className="hover:no-underline">
                  <div className="flex items-center gap-4">
                    <div className="p-2 bg-green-500/20 rounded-lg">
                      <feature.icon className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="text-green-900 font-medium">
                      {feature.title}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="text-green-700 pb-4 pl-12">
                  {feature.description}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
