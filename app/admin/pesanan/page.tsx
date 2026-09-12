"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { formatRupiah, statusLabel, ORDER_STATUS_META } from "@/lib/format";
import { AdminNav } from "@/components/store/admin-nav";

const FILTERS = ["ALL", "PENDING_PAYMENT", "PAID", "PROCESSING", "SHIPPED", "COMPLETED", "CANCELLED", "EXPIRED"];

interface OrderRow {
  id: number;
  orderNumber: string;
  status: string;
  total: number;
  createdAt: string;
  recipientName: string;
  phone: string;
  items: { productName: string; qty: number }[];
  user?: { name: string };
}

export default function AdminPesananPage() {
  const [status, setStatus] = useState("ALL");
  const [orders, setOrders] = useState<OrderRow[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(() => {
    return fetch(`/api/admin/orders?status=${status}&page=1`)
      .then((r) => r.json())
      .then((d) => setOrders(d.orders || []));
  }, [status]);

  useEffect(() => {
    setLoading(true);
    load().finally(() => setLoading(false));
  }, [load]);

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">Kelola Pesanan</h1>
        <AdminNav />

        <div className="flex gap-2 flex-wrap mb-6">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setStatus(f)}
              className={`rounded-full px-3.5 py-1.5 text-xs font-semibold transition-colors ${
                status === f
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:text-primary"
              }`}
            >
              {f === "ALL" ? "Semua" : statusLabel(f)}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-7 h-7 text-primary animate-spin" /></div>
        ) : orders.length === 0 ? (
          <p className="text-muted-foreground text-sm bg-card/50 border border-border rounded-2xl p-6">Tidak ada pesanan.</p>
        ) : (
          <div className="space-y-2">
            {orders.map((o) => {
              const meta = ORDER_STATUS_META[o.status] || ORDER_STATUS_META.PENDING_PAYMENT;
              return (
                <Link key={o.id} href={`/admin/pesanan/${o.orderNumber}`} className="flex flex-wrap items-center justify-between gap-3 bg-card/50 border border-border rounded-xl px-5 py-3.5 card-hover">
                  <div>
                    <p className="font-semibold text-foreground text-sm">{o.orderNumber}</p>
                    <p className="text-xs text-muted-foreground">
                      {o.recipientName} · {o.phone}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {o.items.map((i) => `${i.productName} ×${i.qty}`).join(", ")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-foreground">{formatRupiah(o.total)}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${meta.color}`}>{statusLabel(o.status)}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}