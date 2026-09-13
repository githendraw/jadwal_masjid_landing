import { MetadataRoute } from "next";
import prisma from "@/lib/prisma";

const BASE_URL = "https://jadwalmasjid.com";

// Harga/stok produk berubah tanpa deploy, jadi jangan dipaku sekali saat build.
export const revalidate = 3600;

/**
 * Sitemap = daftar halaman publik yang layak diindeks.
 *
 * Sebelumnya hanya berisi homepage, sehingga /produk dan tiap halaman produk
 * tidak pernah diberitahukan ke Google (terbukti: /produk "URL is unknown to
 * Google" walau sudah dilink dari homepage dan indexable).
 *
 * Kalau nanti ada route publik baru (mis. /panduan, /blog), tambahkan di sini —
 * halaman di luar daftar ini hanya mengandalkan link internal supaya ditemukan.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const statis: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/produk`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
  ];

  try {
    // Filter disamakan dengan app/produk/page.tsx: hanya produk aktif.
    const products = await prisma.product.findMany({
      where: { isActive: true },
      orderBy: [{ isFeatured: "desc" }, { sortOrder: "asc" }, { id: "asc" }],
      select: { slug: true, updatedAt: true },
    });

    return [
      ...statis,
      ...products.map((p) => ({
        url: `${BASE_URL}/produk/${p.slug}`,
        lastModified: p.updatedAt,
        changeFrequency: "weekly" as const,
        priority: 0.8,
      })),
    ];
  } catch (error) {
    // Kalau DB sedang tidak bisa dihubungi, sitemap tetap harus balas XML yang
    // valid (bukan 500) supaya Google tidak menganggapnya rusak.
    console.error("[sitemap] gagal membaca produk, memakai daftar statis:", error);
    return statis;
  }
}
