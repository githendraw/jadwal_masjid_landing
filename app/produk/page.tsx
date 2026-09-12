import prisma from "@/lib/prisma";
import type { Metadata } from "next";
import { ProductCard } from "@/components/store/product-card";
import { Footer } from "@/components/landing/footer";

export const metadata: Metadata = {
  title: "Paket Waqaf TV Jadwal Masjid - TV & Mesin Siap Pasang",
  description:
    "Wakaf paket TV jadwal sholat untuk masjid: Paket Mesin Rp860.000, Paket 32\" Rp3.899.000, Paket 40\" Rp4.999.000. Amal jariyah, pembayaran aman via Duitku, pengiriman packing kayu ke seluruh Indonesia.",
};

export default async function ProdukPage() {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }, { id: "asc" }],
  });

  return (
    <div className="min-h-screen pt-16 sm:pt-20 pb-20 bg-background">
      {/* Hero kecil */}
      <section className="relative overflow-hidden py-12">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-3xl sm:text-4xl font-bold text-foreground">
            Paket <span className="gradient-text">Waqaf</span> TV Jadwal Masjid
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-4">
            Amanah wakaf TV jadwal sholat untuk masjid. Sekali wakaf, tanpa biaya
            langganan. Pilih paket, isi data diri &amp; nama masjid, lalu
            selesaikan pembayaran — pengiriman packing kayu ke seluruh Indonesia.
          </p>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {products.map((p, i) => (
            <ProductCard
              key={p.slug}
              index={i}
              product={{
                slug: p.slug,
                name: p.name,
                subtitle: p.subtitle,
                price: p.price,
                originalPrice: p.originalPrice,
                badge: p.badge,
                isFeatured: p.isFeatured,
                stock: p.stock,
                imageKey: p.imageKey,
              }}
            />
          ))}
        </div>

        <div className="mt-14 bg-card/50 border border-border rounded-2xl p-6 text-sm text-muted-foreground space-y-2 max-w-3xl mx-auto">
          <h3 className="font-semibold text-foreground">Pengiriman &amp; Garansi</h3>
          <ul className="space-y-1.5">
            <li>• Packing kayu + asuransi untuk paket TV layar 32" dan 40".</li>
            <li>• Ongkos kirim dihitung otomatis per paket saat checkout.</li>
            <li>• Garansi resmi TV &amp; STB, plus dukungan pemasangan.</li>
            <li>• Pembayaran dengan berbagai metode (VA, e-wallet, kartu) via Duitku.</li>
          </ul>
        </div>
      </section>

      <Footer />
    </div>
  );
}