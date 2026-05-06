import { create } from 'zustand';
import axios from '@/lib/axios';

interface AdminState {
  stats: any;
  recentOrders: any[];
  recentUsers: any[];
  users: any[];
  sellers: any[];
  products: any[];
  orders: any[];
  reviews: any[];
  settings: any;
  analytics: any;
  loading: boolean;
  error: string | null;

  fetchStats: () => Promise<void>;
  fetchUsers: (role?: string) => Promise<void>;
  toggleBlockUser: (id: string) => Promise<void>;
  deleteUser: (id: string) => Promise<void>;
  fetchSellers: () => Promise<void>;
  approveSeller: (id: string, status: string) => Promise<void>;
  fetchProducts: () => Promise<void>;
  toggleProductApproval: (id: string) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  fetchOrders: () => Promise<void>;
  fetchReviews: () => Promise<void>;
  deleteReview: (id: string) => Promise<void>;
  fetchAnalytics: () => Promise<void>;
  fetchSettings: () => Promise<void>;
  updateSettings: (data: any) => Promise<void>;
}

export const useAdminStore = create<AdminState>((set, get) => ({
  stats: null,
  recentOrders: [],
  recentUsers: [],
  users: [],
  sellers: [],
  products: [],
  orders: [],
  reviews: [],
  settings: null,
  analytics: null,
  loading: false,
  error: null,

  fetchStats: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get('/api/admin/stats');
      set({ stats: data.stats, recentOrders: data.recentOrders, recentUsers: data.recentUsers, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to fetch stats', loading: false });
    }
  },

  fetchUsers: async (role) => {
    set({ loading: true, error: null });
    try {
      const url = role ? `/api/admin/users?role=${role}` : '/api/admin/users';
      const { data } = await axios.get(url);
      set({ users: data, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to fetch users', loading: false });
    }
  },

  toggleBlockUser: async (id) => {
    try {
      await axios.put(`/api/admin/users/${id}/block`);
      const { users } = get();
      set({
        users: users.map((u) => (u._id === id ? { ...u, isBlocked: !u.isBlocked } : u))
      });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to block user' });
    }
  },

  deleteUser: async (id) => {
    try {
      await axios.delete(`/api/admin/users/${id}`);
      const { users } = get();
      set({ users: users.filter((u) => u._id !== id) });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to delete user' });
    }
  },

  fetchSellers: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get('/api/admin/sellers');
      set({ sellers: data, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to fetch sellers', loading: false });
    }
  },

  approveSeller: async (id, status) => {
    try {
      await axios.put(`/api/admin/sellers/${id}/approve`, { status });
      const { sellers } = get();
      set({
        sellers: sellers.map((s) => (s._id === id ? { ...s, sellerStatus: status, isVerified: status === 'approved' } : s))
      });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to update seller status' });
    }
  },

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get('/api/admin/products');
      set({ products: data, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to fetch products', loading: false });
    }
  },

  toggleProductApproval: async (id) => {
    try {
      await axios.put(`/api/admin/products/${id}/approve`);
      const { products } = get();
      set({
        products: products.map((p) => (p._id === id ? { ...p, isApproved: !p.isApproved } : p))
      });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to update product approval' });
    }
  },

  deleteProduct: async (id) => {
    try {
      await axios.delete(`/api/admin/products/${id}`);
      const { products } = get();
      set({ products: products.filter((p) => p._id !== id) });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to delete product' });
    }
  },

  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get('/api/admin/orders');
      set({ orders: data, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to fetch orders', loading: false });
    }
  },

  fetchReviews: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get('/api/admin/reviews');
      set({ reviews: data, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to fetch reviews', loading: false });
    }
  },

  deleteReview: async (id) => {
    try {
      await axios.delete(`/api/admin/reviews/${id}`);
      const { reviews } = get();
      set({ reviews: reviews.filter((r) => r._id !== id) });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to delete review' });
    }
  },

  fetchAnalytics: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get('/api/admin/analytics');
      set({ analytics: data, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to fetch analytics', loading: false });
    }
  },

  fetchSettings: async () => {
    set({ loading: true, error: null });
    try {
      const { data } = await axios.get('/api/admin/settings');
      set({ settings: data, loading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to fetch settings', loading: false });
    }
  },

  updateSettings: async (settingsData) => {
    try {
      const { data } = await axios.put('/api/admin/settings', settingsData);
      set({ settings: data });
    } catch (err: any) {
      set({ error: err.response?.data?.message || 'Failed to update settings' });
    }
  }
}));
