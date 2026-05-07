"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  ShoppingBag, 
  Search, 
  ChevronRight,
  Clock,
  CheckCircle2,
  Package,
  Truck,
  ArrowUpRight,
  Filter,
  User,
  Calendar
} from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

export default function SellerOrders() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('http://localhost:5000/api/orders/seller', { withCredentials: true });
      setOrders(data);
    } catch (error) {
      console.error(error);
      toast.error('Failed to load orders');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-emerald-50 text-emerald-600 border-emerald-100';
      case 'shipped': return 'bg-blue-50 text-blue-600 border-blue-100';
      case 'paid': return 'bg-purple-50 text-purple-600 border-purple-100';
      default: return 'bg-amber-50 text-amber-600 border-amber-100';
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      {/* Header & Filters */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
           <h1 className="text-2xl font-bold text-slate-900 mb-1">Orders Management</h1>
           <p className="text-sm font-medium text-slate-400">Track and fulfill your customer orders</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1.5 border border-slate-200 rounded-2xl shadow-sm">
           {['all', 'pending', 'paid', 'delivered'].map((f) => (
             <button 
               key={f}
               onClick={() => setFilter(f)}
               className={`px-5 py-2 rounded-xl text-xs font-bold capitalize transition-all ${filter === f ? 'bg-[#0052FF] text-white shadow-md' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}
             >
               {f}
             </button>
           ))}
        </div>
      </div>

      <div className="grid gap-6">
         <AnimatePresence mode="popLayout">
            {loading ? (
               [1,2,3].map(i => <div key={i} className="h-44 bg-white animate-pulse rounded-3xl" />)
            ) : filteredOrders.length > 0 ? filteredOrders.map((order) => (
              <motion.div 
                key={order._id}
                layout
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm flex flex-col lg:flex-row lg:items-center gap-8 group hover:border-[#0052FF]/20 transition-all hover:shadow-md"
              >
                 {/* Order Info */}
                 <div className="flex-1 space-y-6">
                    <div className="flex flex-wrap items-center gap-4">
                       <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">#{order._id.slice(-8).toUpperCase()}</span>
                       <div className="w-[1px] h-3 bg-slate-200 hidden sm:block" />
                       <div className={`px-2.5 py-1 rounded-lg border text-[10px] font-bold uppercase tracking-wider ${getStatusColor(order.status)}`}>
                          {order.status}
                       </div>
                       <div className="flex items-center gap-2 text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                          <Calendar className="w-3 h-3" />
                          {new Date(order.createdAt).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                       </div>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                       {order.orderItems.map((item: any, i: number) => (
                         <div key={i} className="flex items-center gap-3 bg-slate-50 p-2 pr-4 rounded-xl border border-slate-100 min-w-fit">
                            <div className="w-10 h-10 rounded-lg overflow-hidden bg-white border border-slate-100 flex-shrink-0">
                               <img src={item.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0">
                               <p className="text-xs font-bold text-slate-900 truncate max-w-[120px]">{item.name}</p>
                               <p className="text-[10px] font-medium text-slate-400">Qty: {item.qty} × ${item.price}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 {/* Customer & Price */}
                 <div className="flex flex-col sm:flex-row lg:flex-row items-start sm:items-center lg:items-center gap-8 pt-6 lg:pt-0 border-t lg:border-t-0 border-slate-50">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded-full bg-[#0052FF]/5 flex items-center justify-center font-bold text-sm text-[#0052FF] border border-[#0052FF]/10">
                          {order.user?.name?.charAt(0) || 'U'}
                       </div>
                       <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Customer</p>
                          <p className="text-xs font-bold text-slate-900">{order.user?.name || 'Guest User'}</p>
                       </div>
                    </div>

                    <div className="flex items-center gap-6">
                       <div>
                          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-0.5">Total Amount</p>
                          <p className="text-xl font-bold text-slate-900">${order.totalPrice.toLocaleString()}</p>
                       </div>
                       <Link 
                         href={`/seller/orders/${order._id}`} 
                         className="w-12 h-12 bg-white border border-slate-200 text-slate-400 rounded-xl flex items-center justify-center hover:bg-[#0052FF] hover:text-white hover:border-[#0052FF] transition-all shadow-sm active:scale-95 group"
                       >
                          <ChevronRight className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
                       </Link>
                    </div>
                 </div>
              </motion.div>
            )) : (
              <div className="py-32 bg-white rounded-3xl text-center border border-dashed border-slate-200 flex flex-col items-center justify-center">
                 <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6">
                    <ShoppingBag className="w-8 h-8 text-slate-300" />
                 </div>
                 <h2 className="text-lg font-bold text-slate-900 mb-1">No orders found</h2>
                 <p className="text-sm font-medium text-slate-400 max-w-xs mx-auto">When customers purchase your products, they will appear here for fulfillment.</p>
              </div>
            )}
         </AnimatePresence>
      </div>
    </motion.div>
  );
}
