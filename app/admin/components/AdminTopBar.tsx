'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { 
  BellIcon, 
  MoonIcon, 
  SunIcon,
  ArrowRightOnRectangleIcon 
} from '@heroicons/react/24/outline';
import { supabase } from '@/lib/supabase/client';

export default function AdminTopBar() {
  const router = useRouter();
  const [darkMode, setDarkMode] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    // Get current user email
    const getUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user?.email) {
        setUserEmail(user.email);
      }
    };
    getUser();
  }, []);

  const handleLogout = async () => {
    // Sign out from Supabase
    await supabase.auth.signOut();
    
    // Redirect to login
    router.push('/admin/login');
    router.refresh();
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    // TODO: Implement dark mode toggle with localStorage
  };

  // Get initials from email
  const getInitials = (email: string | null) => {
    if (!email) return 'A';
    return email.charAt(0).toUpperCase();
  };

  return (
    <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6">
      {/* Left side - could add breadcrumbs here */}
      <div className="flex items-center space-x-4">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
      </div>

      {/* Right side - actions */}
      <div className="flex items-center space-x-4">
        {/* Dark mode toggle */}
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Toggle dark mode"
        >
          {darkMode ? (
            <SunIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          ) : (
            <MoonIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          )}
        </button>

        {/* Notifications */}
        <button
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors relative"
          aria-label="Notifications"
        >
          <BellIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Admin avatar */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
            <span className="text-white text-sm font-medium">{getInitials(userEmail)}</span>
          </div>
          {userEmail && (
            <div className="hidden md:block">
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Admin User
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {userEmail}
              </p>
            </div>
          )}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="Logout"
          title="Sign out"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
        </button>
      </div>
    </header>
  );
}
