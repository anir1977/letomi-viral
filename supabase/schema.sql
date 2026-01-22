-- ============================================
-- CurioSpark Database Schema - PRODUCTION READY
-- ============================================
-- Complete viral content platform with SEO, analytics, and images
-- Paste this into Supabase SQL Editor and run it

-- ============================================
-- 1. CATEGORIES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT,
  color TEXT DEFAULT '#3B82F6',
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on slug
CREATE INDEX IF NOT EXISTS idx_categories_slug ON categories(slug);

-- Insert default categories
INSERT INTO categories (name, slug, icon, color, description) VALUES
  ('Science', 'science', '🔬', '#8B5CF6', 'Discover amazing scientific facts and breakthroughs'),
  ('Technology', 'technology', '💻', '#3B82F6', 'Latest tech trends and innovations'),
  ('Food', 'food', '🍕', '#EF4444', 'Culinary adventures and food history'),
  ('Animals', 'animals', '🐾', '#10B981', 'Fascinating animal facts and wildlife'),
  ('Lifestyle', 'lifestyle', '✨', '#F59E0B', 'Life hacks and interesting lifestyle topics'),
  ('History', 'history', '📜', '#6366F1', 'Historical events and fascinating stories'),
  ('Health', 'health', '💊', '#EC4899', 'Health tips and medical discoveries'),
  ('Travel', 'travel', '✈️', '#14B8A6', 'Amazing places and travel stories')
ON CONFLICT (name) DO NOTHING;

