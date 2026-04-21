"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { MihrabCard } from "./mihrab-card";

const testimonials = [
  {
    name: "H. Ahmad Fauzi",
    role: "DKM Masjid Al-Ikhlas, Bogor",
    text: "Dulu kami harus setting jadwal ulang setiap 6 bulan. Sekarang otomatis update setiap hari. Sangat membantu DKM yang cuma 2-3 orang.",
    rating: 5,
  },
  {
    name: "H. Sudirman",
    role: "Pengurus Masjid Al-Munawar, Jakarta",
    text: "Tampilannya sangat bersih dan profesional. Jamaah jadi lebih tenang dan fokus saat sholat. Fitur iqomah counter juga sangat berguna.",
    rating: 5,
  },
  {
    name: "Ustadz Bilal",
    role: "Pengurus Masjid Baitul Mukarrim, Bandung",
    text: "Satu HP bisa control 4 TV di masjid dan musala. Pengumuman otomatis juga sangat membantu. Instalasi cepat, tinggal setting di HP.",
    rating: 5,
  },
  {
    name: "H. Rahman",
    role: "Pengurus Masjid Al-Hasnah, Makassar",
    text: "Masjid kami sudah pakai 3 bulan. Tidak ada kendala sama sekali, jadwal selalu akurat. Terima kasih, sangat bermanfaat untuk jamaah.",
    rating: 5,
  },
  {
    name: "H. Taufik",
    role: "DKM Masjid Nurul Iman, Surabaya",
    text: "Dulu ada masalah jadwal yang selalu salah. Sejak pakai Jadwal Masjid, jadwal selalu update otomatis. Sangat recommended untuk masjid manapun.",
    rating: 4,
  },
];

export function Testimonials() {
  return (
    <section id="testimoni" className="relative bg-[#0A192F] py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none hidden lg:block">
        <MihrabCard className="w-96 h-96" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-emerald-500/20 text-emerald-400 px-4 py-1.5 rounded-full text-sm font-medium mb-4"
          >
            <Star className="w-4 h-4 fill-emerald-400 text-emerald-400" />
            Testimoni Pengguna
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-4"
          >
            Dipercaya oleh{" "}
            <span className="text-emerald-400">Pengurus Masjid</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-slate-400 max-w-2xl mx-auto"
          >
            Kata mereka yang sudah menggunakan Jadwal Masjid untuk masjid mereka
          </motion.p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {testimonials.map((t, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-slate-900/50 border border-slate-800 rounded-xl p-6 hover:border-emerald-500/30 transition-colors"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < t.rating
                        ? "text-emerald-400 fill-emerald-400"
                        : "text-slate-600"
                    }`}
                  />
                ))}
              </div>
              <Quote className="w-6 h-6 text-emerald-500/30 mb-3" />
              <p className="text-slate-300 mb-4 text-sm leading-relaxed">
                &quot;{t.text}&quot;
              </p>
              <div className="border-t border-slate-800 pt-4">
                <p className="text-white font-medium">{t.name}</p>
                <p className="text-slate-500 text-sm">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}