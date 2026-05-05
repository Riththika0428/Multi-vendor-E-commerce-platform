"use client";

import Navbar from '../components/landing/Navbar';
import Hero from '../components/landing/Hero';
import Features from '../components/landing/Features';
import Categories from '../components/landing/Categories';
import HowItWorks from '../components/landing/HowItWorks';
import Footer from '../components/landing/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col font-sans relative overflow-x-hidden">
      {/* Aurora Background Blobs */}
      <div className="fixed top-0 left-0 w-full h-full -z-10 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-100 rounded-full blur-[120px] opacity-60 animate-pulse" />
        <div className="absolute bottom-[10%] right-[-5%] w-[35%] h-[35%] bg-blue-50 rounded-full blur-[100px] opacity-70" />
        <div className="absolute top-[20%] right-[10%] w-[25%] h-[25%] bg-violet-50 rounded-full blur-[110px] opacity-50" />
      </div>

      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <Categories />
        <HowItWorks />
      </main>
      <Footer showCTA={true} />
    </div>
  );
}

