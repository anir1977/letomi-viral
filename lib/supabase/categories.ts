/**
 * Categories Service - Real Database Operations
 */

import { supabase } from './client';
import type { Category } from '@/types/database';

/**
 * Get all categories
 */
export async function getCategories(): Promise<Category[] | null> {
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
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
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
export async function getCategoriesWithCount(): Promise<any[] | null> {
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
