/**
 * SEO Head Component - Dynamic Meta Tags
 * Handles all SEO metadata, Open Graph, Twitter Cards, and JSON-LD
 */

import Head from 'next/head';
import { generateArticleSEO, generateArticleSchema, generateFAQSchema, generateBreadcrumbSchema } from '@/lib/seo';
import type { Article, Category } from '@/types/database';

interface SEOHeadProps {
  article?: Article & { category?: Category | null };
  pageType?: 'home' | 'article' | 'category' | 'about';
  customTitle?: string;
  customDescription?: string;
  customImage?: string;
  faqs?: { question: string; answer: string }[];
  breadcrumbs?: { name: string; url: string }[];
}

export default function SEOHead({
  article,
  pageType = 'home',
  customTitle,
  customDescription,
  customImage,
  faqs,
  breadcrumbs,
}: SEOHeadProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://curiospark.com';
  
  // Default SEO data
  let seoData = {
    title: customTitle || 'CurioSpark - Discover Fascinating Facts & Stories',
    description:
      customDescription ||
      'Explore amazing facts, surprising stories, and fascinating insights about science, technology, history, and more. Your daily dose of curiosity.',
    image: customImage || `${baseUrl}/og-default.jpg`,
    url: baseUrl,
  };

  // Article-specific SEO
  if (article && pageType === 'article') {
    const articleSEO = generateArticleSEO(article, baseUrl);
    seoData = {
      title: articleSEO.title,
      description: articleSEO.description,
      image: articleSEO.ogImage || seoData.image,
      url: articleSEO.canonical,
    };
  }

  // Generate schemas
  const schemas: any[] = [];

  // Article schema
  if (article && pageType === 'article') {
    schemas.push(generateArticleSchema(article, baseUrl));
  }

  // FAQ schema
  if (faqs && faqs.length > 0) {
    schemas.push(generateFAQSchema(faqs));
  }

  // Breadcrumb schema
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbSchema(breadcrumbs, baseUrl));
  }

  // Organization schema (always include)
  schemas.push({
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'CurioSpark',
    url: baseUrl,
    logo: `${baseUrl}/logo.png`,
    sameAs: [
      'https://twitter.com/curiospark',
      'https://facebook.com/curiospark',
      'https://instagram.com/curiospark',
    ],
  });

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{seoData.title}</title>
      <meta name="title" content={seoData.title} />
      <meta name="description" content={seoData.description} />
      
      {/* Keywords */}
      {article?.keywords && article.keywords.length > 0 && (
        <meta name="keywords" content={article.keywords.join(', ')} />
      )}

      {/* Canonical URL */}
      <link rel="canonical" href={seoData.url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={pageType === 'article' ? 'article' : 'website'} />
      <meta property="og:url" content={seoData.url} />
      <meta property="og:title" content={seoData.title} />
      <meta property="og:description" content={seoData.description} />
      <meta property="og:image" content={seoData.image} />
      <meta property="og:site_name" content="CurioSpark" />

      {/* Article-specific OG tags */}
      {article && pageType === 'article' && (
        <>
          <meta property="article:published_time" content={article.published_at || article.created_at} />
          <meta property="article:modified_time" content={article.updated_at} />
          <meta property="article:author" content="CurioSpark Editorial Team" />
          {article.category && <meta property="article:section" content={article.category.name} />}
          {article.tags.map(tag => (
            <meta key={tag} property="article:tag" content={tag} />
          ))}
        </>
      )}

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={seoData.url} />
      <meta property="twitter:title" content={seoData.title} />
      <meta property="twitter:description" content={seoData.description} />
      <meta property="twitter:image" content={seoData.image} />

      {/* Additional Meta Tags */}
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <meta name="bingbot" content="index, follow" />

      {/* JSON-LD Structured Data */}
      {schemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </Head>
  );
}
