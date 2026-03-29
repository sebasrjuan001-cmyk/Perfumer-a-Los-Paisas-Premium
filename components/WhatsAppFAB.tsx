import React from 'react';
import { MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

interface WhatsAppFABProps {
  isHidden?: boolean;
}

const WhatsAppFAB: React.FC<WhatsAppFABProps> = ({ isHidden }) => {
  // Immediately remove from DOM when a product modal is open — no animation, no z-index battle
  if (isHidden) return null;

  const phoneNumber = "593988755347";
  const message = encodeURIComponent("Hola equipo de Los Paisas. Visité su página web y me interesa recibir asesoría sobre sus políticas de distribución y catálogo completo.");
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      {/* Tooltip */}
      <motion.div 
        initial={{ opacity: 0, y: 10, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="px-3 py-1.5 bg-[#BF953F] text-black text-[10px] font-bold tracking-widest uppercase rounded-lg shadow-lg relative ml-auto hidden md:block"
      >
        Asesoría Mayorista
        <div className="absolute top-full right-4 -mb-1 border-4 border-transparent border-t-[#BF953F]"></div>
      </motion.div>

      {/* Button */}
      <motion.a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 bg-[#25D366] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(37,211,102,0.4)] hover:shadow-[0_0_30px_rgba(37,211,102,0.6)] transition-shadow text-white overflow-hidden relative"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none"></div>
        <MessageCircle size={32} className="relative z-10" fill="white" />
        <span className="absolute w-full h-full rounded-full bg-[#25D366] opacity-30 animate-ping"></span>
      </motion.a>
    </div>
  );
};

export default WhatsAppFAB;
