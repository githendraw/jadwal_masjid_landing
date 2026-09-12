"use client";

import { useCallback, useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Loader2, Star } from "lucide-react";
import { formatRupiah } from "@/lib/format";
import { AdminNav } from "@/components/store/admin-nav";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

interface Product {
  id: number;
  slug: string;
  name: string;
  subtitle: string | null;
  price: number;
  originalPrice: number | null;
  badge: string | null;
  isFeatured: boolean;
  isActive: boolean;
  stock: number;
  weightGrams: number;
  shippingFee: number;
  imageKey: string | null;
}

interface FormState {
  name: string;
  subtitle: string;
  price: string;
  originalPrice: string;
  shippingFee: string;
  stock: string;
  weightGrams: string;
  badge: string;
  imageKey: string;
  isFeatured: boolean;
  isActive: boolean;
}

const emptyForm: FormState = {
  name: "",
  subtitle: "",
  price: "",
  originalPrice: "",
  shippingFee: "0",
  stock: "0",
  weightGrams: "1000",
  badge: "",
  imageKey: "",
  isFeatured: false,
  isActive: true,
};

export default function AdminProdukPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null>(null);
  const [creating, setCreating] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState<FormState>(emptyForm);

  const load = useCallback(() => {
    return fetch("/api/admin/products")
      .then((r) => r.json())
      .then((d) => {
        if (d.error) throw new Error(d.error);
        setProducts(d.products);
      })
      .catch((e) => setError(e.message));
  }, []);

  useEffect(() => {
    load().finally(() => setLoading(false));
  }, [load]);

  function openNew() {
    setEditing(null);
    setForm(emptyForm);
    setCreating(true);
    setError("");
  }

  function openEdit(p: Product) {
    setEditing(p);
    setForm({
      name: p.name,
      subtitle: p.subtitle || "",
      price: String(p.price),
      originalPrice: p.originalPrice != null ? String(p.originalPrice) : "",
      shippingFee: String(p.shippingFee),
      stock: String(p.stock),
      weightGrams: String(p.weightGrams),
      badge: p.badge || "",
      imageKey: p.imageKey || "",
      isFeatured: p.isFeatured,
      isActive: p.isActive,
    });
    setCreating(true);
    setError("");
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    const body: any = {
      name: form.name,
      subtitle: form.subtitle,
      price: Number(form.price) || 0,
      originalPrice: form.originalPrice ? Number(form.originalPrice) : null,
      shippingFee: Number(form.shippingFee) || 0,
      stock: Number(form.stock) || 0,
      weightGrams: Number(form.weightGrams) || 1000,
      badge: form.badge,
      imageKey: form.imageKey,
      isFeatured: form.isFeatured,
      isActive: form.isActive,
    };
    try {
      const res = await fetch(
        editing ? `/api/admin/products/${editing.id}` : "/api/admin/products",
        {
          method: editing ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );
      const data = await res.json();
      if (!res.ok) {
        const fe = (data?.details as any)?.fieldErrors;
        const first = fe ? (Object.values(fe)[0] as any)?.[0] : null;
        setError(first || data.error || "Gagal menyimpan");
        setBusy(false);
        return;
      }
      setCreating(false);
      await load();
    } catch (er) {
      setError(String(er));
    }
    setBusy(false);
  }

  async function toggle(field: "isActive" | "isFeatured", p: Product) {
    const res = await fetch(`/api/admin/products/${p.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ [field]: !p[field] }),
    });
    if (res.ok) await load();
  }

  async function remove(p: Product) {
    if (!confirm(`Hapus produk "${p.name}"?`)) return;
    const res = await fetch(`/api/admin/products/${p.id}`, { method: "DELETE" });
    const data = await res.json();
    if (res.ok) {
      await load();
    } else {
      alert(data.error || "Gagal menghapus");
    }
  }

  function set<k extends keyof FormState>(k: k, v: any) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-20 bg-background">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Kelola Produk</h1>
            <p className="text-sm text-muted-foreground mt-1">Tambah atau ubah paket yang dijual.</p>
          </div>
          <button
            onClick={openNew}
            className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 px-4 h-10 font-medium text-sm"
          >
            <Plus className="w-4 h-4" /> Produk Baru
          </button>
        </div>
        <AdminNav />

        {creating && (
          <div className="mb-6 bg-card/50 border border-border rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-foreground">
                {editing ? `Edit: ${editing.name}` : "Produk Baru"}
              </h2>
              <button onClick={() => setCreating(false)} className="text-muted-foreground hover:text-foreground">
                <X className="w-5 h-5" />
              </button>
            </div>
            <ProductForm form={form} set={set} onSubmit={save} busy={busy} error={error} />
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-16"><Loader2 className="w-7 h-7 text-primary animate-spin" /></div>
        ) : (
          <div className="space-y-2">
            {products.map((p) => (
              <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 bg-card/50 border border-border rounded-xl px-5 py-3.5">
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground truncate">{p.name}</p>
                    {p.badge && (
                      <span className="bg-primary/10 text-primary border border-primary/30 rounded-full px-2 py-0.5 text-[11px] font-semibold">{p.badge}</span>
                    )}
                    {p.isFeatured && <Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
                  </div>
                  <p className="text-xs text-muted-foreground truncate">
                    {formatRupiah(p.price)}
                    {p.originalPrice ? ` · coret ${formatRupiah(p.originalPrice)}` : ""} · stok {p.stock} · {p.slug}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => toggle("isActive", p)}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${p.isActive ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-600"}`}
                  >
                    {p.isActive ? "Aktif" : "Nonaktif"}
                  </button>
                  <button
                    onClick={() => toggle("isFeatured", p)}
                    className={`rounded-full px-3 py-1 text-xs font-medium ${p.isFeatured ? "bg-amber-100 text-amber-700" : "bg-slate-200 text-slate-600"}`}
                  >
                    {p.isFeatured ? "Featured" : "Biasa"}
                  </button>
                  <button onClick={() => openEdit(p)} className="p-2 text-muted-foreground hover:text-primary" aria-label="Edit">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => remove(p)} className="p-2 text-muted-foreground hover:text-red-500" aria-label="Hapus">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
            {products.length === 0 && <p className="text-muted-foreground text-sm py-8">Belum ada produk.</p>}
          </div>
        )}
      </div>
    </div>
  );
}

