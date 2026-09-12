import Link from "next/link";
import { redirect } from "next/navigation";
import { FlaskConical, Info } from "lucide-react";
import { getSession } from "@/lib/session";
import { googleAuthEnabled } from "@/lib/auth";

export const metadata = { title: "Masuk - Jadwal Masjid" };

export default async function MasukPage() {
  const session = await getSession();
  if (session) redirect("/akun");

  const googleEnabled = googleAuthEnabled();

  return (
    <div className="min-h-screen pt-20 sm:pt-24 pb-20 bg-background flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-card/50 border border-border rounded-3xl p-8 text-center shadow-xl shadow-primary/5">
          <h1 className="text-2xl font-bold text-foreground">
            Masuk ke <span className="gradient-text">Jadwal Masjid</span>
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Masuk untuk melacak pesanan, memeriksa status pembayaran, dan berwakaf
            paket TV masjid.
          </p>

          <div className="mt-8 space-y-3">
            <a
              href="/api/auth/google/start"
              className="w-full inline-flex items-center justify-center gap-3 rounded-xl border border-border bg-background hover:bg-muted transition-colors h-12 font-medium text-foreground"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.27-4.74 3.27-8.1z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84A11 11 0 0 0 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.1a6.6 6.6 0 0 1 0-4.2V7.06H2.18a11 11 0 0 0 0 9.88l3.66-2.84z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15A11 11 0 0 0 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              Masuk dengan Google
            </a>

            {!googleEnabled && (
              <>
                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <div className="h-px flex-1 bg-border" />
                  ATAU
                  <div className="h-px flex-1 bg-border" />
                </div>
                <a
                  href="/api/auth/dummy"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl border border-dashed border-primary/40 text-primary hover:bg-primary/10 transition-colors h-12 font-medium text-sm"
                >
                  <FlaskConical className="w-4 h-4" />
                  Login Simulasi (Mode Pengembangan)
                </a>
              </>
            )}
          </div>

          {!googleEnabled && (
            <div className="mt-6 rounded-xl border border-amber-200 bg-amber-50 p-3 text-left flex gap-2 text-xs text-amber-700">
              <Info className="w-4 h-4 flex-shrink-0 mt-0.5" />
              <p>
                Kredensial Google OAuth masih placeholder (dummy). Tombol
                &ldquo;Login Simulasi&rdquo; dipakai untuk menguji alur wakaf
                dulu. Simulasi ini nonaktif otomatis saat kredensial asli diisi.
              </p>
            </div>
          )}

          <p className="text-xs text-muted-foreground mt-6">
            Setelah masuk, kamu akan diminta melengkapi{" "}
            <span className="text-foreground font-medium">nomor HP</span> dan{" "}
            <span className="text-foreground font-medium">nama masjid</span>.
          </p>
        </div>

        <p className="text-center text-xs text-muted-foreground mt-6">
          <Link href="/produk" className="hover:text-primary transition-colors">
            ← Kembali Belanja
          </Link>
        </p>
      </div>
    </div>
  );
}