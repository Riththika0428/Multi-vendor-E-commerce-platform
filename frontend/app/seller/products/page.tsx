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
  Circle,
  ExternalLink
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
      toast.error('Failed to load products');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const deleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      await axios.delete(`http://localhost:5000/api/products/${id}`, { withCredentials: true });
      toast.success('Product deleted successfully');
      fetchProducts();
    } catch (error) {
      toast.error('Failed to delete product');
    }
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-2xl font-bold text-slate-900 mb-1">Product Catalog</h1>
           <p className="text-sm font-medium text-slate-400">Manage and track your store inventory</p>
        </div>
        <Link 
          href="/seller/products/create"
          className="inline-flex items-center gap-2 px-6 py-3 bg-[#0052FF] text-white rounded-xl font-bold text-sm hover:bg-[#0041CC] transition-all shadow-lg shadow-[#0052FF]/20 active:scale-95"
        >
          <Plus className="w-5 h-5" /> Add New Product
        </Link>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col md:flex-row gap-4">
         <div className="relative flex-1 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search products by name or category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-[#0052FF]/10 focus:border-[#0052FF] outline-none font-medium text-slate-900 text-sm transition-all"
            />
         </div>
         <button className="px-6 py-3 bg-white border border-slate-200 rounded-2xl text-slate-600 flex items-center gap-2 font-bold text-sm hover:border-[#0052FF] hover:text-[#0052FF] transition-all">
            <Filter className="w-4 h-4" /> Filters
         </button>
      </div>

      {/* Product Table */}
      <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden min-h-[400px]">
         <div className="overflow-x-auto">
            <table className="w-full text-left">
               <thead>
                  <tr className="bg-slate-50/50 border-b border-slate-100">
                     <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Product Info</th>
                     <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Category</th>
                     <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Stock</th>
                     <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Price</th>
                     <th className="px-8 py-5 text-[10px] font-bold uppercase tracking-wider text-slate-400">Rating</th>
                     <th className="px-8 py-5 text-right"></th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-slate-50">
                  <AnimatePresence>
                    {loading ? (
                      [1,2,3,4,5].map(i => (
                        <tr key={i} className="animate-pulse">
                           <td className="px-8 py-6"><div className="h-10 bg-slate-100 rounded-xl w-3/4" /></td>
                           <td className="px-8 py-6"><div className="h-6 bg-slate-100 rounded-lg w-1/2" /></td>
                           <td className="px-8 py-6"><div className="h-6 bg-slate-100 rounded-lg w-1/3" /></td>
                           <td className="px-8 py-6"><div className="h-8 bg-slate-100 rounded-xl w-1/2" /></td>
                           <td className="px-8 py-6"><div className="h-6 bg-slate-100 rounded-lg w-1/2" /></td>
                           <td className="px-8 py-6 text-right"><div className="h-10 w-10 bg-slate-100 rounded-full ml-auto" /></td>
                        </tr>
                      ))
                    ) : filteredProducts.map((product) => (
                      <motion.tr 
                        key={product._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="group hover:bg-slate-50/50 transition-colors"
                      >
                         <td className="px-8 py-6">
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 rounded-xl border border-slate-100 overflow-hidden bg-slate-50 flex-shrink-0">
                                  <img src={product.images[0]} alt="" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                               </div>
                               <div>
                                  <p className="text-sm font-bold text-slate-900 mb-0.5">{product.name}</p>
                                  <p className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">SKU: {product._id.slice(-6).toUpperCase()}</p>
                               </div>
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <span className="px-3 py-1 bg-slate-100 text-slate-600 text-[10px] font-bold uppercase tracking-wider rounded-lg">{product.category}</span>
                         </td>
                         <td className="px-8 py-6">
                            <div className="flex items-center gap-2">
                               <div className={`w-1.5 h-1.5 rounded-full ${product.stock > 10 ? 'bg-emerald-500' : 'bg-rose-500 animate-pulse'}`} />
                               <span className="text-xs font-bold text-slate-700">{product.stock} in stock</span>
                            </div>
                         </td>
                         <td className="px-8 py-6">
                            <p className="text-sm font-bold text-slate-900">${product.price.toLocaleString()}</p>
                         </td>
                         <td className="px-8 py-6">
                            <div className="flex items-center gap-2">
                               <div className="flex items-center gap-1 px-2 py-0.5 bg-amber-50 rounded-lg">
                                  <span className="text-[10px] font-bold text-amber-600">{product.averageRating}</span>
                               </div>
                               <span className="text-[10px] font-medium text-slate-400">({product.numOfReviews})</span>
                            </div>
                         </td>
                         <td className="px-8 py-6 text-right">
                            <div className="flex items-center justify-end gap-2">
                               <Link href={`/products/${product._id}`} target="_blank" title="View Public Page" className="p-2 text-slate-400 hover:text-[#0052FF] hover:bg-[#0052FF]/5 rounded-lg transition-all"><ExternalLink className="w-4 h-4" /></Link>
                               <Link href={`/seller/products/${product._id}/edit`} title="Edit Product" className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all"><Edit3 className="w-4 h-4" /></Link>
                               <button onClick={() => deleteProduct(product._id)} title="Delete Product" className="p-2 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-all"><Trash2 className="w-4 h-4" /></button>
                            </div>
                         </td>
                      </motion.tr>
                    ))}
                  </AnimatePresence>
               </tbody>
            </table>
         </div>

         {!loading && filteredProducts.length === 0 && (
            <div className="py-32 text-center flex flex-col items-center justify-center">
               <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                  <Package className="w-8 h-8 text-slate-300" />
               </div>
               <h3 className="text-lg font-bold text-slate-900 mb-1">No products found</h3>
               <p className="text-sm font-medium text-slate-400">Try adjusting your search or filters.</p>
               <button onClick={() => setSearch('')} className="mt-4 text-sm font-bold text-[#0052FF] hover:underline">Clear all filters</button>
            </div>
         )}
      </div>
    </motion.div>
  );
}
