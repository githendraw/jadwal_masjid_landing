"use client";

import { motion } from "framer-motion";
import { ArrowRight, Download } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/placeholder-image";
import { PrayerClock } from "./prayer-clock";

export function Hero() {
  return (
    <section className="relative min-h-screen bg-[#0A192F] overflow-hidden pt-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent" />
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `linear-gradient(rgba(16, 185, 129, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(16, 185, 129, 0.1) 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30 mb-6">
              v2.0 Sudah Tersedia
            </Badge>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Jadwal Sholat Digital
              <span className="text-amber-400"> untuk TV Masjid</span>
            </h1>

            <p className="text-lg text-slate-400 mb-8 max-w-xl">
              Tampilkan jadwal sholat akurat di TV masjid dengan mudah. Satu
              HP mengelola banyak TV, otomatis update setiap hari tanpa
              ribet.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="bg-amber-500 hover:bg-amber-600 text-white"
              >
                Buka Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-amber-500 text-amber-400 hover:bg-amber-500/10"
              >
                <Download className="w-4 h-4 mr-2" />
                Unduh APK
              </Button>
            </div>

            <p className="text-sm text-slate-500">
              Gratis untuk Masjid. Tersedia di Android.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="relative z-10">
              <PlaceholderImage
                width={1200}
                height={750}
                label="Hero: Mockup TV 65 Inch Angle"
                note="PNG transparan. TV miring 15deg. Layar isi UI Beranda: header putih 'MASJID AL-IKHLAS', 7 card, jam 18:04, Maghrib 18:08 aktif. Ada glow emerald di belakang. Ukuran 1200x750 biar ringan"
                className="rounded-2xl"
              />
            </div>

            <div className="absolute -bottom-10 -left-10 z-20">
              <div className="bg-[#0A192F] p-4 rounded-xl border border-slate-700 shadow-xl">
                <PrayerClock className="w-32 h-32" />
              </div>
            </div>

            <div className="absolute -top-4 -right-4 w-72 h-72 bg-amber-500/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
