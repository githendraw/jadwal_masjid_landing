"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Phone, AlertCircle, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_LINK = "https://wa.me/6287774348558?text=Halo%20Jadwal%20Masjid,%20saya%20ingin%20bertanya...";
const APP_REGISTER_URL = "https://app.jadwalmasjid.com/register";
const APP_LOGIN_URL = "https://app.jadwalmasjid.com/login";

export function CTASection() {
  return (
    <section id="demo" className="relative bg-background py-24 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6">
            Jangan Biarkan Jadwal{" "}
            <span className="text-destructive/80">Salah</span> Lagi
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-2">
            Bayangkan jamaah sholat Maghrib 18:00 🕌, tapi jadwal di TV masih menunjukkan 17:55 ⏰. Jamaah bingung 😵‍💫, DKM panik 💦😰
          </p>
        </motion.div>

        {/* Failure vs Success comparison */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Failure */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-destructive/5 border border-destructive/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-destructive/80" />
              <h3 className="text-foreground font-semibold text-lg">
                Tanpa Jadwal Masjid
              </h3>
            </div>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-destructive/80 font-bold mt-0.5">✗</span>
                <span>Jadwal sering keliru karena setting manual</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive/80 font-bold mt-0.5">✗</span>
                <span>Harus setting ulang tiap 6 bulan</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive/80 font-bold mt-0.5">✗</span>
                <span>Tampilan TV tidak profesional</span>
              </li>
            </ul>
          </motion.div>

          {/* Success */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-primary/5 border border-primary/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <CheckCircle2 className="w-5 h-5 text-primary" />
              <h3 className="text-foreground font-semibold text-lg">
                Dengan Jadwal Masjid
              </h3>
            </div>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <span>Auto-update jadwal setiap hari, selalu akurat</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <span>Setup sekali, pakai selamanya</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <span>Tampilan TV profesional, jamaah tenang</span>
              </li>
            </ul>
          </motion.div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <div className="relative max-w-4xl mx-auto rounded-3xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/25 via-primary/10 to-transparent" />
            <div className="absolute inset-0 border border-primary/20 rounded-3xl" />
            <div className="relative px-8 py-16 sm:px-16 sm:py-24">
              <div className="inline-flex items-center gap-2 bg-primary/15 border border-primary/30 rounded-full px-4 py-1.5 mb-6">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-primary"><path d="m5 8 3 3-3 3"/><rect x="3" y="3" width="18" rx="2"/><path d="M17 3h6v6"/></svg>
                <span className="text-primary text-sm font-medium">Setup Mudah & Cepat</span>
              </div>
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                Siap Tingkatkan Profesionalitas<br />Masjid Kamu?
              </h3>
              <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-xl mx-auto">
                Jadwal sholat digital yang akurat, mudah dikelola, dan tampilan menarik. Setup sekali, pakai selamanya.
              </p>
              <div className="flex flex-col gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-primary text-base px-8 py-6 w-full sm:w-auto"
                >
                  <a href={APP_REGISTER_URL} target="_blank" rel="noopener noreferrer">
                    Coba Gratis Sekarang
                  </a>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <div className="flex gap-3 justify-center mt-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="border-primary/30 text-primary hover:bg-primary/10"
                  >
                    <a href={APP_LOGIN_URL} target="_blank" rel="noopener noreferrer">
                      Masuk ke Dashboard
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                      Atau Hubungi Kami
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
