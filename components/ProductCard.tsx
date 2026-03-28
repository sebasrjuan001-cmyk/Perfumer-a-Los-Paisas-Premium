import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Info, Zap, Clock, Shield, Star, ShieldCheck } from 'lucide-react';
import { Product } from '../types';
import { getNoteConfig } from '../constants';

interface ProductCardProps {
  product: Product;
  index: number;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, index }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // WhatsApp Message Logic
  const phoneNumber = "593981046714";
  const message = encodeURIComponent(`Hola, estoy en el catálogo web y deseo cotizar al por mayor el perfume: *${product.name}*. Mi nombre es...`);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  const defaultPerformance = {
    versatility: 4,
    professional: 3,
    nocturnal: 3,
    longevity: 4,
    sillage: 3
  };

  const performance = product.performance || defaultPerformance;

  const ScoreBar = ({ label, score, icon: Icon }: { label: string, score: number, icon: any }) => (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-lg bg-[#BF953F]/10 flex items-center justify-center border border-[#BF953F]/20">
            <Icon size={12} className="text-[#BF953F]" />
          </div>
          <span className="text-[10px] text-white/70 uppercase tracking-widest font-extrabold">{label}</span>
        </div>
        <span className="text-[10px] text-[#BF953F] font-mono font-bold tracking-tighter bg-[#BF953F]/10 px-2 py-0.5 rounded border border-[#BF953F]/20 shadow-[0_0_10px_rgba(191,149,63,0.1)]">{score}/5</span>
      </div>
      <div className="h-2.5 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
        {/* Background Notches for Clarity */}
        <div className="absolute inset-0 flex justify-between px-[20%] pointer-events-none opacity-20">
           <div className="w-[1px] h-full bg-white/20"></div>
           <div className="w-[1px] h-full bg-white/20"></div>
           <div className="w-[1px] h-full bg-white/20"></div>
           <div className="w-[1px] h-full bg-white/20"></div>
        </div>
        
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${(score / 5) * 100}%` }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
          className="h-full bg-gradient-to-r from-[#8C6D23] via-[#BF953F] to-[#FCF6BA] shadow-[0_0_20px_rgba(191,149,63,0.6)] relative z-10 rounded-full" 
        />
      </div>
    </div>
  );

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{ y: -10, scale: 1.015 }}
        transition={{ 
          delay: (index % 12) * 0.05, 
          duration: 0.5, 
          ease: [0.16, 1, 0.3, 1] 
        }}
        onClick={() => setIsDetailOpen(true)}
        className="group relative w-full bg-[#121212] rounded-[2rem] border border-white/5 overflow-hidden flex flex-col hover:border-[#BF953F]/40 hover:shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-all duration-500 shadow-2xl shadow-black/50 cursor-pointer"
      >
        {/* Top Badges (Absolute) */}
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start pointer-events-none">
          <div className="px-3 py-1 rounded-full border border-[#BF953F]/30 bg-black/60 backdrop-blur-md flex items-center justify-center">
            <span className="text-[#BF953F] font-serif text-[10px] tracking-widest uppercase font-bold">{product.brand}</span>
          </div>
          
          {/* Dynamic Marketing Badge */}
          {product.badge && (
             <div className="px-3 py-1 rounded-full bg-[#BF953F] shadow-[0_0_15px_rgba(191,149,63,0.5)]">
               <span className="text-black font-extrabold font-sans text-[9px] tracking-widest uppercase">
                 {product.badge}
               </span>
             </div>
          )}
        </div>

        {/* Image Chamber - Enhanced for impact */}
        <div className="relative aspect-[4/5] sm:h-72 w-full bg-gradient-to-b from-[#1a1a1a] to-[#121212] p-0 flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none"></div>
          {product.imageUrl ? (
            <img
               src={`/images/perfumes/${product.imageUrl}`}
               alt={product.name}
               loading="lazy"
               className="h-full w-full object-contain p-4 sm:p-6 z-0 group-hover:scale-110 drop-shadow-2xl transition-transform duration-700 ease-out drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_20px_25px_rgba(191,149,63,0.2)]"
            />
          ) : (
            <div className="flex flex-col items-center justify-center h-full w-full p-8 z-0">
               <div className="w-full h-full border border-dashed border-white/10 rounded-2xl flex items-center justify-center p-4 transition-colors duration-500 group-hover:border-[#BF953F]/30">
                  <span className="font-sans text-[10px] tracking-[0.2em] text-center text-white/20 uppercase group-hover:text-[#BF953F]/50 transition-colors">
                    Imagen en <br/> preparación
                  </span>
               </div>
            </div>
          )}
          
          {/* View Details Prompt */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm z-20">
             <div className="bg-white/10 border border-white/20 px-4 py-2 rounded-full flex items-center gap-2">
                <Info size={14} className="text-[#BF953F]" />
                <span className="text-[10px] uppercase tracking-widest font-bold">Ver Detalles</span>
             </div>
          </div>
        </div>

        {/* Header Info Only on Card to save space */}
        <div className="p-4 md:p-6 bg-gradient-to-t from-black/80 to-[#121212] backdrop-blur-xl border-t border-white/5">
           <h2 className="text-lg md:text-xl font-serif text-white group-hover:text-[#BF953F] transition-colors tracking-wide leading-tight line-clamp-1 mb-1">
            {product.name}
          </h2>
          <span className="text-[8px] text-[#BF953F] uppercase tracking-[0.2em] font-bold">
            {product.category}
          </span>
        </div>
      </motion.div>

      {/* Detail Modal */}
      <AnimatePresence>
        {isDetailOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsDetailOpen(false)}
              className="absolute inset-0 bg-black/90 backdrop-blur-xl"
            />
            
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl bg-[#0a0a0a] border border-[#BF953F]/20 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(0,0,0,1)] flex flex-col md:flex-row max-h-[90vh] overflow-y-auto no-scrollbar"
            >
              <button 
                onClick={() => setIsDetailOpen(false)}
                className="absolute top-6 right-6 z-[110] w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110 active:scale-90"
              >
                <X size={24} />
              </button>

              {/* Left Column: Huge Image */}
              <div className="w-full md:w-1/2 min-h-[300px] md:min-h-[500px] bg-gradient-to-br from-[#121212] to-black p-12 flex items-center justify-center border-b md:border-b-0 md:border-r border-white/5">
                 <motion.img 
                   initial={{ scale: 0.8, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   transition={{ delay: 0.2, type: "spring", stiffness: 100 }}
                   src={`/images/perfumes/${product.imageUrl}`}
                   alt={product.name}
                   className="max-h-full max-w-full object-contain drop-shadow-[0_25px_40px_rgba(191,149,63,0.3)]"
                 />
              </div>

              {/* Right Column: Detailed Info */}
              <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col gap-8 bg-[#0a0a0a]">
                <div>
                   <div className="flex items-center gap-2 mb-2">
                      <ShieldCheck size={14} className="text-green-500" />
                      <span className="text-[10px] text-green-500 uppercase tracking-[0.2em] font-bold">Garantía de Originalidad Check</span>
                   </div>
                   <span className="text-[10px] text-[#BF953F] uppercase tracking-[0.3em] font-bold mb-2 block">{product.brand}</span>
                   <h2 className="text-4xl md:text-5xl font-serif text-white mb-4 tracking-wide">{product.name}</h2>
                   <div className="flex gap-4">
                      <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] text-white/40 uppercase tracking-widest">{product.category}</span>
                      <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] text-white/40 uppercase tracking-widest">{product.gender}</span>
                   </div>
                </div>

                <p className="text-white/60 text-sm md:text-base leading-relaxed font-sans italic">
                  "{product.description}"
                </p>

                {/* Professional Metrics */}
                <div className="space-y-6 bg-white/5 p-8 rounded-3xl border border-white/5">
                   <div className="flex items-center gap-2 mb-2">
                     <Star size={14} className="text-[#BF953F] fill-[#BF953F]" />
                     <span className="text-xs text-white font-bold tracking-widest uppercase">Desempeño Profesional</span>
                   </div>
                   <div className="grid grid-cols-1 gap-5">
                      <ScoreBar label="Firma Personal & Versatilidad" score={performance.versatility} icon={Shield} />
                      <ScoreBar label="Oficina & Eventos Business" score={performance.professional} icon={Zap} />
                      <ScoreBar label="Nocturno & Seducción" score={performance.nocturnal} icon={Star} />
                      <ScoreBar label="Longevidad & Proyección" score={performance.longevity} icon={Clock} />
                   </div>
                </div>

                {/* Olfactory DNA */}
                <div>
                   <span className="text-[10px] text-white/30 uppercase tracking-widest mb-4 block">ADN Olfativo Principal</span>
                   <div className="flex flex-wrap gap-4">
                      {product.dna.map((note, i) => {
                        const config = getNoteConfig(note);
                        const NoteIcon = config.icon;
                        return (
                          <div key={i} className="flex items-center gap-3 bg-white/5 border border-white/10 px-4 py-2 rounded-2xl transition-all hover:border-white/30">
                             <div className="w-6 h-6 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${config.color}20` }}>
                                <NoteIcon size={14} style={{ color: config.color }} />
                             </div>
                             <span className="text-[11px] text-white font-medium">{config.label}</span>
                          </div>
                        )
                      })}
                   </div>
                </div>

                {/* CTA Button */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4"
                >
                  <button className="w-full bg-gradient-to-r from-[#BF953F] to-[#FCF6BA] text-[#111] py-5 px-8 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs transition-all hover:shadow-[0_0_40px_rgba(191,149,63,0.4)] active:scale-95 flex items-center justify-center gap-4">
                    <MessageCircle className="w-5 h-5" />
                    Cotizar Importación Mayorista
                  </button>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;