-- ============================================
-- 2. ARTICLES TABLE (ENHANCED)
-- ============================================
CREATE TABLE IF NOT EXISTS articles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  
  -- Content
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  
  -- Categorization
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  tags TEXT[] DEFAULT '{}',
  
  -- Images
  cover_image_url TEXT,
  
  -- SEO
  seo_title TEXT,
  seo_description TEXT,
  keywords TEXT[] DEFAULT '{}',
  
  -- Metadata
  author_id UUID,
  status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'scheduled')) DEFAULT 'draft',
  
  -- Analytics
  views INTEGER NOT NULL DEFAULT 0,
  
  -- Dates
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  published_at TIMESTAMP WITH TIME ZONE,
  scheduled_for TIMESTAMP WITH TIME ZONE
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_articles_slug ON articles(slug);
CREATE INDEX IF NOT EXISTS idx_articles_status ON articles(status);
CREATE INDEX IF NOT EXISTS idx_articles_category_id ON articles(category_id);
CREATE INDEX IF NOT EXISTS idx_articles_created_at ON articles(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_published_at ON articles(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_articles_views ON articles(views DESC);

-- ============================================
-- 3. ARTICLE IMAGES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS article_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  source TEXT CHECK (source IN ('ai', 'unsplash', 'pexels', 'custom')) DEFAULT 'ai',
  alt_text TEXT NOT NULL,
  position INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on article_id
CREATE INDEX IF NOT EXISTS idx_article_images_article_id ON article_images(article_id);

-- ============================================
-- 4. ARTICLE VIEWS TABLE (ANALYTICS)
-- ============================================
CREATE TABLE IF NOT EXISTS article_views (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Indexes for analytics
CREATE INDEX IF NOT EXISTS idx_article_views_article_id ON article_views(article_id);
CREATE INDEX IF NOT EXISTS idx_article_views_created_at ON article_views(created_at DESC);

-- ============================================
-- 5. ANALYTICS DAILY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS analytics_daily (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL UNIQUE,
  page_views INTEGER DEFAULT 0,
  unique_visitors INTEGER DEFAULT 0,
  source_google INTEGER DEFAULT 0,
  source_social INTEGER DEFAULT 0,
  source_direct INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on date
CREATE INDEX IF NOT EXISTS idx_analytics_daily_date ON analytics_daily(date DESC);

-- ============================================
-- 6. RELATED ARTICLES TABLE (for viral features)
-- ============================================
CREATE TABLE IF NOT EXISTS article_relations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  related_article_id UUID NOT NULL REFERENCES articles(id) ON DELETE CASCADE,
  relevance_score FLOAT DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(article_id, related_article_id)
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_article_relations_article_id ON article_relations(article_id);
CREATE INDEX IF NOT EXISTS idx_article_relations_score ON article_relations(relevance_score DESC);

-- ============================================
-- 7. TRIGGER: Auto-update updated_at
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
-- 7. TRIGGER: Auto-update updated_at
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
-- 8. FUNCTION: Increment article views
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
-- 9. FUNCTION: Get trending articles (last 7 days)
-- ============================================
CREATE OR REPLACE FUNCTION get_trending_articles(limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
  article_id UUID,
  title TEXT,
  slug TEXT,
  views_count BIGINT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    a.title,
    a.slug,
    COUNT(av.id) as views_count
  FROM articles a
  LEFT JOIN article_views av ON a.id = av.article_id
  WHERE av.created_at >= NOW() - INTERVAL '7 days'
    AND a.status = 'published'
  GROUP BY a.id, a.title, a.slug
  ORDER BY views_count DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 10. FUNCTION: Get related articles
-- ============================================
CREATE OR REPLACE FUNCTION get_related_articles(article_uuid UUID, limit_count INTEGER DEFAULT 5)
RETURNS TABLE (
  id UUID,
  title TEXT,
  slug TEXT,
  excerpt TEXT,
  cover_image_url TEXT
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    a.id,
    a.title,
    a.slug,
    a.excerpt,
    a.cover_image_url
  FROM articles a
  WHERE a.category_id = (SELECT category_id FROM articles WHERE id = article_uuid)
    AND a.id != article_uuid
    AND a.status = 'published'
  ORDER BY a.views DESC
  LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- 11. FUNCTION: Calculate SEO score
-- ============================================
CREATE OR REPLACE FUNCTION calculate_seo_score(article_uuid UUID)
RETURNS INTEGER AS $$
DECLARE
  score INTEGER := 0;
  article_record RECORD;
  word_count INTEGER;
BEGIN
  SELECT * INTO article_record FROM articles WHERE id = article_uuid;
  
  -- SEO title exists (10 points)
  IF article_record.seo_title IS NOT NULL AND LENGTH(article_record.seo_title) > 0 THEN
    score := score + 10;
  END IF;
  
  -- SEO description exists (10 points)
  IF article_record.seo_description IS NOT NULL AND LENGTH(article_record.seo_description) BETWEEN 120 AND 160 THEN
    score := score + 10;
  END IF;
  
  -- Keywords exist (10 points)
  IF array_length(article_record.keywords, 1) >= 3 THEN
    score := score + 10;
  END IF;
  
  -- Cover image exists (10 points)
  IF article_record.cover_image_url IS NOT NULL THEN
    score := score + 10;
  END IF;
  
  -- Word count (20 points for 800+ words)
  word_count := array_length(regexp_split_to_array(article_record.content, '\s+'), 1);
  IF word_count >= 800 THEN
    score := score + 20;
  ELSIF word_count >= 500 THEN
    score := score + 10;
  END IF;
  
  -- Has tags (10 points)
  IF array_length(article_record.tags, 1) >= 3 THEN
    score := score + 10;
  END IF;
  
  -- Slug is SEO friendly (10 points)
  IF LENGTH(article_record.slug) BETWEEN 3 AND 60 THEN
    score := score + 10;
  END IF;
  
  -- Title length (10 points for 40-60 chars)
  IF LENGTH(article_record.title) BETWEEN 40 AND 60 THEN
    score := score + 10;
  ELSIF LENGTH(article_record.title) BETWEEN 30 AND 70 THEN
    score := score + 5;
  END IF;
  
  RETURN score;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- DONE! 
-- ============================================
-- Next steps:
-- 1. Run this SQL in Supabase SQL Editor
-- 2. Run the RLS policies SQL (rls_policies.sql)
-- 3. Your database is ready!
-- ============================================
