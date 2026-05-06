'use client';

import React, { useEffect } from 'react';
import { 
  Users, 
  Store, 
  Package, 
  ShoppingCart, 
  DollarSign, 
  TrendingUp,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import { RevenueTrendChart, SalesByProductChart } from '@/components/admin/AdminCharts';
import { useAdminStore } from '@/store/adminStore';
import Link from 'next/link';

export default function Dashboard() {
  const { stats, recentOrders, recentUsers, analytics, fetchStats, fetchAnalytics, loading } = useAdminStore();

  useEffect(() => {
    fetchStats();
    fetchAnalytics();
  }, [fetchStats, fetchAnalytics]);

  if (loading && !stats) {
    return (
      <div className="flex flex-col items-center justify-center h-96 gap-4">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <p className="text-neutral-500 font-medium">Crunching dashboard data...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-neutral-900 dark:text-white">Platform Overview</h1>
          <p className="text-neutral-500 mt-1">Welcome back, Admin. Here's what's happening today.</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-sm font-medium hover:bg-neutral-50 transition-colors">
            Download Report
          </button>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20">
            Platform Settings
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Customers" 
          value={stats?.totalUsers || 0} 
          icon={Users} 
          color="blue"
          trend={{ value: 12, isUp: true }}
        />
        <StatCard 
          title="Active Sellers" 
          value={stats?.totalSellers || 0} 
          icon={Store} 
          color="purple"
          trend={{ value: 5, isUp: true }}
        />
        <StatCard 
          title="Total Products" 
          value={stats?.totalProducts || 0} 
          icon={Package} 
          color="orange"
        />
        <StatCard 
          title="Total Revenue" 
          value={`$${stats?.totalRevenue?.toLocaleString() || 0}`} 
          icon={DollarSign} 
          color="green"
          trend={{ value: 8, isUp: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Revenue Trends */}
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-500" />
              Revenue Trend (Last 7 Days)
            </h3>
            <select className="bg-neutral-100 dark:bg-neutral-800 border-none text-xs rounded-lg px-2 py-1 outline-none">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <RevenueTrendChart data={analytics?.revenueData || []} />
        </div>

        {/* Top Products */}
        <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold">Top Selling Products</h3>
            <Link href="/admin/products" className="text-xs text-blue-500 hover:underline">View All</Link>
          </div>
          <SalesByProductChart data={analytics?.topProducts || []} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Orders */}
        <div className="lg:col-span-2 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm overflow-hidden">
          <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <h3 className="font-bold flex items-center gap-2">
              <Clock className="w-5 h-5 text-orange-500" />
              Recent Orders
            </h3>
            <Link href="/admin/orders" className="text-xs text-blue-500 hover:underline flex items-center gap-1" title="View all orders">
              View All <ArrowUpRight className="w-3 h-3" />
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-neutral-50/50 dark:bg-neutral-800/30 text-xs text-neutral-500 uppercase">
                  <th className="px-6 py-4">Order ID</th>
                  <th className="px-6 py-4">Customer</th>
                  <th className="px-6 py-4">Amount</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-neutral-100 dark:divide-neutral-800">
                {recentOrders?.length > 0 ? (
                  recentOrders.map((order) => (
                    <tr key={order._id} className="text-sm hover:bg-neutral-50/50 dark:hover:bg-neutral-800/20 transition-colors">
                      <td className="px-6 py-4 font-mono text-xs">#{order._id.slice(-6)}</td>
                      <td className="px-6 py-4">{order.user?.name}</td>
                      <td className="px-6 py-4 font-bold">${order.totalPrice}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
                          order.status === 'delivered' ? 'bg-green-100 text-green-700' : 
                          order.status === 'pending' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {order.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={4} className="px-6 py-8 text-center text-neutral-500 text-sm italic">
                      No orders yet
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* New Users */}
        <div className="bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm flex flex-col">
          <div className="p-6 border-b border-neutral-100 dark:border-neutral-800 flex items-center justify-between">
            <h3 className="font-bold">New Registrations</h3>
            <Link href="/admin/users" className="text-xs text-blue-500 hover:underline" title="View all users">Manage All</Link>
          </div>
          <div className="flex-1 p-6 space-y-4">
            {recentUsers?.length > 0 ? (
              recentUsers.map((user) => (
                <div key={user._id} className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center text-sm font-bold text-blue-600">
                    {user.name.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold truncate max-w-[120px]">{user.name}</p>
                    <p className="text-xs text-neutral-500 capitalize">{user.role}</p>
                  </div>
                  <div className="text-[10px] text-neutral-400">
                    {new Date(user.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-neutral-500 text-sm italic">
                No new users
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
