import { supabase } from './supabase/client';
import type { Article } from '@/types/database';

/**
 * Fetches all published articles, sorted by most recent first
 * Safe for server components and public access
 */
export async function getPublishedArticles(): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching published articles:', error);
    return [];
  }

  return data || [];
}

/**
 * Fetches all published articles with pagination
 * @param page - Page number (1-based)
 * @param limit - Number of articles per page
 */
export async function getPublishedArticlesPaginated(
  page: number = 1,
  limit: number = 10
): Promise<{ articles: Article[]; total: number }> {
  const from = (page - 1) * limit;
  const to = from + limit - 1;

  // Get total count
  const { count } = await supabase
    .from('articles')
    .select('*', { count: 'exact', head: true })
    .eq('status', 'published');

  // Get articles
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .range(from, to);

  if (error) {
    console.error('Error fetching paginated articles:', error);
    return { articles: [], total: 0 };
  }

  return {
    articles: data || [],
    total: count || 0,
  };
}

/**
 * Fetches a single article by its slug
 * Returns null if not found or not published
 */
export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (error) {
    console.error('Error fetching article by slug:', error);
    return null;
  }

  return data;
}

/**
 * Fetches articles by category
 */
export async function getArticlesByCategory(category: string): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('category', category)
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles by category:', error);
    return [];
  }

  return data || [];
}

/**
 * Fetches articles by tag
 */
export async function getArticlesByTag(tag: string): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .contains('tags', [tag])
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching articles by tag:', error);
    return [];
  }

  return data || [];
}

/**
 * Increments the view count for an article
 * Safe to call from client components
 */
export async function incrementArticleViews(articleId: string): Promise<void> {
  try {
    // Use the database function for atomic increment
    await (supabase.rpc as any)('increment_article_views', {
      article_uuid: articleId,
    });
  } catch (error) {
    console.error('Error incrementing article views:', error);
  }
}

/**
 * Gets trending articles based on views in the last 7 days
 */
export async function getTrendingArticles(limit: number = 10): Promise<Article[]> {
  const sevenDaysAgo = new Date();
  sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .gte('created_at', sevenDaysAgo.toISOString())
    .order('views', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching trending articles:', error);
    return [];
  }

  return data || [];
}

/**
 * Searches articles by title or content
 */
export async function searchArticles(query: string): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .or(`title.ilike.%${query}%,content.ilike.%${query}%`)
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error searching articles:', error);
    return [];
  }

  return data || [];
}

/**
 * Gets the most recent articles
 */
export async function getLatestArticles(limit: number = 5): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching latest articles:', error);
    return [];
  }

  return data || [];
}

/**
 * Gets related articles based on category and tags
 * Excludes the current article
 */
export async function getRelatedArticles(
  articleId: string,
  category: string,
  tags: string[],
  limit: number = 3
): Promise<Article[]> {
  const { data, error } = await supabase
    .from('articles')
    .select('*')
    .eq('status', 'published')
    .neq('id', articleId)
    .or(`category.eq.${category},tags.ov.{${tags.join(',')}}`)
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) {
    console.error('Error fetching related articles:', error);
    return [];
  }

  return data || [];
}
