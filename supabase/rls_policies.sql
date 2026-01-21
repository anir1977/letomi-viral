-- ============================================
-- CurioSpark Row Level Security (RLS) Policies
-- ============================================
-- Run this AFTER creating the schema
-- This ensures proper access control for public and admin users

-- ============================================
-- 1. ENABLE RLS ON ALL TABLES
-- ============================================
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE article_views ENABLE ROW LEVEL SECURITY;

-- ============================================
-- 2. ARTICLES TABLE POLICIES
-- ============================================

-- Public users can READ only published articles
CREATE POLICY "Public users can read published articles"
  ON articles
  FOR SELECT
  USING (status = 'published');

-- Admin users can INSERT articles
-- Note: Replace 'admin@curiospark.org' with your actual admin email
CREATE POLICY "Admin users can insert articles"
  ON articles
  FOR INSERT
  WITH CHECK (
    auth.jwt() ->> 'email' = 'yuba1977@gmail.com'
  );

-- Admin users can UPDATE articles
CREATE POLICY "Admin users can update articles"
  ON articles
  FOR UPDATE
  USING (
    auth.jwt() ->> 'email' = 'yuba1977@gmail.com'
  );

-- Admin users can DELETE articles
CREATE POLICY "Admin users can delete articles"
  ON articles
  FOR DELETE
  USING (
    auth.jwt() ->> 'email' = 'yuba1977@gmail.com'
  );

-- ============================================
-- 3. ARTICLE_VIEWS TABLE POLICIES
-- ============================================

-- Public users can INSERT view records (for tracking)
CREATE POLICY "Anyone can track article views"
  ON article_views
  FOR INSERT
  WITH CHECK (true);

-- Admin users can READ all view records (for analytics)
CREATE POLICY "Admin users can read all views"
  ON article_views
  FOR SELECT
  USING (
    auth.jwt() ->> 'email' = 'yuba1977@gmail.com'
  );

-- ============================================
-- ALTERNATIVE: Role-Based Policies (Recommended for production)
-- ============================================
-- If you want to use user roles instead of hardcoded emails,
-- uncomment and use these policies instead:

/*
-- First, create a custom claim for user roles
-- You'll need to set this in your Supabase Auth settings or with a database trigger

-- Public users can READ only published articles
CREATE POLICY "Public users can read published articles"
  ON articles
  FOR SELECT
  USING (status = 'published');

-- Admin users can do everything on articles
CREATE POLICY "Admin users have full access to articles"
  ON articles
  FOR ALL
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );

-- Public can track views
CREATE POLICY "Anyone can track article views"
  ON article_views
  FOR INSERT
  WITH CHECK (true);

-- Admin can read all views
CREATE POLICY "Admin users can read all views"
  ON article_views
  FOR SELECT
  USING (
    (auth.jwt() -> 'user_metadata' ->> 'role') = 'admin'
  );
*/

-- ============================================
-- DONE! 
-- ============================================
-- Your RLS policies are now active.
-- 
-- To test:
-- 1. Sign in as yuba1977@gmail.com to perform admin operations
-- 2. Unauthenticated users can only read published articles
-- 3. Anyone can track views (important for analytics)
-- 
-- Security is properly configured for production! 🔒
