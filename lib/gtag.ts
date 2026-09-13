/**
 * Utilitas Google Analytics + Consent Mode v2.
 *
 * Kenapa Consent Mode: tag Google harus ADA di HTML supaya terbaca oleh alat
 * verifikasi Google, tetapi cookie/penyimpanan analitik hanya boleh aktif
 * setelah pengunjung menyetujui. Consent Mode memenuhi keduanya:
 * default 'denied' (tanpa cookie) -> 'granted' setelah tombol Terima.
 */
export const GA_ID = "G-V7VC569WH7";
export const CONSENT_STORAGE_KEY = "jm_analytics_consent";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

/** Kirim pembaruan izin ke Google (dipanggil saat pengunjung memilih). */
export function gtagUpdateConsent(granted: boolean): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const value = granted ? "granted" : "denied";
  window.gtag("consent", "update", {
    analytics_storage: value,
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value,
  });
}

/** Kirim page_view untuk navigasi client-side (halaman berikutnya). */
export function gtagPageView(): void {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "page_view", {
    page_path: window.location.pathname + window.location.search,
    page_location: window.location.href,
    page_title: document.title,
  });
}
