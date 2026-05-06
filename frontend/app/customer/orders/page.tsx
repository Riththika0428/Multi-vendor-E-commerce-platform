"use client";

import { useEffect, useState } from 'react';
import { Package, ArrowRight, ShoppingBag } from 'lucide-react';
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

  return (
    <div className="space-y-12">
      <h1 className="text-5xl font-black text-slate-900 tracking-tighter mb-12">Order History</h1>

      <div className="space-y-8">
        {loading ? (
           [1, 2, 3].map(i => <div key={i} className="h-40 bg-white animate-pulse rounded-[3rem]" />)
        ) : orders.length > 0 ? (
          orders.map((order: any) => (
            <motion.div 
              key={order._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col lg:flex-row lg:items-center justify-between gap-10 group hover:border-indigo-100 transition-all"
            >
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-4 mb-6">
                  <span className="text-sm font-black text-slate-900">Order #{order._id.toUpperCase()}</span>
                  <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${order.status === 'delivered' ? 'bg-green-50 text-green-600' : 'bg-indigo-50 text-indigo-600'}`}>
                     {order.status}
                  </span>
                  {order.isPaid && (
                    <span className="px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest bg-emerald-50 text-emerald-600">
                       Payment Confirmed
                    </span>
                  )}
                  <span className="text-[10px] font-bold text-slate-400">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>

                <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
                  {order.orderItems.map((item: any, i: number) => (
                    <div key={i} className="w-20 h-20 rounded-2xl overflow-hidden bg-slate-50 flex-shrink-0 border border-slate-100">
                       <img src={item.image} alt="" className="w-full h-full object-cover" />
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex flex-col md:flex-row lg:flex-col items-end gap-6 lg:gap-4 border-t lg:border-t-0 pt-6 lg:pt-0">
                 <div className="text-right">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Total Artifact Value</p>
                    <p className="text-4xl font-black text-slate-900 tracking-tighter">${order.totalPrice.toFixed(2)}</p>
                 </div>
                 <Link href={`/customer/orders/${order._id}`} className="px-8 py-4 bg-slate-950 text-white rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl flex items-center gap-3 active:scale-95">
                    Track Details <ArrowRight className="w-4 h-4" />
                 </Link>
              </div>
            </motion.div>
          ))
        ) : (
          <div className="bg-white p-20 rounded-[4rem] text-center border border-slate-100 shadow-xl shadow-slate-200/30">
            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-8">
               <ShoppingBag className="w-8 h-8 text-slate-300" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">No acquisitions yet.</h2>
            <Link href="/products" className="text-indigo-600 font-bold hover:underline">Browse the Marketplace</Link>
          </div>
        )}
      </div>
    </div>
  );
}
