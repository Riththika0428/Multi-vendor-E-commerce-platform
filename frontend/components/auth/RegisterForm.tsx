"use client";

import { useState } from 'react';
import api from '../../lib/axios';
import { useAuthStore } from '../../store/useAuthStore';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import GoogleAuthButton from '../GoogleAuthButton';
import { Loader2, Store, CreditCard, ShoppingBag, User } from 'lucide-react';

export default function RegisterForm() {
  const router = useRouter();
  const { authRole, closeAuthModal, setUser } = useAuthStore();
  const [formData, setFormData] = useState({ 
    name: '', 
    email: '', 
    password: '',
    storeName: '',
    bankDetails: {
      accountHolder: '',
      accountNumber: '',
      bankName: '',
    },
    productCategories: [] as string[]
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const categories = ['Tech', 'Fashion', 'Home', 'Beauty', 'Sports', 'Art'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.password) {
      setError('Please fill in all basic fields');
      return;
    }

    if (authRole === 'seller' && !formData.storeName) {
      setError('Store name is required for vendors');
      return;
    }
    
    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const endpoint = authRole === 'customer' ? '/auth/register/customer' : '/auth/register/seller';
      const response = await api.post(endpoint, formData);
      setUser(response.data);
      closeAuthModal();
      router.push(`/${response.data.role}/dashboard`);
    } catch (err: unknown) {
      setError((err as any).response?.data?.message || 'Failed to register');
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryToggle = (cat: string) => {
    setFormData(prev => ({
      ...prev,
      productCategories: prev.productCategories.includes(cat)
        ? prev.productCategories.filter(c => c !== cat)
        : [...prev.productCategories, cat]
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      {error && (
        <div className="p-3 text-sm text-red-600 bg-red-50 rounded-xl border border-red-100 animate-shake">
          {error}
        </div>
      )}

      {/* Personal Information */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-sm uppercase tracking-wider mb-2">
          <User className="w-4 h-4 text-indigo-600" />
          <span>Personal Information</span>
        </div>
        <div className="grid grid-cols-1 gap-4">
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Full Name</label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white outline-none transition-all"
              placeholder="e.g. Johnathan Doe"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Email Address</label>
            <input
              type="email"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white outline-none transition-all"
              placeholder="name@company.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Password</label>
            <input
              type="password"
              className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white outline-none transition-all"
              placeholder="••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            />
          </div>
        </div>
      </div>

      {/* Vendor Specific Information */}
      {authRole === 'seller' && (
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="space-y-6 pt-4 border-t border-slate-100"
        >
          {/* Store Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm uppercase tracking-wider">
              <Store className="w-4 h-4 text-indigo-600" />
              <span>Store Details</span>
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-500 mb-1 uppercase">Store Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white outline-none transition-all"
                placeholder="e.g. Minimalist Boutique"
                value={formData.storeName}
                onChange={(e) => setFormData({ ...formData, storeName: e.target.value })}
              />
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm uppercase tracking-wider">
              <ShoppingBag className="w-4 h-4 text-indigo-600" />
              <span>Product Categories</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {categories.map(cat => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleCategoryToggle(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold transition-all ${
                    formData.productCategories.includes(cat)
                      ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Bank Details */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-slate-900 font-bold text-sm uppercase tracking-wider">
              <CreditCard className="w-4 h-4 text-indigo-600" />
              <span>Payout Information</span>
            </div>
            <div className="grid grid-cols-1 gap-4">
              <input
                type="text"
                className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white outline-none transition-all"
                placeholder="Bank Name"
                value={formData.bankDetails.bankName}
                onChange={(e) => setFormData({ ...formData, bankDetails: { ...formData.bankDetails, bankName: e.target.value } })}
              />
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white outline-none transition-all"
                  placeholder="Account Number"
                  value={formData.bankDetails.accountNumber}
                  onChange={(e) => setFormData({ ...formData, bankDetails: { ...formData.bankDetails, accountNumber: e.target.value } })}
                />
                <input
                  type="text"
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl focus:ring-2 focus:ring-indigo-600 focus:bg-white outline-none transition-all"
                  placeholder="Account Holder"
                  value={formData.bankDetails.accountHolder}
                  onChange={(e) => setFormData({ ...formData, bankDetails: { ...formData.bankDetails, accountHolder: e.target.value } })}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed mt-4"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Initializing Account...
          </>
        ) : (
          `Register as ${authRole === 'seller' ? 'Vendor' : 'Shopper'}`
        )}
      </button>

      <div className="relative flex items-center py-2">
        <div className="flex-grow border-t border-slate-100"></div>
        <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-bold uppercase tracking-widest">Social Connect</span>
        <div className="flex-grow border-t border-slate-100"></div>
      </div>

      <GoogleAuthButton roleHint={authRole} />
    </form>
  );
}
