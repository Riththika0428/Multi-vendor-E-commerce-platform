"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Plus, 
  Search, 
  MoreVertical, 
  Edit3, 
  Trash2, 
  Eye,
  Filter,
  Package,
  TrendingDown,
  TrendingUp,
  Circle
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function SellerProducts() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/products/seller', { withCredentials: true });
      setProducts(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load catalog');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to permanently remove this artifact?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, { withCredentials: true });
      toast.success('Artifact removed from catalog');
      fetchProducts();
    } catch (error) {
      toast.error('Deletion failed');
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-2">Artifact Catalog</h1>
           <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Manage your premium inventory assets</p>
        </div>
        <Link 
          href="/seller/products/create"
          className="py-5 px-10 bg-slate-950 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl flex items-center gap-3 hover:bg-indigo-600 transition-all active:scale-95"
        >
          <Plus className="w-5 h-5" /> New Acquisition
        </Link>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-6">
         <div className="relative flex-1 group">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300 group-focus-within:text-indigo-600 transition-colors" />
            <input 
              type="text" 
              placeholder="Filter by name or classification..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-16 pr-8 py-5 bg-white border border-slate-100 rounded-[2rem] shadow-xl shadow-slate-200/10 focus:ring-4 focus:ring-indigo-50/50 focus:border-indigo-600 outline-none font-bold text-slate-900 placeholder:text-slate-300 transition-all"
            />
         </div>
         <button className="px-10 py-5 bg-white border border-slate-100 rounded-[2rem] text-slate-400 flex items-center gap-3 font-black text-xs uppercase tracking-widest hover:border-indigo-600 hover:text-indigo-600 transition-all shadow-xl shadow-slate-200/10">
            <Filter className="w-5 h-5" /> Sort Logic
         </button>
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/20 overflow-hidden relative min-h-[400px]">
         <div className="overflow-x-auto custom-scrollbar">
            <table className="w-full text-left border-collapse">
               <thead>
                  <tr className="bg-slate-50/50">
                     <th className="p-10 text-[10px] font-black uppercase tracking-widest text-slate-400">Artifact Details</th>
                     <th className="p-10 text-[10px] font-black uppercase tracking-widest text-slate-400">Classification</th>
                     <th className="p-10 text-[10px] font-black uppercase tracking-widest text-slate-400">Inventory</th>
                     <th className="p-10 text-[10px] font-black uppercase tracking-widest text-slate-400">Value</th>
                     <th className="p-10 text-[10px] font-black uppercase tracking-widest text-slate-400">Metrics</th>
                     <th className="p-10 text-right"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  <AnimatePresence>
                    {loading ? (
                      [1,2,3,4].map(i => (
                        <tr key={i} className="animate-pulse">
                           <td className="p-10"><div className="h-8 bg-slate-50 rounded-xl w-3/4" /></td>
                           <td className="p-10"><div className="h-6 bg-slate-50 rounded-lg w-1/2" /></td>
                           <td className="p-10"><div className="h-6 bg-slate-50 rounded-lg w-1/2" /></td>
                           <td className="p-10"><div className="h-8 bg-slate-50 rounded-xl w-1/3" /></td>
                           <td className="p-10"><div className="h-6 bg-slate-50 rounded-lg w-1/2" /></td>
                           <td className="p-10 text-right"><div className="h-10 w-10 bg-slate-50 rounded-full ml-auto" /></td>
                        </tr>
                      ))
                    ) : filteredProducts.map((product) => (
                      <motion.tr 
                        key={product._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="group hover:bg-slate-50/50 transition-colors"
                      >
                         <td className="p-10">
                            <div className="flex items-center gap-6">
                               <div className="w-16 h-16 rounded-2xl overflow-hidden bg-slate-100 flex-shrink-0 animate-in fade-in zoom-in duration-500">
                                  <img src={product.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                               </div>
                               <div>
                                  <p className="font-black text-slate-900 mb-1">{product.name}</p>
                                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">ID: {product._id.slice(-6).toUpperCase()}</p>
                               </div>
                            </div>
                         </td>
                         <td className="p-10">
                            <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[9px] font-black uppercase tracking-widest rounded-lg">{product.category}</span>
                         </td>
                         <td className="p-10">
                            <div className="flex items-center gap-3">
                               <div className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`} />
                               <span className="text-sm font-black text-slate-900">{product.stock} Units</span>
                            </div>
                         </td>
                         <td className="p-10">
                            <p className="text-lg font-black text-slate-900">${product.price.toLocaleString()}</p>
                         </td>
                         <td className="p-10">
                            <div className="flex items-center gap-4">
                               <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 rounded-lg">
                                  <span className="text-xs font-black text-amber-600">{product.averageRating}</span>
                               </div>
                               <span className="text-[10px] font-bold text-slate-400">({product.numOfReviews} Revs)</span>
                            </div>
                         </td>
                         <td className="p-10 text-right">
                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                               <Link href={`/products/${product._id}`} target="_blank" className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-indigo-600 shadow-sm"><Eye className="w-4 h-4" /></Link>
                               <Link href={`/seller/products/${product._id}/edit`} className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-emerald-600 shadow-sm"><Edit3 className="w-4 h-4" /></Link>
                               <button onClick={() => deleteProduct(product._id)} className="p-3 bg-white border border-slate-100 rounded-xl text-slate-400 hover:text-rose-600 shadow-sm"><Trash2 className="w-4 h-4" /></button>
                            </div>
                         </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
               </tbody>
            </table>
         </div>

         {!loading && filteredProducts.length === 0 && (
            <div className="py-40 text-center flex flex-col items-center justify-center">
               <Package className="w-16 h-16 text-slate-200 mb-6" />
               <h3 className="text-2xl font-black text-slate-900 mb-2">Vault is Vacant</h3>
               <p className="text-slate-400 font-medium">Your current filter parameters yielded no matches.</p>
            </div>
         )}
      </div>
    </div>
  );
}
