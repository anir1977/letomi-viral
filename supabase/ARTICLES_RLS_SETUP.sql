-- ============================================
-- COMPLETE SETUP SCRIPT - Articles RLS Policies
-- ============================================
-- Safe to run multiple times (idempotent)
-- Execute in Supabase SQL Editor
-- https://lbyrkhqnhkmwywhwtlwe.supabase.co/project/_/sql

-- ============================================
-- STEP 1: ENABLE ROW LEVEL SECURITY
-- ============================================
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 2: DROP EXISTING POLICIES (Clean slate)
-- ============================================
-- Safe to run even if policies don't exist

DROP POLICY IF EXISTS "Public users can read published articles" ON articles;
DROP POLICY IF EXISTS "Admin users can insert articles" ON articles;
DROP POLICY IF EXISTS "Admin users can update articles" ON articles;
DROP POLICY IF EXISTS "Admin users can delete articles" ON articles;
DROP POLICY IF EXISTS "Admin users have full access to articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can insert articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can update articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can delete articles" ON articles;
DROP POLICY IF EXISTS "Authenticated users can read all articles" ON articles;

-- ============================================
-- STEP 3: CREATE RLS POLICIES
-- ============================================

-- Policy 1: Allow public to read PUBLISHED articles only
CREATE POLICY "Public users can read published articles"
  ON articles
  FOR SELECT
  TO public
  USING (status = 'published');

-- Policy 2: Allow authenticated users to read ALL articles (including drafts)
CREATE POLICY "Authenticated users can read all articles"
  ON articles
  FOR SELECT
  TO authenticated
  USING (true);

-- Policy 3: Allow authenticated users to INSERT new articles
-- This is CRITICAL for AI Writer and Article Editor to work
CREATE POLICY "Authenticated users can insert articles"
  ON articles
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy 4: Allow authenticated users to UPDATE articles
CREATE POLICY "Authenticated users can update articles"
  ON articles
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy 5: Allow authenticated users to DELETE articles
CREATE POLICY "Authenticated users can delete articles"
  ON articles
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- STEP 4: VERIFICATION QUERIES
-- ============================================

-- Display all policies for articles table
SELECT 
  schemaname, 
  tablename, 
  policyname,
  permissive,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE tablename = 'articles'
ORDER BY policyname;

-- Expected result: 5 policies
-- 1. Authenticated users can delete articles
-- 2. Authenticated users can insert articles
-- 3. Authenticated users can read all articles
-- 4. Authenticated users can update articles
-- 5. Public users can read published articles

-- Test RLS is enabled
SELECT 
  tablename,
  rowsecurity
FROM pg_tables
WHERE tablename = 'articles'
  AND schemaname = 'public';

-- Should return: rowsecurity = true

-- ============================================
-- RÉSULTAT ATTENDU
-- ============================================
-- ✅ RLS activé sur la table articles
-- ✅ 5 policies créées
-- ✅ Les utilisateurs authentifiés peuvent INSERT/UPDATE/DELETE
-- ✅ Le public peut seulement lire les articles publiés
-- ✅ Les admins/authenticated peuvent voir tous les articles (drafts inclus)
