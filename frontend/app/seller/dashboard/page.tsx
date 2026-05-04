"use client";

import { useAuthStore } from '../../../store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function SellerDashboard() {
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
          <h1 className="text-3xl font-bold text-gray-900">Seller Dashboard</h1>
          <button 
            onClick={handleLogout}
            className="bg-red-50 text-red-600 px-4 py-2 rounded-lg font-medium hover:bg-red-100 transition-colors"
          >
            Logout
          </button>
        </div>
        
        <div className={`p-6 rounded-lg mb-6 ${user?.isVerified ? 'bg-green-50 border border-green-100' : 'bg-yellow-50 border border-yellow-100'}`}>
          <h2 className={`text-xl font-semibold mb-2 ${user?.isVerified ? 'text-green-900' : 'text-yellow-900'}`}>
            Store Status: {user?.isVerified ? 'Active & Verified' : 'Pending Verification'}
          </h2>
          <p className={`${user?.isVerified ? 'text-green-700' : 'text-yellow-800'}`}>
            {user?.isVerified 
              ? 'Your store is live! Customers can now view your products.' 
              : 'An admin needs to verify your account before you can list products.'}
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <div className="p-6 border border-gray-200 rounded-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-3xl font-bold text-indigo-600">0</h3>
              <p className="text-gray-500 font-medium mt-1">Active Products</p>
           </div>
           <div className="p-6 border border-gray-200 rounded-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-3xl font-bold text-indigo-600">0</h3>
              <p className="text-gray-500 font-medium mt-1">Total Sales</p>
           </div>
           <div className="p-6 border border-gray-200 rounded-xl flex flex-col justify-center items-center text-center">
              <h3 className="text-3xl font-bold text-indigo-600">$0.00</h3>
              <p className="text-gray-500 font-medium mt-1">Revenue</p>
           </div>
        </div>
      </div>
    </div>
  );
}
