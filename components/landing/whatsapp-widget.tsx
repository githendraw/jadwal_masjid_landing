"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

const WHATSAPP_LINK = "https://wa.me/6287774348558?text=Halo%20Jadwal%20Masjid,%20saya%20ingin%20bertanya...";

export function WhatsAppWidget() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.8 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, delay: 1 }}
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-end gap-3"
    >
      {/* Tooltip / Chat Bubble */}
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5, duration: 0.5 }}
        className="hidden sm:block bg-card text-foreground text-sm px-4 py-2 rounded-tl-lg rounded-tr-lg rounded-bl-lg shadow-lg max-w-[160px] pb-0 text-center border border-border"
      >
        Chat via WhatsApp
      </motion.div>

      {/* Button */}
      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        className="relative"
        aria-label="Chat via WhatsApp"
      >
        {/* Pulse ring */}
        <motion.span
          className="absolute inset-0 rounded-full bg-[#25D366]"
          animate={{ scale: [1, 1.6, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
        />
        {/* Button body */}
        <div className="relative bg-[#25D366] text-white w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg flex items-center justify-center hover:bg-[#1ebe5d] transition-colors">
          <MessageCircle className="w-6 h-6 sm:w-7 sm:h-7" />
        </div>
      </motion.a>
    </motion.div>
  );
}
