"use client";

import { motion } from "framer-motion";
import { Globe, Monitor, Smartphone, Zap, Shield } from "lucide-react";
import { PlaceholderImage } from "@/components/placeholder-image";
import { Card, CardContent } from "@/components/ui/card";

const advantages = [
  {
    icon: Globe,
    title: "Akurat Metode Resmi",
    description:
      "Hitungan menggunakan metode Kemenag RI dan MWL. Lokasi otomatis via GPS.",
    colSpan: "col-span-2",
  },
  {
    icon: Smartphone,
    title: "Satu HP, Banyak TV",
    description:
      "Kelola semua TV dari smartphone. Tanpa komputer, tanpa kabel ribet.",
    colSpan: "col-span-2",
  },
  {
    icon: Zap,
    title: "Auto Update",
    description: "Jadwal sholat update otomatis. Tidak perlu input manual setiap hari.",
    colSpan: "",
  },
  {
    icon: Monitor,
    title: "Tampilan TV Modern",
    description:
      "UI menarik dengan animasi smooth. Cocok untuk TV apapun ukuran berapapun.",
    colSpan: "",
  },
  {
    icon: Shield,
    title: "Offline Safe",
    description:
      "Tetap jalan meski internet mati. Cache jadwal 30 hari ke depan.",
    colSpan: "",
  },
];

export function BentoGrid() {
  return (
    <section id="fitur" className="bg-[#0A192F] py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            5 Alasan DKM Pindah ke{" "}
            <span className="text-amber-400">Waktu Sholat</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Dirancang khusus untuk kebutuhan masjid di Indonesia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 md:row-span-1"
          >
            <Card className="bg-slate-800/50 border-slate-700 h-full">
              <CardContent className="p-6">
                <PlaceholderImage
                  width={800}
                  height={400}
                  label="Fitur 1: Screenshot Setting Metode"
                  note="Screenshot HP bagian Manajemen Masjid > Pilih metode Kemenag/MWL. Crop 800x400, fokus ke dropdown"
                  className="mb-4"
                />
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-500/20 rounded-lg">
                    <Globe className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {advantages[0].title}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {advantages[0].description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="md:col-span-2"
          >
            <Card className="bg-slate-800/50 border-slate-700 h-full">
              <CardContent className="p-6">
                <PlaceholderImage
                  width={800}
                  height={400}
                  label="Fitur 2: Ilustrasi HP ke Banyak TV"
                  note="Ilustrasi flat design. 1 HP di tengah, panah ke 3-4 TV. Background transparent PNG 800x400"
                  className="mb-4"
                />
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-amber-500/20 rounded-lg">
                    <Smartphone className="w-6 h-6 text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-lg mb-2">
                      {advantages[1].title}
                    </h3>
                    <p className="text-slate-400 text-sm">
                      {advantages[1].description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {advantages.slice(2).map((adv, index) => (
            <motion.div
              key={adv.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index + 2) * 0.1 }}
            >
              <Card className="bg-slate-800/50 border-slate-700 h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-amber-500/20 rounded-lg">
                      <adv.icon className="w-6 h-6 text-amber-400" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold text-lg mb-2">
                        {adv.title}
                      </h3>
                      <p className="text-slate-400 text-sm">{adv.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
