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
    <section id="testimoni" className="relative bg-background py-20 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-5 pointer-events-none hidden lg:block">
        <MihrabCard className="w-96 h-96" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 bg-primary/20 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4"
          >
            <Star className="w-4 h-4 fill-primary text-primary" />
            Testimoni Pengguna
          </motion.div>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-3xl sm:text-4xl font-bold text-foreground mb-4"
          >
            Dipercaya oleh{" "}
            <span className="text-primary">Pengurus Masjid</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-muted-foreground max-w-2xl mx-auto"
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
              className="bg-card/50 border border-border rounded-xl p-6 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center gap-1 mb-4">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < t.rating
                        ? "text-primary fill-primary"
                        : "text-muted-foreground"
                    }`}
                  />
                ))}
              </div>
              <Quote className="w-6 h-6 text-primary/30 mb-3" />
              <p className="text-foreground mb-4 text-sm leading-relaxed">
                &quot;{t.text}&quot;
              </p>
              <div className="border-t border-border pt-4">
                <p className="text-foreground font-medium">{t.name}</p>
                <p className="text-muted-foreground text-sm">{t.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}