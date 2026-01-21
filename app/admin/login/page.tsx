'use client';

import { useState, FormEvent, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { supabase, isSupabaseConfigured } from '@/lib/supabase/client';
import { checkSupabaseConfig, logSupabaseConfig } from '@/lib/supabase/config';
import { ShieldCheckIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [configStatus, setConfigStatus] = useState<{
    isConfigured: boolean;
    message: string;
  } | null>(null);

  useEffect(() => {
    // Check Supabase configuration on mount
    const status = checkSupabaseConfig();
    
    // Log configuration status to console for debugging
    logSupabaseConfig();
    
    if (!status.isConfigured) {
      setConfigStatus({
        isConfigured: false,
        message: 'Supabase authentication is not configured. Please contact the administrator.',
      });
    } else {
      setConfigStatus({
        isConfigured: true,
        message: 'Ready to authenticate',
      });
    }
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Block submission if Supabase is not configured
    if (!isSupabaseConfigured()) {
      setError('Cannot authenticate: Supabase is not configured. Please set environment variables in Vercel and redeploy.');
      setIsLoading(false);
      console.error('❌ Login blocked: Supabase not configured');
      return;
    }

    // Validate input
    if (!email || !password) {
      setError('Please enter both email and password.');
      setIsLoading(false);
      return;
    }

    console.log('🔐 Attempting login for:', email);

    try {
      const { data, error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      console.log('📝 Login response:', { 
        success: !!data.user, 
        userId: data.user?.id,
        error: authError?.message 
      });

      if (authError) {
        console.error('❌ Auth error:', authError);
        
        // Provide specific, user-friendly error messages
        if (authError.message.includes('Invalid login credentials')) {
          setError('Invalid email or password. Please check your credentials and try again.');
        } else if (authError.message.includes('Email not confirmed')) {
          setError('Please confirm your email address before logging in. Check your inbox for the confirmation email.');
        } else if (authError.message.includes('Email rate limit exceeded')) {
          setError('Too many login attempts. Please wait a few minutes and try again.');
        } else {
          setError(`Authentication failed: ${authError.message}`);
        }
        
        setIsLoading(false);
        return;
      }

      if (data.user) {
        console.log('✅ Login successful! User:', data.user.email);
        console.log('🔄 Redirecting to /admin...');
        
        // Successful login - redirect to admin dashboard
        router.push('/admin');
        router.refresh();
      } else {
        console.error('❌ No user data returned');
        setError('Authentication failed. Please try again.');
        setIsLoading(false);
      }
    } catch (err) {
      console.error('❌ Unexpected error during login:', err);
      setError('An unexpected error occurred. Please try again later.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-slate-900 dark:to-gray-800 px-4 py-12">
      <div className="max-w-md w-full">
        {/* Logo & Title */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-600 rounded-2xl shadow-2xl mb-6 transform hover:scale-105 transition-transform">
            <ShieldCheckIcon className="w-11 h-11 text-white" strokeWidth={2} />
          </div>
          <h1 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-3 tracking-tight">
            Admin Portal
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-base">
            Secure access to CurioSpark dashboard
          </p>
        </div>

        {/* Configuration Error - Blocks Login */}
        {configStatus && !configStatus.isConfigured && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-red-200 dark:border-red-800 backdrop-blur-sm">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full mb-4">
                <ExclamationTriangleIcon className="w-9 h-9 text-red-600 dark:text-red-400" strokeWidth={2} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                Configuration Required
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm leading-relaxed">
                {configStatus.message}
              </p>
              <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-xl border border-yellow-200 dark:border-yellow-800 text-left">
                <p className="text-xs font-semibold text-yellow-900 dark:text-yellow-200 mb-2">
                  For Administrators:
                </p>
                <ol className="text-xs text-yellow-800 dark:text-yellow-300 space-y-1 list-decimal list-inside">
                  <li>Go to Vercel Dashboard</li>
                  <li>Navigate to Project Settings → Environment Variables</li>
                  <li>Add: <code className="bg-yellow-100 dark:bg-yellow-900/40 px-1 rounded">NEXT_PUBLIC_SUPABASE_URL</code></li>
                  <li>Add: <code className="bg-yellow-100 dark:bg-yellow-900/40 px-1 rounded">NEXT_PUBLIC_SUPABASE_ANON_KEY</code></li>
                  <li>Redeploy the project</li>
                </ol>
              </div>
            </div>
          </div>
        )}

        {/* Login Form - Only shown when configured */}
        {configStatus?.isConfigured && (
          <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-100 dark:border-gray-700 backdrop-blur-sm">
            <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-4 bg-red-50 dark:bg-red-900/30 border-l-4 border-red-500 rounded-lg animate-shake">
                <div className="flex items-start">
                  <svg className="w-5 h-5 text-red-500 mt-0.5 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <p className="text-sm font-medium text-red-700 dark:text-red-400">{error}</p>
                </div>
              </div>
            )}

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoComplete="email"
                className="w-full px-4 py-3.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white dark:focus:bg-gray-700 transition-all outline-none"
                placeholder="Enter your email"
              />
            </div>

            {/* Password */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
                className="w-full px-4 py-3.5 border border-gray-300 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700/50 text-gray-900 dark:text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:bg-white dark:focus:bg-gray-700 transition-all outline-none"
                placeholder="Enter your password"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 px-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-700 hover:via-indigo-700 hover:to-purple-700 text-white rounded-xl font-semibold text-base shadow-lg hover:shadow-xl transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:hover:shadow-lg"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </span>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-100 dark:border-blue-800">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-xs text-blue-700 dark:text-blue-300 leading-relaxed">
                This is a secure admin area. All authentication is handled via encrypted Supabase Auth.
              </p>
            </div>
          </div>
        </div>
        )}

        {/* Back to Site */}
        <div className="mt-8 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm font-medium text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
          >
            <svg className="w-4 h-4 mr-2 transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to CurioSpark
          </Link>
        </div>
      </div>
    </div>
  );
}
