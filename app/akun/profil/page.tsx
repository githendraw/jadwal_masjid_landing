"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, Save, Info, BadgeCheck } from "lucide-react";
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
}

export default function ProfilPage() {
  return (
    <Suspense fallback={<PageShell loading />}>
      <ProfilInner />
    </Suspense>
  );
}

function ProfilInner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/akun";

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const [form, setForm] = useState({
    phone: "",
    mosqueName: "",
    mosqueAddress: "",
    city: "",
    province: "",
    postalCode: "",
  });

  useEffect(() => {
    fetch("/api/auth/me")
      .then((r) => r.json())
      .then((d) => {
        const u = d.user as MeUser;
        if (u) {
          setForm({
            phone: u.phone || "",
            mosqueName: u.mosqueName || "",
            mosqueAddress: u.mosqueAddress || "",
            city: u.city || "",
            province: u.province || "",
            postalCode: u.postalCode || "",
          });
        }
      })
      .finally(() => setLoading(false));
  }, []);

  function set<k extends keyof typeof form>(k: k, v: string) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const res = await fetch("/api/account", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        const fe = (data?.details as any)?.fieldErrors;
        const first = fe ? (Object.values(fe)[0] as any)?.[0] : null;
        setError(first || data.error || "Gagal menyimpan");
        setSaving(false);
        return;
      }
      setSaved(true);
      window.setTimeout(() => router.push(next), 900);
    } catch {
      setError("Terjadi kesalahan. Coba lagi.");
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <PageShell loading />
    );
  }

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-20 bg-background">
      <div className="max-w-2xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl font-bold text-foreground mb-2">
          Data Diri &amp; <span className="gradient-text">Nama Masjid</span>
        </h1>
        <p className="text-sm text-muted-foreground mb-8">
          Data ini dipakai untuk pengiriman paket dan pengaturan nama masjid di
          perangkat.
        </p>

        <form onSubmit={save} className="bg-card/50 border border-border rounded-2xl p-6 space-y-4">
          <Field label="Nomor HP (WA aktif) *">
            <Input
              required
              value={form.phone}
              onChange={(e) => set("phone", e.target.value)}
              placeholder="08xxxxxxxxxx"
            />
          </Field>
          <Field label="Nama masjid / musholla *">
            <Input
              required
              value={form.mosqueName}
              onChange={(e) => set("mosqueName", e.target.value)}
              placeholder="Masjid ..."
            />
          </Field>
          <Field label="Alamat masjid">
            <Textarea value={form.mosqueAddress} onChange={(e) => set("mosqueAddress", e.target.value)} rows={2} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Kota / Kabupaten">
              <Input value={form.city} onChange={(e) => set("city", e.target.value)} />
            </Field>
            <Field label="Provinsi">
              <Input value={form.province} onChange={(e) => set("province", e.target.value)} />
            </Field>
          </div>
          <Field label="Kode pos">
            <Input value={form.postalCode} onChange={(e) => set("postalCode", e.target.value)} />
          </Field>

          {error && (
            <div className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              <Info className="w-4 h-4 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
          {saved && (
            <div className="flex items-center gap-2 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
              <BadgeCheck className="w-4 h-4" />
              Data berhasil disimpan. Mengalihkan...
            </div>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground h-12 font-semibold disabled:opacity-60 glow-primary"
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
            Simpan Data
          </button>

          <p className="text-xs text-muted-foreground">
            * Wajib diisi. Nomor HP dan nama masjid digunakan untuk konfirmasi &
            pengiriman.
          </p>
        </form>
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

function PageShell({ loading = false }: { loading?: boolean }) {
  return (
    <div className="min-h-screen pt-20 bg-background flex items-center justify-center">
      {loading && <Loader2 className="w-8 h-8 text-primary animate-spin" />}
    </div>
  );
}