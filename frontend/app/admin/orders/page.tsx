'use client';

import React, { useEffect } from 'react';
import AdminTable from '@/components/admin/AdminTable';
import { useAdminStore } from '@/store/adminStore';
import { ShoppingBag, Search, Filter, Download } from 'lucide-react';

export default function OrderManagement() {
  const { orders, fetchOrders, loading } = useAdminStore();

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  const columns = [
    {
      header: 'Order Details',
      accessor: (order: any) => (
        <div className="flex flex-col">
          <span className="font-mono text-xs font-bold text-blue-600 uppercase">#{order._id.slice(-8)}</span>
          <span className="text-[10px] text-neutral-400 mt-0.5">{new Date(order.createdAt).toLocaleString()}</span>
        </div>
      )
    },
    {
      header: 'Customer',
      accessor: (order: any) => (
        <div>
          <p className="text-sm font-semibold">{order.user?.name || 'Guest'}</p>
          <p className="text-xs text-neutral-500">{order.user?.email || 'N/A'}</p>
        </div>
      )
    },
    {
      header: 'Items',
      accessor: (order: any) => (
        <div className="text-sm">
          {order.orderItems?.length} {order.orderItems?.length === 1 ? 'Item' : 'Items'}
        </div>
      )
    },
    {
      header: 'Total',
      accessor: (order: any) => (
        <div className="font-bold text-neutral-900 dark:text-white">
          ${order.totalPrice?.toFixed(2)}
        </div>
      )
    },
    {
      header: 'Status',
      accessor: (order: any) => {
        const statuses: any = {
          pending: 'bg-orange-100 text-orange-700',
          paid: 'bg-blue-100 text-blue-700',
          shipped: 'bg-indigo-100 text-indigo-700',
          delivered: 'bg-green-100 text-green-700',
          cancelled: 'bg-red-100 text-red-700',
        };
        return (
          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${statuses[order.status] || 'bg-neutral-100'}`}>
            {order.status}
          </span>
        );
      }
    },
    {
      header: 'Payment',
      accessor: (order: any) => (
        <span className={`text-xs font-medium ${order.isPaid ? 'text-green-600' : 'text-red-500'}`}>
          {order.isPaid ? 'Paid' : 'Unpaid'}
        </span>
      )
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-blue-600" />
            Platform Orders
          </h1>
          <p className="text-neutral-500 text-sm mt-1">Monitor all transactions across the platform</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-sm font-medium hover:bg-neutral-50 transition-all shadow-sm">
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      <AdminTable 
        data={orders} 
        columns={columns} 
        isLoading={loading}
        onSearch={(val) => console.log('Search:', val)}
        searchPlaceholder="Find by Order ID or Customer email..."
      />
    </div>
  );
}
