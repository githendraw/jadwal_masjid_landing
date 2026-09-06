"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export function TabShowcase() {
  return (
    <section id="tampilan" className="bg-muted/50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Tampilan{" "}
            <span className="text-primary">Profesional</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
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
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-3 bg-muted">
              <TabsTrigger value="beranda">Beranda TV</TabsTrigger>
              <TabsTrigger value="iqomah">Mode Iqomah</TabsTrigger>
              <TabsTrigger value="hp">Barcode Setting</TabsTrigger>
            </TabsList>

            <TabsContent value="beranda" className="mt-8 overflow-hidden">
        <Image
                 src="/hero.webp"
                 alt="Tampilan Beranda TV Full - Jadwal Sholat Digital"
                 width={1200}
                 height={756}
                 sizes="(max-width: 768px) 100vw, 50vw"
                 className="rounded-xl max-w-full object-contain"
               />
            </TabsContent>

            <TabsContent value="iqomah" className="mt-8 overflow-hidden">
              <Image
                src="/iqomah.webp"
                alt="Tampilan Mode Iqomah Countdown - Jadwal Sholat Digital"
                width={1200}
                height={766}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-xl max-w-full object-contain mx-auto"
              />
            </TabsContent>

            <TabsContent value="hp" className="mt-8 overflow-hidden">
              <Image
                src="/barcode-setting.webp"
                alt="Tampilan Barcode Setting - Scan QR Code via HP"
                width={1200}
                height={766}
                sizes="(max-width: 768px) 100vw, 50vw"
                className="rounded-xl max-w-full object-contain mx-auto"
              />
            </TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </section>
  );
}
