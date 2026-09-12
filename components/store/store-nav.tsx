"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import {
  ShoppingCart,
  ChevronDown,
  User,
  Package,
  Settings,
  LogOut,
} from "lucide-react";
import { useCart } from "./cart-provider";
import { Button } from "@/components/ui/button";

interface MeUser {
  id: number;
  name: string;
  email: string;
  role: string;
  avatarUrl?: string | null;
}

export function StoreNav() {
  const { count } = useCart();
  const [user, setUser] = useState<MeUser | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => setUser(d.user || null))
      .catch(() => {});
  }, []);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/";
  }

  return (
    <div className="flex items-center gap-2">
      <Link
        href="/keranjang"
        aria-label={`Keranjang, ${count} barang`}
        className="relative p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
      >
        <ShoppingCart className="w-5 h-5" />
        {count > 0 && (
          <span className="absolute -top-0.5 -right-0.5 min-w-[18px] h-[18px] px-1 rounded-full bg-primary text-primary-foreground text-[11px] font-bold flex items-center justify-center">
            {count}
          </span>
        )}
      </Link>

      {user ? (
        <div className="relative" ref={menuRef}>
          <button
            onClick={() => setMenuOpen((o) => !o)}
            className="flex items-center gap-1.5 py-1.5 px-1 rounded-lg hover:bg-primary/10 transition-colors"
          >
            {user.avatarUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="w-7 h-7 rounded-full object-cover border border-border"
              />
            ) : (
              <span className="w-7 h-7 rounded-full bg-primary/15 text-primary flex items-center justify-center text-xs font-bold">
                {user.name.charAt(0).toUpperCase()}
              </span>
            )}
            <ChevronDown className="w-4 h-4 text-muted-foreground hidden sm:block" />
          </button>

          {menuOpen && (
            <div className="absolute right-0 mt-2 w-52 rounded-xl border border-border bg-card shadow-xl shadow-black/20 overflow-hidden z-50">
              <div className="px-4 py-3 border-b border-border">
                <p className="text-sm font-semibold text-foreground truncate">{user.name}</p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
              <MenuItem href="/akun" icon={<Package className="w-4 h-4" />} onClick={() => setMenuOpen(false)}>
                Akun Saya
              </MenuItem>
              <MenuItem href="/akun/profil" icon={<User className="w-4 h-4" />} onClick={() => setMenuOpen(false)}>
                Profil &amp; Data
              </MenuItem>
              {user.role === "ADMIN" && (
                <MenuItem href="/admin" icon={<Settings className="w-4 h-4" />} onClick={() => setMenuOpen(false)}>
                  Panel Admin
                </MenuItem>
              )}
              <button
                onClick={logout}
                className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Keluar
              </button>
            </div>
          )}
        </div>
      ) : (
        <Link
          href="/masuk"
          className="hidden md:inline-flex h-8 items-center justify-center rounded-lg bg-primary px-3 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Login
        </Link>
      )}
    </div>
  );
}

function MenuItem({
  href,
  icon,
  children,
  onClick,
}: {
  href: string;
  icon: React.ReactNode;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex items-center gap-2 px-4 py-2.5 text-sm text-foreground/80 hover:bg-muted transition-colors"
    >
      {icon}
      {children}
    </Link>
  );
}