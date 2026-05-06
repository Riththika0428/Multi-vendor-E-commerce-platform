"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Package, 
  ShoppingCart, 
  CircleDollarSign, 
  Clock, 
  ArrowRight,
  TrendingUp,
  Box,
  ChevronRight
} from 'lucide-react';
import MetricCard from '@/components/seller/MetricCard';
import SalesChart from '@/components/seller/SalesChart';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SellerDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [chartData, setChartData] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, analyticsRes, ordersRes] = await Promise.all([
          axios.get('http://localhost:5000/api/seller/stats', { withCredentials: true }),
          axios.get('http://localhost:5000/api/seller/analytics', { withCredentials: true }),
          axios.get('http://localhost:5000/api/orders/seller', { withCredentials: true })
        ]);

        setStats(statsRes.data);
        setChartData(analyticsRes.data);
        setRecentOrders(ordersRes.data.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch dashboard data', error);
      }
      setLoading(false);
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="p-20 text-center font-black text-slate-300 uppercase tracking-widest text-xs">Assembling Merchant Intelligence...</div>;
  }

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
           <h1 className="text-6xl font-black text-slate-900 tracking-tighter mb-2 leading-none">Console <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-900 to-indigo-600">Alpha</span></h1>
           <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Real-time operational overview</p>
        </div>
        <div className="flex items-center gap-3 bg-white p-2 border border-slate-100 rounded-2xl shadow-sm">
           <div className="px-4 py-2 bg-indigo-50 text-indigo-600 rounded-xl text-[10px] font-black uppercase tracking-widest">Global Ops</div>
           <div className="px-4 py-2 text-slate-400 rounded-xl text-[10px] font-black uppercase tracking-widest">Active System</div>
        </div>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        <MetricCard 
          title="Artifact Catalog" 
          value={stats?.totalProducts || 0} 
          icon={Box} 
          color="bg-indigo-600" 
        />
        <MetricCard 
          title="Total Commerce" 
          value={`$${stats?.totalRevenue?.toLocaleString() || 0}`} 
          icon={CircleDollarSign} 
          trend="12.5%" 
          color="bg-emerald-600" 
        />
        <MetricCard 
          title="Acquisitions" 
          value={stats?.totalOrders || 0} 
          icon={ShoppingCart} 
          color="bg-violet-600" 
        />
        <MetricCard 
          title="Fulfillment Due" 
          value={stats?.pendingOrders || 0} 
          icon={Clock} 
          color="bg-rose-500" 
        />
      </div>

      <div className="grid xl:grid-cols-3 gap-10">
        {/* Chart */}
        <div className="xl:col-span-2">
           <SalesChart data={chartData} />
        </div>

        {/* Recent Orders Side Panel */}
        <div className="xl:col-span-1 flex flex-col gap-8">
           <section className="bg-white p-10 rounded-[4rem] border border-slate-100 shadow-2xl shadow-slate-200/20 flex-1">
              <div className="flex items-center justify-between mb-10">
                 <h2 className="text-2xl font-black text-slate-900 tracking-tight">Recent Activity</h2>
                 <Link href="/seller/orders" className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:bg-slate-950 hover:text-white transition-all">
                    <ArrowRight className="w-4 h-4" />
                 </Link>
              </div>

              <div className="space-y-6">
                 {recentOrders.length > 0 ? recentOrders.map((order: any) => (
                    <div key={order._id} className="flex items-center justify-between group p-2 hover:bg-slate-50 rounded-2xl transition-colors cursor-pointer">
                       <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center font-black text-xs group-hover:bg-white">
                             {order.user?.name?.charAt(0) || 'C'}
                          </div>
                          <div>
                             <p className="text-sm font-black text-slate-900">#{order._id.slice(-6).toUpperCase()}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{order.status}</p>
                          </div>
                       </div>
                       <p className="text-sm font-black text-slate-900 group-hover:text-indigo-600 transition-colors">${order.totalPrice}</p>
                    </div>
                 )) : (
                    <p className="text-slate-300 text-xs italic text-center py-10">No recent orders found.</p>
                 )}
              </div>
              
              <Link 
                href="/seller/orders" 
                className="w-full mt-10 py-5 bg-slate-950 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl flex items-center justify-center gap-2 group"
              >
                 Master Records <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
           </section>

           {/* Quick Action Hub */}
           <section className="bg-indigo-600 p-10 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
              <div className="absolute top-[-20%] right-[-10%] w-40 h-40 bg-white/20 rounded-full blur-3xl group-hover:scale-150 transition-transform duration-1000" />
              <div className="relative z-10">
                 <h3 className="text-xl font-black mb-4">Inventory Control</h3>
                 <p className="text-indigo-100 text-[11px] font-medium leading-relaxed mb-6">Manage your digital artifacts and catalog with the advanced marketplace engine.</p>
                 <Link href="/seller/products/create" className="inline-flex py-4 px-8 bg-white text-indigo-600 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-lg">New Artifact</Link>
              </div>
           </section>
        </div>
      </div>
    </div>
  );
}
