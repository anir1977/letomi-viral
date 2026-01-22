/**
 * Categories Service - Real Database Operations
 */

import { createClient } from './client';
import type { Category } from '@/types/database';

const supabase = createClient();

/**
 * Get all categories
 */
export async function getCategories() {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .order('name');

  if (error) throw error;
  return data;
}

/**
 * Get category by slug
 */
export async function getCategoryBySlug(slug: string) {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('slug', slug)
    .single();

  if (error) throw error;
  return data;
}

/**
 * Get category with article count
 */
export async function getCategoriesWithCount() {
  const { data, error } = await supabase
    .from('categories')
    .select(`
      *,
      articles:articles(count)
    `)
    .order('name');

  if (error) throw error;
  return data;
}
