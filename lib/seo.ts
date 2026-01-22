/**
 * SEO System - Production Ready
 * Meta tags, Open Graph, Twitter Cards, JSON-LD
 */

import type { Article, Category } from '@/types/database';

export interface SEOData {
  title: string;
  description: string;
  keywords: string[];
  canonical: string;
  ogType: 'website' | 'article';
  ogImage?: string;
  article?: {
    publishedTime: string;
    modifiedTime: string;
    author: string;
    section: string;
    tags: string[];
  };
}

/**
 * Generate SEO metadata for article
 */
export function generateArticleSEO(
  article: Article & { category?: Category | null },
  baseUrl: string = 'https://curiospark.com'
): SEOData {
  const canonical = `${baseUrl}/post/${article.slug}`;

  return {
    title: article.seo_title || `${article.title} | CurioSpark`,
    description:
      article.seo_description ||
      article.excerpt ||
      `Read about ${article.title} on CurioSpark. Discover fascinating facts and insights.`,
    keywords: article.keywords.length > 0 ? article.keywords : article.tags,
    canonical,
    ogType: 'article',
    ogImage: article.cover_image_url || `${baseUrl}/og-default.jpg`,
    article: {
      publishedTime: article.published_at || article.created_at,
      modifiedTime: article.updated_at,
      author: 'CurioSpark Editorial Team',
      section: article.category?.name || 'General',
      tags: article.tags,
    },
  };
}

/**
 * Generate JSON-LD structured data for article
 */
export function generateArticleSchema(
  article: Article & { category?: Category | null },
  baseUrl: string = 'https://curiospark.com'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    description: article.excerpt,
    image: article.cover_image_url || `${baseUrl}/og-default.jpg`,
    datePublished: article.published_at || article.created_at,
    dateModified: article.updated_at,
    author: {
      '@type': 'Organization',
      name: 'CurioSpark',
      url: baseUrl,
    },
    publisher: {
      '@type': 'Organization',
      name: 'CurioSpark',
      url: baseUrl,
      logo: {
        '@type': 'ImageObject',
        url: `${baseUrl}/logo.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${baseUrl}/post/${article.slug}`,
    },
    keywords: article.keywords.join(', '),
    articleSection: article.category?.name || 'General',
    wordCount: article.content.split(/\s+/).length,
  };
}

/**
 * Generate FAQ schema for rich results
 */
export function generateFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(
  items: { name: string; url: string }[],
  baseUrl: string = 'https://curiospark.com'
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${baseUrl}${item.url}`,
    })),
  };
}

/**
 * Calculate SEO score for an article
 */
export function calculateLocalSEOScore(article: Partial<Article>): {
  score: number;
  issues: string[];
  suggestions: string[];
} {
  let score = 0;
  const issues: string[] = [];
  const suggestions: string[] = [];

  // SEO Title (10 points)
  if (article.seo_title && article.seo_title.length >= 30 && article.seo_title.length <= 60) {
    score += 10;
  } else if (!article.seo_title) {
    issues.push('Missing SEO title');
    suggestions.push('Add a compelling SEO title (30-60 characters)');
  } else {
    issues.push('SEO title length not optimal');
    suggestions.push('SEO title should be 30-60 characters');
  }

  // SEO Description (10 points)
  if (
    article.seo_description &&
    article.seo_description.length >= 120 &&
    article.seo_description.length <= 160
  ) {
    score += 10;
  } else if (!article.seo_description) {
    issues.push('Missing SEO description');
    suggestions.push('Add SEO description (120-160 characters)');
  } else {
    issues.push('SEO description length not optimal');
    suggestions.push('SEO description should be 120-160 characters');
  }

  // Keywords (10 points)
  if (article.keywords && article.keywords.length >= 3) {
    score += 10;
  } else {
    issues.push('Insufficient keywords');
    suggestions.push('Add at least 3 relevant keywords');
  }

  // Cover Image (10 points)
  if (article.cover_image_url) {
    score += 10;
  } else {
    issues.push('Missing cover image');
    suggestions.push('Add a high-quality cover image');
  }

  // Content Length (20 points)
  if (article.content) {
    const wordCount = article.content.split(/\s+/).length;
    if (wordCount >= 800) {
      score += 20;
    } else if (wordCount >= 500) {
      score += 10;
      suggestions.push('Increase content to 800+ words for better SEO');
    } else {
      issues.push('Content too short');
      suggestions.push('Write at least 800 words for optimal SEO');
    }
  }

  // Tags (10 points)
  if (article.tags && article.tags.length >= 3) {
    score += 10;
  } else {
    issues.push('Insufficient tags');
    suggestions.push('Add at least 3 relevant tags');
  }

  // Slug (10 points)
  if (article.slug && article.slug.length >= 3 && article.slug.length <= 60) {
    score += 10;
  } else {
    issues.push('Slug not optimal');
    suggestions.push('Slug should be 3-60 characters, URL-friendly');
  }

  // Title Length (10 points)
  if (article.title) {
    const titleLength = article.title.length;
    if (titleLength >= 40 && titleLength <= 60) {
      score += 10;
    } else if (titleLength >= 30 && titleLength <= 70) {
      score += 5;
      suggestions.push('Title length could be optimized (40-60 chars is ideal)');
    } else {
      issues.push('Title length not optimal');
      suggestions.push('Title should be 40-60 characters for best results');
    }
  }

  // Excerpt (10 points bonus)
  if (article.excerpt && article.excerpt.length >= 100 && article.excerpt.length <= 200) {
    score += 10;
  } else if (!article.excerpt) {
    suggestions.push('Add a compelling excerpt (100-200 characters)');
  }

  return {
    score: Math.min(score, 100),
    issues,
    suggestions,
  };
}

/**
 * Generate sitemap entries for articles
 */
export function generateSitemapEntries(
  articles: Article[],
  baseUrl: string = 'https://curiospark.com'
) {
  return articles.map(article => ({
    url: `${baseUrl}/post/${article.slug}`,
    lastModified: article.updated_at,
    changeFrequency: 'weekly' as const,
    priority: article.views > 1000 ? 0.8 : 0.6,
  }));
}

/**
 * Check for SEO issues in content
 */
export function checkContentSEO(content: string, keywords: string[]): {
  hasHeadings: boolean;
  keywordDensity: number;
  hasLinks: boolean;
  readabilityScore: number;
} {
  // Check for headings
  const hasHeadings = /^#{1,6}\s/m.test(content);

  // Calculate keyword density
  const words = content.toLowerCase().split(/\s+/);
  const keywordOccurrences = keywords.reduce((count, keyword) => {
    const keywordWords = keyword.toLowerCase().split(/\s+/);
    return (
      count +
      words.filter((word, i) => {
        return keywordWords.every((kw, j) => words[i + j] === kw);
      }).length
    );
  }, 0);
  const keywordDensity = (keywordOccurrences / words.length) * 100;

  // Check for links
  const hasLinks = /\[.*?\]\(.*?\)/.test(content);

  // Simple readability score (average sentence length)
  const sentences = content.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const avgWordsPerSentence = words.length / sentences.length;
  const readabilityScore = avgWordsPerSentence < 20 ? 80 : avgWordsPerSentence < 30 ? 60 : 40;

  return {
    hasHeadings,
    keywordDensity,
    hasLinks,
    readabilityScore,
  };
}
