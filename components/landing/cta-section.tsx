"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_LINK = "https://wa.me/6287774348558?text=Halo%20Jadwal%20Masjid,%20saya%20ingin%20bertanya...";

export function CTASection() {
  return (
    <section id="demo" className="bg-gradient-to-br from-emerald-600 to-emerald-800 py-16 sm:py-24 overflow-hidden relative">
      <div className="absolute right-10 top-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-2xl pointer-events-none hidden xl:block" />
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
                <Phone className="w-4 h-4 mr-2" />
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
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
              className="flex justify-center items-center group"
            >
            <motion.div
              whileHover={{ scale: 1.03 }}
              className="relative rounded-xl border border-white/10 overflow-hidden"
            >
              <Image
                src="/showcase.png"
                alt="Mockup HP Angle - Jadwal Sholat Digital"
                width={800}
                height={500}
                className="rounded-xl max-w-full object-contain"
              />
              <div className="absolute inset-0 bg-black/20 rounded-xl" />
            </motion.div>
            </motion.div>
        </div>
      </div>
    </section>
  );
}