"use client";

import { useEffect, useState } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { GoogleAnalyticsPageViews } from "./google-analytics-pageviews";
import { ConsentBanner } from "./consent-banner";

const GA_ID = "G-V7VC569WH7";
const STORAGE_KEY = "jm_analytics_consent";

type Consent = "undecided" | "granted" | "denied";

/**
 * Membungkus Google Analytics dengan persetujuan pengunjung:
 * - belum memilih  -> tampilkan banner, ANALYTICS BELUM DIMUAT
 * - "Terima"       -> GA dimuat, pilihan disimpan di localStorage
 * - "Tolak"        -> GA tidak pernah dimuat, banner hilang
 * Pilihan dibaca di useEffect supaya tidak ada ketidakcocokan saat hidrasi.
 */
export function AnalyticsWithConsent() {
  const [consent, setConsent] = useState<Consent>("undecided");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (stored === "granted") setConsent("granted");
      else if (stored === "denied") setConsent("denied");
    } catch {
      /* localStorage tidak tersedia (mode privasi ketat) — anggap belum memilih */
    }
    setMounted(true);
  }, []);

  const decide = (value: "granted" | "denied") => {
    try {
      window.localStorage.setItem(STORAGE_KEY, value);
    } catch {
      /* tetap lanjutkan dengan pilihan di sesi ini */
    }
    setConsent(value);
  };

  return (
    <>
      {consent === "granted" && (
        <>
          <GoogleAnalytics gaId={GA_ID} />
          <GoogleAnalyticsPageViews />
        </>
      )}
      {mounted && consent === "undecided" && <ConsentBanner onDecide={decide} />}
    </>
  );
}
