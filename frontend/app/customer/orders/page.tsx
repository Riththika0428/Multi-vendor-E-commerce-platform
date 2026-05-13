"use client";

import { useEffect, useState } from 'react';
import { Package, ArrowRight, ShoppingBag, Clock, CheckCircle, Truck, AlertCircle } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/orders/my', { withCredentials: true });
        setOrders(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchOrders();
  }, []);

  const getStatusStyle = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return 'bg-green-500 text-white shadow-lg shadow-green-100';
      case 'shipped': return 'bg-indigo-500 text-white shadow-lg shadow-indigo-100';
      case 'processing': return 'bg-amber-500 text-white shadow-lg shadow-amber-100';
      default: return 'bg-slate-400 text-white shadow-lg shadow-slate-100';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case 'delivered': return <CheckCircle className="w-4 h-4" />;
      case 'shipped': return <Truck className="w-4 h-4" />;
      case 'processing': return <Clock className="w-4 h-4" />;
      default: return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-12 h-[2px] bg-indigo-600 rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">History Log</span>
          </motion.div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tighter">Your Acquisitions</h1>
        </div>
        <div className="flex items-center gap-4">
           <div className="px-6 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm flex items-center gap-3">
              <Package className="w-5 h-5 text-indigo-600" />
              <span className="text-xl font-black text-slate-900">{orders.length}</span>
           </div>
        </div>
      </div>

      <div className="space-y-8">
        {loading ? (
           [1, 2, 3].map(i => <div key={i} className="h-48 bg-white/60 animate-pulse rounded-[3rem]" />)
        ) : orders.length > 0 ? (
          orders.map((order: any, idx: number) => (
            <motion.div 
              key={order._id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col lg:flex-row lg:items-center justify-between gap-10 group hover:border-indigo-100 transition-all cursor-pointer relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-2 h-full bg-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-6 mb-8">
                  <div className="flex flex-col">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Order Ref</span>
                    <span className="text-sm font-black text-slate-900">#{order._id.toUpperCase().slice(-12)}</span>
                  </div>
                  
                  <div className="flex items-center gap-3 px-4 py-2 rounded-full border border-slate-50 bg-slate-50/50">
                    <div className={`p-1.5 rounded-full ${getStatusStyle(order.status)}`}>
                       {getStatusIcon(order.status)}
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest text-slate-600">{order.status}</span>
                  </div>

                  {order.isPaid && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full text-emerald-600">
                      <CheckCircle className="w-4 h-4" />
                      <span className="text-[10px] font-black uppercase tracking-widest">Paid</span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 text-slate-400">
                    <Clock className="w-4 h-4" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">{new Date(order.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
                  {order.orderItems.map((item: any, i: number) => (
                    <div key={i} className="w-24 h-24 rounded-[1.5rem] overflow-hidden bg-slate-50 flex-shrink-0 border border-slate-100 shadow-inner group-hover:scale-105 transition-transform duration-500">
                       <img src={item.image} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row lg:flex-col items-end gap-8 lg:gap-6 border-t lg:border-t-0 pt-10 lg:pt-0">
                 <div className="text-right">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">Total Valuation</p>
                    <p className="text-5xl font-black text-slate-900 tracking-tighter">${order.totalPrice.toFixed(2)}</p>
                 </div>
                 <Link href={`/customer/orders/${order._id}`} className="px-10 py-5 bg-slate-950 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-2xl flex items-center gap-3 active:scale-95 group/btn">
                    Explore Details <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-2 transition-transform" />
                 </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="bg-white p-32 rounded-[4rem] text-center border border-slate-100 shadow-xl shadow-slate-200/30 flex flex-col items-center">
            <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mb-10 text-slate-200">
               <ShoppingBag className="w-12 h-12" />
            </div>
            <h2 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">Your gallery is quiet.</h2>
            <p className="text-slate-400 font-medium mb-12 max-w-sm mx-auto">Begin your journey in the elite marketplace to build your collection.</p>
            <Link href="/products" className="px-12 py-6 bg-indigo-600 text-white rounded-[2rem] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-indigo-100 hover:bg-slate-950 transition-all">Start Procuring</Link>
          </div>
        )}
      </div>
    </div>
  );
}
