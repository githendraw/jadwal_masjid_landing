"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { gtagPageView } from "@/lib/gtag";

/**
 * Mengirim page_view untuk SETIAP navigasi client-side.
 *
 * gtag('config') hanya berjalan sekali saat halaman pertama dibuka, sehingga
 * perpindahan halaman ala SPA (mis. klik kartu produk) tidak tercatat. Komponen
 * ini menutup celah itu, dan hanya aktif kalau pengunjung sudah menyetujui
 * analitik. Pemuatan pertama dilewati supaya tidak dihitung ganda.
 */
export function GoogleAnalyticsPageViews({ enabled }: { enabled: boolean }) {
  const pathname = usePathname();
  const skipFirst = useRef(true);

  useEffect(() => {
    if (!enabled || !pathname) return;
    if (skipFirst.current) {
      skipFirst.current = false;
      return;
    }
    gtagPageView();
  }, [enabled, pathname]);

  return null;
}
