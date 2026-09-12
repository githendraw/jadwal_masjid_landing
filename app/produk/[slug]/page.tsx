import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ShieldCheck, Truck, Package, Settings2 } from "lucide-react";
import prisma from "@/lib/prisma";
import { formatRupiah } from "@/lib/format";
import { BuyPanel } from "@/components/store/buy-panel";
import { CheckCircle2 } from "lucide-react";
import { Footer } from "@/components/landing/footer";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = await prisma.product.findUnique({ where: { slug } });
  if (!p) return { title: "Produk tidak ditemukan" };
  return {
    title: `${p.name} - Jadwal Masjid`,
    description: p.subtitle || `${p.name} siap pasang. Harga ${formatRupiah(p.price)}.`,
  };
}

export default async function ProdukDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = await prisma.product.findUnique({ where: { slug } });
  if (!product || !product.isActive) notFound();

  const featLabels = [
    "Sekali wakaf, tanpa biaya langganan bulanan",
    "Garansi resmi TV &amp; STB",
    "Jadwal sholat akurat, auto-update",
    "Packing kayu + asuransi pengiriman",
    "Gratis setting nama masjid &amp; koordinat",
  ];

  return (
    <div className="min-h-screen pt-16 sm:pt-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <Link
          href="/produk"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke katalog
        </Link>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Gambar */}
          <div className="relative rounded-3xl overflow-hidden border border-border bg-card/50">
            <div className="relative aspect-[4/3]">
              {product.imageKey ? (
                <Image
                  src={`/${product.imageKey}`}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Settings2 className="w-24 h-24 text-primary/30" />
                </div>
              )}
            </div>
            {product.badge && (
              <span className="absolute top-4 left-4 bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-semibold">
                {product.badge}
              </span>
            )}
          </div>

          {/* Info & beli */}
          <div>
            <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
            {product.subtitle && (
              <p className="text-muted-foreground mt-2">{product.subtitle}</p>
            )}

            <div className="mt-5 flex items-baseline gap-3 flex-wrap">
              {product.originalPrice && (
                <span className="text-muted-foreground line-through text-lg">
                  {formatRupiah(product.originalPrice)}
                </span>
              )}
              {product.originalPrice && (
                <span className="text-xs bg-primary/10 text-primary border border-primary/30 rounded-full px-2 py-0.5 font-semibold">
                  Promo
                </span>
              )}
            </div>
            <div className="text-4xl font-bold text-foreground mt-1">
              {formatRupiah(product.price)}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Termasuk ongkir kirim{" "}
              <span className="text-foreground font-medium">
                {formatRupiah(product.shippingFee)}
              </span>{" "}
              (packing kayu).
            </p>

            {product.stock === 0 && (
              <p className="mt-4 rounded-lg border border-red-200 bg-red-50 text-red-600 px-4 py-3 text-sm">
                Stok habis saat ini.
              </p>
            )}

            <div className="mt-6">
              <BuyPanel
                product={{
                  id: product.id,
                  slug: product.slug,
                  name: product.name,
                  price: product.price,
                  shippingFee: product.shippingFee,
                  stock: product.stock,
                  imageKey: product.imageKey,
                }}
              />
            </div>

            <div className="mt-8 space-y-2.5">
              {featLabels.map((f) => (
                <div key={f} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0" />
                  <span dangerouslySetInnerHTML={{ __html: f }} />
                </div>
              ))}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3">
              <div className="bg-card/50 border border-border rounded-xl p-4 flex items-center gap-3">
                <ShieldCheck className="w-6 h-6 text-primary flex-shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold text-foreground">Garansi Resmi</p>
                  <p className="text-muted-foreground">TV &amp; STB</p>
                </div>
              </div>
              <div className="bg-card/50 border border-border rounded-xl p-4 flex items-center gap-3">
                <Truck className="w-6 h-6 text-primary flex-shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold text-foreground">Kirim ke Seluruh Indonesia</p>
                  <p className="text-muted-foreground">Packing kayu + asuransi</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Deskripsi */}
        {product.description && (
          <div className="mt-14 bg-card/50 border border-border rounded-2xl p-8">
            <h2 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
              <Package className="w-5 h-5 text-primary" />
              Isi &amp; Spesifikasi
            </h2>
            <ul className="space-y-2 text-muted-foreground text-sm">
              {product.description.split("\n").filter(Boolean).map((d, i) => (
                <li key={i}>• {d}</li>
              ))}
              <li>
                • Berat paket ±{" "}
                {product.weightGrams >= 1000
                  ? `${(product.weightGrams / 1000).toLocaleString("id-ID")} kg`
                  : `${product.weightGrams} gram`}
              </li>
            </ul>
          </div>
        )}

        <p className="text-center text-xs text-muted-foreground mt-10">
          Bayar aman melalui <span className="text-foreground font-medium">Duitku</span> — Virtual
          Account, e-wallet, &amp; transfer bank.
        </p>
      </div>
      <Footer />
    </div>
  );
}