"use client";

import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const WHATSAPP_LINK = "https://wa.me/6287774348558?text=Halo%20Jadwal%20Masjid,%20saya%20ingin%20bertanya...";

const faqs = [
  {
    question: "Apakah berbayar?",
    answer:
      "Bukan gratis. Bayar sekali, pakai selamanya. Tanpa biaya bulanan atau tersembunyi.",
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

export function FAQSection() {
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
            <span className="text-emerald-400">Umum</span>
          </h2>
          <p className="text-slate-400">
            Ada pertanyaan lain?{" "}
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
            >
              Hubungi kami via WhatsApp
            </a>
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