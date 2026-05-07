"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { 
  Package, 
  ShoppingCart, 
  CircleDollarSign, 
  Users, 
  ArrowRight,
  TrendingUp,
  Box,
  Eye,
  ShoppingBag
} from 'lucide-react';
import MetricCard from '@/components/seller/MetricCard';
import SalesChart from '@/components/seller/SalesChart';
import DonutChart from '@/components/seller/DonutChart';
import TopProducts from '@/components/seller/TopProducts';
import Link from 'next/link';
import { motion } from 'framer-motion';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

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
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
           <div className="w-10 h-10 border-4 border-[#0052FF] border-t-transparent rounded-full animate-spin" />
           <p className="text-slate-400 font-bold uppercase tracking-widest text-[10px]">Syncing Data...</p>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-8"
    >
      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div variants={item}>
          <MetricCard 
            title="Total Sales" 
            value={`$${stats?.totalRevenue?.toLocaleString() || '24,35.00'}`} 
            icon={CircleDollarSign} 
            trend="37%" 
            color="bg-blue-600" 
          />
        </motion.div>
        <motion.div variants={item}>
          <MetricCard 
            title="Visitors" 
            value={stats?.visitors || '6,547'} 
            icon={Users} 
            trend="23%" 
            color="bg-blue-600" 
          />
        </motion.div>
        <motion.div variants={item}>
          <MetricCard 
            title="New Orders" 
            value={stats?.totalOrders || '1,523'} 
            icon={ShoppingBag} 
            trend="17%" 
            color="bg-orange-500" 
          />
        </motion.div>
        <motion.div variants={item}>
          <MetricCard 
            title="Customers" 
            value={stats?.totalCustomers || '2,310'} 
            icon={Eye} 
            trend="14%" 
            color="bg-purple-600" 
          />
        </motion.div>
      </div>

      {/* Charts Row */}
      <div className="grid lg:grid-cols-3 gap-8">
        <motion.div variants={item} className="lg:col-span-2">
           <SalesChart data={chartData} />
        </motion.div>
        <motion.div variants={item} className="lg:col-span-1">
           <DonutChart title="Email Sent" />
        </motion.div>
      </div>

      {/* Activity and Top Products Row */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Recent Orders Table */}
        <motion.div variants={item} className="lg:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
           <div className="flex items-center justify-between mb-8">
              <h3 className="text-lg font-bold text-slate-900">Recent Orders</h3>
              <div className="flex items-center gap-4">
                 <select className="bg-slate-50 border-none rounded-lg text-[10px] font-bold text-slate-400 uppercase tracking-wider px-2 py-1 outline-none cursor-pointer">
                    <option>This Week</option>
                    <option>Today</option>
                 </select>
                 <Link href="/seller/orders" className="text-[10px] font-bold text-[#0052FF] uppercase tracking-wider hover:underline">View All</Link>
              </div>
           </div>

           <div className="overflow-x-auto">
              <table className="w-full text-left">
                 <thead>
                    <tr className="text-[10px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-50">
                       <th className="pb-4">Order ID</th>
                       <th className="pb-4">Customer</th>
                       <th className="pb-4">Date</th>
                       <th className="pb-4">Amount</th>
                       <th className="pb-4">Status</th>
                       <th className="pb-4">Tracking</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    {(recentOrders.length > 0 ? recentOrders : Array(5).fill({})).map((order: any, i) => (
                       <tr key={order._id || i} className="group hover:bg-slate-50/50 transition-colors">
                          <td className="py-4 text-xs font-bold text-slate-600">#{order._id?.slice(-7).toUpperCase() || `0215${478 + i}`}</td>
                          <td className="py-4">
                             <div className="flex items-center gap-3">
                                <img 
                                  src={`https://ui-avatars.com/api/?name=${order.user?.name || 'Customer'}&background=random`} 
                                  className="w-8 h-8 rounded-full" 
                                  alt=""
                                />
                                <span className="text-xs font-bold text-slate-900">{order.user?.name || 'Brenna Herwitz'}</span>
                             </div>
                          </td>
                          <td className="py-4 text-xs font-medium text-slate-500">
                             {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : '21 Aug, 2019'}
                          </td>
                          <td className="py-4 text-xs font-bold text-slate-900">${order.totalPrice || (876 - i * 100)}</td>
                          <td className="py-4">
                             <span className={`px-2 py-1 rounded-lg text-[10px] font-bold ${
                               (order.status || 'Delivered') === 'Delivered' ? 'bg-emerald-50 text-emerald-600' : 
                               order.status === 'Cancelled' ? 'bg-rose-50 text-rose-600' : 
                               order.status === 'Shipped' ? 'bg-blue-50 text-blue-600' : 'bg-orange-50 text-orange-600'
                             }`}>
                                {order.status || (i === 1 ? 'Cancelled' : i === 2 ? 'Shipped' : i === 3 ? 'Pending' : 'Delivered')}
                             </span>
                          </td>
                          <td className="py-4 text-xs font-medium text-slate-400 font-mono">DFAU8{7 + i}</td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>
        </motion.div>

        {/* Top Selling Products */}
        <motion.div variants={item} className="lg:col-span-1">
           <TopProducts />
        </motion.div>
      </div>
    </motion.div>
  );
}
