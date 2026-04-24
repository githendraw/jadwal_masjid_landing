"use client";

import { Clock, MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";

const WHATSAPP_LINK = "https://wa.me/6287774348558?text=Halo%20Jadwal%20Masjid,%20saya%20ingin%20bertanya...";
const GITHUB_REPO = "https://github.com/githendraw";

const footerLinks = {
  product: [
    { label: "Fitur", href: "#fitur" },
    { label: "Tampilan", href: "#tampilan" },
    { label: "Cara Pakai", href: "#cara-pakai" },
    { label: "FAQ", href: "#faq" },
  ],
  support: [
    { label: "Dokumentasi", href: `${GITHUB_REPO}/waktu_sholat_landing/wiki` },
    { label: "Hubungi Kami", href: WHATSAPP_LINK },
    { label: "Komunitas", href: "mailto:komunitas@waktusholat.com" },
  ],
  legal: [
    { label: "Kebijakan Privasi", href: `${GITHUB_REPO}/waktu_sholat_landing/blob/main/PRIVACY.md` },
    { label: "Syarat & Ketentuan", href: `${GITHUB_REPO}/waktu_sholat_landing/blob/main/TERMS.md` },
    { label: "Lisensi", href: `${GITHUB_REPO}/waktu_sholat_landing/blob/main/LICENSE` },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo.png"
                  alt="Jadwal Masjid"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold text-foreground">Jadwal Masjid</span>
            </a>
            <p className="text-muted-foreground text-sm mb-4">
              Jadwal sholat digital untuk TV masjid. Akurat, mudah, bayar sekali pakai selamanya.
            </p>
            <div className="space-y-2 text-muted-foreground text-sm">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-primary flex-shrink-0" />
                <span>Real-time update</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-primary flex-shrink-0" />
                <span>GPS-based location</span>
              </div>
            </div>
          </div>

          {/* Product */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Produk</h4>
            <ul className="space-y-2.5">
              {footerLinks.product.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Support</h4>
            <ul className="space-y-2.5">
              {footerLinks.support.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-foreground font-semibold mb-4">Legal</h4>
            <ul className="space-y-2.5">
              {footerLinks.legal.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                    className="text-muted-foreground hover:text-primary text-sm transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-muted-foreground/60 text-sm">
            &copy; 2026 Jadwal Masjid. Dibuat dengan ❤️ untuk umat Islam.
          </p>
          <div className="flex gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground/60 hover:text-primary text-sm transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="https://twitter.com/waktusholat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground/60 hover:text-primary text-sm transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com/waktusholat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground/60 hover:text-primary text-sm transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
