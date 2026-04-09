import React from "react";
import { motion } from "framer-motion";

const WhatsAppIcon: React.FC = () => {
  return (
    <motion.a
      href="https://wa.me/919030609700"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 rounded-full shadow-lg  transition-all duration-300 group"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* PNG Icon */}
      <img
        src="/images/wa.png"
        alt="WhatsApp"
        className="w-12 h-12 sm:w-14 sm:h-14 object-contain"
        draggable={false}
      />

      {/* Pulse effect */}
      <span className="absolute inset-0 rounded-full bg-[#25D366]/30 animate-ping" />

      {/* Tooltip */}
      <span className="absolute right-full mr-3 hidden sm:block bg-white text-black text-xs sm:text-sm px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none font-medium">
        Chat with us
      </span>
    </motion.a>
  );
};

export default WhatsAppIcon;
