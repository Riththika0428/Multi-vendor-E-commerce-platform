"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Loader2 } from 'lucide-react';

export default function CustomerGuard({ children }: { children: React.ReactNode }) {
  const { user, isLoading, checkAuth } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    const verifyAccess = async () => {
      // Re-verify auth on mount if needed
      if (!user) {
        await checkAuth();
      }
    };
    verifyAccess();
  }, [user, checkAuth]);

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.push('/'); // Redirect to landing if not logged in
      } else if (user.role !== 'customer') {
        router.push('/'); // Redirect if not customer (should probably go to their own dashboard)
      }
    }
  }, [user, isLoading, router]);

  if (isLoading || !user || user.role !== 'customer') {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <Loader2 className="w-10 h-10 text-indigo-600 animate-spin" />
      </div>
    );
  }

  return <>{children}</>;
}
