import { create } from 'zustand';
import axios from 'axios';

interface CartItem {
  product: {
    _id: string;
    name: string;
    price: number;
    images: string[];
    stock: number;
  };
  qty: number;
  price: number;
}

interface CartState {
  cartItems: CartItem[];
  totalPrice: number;
  loading: boolean;
  error: string | null;
  fetchCart: () => Promise<void>;
  addItem: (productId: string, qty: number) => Promise<void>;
  removeItem: (productId: string) => Promise<void>;
  clearCart: () => void;
}

const API_URL = 'http://localhost:5000/api/cart';

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],
  totalPrice: 0,
  loading: false,
  error: null,

  fetchCart: async () => {
    set({ loading: true });
    try {
      const { data } = await axios.get(API_URL, { withCredentials: true });
      set({ cartItems: data.items, totalPrice: data.totalPrice, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to fetch cart', loading: false });
    }
  },

  addItem: async (productId: string, qty: number) => {
    set({ loading: true });
    try {
      const { data } = await axios.post(API_URL, { productId, qty }, { withCredentials: true });
      set({ cartItems: data.items, totalPrice: data.totalPrice, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to add item', loading: false });
    }
  },

  removeItem: async (productId: string) => {
    set({ loading: true });
    try {
      const { data } = await axios.delete(`${API_URL}/${productId}`, { withCredentials: true });
      set({ cartItems: data.items, totalPrice: data.totalPrice, loading: false });
    } catch (error: any) {
      set({ error: error.response?.data?.message || 'Failed to remove item', loading: false });
    }
  },

  clearCart: () => {
    set({ cartItems: [], totalPrice: 0 });
  }
}));
