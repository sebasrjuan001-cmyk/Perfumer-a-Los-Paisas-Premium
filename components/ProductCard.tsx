import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Info, Zap, Clock, Shield, Star, ShieldCheck, Share2, ChevronLeft, ArrowLeft } from 'lucide-react';
import { Product } from '../types';
import { getNoteConfig } from '../constants';

interface ProductCardProps {
  product: Product;
  index: number;
  onModalStateChange?: (isOpen: boolean) => void;
}

// Deterministic hash from a string — no randomness, same result every render
const hashStr = (s: string): number => {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = Math.imul(31, h) + s.charCodeAt(i) | 0;
  }
  return Math.abs(h);
};

const ProductCard: React.FC<ProductCardProps> = ({ product, index, onModalStateChange }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  // Sync modal state with parent (hides LeadMagnet and WhatsAppFAB)
  useEffect(() => {
    // CRITICAL FIX: Only the active card should modify global state and body styles!
    if (!isDetailOpen) return;

    if (onModalStateChange) onModalStateChange(true);
    
    // iOS-safe scroll lock: use position:fixed so rubber-band scroll doesn't bleed through
    const scrollY = window.scrollY;
    document.body.style.position = 'fixed';
    document.body.style.top = `-${scrollY}px`;
    document.body.style.width = '100%';
    document.body.style.overflowY = 'scroll'; // keep scrollbar space on desktop

    return () => {
      // Cleanup runs ONLY when THIS card closes
      if (onModalStateChange) onModalStateChange(false);
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflowY = '';
      if (scrollY) window.scrollTo(0, scrollY);
    };
  }, [isDetailOpen, onModalStateChange]);

  const closeModal = useCallback(() => setIsDetailOpen(false), []);

  // WhatsApp
  const phoneNumber = "593988755347";
  const message = encodeURIComponent(`Hola, deseo cotizar al por mayor el perfume: *${product.name}* de *${product.brand}*. Mi nombre es...`);
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  // ─── Strict Deterministic Performance Scoring ───────────────────────────────
  // Each metric is derived exactly from the product's DNA notes AND its description!
  const calculatePerformance = () => {
    if (product.performance) return product.performance;

    const dna = product.dna || [];
    const desc = product.category.toLowerCase() + " " + product.description.toLowerCase();
    const isNiche = product.category === 'Nicho';
    const isArabic = product.category === 'Árabe';

    // Base scores
    let longevity = 2.5;
    let sillage = 2.5;
    let versatility = 3;
    let professional = 3;
    let nocturnal = 2.5;

    // Strict DNA rules
    if (dna.includes('Amaderado') || dna.includes('Maderoso')) { longevity += 1.2; sillage += 0.5; }
    if (dna.includes('Cuero')) { longevity += 1.5; nocturnal += 1.5; versatility -= 1.5; professional -= 0.5; }
    if (dna.includes('Especiada')) { sillage += 1.0; nocturnal += 0.8; }
    if (dna.includes('Citrico') || dna.includes('Cítrico')) { longevity -= 1.0; versatility += 1.5; professional += 1.0; }
    if (dna.includes('Acuatica') || dna.includes('Acuático')) { sillage -= 0.5; versatility += 1.0; professional += 0.5; }
    if (dna.includes('Verde')) { professional += 1.2; versatility += 0.5; }
    if (dna.includes('Floral')) { versatility += 0.5; professional += 0.5; }
    if (dna.includes('Frutal')) { versatility += 0.8; nocturnal -= 0.2; }
    if (dna.includes('Dulce') || dna.includes('Vainilla') || dna.includes('Gourmand')) {
      nocturnal += 1.5; sillage += 0.8; professional -= 1.0; versatility -= 0.5;
    }
    if (dna.includes('Fresco') || dna.includes('Aromatica') || dna.includes('Aromático')) {
      versatility += 1.0; professional += 1.0;
    }
    
    // Strict Description rules (Psycho-acoustic profiling)
    if (desc.includes('intenso') || desc.includes('profundo') || desc.includes('bestia')) { longevity += 1.0; sillage += 1.5; }
    if (desc.includes('elegante') || desc.includes('sofisticado') || desc.includes('clase') || desc.includes('oficina')) { professional += 1.5; }
    if (desc.includes('seductor') || desc.includes('provocativo') || desc.includes('noche') || desc.includes('sensual')) { nocturnal += 2.0; professional -= 0.5; }
    if (desc.includes('limpio') || desc.includes('fresco') || desc.includes('jabonoso') || desc.includes('diario')) { versatility += 1.5; nocturnal -= 1.0; }
    if (desc.includes('suave') || desc.includes('íntimo')) { sillage -= 1.0; longevity -= 0.5; professional += 0.5; }
    if (desc.includes('clásico') || desc.includes('caballero') || desc.includes('maduro')) { professional += 1.0; versatility -= 0.5; }
    if (desc.includes('vibrante') || desc.includes('energía') || desc.includes('juventud') || desc.includes('joven')) { versatility += 1.0; professional -= 0.5; }
    if (desc.includes('exótico') || desc.includes('magia') || desc.includes('misterio')) { nocturnal += 1.0; sillage += 0.5; versatility -= 0.5; }
    
    // Category modifiers
    if (isNiche) { longevity += 0.5; sillage += 0.5; professional += 0.5; versatility -= 0.5; }
    if (isArabic) { longevity += 1.5; sillage += 1.0; nocturnal += 0.5; versatility -= 1.0; professional -= 0.5; }

    // Final tie-breaker deterministic micro-variance (to ensure perfumes with similar descriptions differ perfectly)
    const seed = hashStr(product.id + product.name);
    const varRange = [-0.6, -0.3, 0, 0.3, 0.6];
    
    longevity += varRange[(seed >> 0) % 5];
    sillage += varRange[(seed >> 4) % 5];
    versatility += varRange[(seed >> 8) % 5];
    professional += varRange[(seed >> 12) % 5];
    nocturnal += varRange[(seed >> 16) % 5];

    // Ensure strict boundary (1 to 5 points max)
    const clamp = (v: number) => {
      const rounded = Math.round(v * 10) / 10; // 1 decimal precision
      return Math.min(5, Math.max(1, Math.round(rounded))); // Force integer display for UX clarity
    };

    return {
      longevity: clamp(longevity),
      sillage: clamp(sillage),
      versatility: clamp(versatility),
      professional: clamp(professional),
      nocturnal: clamp(nocturnal),
    };
  };

  const performance = calculatePerformance();

  // ─── Score Bar Component ────────────────────────────────────────────────────
  const ScoreBar = ({ label, score, icon: Icon }: { label: string; score: number; icon: any }) => (
    <div className="flex flex-col gap-1.5 w-full">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-[#BF953F]/10 flex items-center justify-center border border-[#BF953F]/20">
            <Icon size={11} className="text-[#BF953F]" />
          </div>
          <span className="text-[10px] text-white/70 uppercase tracking-widest font-bold">{label}</span>
        </div>
        <span className="text-[10px] text-[#BF953F] font-mono font-bold bg-[#BF953F]/10 px-2 py-0.5 rounded border border-[#BF953F]/20">{score}/5</span>
      </div>
      <div className="h-2 w-full bg-white/5 rounded-full overflow-hidden border border-white/5 relative">
        <div className="absolute inset-0 flex pointer-events-none">
          {[1,2,3,4].map(n => (
            <div key={n} style={{left: `${n*20}%`}} className="absolute top-0 h-full w-[1px] bg-white/10" />
          ))}
        </div>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${(score / 5) * 100}%` }}
          transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="h-full bg-gradient-to-r from-[#8C6D23] via-[#BF953F] to-[#FCF6BA] shadow-[0_0_12px_rgba(191,149,63,0.5)] rounded-full relative z-10"
        />
      </div>
    </div>
  );

  return (
    <>
      {/* ─── Product Card ─────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        whileHover={{ y: -8, scale: 1.012 }}
        transition={{ delay: (index % 12) * 0.04, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setIsDetailOpen(true)}
        className="group relative w-full bg-[#121212] rounded-[2rem] border border-white/5 overflow-hidden flex flex-col hover:border-[#BF953F]/40 hover:shadow-[0_25px_50px_rgba(0,0,0,0.9)] transition-all duration-500 shadow-2xl shadow-black/50 cursor-pointer"
      >
        {/* Badges */}
        <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start pointer-events-none">
          <div className="px-3 py-1 rounded-full border border-[#BF953F]/30 bg-black/60 backdrop-blur-md">
            <span className="text-[#BF953F] font-serif text-[10px] tracking-widest uppercase font-bold">{product.brand}</span>
          </div>
          {product.badge && (
            <div className="px-3 py-1 rounded-full bg-[#BF953F] shadow-[0_0_15px_rgba(191,149,63,0.5)]">
              <span className="text-black font-extrabold text-[9px] tracking-widest uppercase">{product.badge}</span>
            </div>
          )}
        </div>

        {/* Image */}
        <div className="relative aspect-[4/5] sm:h-72 w-full bg-gradient-to-b from-[#1a1a1a] to-[#121212] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 bg-black/10 z-10 group-hover:bg-transparent transition-colors duration-500 pointer-events-none" />
          {product.imageUrl ? (
            <img
              src={`/images/perfumes/${product.imageUrl}`}
              alt={product.name}
              loading="lazy"
              className="h-full w-full object-contain p-6 z-0 group-hover:scale-110 transition-transform duration-700 ease-out drop-shadow-[0_15px_15px_rgba(0,0,0,0.5)] group-hover:drop-shadow-[0_20px_25px_rgba(191,149,63,0.2)]"
            />
          ) : (
            <div className="w-full h-full border border-dashed border-white/10 rounded-2xl m-6 flex items-center justify-center">
              <span className="text-[10px] tracking-widest text-white/20 uppercase">Imagen en preparación</span>
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity bg-black/40 backdrop-blur-sm z-20">
            <div className="bg-white/10 border border-white/20 px-4 py-2 rounded-full flex items-center gap-2">
              <Info size={14} className="text-[#BF953F]" />
              <span className="text-[10px] uppercase tracking-widest font-bold">Ver Detalles</span>
            </div>
          </div>
        </div>

        {/* Card Footer */}
        <div className="p-4 md:p-5 bg-gradient-to-t from-black/80 to-[#121212] border-t border-white/5">
          <h2 className="text-lg md:text-xl font-serif text-white group-hover:text-[#BF953F] transition-colors leading-tight line-clamp-1 mb-0.5">
            {product.name}
          </h2>
          <span className="text-[8px] text-[#BF953F] uppercase tracking-[0.2em] font-bold">{product.category}</span>
        </div>
      </motion.div>

      {/* ─── Detail Modal — Full screen on mobile, centered panel on desktop ─── */}
      <AnimatePresence>
        {isDetailOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeModal}
              className="fixed inset-0 bg-black/90 backdrop-blur-xl z-[200]"
            />

            {/* ── MOBILE VIEW: Full-screen slide-up panel ── */}
            <motion.div
              key="mobile-panel"
              initial={{ y: '100%' }}
              animate={{ y: 0 }}
              exit={{ y: '100%' }}
              transition={{ type: 'spring', damping: 28, stiffness: 260 }}
              className="fixed inset-0 z-[210] flex flex-col bg-[#0a0a0a] md:hidden overflow-hidden"
            >
              {/* Top Bar — Back arrow always on far left, full width, nothing overlapping it */}
              <div className="flex items-center gap-3 px-4 pt-12 pb-3 border-b border-white/5 bg-[#0a0a0a] shrink-0">
                {/* Back button — leftmost, large enough for thumb */}
                <button
                  onClick={closeModal}
                  className="flex items-center gap-2 active:scale-95 transition-transform shrink-0 z-10"
                >
                  <div className="w-10 h-10 rounded-full bg-white/10 border border-[#BF953F]/40 flex items-center justify-center shadow-md">
                    <ArrowLeft size={20} className="text-[#BF953F]" />
                  </div>
                  <span className="text-xs uppercase tracking-widest font-bold text-[#BF953F]">Atrás</span>
                </button>

                {/* Perfume name — shrinks if needed */}
                <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
                  <span className="text-[8px] uppercase tracking-[0.2em] text-white/40 font-bold truncate">{product.brand}</span>
                  <span className="text-sm font-serif text-white truncate">{product.name}</span>
                </div>

                {/* Share button on far right */}
                <button
                  onClick={() => navigator.share?.({ title: `Los Paisas - ${product.name}`, url: window.location.href })}
                  className="w-9 h-9 rounded-full bg-white/10 border border-white/10 flex items-center justify-center text-white/60 active:scale-95 transition-transform shrink-0"
                >
                  <Share2 size={14} />
                </button>
              </div>

              {/* Bottle Image — fixed height, never clipped */}
              <div className="shrink-0 h-[40vh] bg-gradient-to-b from-[#141414] to-[#0a0a0a] flex items-center justify-center px-12 py-4">
                <motion.img
                  initial={{ scale: 0.85, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1, type: 'spring', stiffness: 120 }}
                  src={`/images/perfumes/${product.imageUrl}`}
                  alt={product.name}
                  className="h-full w-full object-contain drop-shadow-[0_20px_40px_rgba(191,149,63,0.25)] filter brightness-110"
                />
              </div>

              {/* Scrollable Info Panel */}
              <div className="flex-1 overflow-y-auto px-5 py-5 space-y-6 pb-32">
                {/* Header */}
                <div>
                  <div className="flex items-center gap-1.5 mb-2">
                    <ShieldCheck size={13} className="text-emerald-500" />
                    <span className="text-[9px] text-emerald-500 uppercase tracking-[0.2em] font-bold">Garantía de originalidad</span>
                  </div>
                  <h2 className="text-3xl font-serif text-white tracking-wide mb-2">{product.name}</h2>
                  <div className="flex gap-2 flex-wrap">
                    <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] text-white/50 uppercase tracking-widest">{product.category}</span>
                    <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] text-white/50 uppercase tracking-widest">{product.gender}</span>
                  </div>
                </div>

                <p className="text-white/60 text-sm leading-relaxed italic">"{product.description}"</p>

                {/* Performance */}
                <div className="bg-white/5 p-5 rounded-2xl border border-white/5 space-y-4">
                  <div className="flex items-center gap-2">
                    <Star size={13} className="text-[#BF953F] fill-[#BF953F]" />
                    <span className="text-[10px] text-white font-bold tracking-widest uppercase">Desempeño Profesional 2026</span>
                  </div>
                  <ScoreBar label="Versatilidad & Firma Personal" score={performance.versatility} icon={Shield} />
                  <ScoreBar label="Oficina & Événements Business" score={performance.professional} icon={Zap} />
                  <ScoreBar label="Nocturno & Seducción" score={performance.nocturnal} icon={Star} />
                  <ScoreBar label="Longevidad & Proyección" score={performance.longevity} icon={Clock} />
                </div>

                {/* DNA Tags */}
                <div>
                  <span className="text-[9px] text-white/30 uppercase tracking-widest mb-3 block">ADN Olfativo</span>
                  <div className="flex flex-wrap gap-2">
                    {product.dna.map((note, i) => {
                      const cfg = getNoteConfig(note);
                      const NoteIcon = cfg.icon;
                      return (
                        <div key={i} className="flex items-center gap-2 border border-white/10 px-3 py-1.5 rounded-xl bg-white/5">
                          <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ backgroundColor: `${cfg.color}25` }}>
                            <NoteIcon size={12} style={{ color: cfg.color }} />
                          </div>
                          <span className="text-[11px] text-white/80 font-medium">{cfg.label}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Fixed bottom CTA — separate from scrollable content */}
              <div className="fixed bottom-0 left-0 right-0 z-[220] bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/10 px-5 py-4 flex gap-3">
                <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                  <button className="w-full bg-gradient-to-r from-[#BF953F] to-[#FCF6BA] text-black py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-[11px] flex items-center justify-center gap-2 active:scale-95 transition-transform shadow-[0_0_30px_rgba(191,149,63,0.3)]">
                    <MessageCircle size={18} />
                    Cotizar Mayorista
                  </button>
                </a>
                <button
                  onClick={closeModal}
                  className="w-14 h-14 bg-white/10 border border-white/15 rounded-2xl flex items-center justify-center text-white/70 active:scale-95 transition-transform"
                >
                  <X size={20} />
                </button>
              </div>
            </motion.div>

            {/* ── DESKTOP VIEW: Centered Modal ── */}
            <motion.div
              key="desktop-modal"
              initial={{ scale: 0.92, opacity: 0, y: 16 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 16 }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed inset-0 z-[210] hidden md:flex items-center justify-center p-8 pointer-events-none"
            >
              <div className="w-full max-w-4xl max-h-[88vh] bg-[#0a0a0a] border border-[#BF953F]/20 rounded-[2.5rem] overflow-hidden shadow-[0_0_120px_rgba(0,0,0,1)] flex pointer-events-auto">
                {/* Left: Image */}
                <div className="w-5/12 shrink-0 bg-gradient-to-br from-[#141414] to-black p-12 flex items-center justify-center border-r border-white/5 relative">
                  <motion.img
                    initial={{ scale: 0.85, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.15, type: 'spring', stiffness: 120 }}
                    src={`/images/perfumes/${product.imageUrl}`}
                    alt={product.name}
                    className="h-full w-full object-contain drop-shadow-[0_25px_40px_rgba(191,149,63,0.3)]"
                  />
                  {/* Close & Share */}
                  <div className="absolute top-5 right-5 flex gap-2">
                    <button
                      onClick={() => navigator.share?.({ title: `Los Paisas - ${product.name}`, url: window.location.href }) ?? navigator.clipboard?.writeText(window.location.href)}
                      className="w-9 h-9 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                    >
                      <Share2 size={15} />
                    </button>
                    <button
                      onClick={closeModal}
                      className="w-9 h-9 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white transition-all hover:scale-110"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </div>

                {/* Right: Info — scrollable */}
                <div className="flex-1 overflow-y-auto p-10 flex flex-col gap-7">
                  <div>
                    <div className="flex items-center gap-1.5 mb-1">
                      <ShieldCheck size={13} className="text-emerald-500" />
                      <span className="text-[9px] text-emerald-500 uppercase tracking-[0.2em] font-bold">Garantía de Originalidad</span>
                    </div>
                    <span className="text-[9px] text-[#BF953F] uppercase tracking-[0.3em] font-bold block mb-1">{product.brand}</span>
                    <h2 className="text-4xl font-serif text-white mb-3 tracking-wide">{product.name}</h2>
                    <div className="flex gap-3">
                      <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] text-white/40 uppercase tracking-widest">{product.category}</span>
                      <span className="bg-white/5 border border-white/10 px-3 py-1 rounded-full text-[10px] text-white/40 uppercase tracking-widest">{product.gender}</span>
                    </div>
                  </div>

                  <p className="text-white/60 text-sm leading-relaxed italic">"{product.description}"</p>

                  <div className="bg-white/5 p-6 rounded-2xl border border-white/5 space-y-4">
                    <div className="flex items-center gap-2 mb-1">
                      <Star size={13} className="text-[#BF953F] fill-[#BF953F]" />
                      <span className="text-[10px] text-white font-bold tracking-widest uppercase">Desempeño Profesional 2026</span>
                    </div>
                    <ScoreBar label="Versatilidad & Firma Personal" score={performance.versatility} icon={Shield} />
                    <ScoreBar label="Oficina & Eventos Business" score={performance.professional} icon={Zap} />
                    <ScoreBar label="Nocturno & Seducción" score={performance.nocturnal} icon={Star} />
                    <ScoreBar label="Longevidad & Proyección" score={performance.longevity} icon={Clock} />
                  </div>

                  <div>
                    <span className="text-[9px] text-white/30 uppercase tracking-widest mb-3 block">ADN Olfativo Principal</span>
                    <div className="flex flex-wrap gap-2">
                      {product.dna.map((note, i) => {
                        const cfg = getNoteConfig(note);
                        const NoteIcon = cfg.icon;
                        return (
                          <div key={i} className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl hover:border-white/30 transition-colors">
                            <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ backgroundColor: `${cfg.color}25` }}>
                              <NoteIcon size={12} style={{ color: cfg.color }} />
                            </div>
                            <span className="text-[11px] text-white font-medium">{cfg.label}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
                    <button className="w-full bg-gradient-to-r from-[#BF953F] to-[#FCF6BA] text-black py-4 rounded-2xl font-bold uppercase tracking-[0.2em] text-xs flex items-center justify-center gap-3 hover:shadow-[0_0_40px_rgba(191,149,63,0.4)] active:scale-95 transition-all mt-2">
                      <MessageCircle size={18} />
                      Cotizar Importación Mayorista
                    </button>
                  </a>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;