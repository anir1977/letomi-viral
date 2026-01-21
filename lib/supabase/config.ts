/**
 * Supabase Configuration Validator
 * 
 * This utility provides runtime validation for Supabase environment variables.
 * It ensures the app only connects to Supabase when properly configured.
 * 
 * IMPORTANT: Environment variables must be set in Vercel Dashboard:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - NEXT_PUBLIC_SUPABASE_ANON_KEY
 */

/**
 * Interface for Supabase configuration status
 */
export interface SupabaseConfigStatus {
  isConfigured: boolean;
  url: string | null;
  hasKey: boolean;
  errors: string[];
}

/**
 * Check if Supabase environment variables are properly configured
 * 
 * This function performs runtime validation of required environment variables.
 * It's designed to work in both build-time and runtime environments.
 * 
 * @returns Configuration status object
 */
export function checkSupabaseConfig(): SupabaseConfigStatus {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  
  const errors: string[] = [];
  
  // Check if URL is missing or invalid
  if (!url) {
    errors.push('NEXT_PUBLIC_SUPABASE_URL is not set');
  } else if (url.length < 10) {
    errors.push('NEXT_PUBLIC_SUPABASE_URL appears to be invalid');
  } else if (!url.startsWith('http')) {
    errors.push('NEXT_PUBLIC_SUPABASE_URL must start with http:// or https://');
  }
  
  // Check if key is missing or invalid
  if (!key) {
    errors.push('NEXT_PUBLIC_SUPABASE_ANON_KEY is not set');
  } else if (key.length < 20) {
    errors.push('NEXT_PUBLIC_SUPABASE_ANON_KEY appears to be invalid');
  }
  
  return {
    isConfigured: errors.length === 0,
    url: url || null,
    hasKey: !!key && key.length >= 20,
    errors,
  };
}

/**
 * Log Supabase configuration status to console
 * Useful for debugging authentication issues
 */
export function logSupabaseConfig(): void {
  const status = checkSupabaseConfig();
  
  console.group('🔍 Supabase Configuration Check');
  
  if (status.isConfigured) {
    console.log('✅ Status: Configured');
    console.log('📍 URL:', status.url);
    console.log('🔑 Key: Present');
  } else {
    console.error('❌ Status: NOT Configured');
    console.error('📍 URL:', status.url || 'Missing');
    console.error('🔑 Key:', status.hasKey ? 'Present' : 'Missing');
    console.error('⚠️ Errors:');
    status.errors.forEach(error => console.error(`   - ${error}`));
    console.error('\n📖 To fix this:');
    console.error('   1. Go to Vercel Dashboard');
    console.error('   2. Project Settings → Environment Variables');
    console.error('   3. Add: NEXT_PUBLIC_SUPABASE_URL');
    console.error('   4. Add: NEXT_PUBLIC_SUPABASE_ANON_KEY');
    console.error('   5. Redeploy the project');
  }
  
  console.groupEnd();
}

/**
 * Get user-friendly error message for missing Supabase configuration
 */
export function getSupabaseConfigError(): string | null {
  const status = checkSupabaseConfig();
  
  if (status.isConfigured) {
    return null;
  }
  
  return 'Supabase is not configured. Please contact the administrator to set up environment variables in Vercel.';
}
