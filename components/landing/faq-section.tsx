"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Apakah gratis untuk masjid?",
    answer:
      "Ya, aplikasi dasar sepenuhnya gratis untuk semua masjid. Kamu bisa download APK dan install tanpa bayar sepeserpun.",
  },
  {
    question: "Bagaimana cara konek ke TV?",
    answer:
      "Buka aplikasi di HP, pilih menu TV, akan muncul QR code di layar TV. Scan QR tersebut dengan HP, maka TV langsung terhubung.",
  },
  {
    question: "Apakah harus online terus?",
    answer:
      "Tidak. Setelah sinkron pertama, aplikasi menyimpan jadwal 30 hari ke depan. Internet mati pun tetap jalan.",
  },
  {
    question: "Metode perhitungan apa saja yang tersedia?",
    answer:
      "Kami menyediakan metode resmi: Kemenag RI, Ministry of Awqaf Kuwait (MWL), Egypt, dan custom untuk ahli falak.",
  },
  {
    question: "Berapa banyak TV yang bisa dikonek?",
    answer:
      "Satu HP bisa mengelola hingga 10 TV secara bersamaan. Semua akan tampil sama persis.",
  },
  {
    question: "Apakah ada versi web?",
    answer:
      "Saat ini baru tersedia untuk Android. Versi web dan iOS sedang dalam pengembangan.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="bg-[#0A192F] py-24">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Pertanyaan{" "}
            <span className="text-amber-400">Umum</span>
          </h2>
          <p className="text-slate-400">
            Ada pertanyaan lain? Hubungi kami via WhatsApp
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Accordion className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="bg-slate-800/50 border-slate-700 rounded-lg px-6"
              >
                <AccordionTrigger className="hover:no-underline text-left">
                  <span className="text-white font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-slate-400 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
