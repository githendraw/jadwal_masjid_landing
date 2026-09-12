"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ArrowLeft, Loader2, Save, Package, MapPin, User as UserIcon, Clock } from "lucide-react";
import { formatRupiah, statusLabel, ORDER_STATUS_META } from "@/lib/format";
import { AdminNav } from "@/components/store/admin-nav";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const STATUSES = ["PENDING_PAYMENT", "PAID", "PROCESSING", "SHIPPED", "COMPLETED", "CANCELLED", "EXPIRED"];

interface OrderDetail {
  orderNumber: string;
  status: string;
  subtotal: number;
  shippingFee: number;
  total: number;
  createdAt: string;
  recipientName: string;
  phone: string;
  receiverMosqueName: string;
  address: string;
  city: string;
  province: string;
  postalCode: string;
  notes: string | null;
  courier: string | null;
  trackingNumber: string | null;
  duitkuReference: string | null;
  items: { id: number; productName: string; qty: number; unitPrice: number; lineTotal: number }[];
  logs: { id: number; status: string; note: string | null; createdAt: string }[];
  user?: { name: string; email: string };
}

export default function AdminPesananDetailPage() {
  const params = useParams<{ orderNumber: string }>();
  const orderNumber = params.orderNumber;

  const [order, setOrder] = useState<OrderDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");
  const [status, setStatus] = useState("PENDING_PAYMENT");
  const [note, setNote] = useState("");
  const [courier, setCourier] = useState("");
  const [tracking, setTracking] = useState("");

  useEffect(() => {
    fetch(`/api/admin/orders/${orderNumber}`)
      .then((r) => r.json())
      .then((d) => {
        if (d.order) {
          setOrder(d.order);
          setStatus(d.order.status);
          setCourier(d.order.courier || "");
          setTracking(d.order.trackingNumber || "");
        }
      })
      .finally(() => setLoading(false));
  }, [orderNumber]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      const res = await fetch(`/api/admin/orders/${orderNumber}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status, note, courier, trackingNumber: tracking }),
      });
      const data = await res.json();
      if (!res.ok) {
        setMsg("red|" + (data.error || "Gagal"));
        setSaving(false);
        return;
      }
      setOrder((o) => (o ? { ...o, status: data.order.status } : o));
      setMsg("green|Status diperbarui");
    } catch {
      setMsg("red|Terjadi kesalahan");
    }
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-background flex items-center justify-center">
        <Loader2 className="w-7 h-7 text-primary animate-spin" />
      </div>
    );
  }
  if (!order) {
    return <div className="min-h-screen pt-20 bg-background px-6">Pesanan tidak ditemukan.</div>;
  }

  const meta = ORDER_STATUS_META[order.status] || ORDER_STATUS_META.PENDING_PAYMENT;

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-20 bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <Link href="/admin/pesanan" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary mb-6">
          <ArrowLeft className="w-4 h-4" /> Kembali
        </Link>
        <AdminNav />

        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">{order.orderNumber}</h1>
            <p className="text-sm text-muted-foreground">{new Date(order.createdAt).toLocaleString("id-ID")}</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${meta.color}`}>{statusLabel(order.status)}</span>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {/* Items */}
          <div className="bg-card/50 border border-border rounded-2xl p-6">
            <h2 className="font-bold text-foreground mb-4 flex items-center gap-2"><Package className="w-5 h-5 text-primary" /> Item</h2>
            <div className="space-y-2 text-sm">
              {order.items.map((i) => (
                <div key={i.id} className="flex justify-between">
                  <span className="text-foreground">{i.productName} × {i.qty}</span>
                  <span>{formatRupiah(i.lineTotal)}</span>
                </div>
              ))}
              <div className="pt-3 border-t border-border space-y-1 text-muted-foreground">
                <div className="flex justify-between"><span>Subtotal</span><span>{formatRupiah(order.subtotal)}</span></div>
                <div className="flex justify-between"><span>Ongkir</span><span>{formatRupiah(order.shippingFee)}</span></div>
                <div className="flex justify-between font-bold text-foreground"><span>Total</span><span>{formatRupiah(order.total)}</span></div>
              </div>
            </div>
          </div>

          {/* Alamat */}
          <div className="bg-card/50 border border-border rounded-2xl p-6">
            <h2 className="font-bold text-foreground mb-4 flex items-center gap-2"><MapPin className="w-5 h-5 text-primary" /> Alamat</h2>
            <div className="text-sm text-muted-foreground space-y-1">
              <p className="text-foreground font-medium">{order.recipientName} — {order.phone}</p>
              <p>{order.receiverMosqueName}</p>
              <p>{order.address}, {order.city}, {order.province} {order.postalCode}</p>
              {order.notes && <p className="pt-2 text-amber-700">Catatan: {order.notes}</p>}
            </div>
            {order.user && (
              <div className="mt-4 pt-4 border-t border-border text-sm text-muted-foreground flex items-center gap-2">
                <UserIcon className="w-4 h-4 text-primary" />
                {order.user.name} · {order.user.email}
              </div>
            )}
          </div>
        </div>

        {/* Update status */}
        <div className="bg-card/50 border border-border rounded-2xl p-6 mb-4">
          <h2 className="font-bold text-foreground mb-4">Perbarui Status</h2>
          <form onSubmit={save} className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="Status">
                <Select value={status} onChange={(e) => setStatus(e.target.value)}>
                  {STATUSES.map((s) => <option key={s} value={s}>{statusLabel(s)}</option>)}
                </Select>
              </Field>
              <Field label="Kurir (saat kirim)">
                <Input value={courier} onChange={(e) => setCourier(e.target.value)} placeholder="JNE / J&T / dll" />
              </Field>
              <Field label="No. Resi">
                <Input value={tracking} onChange={(e) => setTracking(e.target.value)} />
              </Field>
              <Field label="Catatan">
                <Input value={note} onChange={(e) => setNote(e.target.value)} placeholder="opsional" />
              </Field>
            </div>
            {msg && (
              <p className={`text-sm ${msg.startsWith("red") ? "text-red-600" : "text-emerald-600"}`}>
                {msg.split("|")[1]}
              </p>
            )}
            <button type="submit" disabled={saving} className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 px-5 h-10 font-semibold text-sm disabled:opacity-60">
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              Simpan
            </button>
          </form>
        </div>

        {/* Logs */}
        <div className="bg-card/50 border border-border rounded-2xl p-6">
          <h2 className="font-bold text-foreground mb-4 flex items-center gap-2"><Clock className="w-5 h-5 text-primary" /> Riwayat</h2>
          <div className="space-y-3">
            {order.logs.map((l) => (
              <div key={l.id} className="flex gap-3 text-sm">
                <span className={`mt-1.5 w-2 h-2 rounded-full ${ORDER_STATUS_META[l.status]?.dot || "bg-slate-400"} flex-shrink-0`} />
                <div>
                  <p className="text-foreground font-medium">{statusLabel(l.status)}</p>
                  {l.note && <p className="text-muted-foreground text-xs">{l.note}</p>}
                  <p className="text-xs text-muted-foreground">{new Date(l.createdAt).toLocaleString("id-ID")}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {order.duitkuReference && (
          <p className="text-xs text-muted-foreground mt-4">Referensi Duitku: {order.duitkuReference}</p>
        )}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}