/**
 * Trending Articles Widget - Viral Feature
 * Shows trending articles from last 7 days
 */

'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getTrendingArticles } from '@/lib/supabase/articles';

interface TrendingArticlesProps {
  limit?: number;
}

export default function TrendingArticles({ limit = 5 }: TrendingArticlesProps) {
  const [articles, setArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTrending();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function loadTrending() {
    try {
      const data = await getTrendingArticles(limit);
      setArticles(data || []);
    } catch (error) {
      console.error('Error loading trending articles:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">🔥 Trending Now</h3>
        <div className="space-y-3 animate-pulse">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-16 bg-gray-200 dark:bg-gray-700 rounded"></div>
          ))}
        </div>
      </div>
    );
  }

  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="bg-gradient-to-br from-orange-50 to-red-50 dark:from-orange-900/20 dark:to-red-900/20 rounded-lg shadow-lg p-6 border-2 border-orange-200 dark:border-orange-800">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
        <span className="text-2xl mr-2">🔥</span>
        Trending This Week
      </h3>
      
      <div className="space-y-3">
        {articles.map((article, index) => (
          <Link
            key={article.article_id}
            href={`/post/${article.slug}`}
            className="flex items-start gap-3 p-3 bg-white dark:bg-gray-800 rounded-lg hover:shadow-md transition-all duration-200 group border border-gray-200 dark:border-gray-700"
          >
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center text-white font-bold shadow-md">
              {index + 1}
            </div>
            
            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-semibold text-gray-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors line-clamp-2">
                {article.title}
              </h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {article.views_count.toLocaleString()} views
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
