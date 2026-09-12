import "dotenv/config";
import prisma from "../lib/prisma";

const products = [
  {
    slug: "paket-mesin",
    name: "Paket Mesin",
    subtitle: "Wakaf TV box jadwal sholat untuk masjid yang sudah punya TV",
    description:
      "Hibahkan Android TV Box Jadwal Masjid (RAM 2GB) sebagai amal jariyah yang terus mengalir. Isi paket: 1 unit TV box + kabel HDMI pendek & adaptor daya, aplikasi sudah terpasang siap colok & jalan. Untuk TV 32–65 inch, auto-boot langsung ke jadwal sholat, stabil 24 jam, 100% offline tanpa internet. Termasuk garansi & dukungan pemasangan.",
    price: 860000,
    originalPrice: 1200000,
    badge: null,
    isFeatured: false,
    isActive: true,
    stock: 50,
    weightGrams: 1500,
    shippingFee: 75000,
    imageKey: "tv1.webp",
    sortOrder: 1,
  },
  {
    slug: "paket-hemat-32",
    name: "Paket Hemat 32\"",
    subtitle: "Wakaf TV 32 inch siap pasang untuk musholla & masjid mini",
    description:
      "Wakaf satu paket TV LED 32 inch baru (Full HD, DVB-T2) garansi resmi sebagai amal jariyah untuk musholla & masjid mini. Termasuk bracket dinding & kabel terpasang rapi di balik TV, plus gratis setting nama masjid & koordinat. Plug & play, tinggal colok listrik, cocok kapasitas 2–4 saf.",
    price: 3899000,
    originalPrice: 4800000,
    badge: null,
    isFeatured: false,
    isActive: true,
    stock: 20,
    weightGrams: 12500,
    shippingFee: 250000,
    imageKey: "tv2.webp",
    sortOrder: 2,
  },
  {
    slug: "paket-layar-besar-40",
    name: "Paket Layar Besar 40\"",
    subtitle: "Wakaf unggulan untuk masjid jami & paket wakaf",
    description:
      "Wakaf TV LED 40 inch baru (Full HD 1080p) garansi resmi untuk masjid jami — amal jariyah terbaik. Termasuk bracket heavy duty & kabel rapi tersembunyi, gratis nama masjid, logo & running text wakaf. Teks jelas terbaca dari saf belakang, packing kayu + asuransi pengiriman.",
    price: 4999000,
    originalPrice: 6200000,
    badge: "Terlaris",
    isFeatured: true,
    isActive: true,
    stock: 15,
    weightGrams: 18000,
    shippingFee: 350000,
    imageKey: "hero.webp",
    sortOrder: 3,
  },
];

async function main() {
  for (const p of products) {
    const existing = await prisma.product.findUnique({ where: { slug: p.slug } });
    if (existing) {
      await prisma.product.update({ where: { slug: p.slug }, data: p });
      console.log("update", p.slug);
    } else {
      await prisma.product.create({ data: p });
      console.log("create", p.slug);
    }
  }
}

main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });