"use client";

import { Clock } from "lucide-react";
import Image from "next/image";

const footerLinks = {
  product: [
    { label: "Fitur", href: "#fitur" },
    { label: "Tampilan", href: "#tampilan" },
    { label: "Cara Pakai", href: "#cara-pakai" },
    { label: "Hubungi Kami", href: "#" },
  ],
  support: [
    { label: "FAQ", href: "#faq" },
    { label: "Dokumentasi", href: "#" },
    { label: "Hubungi Kami", href: "#" },
    { label: "Komunitas", href: "#" },
  ],
  legal: [
    { label: "Kebijakan Privasi", href: "#" },
    { label: "Syarat & Ketentuan", href: "#" },
    { label: "Lisensi", href: "#" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 md:col-span-1">
            <a href="#" className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo.png"
                  alt="Waktu Sholat"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold text-white">Waktu Sholat</span>
            </a>
            <p className="text-slate-400 text-sm">
              Jadwal sholat digital untuk TV masjid. Akurat, mudah, bayar sekali pakai selamanya.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Produk</h4>
            <ul className="space-y-2">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Legal</h4>
            <ul className="space-y-2">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-slate-400 hover:text-emerald-400 text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 text-sm">
            &copy; 2026 Waktu Sholat. Dibuat dengan ❤️ untuk umat Islam.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-slate-400 hover:text-emerald-400 text-sm">
              Twitter
            </a>
            <a href="#" className="text-slate-400 hover:text-emerald-400 text-sm">
              Instagram
            </a>
            <a href="#" className="text-slate-400 hover:text-emerald-400 text-sm">
              YouTube
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
