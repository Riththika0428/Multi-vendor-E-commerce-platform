'use client';

import React, { useEffect } from 'react';
import AdminTable from '@/components/admin/AdminTable';
import { useAdminStore } from '@/store/adminStore';
import { Check, X, Store, ExternalLink } from 'lucide-react';
import toast from 'react-hot-toast';

export default function SellerManagement() {
  const { sellers, fetchSellers, approveSeller, loading } = useAdminStore();

  useEffect(() => {
    fetchSellers();
  }, [fetchSellers]);

  const handleApprove = async (id: string) => {
    await approveSeller(id, 'approved');
    toast.success('Seller approved');
  };

  const handleReject = async (id: string) => {
    if (window.confirm('Are you sure you want to reject this seller?')) {
      await approveSeller(id, 'rejected');
      toast.error('Seller rejected');
    }
  };

  const columns = [
    {
      header: 'Store',
      accessor: (seller: any) => (
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-indigo-50 dark:bg-indigo-900/10 flex items-center justify-center">
            <Store className="w-5 h-5 text-indigo-600" />
          </div>
          <div>
            <p className="font-bold text-neutral-900 dark:text-white">{seller.storeName || 'N/A'}</p>
            <p className="text-xs text-neutral-500">{seller.name}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Contact',
      accessor: (seller: any) => (
        <div className="text-xs">
          <p>{seller.email}</p>
          <p className="text-neutral-400 mt-0.5">{seller.phone || 'No phone'}</p>
        </div>
      )
    },
    {
      header: 'Status',
      accessor: (seller: any) => {
        const statuses = {
          pending: 'bg-orange-100 text-orange-700 border-orange-200',
          approved: 'bg-green-100 text-green-700 border-green-200',
          rejected: 'bg-red-100 text-red-700 border-red-200',
        };
        return (
          <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase border ${statuses[seller.sellerStatus as keyof typeof statuses] || statuses.pending}`}>
            {seller.sellerStatus || 'pending'}
          </span>
        );
      }
    },
    {
      header: 'Verification',
      accessor: (seller: any) => (
        <span className={`text-xs font-medium ${seller.isVerified ? 'text-green-500' : 'text-neutral-400'}`}>
          {seller.isVerified ? 'Verified' : 'Unverified'}
        </span>
      )
    }
  ];

  const actions = (seller: any) => (
    <div className="flex items-center justify-end gap-2">
      {seller.sellerStatus === 'pending' && (
        <>
          <button 
            onClick={() => handleApprove(seller._id)}
            className="p-2 bg-green-50 text-green-600 hover:bg-green-100 rounded-lg transition-all"
            title="Approve Seller"
          >
            <Check className="w-4 h-4" />
          </button>
          <button 
            onClick={() => handleReject(seller._id)}
            className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-all"
            title="Reject Seller"
          >
            <X className="w-4 h-4" />
          </button>
        </>
      )}
      <button className="p-2 bg-neutral-100 dark:bg-neutral-800 text-neutral-500 hover:text-neutral-700 rounded-lg transition-all">
        <ExternalLink className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Seller Management</h1>
          <p className="text-neutral-500 text-sm mt-1">Review and approve new vendor registrations</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="px-4 py-2 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl text-sm shadow-sm">
            Pending Approval: <span className="font-bold text-orange-500">{sellers.filter(s => s.sellerStatus === 'pending').length}</span>
          </div>
        </div>
      </div>

      <AdminTable 
        data={sellers} 
        columns={columns} 
        actions={actions}
        isLoading={loading}
        title="Vendor List"
        onSearch={(val) => console.log('Search:', val)}
        searchPlaceholder="Find store or owner..."
      />
    </div>
  );
}
