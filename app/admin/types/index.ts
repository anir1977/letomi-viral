// Article types
export interface Article {
  id: string;
  title: string;
  slug: string;
  category: string;
  tags: string[];
  coverImage: string;
  content: string;
  metaTitle: string;
  metaDescription: string;
  status: 'draft' | 'published';
  views: number;
  author: string;
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

// Stats types
export interface DashboardStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalViews: number;
}

export interface TopArticle {
  id: string;
  title: string;
  views: number;
  status: 'draft' | 'published';
}

// SEO types
export interface SEOSettings {
  siteName: string;
  siteDescription: string;
  siteUrl: string;
  defaultMetaTitle: string;
  defaultMetaDescription: string;
  twitterHandle: string;
  ogImage: string;
}

// Category type
export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}
