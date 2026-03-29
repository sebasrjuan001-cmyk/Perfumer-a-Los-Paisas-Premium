import React from 'react';
import { PackageCheck, ShieldCheck, Truck, HeadphonesIcon, MapPin, Mail, Phone, Instagram, Facebook, Music } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050505] border-t border-white/5 pt-20 pb-10 font-sans">
      <div className="max-w-7xl mx-auto px-6">
        
        {/* B2B Trust Pillars (Solid & Prominent) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <div className="flex flex-col items-center text-center p-8 bg-[#121212] rounded-2xl border border-white/5 shadow-xl shadow-black/50 hover:border-[#BF953F]/30 transition-colors">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#BF953F] to-[#8C6D23] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(191,149,63,0.3)]">
              <Truck className="w-8 h-8 text-[#111] fill-current" />
            </div>
            <h4 className="text-[#BF953F] font-serif text-xl mb-3">Importadores Directos</h4>
            <p className="text-white/50 text-sm max-w-[220px] leading-relaxed">
               Garantizamos los mejores precios de Ecuador. Del fabricante a tu bodega, sin intermediarios.
            </p>
          </div>
          
          <div className="flex flex-col items-center text-center p-8 bg-[#121212] rounded-2xl border border-white/5 shadow-xl shadow-black/50 hover:border-[#BF953F]/30 transition-colors">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#BF953F] to-[#8C6D23] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(191,149,63,0.3)]">
              <ShieldCheck className="w-8 h-8 text-[#111] fill-current" />
            </div>
            <h4 className="text-[#BF953F] font-serif text-xl mb-3">Envíos Asegurados</h4>
            <p className="text-white/50 text-sm max-w-[220px] leading-relaxed">
              Despachos diarios 100% seguros a todas las provincias. Inversión protegida.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-8 bg-[#121212] rounded-2xl border border-white/5 shadow-xl shadow-black/50 hover:border-[#BF953F]/30 transition-colors">
            <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#BF953F] to-[#8C6D23] flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(191,149,63,0.3)]">
              <HeadphonesIcon className="w-8 h-8 text-[#111] fill-current" />
            </div>
            <h4 className="text-[#BF953F] font-serif text-xl mb-3">Soporte Mayorista 24/7</h4>
            <p className="text-white/50 text-sm max-w-[220px] leading-relaxed">
              Atención personalizada para cotizaciones, catálogos y armado de pedidos por volumen.
            </p>
          </div>
        </div>

        {/* 4-Column B2B Architecture */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16 border-t border-white/5 pt-16">
          
          {/* Column 1: Brand & Mission */}
          <div className="flex flex-col gap-6">
            <div className="text-2xl font-serif font-bold text-[#BF953F] tracking-widest drop-shadow-md">
              LOS PAISAS
            </div>
            <p className="text-white/50 text-sm leading-relaxed">
               Distribuidores líderes de perfumería nicho y diseñador en Ecuador. Proveemos mercadería 100% original con códigos batch verificables para negocios y emprendedores.
            </p>
            <div className="flex gap-4">
              <a href="https://www.instagram.com/perfumerialospaisas.oficial?igsh=bTUzOXhiNDAwY3Jq" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-[#BF953F] hover:bg-[#BF953F]/10 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="https://www.facebook.com/share/1CCn8LWFff/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-[#BF953F] hover:bg-[#BF953F]/10 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="https://www.tiktok.com/@perfumera.los.pai7?_r=1&_t=ZS-953S30HMh16" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-[#BF953F] hover:bg-[#BF953F]/10 transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.06-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.03 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.9-.32-1.89-.23-2.74.24-.73.41-1.31 1.15-1.54 1.96-.1.34-.13.7-.12 1.05.02 1.05.59 2.07 1.48 2.62.63.4 1.38.6 2.13.56 1.24-.05 2.4-.88 2.82-2.04.16-.43.23-.9.22-1.36.03-3.64.01-7.29.03-10.93Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-2">Navegación Rápida</h4>
            <a href="#" className="text-white/50 hover:text-[#BF953F] text-sm transition-colors">Catálogo Completo</a>
            <a href="#" className="text-white/50 hover:text-[#BF953F] text-sm transition-colors">Nuevos Ingresos</a>
            <a href="#" className="text-white/50 hover:text-[#BF953F] text-sm transition-colors">Sobre Nosotros</a>
            <a href="#" className="text-white/50 hover:text-[#BF953F] text-sm transition-colors">Solicitar Muestras</a>
            <a href="#" className="text-white/50 hover:text-[#BF953F] text-sm transition-colors">Preguntas Frecuentes (FAQ)</a>
          </div>

          {/* Column 3: Legal & Support */}
          <div className="flex flex-col gap-4">
            <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-2">Legal & Soporte</h4>
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">Términos y Condiciones</a>
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">Políticas de Compra Mayorista</a>
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">Políticas de Envío</a>
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">Garantías y Devoluciones</a>
            <a href="#" className="text-white/50 hover:text-white text-sm transition-colors">Aviso de Privacidad</a>
          </div>

          {/* Column 4: Direct Contact */}
          <div className="flex flex-col gap-6">
             <h4 className="text-white font-bold tracking-widest uppercase text-xs mb-2">Contacto Directo</h4>
             
             <div className="flex items-start gap-3">
               <MapPin className="w-5 h-5 text-[#BF953F] shrink-0 mt-0.5" />
               <div className="flex flex-col">
                 <span className="text-white/80 text-sm">Centro Logístico Principal</span>
                 <span className="text-white/40 text-xs">Manta, Manabí - Ecuador</span>
               </div>
             </div>

             <div className="flex items-center gap-3">
               <Phone className="w-5 h-5 text-[#BF953F] shrink-0" />
               <span className="text-white/80 text-sm">+593 98 875 5347</span>
             </div>

             <div className="flex items-center gap-3">
               <Mail className="w-5 h-5 text-[#BF953F] shrink-0" />
               <span className="text-white/80 text-sm">perfumeriaslospaisas.oficial@gmail.com</span>
             </div>

             {/* Google Maps Embed */}
             <div className="mt-6 rounded-2xl overflow-hidden border border-white/10 h-44 w-full relative group">
               <iframe 
                 src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d250.1772765883194!2d-80.7215018249322!3d-0.9523389021840166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMMKwNTcnMDguNyJTIDgwwrA0MycxNy4wIlc!5e0!3m2!1ses!2sec!4v1774668227347!5m2!1ses!2sec" 
                 width="100%" 
                 height="100%" 
                 style={{ border: 0 }} 
                 allowFullScreen={true} 
                 loading="lazy" 
                 referrerPolicy="no-referrer-when-downgrade"
                 className="transition-all duration-500"
               ></iframe>
             </div>
          </div>

        </div>

        {/* Logistics & Payment Base */}
        <div className="border-t border-white/5 pt-8 pb-4 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4">
            <span className="text-[10px] text-white/30 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">Depósitos / Transferencias</span>
            <span className="text-[10px] text-white/30 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">Banco Pichincha</span>
            <span className="text-[10px] text-white/30 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">Banco Guayaquil</span>
            <span className="text-white/20 mx-2">|</span>
            <span className="text-[10px] text-white/30 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">Servientrega</span>
            <span className="text-[10px] text-white/30 uppercase tracking-widest bg-white/5 px-2 py-1 rounded">Urbano Express</span>
          </div>

          <div className="text-[10px] text-white/20 font-sans tracking-widest text-center md:text-right">
             &copy; {new Date().getFullYear()} PERFUMERÍA LOS PAISAS. TODOS LOS DERECHOS RESERVADOS.
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
