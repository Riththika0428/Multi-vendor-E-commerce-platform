"use client";

import CustomerGuard from '@/components/auth/CustomerGuard';
import Navbar from '@/components/landing/Navbar';
import Footer from '@/components/landing/Footer';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function CustomerDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <CustomerGuard>
      <div className="min-h-screen bg-[#fafbfc] flex flex-col relative overflow-hidden">
        {/* Universal Background Elements */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-indigo-50/50 rounded-full blur-[120px] -z-10" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-violet-50/50 rounded-full blur-[100px] -z-10" />
        
        <Navbar />
        
        <main className="flex-1 pt-32 pb-20 relative z-10">
          <div className="container mx-auto px-6">
            <div className="flex flex-col lg:flex-row gap-12">
              
              {/* Persistent Sidebar */}
              <DashboardSidebar />

              {/* Main Dynamic Content */}
              <div className="flex-1">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={pathname}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  >
                    {children}
                  </motion.div>
                </AnimatePresence>
              </div>

            </div>
          </div>
        </main>

        <Footer />
      </div>
    </CustomerGuard>
  );
}
