"use client";

import { motion } from "framer-motion";
import { Cable, Monitor, ShieldCheck, Settings, CheckCircle2, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

const ORDER_LINK = "https://wa.me/6285283302551?text=Halo%20Jadwal%20Masjid,%20saya%20ingin%20memesan%20Android%20TV%20Box%20Jadwal%20Masjid";
const WHATSAPP_LINK = "https://wa.me/6285283302551?text=Halo%20Jadwal%20Masjid,%20saya%20ingin%20bertanya...";

const price = "Rp 946.000";

const includes = [
  { icon: Monitor, text: "1 unit Android TV Box Jadwal Masjid" },
  { icon: Cable, text: "Kabel HDMI & adaptor daya" },
  { icon: Settings, text: "Aplikasi sudah terinstall, siap pakai" },
  { icon: ShieldCheck, text: "Garansi & dukungan pemasangan" },
];

const highlights = [
  { icon: CheckCircle2, text: "1 box untuk 1 TV" },
  { icon: CheckCircle2, text: "Setup 100% offline" },
  { icon: CheckCircle2, text: "Auto-update jadwal setiap hari" },
  { icon: CheckCircle2, text: "Tampilan Full HD profesional" },
];

export function PricingSection() {
  return (
    <section id="harga" className="bg-card/30 py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Harga{" "}
            <span className="gradient-text">Android TV Box</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Investasi sekali untuk jadwal sholat digital yang profesional di TV masjid Anda.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative rounded-3xl overflow-hidden border border-primary/30 bg-background shadow-2xl shadow-primary/10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-transparent" />

          <div className="relative p-8 sm:p-12 text-center">
            <div className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-6">
              <Monitor className="w-4 h-4 text-primary" />
              <span className="text-primary text-sm font-medium">Sekali Bayar, Langsung Jadi</span>
            </div>

            <div className="text-4xl sm:text-5xl font-bold text-foreground mb-4">
              {price}
            </div>
            <p className="text-muted-foreground text-sm mb-8">
              per Android TV Box · 1 box untuk 1 TV
            </p>

            <div className="grid sm:grid-cols-2 gap-3 mb-8 text-left max-w-xl mx-auto">
              {includes.map((item, index) => (
                <div key={index} className="flex items-start gap-3 bg-card/50 border border-border rounded-xl p-4">
                  <item.icon className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-foreground/80">{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mb-10">
              {highlights.map((item, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <item.icon className="w-4 h-4 text-primary" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold glow-primary text-base px-8 py-6 w-full sm:w-auto"
              >
                <a href={ORDER_LINK} target="_blank" rel="noopener noreferrer">
                  Pesan Sekarang
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 text-primary hover:bg-primary/10 text-base w-full sm:w-auto"
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  Konsultasi Dulu
                </a>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}