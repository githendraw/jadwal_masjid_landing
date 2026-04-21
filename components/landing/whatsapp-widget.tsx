"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/6281234567890?text=Halo%20Waktu%20Sholat";

export function WhatsAppWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed bottom-6 right-6 z-50 flex items-end gap-3"
    >
      {/* Tooltip / Chat Bubble */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="bg-white text-slate-800 text-sm px-4 py-2 rounded-tr-lg rounded-tl-lg rounded-br-lg shadow-lg max-w-[160px] pb-0"
      >
        <p className="font-medium">Chat via WhatsApp</p>
      </motion.div>

      {/* Button */}
      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
      >
        {/* Pulse ring */}
        <motion.span
          className="absolute inset-0 rounded-full bg-emerald-400"
          animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
        />
        {/* Button body */}
        <div className="relative bg-[#25D366] text-white w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-[#1ebe5d] transition-colors">
          <MessageCircle className="w-7 h-7" />
        </div>
      </motion.a>
    </motion.div>
  );
}
