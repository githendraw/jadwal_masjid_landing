"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, CheckCircle2, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";

const WHATSAPP_LINK = "https://wa.me/6285283302551?text=Halo%20Jadwal%20Masjid,%20saya%20ingin%20bertanya...";
const ORDER_LINK = "https://wa.me/6285283302551?text=Halo%20Jadwal%20Masjid,%20saya%20ingin%20memesan%20Android%20TV%20Box%20Jadwal%20Masjid";

const trustBullets = [
  { icon: ShieldCheck, text: "Metode perhitungan resmi Kemenag RI" },
  { icon: CheckCircle2, text: "Auto-update jadwal setiap hari" },
  { icon: CheckCircle2, text: "Aplikasi sudah terinstall — tinggal setting" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen bg-background overflow-hidden pt-16 sm:pt-20">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/15 via-background/50 to-background" />
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 212, 170, 0.08) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(0, 212, 170, 0.08) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="order-2 lg:order-1"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-6"
            >
              <div
                className="w-2 h-2 rounded-full bg-primary animate-pulse"
              />
              <span className="text-primary text-sm font-medium">
                Jadwal Sholat Real-time untuk TV Masjid
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
              Jadwal Sholat{" "}
              <span className="gradient-text">Digital</span>
              <br />
              <span className="text-muted-foreground text-3xl sm:text-4xl lg:text-5xl">
                untuk TV Masjid
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-muted-foreground mb-8 max-w-xl leading-relaxed">
              Android TV Box khusus jadwal sholat untuk TV masjid. Aplikasi
              sudah terinstall, tinggal colok dan setting — tanpa ribet, tanpa
              butuh internet.
            </p>

            {/* Trust bullets */}
            <div className="flex flex-wrap gap-4 mb-8">
              {trustBullets.map((bullet, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.15 }}
                  className="flex items-center gap-2 text-sm text-muted-foreground"
                >
                  <bullet.icon className="w-4 h-4 text-primary flex-shrink-0" />
                  <span>{bullet.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-primary"
              >
                <a href={ORDER_LINK} target="_blank" rel="noopener noreferrer">
                  Pesan Sekarang
                </a>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10"
              >
                <Phone className="w-4 h-4 mr-2" />
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  Hubungi Kami
                </a>
              </Button>
            </motion.div>

            {/* Social proof */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-8 flex items-center gap-3 text-sm text-muted-foreground"
            >
              <div className="flex -space-x-2">
                {["bg-primary/30", "bg-primary/20", "bg-primary/15"].map((c, i) => (
                  <div key={i} className={`w-8 h-8 rounded-full ${c} border-2 border-background flex items-center justify-center text-xs font-bold text-primary`} style={{ zIndex: 3 - i }}>
                    {["A", "B", "S"][i]}
                  </div>
                ))}
              </div>
              <span>Digunakan oleh <span className="text-foreground font-semibold">120+</span> pengurus masjid di seluruh Indonesia</span>
            </motion.div>
          </motion.div>

          {/* Right — Hero image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative z-10 overflow-hidden">
              <Image
                src="/hero.webp"
                alt="Mockup TV 65 Inch Angle - Jadwal Sholat Digital"
                width={1200}
                height={750}
                className="rounded-2xl max-w-full object-contain shadow-2xl shadow-primary/10"
              />
            </div>

            {/* Decorative elements */}
            <div className="absolute -top-8 -right-8 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
            <div className="absolute -bottom-8 -left-8 w-48 h-48 bg-amber-400/10 rounded-full blur-3xl" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
