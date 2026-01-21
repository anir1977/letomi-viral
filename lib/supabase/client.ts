import { createClient } from '@supabase/supabase-js';
import type { Database } from '@/types/database';

/**
 * Supabase Client Configuration
 * 
 * This client is initialized with environment variables that MUST be set in Vercel:
 * - NEXT_PUBLIC_SUPABASE_URL: Your Supabase project URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY: Your Supabase anonymous/public key
 * 
 * SECURITY NOTE:
 * - Never hardcode credentials in this file
 * - All authentication is handled via Supabase Auth
 * - Environment variables are managed in Vercel Dashboard only
 * 
 * For local development:
 * - Create .env.local with the required variables
 * - .env.local is git-ignored for security
 */

// Retrieve environment variables
// These will be empty strings during build if not set, which is OK
// The actual validation happens at runtime in components
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

/**
 * Create Supabase client
 * 
 * Note: We provide fallback values for build-time compatibility.
 * The actual runtime validation is done in components before use.
 * This prevents build failures while maintaining security.
 */
export const supabase = createClient<Database>(
  supabaseUrl || 'https://build-time-placeholder.supabase.co',
  supabaseAnonKey || 'build-time-placeholder-key',
  {
    auth: {
      // Persist auth session in browser storage
      persistSession: true,
      // Automatically refresh tokens before expiry
      autoRefreshToken: true,
      // Use session storage for better security
      storage: typeof window !== 'undefined' ? window.localStorage : undefined,
    },
  }
);

/**
 * Helper function to check if Supabase is properly configured at runtime
 * Use this before making any Supabase calls in components
 * 
 * @returns true if environment variables are set, false otherwise
 */
export function isSupabaseConfigured(): boolean {
  return !!(
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    process.env.NEXT_PUBLIC_SUPABASE_URL.length > 10 &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY.length > 20
  );
}
