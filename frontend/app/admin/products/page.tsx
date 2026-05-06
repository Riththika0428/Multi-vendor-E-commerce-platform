'use client';

import React, { useEffect } from 'react';
import AdminTable from '@/components/admin/AdminTable';
import { useAdminStore } from '@/store/adminStore';
import { Eye, EyeOff, Trash2, Package, Tag } from 'lucide-react';
import toast from 'react-hot-toast';
import Image from 'next/image';

export default function ProductManagement() {
  const { products, fetchProducts, toggleProductApproval, deleteProduct, loading } = useAdminStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const handleToggleApproval = async (id: string) => {
    await toggleProductApproval(id);
    toast.success('Product visibility updated');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      await deleteProduct(id);
      toast.success('Product deleted');
    }
  };

  const columns = [
    {
      header: 'Product',
      accessor: (product: any) => (
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-neutral-100 dark:bg-neutral-800 relative overflow-hidden flex-shrink-0">
            {product.images && product.images[0] ? (
              <Image 
                src={product.images[0]} 
                alt={product.name} 
                fill 
                className="object-cover"
              />
            ) : (
              <Package className="w-6 h-6 text-neutral-400 absolute inset-0 m-auto" />
            )}
          </div>
          <div className="truncate max-w-[200px]">
            <p className="font-bold text-neutral-900 dark:text-white truncate">{product.name}</p>
            <p className="text-xs text-neutral-500 capitalize">{product.category}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Seller',
      accessor: (product: any) => (
        <div>
          <p className="text-sm font-medium">{product.vendor?.storeName || 'N/A'}</p>
          <p className="text-[10px] text-neutral-400">{product.vendor?.email}</p>
        </div>
      )
    },
    {
      header: 'Price',
      accessor: (product: any) => (
        <div className="font-bold text-neutral-900 dark:text-white">
          ${product.price}
        </div>
      )
    },
    {
      header: 'Stock',
      accessor: (product: any) => (
        <div className="flex items-center gap-2">
          <span className={`w-2 h-2 rounded-full ${product.stock > 10 ? 'bg-green-500' : product.stock > 0 ? 'bg-orange-500' : 'bg-red-500'}`}></span>
          <span className="text-sm">{product.stock} units</span>
        </div>
      )
    },
    {
      header: 'Visibility',
      accessor: (product: any) => (
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${product.isApproved ? 'bg-green-100 text-green-700' : 'bg-neutral-100 text-neutral-500'}`}>
          {product.isApproved ? 'Live' : 'Hidden'}
        </span>
      )
    }
  ];

  const actions = (product: any) => (
    <div className="flex items-center justify-end gap-2">
      <button 
        onClick={() => handleToggleApproval(product._id)}
        className={`p-2 rounded-lg transition-all ${product.isApproved ? 'bg-neutral-100 text-neutral-600 hover:bg-neutral-200' : 'bg-green-50 text-green-600 hover:bg-green-100'}`}
        title={product.isApproved ? 'Hide Product' : 'Approve Product'}
      >
        {product.isApproved ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
      </button>
      <button 
        onClick={() => handleDelete(product._id)}
        className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-all"
        title="Delete Product"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Tag className="w-6 h-6 text-orange-500" />
            Global Product Inventory
          </h1>
          <p className="text-neutral-500 text-sm mt-1">Monitor and moderate products across all vendors</p>
        </div>
      </div>

      <AdminTable 
        data={products} 
        columns={columns} 
        actions={actions}
        isLoading={loading}
        onSearch={(val) => console.log('Search:', val)}
        searchPlaceholder="Find products by name or category..."
      />
    </div>
  );
}
