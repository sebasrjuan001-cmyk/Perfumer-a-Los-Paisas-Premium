import React from 'react';
import { motion } from 'framer-motion';
import { Vortex } from './Vortex';

const Hero: React.FC = () => {
  return (
    <section className="relative w-full min-h-[95vh] flex flex-col items-center justify-center overflow-hidden bg-void border-b border-white/5">
      
      {/* 1. Vortex Background */}
      <Vortex />
      
      {/* 2. Background Texture Overlay */}
      <div 
        className="absolute inset-0 opacity-10 z-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"
        style={{ filter: 'contrast(120%) brightness(50%)' }}
      ></div>

      {/* 3. Soft Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#050505_100%)] z-0 pointer-events-none opacity-90"></div>
      
      {/* 4. Content - Shifted Downwards */}
      {/* Added significant pt (padding-top) to push the visual center lower on the screen */}
      <div className="relative z-10 w-full max-w-7xl px-4 h-full flex flex-col items-center justify-center pt-32 md:pt-56 pb-12">
        
        {/* Subtitle - Above Logo */}
        <motion.p 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-[#BF953F] font-sans uppercase tracking-[0.25em] md:tracking-[0.4em] mb-8 md:mb-12 text-[10px] md:text-sm font-bold drop-shadow-[0_0_15px_rgba(191,149,63,0.3)] text-center"
        >
          Importadores Directos • Esencia Pura
        </motion.p>
        
        {/* Logo Container */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: "easeOut" }}
          className="relative w-full flex justify-center items-center"
        >
           {/* Soft Glow */}
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[85%] bg-[#BF953F]/15 blur-[100px] rounded-full pointer-events-none -z-10 animate-pulse-slow"></div>

           {/* 
              THE LOGO IMAGE
              - Mobile: Increased max-w to 420px to ensure it fills width nicely without cropping.
              - Desktop: Larger max-w for impact.
              - h-auto: Preserves aspect ratio.
           */}
           <img
             src="/images/logo/a.png"
             alt="Logo Los Paisas"
             className="
               w-full max-w-[420px] md:max-w-[750px] lg:max-w-[850px]
               h-auto object-contain 
               filter brightness-110 drop-shadow-[0_15px_40px_rgba(0,0,0,0.9)]
             "
           />
        </motion.div>

        {/* Scroll Line - Anchors the bottom */}
        <motion.div 
          initial={{ scaleY: 0, opacity: 0 }}
          animate={{ scaleY: 1, opacity: 0.5 }}
          transition={{ delay: 1, duration: 1 }}
          className="h-16 md:h-24 w-[1px] bg-gradient-to-b from-[#BF953F] to-transparent mt-10 md:mt-16 origin-top opacity-30"
        ></motion.div>
      </div>
    </section>
  );
};

export default Hero;