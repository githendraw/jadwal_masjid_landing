"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { sendGAEvent } from "@next/third-parties/google";

/**
 * Pelengkap GoogleAnalytics dari @next/third-parties.
 *
 * Komponen bawaan paket itu hanya menjalankan gtag('config') SEKALI, sehingga
 * page_view hanya tercatat untuk halaman pertama yang dibuka. Di App Router,
 * sebagian besar perpindahan halaman terjadi lewat navigasi client-side (tanpa
 * memuat ulang dokumen) — tanpa komponen ini, halaman-halaman itu tidak masuk
 * Analytics.
 *
 * Komponen ini mengirim event page_view setiap kali path berubah, dan sengaja
 * melewati pemuatan pertama supaya tidak menghitung ganda dengan gtag('config').
 */
export function GoogleAnalyticsPageViews() {
  const pathname = usePathname();
  const skipFirst = useRef(true);

  useEffect(() => {
    if (!pathname) return;
    if (skipFirst.current) {
      skipFirst.current = false;
      return;
    }

    sendGAEvent("event", "page_view", {
      page_path: pathname + window.location.search,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}
