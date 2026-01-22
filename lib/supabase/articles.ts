// @ts-nocheck - Supabase TypeScript inference issues with Database generic
/**
 * Articles Service - Real Database Operations
 * NO MOCK DATA - Production Ready
 */

import { supabase } from './client';
import type { Article, ArticleInsert, ArticleUpdate } from '@/types/database';

/**
 * Generate a unique slug by appending a number if slug already exists
 */
async function generateUniqueSlug(baseSlug: string, excludeId?: string): Promise<string> {
  let slug = baseSlug;
  let counter = 1;
  
  while (true) {
    let query = supabase
      .from('articles')
      .select('id')
      .eq('slug', slug);
    
    // Exclude current article if updating
    if (excludeId) {
      query = query.neq('id', excludeId);
    }
    
    const { data, error } = await query.limit(1);
    
    if (error) {
      console.error('Error checking slug uniqueness:', error);
      throw error;
    }
    
    // Slug is unique
    if (!data || data.length === 0) {
      return slug;
    }
    
    // Slug exists, try with counter
    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

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
    .select('*')
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
  console.log('📥 createArticle called with:', {
    ...article,
    content: article.content?.substring(0, 100) + '...',
  });

  // Validation: Ensure required fields are present
  if (!article.title || !article.slug || !article.excerpt || !article.content) {
    const missingFields = [];
    if (!article.title) missingFields.push('title');
    if (!article.slug) missingFields.push('slug');
    if (!article.excerpt) missingFields.push('excerpt');
    if (!article.content) missingFields.push('content');
    throw new Error(`Missing required fields: ${missingFields.join(', ')}`);
  }

  // Ensure category_id is provided (not null)
  if (!article.category_id) {
    console.warn('⚠️ category_id is null or undefined');
    throw new Error('category_id is required and cannot be null');
  }

  // Ensure slug is unique (auto-generate unique slug if conflict)
  const uniqueSlug = await generateUniqueSlug(article.slug);
  if (uniqueSlug !== article.slug) {
    console.log(`🔄 Slug conflict detected. Changed from "${article.slug}" to "${uniqueSlug}"`);
  }

  const articleWithUniqueSlug = {
    ...article,
    slug: uniqueSlug,
  };

  const { data, error } = await supabase
    .from('articles')
    // @ts-ignore - Supabase type inference issue
    .insert(articleWithUniqueSlug)
    .select()
    .single();

  if (error) {
    console.error('❌ Supabase INSERT error:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
      fullError: error,
    });

    // Handle unique constraint violation (should not happen after generateUniqueSlug)
    if (error.code === '23505' && error.message.includes('slug')) {
      throw new Error(`Slug "${uniqueSlug}" already exists. Please try again.`);
    }

    // Throw detailed error message
    throw new Error(`Supabase error: ${error.message}${error.hint ? ' - ' + error.hint : ''}`);
  }

  if (!data) {
    throw new Error('No data returned from insert operation');
  }

  console.log('✅ Article created successfully:', data.id);
  return data as Article;
}

/**
 * Update article
 */
export async function updateArticle(id: string, updates: ArticleUpdate) {
  console.log('📝 updateArticle called:', {
    id,
    updates: {
      ...updates,
      content: updates.content?.substring(0, 100) + '...',
    },
  });

  if (!id) {
    throw new Error('Article ID is required for update');
  }

  // If slug is being updated, ensure it's unique
  let updatedData = { ...updates };
  if (updates.slug) {
    const uniqueSlug = await generateUniqueSlug(updates.slug, id);
    if (uniqueSlug !== updates.slug) {
      console.log(`🔄 Slug conflict detected. Changed from "${updates.slug}" to "${uniqueSlug}"`);
      updatedData.slug = uniqueSlug;
    }
  }

  // Set updated_at timestamp
  const updatesWithTimestamp = {
    ...updatedData,
    updated_at: new Date().toISOString(),
  };

  const { data, error } = await supabase
    .from('articles')
    // @ts-ignore - Supabase type inference issue
    .update(updatesWithTimestamp)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('❌ Supabase UPDATE error:', {
      message: error.message,
      details: error.details,
      hint: error.hint,
      code: error.code,
      fullError: error,
    });

    // Handle unique constraint violation (should not happen after generateUniqueSlug)
    if (error.code === '23505' && error.message.includes('slug')) {
      throw new Error(`Slug "${updatedData.slug}" already exists. Please try again.`);
    }

    // Throw detailed error message
    throw new Error(`Supabase error: ${error.message}${error.hint ? ' - ' + error.hint : ''}`);
  }

  if (!data) {
    throw new Error(`Article with ID ${id} not found`);
  }

  console.log('✅ Article updated successfully:', data.id);
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
  try {
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
  } catch (error) {
    console.error('Error in getDashboardStats:', error);
    return {
      totalArticles: 0,
      publishedArticles: 0,
      draftArticles: 0,
      totalViews: 0,
      viewsLastWeek: 0,
      viewsGrowth: 0,
    };
  }
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
