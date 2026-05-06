import { create } from 'zustand';
import api from '../lib/axios';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'seller' | 'admin';
  isVerified: boolean;
  phone?: string;
  storeName?: string;
  storeDescription?: string;
  logo?: string;
  banner?: string;
  addresses?: Array<{
    address: string;
    city: string;
    postalCode: string;
    country: string;
    isDefault: boolean;
  }>;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
  // Modal State
  isAuthModalOpen: boolean;
  authRole: 'customer' | 'seller';
  authTab: 'login' | 'register';
  openAuthModal: (role: 'customer' | 'seller', tab: 'login' | 'register') => void;
  closeAuthModal: () => void;
  setAuthTab: (tab: 'login' | 'register') => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,
  
  // Modal State
  isAuthModalOpen: false,
  authRole: 'customer',
  authTab: 'login',

  openAuthModal: (role, tab) => set({ isAuthModalOpen: true, authRole: role, authTab: tab }),
  closeAuthModal: () => set({ isAuthModalOpen: false }),
  setAuthTab: (tab) => set({ authTab: tab }),

  setUser: (user) => set({ user, isLoading: false }),

  checkAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/auth/me');
      set({ user: response.data, isLoading: false });
    } catch {
      set({ user: null, isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await api.post('/auth/logout');
      set({ user: null, isLoading: false, error: null });
    } catch (error: unknown) {
      set({ error: (error as any).response?.data?.message || 'Logout failed', isLoading: false });
    }
  },
}));
