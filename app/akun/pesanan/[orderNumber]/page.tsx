import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { ArrowLeft, MapPin, Clock, Package } from "lucide-react";
import prisma from "@/lib/prisma";
import { getCurrentUser } from "@/lib/current-user";
import { formatRupiah, statusLabel, ORDER_STATUS_META } from "@/lib/format";
import { PayButton } from "@/components/store/pay-button";

export const dynamic = "force-dynamic";

export default async function PesananDetailPage({
  params,
}: {
  params: Promise<{ orderNumber: string }>;
}) {
  const user = await getCurrentUser();
  if (!user) redirect("/masuk");
  const { orderNumber } = await params;

  const order = await prisma.order.findFirst({
    where: { orderNumber, userId: user.id },
    include: { items: true, logs: { orderBy: { createdAt: "desc" } } },
  });
  if (!order) notFound();

  const meta = ORDER_STATUS_META[order.status] || ORDER_STATUS_META.PENDING_PAYMENT;
  const isExpired =
    order.status === "PENDING_PAYMENT" && new Date(order.expiryAt).getTime() < Date.now();

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link
          href="/akun"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          Kembali ke Akun
        </Link>

        <div className="flex items-center justify-between gap-4 mb-6 flex-wrap">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{order.orderNumber}</h1>
            <p className="text-sm text-muted-foreground">
              Dibuat {new Date(order.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
            </p>
          </div>
          <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${meta.color}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
            {meta.label}
          </span>
        </div>

        {isExpired && (
          <div className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-700">
            Sesi pembayaran sebelumnya sudah kadaluarsa. Klik &ldquo;Bayar Sekarang&rdquo;
            untuk membuat tagihan baru.
          </div>
        )}

        {/* Items */}
        <div className="bg-card/50 border border-border rounded-2xl p-6 mb-4">
          <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Package className="w-5 h-5 text-primary" /> Rincian Pesanan
          </h2>
          <div className="space-y-3">
            {order.items.map((i) => (
              <div key={i.id} className="flex justify-between text-sm">
                <span className="text-foreground">{i.productName} × {i.qty}</span>
                <span className="text-foreground font-medium">{formatRupiah(i.lineTotal)}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-border space-y-1.5 text-sm text-muted-foreground">
            <div className="flex justify-between"><span>Subtotal</span><span>{formatRupiah(order.subtotal)}</span></div>
            <div className="flex justify-between"><span>Ongkir</span><span>{formatRupiah(order.shippingFee)}</span></div>
            <div className="flex justify-between pt-2 text-base font-bold text-foreground"><span>Total</span><span>{formatRupiah(order.total)}</span></div>
          </div>
          {(order.status === "PENDING_PAYMENT" || order.status === "EXPIRED") && (
            <div className="mt-5">
              <PayButton orderNumber={order.orderNumber} status={order.status} />
            </div>
          )}
        </div>

        {/* Alamat */}
        <div className="bg-card/50 border border-border rounded-2xl p-6 mb-4">
          <h2 className="font-bold text-foreground mb-3 flex items-center gap-2">
            <MapPin className="w-5 h-5 text-primary" /> Alamat Pengiriman
          </h2>
          <div className="text-sm text-muted-foreground space-y-1">
            <p className="text-foreground font-medium">{order.recipientName} — {order.phone}</p>
            <p>{order.receiverMosqueName}</p>
            <p>{order.address}</p>
            <p>{order.city}, {order.province} {order.postalCode}</p>
            {order.notes && <p className="pt-2 text-amber-700">Catatan: {order.notes}</p>}
            {order.courier && (
              <p className="pt-2"><span className="text-foreground">Kurir:</span> {order.courier}{order.trackingNumber ? ` · ${order.trackingNumber}` : ""}</p>
            )}
          </div>
        </div>

        {/* Riwayat status */}
        <div className="bg-card/50 border border-border rounded-2xl p-6">
          <h2 className="font-bold text-foreground mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-primary" /> Riwayat Status
          </h2>
          <div className="space-y-3">
            {order.logs.map((l) => (
              <div key={l.id} className="flex gap-3 text-sm">
                <span className={`mt-1.5 w-2 h-2 rounded-full ${ORDER_STATUS_META[l.status]?.dot || "bg-slate-400"} flex-shrink-0`} />
                <div>
                  <p className="text-foreground font-medium">{statusLabel(l.status)}</p>
                  {l.note && <p className="text-muted-foreground text-xs">{l.note}</p>}
                  <p className="text-xs text-muted-foreground">
                    {new Date(l.createdAt).toLocaleString("id-ID", { dateStyle: "medium", timeStyle: "short" })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Ada kendala? Hubungi kami via WhatsApp.
        </p>
      </div>
    </div>
  );
}