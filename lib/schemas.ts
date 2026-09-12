import { z } from "zod";

export const profileSchema = z.object({
  phone: z
    .string()
    .min(8, "Nomor HP wajib diisi (min 8 digit)")
    .max(16, "Nomor HP terlalu panjang")
    .regex(/^[0-9+\-\s]+$/, "Nomor HP tidak valid"),
  mosqueName: z
    .string()
    .min(2, "Nama masjid wajib diisi")
    .max(200, "Nama masjid terlalu panjang"),
  mosqueAddress: z.string().max(500, "Alamat terlalu panjang").optional().or(z.literal("")),
  city: z.string().max(100).optional().or(z.literal("")),
  province: z.string().max(100).optional().or(z.literal("")),
  postalCode: z
    .string()
    .max(10)
    .regex(/^\d{4,10}$/, "Kode pos tidak valid")
    .optional()
    .or(z.literal("")),
});

export const checkoutSchema = z.object({
  recipientName: z.string().min(2, "Nama penerima wajib diisi").max(200),
  phone: z
    .string()
    .min(8, "Nomor HP wajib diisi")
    .max(16)
    .regex(/^[0-9+\-\s]+$/, "Nomor HP tidak valid"),
  mosqueName: z.string().min(2, "Nama masjid wajib diisi").max(200),
  address: z.string().min(5, "Alamat pengiriman wajib diisi").max(500),
  city: z.string().min(2, "Kota/Kabupaten wajib diisi").max(100),
  province: z.string().min(2, "Provinsi wajib diisi").max(100),
  postalCode: z
    .string()
    .regex(/^\d{4,10}$/, "Kode pos tidak valid")
    .max(10)
    .or(z.literal(""))
    .optional(),
  notes: z.string().max(1000).optional().or(z.literal("")),
});

export const adminProductSchema = z.object({
  name: z.string().min(2).max(200),
  slug: z.string().max(150).optional(),
  subtitle: z.string().max(300).optional().or(z.literal("")),
  description: z.string().optional().or(z.literal("")),
  price: z.number().int().min(0, "Harga tidak boleh negatif"),
  originalPrice: z.number().int().nullish(),
  badge: z.string().max(50).optional().or(z.literal("")),
  isFeatured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  stock: z.number().int().min(0).optional(),
  weightGrams: z.number().int().min(0).optional(),
  shippingFee: z.number().int().min(0).optional(),
  imageKey: z.string().max(300).optional().or(z.literal("")),
  sortOrder: z.number().int().optional(),
});

// Untuk update parsial (PATCH) — semua field opsional, tidak wajib `name`.
export const adminProductPatchSchema = adminProductSchema.partial();