"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Menu, Sun, Moon, X } from "lucide-react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const WHATSAPP_LINK = "https://wa.me/6287774348558?text=Halo%20Jadwal%20Masjid,%20saya%20ingin%20bertanya...";

const navItems = [
  { label: "Fitur", href: "#fitur" },
  { label: "Tampilan", href: "#tampilan" },
  { label: "Cara Pakai", href: "#cara-pakai" },
  { label: "FAQ", href: "#faq" },
];

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-16">
          <a href="/" className="flex items-center gap-2 flex-shrink-0 ml-2 sm:ml-0">
            <div className="relative w-8 h-8 sm:w-9 sm:h-9">
              <Image
                src="/logo.webp"
                alt="Jadwal Masjid"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-lg sm:text-xl font-bold text-foreground">
              Jadwal Masjid
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-8">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="text-foreground/80 font-medium hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3 mr-2 sm:mr-0">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-primary hover:bg-primary/10"
              aria-label="Toggle theme"
            >
              {mounted && (theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
            </Button>
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
            >
              <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                Hubungi Kami
              </a>
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden mr-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-primary hover:bg-primary/10"
              aria-label="Toggle theme"
            >
              {mounted && (theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
            </Button>
            <button
              className="text-foreground flex-shrink-0"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          className="md:hidden bg-background border-t border-border"
        >
          <nav className="px-4 py-4 space-y-3 max-w-7xl mx-auto">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-muted-foreground hover:text-primary py-2"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-4 space-y-2">
              <Button
                size="sm"
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              >
                <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer">
                  Hubungi Kami
                </a>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
