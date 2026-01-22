// @ts-nocheck - Supabase TypeScript inference issues with Database generic
/**
 * Articles Service - Real Database Operations
 * NO MOCK DATA - Production Ready
 */

import { supabase } from './client';
import type { Article, ArticleInsert, ArticleUpdate } from '@/types/database';

/**
 * Get all articles with optional filters
 */
export async function getArticles(filters?: {
  status?: 'draft' | 'published' | 'scheduled';
  category_id?: string;
  limit?: number;
  offset?: number;
}) {
  let query = supabase
    .from('articles')
    .select(`
      *,
      category:categories(*)
    `)
    .order('created_at', { ascending: false });

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  if (filters?.category_id) {
    query = query.eq('category_id', filters.category_id);
  }

  if (filters?.limit) {
    query = query.limit(filters.limit);
  }

  if (filters?.offset) {
    query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
}

/**
 * Get single article by ID
 */
export async function getArticle(id: string) {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(*),
      images:article_images(*)
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get article by slug (for public pages)
 */
export async function getArticleBySlug(slug: string) {
  const { data, error } = await supabase
    .from('articles')
    .select(`
      *,
      category:categories(*),
      images:article_images(*)
    `)
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) throw error;
  return data;
}

/**
 * Create new article
 */
export async function createArticle(article: ArticleInsert): Promise<Article> {
  const { data, error } = await supabase
    .from('articles')
    // @ts-ignore - Supabase type inference issue
    .insert(article)
    .select()
    .single();

  if (error) throw error;
  return data as Article;
}

/**
 * Update article
 */
export async function updateArticle(id: string, updates: ArticleUpdate) {
  const { data, error } = await supabase
    .from('articles')
    // @ts-ignore - Supabase type inference issue
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Delete article
 */
export async function deleteArticle(id: string) {
  const { error } = await supabase
    .from('articles')
    .delete()
    .eq('id', id);

  if (error) throw error;
}

/**
 * Publish article
 */
export async function publishArticle(id: string) {
  const { data, error } = await supabase
    .from('articles')
    // @ts-ignore - Supabase type inference issue
    .update({
      status: 'published',
      published_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get dashboard stats (REAL DATA)
 */
export async function getDashboardStats() {
  // Total articles
  const { count: totalArticles } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true });

  // Published articles
  const { count: publishedArticles } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published');

  // Draft articles
  const { count: draftArticles } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'draft');

  // Total views
  const { data: articlesWithViews } = await supabase
    .from('articles')
    .select('views');

  const totalViews = (articlesWithViews as any)?.reduce((sum: number, article: any) => sum + (article.views || 0), 0) || 0;

  // Views last 7 days
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { count: viewsLastWeek } = await supabase
    .from('article_views')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', sevenDaysAgo.toISOString());

  // Views previous 7 days
  const fourteenDaysAgo = new Date();
  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);

  const { count: viewsPreviousWeek } = await supabase
    .from('article_views')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', fourteenDaysAgo.toISOString())
    .lt('created_at', sevenDaysAgo.toISOString());

  // Calculate growth
  const viewsGrowth = viewsPreviousWeek 
    ? Math.round(((viewsLastWeek || 0) - viewsPreviousWeek) / viewsPreviousWeek * 100)
    : 0;

  return {
    totalArticles: totalArticles || 0,
    publishedArticles: publishedArticles || 0,
    draftArticles: draftArticles || 0,
    totalViews,
    viewsLastWeek: viewsLastWeek || 0,
    viewsGrowth,
  };
}

/**
 * Get top articles by views
 */
export async function getTopArticles(limit = 5) {
  const { data, error } = await supabase
    .from('articles')
    .select('id, title, slug, views, status, published_at')
    .eq('status', 'published')
    .order('views', { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

/**
 * Get trending articles (last 7 days)
 */
export async function getTrendingArticles(limit = 10) {
  const { data, error } = await supabase
    .rpc('get_trending_articles', { limit_count: limit });

  if (error) throw error;
  return data;
}

/**
 * Get related articles
 */
export async function getRelatedArticles(articleId: string, limit = 5) {
  const { data, error } = await supabase
    .rpc('get_related_articles', { 
      article_uuid: articleId,
      limit_count: limit 
    });

  if (error) throw error;
  return data;
}

/**
 * Calculate SEO score for an article
 */
export async function calculateSEOScore(articleId: string) {
  const { data, error } = await supabase
    .rpc('calculate_seo_score', { article_uuid: articleId });

  if (error) throw error;
  return data;
}

/**
 * Get articles without images (for alerts)
 */
export async function getArticlesWithoutImages() {
  const { data, error } = await supabase
    .from('articles')
    .select('id, title, status')
    .is('cover_image_url', null)
    .eq('status', 'published');

  if (error) throw error;
  return data;
}

/**
 * Get low CTR articles (low views but published)
 */
export async function getLowCTRArticles(threshold = 50) {
  const { data, error } = await supabase
    .from('articles')
    .select('id, title, views, published_at')
    .eq('status', 'published')
    .lt('views', threshold)
    .order('published_at', { ascending: false })
    .limit(5);

  if (error) throw error;
  return data;
}

/**
 * Increment article views
 */
export async function incrementArticleViews(articleId: string) {
  const { error } = await supabase
    .rpc('increment_article_views', { article_uuid: articleId });

  if (error) throw error;
}

/**
 * Bulk update article status
 */
export async function bulkUpdateStatus(articleIds: string[], status: 'draft' | 'published') {
  const updates: ArticleUpdate = { status };
  
  if (status === 'published') {
    updates.published_at = new Date().toISOString();
  }

  const { error } = await supabase
    .from('articles')
    // @ts-ignore - Supabase type inference issue
    .update(updates)
    .in('id', articleIds);

  if (error) throw error;
}

/**
 * Bulk delete articles
 */
export async function bulkDeleteArticles(articleIds: string[]) {
  const { error } = await supabase
    .from('articles')
    .delete()
    .in('id', articleIds);

  if (error) throw error;
}
