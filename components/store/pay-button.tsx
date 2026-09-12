"use client";

import { useState } from "react";
import { Loader2, CreditCard } from "lucide-react";

export function PayButton({
  orderNumber,
  status,
}: {
  orderNumber: string;
  status: string;
}) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const payable = status === "PENDING_PAYMENT" || status === "EXPIRED";

  async function pay() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/orders/${orderNumber}/pay`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Gagal membuat pembayaran");
        setLoading(false);
        return;
      }
      window.location.href = data.paymentUrl;
    } catch {
      setError("Terjadi kesalahan. Coba lagi.");
      setLoading(false);
    }
  }

  if (!payable) return null;

  return (
    <div>
      <button
        onClick={pay}
        disabled={loading}
        className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground h-12 font-semibold disabled:opacity-60 glow-primary"
      >
        {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <CreditCard className="w-4 h-4" />}
        {loading ? "Membuka Pembayaran..." : "Bayar Sekarang (Duitku)"}
      </button>
      {error && <p className="text-sm text-red-600 mt-2">{error}</p>}
    </div>
  );
}