"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Tv, Monitor, Crown, CheckCircle2 } from "lucide-react";
import { formatRupiah } from "@/lib/format";

export interface ProductCardData {
  slug: string;
  name: string;
  subtitle: string | null;
  price: number;
  originalPrice: number | null;
  badge: string | null;
  isFeatured: boolean;
  stock: number;
  imageKey: string | null;
}

const iconMap: Record<string, any> = {
  "paket-mesin": Monitor,
  "paket-hemat-32": Tv,
};

export function ProductCard({ product, index = 0 }: { product: ProductCardData; index?: number }) {
  const Icon = iconMap[product.slug] || Crown;
  const lowStock = product.stock > 0 && product.stock <= 5;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.08 }}
      className={`relative rounded-3xl overflow-hidden border ${
        product.isFeatured
          ? "border-primary/50 bg-background shadow-2xl shadow-primary/10"
          : "border-border bg-card/50"
      } card-hover flex flex-col`}
    >
      {product.isFeatured && (
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-amber-400 to-primary z-10" />
      )}
      {product.badge && (
        <div className="absolute top-4 right-4 inline-flex items-center gap-1 bg-primary text-primary-foreground rounded-full px-3 py-1 text-xs font-semibold z-10">
          <Crown className="w-3 h-3" />
          {product.badge}
        </div>
      )}

      <div className="relative h-44 bg-gradient-to-br from-primary/10 via-transparent to-amber-400/10 overflow-hidden">
        {product.imageKey ? (
          <Image
            src={`/${product.imageKey}`}
            alt={product.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <Icon className="w-16 h-16 text-primary/30" />
          </div>
        )}
      </div>

      <div className="p-6 flex flex-col flex-1">
        <div className="inline-flex items-center gap-2 mb-2">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="w-4 h-4 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
        </div>
        <p className="text-xs text-muted-foreground mb-4">{product.subtitle}</p>

        <div className="mb-6">
          {product.originalPrice ? (
            <span className="text-sm font-medium text-muted-foreground line-through mr-2">
              {formatRupiah(product.originalPrice)}
            </span>
          ) : null}
          {product.originalPrice ? (
            <span className="text-xs bg-primary/10 text-primary border border-primary/30 rounded-full px-2 py-0.5 font-semibold">
              Promo
            </span>
          ) : null}
          <div className="text-2xl font-bold text-foreground mt-2">
            {formatRupiah(product.price)}
          </div>
        </div>

        {lowStock && (
          <p className="text-xs text-amber-600 bg-amber-50 border border-amber-200 rounded-lg px-3 py-2 mb-4 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4" />
            Sisa {product.stock} unit — bisa cepat habis
          </p>
        )}
        {product.stock === 0 && (
          <p className="text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2 mb-4">
            Stok habis
          </p>
        )}

        <div className="mt-auto">
          <Link
                    href={`/produk/${product.slug}`}
                    className={`w-full inline-flex items-center justify-center rounded-lg h-10 font-semibold text-sm transition-colors ${
                                product.isFeatured
                                  ? "bg-primary hover:bg-primary/90 text-primary-foreground glow-primary"
                                  : "border border-primary/50 text-primary hover:bg-primary/10 bg-transparent"
                              }`}
                  >
                    Lihat &amp; Beli
                  </Link>
        </div>
      </div>
    </motion.div>
  );
}