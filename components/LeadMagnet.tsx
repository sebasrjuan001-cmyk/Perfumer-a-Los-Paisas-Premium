import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FileText, X, Download, MessageSquare } from 'lucide-react';

const LeadMagnet: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'offer' | 'form' | 'success'>('offer');
  const [formData, setFormData] = useState({ name: '', phone: '' });

  const handleDownload = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to a backend or Google Sheet
    setStep('success');
    // Simulate download
    setTimeout(() => {
        setStep('offer');
        setIsOpen(false);
    }, 5000);
  };

  return (
    <>
      {/* Mini Floating Trigger (Bottom Left) */}
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 5, duration: 0.8 }}
        className="fixed bottom-6 left-6 z-40 hidden md:block"
      >
        {!isOpen && (
          <button 
            onClick={() => { setIsOpen(true); setStep('offer'); }}
            className="group flex items-center gap-3 bg-[#121212] border border-[#BF953F]/30 p-2 pr-4 rounded-full hover:border-[#BF953F] transition-all shadow-xl"
          >
            <div className="w-10 h-10 bg-[#BF953F] rounded-full flex items-center justify-center text-black shadow-lg">
              <FileText size={20} />
            </div>
            <span className="text-[10px] text-white/50 uppercase tracking-[0.2em] font-bold group-hover:text-white transition-colors">Lista de Precios 2026</span>
          </button>
        )}
      </motion.div>

      {/* Overlay Modal */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-6 sm:p-0">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md bg-[#0f0f0f] border border-[#BF953F]/20 rounded-3xl overflow-hidden shadow-2xl"
            >
              {/* Decorative Header */}
              <div className="h-32 bg-gradient-to-br from-[#BF953F] via-[#FCF6BA] to-[#BF953F] flex items-center justify-center relative">
                <FileText size={60} className="text-black/20 absolute -bottom-4 -right-4 rotate-12" />
                <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center shadow-2xl">
                   <Download size={40} className="text-[#BF953F]" />
                </div>
                <button 
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 w-8 h-8 bg-black/20 hover:bg-black/40 rounded-full flex items-center justify-center text-black transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-8">
                {step === 'offer' && (
                  <div className="text-center">
                    <h3 className="text-2xl font-serif text-white mb-4">Lista de Precios Mayorista</h3>
                    <div className="grid grid-cols-2 gap-4 mb-8 text-left">
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <p className="text-[#BF953F] text-[10px] uppercase font-bold tracking-widest">Unidad</p>
                        <p className="text-white text-xl font-serif">$2.25 <span className="text-[10px] text-white/30 italic">negociable</span></p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <p className="text-[#BF953F] text-[10px] uppercase font-bold tracking-widest">Docena (12)</p>
                        <p className="text-white text-xl font-serif">$27</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                        <p className="text-[#BF953F] text-[10px] uppercase font-bold tracking-widest">Caja (24)</p>
                        <p className="text-white text-xl font-serif">$54</p>
                      </div>
                      <div className="bg-white/5 p-3 rounded-xl border border-[#BF953F]/30 shadow-[0_0_15px_rgba(191,149,63,0.1)]">
                        <p className="text-[#BF953F] text-[10px] uppercase font-bold tracking-widest">Master (48)</p>
                        <p className="text-white text-xl font-serif">$105 <span className="text-[10px] text-green-500 uppercase font-bold">Ahorro</span></p>
                      </div>
                    </div>
                    <p className="text-white/50 text-xs mb-8 leading-relaxed">
                      Somo importadores directos. Los precios son negociables según volumen de compra recurrente.
                    </p>
                    <div className="flex flex-col gap-3">
                      <button 
                        onClick={() => setStep('form')}
                        className="w-full bg-[#BF953F] hover:bg-[#D4A373] text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all shadow-[0_0_20px_rgba(191,149,63,0.3)]"
                      >
                        Descargar Catálogo Completo
                      </button>
                      <a 
                        href="https://wa.me/593981046714?text=Hola,%20quisiera%20negociar%20un%20pedido%20de%20perfumes%20al%20por%20mayor."
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full border border-[#BF953F]/30 hover:bg-[#BF953F]/10 text-[#BF953F] py-4 rounded-xl font-bold uppercase tracking-widest text-xs transition-all flex items-center justify-center gap-2"
                      >
                        <MessageSquare size={16} />
                        Negociar ahora
                      </a>
                    </div>
                  </div>
                )}

                {step === 'form' && (
                  <form onSubmit={handleDownload} className="flex flex-col gap-4">
                    <div className="text-center mb-4">
                       <h3 className="text-xl font-serif text-white mb-2">Casi listo...</h3>
                       <p className="text-white/40 text-xs">Completa tus datos para enviarte el enlace de descarga.</p>
                    </div>
                    
                    <div className="space-y-4">
                       <div>
                         <label className="text-[10px] text-[#BF953F] uppercase tracking-widest font-bold mb-1.5 block">Nombre Completo</label>
                         <input 
                           required 
                           type="text" 
                           placeholder="Ej: Juan Pérez"
                           className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#BF953F] outline-none transition-colors"
                           onChange={(e) => setFormData({...formData, name: e.target.value})}
                         />
                       </div>
                       <div>
                         <label className="text-[10px] text-[#BF953F] uppercase tracking-widest font-bold mb-1.5 block">WhatsApp / Teléfono</label>
                         <input 
                           required 
                           type="tel" 
                           placeholder="+593 999 999 999"
                           className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-[#BF953F] outline-none transition-colors"
                           onChange={(e) => setFormData({...formData, phone: e.target.value})}
                         />
                       </div>
                    </div>

                    <p className="text-[10px] text-white/20 text-center italic mt-2">
                       * Al descargar, aceptas recibir nuestras promociones exclusivas.
                    </p>

                    <button 
                      type="submit"
                      className="w-full bg-[#BF953F] hover:bg-[#D4A373] text-black py-4 rounded-xl font-bold uppercase tracking-widest text-xs mt-4 transition-all"
                    >
                      Obtener Lista de Precios
                    </button>
                  </form>
                )}

                {step === 'success' && (
                  <div className="text-center py-4">
                    <div className="w-16 h-16 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                       <Download size={32} />
                    </div>
                    <h3 className="text-2xl font-serif text-white mb-3">¡Descarga Iniciada!</h3>
                    <p className="text-white/50 text-sm mb-6 leading-relaxed">
                       Gracias {formData.name}, el archivo se está descargando. También te hemos enviado una copia por WhatsApp.
                    </p>
                    <div className="flex justify-center gap-4">
                       <button 
                         onClick={() => setIsOpen(false)}
                         className="px-6 py-2 rounded-full border border-white/10 text-white/40 text-[10px] uppercase tracking-widest hover:text-white transition-colors"
                       >
                         Cerrar
                       </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LeadMagnet;
