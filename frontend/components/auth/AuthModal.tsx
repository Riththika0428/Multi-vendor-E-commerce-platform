"use client";

import { useEffect } from 'react';
import { useAuthStore } from '../../store/useAuthStore';
import { X } from 'lucide-react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

export default function AuthModal() {
  const { isAuthModalOpen, authRole, authTab, closeAuthModal, setAuthTab } = useAuthStore();

  useEffect(() => {
    if (isAuthModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isAuthModalOpen]);

  if (!isAuthModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
      <div 
        className="absolute inset-0" 
        onClick={closeAuthModal}
      />
      <div className="relative bg-white w-full max-w-md rounded-2xl shadow-xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
          <h2 className="text-xl font-bold text-gray-900 capitalize">
            {authRole} {authTab === 'login' ? 'Login' : 'Registration'}
          </h2>
          <button 
            onClick={closeAuthModal}
            className="p-2 -mr-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-100">
          <button
            onClick={() => setAuthTab('login')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              authTab === 'login' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Log In
          </button>
          <button
            onClick={() => setAuthTab('register')}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              authTab === 'register' 
                ? 'text-indigo-600 border-b-2 border-indigo-600 bg-indigo-50/30' 
                : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
            }`}
          >
            Sign Up
          </button>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto">
          {authTab === 'login' ? <LoginForm /> : <RegisterForm />}
        </div>
      </div>
    </div>
  );
}
