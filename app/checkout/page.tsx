"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Loader2, UserRound, Info } from "lucide-react";
import { useCart } from "@/components/store/cart-provider";
import { formatRupiah } from "@/lib/format";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface MeUser {
  id: number;
  name: string;
  email: string;
  phone: string | null;
  mosqueName: string | null;
  mosqueAddress: string | null;
  city: string | null;
  province: string | null;
  postalCode: string | null;
  profileCompleted: boolean;
  role: string;
}

export default function CheckoutPage() {
  const { items, subtotal, shippingFee, hydrated } = useCart();
  const [user, setUser] = useState<MeUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    recipientName: "",
    phone: "",
    mosqueName: "",
    address: "",
    city: "",
    province: "",
    postalCode: "",
    notes: "",
  });

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        const u = d.user as MeUser | null;
        setUser(u);
        if (u) {
          setForm((f) => ({
            ...f,
            recipientName: u.name,
            phone: u.phone || "",
            mosqueName: u.mosqueName || "",
            address: u.mosqueAddress || "",
            city: u.city || "",
            province: u.province || "",
            postalCode: u.postalCode || "",
          }));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  function set<K extends keyof typeof form>(key: K, val: string) {
    setForm((f) => ({ ...f, [key]: val }));
  }

  async function submitOrder(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setError("");
    setSubmitting(true);
    try {
      const createRes = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lines: items.map((i) => ({ productId: i.productId, qty: i.qty })),
          shipping: {
            recipientName: form.recipientName,
            phone: form.phone,
            mosqueName: form.mosqueName,
            address: form.address,
            city: form.city,
            province: form.province,
            postalCode: form.postalCode || undefined,
          },
          notes: form.notes || undefined,
        }),
      });
      const createData = await createRes.json();
      if (!createRes.ok) {
        setError(createData.error || "Gagal membuat pesanan");
        setSubmitting(false);
        return;
      }
      const orderNumber: string = createData.order.orderNumber;

      const payRes = await fetch(`/api/orders/${orderNumber}/pay`, { method: "POST" });
      const payData = await payRes.json();
      if (!payRes.ok) {
        setError(payData.error || "Gagal membuat pembayaran");
        setSubmitting(false);
        return;
      }
      window.location.href = payData.paymentUrl;
    } catch {
      setError("Terjadi kesalahan. Coba lagi.");
      setSubmitting(false);
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen pt-20 bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen pt-20 sm:pt-24 pb-20 bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <p className="text-lg text-foreground font-semibold">Silakan masuk dulu</p>
          <Link href="/masuk" className="mt-4 inline-flex rounded-lg bg-primary text-primary-foreground px-6 h-11 items-center font-semibold text-sm">
            Masuk
          </Link>
        </div>
      </div>
    );
  }

  if (!user.profileCompleted) {
    return (
      <div className="min-h-screen pt-20 sm:pt-24 pb-20 bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-md bg-card/50 border border-border rounded-3xl p-8">
          <div className="mx-auto w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <UserRound className="w-7 h-7 text-primary" />
          </div>
          <h1 className="text-xl font-bold text-foreground">Lengkapi Profil Dulu</h1>
          <p className="text-sm text-muted-foreground mt-2">
            Sebelum checkout, kami perlu{" "}
            <span className="text-foreground font-medium">nomor HP</span> dan{" "}
            <span className="text-foreground font-medium">nama masjid</span> untuk
            pengiriman dan pengaturan.
          </p>
          <Link
            href="/akun/profil?next=/checkout"
            className="mt-6 w-full inline-flex items-center justify-center rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground h-11 font-semibold text-sm"
          >
            Lengkapi Data Diri
          </Link>
        </div>
      </div>
    );
  }

  if (hydrated && items.length === 0) {
    return (
      <div className="min-h-screen pt-20 bg-background flex items-center justify-center px-4">
        <div className="text-center">
          <p className="text-foreground font-semibold">Keranjang kosong.</p>
          <Link href="/produk" className="mt-4 inline-flex rounded-lg bg-primary text-primary-foreground px-6 h-11 items-center font-semibold text-sm">
            Lihat Paket
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-20 bg-background">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-foreground mb-8">
          Checkout <span className="gradient-text">Pesanan</span>
        </h1>

        <form onSubmit={submitOrder} className="grid lg:grid-cols-[1fr_360px] gap-8 items-start">
          {/* Form pengiriman */}
          <div className="bg-card/50 border border-border rounded-2xl p-6 space-y-4">
            <h2 className="font-bold text-foreground">Alamat Pengiriman</h2>

            <Field label="Nama penerima"><Input required value={form.recipientName} onChange={(e) => set("recipientName", e.target.value)} placeholder="Nama pengurus / penerima" /></Field>
            <Field label="Nomor HP (WA aktif)"><Input required value={form.phone} onChange={(e) => set("phone", e.target.value)} placeholder="08xxxxxxxxxx" /></Field>
            <Field label="Nama masjid / musholla"><Input required value={form.mosqueName} onChange={(e) => set("mosqueName", e.target.value)} placeholder="Masjid ..." /></Field>
            <Field label="Alamat lengkap"><Textarea required value={form.address} onChange={(e) => set("address", e.target.value)} rows={3} placeholder="Alamat jalan, RT/RW, kelurahan" /></Field>
            <div className="grid grid-cols-2 gap-4">
              <Field label="Kota / Kabupaten"><Input required value={form.city} onChange={(e) => set("city", e.target.value)} /></Field>
              <Field label="Provinsi"><Input required value={form.province} onChange={(e) => set("province", e.target.value)} /></Field>
            </div>
            <Field label="Kode pos"><Input value={form.postalCode} onChange={(e) => set("postalCode", e.target.value)} /></Field>
            <Field label="Catatan untuk kurir (opsional)"><Textarea value={form.notes} onChange={(e) => set("notes", e.target.value)} rows={2} /></Field>

            {error && (
              <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
                <Info className="w-4 h-4 mt-0.5" />
                <span>{error}</span>
              </div>
            )}
          </div>

          {/* Ringkasan */}
          <div className="bg-card border border-border rounded-2xl p-6 lg:sticky lg:top-24">
            <h2 className="font-bold text-foreground mb-4">Ringkasan</h2>
            <div className="space-y-2 text-sm">
              {items.map((i) => (
                <div key={i.productId} className="flex justify-between text-muted-foreground">
                  <span className="truncate pr-2">{i.name} × {i.qty}</span>
                  <span className="text-foreground whitespace-nowrap">{formatRupiah(i.price * i.qty)}</span>
                </div>
              ))}
              <div className="flex justify-between pt-3 border-t border-border text-muted-foreground">
                <span>Subtotal</span><span className="text-foreground">{formatRupiah(subtotal)}</span>
              </div>
              <div className="flex justify-between text-muted-foreground">
                <span>Ongkir</span><span className="text-foreground">{formatRupiah(shippingFee)}</span>
              </div>
              <div className="flex justify-between pt-3 border-t border-border text-base font-bold text-foreground">
                <span>Total</span><span>{formatRupiah(subtotal + shippingFee)}</span>
              </div>
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground h-12 font-semibold disabled:opacity-60 glow-primary"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              {submitting ? "Memproses..." : "Bayar Sekarang (Duitku)"}
            </button>
            <p className="text-xs text-muted-foreground mt-3 text-center">
              Pembayaran dibuka di halaman Duitku. Pesanan dibuat jadi{" "}
              <span className="text-foreground font-medium">Menunggu Pembayaran</span>.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="mt-1.5">{children}</div>
    </div>
  );
}