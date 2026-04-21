"use client";

import { motion } from "framer-motion";
import { Star, Shield, Zap, Clock } from "lucide-react";
import Marquee from "react-fast-marquee";

const stats = [
  { icon: <Zap className="w-5 h-5" />, value: "Gratis", label: "Untuk Masjid" },
  { icon: <Shield className="w-5 h-5" />, value: "100%", label: "Akurasi Jadwal" },
  { icon: <Clock className="w-5 h-5" />, value: "Auto", label: "Update Harian" },
];

const reviews = [
  "⭐⭐⭐⭐⭐ \"Sangat membantu DKM masjid, jadwal selalu update sendiri tanpa perlu setting ulang.\"",
  "⭐⭐⭐⭐⭐ \"Instalasi cepat, TV masjid jadi lebih informatif dan islami.\"",
  "⭐⭐⭐⭐⭐ \"Fitur iqomah counter dan pengumuman sangat berguna untuk jamaah.\"",
  "⭐⭐⭐⭐⭐ \"Satu HP bisa control banyak TV, hemat waktu dan tenaga.\"",
  "⭐⭐⭐⭐⭐ \"Tampilan di TV sangat clean dan profesional. Jamaah jadi lebih tenang saat sholat.\"",
];

export function CredibilityStrip() {
  return (
    <section className="bg-slate-900 py-6 border-y border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Row */}
        <div className="grid grid-cols-3 gap-4 py-4">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex flex-col items-center gap-2 text-center"
            >
              <div className="text-emerald-400">{stat.icon}</div>
              <span className="text-white font-bold text-lg">{stat.value}</span>
              <span className="text-slate-400 text-sm">{stat.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Review Marquee */}
        <div className="pt-4">
          <Marquee speed={50} pauseOnHover>
            {reviews.map((review, index) => (
              <span
                key={index}
                className="mx-6 text-slate-400 text-sm whitespace-nowrap"
              >
                {review}
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}