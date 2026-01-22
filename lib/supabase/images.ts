// @ts-nocheck - Supabase TypeScript inference issues with Database generic
/**
 * Image Service - Unsplash Integration
 * Auto-generate images for articles
 */

import type { ArticleImageInsert } from '@/types/database';
import { supabase } from './client';

// Unsplash API Configuration
const UNSPLASH_ACCESS_KEY = process.env.NEXT_PUBLIC_UNSPLASH_ACCESS_KEY || 'demo';
const UNSPLASH_API = 'https://api.unsplash.com';

/**
 * Search images on Unsplash
 */
export async function searchUnsplashImages(query: string, count = 1) {
  try {
    const response = await fetch(
      `${UNSPLASH_API}/search/photos?query=${encodeURIComponent(query)}&per_page=${count}&orientation=landscape`,
      {
        headers: {
          Authorization: `Client-ID ${UNSPLASH_ACCESS_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('Failed to fetch images from Unsplash');
    }

    const data = await response.json();
    return data.results.map((photo: any) => ({
      url: photo.urls.regular,
      alt: photo.alt_description || photo.description || query,
      source: 'unsplash' as const,
    }));
  } catch (error) {
    console.error('Unsplash API error:', error);
    return [];
  }
}

/**
 * Generate placeholder image URL (fallback)
 */
export function generatePlaceholderImage(text: string, width = 1200, height = 630) {
  const encodedText = encodeURIComponent(text);
  return `https://placehold.co/${width}x${height}/3B82F6/FFFFFF?text=${encodedText}`;
}

/**
 * Get or generate cover image for article
 */
export async function getArticleCoverImage(title: string, keywords: string[]) {
  // Try to search using keywords first
  const searchQuery = keywords.length > 0 ? keywords[0] : title;
  const images = await searchUnsplashImages(searchQuery, 1);

  if (images.length > 0) {
    return {
      url: images[0].url,
      alt: images[0].alt,
      source: 'unsplash' as const,
    };
  }

  // Fallback to placeholder
  return {
    url: generatePlaceholderImage(title),
    alt: title,
    source: 'custom' as const,
  };
}

/**
 * Generate inline images for article content
 */
export async function generateInlineImages(keywords: string[], count = 3) {
  const images = [];

  for (let i = 0; i < Math.min(count, keywords.length); i++) {
    const keyword = keywords[i];
    const results = await searchUnsplashImages(keyword, 1);

    if (results.length > 0) {
      images.push({
        url: results[0].url,
        alt: results[0].alt,
        source: 'unsplash' as const,
      });
    }
  }

  return images;
}

/**
 * Save article images to database
 */
export async function saveArticleImages(
  articleId: string,
  images: { url: string; alt: string; source: 'unsplash' | 'pexels' | 'ai' | 'custom'; position?: number }[]
) {
  const imageInserts: ArticleImageInsert[] = images.map((img, index) => ({
    article_id: articleId,
    image_url: img.url,
    alt_text: img.alt,
    source: img.source,
    position: img.position ?? index,
  }));

  const { data, error } = await supabase
    .from('article_images')
    .insert(imageInserts)
    .select();

  if (error) throw error;
  return data;
}

/**
 * Get images for an article
 */
export async function getArticleImages(articleId: string) {
  const { data, error } = await supabase
    .from('article_images')
    .select('*')
    .eq('article_id', articleId)
    .order('position');

  if (error) throw error;
  return data;
}

/**
 * Auto-generate and attach images to article
 */
export async function autoGenerateArticleImages(
  articleId: string,
  title: string,
  keywords: string[]
) {
  // Generate cover image
  const coverImage = await getArticleCoverImage(title, keywords);

  // Update article cover image
  const { error: updateError } = await supabase
    .from('articles')
    .update({ cover_image_url: coverImage.url })
    .eq('id', articleId);

  if (updateError) throw updateError;

  // Generate inline images
  const inlineImages = await generateInlineImages(keywords, 3);

  // Save inline images
  if (inlineImages.length > 0) {
    await saveArticleImages(articleId, inlineImages);
  }

  return {
    coverImage,
    inlineImages,
  };
}
