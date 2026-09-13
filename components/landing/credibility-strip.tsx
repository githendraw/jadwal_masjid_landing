"use client";

import { motion } from "framer-motion";
import { Shield, Zap, Clock, Users } from "lucide-react";

// Marquee testimoni dan badge "4.8 Rating Pengguna" dihapus 2026-09-13:
// keduanya memakai teks contoh, bukan pelanggan nyata. Jangan dikembalikan
// sebelum ada testimoni/rating yang benar-benar dari pengguna.
const stats = [
  { icon: Shield, value: "120+", label: "Masjid Terdaftar" },
  { icon: Clock, value: "100%", label: "Akurasi Jadwal" },
  { icon: Zap, value: "Auto", label: "Update Harian" },
  { icon: Users, value: "Offline", label: "Tanpa Internet" },
];

export function CredibilityStrip() {
  return (
    <section className="bg-card/50 border-y border-border/50 relative overflow-hidden">
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-primary/5" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Stats Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex flex-col items-center gap-2 text-center group"
            >
              <div className="text-primary/60 group-hover:text-primary transition-colors">
                <stat.icon className="w-5 h-5" />
              </div>
              <span className="text-foreground font-bold text-xl sm:text-2xl">{stat.value}</span>
              <span className="text-muted-foreground text-xs sm:text-sm">{stat.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
