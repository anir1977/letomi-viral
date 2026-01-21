-- ============================================
-- CurioSpark Database Schema
-- ============================================
-- This SQL creates all necessary tables for the viral content website
-- Paste this into Supabase SQL Editor and run it

-- ============================================
-- 1. ARTICLES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  cover_image TEXT NOT NULL,
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',
  status TEXT NOT NULL CHECK (status IN ('draft', 'published')) DEFAULT 'draft',
  views INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug for faster lookups
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);

-- Create index on status for filtering
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);

-- Create index on category for filtering
CREATE INDEX IF NOT EXISTS idx_articles_category ON articles(category);

-- Create index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at DESC);

-- ============================================
-- 2. ARTICLE VIEWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS article_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on article_id for analytics
CREATE INDEX IF NOT EXISTS idx_article_views_article_id ON article_views(article_id);

-- Create index on created_at for time-based queries
CREATE INDEX IF NOT EXISTS idx_article_views_created_at ON article_views(created_at DESC);

-- ============================================
-- 3. TRIGGER: Auto-update updated_at
-- ============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- 4. FUNCTION: Increment article views
-- ============================================
CREATE OR REPLACE FUNCTION increment_article_views(article_uuid UUID)
RETURNS VOID AS $$
BEGIN
  -- Insert view record
  INSERT INTO article_views (article_id) VALUES (article_uuid);
  
  -- Increment counter
  UPDATE articles SET views = views + 1 WHERE id = article_uuid;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- DONE! 
-- ============================================
-- Next steps:
-- 1. Run this SQL in Supabase SQL Editor
-- 2. Run the RLS policies SQL (supabase_rls.sql)
-- 3. Your database is ready!
