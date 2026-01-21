'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from './components/AdminSidebar';
import AdminTopBar from './components/AdminTopBar';
import { supabase } from '@/lib/supabase/client';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication using Supabase
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setIsAuthenticated(!!session);
      setIsLoading(false);

      // If not authenticated and not on login page, redirect
      if (!session && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    };

    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsAuthenticated(!!session);
      
      if (!session && pathname !== '/admin/login') {
        router.push('/admin/login');
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [router, pathname]);

  // Show loading state during auth check
  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-700 dark:text-gray-300 font-medium">Verifying authentication...</p>
        </div>
      </div>
    );
  }

  // If on login page, render without admin layout
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  // If not authenticated and not on login page, show nothing (redirect is happening)
  if (!isAuthenticated) {
    return null;
  }

  // Render admin layout for authenticated users
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <AdminTopBar />

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 dark:bg-gray-900 p-6">
          <div className="max-w-7xl mx-auto">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
