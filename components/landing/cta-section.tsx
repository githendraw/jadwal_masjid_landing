"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/placeholder-image";
import { MihrabCard } from "./mihrab-card";

const WHATSAPP_LINK = "https://wa.me/6281234567890?text=Halo%20Waktu%20Sholat";

export function CTASection() {
  return (
    <section id="demo" className="bg-gradient-to-br from-emerald-600 to-emerald-800 py-16 sm:py-24 overflow-hidden relative">
      <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none hidden xl:block">
        <MihrabCard className="w-96 h-96" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Siap Tingkatkan
              <br />
              Profesionalitas Masjid?
            </h2>
            <p className="text-emerald-100 text-lg mb-8 max-w-lg">
              Jadwal sholat digital yang akurat, mudah dikelola, dan tampilan
              menarik. Bikin ibadah semakin nyaman untuk jamaah.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                variant="secondary"
                className="bg-white text-emerald-700 hover:bg-emerald-50"
              >
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  Buka Demo
                </a>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  <Phone className="w-4 h-4 mr-2" />
                  Hubungi Kami
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="flex justify-center items-center"
          >
            <PlaceholderImage
              width={400}
              height={600}
              label="CTA: Mockup HP Angle"
              note="PNG transparan. Mockup HP miring, layar nunjukin halaman Pengumuman. Ukuran 500x1000"
              className="max-w-[160px] sm:max-w-xs w-full"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}