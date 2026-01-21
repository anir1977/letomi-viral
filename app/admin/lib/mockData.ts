import { Article, DashboardStats, TopArticle, Category } from '../types';

// Mock articles data
export const mockArticles: Article[] = [
  {
    id: '1',
    title: '10 Surprising Facts About Space That Will Blow Your Mind',
    slug: '10-surprising-facts-about-space',
    category: 'Science',
    tags: ['space', 'astronomy', 'facts'],
    coverImage: '/images/space.jpg',
    content: '# Amazing Space Facts\n\nLorem ipsum dolor sit amet...',
    metaTitle: '10 Surprising Facts About Space | CurioSpark',
    metaDescription: 'Discover amazing facts about space that you never knew.',
    status: 'published',
    views: 12543,
    author: 'John Doe',
    createdAt: '2026-01-15T10:00:00Z',
    updatedAt: '2026-01-15T10:00:00Z',
    publishedAt: '2026-01-15T10:00:00Z',
  },
  {
    id: '2',
    title: 'The History of Pizza: From Ancient Times to Modern Day',
    slug: 'history-of-pizza',
    category: 'Food',
    tags: ['pizza', 'history', 'food'],
    coverImage: '/images/pizza.jpg',
    content: '# Pizza History\n\nLorem ipsum dolor sit amet...',
    metaTitle: 'The History of Pizza | CurioSpark',
    metaDescription: 'Explore the fascinating history of pizza.',
    status: 'published',
    views: 8932,
    author: 'Jane Smith',
    createdAt: '2026-01-14T09:00:00Z',
    updatedAt: '2026-01-14T09:00:00Z',
    publishedAt: '2026-01-14T09:00:00Z',
  },
  {
    id: '3',
    title: 'Why Cats Sleep So Much: The Science Behind It',
    slug: 'why-cats-sleep-so-much',
    category: 'Animals',
    tags: ['cats', 'sleep', 'science'],
    coverImage: '/images/cat.jpg',
    content: '# Cat Sleep Patterns\n\nLorem ipsum dolor sit amet...',
    metaTitle: 'Why Cats Sleep So Much | CurioSpark',
    metaDescription: 'Learn the scientific reasons why cats sleep so much.',
    status: 'draft',
    views: 0,
    author: 'John Doe',
    createdAt: '2026-01-18T14:00:00Z',
    updatedAt: '2026-01-19T11:00:00Z',
  },
  {
    id: '4',
    title: 'The Most Expensive Things Ever Sold',
    slug: 'most-expensive-things-ever-sold',
    category: 'Lifestyle',
    tags: ['luxury', 'expensive', 'records'],
    coverImage: '/images/luxury.jpg',
    content: '# Expensive Items\n\nLorem ipsum dolor sit amet...',
    metaTitle: 'The Most Expensive Things Ever Sold | CurioSpark',
    metaDescription: 'Discover the most expensive items ever sold at auction.',
    status: 'published',
    views: 15678,
    author: 'Jane Smith',
    createdAt: '2026-01-12T08:00:00Z',
    updatedAt: '2026-01-12T08:00:00Z',
    publishedAt: '2026-01-12T08:00:00Z',
  },
  {
    id: '5',
    title: 'How the Internet Actually Works: A Simple Explanation',
    slug: 'how-internet-works',
    category: 'Technology',
    tags: ['internet', 'technology', 'education'],
    coverImage: '/images/internet.jpg',
    content: '# How Internet Works\n\nLorem ipsum dolor sit amet...',
    metaTitle: 'How the Internet Works | CurioSpark',
    metaDescription: 'A simple explanation of how the internet actually works.',
    status: 'draft',
    views: 0,
    author: 'John Doe',
    createdAt: '2026-01-19T15:00:00Z',
    updatedAt: '2026-01-20T09:00:00Z',
  },
];

// Mock dashboard stats
export const mockDashboardStats: DashboardStats = {
  totalArticles: 5,
  publishedArticles: 3,
  draftArticles: 2,
  totalViews: 37153,
};

// Mock top articles
export const mockTopArticles: TopArticle[] = [
  { id: '4', title: 'The Most Expensive Things Ever Sold', views: 15678, status: 'published' },
  { id: '1', title: '10 Surprising Facts About Space', views: 12543, status: 'published' },
  { id: '2', title: 'The History of Pizza', views: 8932, status: 'published' },
  { id: '3', title: 'Why Cats Sleep So Much', views: 0, status: 'draft' },
  { id: '5', title: 'How the Internet Works', views: 0, status: 'draft' },
];

// Mock categories
export const mockCategories: Category[] = [
  { id: '1', name: 'Science', slug: 'science', description: 'Scientific facts and discoveries' },
  { id: '2', name: 'Food', slug: 'food', description: 'Food history and culture' },
  { id: '3', name: 'Animals', slug: 'animals', description: 'Animal facts and behavior' },
  { id: '4', name: 'Lifestyle', slug: 'lifestyle', description: 'Lifestyle and luxury' },
  { id: '5', name: 'Technology', slug: 'technology', description: 'Tech explanations and news' },
  { id: '6', name: 'History', slug: 'history', description: 'Historical events and stories' },
];

// Helper to get article by ID
export function getArticleById(id: string): Article | undefined {
  return mockArticles.find(article => article.id === id);
}

// Helper to create new article
export function createNewArticle(): Partial<Article> {
  return {
    title: '',
    slug: '',
    category: '',
    tags: [],
    coverImage: '',
    content: '',
    metaTitle: '',
    metaDescription: '',
    status: 'draft',
    views: 0,
  };
}
