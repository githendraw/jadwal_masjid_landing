"use client";

import Link from "next/link";
import { Trash2, Minus, Plus, ShoppingCart, ArrowRight } from "lucide-react";
import { useCart } from "@/components/store/cart-provider";
import { formatRupiah } from "@/lib/format";

export default function KeranjangPage() {
  const { items, setQty, remove, subtotal, shippingFee, hydrated } = useCart();

  if (hydrated && items.length === 0) {
    return (
      <div className="min-h-screen pt-20 sm:pt-24 pb-20 bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <ShoppingCart className="w-8 h-8 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground">Keranjang kosong</h1>
          <p className="text-muted-foreground mt-2 text-sm">
            Belum ada paket di keranjangmu. Ayo pilih paket TV masjid yang sesuai
            kebutuhan.
          </p>
          <Link
            href="/produk"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground px-6 h-11 font-semibold text-sm"
          >
            Lihat Paket
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Keranjang <span className="gradient-text">Belanja</span>
        </h1>

        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.productId}
              className="bg-card/50 border border-border rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center gap-4"
            >
              <div className="flex-1">
                <Link href={`/produk/${item.slug}`} className="font-semibold text-foreground hover:text-primary">
                  {item.name}
                </Link>
                <p className="text-sm text-muted-foreground">
                  {formatRupiah(item.price)} × {item.qty}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center rounded-lg border border-border">
                  <button
                    onClick={() => setQty(item.productId, item.qty - 1)}
                    disabled={item.qty <= 1}
                    className="p-2 text-muted-foreground hover:text-primary disabled:opacity-40"
                    aria-label="Kurangi"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-8 text-center font-semibold">{item.qty}</span>
                  <button
                    onClick={() => setQty(item.productId, item.qty + 1)}
                    disabled={item.qty >= item.stock}
                    className="p-2 text-muted-foreground hover:text-primary disabled:opacity-40"
                    aria-label="Tambah"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span className="font-bold text-foreground w-28 text-right">
                  {formatRupiah(item.price * item.qty)}
                </span>
                <button
                  onClick={() => remove(item.productId)}
                  className="p-2 text-muted-foreground hover:text-red-500 transition-colors"
                  aria-label="Hapus"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 bg-card border border-border rounded-2xl p-6">
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-muted-foreground">
              <span>Subtotal</span>
              <span className="text-foreground">{formatRupiah(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted-foreground">
              <span>Ongkos kirim (packing)</span>
              <span className="text-foreground">{formatRupiah(shippingFee)}</span>
            </div>
            <div className="flex justify-between pt-3 border-t border-border text-base font-bold text-foreground">
              <span>Total</span>
              <span>{formatRupiah(subtotal + shippingFee)}</span>
            </div>
          </div>

          <Link
            href="/checkout"
            className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground h-12 font-semibold glow-primary"
          >
            Lanjut ke Checkout
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}