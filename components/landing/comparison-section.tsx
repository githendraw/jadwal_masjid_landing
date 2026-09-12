"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, Cpu, PlugZap } from "lucide-react";

const comparisons = [
  {
    title: "Android TV Murah (RAM 1–1,5GB)",
    bad: true,
    items: [
      "Lag, panas, dan aplikasi tiba-tiba keluar saat menyala 4–6 jam",
      "Sering kembali ke menu Home setelah mati lampu — harus setting ulang",
      "Jika board TV rusak karena panas, seluruh TV mati total",
      "Klaim garansi bisa ditolak karena aplikasi pihak ketiga",
    ],
  },
  {
    title: "TV Box Jadwal Masjid (RAM 2GB)",
    bad: false,
    items: [
      "Stabil 24 jam nonstop, cocok untuk display masjid",
      "Auto-boot langsung ke tampilan jadwal begitu listrik menyala",
      "Jika TV Box bermasalah, cukup ganti box kecilnya — TV tetap aman",
      "Garansi resmi TV & TV Box terpisah, tanpa saling mengganggu",
    ],
  },
];

export function ComparisonSection() {
  return (
    <section id="kenapa-tvbox" className="bg-muted/30 py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <Cpu className="w-4 h-4" />
            Kenapa Harus TV Box?
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Jangan Asal Pakai{" "}
            <span className="gradient-text">Android TV Murah</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Display masjid menyala 12–16 jam sehari. TV Android murah tidak dirancang
            untuk itu — inilah mengapa kami memakai TV Box eksternal bertenaga.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {comparisons.map((col, index) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`rounded-2xl p-8 border flex flex-col ${
                col.bad
                  ? "bg-destructive/5 border-destructive/20"
                  : "bg-primary/5 border-primary/25 shadow-xl shadow-primary/5"
              }`}
            >
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`p-3 rounded-lg ${
                    col.bad ? "bg-destructive/10" : "bg-primary/15"
                  }`}
                >
                  <PlugZap className={`w-5 h-5 ${col.bad ? "text-destructive/80" : "text-primary"}`} />
                </div>
                <h3 className="text-lg font-bold text-foreground">{col.title}</h3>
              </div>

              <ul className="space-y-3.5">
                {col.items.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    {col.bad ? (
                      <XCircle className="w-4 h-4 text-destructive/70 flex-shrink-0 mt-0.5" />
                    ) : (
                      <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                    )}
                    <span className="text-sm text-foreground/80 leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>

              {!col.bad && (
                <div className="mt-auto pt-6">
                  <div className="flex items-center gap-2 text-sm text-primary font-medium">
                    <CheckCircle2 className="w-4 h-4" />
                    Standar di semua paket Jadwal Masjid
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}