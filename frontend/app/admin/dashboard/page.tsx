"use client";

import { useAuthStore } from '../../../store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function AdminDashboard() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gray-900 p-8 text-gray-100">
      <div className="max-w-6xl mx-auto bg-gray-800 p-8 rounded-xl shadow-lg border border-gray-700">
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-gray-700">
          <div>
            <h1 className="text-3xl font-bold text-white">Admin Control Panel</h1>
            <p className="text-gray-400 mt-1">System Overview & Management</p>
          </div>
          <button 
            onClick={handleLogout}
            className="bg-red-500/10 text-red-400 border border-red-500/20 px-5 py-2.5 rounded-lg font-medium hover:bg-red-500/20 transition-colors"
          >
            Secure Logout
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <div className="p-6 bg-gray-900 rounded-xl border border-gray-700 flex flex-col justify-center items-center text-center">
              <h3 className="text-4xl font-black text-indigo-400">0</h3>
              <p className="text-gray-400 font-medium mt-2">Total Users</p>
           </div>
           <div className="p-6 bg-gray-900 rounded-xl border border-gray-700 flex flex-col justify-center items-center text-center">
              <h3 className="text-4xl font-black text-emerald-400">0</h3>
              <p className="text-gray-400 font-medium mt-2">Active Sellers</p>
           </div>
           <div className="p-6 bg-gray-900 rounded-xl border border-gray-700 flex flex-col justify-center items-center text-center">
              <h3 className="text-4xl font-black text-amber-400">0</h3>
              <p className="text-gray-400 font-medium mt-2">Pending Sellers</p>
           </div>
           <div className="p-6 bg-gray-900 rounded-xl border border-gray-700 flex flex-col justify-center items-center text-center">
              <h3 className="text-4xl font-black text-rose-400">0</h3>
              <p className="text-gray-400 font-medium mt-2">Reported Items</p>
           </div>
        </div>

        <div className="mt-8 bg-gray-900 rounded-xl border border-gray-700 p-6">
           <h2 className="text-xl font-bold text-white mb-4">Pending Seller Verifications</h2>
           <div className="text-gray-400 text-center py-12">
             No sellers pending verification at this time.
           </div>
        </div>
      </div>
    </div>
  );
}
