'use client';

import React, { useEffect, useState } from 'react';
import AdminTable from '@/components/admin/AdminTable';
import { useAdminStore } from '@/store/adminStore';
import { Ban, Trash2, CheckCircle, Shield } from 'lucide-react';
import toast from 'react-hot-toast';

export default function UserManagement() {
  const { users, fetchUsers, toggleBlockUser, deleteUser, loading } = useAdminStore();
  const [roleFilter, setRoleFilter] = useState('');

  useEffect(() => {
    fetchUsers(roleFilter);
  }, [fetchUsers, roleFilter]);

  const handleToggleBlock = async (id: string) => {
    await toggleBlockUser(id);
    toast.success('User status updated');
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      await deleteUser(id);
      toast.success('User deleted');
    }
  };

  const columns = [
    {
      header: 'User',
      accessor: (user: any) => (
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-bold text-xs uppercase">
            {user.name.charAt(0)}
          </div>
          <div>
            <p className="font-medium">{user.name}</p>
            <p className="text-xs text-neutral-500">{user.email}</p>
          </div>
        </div>
      )
    },
    {
      header: 'Role',
      accessor: (user: any) => (
        <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase ${
          user.role === 'admin' ? 'bg-purple-100 text-purple-700' : 
          user.role === 'seller' ? 'bg-blue-100 text-blue-700' : 'bg-neutral-100 text-neutral-700'
        }`}>
          {user.role}
        </span>
      )
    },
    {
      header: 'Status',
      accessor: (user: any) => (
        <span className={`flex items-center gap-1.5 ${user.isBlocked ? 'text-red-500' : 'text-green-500'}`}>
          {user.isBlocked ? <Ban className="w-3.5 h-3.5" /> : <CheckCircle className="w-3.5 h-3.5" />}
          <span className="text-xs font-medium">{user.isBlocked ? 'Blocked' : 'Active'}</span>
        </span>
      )
    },
    {
      header: 'Joined',
      accessor: (user: any) => new Date(user.createdAt).toLocaleDateString()
    }
  ];

  const actions = (user: any) => (
    <div className="flex items-center justify-end gap-2">
      <button 
        onClick={() => handleToggleBlock(user._id)}
        className={`p-2 rounded-lg transition-colors ${
          user.isBlocked 
            ? 'bg-green-50 text-green-600 hover:bg-green-100' 
            : 'bg-orange-50 text-orange-600 hover:bg-orange-100'
        }`}
        title={user.isBlocked ? 'Unblock User' : 'Block User'}
      >
        {user.isBlocked ? <CheckCircle className="w-4 h-4" /> : <Ban className="w-4 h-4" />}
      </button>
      <button 
        onClick={() => handleDelete(user._id)}
        className="p-2 bg-red-50 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
        title="Delete User"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="w-6 h-6 text-blue-600" />
            User Management
          </h1>
          <p className="text-neutral-500 text-sm mt-1">Manage and moderate all platform users</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-xl p-1 shadow-sm font-medium">
            <button 
              onClick={() => setRoleFilter('')}
              className={`px-4 py-1.5 text-xs rounded-lg transition-all ${!roleFilter ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500'}`}
            >
              All
            </button>
            <button 
              onClick={() => setRoleFilter('customer')}
              className={`px-4 py-1.5 text-xs rounded-lg transition-all ${roleFilter === 'customer' ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500'}`}
            >
              Customers
            </button>
            <button 
              onClick={() => setRoleFilter('seller')}
              className={`px-4 py-1.5 text-xs rounded-lg transition-all ${roleFilter === 'seller' ? 'bg-neutral-900 text-white' : 'hover:bg-neutral-100 dark:hover:bg-neutral-800 text-neutral-500'}`}
            >
              Sellers
            </button>
          </div>
        </div>
      </div>

      <AdminTable 
        data={users} 
        columns={columns} 
        actions={actions}
        isLoading={loading}
        onSearch={(val) => console.log('Search:', val)}
        searchPlaceholder="Find by name or email..."
      />
    </div>
  );
}
