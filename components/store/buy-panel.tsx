"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Minus, Plus, ShoppingCart, Zap } from "lucide-react";
import { useCart } from "./cart-provider";

export interface BuyPanelProduct {
  id: number;
  slug: string;
  name: string;
  price: number;
  shippingFee: number;
  stock: number;
  imageKey?: string | null;
}

export function BuyPanel({ product }: { product: BuyPanelProduct }) {
  const { add } = useCart();
  const router = useRouter();
  const [qty, setQty] = useState(1);
  const disabled = product.stock <= 0;

  function addToCart() {
    add({
      productId: product.id,
      slug: product.slug,
      name: product.name,
      price: product.price,
      shippingFee: product.shippingFee,
      qty,
      stock: product.stock,
      imageKey: product.imageKey,
    });
  }

  function buyNow() {
    addToCart();
    router.push("/checkout");
  }

  if (disabled) {
    return (
      <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-600 font-medium">
        Stok sedang habis. Silakan hubungi kami via WhatsApp untuk restock.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3">
        <span className="text-sm text-muted-foreground">Jumlah:</span>
        <div className="flex items-center rounded-lg border border-border">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            disabled={qty <= 1}
            className="p-2 text-muted-foreground hover:text-primary disabled:opacity-40"
            aria-label="Kurangi jumlah"
          >
            <Minus className="w-4 h-4" />
          </button>
          <span className="w-10 text-center font-semibold">{qty}</span>
          <button
            onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
            disabled={qty >= product.stock}
            className="p-2 text-muted-foreground hover:text-primary disabled:opacity-40"
            aria-label="Tambah jumlah"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
        <span className="text-xs text-muted-foreground">Stok {product.stock}</span>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={addToCart}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg border border-primary/50 text-primary hover:bg-primary/10 h-11 font-semibold text-sm transition-colors"
        >
          <ShoppingCart className="w-4 h-4" />
          Tambah ke Keranjang
        </button>
        <button
          onClick={buyNow}
          className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground h-11 font-semibold text-sm glow-primary transition-colors"
        >
          <Zap className="w-4 h-4" />
          Beli Sekarang
        </button>
      </div>

      <p className="text-xs text-muted-foreground">
        Ongkos kirim{" "}
        <span className="text-foreground font-medium">
          {new Intl.NumberFormat("id-ID").format(product.shippingFee)}
        </span>{" "}
        (sudah termasuk packing).
      </p>
    </div>
  );
}