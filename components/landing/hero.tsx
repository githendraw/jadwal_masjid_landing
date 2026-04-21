"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PrayerClock } from "./prayer-clock";
const WHATSAPP_LINK = "https://wa.me/6287774348558?text=Halo%20Waktu%20Sholat";

export function Hero() {
  return (
    <section className="relative min-h-[80vh] bg-[#0A192F] overflow-hidden pt-20 sm:pt-16">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
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
            className="relative"
          >
           <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-emerald-500/20 border border-emerald-500/30 rounded-full px-4 py-2 mb-4"
            >
              <motion.div
                className="w-2 h-2 rounded-full bg-emerald-400"
                animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              <span className="text-emerald-400 text-sm font-medium">
                Jadwal Real-time
              </span>
            </motion.div>

            <div className="mb-6">
              <div className="w-fit bg-[#0A192F] p-4 rounded-xl border border-slate-700 shadow-xl">
                <PrayerClock className="w-24 h-24" />
              </div>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              Jadwal Sholat Digital
              <span className="text-emerald-400"> untuk TV Masjid</span>
            </h1>

            <p className="text-lg text-slate-400 mb-8 max-w-xl">
              Tampilkan jadwal sholat akurat di TV masjid dengan mudah. Satu
              HP mengelola banyak TV, otomatis update setiap hari tanpa
              ribet.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button
                size="lg"
                className="bg-emerald-500 hover:bg-emerald-600 text-white"
              >
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  Buka Demo
                </a>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10"
              >
                <Phone className="w-4 h-4 mr-2" />
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  Hubungi Kami
                </a>
              </Button>
            </div>

            <p className="text-sm text-slate-500 mb-4 sm:mb-0">
              Hubungi kami untuk pemasangan. Bayar sekali, pakai selamanya.
            </p>

           </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative hidden sm:block"
          >
            <div className="relative z-10 overflow-hidden">
              <Image
                src="/hero.png"
                alt="Mockup TV 65 Inch Angle - Jadwal Sholat Digital"
                width={1200}
                height={750}
                className="rounded-2xl max-w-full object-contain"
              />
            </div>

            <div className="absolute -top-4 -right-4 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl" />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative sm:hidden -mt-5"
          >
            <div className="relative z-10 overflow-hidden">
              <Image
                src="/hero.png"
                alt="Mockup TV 65 Inch Angle - Jadwal Sholat Digital"
                width={800}
                height={500}
                className="rounded-2xl max-w-full object-contain"
              />
            </div>

            <div className="absolute -top-4 -right-4 w-48 h-48 bg-emerald-500/20 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}