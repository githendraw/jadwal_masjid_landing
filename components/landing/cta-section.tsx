"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone, AlertCircle, CheckCircle2, Cable } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_LINK = "https://wa.me/6285283302551?text=Halo%20Jadwal%20Masjid,%20saya%20ingin%20bertanya...";
const ORDER_LINK = "https://wa.me/6285283302551?text=Halo%20Jadwal%20Masjid,%20saya%20ingin%20memesan%20Android%20TV%20Box%20Jadwal%20Masjid";

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
            Tanpa Ribet,{" "}
            <span className="gradient-text">Langsung Siap Pakai</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-2">
            Android TV Box dengan aplikasi Jadwal Masjid yang sudah terinstall.
            Sekali beli, langsung bisa dipasang di TV masjid Anda.
          </p>
        </motion.div>

        {/* Without vs With comparison */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {/* Without */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-destructive/5 border border-destructive/20 rounded-xl p-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <AlertCircle className="w-5 h-5 text-destructive/80" />
              <h3 className="text-foreground font-semibold text-lg">
                Cara Lama
              </h3>
            </div>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-destructive/80 font-bold mt-0.5">✗</span>
                <span>Harus cari & pasang aplikasi sendiri</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive/80 font-bold mt-0.5">✗</span>
                <span>Butuh internet & perangkat pendukung</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-destructive/80 font-bold mt-0.5">✗</span>
                <span>Jadwal sering keliru karena setting manual</span>
              </li>
            </ul>
          </motion.div>

          {/* With */}
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
                Android TV Box Jadwal Masjid
              </h3>
            </div>
            <ul className="space-y-3 text-muted-foreground text-sm">
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <span>Aplikasi sudah terinstall — tinggal colok</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <span>Setup offline, tanpa butuh internet</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-primary font-bold mt-0.5">✓</span>
                <span>Jadwal akurat, tampilan profesional</span>
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
                <Cable className="w-4 h-4 text-primary" />
                <span className="text-primary text-sm font-medium">Siap Pakai & Mudah Dipsang</span>
              </div>
              <h3 className="text-2xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
                Jadwal Sholat Profesional<br />di TV Masjid Kamu
              </h3>
              <p className="text-muted-foreground text-base sm:text-lg mb-8 max-w-xl mx-auto">
                Sekali beli, langsung pasang. Tanpa ribet, tanpa setting ulang.
              </p>
              <div className="flex flex-col gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-primary text-base px-8 py-6 w-full sm:w-auto"
                >
                  <a href={ORDER_LINK} target="_blank" rel="noopener noreferrer">
                    Pesan Sekarang
                  </a>
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <div className="flex gap-3 justify-center mt-2">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-muted-foreground hover:text-foreground"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                      Tanya-tanya Dulu
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