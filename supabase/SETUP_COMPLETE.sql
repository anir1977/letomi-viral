-- ============================================
-- COMPLETE SETUP SCRIPT - Categories Table
-- ============================================
-- Safe to run multiple times (idempotent)
-- Execute in Supabase SQL Editor
-- https://lbyrkhqnhkmwywhwtlwe.supabase.co/project/_/sql

-- ============================================
-- STEP 1: CREATE CATEGORIES TABLE
-- ============================================
-- Creates the table if it doesn't exist
-- Includes all necessary fields for the application

CREATE TABLE IF NOT EXISTS categories (
  -- Primary key with automatic UUID generation
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Category information
  name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  icon TEXT DEFAULT '📁',
  color TEXT DEFAULT 'gray',
  
  -- Timestamps
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- ============================================
-- STEP 2: ENABLE ROW LEVEL SECURITY
-- ============================================
-- RLS must be enabled for security

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;

-- ============================================
-- STEP 3: DROP EXISTING POLICIES (if any)
-- ============================================
-- Safe to run even if policies don't exist

DROP POLICY IF EXISTS "Anyone can read categories" ON categories;
DROP POLICY IF EXISTS "Admin users can insert categories" ON categories;
DROP POLICY IF EXISTS "Admin users can update categories" ON categories;
DROP POLICY IF EXISTS "Admin users can delete categories" ON categories;
DROP POLICY IF EXISTS "Public can read categories" ON categories;
DROP POLICY IF EXISTS "Authenticated users can insert categories" ON categories;

-- ============================================
-- STEP 4: CREATE RLS POLICIES
-- ============================================

-- Policy 1: Allow public SELECT (read) access
-- This is CRITICAL for the AI Writer and frontend to work
CREATE POLICY "Public can read categories"
  ON categories
  FOR SELECT
  USING (true);

-- Policy 2: Allow authenticated users to INSERT new categories
-- Alternatively, restrict to admin email for production
CREATE POLICY "Authenticated users can insert categories"
  ON categories
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Policy 3: Allow authenticated users to UPDATE categories
-- Alternatively, restrict to admin email for production
CREATE POLICY "Authenticated users can update categories"
  ON categories
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policy 4: Allow authenticated users to DELETE categories
-- Alternatively, restrict to admin email for production
CREATE POLICY "Authenticated users can delete categories"
  ON categories
  FOR DELETE
  TO authenticated
  USING (true);

-- ============================================
-- STEP 5: SEED DEFAULT CATEGORIES
-- ============================================
-- Only inserts if categories don't already exist
-- Uses ON CONFLICT to prevent duplicates

INSERT INTO categories (name, slug, description, icon, color)
VALUES
  ('Science', 'science', 'Discoveries, research, and scientific breakthroughs', '🔬', 'blue'),
  ('Technology', 'technology', 'Latest tech news, gadgets, and innovations', '💻', 'purple'),
  ('History', 'history', 'Historical events, figures, and fascinating facts', '📜', 'amber'),
  ('Nature', 'nature', 'Wildlife, environment, and natural wonders', '🌿', 'green'),
  ('Space', 'space', 'Astronomy, space exploration, and the cosmos', '🚀', 'indigo'),
  ('Health', 'health', 'Health tips, medical breakthroughs, and wellness', '🏥', 'red'),
  ('Food', 'food', 'Culinary facts, recipes, and food history', '🍕', 'orange'),
  ('Animals', 'animals', 'Animal behavior, species, and wildlife', '🦁', 'yellow'),
  ('Culture', 'culture', 'Art, music, traditions, and cultural phenomena', '🎨', 'pink'),
  ('Sports', 'sports', 'Sports facts, records, and athletic achievements', '⚽', 'teal')
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- STEP 6: VERIFICATION QUERIES
-- ============================================
-- These SELECT statements will show you the results

-- Display all categories
SELECT 
  id,
  icon || ' ' || name as category,
  slug,
  color,
  created_at
FROM categories
ORDER BY name;

-- Show total count
SELECT COUNT(*) as total_categories FROM categories;

-- ============================================
-- RÉSULTAT ATTENDU
-- ============================================
-- Vous devriez voir 10 catégories listées
-- Si vous voyez déjà des catégories, c'est OK!
-- Les nouvelles ne seront pas insérées (ON CONFLICT DO NOTHING)
