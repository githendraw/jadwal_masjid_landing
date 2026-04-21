"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlaceholderImage } from "@/components/placeholder-image";

export function TabShowcase() {
  return (
    <section id="tampilan" className="bg-slate-950 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Tampilan{" "}
            <span className="text-emerald-400">Profesional</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Cocok untuk TV mosque ukuran besar. Tampilan jelas dan mudah dibaca
            dari jauh.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Tabs defaultValue="beranda" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-slate-800">
              <TabsTrigger value="beranda">Beranda TV</TabsTrigger>
              <TabsTrigger value="iqomah">Mode Iqomah</TabsTrigger>
              <TabsTrigger value="hp">Aplikasi HP</TabsTrigger>
            </TabsList>

            <TabsContent value="beranda" className="mt-8 overflow-hidden">
        <Image
                 src="/hero.png"
                 alt="Tampilan Beranda TV Full - Jadwal Sholat Digital"
                 width={1920}
                 height={1080}
                 className="rounded-xl max-w-full object-contain"
               />
            </TabsContent>

            <TabsContent value="iqomah" className="mt-8 overflow-hidden">
              <PlaceholderImage
                width={1920}
                height={1080}
                label="Showcase: Mode Iqomah Countdown"
                note="Screenshot 16:9. BG sama tapi scrim 80%. Tengah text 'IQOMAH' 60px, 'MAGHRIB' pink, '09:58' gede 180px"
                className="rounded-xl max-w-full"
              />
            </TabsContent>

            <TabsContent value="hp" className="mt-8">
              <PlaceholderImage
                width={1080}
                height={1920}
                label="Showcase: Aplikasi HP Manajemen"
                note="Screenshot HP 9:16. Tampilkan halaman Manajemen Masjid. Ada form nama, kota, background. Status 3 TV Online"
                className="rounded-xl max-w-sm mx-auto"
              />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
