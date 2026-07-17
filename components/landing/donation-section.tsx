"use client";

import { motion } from "framer-motion";
import { Heart, DollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";

const DONATION_LINKS = {
  trakteer: "https://trakteer.id/jadwalmasjid",
  };

export function DonationSection() {
  return (
    <section id="dukung-kami" className="relative bg-background py-24 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-400/5 via-transparent to-transparent" />

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-amber-400/10 border border-amber-400/30 rounded-full px-4 py-1.5 mb-6">
            <Heart className="w-4 h-4 text-amber-400" />
            <span className="text-amber-400 text-sm font-medium">Dukung Project Amal</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Dukung{" "}
            <span className="gradient-text">Jadwal Masjid</span> 🙏
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto mb-4">
            Jadwal Masjid adalah project amal yang <strong>100% gratis</strong> untuk semua masjid.
            Bantuan kamu sangat berarti untuk biaya server dan pengembangan.
          </p>
          <p className="text-muted-foreground/70 text-sm max-w-2xl mx-auto">
            Tidak ada minimum — berapapun, kami bersyukur. Semoga menjadi amal jariyah untuk kita semua. 🤲
          </p>
        </motion.div>

        <div className="max-w-md mx-auto">
          {/* Donasi Online */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-card/50 border border-border rounded-xl p-8 card-hover"
          >
            <div className="w-14 h-14 bg-amber-400/10 rounded-xl flex items-center justify-center mb-5">
              <DollarSign className="w-7 h-7 text-amber-400" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-3">Donasi Online</h3>
            <p className="text-muted-foreground text-sm mb-6">
              Klik link di bawah untuk donasi via platform online.
            </p>
            <div className="space-y-3">
              <a
                href={DONATION_LINKS.trakteer}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full"
              >
                <Button
                  variant="outline"
                  className="w-full border-amber-400/30 text-amber-400 hover:bg-amber-400/10 justify-between"
                >
                  <span>Trakteer</span>
                  <span className="text-xs opacity-70">→</span>
                </Button>
              </a>
            </div>
          </motion.div>
        </div>

        {/* Penutup */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground italic text-sm">
            "Barangsiapa yang menunjuki kepada kebaikan, maka dia mendapatkan pahala seperti pahala orang yang mengerjakannya." (HR. Muslim) 🤲
          </p>
        </motion.div>
      </div>
    </section>
  );
}
