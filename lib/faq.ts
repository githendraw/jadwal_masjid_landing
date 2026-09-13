/**
 * Pertanyaan umum yang tampil di homepage (komponen FAQSection).
 *
 * Dipakai dua tempat: komponennya sendiri dan markup FAQPage. Dulu daftarnya
 * diduplikasi di app/layout.tsx dengan teks yang berbeda dari yang terlihat,
 * dan disuntikkan ke SEMUA halaman padahal komponen FAQ hanya ada di homepage.
 * Satu sumber di sini supaya markup selalu sama dengan isi halaman.
 */
export const FAQS = [
  {
    question: "Apa saja paket yang tersedia dan berapa harganya?",
    answer:
      "Ada 3 paket: (1) Paket Mesin Rp860.000 — Android TV Box saja untuk masjid yang sudah punya TV. (2) Paket Hemat 32\" Rp3.899.000 — TV LED 32 inch + bracket, siap pasang. (3) Paket Layar Besar 40\" Rp4.999.000 — TV LED 40 inch + bracket heavy duty, cocok untuk masjid jami dan paket wakaf. Semua sekali wakaf, tanpa biaya langganan bulanan.",
  },
  {
    question: "Masjid kami sudah punya TV, apa yang perlu diwakafkan?",
    answer:
      "Cukup ambil Paket Mesin (Rp860.000). Android TV Box Jadwal Masjid tinggal colok ke TV via HDMI, langsung menampilkan jadwal sholat otomatis. Cocok untuk TV 32–65 inch yang sudah terpasang.",
  },
  {
    question: "Apa itu paket wakaf TV masjid?",
    answer:
      "Anda mewakafkan satu paket display jadwal sholat atas nama diri sendiri, keluarga, atau almarhum. Nama wakif akan tampil di running text layar masjid. Ini amal jariyah — pahalanya terus mengalir setiap jamaah menunaikan sholat. Cocok juga sebagai hadiah wakaf untuk orang tua yang telah wafat.",
  },
  {
    question: "Apakah perlu download aplikasi atau daftar akun?",
    answer:
      "Tidak perlu sama sekali. Aplikasi Jadwal Masjid sudah terinstall di dalam TV box. Untuk pengaturannya, Anda cukup scan QR Code di layar TV menggunakan HP (dalam jaringan Wi-Fi yang sama). Tanpa buat akun cloud dan tanpa download aplikasi tambahan.",
  },
  {
    question: "Bagaimana cara mengatur nama masjid dan running text?",
    answer:
      "Sangat simpel! Scan QR Code yang tampil di layar TV menggunakan HP Anda. Halaman pengaturan lokal akan terbuka di browser HP. Anda bisa mengubah nama masjid, running text pengumuman, dan timer iqomah, lalu klik simpan.",
  },
  {
    question: "Apakah harus terkoneksi ke internet?",
    answer:
      "Tidak. Sistem berjalan 100% lokal di Android TV Box. Pengaturan via QR Code dan penayangan jadwal sholat tetap berfungsi walau tidak ada jaringan internet.",
  },
  {
    question: "Kenapa harus pakai TV Box eksternal, bukan Android TV murah?",
    answer:
      "Android TV murah (RAM 1–1,5GB) sering lag, panas, dan aplikasi tiba-tiba keluar saat menyala nonstop 12–16 jam, serta tidak otomatis kembali ke jadwal sholat setelah mati lampu. TV Box Jadwal Masjid (RAM 2GB) stabil 24 jam, langsung auto-boot ke tampilan jadwal begitu listrik menyala, dan mudah diganti tanpa membongkar TV.",
  },
  {
    question: "Apakah ada layanan pasang di masjid?",
    answer:
      "Ada. Untuk area kota Anda, tersedia jasa pasang & bor dinding di lokasi sebesar Rp300.000 — termasuk kabel listrik panjang sampai 10m agar hasilnya rapi tanpa kabel berantakan. DKM tidak perlu repot cari tukang sendiri.",
  },
  {
    question: "Apakah kabel-kabelnya berantakan di dinding?",
    answer:
      "Tidak. STB, stopkontak, dan kabel dipasang tersembunyi di balik TV. Dari depan hanya terlihat layar yang bersih, dan dari TV hanya keluar 1 kabel listrik menuju stopkontak dinding.",
  },
  {
    question: "Bagaimana cara memesan?",
    answer:
      "Hubungi kami via WhatsApp, sampaikan paket yang ingin dipesan (boleh sertakan jasa pasang di lokasi). Kami bantu proses pemesanan, setting nama masjid sebelum dikirim, dan jadwalkan pemasangan bila diperlukan.",
  },
  {
    question: "Metode perhitungan apa saja yang tersedia?",
    answer:
      "Kami menyediakan metode resmi: Kemenag RI, Ministry of Awqaf Kuwait (MWL), Egypt, dan custom untuk ahli falak.",
  },
  {
    question: "Apakah ada garansi?",
    answer:
      "Ada. Setiap TV Box dilengkapi garansi dan dukungan pemasangan. Untuk paket TV, garansi resmi TV dan STB berlaku masing-masing. Jika ada kendala, tim kami siap membantu via WhatsApp.",
  },
] as const;
