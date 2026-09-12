"use client";

import { motion } from "framer-motion";
import {
  Cable,
  Monitor,
  ShieldCheck,
  Settings,
  CheckCircle2,
  MessageSquare,
  Tv,
  Wrench,
  HeartHandshake,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const WHATSAPP_LINK = "https://wa.me/6287789179242?text=Halo%20Jadwal%20Masjid,%20saya%20ingin%20bertanya...";

const WHATSAPP_BASE = "https://wa.me/6287789179242?text=Halo%20Jadwal%20Masjid,%20saya%20ingin%20memesan%20paket%20";

interface Plan {
  badge?: string;
  featured?: boolean;
  slug: string;
  icon: typeof Monitor;
  name: string;
  subtitle: string;
  price: string;
  originalPrice: string;
  priceNote: string;
  includes: { icon: typeof CheckCircle2; text: string }[];
  highlights: { icon: typeof CheckCircle2; text: string }[];
  orderText: string;
}

const plans: Plan[] = [
  {
    icon: Cable,
    slug: "paket-mesin",
    name: "Paket Mesin",
    subtitle: "Untuk masjid yang sudah punya TV",
    price: "Rp 860.000",
    originalPrice: "Rp 1.200.000",
    priceNote: "Promo · sekali bayar, tanpa langganan",
    includes: [
      { icon: Cable, text: "1 unit Android TV Box Jadwal Masjid (RAM 2GB)" },
      { icon: Cable, text: "Kabel HDMI pendek & adaptor daya" },
      { icon: Settings, text: "Aplikasi sudah terinstall, siap colok & jalan" },
      { icon: ShieldCheck, text: "Garansi & dukungan pemasangan" },
    ],
    highlights: [
      { icon: CheckCircle2, text: "Untuk TV 32–65 inch yang sudah ada" },
      { icon: CheckCircle2, text: "Auto-boot langsung ke jadwal sholat" },
      { icon: CheckCircle2, text: "Stabil 24 jam nonstop" },
      { icon: CheckCircle2, text: "100% offline, tanpa internet" },
    ],
    orderText: "Pesan Paket Mesin",
  },
  {
    icon: Monitor,
    slug: "paket-hemat-32",
    name: "Paket Hemat 32\"",
    subtitle: "Favorit untuk musholla & masjid mini",
    price: "Rp 3.899.000",
    originalPrice: "Rp 4.800.000",
    priceNote: "Promo · sekali bayar, langsung jadi",
    includes: [
      { icon: Tv, text: "TV LED 32 inch baru (Full HD, DVB-T2) garansi resmi" },
      { icon: Settings, text: "Bracket dinding & kabel terpasang rapi di balik TV" },
      { icon: ShieldCheck, text: "Gratis setting nama masjid & koordinat" },
    ],
    highlights: [
      { icon: CheckCircle2, text: "Plug & play, tinggal colok listrik" },
      { icon: CheckCircle2, text: "1 colokan, langsung menyala" },
      { icon: CheckCircle2, text: "Cocok kapasitas 2–4 saf" },
      { icon: CheckCircle2, text: "Garansi resmi TV & STB" },
    ],
    orderText: "Pesan Paket 32\"",
  },
  {
    badge: "Terlaris",
    featured: true,
    icon: Tv,
    slug: "paket-layar-besar-40",
    name: "Paket Layar Besar 40\"",
    subtitle: "Unggulan untuk masjid jami & paket wakaf",
    price: "Rp 4.999.000",
    originalPrice: "Rp 6.200.000",
    priceNote: "Promo · termasuk running text wakaf",
    includes: [
      { icon: Tv, text: "TV LED 40 inch baru (Full HD 1080p) garansi resmi" },
      { icon: Settings, text: "Bracket heavy duty + kabel rapi tersembunyi" },
      { icon: HeartHandshake, text: "Gratis nama masjid, logo & running text wakaf" },
    ],
    highlights: [
      { icon: CheckCircle2, text: "Teks jelas terbaca dari saf belakang" },
      { icon: CheckCircle2, text: "Cocok untuk wakaf amal jariyah" },
      { icon: CheckCircle2, text: "Packing kayu + asuransi pengiriman" },
      { icon: CheckCircle2, text: "Garansi resmi TV & STB" },
    ],
    orderText: "Pesan Paket 40\"",
  },
];

export function PricingSection() {
  return (
    <section id="harga" className="bg-card/30 py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Pilih{" "}
            <span className="gradient-text">Paket</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Sekali wakaf, tanpa biaya langganan bulanan. Pilih sesuai kebutuhan masjid —
            dari yang sudah punya TV hingga paket layar besar siap pasang.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative rounded-3xl overflow-hidden border ${
                plan.featured
                  ? "border-primary/50 bg-background shadow-2xl shadow-primary/10 md:-mt-4 md:mb-[-1rem]"
                  : "border-border bg-card/50"
              } flex flex-col`}
            >
              {plan.featured && (
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-amber-400 to-primary" />
              )}

              {plan.badge && (
                <div className="absolute top-4 right-4 inline-flex items-center gap-1 bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-semibold z-10">
                  <Crown className="w-3 h-3" />
                  {plan.badge}
                </div>
              )}

              <div className="p-8 flex flex-col flex-1">
                <div className="inline-flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <plan.icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-foreground">{plan.name}</h3>
                    <p className="text-xs text-muted-foreground">{plan.subtitle}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <div className="flex items-baseline gap-2 flex-wrap">
                    <span className="text-lg font-medium text-muted-foreground line-through">
                      {plan.originalPrice}
                    </span>
                    <span className="text-xs bg-primary/10 text-primary border border-primary/30 rounded-full px-2 py-0.5 font-semibold">
                      Promo
                    </span>
                  </div>
                  <div className="text-3xl font-bold text-foreground mt-1">{plan.price}</div>
                  <p className="text-xs text-muted-foreground mt-1">{plan.priceNote}</p>
                </div>

                <div className="space-y-3 mb-6 text-left">
                  {plan.includes.map((item, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <item.icon className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-foreground/80">{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="grid grid-cols-1 gap-2 mb-8 text-left pt-4 border-t border-border/60">
                  {plan.highlights.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                      <item.icon className="w-4 h-4 text-primary flex-shrink-0" />
                      <span>{item.text}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto flex flex-col gap-3">
                  <Button
                    size="lg"
                    className={`w-full font-semibold text-base ${
                      plan.featured
                        ? "bg-primary hover:bg-primary/90 text-primary-foreground glow-primary"
                        : "border-primary/50 text-primary hover:bg-primary/10 bg-transparent border"
                    }`}
                  >
<a
                      href={`/produk/${plan.slug}`}
                    >
                      {plan.orderText}
                    </a>
                  </Button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Add-on & wakaf strip */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 grid md:grid-cols-2 gap-6"
        >
          <div className="bg-card/50 border border-border rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <Wrench className="w-5 h-5 text-amber-400" />
              <h3 className="font-semibold text-foreground">Layanan Tambahan</h3>
            </div>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• Jasa pasang & bor dinding di lokasi: <span className="text-foreground font-medium">Rp 300.000</span></li>
              <li>• Termasuk kabel listrik panjang sampai 10m — hasil pasang rapi, tanpa kabel berantakan</li>
              <li>• Semua paket sudah rapi: STB, stopkontak, & kabel tersembunyi di balik TV — tinggal colok 1 kabel listrik</li>
            </ul>
          </div>

          <div className="bg-gradient-to-br from-primary/15 via-primary/5 to-amber-400/10 border border-primary/25 rounded-2xl p-6">
            <div className="flex items-center gap-2 mb-3">
              <HeartHandshake className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Ingin Berwakaf?</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Wakaf <strong className="text-foreground">bukan paket terpisah</strong> —
              Anda tinggal pilih salah satu paket di atas (Paket Mesin, 32", atau 40"),
              lalu kami tampilkan nama Anda / keluarga di layar masjid.
            </p>
            <div className="bg-background/60 border border-primary/20 rounded-lg px-4 py-3 mb-3">
              <p className="text-[11px] uppercase tracking-wider text-muted-foreground mb-1">
                Contoh running text di layar masjid
              </p>
              <p className="text-sm font-medium text-foreground italic">
                "Wakaf dari Keluarga Almarhum H. Ahmad"
              </p>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Ini amal jariyah — pahalanya terus mengalir setiap jamaah menunaikan
              sholat, selama TV dipakai. Sangat cocok sebagai wakaf untuk orang tua
              yang telah wafat. Nama, tulisan, dan durasi tampil bisa kami atur
              sesuai keinginan Anda.
            </p>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold"
            >
              <a
                href={`${WHATSAPP_BASE}wakaf%20TV%20jadwal%20sholat`}
                target="_blank"
                rel="noopener noreferrer"
              >
                Tanya Paket Wakaf
              </a>
              <MessageSquare className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}