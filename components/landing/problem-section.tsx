"use client";

import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw, EyeOff, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const APP_REGISTER_URL = "https://app.jadwalmasjid.com/register";

const problems = [
  {
    icon: AlertTriangle,
    title: "Jadwal Selalu Salah",
    text: "Setting ulang jadwal tiap 6 bulan, sering keliru karena manual input. Jamaah jadi ragu.",
  },
  {
    icon: RefreshCw,
    title: "Ribet Setup Manual",
    text: "Harus buka TV, setting satu per satu. Kalau ada 3 TV, kerja tiga kali lipatan.",
  },
  {
    icon: EyeOff,
    title: "Tampilan Tidak Profesional",
    text: "Jadwal di TV kelihatan kasar, font kecil, warna tidak kontras. Jamaah kurang nyaman.",
  },
];

const solutions = [
  {
    icon: RefreshCw,
    title: "Auto-Update Setiap Hari",
    text: "Jadwal sholat selalu akurat. Tidak perlu setting ulang, sistem yang handle semua.",
  },
  {
    icon: Smartphone,
    title: "Kelola dari Satu HP",
    text: "Satu smartphone atur semua TV. QR scan, selesai. Tidak perlu buka TV.",
  },
  {
    icon: EyeOff,
    title: "Tampilan TV Profesional",
    text: "Font besar, warna kontras, animasi smooth. Jamaah tenang, fokus ibadah.",
  },
];

export function ProblemSection() {
  return (
    <section className="bg-background py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Problem section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Sering Mengalami{" "}
          <span className="text-destructive/80">Masalah Ini?</span>
        </h2>
        <p className="text-foreground/70 max-w-2xl mx-auto">
          Kami tahu frustrasinya. DKM masjid harus fokus melayani jamaah,
          bukan pusing dengan jadwal yang salah.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8 mb-24">
        {problems.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-destructive/5 border border-destructive/20 rounded-xl p-6 card-hover"
          >
            <div className="w-12 h-12 bg-destructive/10 rounded-lg flex items-center justify-center mb-4">
              <item.icon className="w-6 h-6 text-destructive/80" />
            </div>
            <h3 className="text-foreground font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-foreground/70 text-sm">{item.text}</p>
          </motion.div>
        ))}
      </div>

      {/* Section divider */}
      <div className="section-divider mb-16" />

      {/* Solution section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
          Solusi dari{" "}
          <span className="gradient-text">Jadwal Masjid</span>
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Kami merancang solusi untuk setiap masalah yang dihadapi pengurus masjid
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {solutions.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="bg-card/50 border border-border rounded-xl p-6 card-hover"
          >
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
              <item.icon className="w-6 h-6 text-primary" />
            </div>
            <h3 className="text-foreground font-semibold text-lg mb-2">{item.title}</h3>
            <p className="text-foreground/70 text-sm">{item.text}</p>
            {index === 1 && (
              <Button
                size="sm"
                variant="ghost"
                className="mt-4 w-full text-primary hover:text-primary hover:bg-primary/5"
              >
                <a href={APP_REGISTER_URL} target="_blank" rel="noopener noreferrer">
                  Coba Sekarang
                </a>
                <ArrowRight className="w-3 h-3 ml-2" />
              </Button>
            )}
          </motion.div>
        ))}
      </div>
    </div>
    </section>
  );
}
