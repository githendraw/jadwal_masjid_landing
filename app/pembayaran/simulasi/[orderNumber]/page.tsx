"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { Loader2, FlaskConical, CheckCircle2, ArrowRight, Info } from "lucide-react";

export default function SimulasiPage() {
  const params = useParams<{ orderNumber: string }>();
  const orderNumber = params.orderNumber;
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function simPay() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/orders/${orderNumber}/simulate-pay`, { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Gagal memproses");
        setLoading(false);
        return;
      }
      setDone(true);
    } catch {
      setError("Terjadi kesalahan");
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-20 bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-card/50 border border-dashed border-primary/40 rounded-3xl p-8 text-center shadow-xl shadow-primary/5">
        <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
          <FlaskConical className="w-8 h-8 text-primary" />
        </div>
        <h1 className="text-2xl font-bold text-foreground">
          Simulasi Pembayaran
        </h1>
        <p className="text-sm text-muted-foreground mt-2">
          Mode pengembangan. Klik tombol di bawah untuk{" "}
          <span className="text-foreground font-medium">menandai pesanan {orderNumber} sebagai sudah dibayar</span>{" "}
          (semua metode Duitku).
        </p>

        {!done && (
          <button
            onClick={simPay}
            disabled={loading}
            className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground h-12 font-semibold disabled:opacity-60"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
            {loading ? "Memproses..." : "Bayar Sekarang (Simulasi)"}
          </button>
        )}
        {error && (
          <div className="mt-4 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700 text-left">
            <Info className="w-4 h-4 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {done && (
          <>
            <div className="mt-6 flex items-center justify-center gap-2 text-emerald-600">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-semibold">Pembayaran (simulasi) berhasil!</span>
            </div>
            <Link
              href={`/akun/pesanan/${orderNumber}`}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground h-11 font-semibold text-sm"
            >
              Lihat Pesanan <ArrowRight className="w-4 h-4" />
            </Link>
          </>
        )}

        <p className="text-xs text-muted-foreground mt-6">
          Simulasi nonaktif otomatis saat API key Duitku asli diisi.
        </p>
      </div>
    </div>
  );
}