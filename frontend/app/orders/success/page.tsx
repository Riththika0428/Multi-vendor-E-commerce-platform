"use client";

import { useEffect, useState, use } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import axios from 'axios';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import { CheckCircle2, Package, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

export default function OrderSuccessPage() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const confirmPayment = async () => {
      if (orderId) {
        try {
          // In a real app, this would verify with Stripe or wait for webhook
          // For this demo, we call the /pay endpoint to simulate successful payment
          await axios.put(`http://localhost:5000/api/orders/${orderId}/pay`, {
             id: 'stripe_mock_id',
             status: 'succeeded',
             update_time: new Date().toISOString(),
             email_address: 'customer@example.com'
          }, { withCredentials: true });
        } catch (error) {
          console.error('Payment confirmation error:', error);
        }
      }
      setLoading(false);
    };
    confirmPayment();
  }, [orderId]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex items-center justify-center py-20">
        <div className="max-w-xl w-full px-4 text-center">
          {loading ? (
            <div className="flex flex-col items-center gap-6">
               <Loader2 className="w-16 h-16 text-indigo-600 animate-spin" />
               <h1 className="text-3xl font-black text-slate-900">Finalizing your order...</h1>
            </div>
          ) : (
            <div className="space-y-8">
              <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-10 shadow-xl shadow-green-100">
                <CheckCircle2 className="w-12 h-12 text-green-500" />
              </div>
              <h1 className="text-5xl font-black text-slate-900 tracking-tighter">Acquisition Successful</h1>
              <p className="text-xl text-slate-500 font-medium leading-relaxed">
                Your order <span className="text-slate-950 font-bold">#{orderId?.slice(-6).toUpperCase()}</span> has been confirmed. 
                The artisan has been notified and is preparing your artifact.
              </p>
              
              <div className="pt-10 flex flex-col md:flex-row gap-4">
                <Link href="/customer/dashboard" className="flex-1 py-5 bg-slate-900 text-white rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-indigo-600 transition-all shadow-xl flex items-center justify-center gap-2">
                  View My Orders <Package className="w-5 h-5" />
                </Link>
                <Link href="/products" className="flex-1 py-5 bg-white border border-slate-200 text-slate-900 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                  Continue Shopping <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
