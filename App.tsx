import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProductCard from './components/ProductCard';
import Reviews from './components/Reviews';
import Footer from './components/Footer';
import WhatsAppFAB from './components/WhatsAppFAB';
import LeadMagnet from './components/LeadMagnet';
import { PRODUCTS } from './constants';
import { FilterState } from './types';

function App() {
  const [filters, setFilters] = useState<FilterState>({ search: '', category: 'All' });
  const [visibleCount, setVisibleCount] = useState(16);
  const [isChangingCategory, setIsChangingCategory] = useState(false);

  // Reset pagination and trigger skeleton when filters change
  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    setIsChangingCategory(true);
    setFilters(prev => ({ ...prev, ...newFilters }));
    setVisibleCount(16);
    // Simulate short loading for skeleton feel
    setTimeout(() => setIsChangingCategory(false), 400);
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(product => {
      // 1. Search Logic
      const matchesSearch = 
        product.name.toLowerCase().includes(filters.search.toLowerCase()) ||
        product.brand.toLowerCase().includes(filters.search.toLowerCase());
      
      // 2. Category/Gender Logic
      let matchesCategory = true;
      if (filters.category !== 'All') {
         if (['Hombre', 'Dama', 'Unisex'].includes(filters.category)) {
             // Filter by Gender
             matchesCategory = product.gender === filters.category;
         } else if (['Árabe', 'Nicho', 'Autor', 'Diseñador'].includes(filters.category)) {
             // Filter by Product Category Type
             matchesCategory = product.category === filters.category;
         } else {
             // Fallback: Filter by Brand Name strictly if it doesn't match predefined categories
             matchesCategory = product.brand.toUpperCase().includes(filters.category.toUpperCase());
         }
      }

      return matchesSearch && matchesCategory;
    });
  }, [filters]);

  return (
    <div className="min-h-screen bg-void font-sans selection:bg-[#BF953F] selection:text-black">
      <Navbar onFilterChange={handleFilterChange} />
      
      <main>
        <Hero />
        
        {/* ADDED ID HERE for Navbar Scroll */}
        <div id="catalog-section" className="relative z-10 max-w-7xl mx-auto px-4 md:px-8 py-24 min-h-screen">
           {/* Section Header */}
           <motion.div 
             initial={{ opacity: 0, y: 30 }}
             whileInView={{ opacity: 1, y: 0 }}
             viewport={{ once: true }}
             transition={{ duration: 0.8 }}
             className="flex items-end justify-between mb-16 border-b border-white/5 pb-4"
           >
              <div>
                <h2 className="text-3xl font-serif text-white mb-2">
                  {filters.category === 'All' ? 'Catálogo Oficial' : filters.category}
                </h2>
                <p className="text-white/40 text-sm font-sans max-w-md">
                  {filters.category === 'All' 
                    ? 'Explora nuestra colección exclusiva de importación.' 
                    : `Mostrando selección exclusiva de ${filters.category}.`}
                </p>
              </div>
              <div className="text-[#BF953F] font-mono text-sm hidden md:block">
                {filteredProducts.length} REFERENCIAS
              </div>
           </motion.div>

           {/* Grid - Forced 2 columns on mobile */}
           <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-8">
              {isChangingCategory ? (
                // Skeleton Loader
                Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="w-full h-[400px] bg-[#121212] rounded-2xl animate-pulse border border-white/5 flex flex-col p-6">
                    <div className="w-full h-1/2 bg-white/5 rounded-xl mb-4"></div>
                    <div className="h-4 bg-white/5 rounded w-3/4 mb-2"></div>
                    <div className="h-3 bg-white/5 rounded w-1/2 mb-4"></div>
                    <div className="h-10 bg-white/5 rounded mt-auto"></div>
                  </div>
                ))
              ) : filteredProducts.length > 0 ? (
                filteredProducts.slice(0, visibleCount).map((product, index) => (
                  <ProductCard key={product.id} product={product} index={index} />
                ))
              ) : (
                // Persuasive Empty State
                <div className="col-span-full py-24 text-center border border-dashed border-white/10 rounded-3xl bg-[#0a0a0a]">
                  <p className="text-white/30 font-serif text-xl mb-4 italic">No encontramos ese perfume en este momento...</p>
                  <p className="text-white/60 text-sm mb-8 max-w-md mx-auto">
                    Somos importadores directos. Si buscas una referencia específica, podemos traerla en nuestro próximo contenedor.
                  </p>
                  <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
                    <a 
                      href={`https://wa.me/593981046714?text=${encodeURIComponent(`Hola, busqué "${filters.search}" en su web y no lo encontré. ¿Podrían ayudarme a conseguirlo?`)}`}
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="bg-[#BF953F] text-black px-6 py-3 rounded-full font-bold uppercase text-xs tracking-widest hover:bg-[#D4A373] transition-colors"
                    >
                      Consultar Disponibilidad vía WhatsApp
                    </a>
                    <button 
                      onClick={() => handleFilterChange({search: '', category: 'All'})}
                      className="text-white/40 hover:text-white text-xs underline uppercase tracking-widest"
                    >
                      Ver todo el catálogo
                    </button>
                  </div>
                </div>
              )}
           </div>

           {/* Load More Button */}
           {!isChangingCategory && filteredProducts.length > visibleCount && (
             <div className="mt-20 flex justify-center">
               <button 
                 onClick={() => setVisibleCount(prev => prev + 12)}
                 className="px-10 py-4 border border-[#BF953F]/30 text-[#BF953F] rounded-full font-bold uppercase text-xs tracking-[0.2em] hover:bg-[#BF953F]/10 transition-all shadow-[0_0_20px_rgba(191,149,63,0.1)]"
               >
                 Cargar más resultados
               </button>
             </div>
           )}
        </div>

        <Reviews />
      </main>

      <Footer />
      <LeadMagnet />
      <WhatsAppFAB />
    </div>
  );
}

export default App;