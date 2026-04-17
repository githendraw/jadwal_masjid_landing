"use client";

import { motion } from "framer-motion";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PlaceholderImage } from "@/components/placeholder-image";

export function CtaSection() {
  return (
    <section id="demo" className="bg-gradient-to-br from-emerald-600 to-emerald-800 py-16 sm:py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
                Buka Demo
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10"
              >
                <Phone className="w-4 h-4 mr-2" />
                Hubungi Kami
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
