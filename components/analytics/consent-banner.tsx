"use client";

import { motion } from "framer-motion";

/**
 * Banner persetujuan cookie — minimalis, senada tema situs (mendukung mode gelap).
 * Google Analytics baru dimuat setelah pengunjung menekan "Terima".
 */
export function ConsentBanner({
  onDecide,
}: {
  onDecide: (value: "granted" | "denied") => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      role="dialog"
      aria-live="polite"
      aria-label="Persetujuan cookie analitik"
      className="fixed bottom-20 left-4 right-4 z-[60] rounded-2xl border border-border bg-card/95 p-4 shadow-xl backdrop-blur sm:bottom-6 sm:right-auto sm:max-w-sm"
    >
      <p className="text-[13px] leading-relaxed text-foreground/80">
        Kami memakai cookie <span className="font-medium text-foreground">Google Analytics</span> untuk
        memahami bagaimana situs ini digunakan. Kamu boleh menolak — semua fitur tetap berjalan seperti biasa.
      </p>
      <div className="mt-3 flex items-center gap-2">
        <button
          type="button"
          onClick={() => onDecide("granted")}
          className="flex-1 rounded-lg bg-[#00d4aa] px-4 py-2 text-[13px] font-semibold text-[#062e2a] transition-colors hover:bg-[#00bf9a] sm:flex-none"
        >
          Terima
        </button>
        <button
          type="button"
          onClick={() => onDecide("denied")}
          className="rounded-lg px-3 py-2 text-[13px] font-medium text-foreground/60 transition-colors hover:text-foreground"
        >
          Tolak
        </button>
      </div>
    </motion.div>
  );
}
