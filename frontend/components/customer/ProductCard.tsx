"use client";

import { motion } from 'framer-motion';
import { ShoppingCart, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { useCartStore } from '@/store/useCartStore';

interface ProductCardProps {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    category: string;
    averageRating: number;
    numOfReviews: number;
    stock: number;
  };
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product._id, 1);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-[2rem] overflow-hidden border border-slate-100 shadow-xl shadow-slate-200/40 group relative"
    >
      {/* Category Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-indigo-600 shadow-sm">
          {product.category}
        </span>
      </div>

      {/* Image Container */}
      <Link href={`/products/${product._id}`} className="block relative aspect-square overflow-hidden bg-slate-50">
        <img 
          src={product.images[0] || 'https://via.placeholder.com/400'} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
      </Link>

      {/* Content */}
      <div className="p-6">
        <div className="flex items-center gap-1.5 mb-2">
          <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
          <span className="text-xs font-black text-slate-900">{product.averageRating}</span>
          <span className="text-[10px] font-bold text-slate-400">({product.numOfReviews})</span>
        </div>

        <Link href={`/products/${product._id}`}>
          <h3 className="text-lg font-black text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        
        <p className="text-slate-500 text-xs font-medium mb-4 line-clamp-2">
          Premium artisan quality from verified vendor.
        </p>

        <div className="flex items-center justify-between gap-4 mt-auto">
          <span className="text-2xl font-black text-slate-900 tracking-tight">
            ${product.price.toFixed(2)}
          </span>
          
          <button 
            onClick={handleAddToCart}
            disabled={product.stock === 0}
            className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center hover:bg-indigo-600 transition-all shadow-lg active:scale-90 disabled:opacity-50"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Stock warning */}
      {product.stock > 0 && product.stock < 5 && (
        <div className="absolute bottom-6 left-6 pointer-events-none">
          <span className="text-[10px] font-black text-orange-600 bg-orange-50 px-2 py-0.5 rounded-full uppercase tracking-widest">
            Only {product.stock} left
          </span>
        </div>
      )}
    </motion.div>
  );
}
