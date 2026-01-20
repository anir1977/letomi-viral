'use client';

import { useEffect, useState } from 'react';
import { getAllPosts } from '@/lib/posts';

export default function SiteStats() {
  const [stats, setStats] = useState({
    totalFacts: 0,
    totalReaders: '0',
    articlesPublished: 0,
  });

  useEffect(() => {
    const posts = getAllPosts();
    const totalViews = posts.reduce((sum, post) => {
      const views = parseFloat(post.views.replace('K', '')) * 1000;
      return sum + views;
    }, 0);

    setStats({
      totalFacts: posts.length,
      totalReaders: `${Math.round(totalViews / 1000)}K`,
      articlesPublished: posts.length,
    });
  }, []);

  return (
    <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 mb-12">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
        <div>
          <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            {stats.totalFacts}+
          </div>
          <div className="text-gray-600 dark:text-gray-400 font-medium">
            Fascinating Facts
          </div>
        </div>
        <div>
          <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
            {stats.totalReaders}+
          </div>
          <div className="text-gray-600 dark:text-gray-400 font-medium">
            Monthly Readers
          </div>
        </div>
        <div>
          <div className="text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
            {stats.articlesPublished}
          </div>
          <div className="text-gray-600 dark:text-gray-400 font-medium">
            Articles Published
          </div>
        </div>
      </div>
    </div>
  );
}
