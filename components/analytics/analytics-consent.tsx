/**
 * CATATAN: komponen ini SEDANG TIDAK DIPAKAI.
 *
 * Dipakai kalau pemilik situs ingin mengaktifkan persetujuan cookie (Consent Mode)
 * kembali: cukup ganti <GoogleAnalyticsPageViews enabled /> di app/layout.tsx
 * menjadi <AnalyticsWithConsent /> dan kembalikan blok
 * gtag('consent','default',{...'denied'}) pada GA_TAG_SCRIPT.
 */
"use client";

import { useEffect, useState } from "react";
import { CONSENT_STORAGE_KEY, gtagPageView, gtagUpdateConsent } from "@/lib/gtag";
import { GoogleAnalyticsPageViews } from "./google-analytics-pageviews";
import { ConsentBanner } from "./consent-banner";

type Consent = "undecided" | "granted" | "denied";

/**
 * Mengelola izin analitik (Consent Mode v2).
 *
 * Tag Google sudah ada di HTML (dipasang di layout/head) dengan izin default
 * 'denied' — sehingga belum ada cookie sebelum pengunjung memilih. Komponen ini:
 * - membaca pilihan tersimpan lalu mengirim gtag('consent','update')
 * - menampilkan banner selama pengunjung belum memilih
 * - setelah "Terima": mengaktifkan penyimpanan + mengirim page_view pertama
 */
export function AnalyticsWithConsent() {
  const [consent, setConsent] = useState<Consent>("undecided");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let stored: string | null = null;
    try {
      stored = window.localStorage.getItem(CONSENT_STORAGE_KEY);
    } catch {
      /* localStorage tidak tersedia — anggap belum memilih */
    }

    if (stored === "granted") {
      setConsent("granted");
      gtagUpdateConsent(true);
      gtagPageView();
    } else if (stored === "denied") {
      setConsent("denied");
      gtagUpdateConsent(false);
    }
    setMounted(true);
  }, []);

  const decide = (value: "granted" | "denied") => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, value);
    } catch {
      /* lanjutkan untuk sesi ini saja */
    }
    setConsent(value);
    gtagUpdateConsent(value === "granted");
    if (value === "granted") gtagPageView();
  };

  return (
    <>
      <GoogleAnalyticsPageViews enabled={consent === "granted"} />
      {mounted && consent === "undecided" && <ConsentBanner onDecide={decide} />}
    </>
  );
}
