import { ShoppingBag, TrendingUp, ShieldCheck, ArrowRight, Star } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      {/* Navbar */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-6 h-6 text-indigo-600" />
            <span className="font-bold text-xl tracking-tight text-gray-900">MarketHub</span>
          </div>
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-600">
            <Link href="#features" className="hover:text-indigo-600 transition-colors">Features</Link>
            <Link href="#categories" className="hover:text-indigo-600 transition-colors">Categories</Link>
            <Link href="#sellers" className="hover:text-indigo-600 transition-colors">For Sellers</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/auth/login" className="text-sm font-medium text-gray-700 hover:text-indigo-600 transition-colors">Log In</Link>
            <Link href="/auth/customer-register" className="text-sm font-medium bg-indigo-600 text-white px-4 py-2 rounded-full hover:bg-indigo-700 transition-transform active:scale-95">Sign Up</Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-sm font-medium mb-8">
          <Star className="w-4 h-4 fill-indigo-600" />
          <span>The #1 Marketplace for Independent Creators</span>
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-gray-900 tracking-tight max-w-4xl leading-tight">
          Discover unique products from <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-purple-600">verified sellers</span>
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl">
          Shop millions of custom, handmade, and exclusive items. Support independent businesses while finding exactly what you need.
        </p>
        
        <div className="mt-10 flex flex-col sm:flex-row gap-4">
          <button className="flex items-center justify-center gap-2 px-8 py-4 bg-gray-900 text-white text-lg font-medium rounded-full hover:bg-gray-800 transition-all hover:scale-105 active:scale-95 shadow-lg shadow-gray-900/20">
            Start Shopping <ArrowRight className="w-5 h-5" />
          </button>
          <button className="flex items-center justify-center px-8 py-4 bg-white text-gray-900 border border-gray-200 text-lg font-medium rounded-full hover:bg-gray-50 transition-all hover:scale-105 active:scale-95 shadow-sm">
            Become a Seller
          </button>
        </div>

        {/* Feature Highlights */}
        <div className="mt-24 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
          {[
            { icon: TrendingUp, title: "Trending Items", desc: "Discover what's hot right now in our curated collections." },
            { icon: ShieldCheck, title: "Secure Checkout", desc: "Your payments are protected with our bank-level security." },
            { icon: ShoppingBag, title: "Multi-Vendor Support", desc: "Buy from multiple sellers in a single, seamless transaction." }
          ].map((feature, i) => (
            <div key={i} className="flex flex-col items-center text-center p-6 bg-white rounded-2xl shadow-sm border border-gray-100 transition-all hover:-translate-y-1 hover:shadow-md">
              <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center mb-4">
                <feature.icon className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
