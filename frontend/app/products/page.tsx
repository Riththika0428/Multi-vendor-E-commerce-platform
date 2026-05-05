"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import ProductCard from '@/components/customer/ProductCard';
import { Search, Filter, SlidersHorizontal, ArrowLeft, ArrowRight, Package } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  
  // Filters
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);

  const categories = [
    'Tech & Gadgets', 'Modern Fashion', 'Home Interior', 
    'Beauty & Care', 'Outdoor Gear', 'Art & Jewelry'
  ];

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`http://localhost:5000/api/products`, {
        params: {
          pageNumber: page,
          keyword,
          category,
          minPrice: priceRange[0],
          maxPrice: priceRange[1]
        }
      });
      setProducts(data.products);
      setPages(data.pages);
    } catch (error) {
      console.error(error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, [page, category, priceRange]); // Debounce keyword search in real app

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPage(1);
    fetchProducts();
  };

  return (
    <div className="min-h-screen bg-[#fafbfc] flex flex-col relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-indigo-50/40 rounded-full blur-[140px] -z-10" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-sky-50/40 rounded-full blur-[120px] -z-10" />
      
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20 relative z-10">
        <div className="container mx-auto px-6">
          
          {/* Header & Functional Area */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
            <div>
              <div className="flex items-center gap-3 mb-4">
                 <div className="w-10 h-1bg-indigo-600 rounded-full" />
                 <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-600">The Vault</span>
              </div>
              <h1 className="text-7xl font-black text-slate-900 tracking-tighter mb-4 leading-[0.9]">Explore <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-indigo-600">Goods</span></h1>
              <p className="text-slate-400 font-medium text-lg max-w-md">Unearth unique pieces from independent artisans around the globe.</p>
            </div>
            
            <form onSubmit={handleSearch} className="relative w-full md:w-[450px] group">
              <input 
                type="text"
                placeholder="Search premium goods..."
                value={keyword}
                onChange={(e) => setKeyword(e.target.value)}
                className="w-full pl-16 pr-8 py-5 bg-white border border-slate-100 rounded-[2rem] shadow-xl shadow-slate-200/20 focus:border-indigo-600 outline-none font-bold text-slate-900 placeholder:text-slate-300 transition-all duration-300 group-focus-within:shadow-2xl group-focus-within:shadow-indigo-100"
              />
              <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-indigo-600 group-focus-within:scale-110 transition-transform" />
            </form>
          </div>

          <div className="flex flex-col lg:flex-row gap-12">
            
            {/* Sidebar Filters */}
            <aside className="lg:w-[320px] shrink-0">
              <div className="sticky top-32 space-y-8">
                <div className="bg-white/70 backdrop-blur-xl p-10 rounded-[3rem] border border-white/50 shadow-2xl shadow-slate-200/40">
                  <div className="flex items-center gap-4 mb-10 pb-6 border-b border-slate-50">
                    <div className="p-3 bg-indigo-600 text-white rounded-2xl shadow-lg shadow-indigo-100">
                      <SlidersHorizontal className="w-5 h-5" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-900 tracking-tight">Refine</h2>
                  </div>

                  <div className="space-y-12">
                    {/* Category */}
                    <div>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8 flex items-center gap-2">
                        <Filter className="w-3 h-3" /> Department
                      </h3>
                      <div className="space-y-4">
                        <button 
                          onClick={() => setCategory('')}
                          className={`w-full flex items-center justify-between group transition-all ${category === '' ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
                        >
                          <span className={`text-sm font-black uppercase tracking-widest ${category === '' ? 'translate-x-2' : ''} transition-transform`}>All Masterpieces</span>
                          <div className={`w-1.5 h-1.5 rounded-full ${category === '' ? 'bg-indigo-600 scale-150 shadow-lg shadow-indigo-100' : 'bg-slate-200 group-hover:bg-slate-400'} transition-all`} />
                        </button>
                        {categories.map((cat) => (
                          <button 
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className={`w-full flex items-center justify-between group transition-all ${category === cat ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-900'}`}
                          >
                            <span className={`text-sm font-black uppercase tracking-widest ${category === cat ? 'translate-x-2' : ''} transition-transform`}>{cat}</span>
                            <div className={`w-1.5 h-1.5 rounded-full ${category === cat ? 'bg-indigo-600 scale-150 shadow-lg shadow-indigo-100' : 'bg-slate-200 group-hover:bg-slate-400'} transition-all`} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price */}
                    <div>
                      <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-8">Value Threshold</h3>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">$</span>
                          <input 
                            type="number" 
                            value={priceRange[0]} 
                            onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                            className="w-full pl-8 pr-4 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-xs font-black text-slate-900 focus:bg-white focus:border-indigo-600 outline-none transition-all"
                          />
                        </div>
                        <div className="relative">
                          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-black text-slate-300">$</span>
                          <input 
                            type="number" 
                            value={priceRange[1]} 
                            onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                            className="w-full pl-8 pr-4 py-4 bg-slate-50/50 border border-slate-100 rounded-2xl text-xs font-black text-slate-900 focus:bg-white focus:border-indigo-600 outline-none transition-all"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Promo Spotlight */}
                <div className="p-8 rounded-[3rem] bg-indigo-600 text-white relative overflow-hidden group shadow-2xl shadow-indigo-100">
                   <div className="absolute top-[-20%] right-[-10%] w-[60%] h-[60%] bg-white/20 rounded-full blur-3xl pointer-events-none" />
                   <p className="text-[10px] font-black uppercase tracking-[0.3em] mb-4 text-indigo-200">Featured</p>
                   <h4 className="text-xl font-black mb-4 leading-tight">Master Verified Vendors</h4>
                   <p className="text-indigo-100 text-[11px] font-medium leading-relaxed mb-6">Connect directly with artisans who meet our supreme quality benchmark.</p>
                   <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-lg active:scale-95">Discover Them</button>
                </div>
              </div>
            </aside>

            {/* Product Grid Area */}
            <div className="flex-1">
              {loading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="aspect-[3/4.2] bg-white/40 animate-pulse rounded-[2.5rem]" />
                  ))}
                </div>
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
                  <AnimatePresence mode="popLayout">
                    {products.map((product: any, idx: number) => (
                      <motion.div 
                        key={product._id}
                        layout
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, delay: idx * 0.05 }}
                      >
                        <ProductCard product={product} />
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="bg-white/40 backdrop-blur-md p-28 rounded-[4rem] text-center border-2 border-dashed border-slate-100 flex flex-col items-center">
                  <Package className="w-12 h-12 text-slate-200 mb-6" />
                  <h3 className="text-2xl font-black text-slate-900 mb-2">Silent Gallery.</h3>
                  <p className="text-slate-400 font-medium">No results matched your specific criteria.</p>
                </div>
              )}

              {/* Enhanced Pagination */}
              {pages > 1 && (
                <div className="flex items-center justify-center gap-6 mt-20">
                  <button 
                    onClick={() => setPage(page - 1)}
                    disabled={page === 1}
                    className="w-14 h-14 bg-white/70 backdrop-blur-md rounded-2xl flex items-center justify-center border border-slate-100 text-slate-400 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-xl disabled:opacity-20 active:scale-90"
                  >
                    <ArrowLeft className="w-6 h-6" />
                  </button>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">Phase</span>
                    <span className="text-2xl font-black text-slate-900 tracking-tighter">{page}</span>
                    <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300">of</span>
                    <span className="text-2xl font-black text-slate-400 tracking-tighter">{pages}</span>
                  </div>
                  <button 
                    onClick={() => setPage(page + 1)}
                    disabled={page === pages}
                    className="w-14 h-14 bg-white/70 backdrop-blur-md rounded-2xl flex items-center justify-center border border-slate-100 text-slate-400 hover:bg-slate-900 hover:text-white transition-all duration-300 shadow-xl disabled:opacity-20 active:scale-90"
                  >
                    <ArrowRight className="w-6 h-6" />
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
