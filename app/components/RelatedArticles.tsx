/**
 * Related Articles Component - Viral Feature
 * Shows related articles to keep users engaged
 */

'use client';

import Link from 'next/link';
import Image from 'next/image';
import { getRelatedArticles } from '@/lib/articles';

interface RelatedArticlesProps {
  articleId: string;
  limit?: number;
}

export default function RelatedArticles({ articleId, limit = 4 }: RelatedArticlesProps) {
  const articles = getRelatedArticles(articleId, limit);

  if (articles.length === 0) {
    return null;
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 border border-gray-200 dark:border-gray-700">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6 flex items-center">
        <span className="text-3xl mr-3">🔗</span>
        You May Also Like
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group flex flex-col bg-gray-50 dark:bg-gray-900 rounded-lg overflow-hidden hover:shadow-md transition-all duration-300 border border-gray-200 dark:border-gray-700"
          >
            <div className="relative h-40 overflow-hidden bg-gray-100 dark:bg-gray-800">
              {article.image ? (
                <Image
                  src={article.image}
                  alt={article.title}
                  width={400}
                  height={160}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-100 dark:from-gray-700 dark:to-gray-600" />
              )}
            </div>
            
            <div className="p-4 flex-1">
              <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
                {article.title}
              </h3>
              
              {article.excerpt && (
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-2">
                  {article.excerpt}
                </p>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
