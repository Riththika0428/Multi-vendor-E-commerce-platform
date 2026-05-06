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
  Filter
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
      toast.error('Failed to sync master records');
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(o => o.status === filter);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle2 className="w-4 h-4 text-emerald-500" />;
      case 'shipped': return <Truck className="w-4 h-4 text-indigo-500" />;
      default: return <Clock className="w-4 h-4 text-amber-500" />;
    }
  };

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-2">Master Records</h1>
           <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Fulfillment lifecycle tracking</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 border border-slate-100 rounded-2xl shadow-sm overflow-hidden">
           {['all', 'pending', 'paid', 'delivered'].map((f) => (
             <button 
               key={f}
               onClick={() => setFilter(f)}
               className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${filter === f ? 'bg-slate-950 text-white shadow-lg shadow-slate-200' : 'text-slate-400 hover:text-slate-900 hover:bg-slate-50'}`}
             >
               {f}
             </button>
           ))}
        </div>
      </div>

      <div className="grid gap-6">
         <AnimatePresence mode="popLayout">
            {loading ? (
               [1,2,3].map(i => <div key={i} className="h-44 bg-white animate-pulse rounded-[3rem]" />)
            ) : filteredOrders.length > 0 ? filteredOrders.map((order) => (
              <motion.div 
                key={order._id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col lg:flex-row lg:items-center justify-between gap-10 group hover:border-indigo-100 transition-all"
              >
                 <div className="flex-1 space-y-6">
                    <div className="flex items-center gap-4">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Entry: <span className="text-slate-900">#{order._id.slice(-8).toUpperCase()}</span></p>
                       <div className="w-[1px] h-3 bg-slate-200" />
                       <div className="flex items-center gap-2">
                          {getStatusIcon(order.status)}
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">{order.status}</span>
                       </div>
                    </div>

                    <div className="flex gap-4 overflow-x-auto pb-2 custom-scrollbar">
                       {order.orderItems.map((item: any, i: number) => (
                         <div key={i} className="flex items-center gap-4 bg-slate-50 p-2 pr-6 rounded-2xl border border-slate-100/50">
                            <div className="w-12 h-12 rounded-xl overflow-hidden bg-white border border-slate-100">
                               <img src={item.image} alt="" className="w-full h-full object-cover" />
                            </div>
                            <div className="min-w-0">
                               <p className="text-xs font-black text-slate-900 truncate max-w-[120px]">{item.name}</p>
                               <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Qty: {item.qty}</p>
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="flex flex-col md:flex-row lg:flex-col items-end gap-6 lg:gap-4 border-t lg:border-t-0 pt-6 lg:pt-0">
                    <div className="text-right">
                       <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Acquisition Point</p>
                       <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center font-black text-xs text-slate-400 border border-slate-100">
                             {order.user?.name?.charAt(0) || 'C'}
                          </div>
                          <p className="text-sm font-black text-slate-900">{order.user?.name || 'Anonymous Collector'}</p>
                       </div>
                    </div>
                    <div className="h-[1px] w-full bg-slate-50 hidden lg:block" />
                    <div className="flex items-center gap-8">
                       <div className="text-right">
                          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Entry Value</p>
                          <p className="text-3xl font-black text-slate-900 tracking-tighter">${order.totalPrice.toLocaleString()}</p>
                       </div>
                       <Link href={`/seller/orders/${order._id}`} className="w-14 h-14 bg-slate-950 text-white rounded-2xl flex items-center justify-center hover:bg-indigo-600 transition-all shadow-xl active:scale-90">
                          <ArrowUpRight className="w-6 h-6" />
                       </Link>
                    </div>
                 </div>
              </motion.div>
            )) : (
              <div className="py-40 bg-white rounded-[4rem] text-center border-2 border-dashed border-slate-100 flex flex-col items-center justify-center">
                 <Package className="w-16 h-16 text-slate-200 mb-6" />
                 <h2 className="text-2xl font-black text-slate-900 mb-2">No Acquisitions detected</h2>
                 <p className="text-slate-400 font-medium max-w-xs mx-auto text-sm leading-relaxed">System is currently in monitoring mode. New entries will appear automatically.</p>
              </div>
            )}
         </AnimatePresence>
      </div>
    </div>
  );
}
