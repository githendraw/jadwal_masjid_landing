/**
 * Saklar toko jadwalmasjid.com.
 *
 * Dipakai sementara: pembayaran online (Duitku) masih dalam proses review,
 * jadi pembelian, keranjang, dan login dimatikan dulu. Dengan satu variabel ini
 * semuanya bisa dikembalikan tanpa membongkar kode lagi.
 *
 * CARA MENYALAKAN KEMBALI:
 *   1) ubah NEXT_PUBLIC_TOKO_AKTIF=true di .env
 *   2) npm run build          (nilai NEXT_PUBLIC ditanam saat BUILD, bukan saat start)
 *   3) pm2 restart waktu_sholat --update-env
 * Langkah build itu wajib: tanpa build ulang, nilai lama masih tertanam di bundle.
 */
export const TOKO_AKTIF = process.env.NEXT_PUBLIC_TOKO_AKTIF === "true";

/**
 * Rute yang dialihkan selama toko belum dibuka.
 * Sengaja termasuk /admin: pemilik memilih mematikan login total (login pembeli
 * dan admin memakai pintu yang sama), jadi panel admin memang tidak bisa dibuka
 * sampai saklar dinyalakan.
 */
export const RUTE_DITUTUP = ["/masuk", "/keranjang", "/checkout", "/akun", "/admin"];

/** Halaman penjelasan tujuan pengalihan. */
export const HALAMAN_DITUTUP = "/toko-ditutup";
