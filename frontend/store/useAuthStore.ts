import { create } from 'zustand';
import api from '../lib/axios';

interface User {
  _id: string;
  name: string;
  email: string;
  role: 'customer' | 'seller' | 'admin';
  isVerified: boolean;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  checkAuth: () => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isLoading: true,
  error: null,
  
  setUser: (user) => set({ user, isLoading: false }),

  checkAuth: async () => {
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/auth/me');
      set({ user: response.data, isLoading: false });
    } catch (error) {
      set({ user: null, isLoading: false });
    }
  },

  logout: async () => {
    set({ isLoading: true });
    try {
      await api.post('/auth/logout');
      set({ user: null, isLoading: false, error: null });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Logout failed', isLoading: false });
    }
  },
}));
