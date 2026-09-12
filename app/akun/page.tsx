import Link from "next/link";
import { redirect } from "next/navigation";
import { Package, ArrowRight } from "lucide-react";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";
import { formatRupiah, statusLabel, ORDER_STATUS_META } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function AkunPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/masuk");

  const orders = await prisma.order.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: { items: true },
    take: 20,
  });

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Halo, {user.name.split(" ")[0]} 👋
            </h1>
            <p className="text-muted-foreground text-sm mt-1">{user.email}</p>
            {!user.profileCompleted && (
              <p className="text-amber-600 text-sm mt-2">
                Profil belum lengkap — isi nomor HP &amp; nama masjid.
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <Link
              href="/akun/profil"
              className="inline-flex items-center rounded-lg border border-primary/50 text-primary hover:bg-primary/10 px-4 h-10 text-sm font-medium"
            >
              {user.profileCompleted ? "Profil &amp; Data" : "Lengkapi Profil"}
            </Link>
            <Link
              href="/produk"
              className="inline-flex items-center rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 px-4 h-10 text-sm font-medium"
            >
              Belanja
            </Link>
          </div>
        </div>

        <h2 className="font-bold text-xl text-foreground mb-4 flex items-center gap-2">
          <Package className="w-5 h-5 text-primary" />
          Pesanan Saya
        </h2>

        {orders.length === 0 ? (
          <div className="bg-card/50 border border-border rounded-2xl p-10 text-center">
            <p className="text-muted-foreground">Belum ada pesanan.</p>
            <Link href="/produk" className="mt-4 inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground px-5 h-10 font-semibold text-sm">
              Mulai Belanja <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {orders.map((o) => {
              const meta = ORDER_STATUS_META[o.status] || ORDER_STATUS_META.PENDING_PAYMENT;
              return (
                <Link
                  key={o.id}
                  href={`/akun/pesanan/${o.orderNumber}`}
                  className="block bg-card/50 border border-border rounded-2xl p-5 card-hover"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-3">
                    <div>
                      <p className="font-semibold text-foreground">{o.orderNumber}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(o.createdAt).toLocaleDateString("id-ID", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${meta.color}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
                      {meta.label}
                    </span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {o.items.map((i) => `${i.productName} ×${i.qty}`).join(", ")}
                  </div>
                  <div className="mt-3 font-bold text-foreground">{formatRupiah(o.total)}</div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}