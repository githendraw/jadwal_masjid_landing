"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Globe, Monitor, Zap, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { MihrabCard } from "./mihrab-card";

const advantages = [
  {
    icon: Globe,
    title: "Akurat Metode Resmi",
    description:
      "Hitungan menggunakan metode Kemenag RI dan MWL. Lokasi otomatis via GPS.",
    colSpan: "md:col-span-2",
    image: "/tv1.webp",
    imageAlt: "Screenshot Setting Metode - Jadwal Sholat Digital",
    hasImage: true,
  },
  {
    icon: Monitor,
    title: "Siap Pakai",
    description:
      "Aplikasi sudah terinstall di dalam box. Tinggal colok ke TV, tanpa ribet.",
    colSpan: "md:col-span-2",
    image: "/tv2.webp",
    imageAlt: "Ilustrasi: Android TV Box → TV",
    hasImage: true,
  },
  {
    icon: Zap,
    title: "Auto Update",
    description: "Jadwal sholat update otomatis. Tidak perlu input manual setiap hari.",
    colSpan: "",
    hasImage: false,
  },
  {
    icon: Monitor,
    title: "Tampilan TV Modern",
    description:
      "UI menarik dengan animasi smooth. Cocok untuk TV apapun ukuran.",
    colSpan: "",
    hasImage: false,
  },
  {
    icon: Shield,
    title: "Offline Safe",
    description:
      "Tetap jalan meski internet mati. Cache jadwal 30 hari ke depan.",
    colSpan: "",
    hasImage: false,
  },
];

export function BentoGrid() {
  return (
    <section id="fitur-2" className="bg-card/30 py-24 relative overflow-hidden">
      <div className="absolute left-1/2 -translate-x-1/2 top-0 opacity-5 pointer-events-none hidden xl:block">
        <MihrabCard className="w-96 h-96" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            5 Alasan DKM{" "}
            <span className="gradient-text">Pindah ke Jadwal Masjid</span>
          </h2>
          <p className="text-foreground/70 max-w-2xl mx-auto">
            Dirancang khusus untuk kebutuhan masjid di Indonesia
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Large cards with images */}
          {advantages.slice(0, 2).map((adv, index) => (
            <motion.div
              key={adv.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`${adv.colSpan} card-hover`}
            >
              <Card className="bg-card/80 border-border h-full overflow-hidden rounded-xl gap-0 py-0">
                 <div className="w-full h-48 relative overflow-hidden rounded-t-xl">
                   {adv.hasImage && (
                     <Image
                       src={adv.image as string}
                       alt={adv.imageAlt || "Image"}
                       fill
                       className="object-cover"
                     />
                   )}
                 </div>
                 <CardContent className="p-0">
                   <div className="p-6">
                     <div className="flex items-start gap-3 mb-3">
                      <div className="p-2.5 bg-primary/10 rounded-lg">
                        <adv.icon className="w-5 h-5 text-primary" />
                      </div>
                      <h3 className="text-foreground font-semibold text-lg">
                        {adv.title}
                      </h3>
                    </div>
                    <p className="text-foreground/70 text-sm leading-relaxed">
                      {adv.description}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}

          {/* Small cards */}
          {advantages.slice(2).map((adv, index) => (
            <motion.div
              key={adv.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (index + 2) * 0.1 }}
              className="card-hover"
            >
              <Card className="bg-card/80 border-border h-full">
                <CardContent className="p-6">
                  <div className="flex items-start gap-3 mb-3">
                    <div className="p-2.5 bg-primary/10 rounded-lg">
                      <adv.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="text-foreground font-semibold text-base">
                        {adv.title}
                      </h3>
                      <p className="text-muted-foreground text-sm leading-relaxed mt-1">
                        {adv.description}
                      </p>
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
