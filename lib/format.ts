export function formatRupiah(value: number): string {
  const n = Math.round(value);
  return `Rp ${n.toLocaleString("id-ID")}`;
}

export function generateOrderNumber(): string {
  const d = new Date();
  const ymd = `${d.getFullYear()}${String(d.getMonth() + 1).padStart(2, "0")}${String(
    d.getDate()
  ).padStart(2, "0")}`;
  const rand = Math.floor(100000 + Math.random() * 900000);
  return `JM-${ymd}-${rand}`;
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[^a-z0-9\u00e0-\u00ff]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-");
}

/** Milestone label & warna status pesanan, Bahasa Indonesia. */
export const ORDER_STATUS_META: Record<
  string,
  { label: string; color: string; dot: string }
> = {
  PENDING_PAYMENT: {
    label: "Menunggu Pembayaran",
    color: "text-amber-600 bg-amber-100",
    dot: "bg-amber-500",
  },
  PAID: {
    label: "Pembayaran Diterima",
    color: "text-emerald-700 bg-emerald-100",
    dot: "bg-emerald-500",
  },
  PROCESSING: {
    label: "Sedang Diproses",
    color: "text-sky-700 bg-sky-100",
    dot: "bg-sky-500",
  },
  SHIPPED: {
    label: "Dikirim",
    color: "text-indigo-700 bg-indigo-100",
    dot: "bg-indigo-500",
  },
  COMPLETED: {
    label: "Selesai",
    color: "text-green-700 bg-green-100",
    dot: "bg-green-500",
  },
  CANCELLED: {
    label: "Dibatalkan",
    color: "text-red-700 bg-red-100",
    dot: "bg-red-500",
  },
  EXPIRED: {
    label: "Kadaluarsa",
    color: "text-slate-600 bg-slate-200",
    dot: "bg-slate-400",
  },
};

export function statusLabel(status: string): string {
  return ORDER_STATUS_META[status]?.label ?? status;
}