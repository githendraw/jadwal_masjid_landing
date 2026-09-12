"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Package, PackageCheck, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

const links = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/produk", label: "Produk", icon: Package },
  { href: "/admin/pesanan", label: "Pesanan", icon: PackageCheck },
];

export function AdminNav() {
  const pathname = usePathname();
  return (
    <div className="flex items-center gap-2 flex-wrap mb-8">
      {links.map((l) => {
        const active = pathname === l.href || pathname.startsWith(`${l.href}/`);
        return (
          <Link
            key={l.href}
            href={l.href}
            className={cn(
              "inline-flex items-center gap-2 rounded-lg px-4 h-10 text-sm font-medium transition-colors",
              active
                ? "bg-primary text-primary-foreground"
                : "border border-border text-muted-foreground hover:text-primary hover:border-primary/40"
            )}
          >
            <l.icon className="w-4 h-4" />
            {l.label}
          </Link>
        );
      })}
      <Link
        href="/akun"
        className="inline-flex items-center gap-2 rounded-lg px-4 h-10 text-sm font-medium text-muted-foreground hover:text-primary"
      >
        <ArrowLeft className="w-4 h-4" />
        Kembali
      </Link>
    </div>
  );
}