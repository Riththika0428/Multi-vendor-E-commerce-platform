"use client";

import { useEffect, useState } from 'react';
import { useAuthStore } from '@/store/useAuthStore';
import { Package, ShoppingBag, Star, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import axios from 'axios';
import { motion } from 'framer-motion';

export default function CustomerDashboard() {
  const { user } = useAuthStore();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMyOrders = async () => {
      try {
        const { data } = await axios.get('http://localhost:5000/api/orders/my', { withCredentials: true });
        setOrders(data.slice(0, 3)); // Just show recent 3
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchMyOrders();
  }, []);

  return (
    <div className="space-y-12">
      {/* User Greeting Section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="w-12 h-[2px] bg-indigo-600 rounded-full" />
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-600">Personal Space</span>
          </motion.div>
          <h1 className="text-6xl font-black text-slate-900 tracking-tight mb-3">
            Welcome, <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">{user?.name.split(' ')[0]}</span>
          </h1>
          <p className="text-slate-400 font-medium tracking-wide text-lg">Curating your collection of unique artifacts.</p>
        </div>
        
        <div className="flex gap-3">
          <div className="p-4 bg-white border border-slate-100 rounded-2xl shadow-sm">
            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Status</p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span className="text-sm font-black text-slate-900">Premium Member</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Total Orders', value: orders.length, color: 'from-indigo-600 to-blue-500', icon: Package },
          { label: 'Wishlist', value: '5 items', color: 'from-violet-600 to-fuchsia-500', icon: Star },
          { label: 'Trophy Points', value: '1,240', color: 'from-fuchsia-600 to-pink-500', icon: Star },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="p-8 rounded-[2.5rem] bg-white border border-slate-100 shadow-xl shadow-slate-200/20 relative overflow-hidden group hover:shadow-2xl hover:shadow-indigo-100 transition-all duration-500"
          >
            <div className={`absolute top-0 right-0 w-2 h-full bg-gradient-to-b ${stat.color} opacity-80`} />
            <div className="flex items-start justify-between mb-6">
              <div className={`p-4 rounded-2xl bg-gradient-to-br ${stat.color} text-white shadow-lg`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">Live Data</p>
            </div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-1">{stat.label}</p>
            <p className="text-4xl font-black text-slate-900 tracking-tighter">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Sub-Header */}
      <section>
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center gap-4">
            <div className="w-1.5 h-8 bg-indigo-600 rounded-full" />
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Recent Acquisitions</h2>
          </div>
          <Link href="/orders" className="p-3 px-6 bg-slate-50 rounded-2xl text-[10px] font-black text-indigo-600 uppercase tracking-widest hover:bg-slate-100 transition-colors">View History</Link>
        </div>

        <div className="space-y-6">
          {loading ? (
            [1, 2].map(i => <div key={i} className="h-32 bg-white/40 animate-pulse rounded-[2.5rem]" />)
          ) : orders.length > 0 ? (
            orders.map((order: any, idx) => (
              <motion.div 
                key={order._id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-white/80 backdrop-blur-xl p-8 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/20 flex flex-col md:flex-row md:items-center justify-between gap-6 group hover:border-indigo-100 transition-all cursor-pointer"
              >
                <div className="flex items-center gap-8">
                  <div className="w-20 h-20 bg-slate-50 rounded-[1.5rem] flex items-center justify-center border border-slate-100 overflow-hidden shadow-inner group-hover:scale-105 transition-transform">
                    <img src={order.orderItems[0]?.image} alt="" className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="text-lg font-black text-slate-900 mb-2">Order #{order._id.slice(-6).toUpperCase()}</p>
                    <div className="flex items-center gap-4">
                      <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${order.isPaid ? 'bg-green-500 text-white shadow-lg shadow-green-100' : 'bg-orange-400 text-white shadow-lg shadow-orange-100'}`}>
                        {order.isPaid ? 'Acquired' : 'Pending Payment'}
                      </span>
                      <span className="text-[10px] font-bold text-slate-400">{new Date(order.createdAt).toLocaleDateString(undefined, { month: 'long', day: 'numeric' })}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center justify-between md:justify-end gap-12 border-t md:border-t-0 pt-6 md:pt-0">
                  <div className="text-right">
                    <p className="text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1 font-mono">Value</p>
                    <p className="text-2xl font-black text-slate-900 tracking-tighter">${order.totalPrice.toFixed(2)}</p>
                  </div>
                  <Link href={`/orders/${order._id}`} className="w-14 h-14 bg-slate-50 rounded-[1.25rem] flex items-center justify-center text-slate-300 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300 hover:rotate-45">
                    <ArrowRight className="w-6 h-6" />
                  </Link>
                </div>
              </motion.div>
            ))
          ) : (
            <div className="bg-white/40 backdrop-blur-md p-24 rounded-[4rem] text-center border-2 border-dashed border-slate-100 flex flex-col items-center">
              <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mb-6 text-slate-200">
                <ShoppingBag className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-2">Your shelf is quiet.</h3>
              <p className="text-slate-400 font-medium mb-8">Begin your journey in the elite marketplace.</p>
              <Link href="/products" className="p-5 px-10 bg-indigo-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-indigo-100 hover:bg-slate-900 transition-all">Start Collecting</Link>
            </div>
          )}
        </div>
      </section>

      {/* Aesthetic Callout */}
      <div className="bg-slate-950 p-16 rounded-[4rem] text-white relative overflow-hidden shadow-3xl">
        <div className="absolute top-[-100%] right-[-20%] w-[80%] h-[200%] bg-indigo-600 rounded-full blur-[160px] opacity-20 pointer-events-none" />
        <div className="absolute bottom-[-50%] left-[0%] w-[50%] h-[100%] bg-violet-600 rounded-full blur-[140px] opacity-10 pointer-events-none" />
        
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 rounded-full bg-indigo-500/20 flex items-center justify-center">
                <div className="w-2 h-2 bg-indigo-400 rounded-full animate-ping" />
              </div>
              <span className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">Elite Matcher</span>
            </div>
            <h2 className="text-5xl font-black mb-6 tracking-tight leading-[1.1]">Curated artifacts refined for your <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-violet-400">aesthetic.</span></h2>
            <p className="text-slate-400 font-medium text-lg lg:pr-20">Our intelligence layer discovered 4 unique pieces that align with your recent acquisition profile.</p>
          </div>
          <Link href="/products" className="py-6 px-12 bg-white text-slate-950 rounded-[1.5rem] font-black text-[13px] uppercase tracking-widest hover:bg-indigo-400 transition-all shadow-2xl flex items-center justify-center gap-3 active:scale-95 group">
            Discover Now <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
          </Link>
        </div>
      </div>
    </div>
  );
}
