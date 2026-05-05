"use client";

import { motion } from 'framer-motion';
import { UserPlus, Search, CreditCard, PackageCheck } from 'lucide-react';

const steps = [
  {
    icon: UserPlus,
    title: "Instant Join",
    desc: "Single-click auth via Google. Zero friction, zero complex forms."
  },
  {
    icon: Search,
    title: "Smart Explore",
    desc: "Our engine learns what you love to curate your perfect feed."
  },
  {
    icon: CreditCard,
    title: "Secure Checkout",
    desc: "Industry-standard encryption with full multi-vendor support."
  },
  {
    icon: PackageCheck,
    title: "Live Updates",
    desc: "Track every milestone from the seller store to your door."
  }
];

export default function HowItWorks() {
  return (
    <section className="py-32 bg-slate-50/50">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-20 items-center">
          <div className="md:w-1/3">
            <h2 className="text-sm font-black text-indigo-600 uppercase tracking-widest mb-4">The Workflow</h2>
            <h2 className="text-5xl font-black text-slate-900 leading-tight mb-8">
              Beautifully <br /> <span className="text-slate-400 font-serif italic">Simple.</span>
            </h2>
            <p className="text-lg text-slate-500 font-medium leading-relaxed">
              We took everything complex about multi-vendor commerce and simplified it 
              into a beautiful 4-step journey. No clutter, just shopping.
            </p>
          </div>

          <div className="md:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {steps.map((step, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 rounded-[2.5rem] bg-white shadow-xl shadow-slate-200/30 border border-slate-100 group"
              >
                <div className="w-14 h-14 bg-indigo-600 text-white rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-indigo-100 group-hover:rotate-12 transition-transform">
                  <step.icon className="w-7 h-7" />
                </div>
                <h3 className="text-2xl font-black text-slate-900 mb-3">{step.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
