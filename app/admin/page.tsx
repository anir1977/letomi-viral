'use client';

import { useEffect, useState } from 'react';
import {
  DocumentTextIcon,
  CheckCircleIcon,
  DocumentDuplicateIcon,
  EyeIcon,
  ExclamationTriangleIcon,
  PhotoIcon,
} from '@heroicons/react/24/outline';
import StatCard from './components/StatCard';
import Card from './components/Card';
import Link from 'next/link';
import {
  getDashboardStats,
  getTopArticles,
  getTrendingArticles,
  getArticlesWithoutImages,
  getLowCTRArticles,
} from '@/lib/supabase/articles';

interface DashboardStats {
  totalArticles: number;
  publishedArticles: number;
  draftArticles: number;
  totalViews: number;
  viewsLastWeek: number;
  viewsGrowth: number;
}

interface TopArticle {
  id: string;
  title: string;
  slug: string;
  views: number;
  status: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [topArticles, setTopArticles] = useState<TopArticle[]>([]);
  const [trendingArticles, setTrendingArticles] = useState<any[]>([]);
  const [articlesWithoutImages, setArticlesWithoutImages] = useState<any[]>([]);
  const [lowCTRArticles, setLowCTRArticles] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  async function loadDashboardData() {
    try {
      setLoading(true);
      
      // Load all data in parallel
      const [statsData, topData, trendingData, noImagesData, lowCTRData] = await Promise.all([
        getDashboardStats(),
        getTopArticles(5),
        getTrendingArticles(5),
        getArticlesWithoutImages(),
        getLowCTRArticles(50),
      ]);

      setStats(statsData);
      setTopArticles(topData || []);
      setTrendingArticles(trendingData || []);
      setArticlesWithoutImages(noImagesData || []);
      setLowCTRArticles(lowCTRData || []);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading || !stats) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard Overview
        </h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          Welcome back! Here's what's happening with your content.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total Articles"
          value={stats.totalArticles}
          icon={<DocumentTextIcon className="w-6 h-6" />}
          color="blue"
        />
        <StatCard
          title="Published"
          value={stats.publishedArticles}
          icon={<CheckCircleIcon className="w-6 h-6" />}
          color="green"
          trend={{
            value: stats.viewsGrowth > 0 ? `+${stats.viewsGrowth}% this week` : `${stats.viewsGrowth}% this week`,
            isPositive: stats.viewsGrowth > 0,
          }}
        />
        <StatCard
          title="Drafts"
          value={stats.draftArticles}
          icon={<DocumentDuplicateIcon className="w-6 h-6" />}
          color="orange"
        />
        <StatCard
          title="Total Views"
          value={stats.totalViews.toLocaleString()}
          icon={<EyeIcon className="w-6 h-6" />}
          color="purple"
          trend={{
            value: `${stats.viewsLastWeek} last 7 days`,
            isPositive: true,
          }}
        />
      </div>

      {/* Alerts */}
      {(articlesWithoutImages.length > 0 || lowCTRArticles.length > 0) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Articles without images alert */}
          {articlesWithoutImages.length > 0 && (
            <Card
              title="⚠️ Articles Without Images"
              action={
                <Link
                  href="/admin/articles"
                  className="text-sm text-orange-600 dark:text-orange-400 hover:underline"
                >
                  Fix now
                </Link>
              }
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {articlesWithoutImages.length} published article(s) missing cover images
                </p>
                <div className="space-y-2">
                  {articlesWithoutImages.slice(0, 3).map(article => (
                    <div
                      key={article.id}
                      className="flex items-center gap-2 text-sm p-2 bg-orange-50 dark:bg-orange-900/10 rounded"
                    >
                      <PhotoIcon className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      <span className="text-gray-700 dark:text-gray-300 truncate">
                        {article.title}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}

          {/* Low CTR articles */}
          {lowCTRArticles.length > 0 && (
            <Card
              title="📉 Low Traffic Articles"
              action={
                <Link
                  href="/admin/seo"
                  className="text-sm text-red-600 dark:text-red-400 hover:underline"
                >
                  Optimize
                </Link>
              }
            >
              <div className="space-y-3">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {lowCTRArticles.length} article(s) with low views
                </p>
                <div className="space-y-2">
                  {lowCTRArticles.slice(0, 3).map(article => (
                    <div
                      key={article.id}
                      className="flex items-center justify-between text-sm p-2 bg-red-50 dark:bg-red-900/10 rounded"
                    >
                      <span className="text-gray-700 dark:text-gray-300 truncate flex-1">
                        {article.title}
                      </span>
                      <span className="text-red-600 dark:text-red-400 font-medium ml-2">
                        {article.views} views
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </Card>
          )}
        </div>
      )}

      {/* Content grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Articles */}
        <Card
          title="🏆 Top 5 Articles"
          action={
            <Link
              href="/admin/articles"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              View all
            </Link>
          }
        >
          {topArticles.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
              No published articles yet. Create your first article!
            </p>
          ) : (
            <div className="space-y-4">
              {topArticles.map((article, index) => (
                <div
                  key={article.id}
                  className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-sm font-bold text-white">
                      {index + 1}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {article.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {article.views.toLocaleString()} views
                      </p>
                    </div>
                  </div>
                  <span className="ml-2 px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400">
                    {article.status}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>

        {/* Trending Articles (Last 7 days) */}
        <Card
          title="🔥 Trending This Week"
          action={
            <Link
              href="/admin/stats"
              className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
            >
              Analytics
            </Link>
          }
        >
          {trendingArticles.length === 0 ? (
            <p className="text-sm text-gray-500 dark:text-gray-400 text-center py-8">
              No trending articles this week
            </p>
          ) : (
            <div className="space-y-4">
              {trendingArticles.map((article, index) => (
                <div
                  key={article.article_id}
                  className="flex items-center justify-between pb-4 border-b border-gray-200 dark:border-gray-700 last:border-0 last:pb-0"
                >
                  <div className="flex items-center space-x-3 flex-1 min-w-0">
                    <span className="flex-shrink-0 text-2xl">
                      {index === 0 ? '🥇' : index === 1 ? '🥈' : index === 2 ? '🥉' : '📈'}
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                        {article.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {article.views_count} views this week
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* Quick Actions */}
      <Card title="⚡ Quick Actions">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Link
            href="/admin/articles/new"
            className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-center"
          >
            <DocumentTextIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
            <p className="text-sm font-medium text-gray-900 dark:text-white">New Article</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Create manually</p>
          </Link>
          
          <Link
            href="/admin/ai-writer"
            className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-purple-500 dark:hover:border-purple-400 transition-colors text-center"
          >
            <span className="text-4xl block mb-2">🤖</span>
            <p className="text-sm font-medium text-gray-900 dark:text-white">AI Writer</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Generate with AI</p>
          </Link>
          
          <Link
            href="/admin/seo"
            className="p-4 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg hover:border-green-500 dark:hover:border-green-400 transition-colors text-center"
          >
            <span className="text-4xl block mb-2">🎯</span>
            <p className="text-sm font-medium text-gray-900 dark:text-white">SEO Tools</p>
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Optimize content</p>
          </Link>
        </div>
      </Card>
    </div>
  );
}
