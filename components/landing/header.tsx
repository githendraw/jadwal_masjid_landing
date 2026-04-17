"use client";

import { motion } from "framer-motion";
import { Clock, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const navItems = [
  { label: "Fitur", href: "#fitur" },
  { label: "Tampilan", href: "#tampilan" },
  { label: "Cara Pakai", href: "#cara-pakai" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-[#0A192F]/80 backdrop-blur-md border-b border-slate-800 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <Clock className="w-6 h-6 sm:w-7 sm:h-7 text-emerald-400 flex-shrink-0" />
            <span className="text-base sm:text-xl font-bold text-white hidden xs:inline">
              Waktu Sholat
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

          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" className="border-emerald-500 text-emerald-400 hover:bg-emerald-500/10">
              Buka Demo
            </Button>
            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
              Unduh APK
            </Button>
          </div>

          <button
            className="md:hidden text-white flex-shrink-0"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
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
                Buka Demo
              </Button>
              <Button className="w-full bg-emerald-500 hover:bg-emerald-600">
                Unduh APK
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
