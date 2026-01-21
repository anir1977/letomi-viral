/**
 * Admin Authorization Configuration
 * 
 * This file defines who has admin access to the CurioSpark admin panel.
 * Only users with emails in this list can access admin features.
 */

/**
 * List of authorized admin email addresses
 * Add or remove emails to control admin access
 */
export const ADMIN_EMAILS = [
  'yuba1977@gmail.com',
  // Add more admin emails here as needed
  // 'admin@curiospark.org',
  // 'editor@curiospark.org',
];

/**
 * Check if a given email has admin privileges
 * @param email - The email address to check
 * @returns true if the email is in the admin list
 */
export function isAdminEmail(email: string | null | undefined): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}

/**
 * Check if a user object has admin privileges
 * @param user - Supabase user object
 * @returns true if the user is an admin
 */
export function isAdminUser(user: { email?: string | null } | null): boolean {
  return isAdminEmail(user?.email);
}
