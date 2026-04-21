"use client";

import { motion } from "framer-motion";
import { Clock, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const WHATSAPP_LINK = "https://wa.me/6287774348558?text=Halo%20Waktu%20Sholat";

const navItems = [
  { label: "Fitur", href: "#fitur" },
  { label: "Tampilan", href: "#tampilan" },
  { label: "Cara Pakai", href: "#cara-pakai" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-[#0A192F]/80 backdrop-blur-md border-b border-slate-800"
    >
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <a href="/" className="flex items-center gap-2 flex-shrink-0 ml-2 sm:ml-0">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9">
              <Image
                src="/logo.png"
                alt="Jadwal Masjid"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-lg sm:text-xl font-bold text-white">
              Jadwal Masjid
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-slate-300 hover:text-emerald-400 transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3 mr-2 sm:mr-0">
            <Button variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10">
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                Buka Demo
              </a>
            </Button>
          </div>

          <button
            className="md:hidden text-white flex-shrink-0 mr-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="md:hidden bg-[#0A192F] border-t border-slate-800"
        >
          <nav className="px-4 py-4 space-y-3 max-w-7xl mx-auto">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-slate-300 hover:text-emerald-400 py-2"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full border-emerald-500 text-emerald-400">
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  Buka Demo
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}