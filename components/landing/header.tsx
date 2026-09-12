"use client";

import { useTheme } from "next-themes";
import { motion } from "framer-motion";
import { Menu, Sun, Moon, X, LogOut, Package } from "lucide-react";
import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StoreNav } from "@/components/store/store-nav";
import Image from "next/image";

const navItems = [
  { label: "Jadwal Sholat", href: "/#jadwal" },
  { label: "Paket Waqaf", href: "/produk" },
  { label: "Cara Pakai", href: "/#cara-pakai" },
  { label: "FAQ", href: "/#faq" },
];

interface MeUser {
  id: number;
  name: string;
  email: string;
  role: string;
}

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [user, setUser] = useState<MeUser | null>(null);

  useEffect(() => {
    setMounted(true);
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user || null))
      .catch(() => {});
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    setUser(null);
    window.location.href = "/";
  }

  const closeMobileMenu = () => setMobileMenuOpen(false);

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
                src="/logo-v5.webp"
                alt="Logo Jadwal Masjid"
                fill
                className="object-contain"
              />
            </div>
            <span className="text-lg sm:text-xl font-bold text-foreground">
              Jadwal Masjid
            </span>
          </a>

          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="font-medium text-foreground/80 hover:text-primary transition-colors"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3 mr-2 sm:mr-0">
            <StoreNav />
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="text-muted-foreground hover:text-primary hover:bg-primary/10"
              aria-label="Toggle theme"
            >
              {mounted && (theme === "dark" ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />)}
            </Button>
          </div>

          <div className="flex items-center gap-2 md:hidden mr-2">
            <StoreNav />
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
              aria-label={mobileMenuOpen ? "Tutup menu" : "Buka menu"}
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
          <nav className="px-4 py-3 space-y-1 max-w-7xl mx-auto">
            {navItems.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={closeMobileMenu}
                className={`block py-1.5 text-muted-foreground hover:text-primary transition-colors`}
              >
                {item.label}
              </a>
            ))}

            <div className="pt-3 mt-2 border-t border-border space-y-2">
              {user ? (
                <>
                  <div className="px-1 py-1">
                    <p className="text-sm font-semibold text-foreground truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground truncate">
                      {user.email}
                    </p>
                  </div>
                  <Link
                    href="/akun"
                    onClick={closeMobileMenu}
                    className="flex items-center gap-2 w-full h-11 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
                  >
                    <Package className="w-4 h-4" />
                    Akun Saya
                  </Link>
                  <button
                    onClick={() => {
                      closeMobileMenu();
                      logout();
                    }}
                    className="flex items-center justify-center gap-2 w-full h-11 px-4 rounded-lg border border-border bg-background text-sm font-medium text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut className="w-4 h-4" />
                    Keluar
                  </button>
                </>
              ) : (
                <Link
                  href="/masuk"
                  onClick={closeMobileMenu}
                  className="flex items-center justify-center w-full h-11 px-4 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors"
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
