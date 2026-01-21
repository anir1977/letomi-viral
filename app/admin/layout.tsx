'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import AdminSidebar from './components/AdminSidebar';
import AdminTopBar from './components/AdminTopBar';
import { supabase } from '@/lib/supabase/client';
import { isAdminEmail } from '@/lib/admin-auth';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Check authentication using Supabase
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      const authenticated = !!session;
      const email = session?.user?.email || null;
      const admin = isAdminEmail(email);

      console.log('🔐 Auth check:', { authenticated, email, admin });

      setIsAuthenticated(authenticated);
      setUserEmail(email);
      setIsAdmin(admin);
      setIsLoading(false);

      // If not authenticated and not on login page, redirect
      if (!authenticated && pathname !== '/admin/login') {
        console.log('❌ Not authenticated, redirecting to login');
        router.push('/admin/login');
      } else if (authenticated && !admin && pathname !== '/admin/login') {
        // User is authenticated but not an admin
        console.log('⚠️ User authenticated but not admin:', email);
      }
    };

    checkAuth();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      const authenticated = !!session;
      const email = session?.user?.email || null;
      const admin = isAdminEmail(email);

      console.log('🔄 Auth state changed:', { authenticated, email, admin });

      setIsAuthenticated(authenticated);
      setUserEmail(email);
      setIsAdmin(admin);
      
      if (!authenticated && pathname !== '/admin/login') {
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

  // If authenticated but not admin, show access denied
  if (isAuthenticated && !isAdmin) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800">
        <div className="max-w-md w-full p-8 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl text-center border border-gray-100 dark:border-gray-700">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full mb-6">
            <svg className="w-10 h-10 text-red-600 dark:text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
            Access Denied
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            Your account ({userEmail}) does not have admin privileges.
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-500 mb-6">
            Please contact an administrator if you believe this is an error.
          </p>
          <button
            onClick={async () => {
              await supabase.auth.signOut();
              router.push('/admin/login');
            }}
            className="inline-block px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
          >
            Sign Out
          </button>
        </div>
      </div>
    );
  }

  // Render admin layout for authenticated admin users
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
