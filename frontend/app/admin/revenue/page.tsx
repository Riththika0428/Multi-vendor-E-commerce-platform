'use client';

import React, { useEffect } from 'react';
import AdminTable from '@/components/admin/AdminTable';
import { useAdminStore } from '@/store/adminStore';
import { DollarSign, TrendingUp, PieChart as PieChartIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import StatCard from '@/components/admin/StatCard';
import { RevenueTrendChart } from '@/components/admin/AdminCharts';

export default function RevenueManagement() {
  const { orders, stats, analytics, fetchOrders, fetchStats, fetchAnalytics, loading } = useAdminStore();

  useEffect(() => {
    fetchOrders();
    fetchStats();
    fetchAnalytics();
  }, [fetchOrders, fetchStats, fetchAnalytics]);

  // Basic commission logic for display: 10% of order total
  // In a real app, this would be calculated on the backend
  const platformCommission = (stats?.totalRevenue || 0) * 0.1;
  const sellerEarnings = (stats?.totalRevenue || 0) - platformCommission;

  const columns = [
    {
      header: 'Transaction ID',
      accessor: (order: any) => <span className="font-mono text-[10px] text-neutral-500">TRX-{order._id.slice(-10).toUpperCase()}</span>
    },
    {
      header: 'Date',
      accessor: (order: any) => new Date(order.paidAt || order.createdAt).toLocaleDateString()
    },
    {
      header: 'Gross Amount',
      accessor: (order: any) => <span className="font-semibold">${order.totalPrice.toFixed(2)}</span>
    },
    {
      header: 'Commission (10%)',
      accessor: (order: any) => <span className="text-blue-600 font-medium">+${(order.totalPrice * 0.1).toFixed(2)}</span>
    },
    {
      header: 'Seller Payout',
      accessor: (order: any) => <span className="text-neutral-600">${(order.totalPrice * 0.9).toFixed(2)}</span>
    },
    {
      header: 'Status',
      accessor: (order: any) => (
        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${order.isPaid ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'}`}>
          {order.isPaid ? 'Completed' : 'Pending'}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <DollarSign className="w-6 h-6 text-green-600" />
          Revenue & Commission
        </h1>
        <p className="text-neutral-500 text-sm mt-1">Track platform earnings and vendor payouts</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-1 space-y-6">
          <StatCard 
            title="Total Platform GMV" 
            value={`$${stats?.totalRevenue?.toLocaleString() || 0}`} 
            icon={TrendingUp} 
            color="blue"
            trend={{ value: 15, isUp: true }}
          />
          <StatCard 
            title="Estimated Commission" 
            value={`$${platformCommission.toLocaleString()}`} 
            icon={DollarSign} 
            color="green"
            trend={{ value: 12, isUp: true }}
          />
          <div className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm">
            <h3 className="text-sm font-medium text-neutral-500 mb-4 flex items-center gap-2">
              <PieChartIcon className="w-4 h-4" />
              Earnings Breakdown
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Seller Share (90%)</span>
                  <span className="font-bold">${sellerEarnings.toLocaleString()}</span>
                </div>
                <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-500 h-full w-[90%]"></div>
                </div>
              </div>
              <div>
                <div className="flex items-center justify-between text-sm mb-1">
                  <span>Platform Fee (10%)</span>
                  <span className="font-bold text-green-600">${platformCommission.toLocaleString()}</span>
                </div>
                <div className="w-full bg-neutral-100 dark:bg-neutral-800 h-2 rounded-full overflow-hidden">
                  <div className="bg-green-500 h-full w-[10%]"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-2 bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-neutral-200 dark:border-neutral-800 shadow-sm h-full">
          <h3 className="font-bold mb-6">Revenue Growth</h3>
          <RevenueTrendChart data={analytics?.revenueData || []} />
          
          <div className="mt-8 grid grid-cols-2 gap-4">
             <div className="p-4 bg-green-50 dark:bg-green-900/10 rounded-xl border border-green-100 dark:border-green-900/20">
                <p className="text-xs text-green-600 font-medium">Daily Avg Revenue</p>
                <div className="flex items-center justify-between mt-1">
                   <p className="text-xl font-bold">$1,240</p>
                   <ArrowUpRight className="w-4 h-4 text-green-600" />
                </div>
             </div>
             <div className="p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/20">
                <p className="text-xs text-blue-600 font-medium">Monthly Projection</p>
                <div className="flex items-center justify-between mt-1">
                   <p className="text-xl font-bold">$38,500</p>
                   <ArrowUpRight className="w-4 h-4 text-blue-600" />
                </div>
             </div>
          </div>
        </div>
      </div>

      <AdminTable 
        data={orders} 
        columns={columns} 
        isLoading={loading}
        title="Transaction History"
        onSearch={(val) => console.log('Search:', val)}
        searchPlaceholder="Find by transaction ID..."
      />
    </div>
  );
}
