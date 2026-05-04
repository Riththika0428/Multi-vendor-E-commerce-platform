"use client";

import { useAuthStore } from '../../../store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function CustomerDashboard() {
  const { user, logout } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
    router.push('/auth/login');
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-900">Customer Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors"
          >
            Logout
          </button>
        </div>
        
        <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-indigo-900 mb-2">Welcome back, {user?.name}!</h2>
          <p className="text-indigo-700">Email: {user?.email}</p>
          <p className="text-indigo-700">Role: <span className="uppercase font-bold">{user?.role}</span></p>
        </div>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
           <div className="p-6 border border-gray-200 rounded-xl">
              <h3 className="text-lg font-medium text-gray-900">Your Orders</h3>
              <p className="text-gray-500 mt-2">You have no pending orders.</p>
           </div>
           <div className="p-6 border border-gray-200 rounded-xl">
              <h3 className="text-lg font-medium text-gray-900">Saved Items</h3>
              <p className="text-gray-500 mt-2">You haven't saved any items yet.</p>
           </div>
        </div>
      </div>
    </div>
  );
}
