import { redirect } from "next/navigation";
import Link from "next/link";
import { Package, Wallet, Clock, TrendingUp } from "lucide-react";
import prisma from "@/lib/prisma";
import { requireAdmin } from "@/lib/current-user";
import { formatRupiah, statusLabel, ORDER_STATUS_META } from "@/lib/format";
import { AdminNav } from "@/components/store/admin-nav";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  let admin;
  try {
    admin = await requireAdmin();
  } catch {
    redirect("/akun");
  }

  const [products, activeProducts, orderCount, pendingCount, paidAgg, recentOrders] =
    await Promise.all([
      prisma.product.count(),
      prisma.product.count({ where: { isActive: true } }),
      prisma.order.count(),
      prisma.order.count({ where: { status: "PENDING_PAYMENT" } }),
      prisma.order.aggregate({
        _sum: { total: true },
        where: { status: { in: ["PAID", "PROCESSING", "SHIPPED", "COMPLETED"] } },
      }),
      prisma.order.findMany({
        orderBy: { createdAt: "desc" },
        take: 8,
        include: { items: true, user: { select: { name: true } } },
      }),
    ]);

  const cards = [
    { label: "Total Produk", value: String(products), sub: `${activeProducts} aktif`, icon: Package },
    { label: "Total Pesanan", value: String(orderCount), sub: `${pendingCount} menunggu bayar`, icon: Clock },
    { label: "Pendapatan (Lunas)", value: formatRupiah(paidAgg._sum.total || 0), sub: "semua status lunas", icon: Wallet },
    { label: "Admin", value: admin.name.split(" ")[0], sub: admin.email, icon: TrendingUp },
  ];

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Panel Admin</h1>
        <p className="text-sm text-muted-foreground mb-8">Kelola produk &amp; pesanan Jadwal Masjid.</p>
        <AdminNav />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {cards.map((c) => (
            <div key={c.label} className="bg-card border border-border rounded-2xl p-5">
              <div className="flex items-center gap-2 text-muted-foreground text-sm mb-3">
                <c.icon className="w-4 h-4 text-primary" />
                {c.label}
              </div>
              <div className="text-xl font-bold text-foreground">{c.value}</div>
              <div className="text-xs text-muted-foreground mt-1 truncate">{c.sub}</div>
            </div>
          ))}
        </div>

        <h2 className="font-bold text-xl text-foreground mb-4">Pesanan Terbaru</h2>
        {recentOrders.length === 0 ? (
          <p className="text-muted-foreground text-sm bg-card/50 border border-border rounded-2xl p-6">
            Belum ada pesanan.
          </p>
        ) : (
          <div className="space-y-2">
            {recentOrders.map((o) => {
              const meta = ORDER_STATUS_META[o.status] || ORDER_STATUS_META.PENDING_PAYMENT;
              return (
                <Link
                  key={o.id}
                  href={`/admin/pesanan/${o.orderNumber}`}
                  className="flex flex-wrap items-center justify-between gap-3 bg-card/50 border border-border rounded-xl px-5 py-3.5 card-hover"
                >
                  <div>
                    <p className="font-semibold text-foreground text-sm">{o.orderNumber}</p>
                    <p className="text-xs text-muted-foreground">
                      {o.user?.name} · {o.items.map((i) => i.productName).join(", ")}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-foreground">{formatRupiah(o.total)}</span>
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${meta.color}`}>
                      {statusLabel(o.status)}
                    </span>
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