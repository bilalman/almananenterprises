import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { WhatsAppIcon, WHATSAPP_LINK } from './WhatsAppButton';
import { X, MessageCircle } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50 flex items-end flex-col gap-2 pointer-events-none">
      {/* Optional Help Bubble */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="pointer-events-auto bg-white text-slate-800 rounded-xl shadow-xl border border-slate-200 p-3 max-w-[240px] text-xs space-y-1 relative"
          >
            <button
              onClick={() => setShowTooltip(false)}
              className="absolute -top-2 -right-2 w-5 h-5 bg-slate-100 hover:bg-slate-200 border border-slate-300 rounded-full flex items-center justify-center text-slate-500 cursor-pointer"
              aria-label="Dismiss message"
            >
              <X className="w-3 h-3" />
            </button>
            <div className="flex items-center gap-1.5 font-bold text-[#128C7E]">
              <MessageCircle className="w-3.5 h-3.5 text-[#25D366]" />
              <span>Need Quick Assistance?</span>
            </div>
            <p className="text-[11px] text-slate-600 leading-snug">
              Chat directly with our overseas recruitment desk on WhatsApp for instant assistance.
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating WhatsApp Action Button */}
      <motion.a
        href={WHATSAPP_LINK}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        className="pointer-events-auto group relative flex items-center gap-2.5 px-4 py-3 bg-[#25D366] hover:bg-[#20BD5A] text-white rounded-full shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer"
        aria-label="Chat with Al-Mannan Enterprises on WhatsApp"
      >
        {/* Pulse Ring */}
        <span className="absolute -inset-1 rounded-full bg-[#25D366] opacity-35 animate-ping group-hover:opacity-60" />
        
        <div className="relative w-7 h-7 flex items-center justify-center">
          <WhatsAppIcon className="w-7 h-7 text-white drop-shadow-xs" />
        </div>

        <div className="relative hidden sm:flex items-center">
          <span className="text-sm font-bold tracking-wide leading-none text-white">WhatsApp</span>
        </div>
      </motion.a>
    </div>
  );
};
