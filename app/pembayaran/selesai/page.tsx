"use client";

import { useEffect, useState, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { CheckCircle2, Loader2, ArrowRight } from "lucide-react";

export default function SelesaiPage() {
  return (
    <Suspense fallback={<Center><Loader2 className="w-8 h-8 text-primary animate-spin" /></Center>}>
      <SelesaiInner />
    </Suspense>
  );
}

function SelesaiInner() {
  const params = useSearchParams();
  const order = params.get("order") || params.get("merchantOrderId") || "";
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (!order) return;
    fetch(`/api/orders/${order}`)
      .then((r) => r.json())
      .then((d) => setStatus(d.order?.status || null))
      .catch(() => {});
  }, [order]);

  const paid = status === "PAID" || status === "PROCESSING" || status === "SHIPPED" || status === "COMPLETED";

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-20 bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-card/50 border border-border rounded-3xl p-8 text-center shadow-xl shadow-primary/5">
        {status === null ? (
          <>
            <Loader2 className="w-10 h-10 text-primary animate-spin mx-auto" />
            <p className="text-muted-foreground mt-4 text-sm">Memeriksa status pembayaran...</p>
          </>
        ) : paid ? (
          <>
            <div className="mx-auto w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mb-4">
              <CheckCircle2 className="w-9 h-9 text-emerald-600" />
            </div>
            <h1 className="text-2xl font-bold text-foreground">Pembayaran Berhasil!</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Kami segera memproses pesananmu. Detail status bisa kamu pantau di halaman
              pesanan.
            </p>
            <Link
              href={order ? `/akun/pesanan/${order}` : "/akun"}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground h-11 font-semibold text-sm"
            >
              Lihat Pesanan <ArrowRight className="w-4 h-4" />
            </Link>
          </>
        ) : (
          <>
            <h1 className="text-2xl font-bold text-foreground">Menunggu Konfirmasi</h1>
            <p className="text-sm text-muted-foreground mt-2">
              Pembayaran belum terkonfirmasi. Cek status secara berkala di halaman
              pesanan — konfirmasi Duitku biasanya beberapa detik.
            </p>
            <Link
              href={order ? `/akun/pesanan/${order}` : "/akun"}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary text-primary-foreground h-11 font-semibold text-sm"
            >
              Cek Status Pesanan <ArrowRight className="w-4 h-4" />
            </Link>
          </>
        )}
        {order && status && (
          <p className="text-xs text-muted-foreground mt-6">No. Pesanan: {order}</p>
        )}
      </div>
    </div>
  );
}

function Center({ children }: { children: React.ReactNode }) {
  return <div className="min-h-screen pt-20 bg-background flex items-center justify-center">{children}</div>;
}