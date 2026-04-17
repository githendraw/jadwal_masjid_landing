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
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-b border-green-200 shadow-sm"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <a href="#" className="flex items-center gap-2">
            <Clock className="w-7 h-7 text-green-700" />
            <span className="text-xl font-bold text-green-800">Waktu Sholat</span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-green-700 hover:text-green-800 transition-colors font-medium"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <Button variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
              Buka Demo
            </Button>
            <Button className="bg-green-600 hover:bg-green-700 text-white">
              Unduh APK
            </Button>
          </div>

          <button
            className="md:hidden text-green-800"
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
          className="md:hidden bg-white border-t border-green-200"
        >
          <nav className="px-4 py-4 space-y-3">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-green-700 hover:text-green-800 py-2 font-medium"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 space-y-2">
              <Button variant="outline" className="w-full border-green-600 text-green-700 hover:bg-green-50">
                Buka Demo
              </Button>
              <Button className="w-full bg-green-600 hover:bg-green-700 text-white">
                Unduh APK
              </Button>
            </div>
          </nav>
        </motion.div>
      )}
    </motion.header>
  );
}
