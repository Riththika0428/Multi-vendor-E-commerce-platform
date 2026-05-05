"use client";

import { motion } from 'framer-motion';
import { UserPlus, Search, CreditCard, PackageCheck } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: "Instant Join",
    desc: "Single-click auth via Google. Zero friction, zero complex forms.",
    color: "bg-blue-600"
  },
  {
    icon: Search,
    title: "Smart Explore",
    desc: "Our engine learns what you love to curate your perfect feed.",
    color: "bg-indigo-600"
  },
  {
    icon: CreditCard,
    title: "Secure Checkout",
    desc: "Industry-standard encryption with full multi-vendor support.",
    color: "bg-violet-600"
  },
  {
    icon: PackageCheck,
    title: "Live Updates",
    desc: "Track every milestone from the seller store to your door.",
    color: "bg-fuchsia-600"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-32 bg-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-24 items-center">
          
          <div className="lg:w-1/3">
            <motion.div 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="px-4 py-1.5 rounded-full bg-slate-100 text-slate-500 text-[10px] font-black uppercase tracking-[0.3em] mb-6 inline-block"
            >
              The Process
            </motion.div>
            <motion.h2 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-5xl md:text-6xl font-black text-slate-900 leading-[1.1] tracking-tighter mb-8"
            >
              Beautifully <span className="text-indigo-600">Simpler.</span>
            </motion.h2>
            <p className="text-xl text-slate-500 font-medium leading-relaxed mb-10">
              We took everything complex about multi-vendor commerce and simplified it 
              into a beautiful 4-step journey. No clutter, just shopping.
            </p>
            <div className="flex items-center gap-4 p-4 rounded-3xl bg-slate-50 border border-slate-100">
              <div className="w-12 h-12 rounded-2xl bg-white flex items-center justify-center shadow-sm">
                <div className="w-5 h-5 rounded-full bg-indigo-600 animate-pulse" />
              </div>
              <p className="text-sm font-bold text-slate-900 uppercase tracking-widest">Active ecosystem monitoring</p>
            </div>
          </div>

          <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8 relative">
            {/* Visual connector line for desktop */}
            <div className="absolute top-1/2 left-0 w-full h-[1px] bg-slate-100 hidden sm:block -z-10" />
            <div className="absolute top-0 left-1/2 w-[1px] h-full bg-slate-100 hidden sm:block -z-10" />

            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: i * 0.1 }}
                className="relative p-10 rounded-[3rem] bg-white border border-slate-100 shadow-[0_20px_40px_-15px_rgba(0,0,0,0.03)] group hover:shadow-[0_40px_80px_-20px_rgba(0,0,0,0.08)] transition-all duration-500"
              >
                <div className={`w-16 h-16 ${step.color} text-white rounded-2xl flex items-center justify-center mb-8 shadow-xl shadow-slate-200 transform group-hover:scale-110 group-hover:rotate-12 transition-all duration-500`}>
                  <step.icon className="w-8 h-8" />
                </div>
                <div className="absolute top-10 right-10 text-4xl font-black text-slate-100 group-hover:text-slate-50 transition-colors">
                  0{i + 1}
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-4 tracking-tight">{step.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed group-hover:text-slate-600 transition-colors">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
