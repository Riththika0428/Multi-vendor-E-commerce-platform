"use client";

import { motion } from 'framer-motion';
import { Truck, ShieldCheck, ShoppingBag, TrendingUp } from 'lucide-react';

const features = [
  {
    icon: Truck,
    title: "Eco Fast Delivery",
    desc: "100% carbon neutral shipping that arrives faster than your expectations.",
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600"
  },
  {
    icon: ShieldCheck,
    title: "Buyer Promise",
    desc: "Not happy with your product? Get a full refund in 24 hours. No questions.",
    bgColor: "bg-emerald-50",
    iconColor: "text-emerald-600"
  },
  {
    icon: ShoppingBag,
    title: "Artisan Hubs",
    desc: "Connect directly with creators for custom, one-of-a-kind masterpieces.",
    bgColor: "bg-indigo-50",
    iconColor: "text-indigo-600"
  },
  {
    icon: TrendingUp,
    title: "Seller Tools Pro",
    desc: "Analytics, marketing, and logistics built-in. Scale without the headache.",
    bgColor: "bg-violet-50",
    iconColor: "text-violet-600"
  }
];

export default function Features() {
  return (
    <section className="py-24 bg-transparent relative">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <h2 className="text-sm font-black text-indigo-600 uppercase tracking-widest mb-4">Core Principles</h2>
          <h2 className="text-5xl font-black text-slate-900 leading-tight">Designed for the <span className="italic font-serif">modern human.</span></h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {features.map((feature, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                duration: 0.6, 
                delay: i * 0.1,
                type: "spring",
                stiffness: 100 
              }}
              whileHover={{ y: -10 }}
              className="p-10 rounded-[3rem] bg-white shadow-2xl shadow-slate-200/50 border border-slate-50 flex flex-col items-center text-center group"
            >
              <div className={`w-20 h-20 ${feature.bgColor} rounded-3xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform group-hover:rotate-6`}>
                <feature.icon className={`w-10 h-10 ${feature.iconColor}`} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-4">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed font-medium">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