function ProductForm({
  form,
  set,
  onSubmit,
  busy,
  error,
}: {
  form: FormState;
  set: (k: keyof FormState, v: any) => void;
  onSubmit: (e: React.FormEvent) => void;
  busy: boolean;
  error: string;
}) {
  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <Field label="Nama produk *"><Input required value={form.name} onChange={(e) => set("name", e.target.value)} /></Field>
        <Field label="Subjudul"><Input value={form.subtitle} onChange={(e) => set("subtitle", e.target.value)} /></Field>
        <Field label="Harga (Rp) *"><Input required type="number" min={0} value={form.price} onChange={(e) => set("price", e.target.value)} /></Field>
        <Field label="Harga coret (Rp)"><Input type="number" min={0} value={form.originalPrice} onChange={(e) => set("originalPrice", e.target.value)} placeholder="kosongkan jika tidak promo" /></Field>
        <Field label="Ongkir (Rp)"><Input type="number" min={0} value={form.shippingFee} onChange={(e) => set("shippingFee", e.target.value)} /></Field>
        <Field label="Stok"><Input type="number" min={0} value={form.stock} onChange={(e) => set("stock", e.target.value)} /></Field>
        <Field label="Berat (gram)"><Input type="number" min={0} value={form.weightGrams} onChange={(e) => set("weightGrams", e.target.value)} /></Field>
        <Field label="Badge (contoh: Terlaris)"><Input value={form.badge} onChange={(e) => set("badge", e.target.value)} /></Field>
        <div className="sm:col-span-2">
          <Field label="Gambar (nama file di /public, contoh: tv1.webp, hero.webp)"><Input value={form.imageKey} onChange={(e) => set("imageKey", e.target.value)} placeholder="kosong = placeholder icon" /></Field>
        </div>
      </div>
      <div className="flex gap-6">
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="checkbox" checked={form.isFeatured} onChange={(e) => set("isFeatured", e.target.checked)} />
          Paket Unggulan (featured)
        </label>
        <label className="flex items-center gap-2 text-sm text-foreground">
          <input type="checkbox" checked={form.isActive} onChange={(e) => set("isActive", e.target.checked)} />
          Aktif (dijual)
        </label>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={busy}
        className="inline-flex items-center gap-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 px-5 h-10 font-semibold text-sm disabled:opacity-60"
      >
        {busy && <Loader2 className="w-4 h-4 animate-spin" />}
        Simpan
      </button>
    </form>
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