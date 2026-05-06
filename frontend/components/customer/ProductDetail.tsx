"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Minus, Plus, ShoppingCart, Star, ShieldCheck, Truck, RotateCcw, Heart } from 'lucide-react';
import { useCartStore } from '@/store/useCartStore';
import axios from 'axios';
import { useAuthStore } from '@/store/useAuthStore';
import { toast } from 'react-hot-toast';

interface ProductDetailProps {
  product: {
    _id: string;
    name: string;
    description: string;
    price: number;
    images: string[];
    category: string;
    averageRating: number;
    numOfReviews: number;
    stock: number;
    vendor: {
       name: string;
       storeName: string;
    }
  };
}

export default function ProductDetail({ product }: ProductDetailProps) {
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const { addItem } = useCartStore();
  const { user, openAuthModal } = useAuthStore();
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistLoading, setWishlistLoading] = useState(false);

  useEffect(() => {
    const checkWishlist = async () => {
      if (!user || user.role !== 'customer') return;
      try {
        const { data } = await axios.get('http://localhost:5000/api/wishlist', { withCredentials: true });
        const exists = data.products.some((p: any) => p._id === product._id);
        setIsWishlisted(exists);
      } catch (error) {
        console.error('Error checking wishlist:', error);
      }
    };
    checkWishlist();
  }, [user, product._id]);

  const toggleWishlist = async () => {
    if (!user) {
      toast.error('Please login to save pieces');
      openAuthModal('customer', 'login');
      return;
    }

    if (user.role !== 'customer') {
      toast.error('Only customers can save pieces');
      return;
    }

    setWishlistLoading(true);
    try {
      await axios.post(`http://localhost:5000/api/wishlist/${product._id}`, {}, { withCredentials: true });
      setIsWishlisted(!isWishlisted);
      toast.success(isWishlisted ? 'Removed from collection' : 'Added to collection');
    } catch (error) {
      toast.error('Failed to update wishlist');
    }
    setWishlistLoading(false);
  };

  const handleAddToCart = () => {
    addItem(product._id, qty);
    toast.success('Added to cart');
  };

  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/reviews/product/${product._id}`);
        setReviews(data);
      } catch (error) {
        console.error('Failed to fetch reviews', error);
      }
    };
    fetchReviews();
  }, [product._id]);

  return (
    <div className="space-y-24">
      <div className="grid lg:grid-cols-2 gap-16">
        {/* Visuals */}
        <div className="space-y-6">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="relative aspect-square rounded-[3rem] overflow-hidden bg-slate-50 border border-slate-100"
          >
            <img 
              src={product.images[activeImage] || 'https://via.placeholder.com/800'} 
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </motion.div>

          <div className="grid grid-cols-4 gap-4">
            {product.images.map((img, i) => (
              <button 
                key={i} 
                onClick={() => setActiveImage(i)}
                className={`aspect-square rounded-2xl overflow-hidden border-4 transition-all ${activeImage === i ? 'border-indigo-600' : 'border-transparent opacity-60'}`}
              >
                <img src={img} alt="Product Thumbnail" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="flex flex-col">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-black uppercase tracking-widest rounded-full">
                {product.category}
              </span>
              <div className="flex items-center gap-1.5">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-black text-slate-900">{product.averageRating}</span>
                <span className="text-xs font-bold text-slate-400">({product.numOfReviews} Reviews)</span>
              </div>
            </div>

            <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-4 leading-none">
              {product.name}
            </h1>
            
            <div className="flex items-center gap-2 mb-6 p-3 bg-slate-50 rounded-2xl w-fit border border-slate-100">
               <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-black text-xs">
                  {product.vendor.storeName.charAt(0)}
               </div>
               <p className="text-sm font-bold text-slate-600 pr-2">Sold by <span className="text-slate-950">{product.vendor.storeName}</span></p>
            </div>

            <p className="text-slate-500 leading-relaxed font-medium mb-8 whitespace-pre-wrap">
              {product.description}
            </p>

            <div className="flex items-center gap-6 mb-10">
              <span className="text-5xl font-black text-slate-900 tracking-tighter">
                ${product.price.toFixed(2)}
              </span>
              <div className="h-10 w-[1px] bg-slate-200" />
              <div className="flex items-center bg-slate-50 rounded-2xl p-1 px-4 gap-6 border border-slate-100">
                <button 
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-indigo-600"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-4 text-center font-black text-slate-900">{qty}</span>
                <button 
                  onClick={() => setQty(Math.min(product.stock, qty + 1))}
                  className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-indigo-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button 
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 h-20 bg-slate-950 text-white rounded-[1.5rem] font-black text-lg uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-indigo-600 transition-all shadow-2xl active:scale-[0.98] disabled:opacity-50"
              >
                <ShoppingCart className="w-6 h-6" />
                {product.stock === 0 ? 'Out of Stock' : 'Add to Collection'}
              </button>
              <button 
                onClick={toggleWishlist}
                disabled={wishlistLoading}
                className="w-20 h-20 bg-white border border-slate-100 rounded-[1.5rem] flex items-center justify-center shadow-xl shadow-slate-200/40 hover:bg-slate-50 transition-all group active:scale-95"
              >
                <Heart className={`w-7 h-7 transition-colors ${isWishlisted ? 'fill-rose-500 text-rose-500' : 'text-slate-300 group-hover:text-rose-400'}`} />
              </button>
            </div>
          </div>

          {/* Badges */}
          <div className="grid grid-cols-3 gap-4 mt-auto">
            {[
              { icon: ShieldCheck, text: "Verified Quality" },
              { icon: Truck, text: "Fast Global Shipping" },
              { icon: RotateCcw, text: "Waitlist Protection" }
            ].map((badge, i) => (
              <div key={i} className="flex flex-col items-center text-center p-4 rounded-3xl bg-slate-50 border border-slate-100">
                <badge.icon className="w-5 h-5 text-indigo-600 mb-2" />
                <span className="text-[10px] font-black uppercase tracking-widest leading-tight text-slate-900">
                  {badge.text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Reviews Section */}
      <section className="bg-slate-50 rounded-[4rem] p-16 border border-slate-100">
         <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
            <div>
               <h2 className="text-4xl font-black text-slate-900 tracking-tighter mb-2">Customer Experience</h2>
               <p className="text-slate-500 font-medium">Real feedback from our collector community.</p>
            </div>
            <div className="flex items-center gap-6 p-6 bg-white rounded-3xl border border-slate-100 shadow-xl shadow-slate-200/40">
               <div className="text-center px-4 border-r border-slate-100">
                  <p className="text-3xl font-black text-slate-900">{product.averageRating}</p>
                  <div className="flex gap-0.5 justify-center">
                     {[1,2,3,4,5].map(s => <Star key={s} className={`w-3 h-3 ${product.averageRating >= s ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />)}
                  </div>
               </div>
               <div className="text-sm font-bold text-slate-400">
                  Based on {product.numOfReviews} verified acquisitions
               </div>
            </div>
         </div>

         <div className="grid md:grid-cols-2 gap-8">
            {reviews.length > 0 ? reviews.map((review, i) => (
               <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20"
               >
                  <div className="flex items-center justify-between mb-6">
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-950 text-white rounded-full flex items-center justify-center font-black text-xs">
                           {review.name.charAt(0)}
                        </div>
                        <div>
                           <p className="font-black text-slate-900 text-sm">{review.name}</p>
                           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{new Date(review.createdAt).toLocaleDateString()}</p>
                        </div>
                     </div>
                     <div className="flex gap-0.5">
                        {[1,2,3,4,5].map(s => <Star key={s} className={`w-4 h-4 ${review.rating >= s ? 'fill-yellow-400 text-yellow-400' : 'text-slate-100'}`} />)}
                     </div>
                  </div>
                  <p className="text-slate-600 font-medium leading-relaxed italic">
                     "{review.comment}"
                  </p>
               </motion.div>
            )) : (
               <div className="col-span-full py-20 text-center bg-white/50 rounded-[3rem] border border-dashed border-slate-200 italic font-medium text-slate-400">
                  No reviews yet. Be the first to share your experience after purchase!
               </div>
            )}
         </div>
      </section>
    </div>
  );
}
