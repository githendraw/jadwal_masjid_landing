"use client";

import { Clock, MapPin, Mail, Phone } from "lucide-react";
import Image from "next/image";

const WHATSAPP_LINK = "https://wa.me/6285283302551?text=Halo%20Jadwal%20Masjid,%20saya%20ingin%20bertanya...";

const footerLinks = {
  product: [
    { label: "Fitur", href: "#fitur" },
    { label: "Tampilan", href: "#tampilan" },
    { label: "Harga", href: "#harga" },
    { label: "Cara Pakai", href: "#cara-pakai" },
    { label: "FAQ", href: "#faq" },
  ],
  support: [
    { label: "Hubungi Kami", href: WHATSAPP_LINK },
    { label: "Komunitas", href: "https://t.me/jadwalmasjid" },
  ],
};

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <a href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8">
                <Image
                  src="/logo.webp"
                  alt="Jadwal Masjid"
                  fill
                  className="object-contain"
                />
              </div>
              <span className="text-lg font-bold text-foreground">Jadwal Masjid</span>
            </a>
            <p className="text-foreground/70 text-sm mb-4">
              Android TV Box jadwal sholat digital untuk TV masjid. Akurat, mudah,
              dan langsung siap pakai. Setup 100% offline.
            </p>
            <div className="space-y-2 text-foreground/60 text-sm">
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
                    className="text-foreground/70 hover:text-primary text-sm transition-colors"
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
                    className="text-foreground/70 hover:text-primary text-sm transition-colors"
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
           <p className="text-foreground/60 text-sm">
            &copy; 2026 Jadwal Masjid. Dibuat dengan ❤️ untuk umat Islam.
          </p>
          <div className="flex gap-4">
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary text-sm transition-colors"
            >
              WhatsApp
            </a>
            <a
              href="https://twitter.com/waktusholat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary text-sm transition-colors"
            >
              Twitter
            </a>
            <a
              href="https://instagram.com/waktusholat"
              target="_blank"
              rel="noopener noreferrer"
              className="text-foreground/60 hover:text-primary text-sm transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
