"use client";

import { useEffect, useState, use } from 'react';
import axios from 'axios';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import ProductDetail from '@/components/customer/ProductDetail';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const { data } = await axios.get(`http://localhost:5000/api/products/${id}`);
        setProduct(data);
      } catch (error) {
        console.error(error);
      }
      setLoading(false);
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar />
      
      <main className="flex-1 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <Link href="/products" className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-600 font-bold mb-10 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Browse
          </Link>

          {loading ? (
             <div className="animate-pulse grid lg:grid-cols-2 gap-16">
                <div className="aspect-square bg-slate-50 rounded-[3rem]" />
                <div className="space-y-6">
                   <div className="h-10 bg-slate-50 rounded-2xl w-3/4" />
                   <div className="h-40 bg-slate-50 rounded-2xl" />
                   <div className="h-20 bg-slate-50 rounded-2xl" />
                </div>
             </div>
          ) : product ? (
            <ProductDetail product={product} />
          ) : (
            <div className="text-center py-40">
               <h2 className="text-4xl font-black text-slate-900">Product Not Found</h2>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
