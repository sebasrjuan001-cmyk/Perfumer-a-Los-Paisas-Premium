import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, X, MessageSquare, TrendingUp } from 'lucide-react';

interface LeadMagnetProps {
  isHidden?: boolean;
}

const LeadMagnet: React.FC<LeadMagnetProps> = ({ isHidden }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Floating Trigger — removed from DOM immediately when a product modal is open */}
      {!isHidden && !isOpen && (
        <motion.div 
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 3, duration: 0.8 }}
          className="fixed bottom-24 left-6 z-40"
        >
          <button 
            onClick={() => setIsOpen(true)}
            className="group flex items-center gap-3 bg-[#121212] border border-[#BF953F]/50 p-2 pr-5 rounded-full hover:border-[#BF953F] transition-all shadow-[0_10px_30px_rgba(0,0,0,0.5)] active:scale-95"
          >
            <div className="w-10 h-10 bg-gradient-to-br from-[#BF953F] to-[#8C6D23] rounded-full flex items-center justify-center text-black shadow-lg">
              <FileText size={20} />
            </div>
            <div className="flex flex-col items-start">
               <span className="text-[10px] text-white/90 uppercase tracking-[0.2em] font-bold group-hover:text-[#BF953F] transition-colors">Lista de Precios</span>
               <span className="text-[8px] text-[#BF953F] uppercase tracking-widest font-bold">B2B Mayorista</span>
            </div>
          </button>
        </motion.div>
      )}

      {/* Overlay Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-sm bg-[#0f0f0f] border border-[#BF953F]/30 rounded-[2.5rem] overflow-hidden shadow-2xl"
            >
              {/* Header with Visual Impact */}
              <div className="p-8 pb-4 text-center">
                 <div className="w-16 h-16 bg-[#BF953F]/10 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-[#BF953F]/20">
                    <TrendingUp size={32} className="text-[#BF953F]" />
                 </div>
                 <h3 className="text-2xl font-serif text-white mb-2 tracking-wide uppercase">Precios Mayoristas</h3>
                 <p className="text-white/40 text-[10px] uppercase tracking-[0.2em] mb-8 font-bold">Temporada 2026 • Los Paisas</p>
                 
                 {/* Pricing Grid */}
                 <div className="grid grid-cols-1 gap-3 mb-8">
                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                      <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Unidad</span>
                      <span className="text-white font-serif text-xl">$2.25</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                      <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Docena (12)</span>
                      <span className="text-[#BF953F] font-serif text-xl">$27</span>
                    </div>
                    <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/5">
                      <span className="text-white/60 text-xs font-bold uppercase tracking-widest">Caja (24)</span>
                      <span className="text-[#BF953F] font-serif text-xl">$54</span>
                    </div>
                    <div className="flex justify-between items-center bg-gradient-to-r from-[#BF953F]/20 to-transparent p-4 rounded-2xl border border-[#BF953F]/30 shadow-[0_0_20px_rgba(191,149,63,0.1)]">
                      <div className="flex flex-col items-start">
                         <span className="text-[#BF953F] text-[10px] font-extrabold uppercase tracking-widest">Master Case (48)</span>
                         <span className="text-green-500 text-[8px] uppercase font-bold tracking-widest mt-0.5">Mejor Margen</span>
                      </div>
                      <span className="text-white font-serif text-2xl font-bold">$105</span>
                    </div>
                 </div>

                 <p className="text-[10px] text-white/30 italic leading-relaxed mb-8">
                    * Precios sujetos a negociación según volumen y frecuencia de compra. Somos importadores directos de fábrica.
                 </p>

                 <a 
                    href="https://wa.me/593988755347?text=Hola,%20quisiera%20negociar%20un%20pedido%20de%20perfumes%20al%20por%20mayor.%20Vi%20sus%20precios%20en%20la%20web."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-[#BF953F] to-[#FCF6BA] text-black py-5 rounded-2xl font-bold uppercase tracking-widest text-xs transition-all shadow-[0_10px_30px_rgba(191,149,63,0.2)] hover:shadow-[0_15px_30px_rgba(191,149,63,0.4)] flex items-center justify-center gap-3 active:scale-[0.98]"
                 >
                    <MessageSquare size={16} />
                    Iniciar Negociación
                 </a>

                 <button 
                    onClick={() => setIsOpen(false)}
                    className="mt-6 text-white/20 hover:text-white transition-colors text-[10px] uppercase tracking-widest font-bold"
                 >
                    Cerrar Ventana
                 </button>
              </div>

              {/* Top Close Button */}
              <button 
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 w-10 h-10 bg-white/5 hover:bg-white/10 rounded-full flex items-center justify-center text-white/40 transition-colors"
              >
                <X size={20} />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LeadMagnet;
