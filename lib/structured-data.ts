import { FAQS } from "@/lib/faq";

export const BASE_URL = "https://jadwalmasjid.com";

const BRAND_NAME = "Jadwal Masjid";

/**
 * Nilai yang dipakai markup dan harus ikut diubah kalau kebijakan toko berubah.
 * Ini bagian dari data terstruktur, bukan tampilan — jangan disamarkan.
 */
const PRICE_VALID_UNTIL = "2027-12-31"; // kalau lewat, penawaran bisa berhenti tampil
const HANDLING_DAYS = { min: 1, max: 2 }; // masa siap kirim dari gudang
const TRANSIT_DAYS = { min: 2, max: 4 }; // estimasi perjalanan (packing kayu, se-Indonesia)
const SHIPPING_COUNTRY = "ID";

export type ProdukUntukMarkup = {
  slug: string;
  name: string;
  subtitle?: string | null;
  description?: string | null;
  price: number;
  originalPrice?: number | null;
  stock: number;
  shippingFee: number;
  imageKey?: string | null;
};

/** URL gambar absolut — syarat Google: gambar harus bisa dirayapi. */
export function urlGambar(imageKey?: string | null): string | undefined {
  if (!imageKey) return undefined;
  if (imageKey.startsWith("http")) return imageKey;
  return `${BASE_URL}/${imageKey.replace(/^\/+/, "")}`;
}

export function skuProduk(slug: string): string {
  return `JM-${slug.toUpperCase()}`;
}

/** Offer lengkap: harga, kondisi, masa berlaku, dan ongkir (tarif tetap per produk). */
function buatPenawaran(
  p: Pick<ProdukUntukMarkup, "price" | "originalPrice" | "stock" | "shippingFee">,
  url: string,
) {
  const offer: Record<string, unknown> = {
    "@type": "Offer",
    url,
    priceCurrency: "IDR",
    price: p.price,
    priceValidUntil: PRICE_VALID_UNTIL,
    itemCondition: "https://schema.org/NewCondition",
    availability:
      p.stock > 0
        ? "https://schema.org/InStock"
        : "https://schema.org/OutOfStock",
    shippingDetails: {
      "@type": "OfferShippingDetails",
      shippingRate: {
        "@type": "MonetaryAmount",
        value: p.shippingFee,
        currency: "IDR",
      },
      shippingDestination: {
        "@type": "DefinedRegion",
        addressCountry: SHIPPING_COUNTRY,
      },
      deliveryTime: {
        "@type": "ShippingDeliveryTime",
        handlingTime: {
          "@type": "QuantitativeValue",
          minValue: HANDLING_DAYS.min,
          maxValue: HANDLING_DAYS.max,
          unitCode: "DAY",
        },
        transitTime: {
          "@type": "QuantitativeValue",
          minValue: TRANSIT_DAYS.min,
          maxValue: TRANSIT_DAYS.max,
          unitCode: "DAY",
        },
      },
    },
  };

  // Harga coret yang tampil di halaman (line-through) wajib dikirim sebagai
  // priceSpecification bertipe StrikethroughPrice, bukan sebagai `price`.
  if (p.originalPrice && p.originalPrice > p.price) {
    offer.priceSpecification = {
      "@type": "UnitPriceSpecification",
      priceType: "https://schema.org/StrikethroughPrice",
      price: p.originalPrice,
      priceCurrency: "IDR",
    };
  }

  return offer;
}

/**
 * Product + Offer untuk satu halaman produk.
 *
 * `image` bersifat WAJIB bagi Google — markup lama tidak punya sama sekali,
 * dan itulah penyebab "1 invalid item" di laporan Merchant listings.
 */
export function jsonLdProduk(p: ProdukUntukMarkup) {
  const url = `${BASE_URL}/produk/${p.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.subtitle || p.description || undefined,
    image: [urlGambar(p.imageKey)].filter(Boolean),
    sku: skuProduk(p.slug),
    brand: { "@type": "Brand", name: BRAND_NAME },
    offers: buatPenawaran(p, url),
  };
}

/**
 * Product + Offer untuk homepage.
 *
 * Halaman ini menawarkan 3 paket dengan harga termurah ditampilkan sebagai
 * "Mulai Rp860.000", jadi penawaran yang ditandai adalah paket masuk itu
 * (mesin saja). Untuk merchant listing, Google mensyaratkan `Offer` — bukan
 * `AggregateOffer` — karena penjualnya harus merchant itu sendiri.
 *
 * Datanya sengaja disalin di sini, bukan dibaca dari DB, karena homepage
 * dirender statis dan harga di komponen landing (pricing-section.tsx) juga
 * masih hardcoded. Kalau harga paket mesin berubah, ubah DI KEDUA TEMPAT.
 */
export function jsonLdHomepage() {
  const paketMesin: ProdukUntukMarkup = {
    slug: "paket-mesin",
    name: "Paket Display Jadwal Sholat Digital untuk TV Masjid",
    description:
      "Paket jam digital masjid siap pasang: TV + mesin + bracket. Jadwal sholat akurat Kemenag, auto-update, stabil 24 jam. Sekali wakaf tanpa biaya langganan. Mulai Rp860.000.",
    price: 860000,
    originalPrice: 1200000,
    stock: 50,
    shippingFee: 75000,
    imageKey: "tv1.webp",
  };

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: paketMesin.name,
    description: paketMesin.description,
    image: [urlGambar(paketMesin.imageKey)],
    sku: skuProduk(paketMesin.slug),
    brand: { "@type": "Brand", name: BRAND_NAME },
    offers: buatPenawaran(paketMesin, BASE_URL),
    // TIDAK ada aggregateRating/review di sini, dan jangan ditambahkan sampai
    // ada ulasan pengguna yang nyata: 5 testimoni di components/landing/
    // testimonials.tsx isinya contoh (bukan pelanggan sungguhan), dan DB tidak
    // punya tabel ulasan. aggregateRating tanpa ulasan nyata = markup palsu —
    // bisa berujung manual action structured data, bukan cuma kehilangan bintang.
  };
}

/** FAQPage — hanya untuk homepage, tempat komponen FAQ benar-benar dirender. */
export function jsonLdFaq() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQS.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };
}
